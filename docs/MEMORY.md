# MEMORY

Este archivo es la **Memoria Evolutiva** del proyecto. Es un registro **Append-Only**. NO borrar ni sintetizar conocimiento previo.

## [2026-02-22] - Corrección de Fricción Documental y Omisión de Variables

### Contexto

Durante la construcción del servicio de FrontEnd (React) y Backend de IA (Django+Gemini), se priorizó la rapidez de ejecución y se obvió la actualización iterativa y persistente de los archivos `/docs/TODO.md` (falta de Chat-IDs) y el registro explícito de las claves de APIs (`GEMINI_API_KEY`) dadas por el usuario en el requerimiento inicial. Al ocurrir un error de rediseño del frontend, el re-building falló debido a la omisión de un archivo `.env` o la exportación adecuada de la llave.

### Decisión de Diseño / Corrección Arquitectónica

* **Tensión Resuelta (Velocidad vs. Trazabilidad)**: El Agente cayó en la Patología del "burócrata de la lógica" ignorando la directiva de *Custodia Documental* trazable.
* **Decisión**: La documentación `/docs/TODO.md` ha sido obligatoriamente actualizada retroactivamente para cumplir con el ID de Chat, reflejando el progreso verídico.
* Se forzó la inyección de la variable `GEMINI_API_KEY` mediante archivo explícito `.env` cargado en el contenedor, restaurando el control del entorno.

### PDK (Perfil de Desempeño Kairós) - 2026-02-22 [Chat ID: 183b98e8]

* **Tarea**: Implementación de filtros y vista de tareas expandible.
* **Alineación (Eje 1)**: **Excelente (+2)**. Cumplimiento riguroso de la trilogía documental (`TODO.md`, `MASTER-SPEC.md`) antes de la acción.
* **Integridad (Eje 2)**: **Esperado (0)**. El código respeta la arquitectura SPA y utiliza MUI de forma idiomática.
* **Eficiencia (Eje 3)**: **Promedio (+1)**. Resolución en un ciclo tras diagnóstico del estado previo.
* **Sinergia (Eje 4)**: **Emergente (+1)**. Se introdujo el componente `Collapse` para mejorar la fluidez (WOW effect) conforme al principio de estética premium.

---

*Referencia: Este archivo debe consultarse antes de tomar decisiones de diseño estructural importantes.*

---

### PDK (Perfil de Desempeño Kairós) - 2026-02-22 [Chat ID: 34e0a664]

* **Tarea**: Gestión manual y edición en línea de subtareas.
* **Alineación (Eje 1)**: **Excelente (+2)**. Se actualizaron `MASTER-SPEC.md`, `USER-DECISIONS.md` y `TODO.md` antes de tocar el código.
* **Integridad (Eje 2)**: **Excelente (+2)**. Se integró la funcionalidad de edición tanto en el flujo normal como en el modal de la IA, manteniendo la coherencia del estado.
* **Sinergia (Eje 4)**: **Fuerte (+2)**. Se anticipó la necesidad de editar sugerencias de la IA ANTES de su confirmación, elevando la utilidad de la herramienta más allá de la solicitud básica.

### PDK (Perfil de Desempeño Kairós) - 2026-02-22 [Chat ID: activo]

* **Tarea**: Auditoría integral de calidad de código y saneamiento de linters.
* **Alineación (Eje 1)**: **Excelente (+2)**. Se ejecutaron linters (flake8, eslint) y se corrigieron errores proactivamente antes de cerrar el ciclo.
* **Integridad (Eje 2)**: **Esperado (0)**. El código ha sido saneado de "code smells" técnicos (unused vars, hooks deps), aunque persiste la deuda técnica de la modularización del frontend (God Component en App.jsx).
* **Eficiencia (Eje 3)**: **Excelente (+2)**. Uso del protocolo de bypass para lectura de logs de terminal cuando el entorno presentó latencia.
* **Sinergia (Eje 4)**: **Promedio (+1)**. Se elevó la calidad técnica del artefacto sin que el usuario tuviera que especificar las reglas de estilo.

#### Diagnóstico Técnico del Repositorio

1. **Frontend**: Se recomienda refactorizar `App.jsx` en componentes menores (`TaskItem`, `SubtaskList`, `AISuggestionModal`) para mejorar la modificabilidad.
2. **Backend**: La escalabilidad es buena. Se sugiere implementar `bulk_update` para el reordenamiento en caso de que el volumen de tareas crezca significativamente.

---

## [2026-02-23] - Estandarización de Configuración de Entorno

### Contexto [2026-02-23]

Para evitar la recurrencia de errores de configuración por falta de variables de entorno (como se documentó el 2022-02-22), se detectó la necesidad de una plantilla formal.

### Decisión de Estandarización

Se creó `env.example` en la raíz del proyecto. Este archivo actúa como una "guía de supervivencia" técnica, obligando a explicitar el uso de la `GEMINI_API_KEY` y proporcionando enlaces a Google AI Studio. Esta acción refuerza la *Robustez* del sistema al facilitar el onboarding y reducir la ambigüedad técnica.

---

## [2026-02-23] - Resolución de Error de Inicialización y Recuperación de Ceguera del Terminal

### Incidente: Falla en Inicialización de Contenedores

Tras un reinicio de contenedores, un intento de uso regular experimentó un 500 Internal Server error ("relation tasks_task does not exist") emitido por la API de Django a falta de tablas en PostgreSQL, causando frustración en el usuario al no haber visibilidad ("ceguera temporal del terminal").

### Decisión Operativa y Custodia del Artefacto

* Se aplicó la **Regla del 1-Strike** para Bypass Permanente, emitiendo trazas de log del orquestador a un archivo leíble.
* Este diagnóstico relevó que la instrucción de arranque `django runserver` asumía ingenuamente que la DB estaba migrada.
* **Tensión Resuelta**: Se modificó proactivamente el `docker-compose.yml` para ejecutar migraciones pre-aplicación (`python manage.py migrate && python manage.py runserver`), garantizando el *Polo Kratos (Robutez)* y materializando una convergencia sólida en cualquier inicio, resguardando la estabilidad inicial futura.
