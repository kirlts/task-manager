from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Task, Subtask
from .serializers import TaskSerializer, SubtaskSerializer
from django.conf import settings

# Importaciones para Langchain y Gemini
try:
    from langchain_google_genai import ChatGoogleGenerativeAI
    from langchain_core.prompts import PromptTemplate
    import os
except ImportError:
    pass


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer

    @action(detail=False, methods=['post'])
    def reorder(self, request):
        ordered_ids = request.data.get('task_ids', [])
        for index, task_id in enumerate(ordered_ids):
            Task.objects.filter(id=task_id).update(order_index=index)
        return Response({'status': 'reordered'})

    @action(detail=True, methods=['post'])
    def suggest(self, request, pk=None):
        task = self.get_object()
        
        description = task.description.strip()
        if not description:
            description = task.title

        api_key = os.environ.get("GEMINI_API_KEY", getattr(settings, "GEMINI_API_KEY", None))
        if not api_key:
            return Response(
                {"error": "Gemini API key no configurada."},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

        try:
            llm = ChatGoogleGenerativeAI(
                model="gemini-2.5-flash",
                google_api_key=api_key,
                temperature=0.2
            )
            
            prompt_template = PromptTemplate.from_template(
                "Eres un asistente experto en productividad. Dada la siguiente tarea, "
                "descomponla en 3 a 5 pasos o subtareas cortas, directas y accionables.\n\n"
                "Tarea original: {description}\n\n"
                "La salida DEBE ser estrictamente un arreglo JSON válido donde cada elemento sea un string (el paso). "
                "No incluyas markdown, saludos ni texto adicional."
            )
            
            chain = prompt_template | llm
            response = chain.invoke({"description": description})
            
            import json
            import re
            
            # Limpiar posible markdown en la respuesta
            response_text = response.content.strip()
            if response_text.startswith("```json"):
                response_text = response_text[7:]
            if response_text.endswith("```"):
                response_text = response_text[:-3]
            response_text = response_text.strip()
            
            try:
                suggestions = json.loads(response_text)
                if not isinstance(suggestions, list):
                    if isinstance(suggestions, dict):
                        suggestions = [{"title": str(s)} for s in suggestions.values()]
                    else:
                        suggestions = [{"title": response_text}]
                else:
                    suggestions = [{"title": str(s)} for s in suggestions]
            except json.JSONDecodeError:
                # Fallback si no es un JSON válido
                lines = response_text.split('\n')
                suggestions = [
                    {"title": re.sub(r'^[-*0-9.)\s]+', '', line).strip()}
                    for line in lines if line.strip()
                ]
            
            # Limitar a 5 para no saturar
            return Response(suggestions[:5])

        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



class SubtaskViewSet(viewsets.ModelViewSet):
    queryset = Subtask.objects.all()
    serializer_class = SubtaskSerializer

    @action(detail=False, methods=['post'])
    def reorder(self, request):
        ordered_ids = request.data.get('subtask_ids', [])
        for index, sub_id in enumerate(ordered_ids):
            Subtask.objects.filter(id=sub_id).update(order_index=index)
        return Response({'status': 'reordered'})
