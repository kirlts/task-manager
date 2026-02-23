# ⚡ AI Task Manager

Una plataforma de gestión de tareas de alto rendimiento que fusiona la organización tradicional con la potencia de la Inteligencia Artificial Proactiva. Diseñada para transformar objetivos complejos en planes de acción inmediatos mediante la deconstrucción inteligente de subtareas.

![Stack](https://img.shields.io/badge/Stack-Django%20%7C%20React%20%7C%20PostgreSQL-blue?style=for-the-badge)
![AI](https://img.shields.io/badge/AI-Google%20Gemini-orange?style=for-the-badge)
![Docker](https://img.shields.io/badge/Deployment-Docker-blue?style=for-the-badge)

## ✨ Características Principales

* **🧠 Descomposición Inteligente**: Utiliza Google Gemini para analizar tareas complejas y sugerir subtareas accionables de forma instantánea.
* **🛠️ Gestión Híbrida**: Control total sobre tu flujo de trabajo. Acepta, edita o descarta sugerencias de la IA, o crea tus propios planes manualmente.
* **🎨 Interfaz Material 3**: Experiencia de usuario moderna y fluida construida con React y Material UI, optimizada para la claridad y la velocidad.
* **⚡ Arquitectura Reactiva**: SPA (Single Page Application) que garantiza interacciones instantáneas sin recargas de página.
* **📂 Organización Avanzada**: Filtros inteligentes (Pendientes, Completadas, Todas) y vistas expandibles para mantener el enfoque en lo importante.
* **🔃 Reordenamiento Intuitivo**: Organiza tus tareas y subtareas con una lógica de priorización fluida.

## 🛠️ Tech Stack

### Backend

* **Django & Django REST Framework**: API robusta y escalable.
* **LangChain**: Orquestación avanzada del agente de IA.
* **Google Gemini API**: El motor de inteligencia detrás de las sugerencias.
* **PostgreSQL**: Persistencia de datos segura y relacional.

### Frontend

* **React (Vite)**: Framework ágil para una interfaz ultra-reactiva.
* **Material UI (MUI)**: Sistema de diseño premium basado en Material 3.
* **Axios**: Gestión eficiente de peticiones asíncronas.

## 🚀 Inicio Rápido

### Requisitos Previos

* [Docker](https://docs.docker.com/engine/install/) y [Docker Compose](https://docs.docker.com/compose/install/)
* Google Gemini API Key

### Despliegue con Docker

1. **Clonar y Entrar**:

   ```bash
   git clone <repo-url>
   cd ai-task-manager
   ```

2. **Configurar Entorno**:
   Crea un archivo `.env` en la raíz con tus credenciales:

   ```env
   GEMINI_API_KEY=tu_api_key_aquí
   ```

3. **Lanzar Servicios**:

   ```bash
   docker compose up --build
   ```

Accede a la aplicación en: **[http://localhost:5173](http://localhost:5173)**

## 📂 Estructura del Proyecto

* `/frontend`: Código fuente de la interfaz React.
* `/backend`: API Django y lógica del Agente IA.
* `/docs`: Documentación detallada del sistema, especificaciones y decisiones de diseño.
* `docker-compose.yml`: Configuración de la infraestructura de contenedores.

---
