# TODO

Este documento es la **Condición de Arranque** obligatoria. ESTÁ ESTRICTAMENTE PROHIBIDO modificar el código fuente sin que este archivo refleje la tarea actual.

## [ÉPICA] Gestor de Tareas Asistido por IA

Desarrollo de una aplicación full-stack interactiva de tareas con sugerencias generadas por un Agente Langchain.

### [USER STORY] Configuración y Estructura Base

Infraestructura inicial para orquestar el backend y frontend mediante Docker.

- [x] **Subtarea 1:** Definir `docker-compose.yml` (db, backend, frontend). `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`
- [x] **Subtarea 2:** Configurar proyecto Django (Backend) y Dockerfile. `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`
- [x] **Subtarea 3:** Configurar proyecto React + Material UI (Frontend) y Dockerfile. `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`

### [USER STORY] Backend y Agente de IA

Implementar el modelo de datos, la API REST y el pipeline de llamada a Gemini con Langchain.

- [x] **Subtarea 1:** Modelos de Django `Task` y `Subtask` con migraciones. `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`
- [x] **Subtarea 2:** Endpoints CRUD para Django REST Framework. `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`
- [x] **Subtarea 3:** Servicio Langchain + Gemini para listar sugerencias JSON. `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`

### [USER STORY] Frontend y Experiencia de Usuario

Construir la vista principal en React conectada a la API.

- [x] **Subtarea 1:** Layout y listado principal de tareas. `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`
- [x] **Subtarea 2:** Formularios de creación y filtrado. `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`
- [x] **Subtarea 3:** Panel interactivo de Sugerencias IA (Confirmación individual, masiva, edición). `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`

### [USER STORY] Cierre y CI/CD

Estabilizar el proyecto y demostrar buenas prácticas.

- [x] **Subtarea 1:** Pruebas unitarias en Backend y Frontend. `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`
- [x] **Subtarea 2:** Simulación de Pipeline GitHub Actions. `[Chat ID: 3e848df4-04fa-4434-b083-4b566ed1923d]`

### [USER STORY] Correcciones y Mejoras UI/UX

Ajustes derivados del uso y feedback sobre la interfaz e integración.

- [x] **Subtarea 1:** Corregir error 500 al guardar subtareas sugeridas (inclusión del campo `task` en el `SubtaskSerializer`). `[Chat ID: activo]`
- [x] **Subtarea 2:** Evitar superposición visual del tick verde y texto en modal de sugerencias IA ajustando padding derecho en ListItem. `[Chat ID: activo]`
- [x] **Subtarea 3:** Lógica para reordenar fácilmente y de manera intuitiva las tareas y subtareas existentes. `[Chat ID: 183b98e8]`
- [x] **Subtarea 4:** Implementar filtros de tareas (Todas, Pendientes, Completadas). `[Chat ID: 183b98e8]`
- [x] **Subtarea 5:** Vista de tareas con altura consistente y capacidad de expansión para ver descripción y subtareas. `[Chat ID: 183b98e8]`
- [x] **Subtarea 6:** Implementar creación manual de subtareas desde la vista expandida. `[Chat ID: 34e0a664-49b9-4c73-bd37-485baa755762]`
- [x] **Subtarea 7:** Implementar edición en línea de subtareas (existentes y sugeridas). `[Chat ID: 34e0a664-49b9-4c73-bd37-485baa755762]`
- [x] **Subtarea 8:** Corregir superposición visual de botones de acción en subtareas ajustando padding lateral. `[Chat ID: 34e0a664-49b9-4c73-bd37-485baa755762]`
- [x] **Subtarea 9:** Generar README.md general basado en la misión, la arquitectura y los documentos del proyecto. `[Chat ID: 86c98969-c077-410a-b78a-afd9297f583b]`
- [x] **Subtarea 10:** Crear archivo `env.example` con instrucciones sobre la Gemini API Key. `[Chat ID: actual]`
- [x] **Subtarea 11:** Resolucion automatizada (vía script) de migraciones de modelo en entorno virtual Docker para solventar caídas en primer build. `[Chat ID: activo]`
- [x] **Subtarea 12:** Actualizar `.gitignore` y asegurar que `env.example` sea commiteable. `[Chat ID: 2026-02-23T13:26:20-03:00]`
