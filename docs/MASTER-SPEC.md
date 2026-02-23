# MASTER-SPEC: Gestor de Tareas Asistido por IA

Este documento registra la especificación técnica, arquitectónica y de interfaz del proyecto.

## 1. Misión del Proyecto

Construir una aplicación web robusta y en contenedores que eleve la gestión tradicional de tareas incorporando la asistencia proactiva de un Agente IA (impulsado por LLMs) para la deconstrucción y clasificación de actividades complejas.

## 2. Arquitectura Recomendada

- **Backend:** Python + Django REST Framework. Proporcionará control estricto sobre el modelo relacional e integración nativa y síncrona con el Agente.
- **Frontend:** React + Material UI (MUI). Aportará una estética material design premium (Material 3) y reactividad moderna sin la sobrecarga de un framework SSR como Next.js, manteniendo las interacciones fluidas (SPA).
- **Base de Datos:** PostgreSQL para persistencia transaccional y robusta.
- **Agente IA:** Integrado en el backend mediante Langchain y ChatGoogleGenerativeAI (Google Gemini), orquestando llamadas estructuradas para obtener salidas confiables (JSON).
- **Infraestructura:** Docker Compose para desarrollo local (contenedores separados para `db`, `api`, y `web`).

*Alternativas Descartadas: React y frameworks SSR pesados (Next.js/Nuxt.js), procesamiento asíncrono con Celery/Redis (se prefiere la inmediatez síncrona mediante un bloqueador consciente en el backend).*

## 3. Modelo de Datos Central

- `Task` (id, title, description, status, created_at, updated_at)
- `Subtask` (id, task_id, title, status, order_index)

## 4. Diseño de Interacción IA

**Gestión Híbrida de Subtareas:**
La IA opera "bajo demanda" explícita del usuario mediante el botón "Sugerir Subtareas". Las sugerencias se presentan en un panel interactivo efímero donde el usuario puede:

1. **Modificar:** Editar el texto de cualquier sugerencia antes de confirmarla.
2. **Eliminar:** Descartar sugerencias no deseadas.
3. **Confirmar:** Guardar individual o masivamente.

Además, una vez que una tarea existe, el usuario tiene control total manual:

- **Añadir:** Crear subtareas directamente desde la vista expandida de la tarea sin intervención de la IA.
- **Editar:** Modificar el título de subtareas existentes mediante edición en línea.
- **Eliminar/Reordenar:** Gestión total de la estructura de pasos.
