from rest_framework.test import APITestCase
from django.urls import reverse
from rest_framework import status
from .models import Task, Subtask

class TaskAPITests(APITestCase):
    def setUp(self):
        self.task = Task.objects.create(title="Test Task", description="Testing description")
        self.subtask = Subtask.objects.create(task=self.task, title="Test Subtask", order_index=0)

    def test_create_task(self):
        url = '/api/tasks/'
        data = {'title': 'New Task', 'description': 'New Desc'}
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Task.objects.count(), 2)

    def test_get_tasks(self):
        url = '/api/tasks/'
        response = self.client.get(url, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Verifica que la respuesta incluya los subtasks anidados
        self.assertEqual(len(response.data[0]['subtasks']), 1)

    def test_suggest_subtasks_no_apikey(self):
        # Esta prueba evalúa el endpoint de IA de Langchain asegurando que 
        # sin apiKey válida devuelve el error esperado, probando la integración de la vista.
        url = f'/api/tasks/{self.task.id}/suggest/'
        with self.settings(GEMINI_API_KEY=None):
            response = self.client.post(url, format='json')
            self.assertEqual(response.status_code, status.HTTP_500_INTERNAL_SERVER_ERROR)
