# USER-DECISIONS

Este archivo registra todas las decisiones que el usuario haya tomado o las correcciones que haya hecho durante el desarrollo del proyecto, asegurando la trazabilidad de las decisiones de diseño, arquitectura y requerimientos.

## Plantilla de Decisión

**Fecha:** YYYY-MM-DD
**Contexto/Conversación:** (Breve descripción o ID de la charla)
**Decisión u Orden del Usuario:**

- *¿Qué se decidió?*
- *¿Por qué? (Si aplica, justificación del usuario)*

**Impacto en la Arquitectura/Proyecto:**

- *Lista de componentes, tecnologías o reglas que cambian a raíz de esto.*

---

**Fecha:** 2026-02-22
**Contexto/Conversación:** Definición Arquitectónica Inicial (workflow /forja) - Corrección de decisión
**Decisión u Orden del Usuario:**

- *Decisión 1:* Mantener el stack UI propuesto de React, y añadir una biblioteca de componentes compatible con Material 3 (ej. Material-UI / MUI). *Justificación: El usuario corrigió una solicitud previa para mantener el diseño original.*
- *Decisión 2:* El flujo de la IA será bajo demanda explícita (botón "Sugerir Subtareas").
- *Decisión 3:* Las sugerencias de la IA no se autoguardan; el usuario debe confirmarlas mediante un panel donde puede añadir, editar, borrar, reordenar y aceptar individual/masivamente.
- *Decisión 4:* Los archivos de trazabilidad (`TODO.md`, `MASTER-SPEC.md`, etc.) se mueven a `/docs/`.

**Impacto en la Arquitectura/Proyecto:**

- El contenedor frontend utilizará `create-vite` con template de React y la librería `@mui/material`.
- Los endpoints de la API (`/suggest/`) devolverán sugerencias no persistidas, las llamadas POST/PUT a `Subtask` se encargarán de persistir explícitamente cuando el frontend notifique la confirmación.
- Los paths de la Custodia Documental ahora apuntan al subdirectorio `/docs/`.

---

**Fecha:** 2026-02-22
**Contexto/Conversación:** [Chat ID: 183b98e8-0cc0-477a-b809-1b5feada6b42] - Gestión Manual de Subtareas
**Decisión u Orden del Usuario:**

- *¿Qué se decidió?*: Permitir agregar y modificar subtareas manualmente tanto en las ya existentes como en el panel de sugerencias de la IA.
- *¿Por qué?*: Para dar mayor flexibilidad al usuario y permitirle ajustar los pasos de una tarea sin depender exclusivamente de la IA.

**Impacto en la Arquitectura/Proyecto:**

- El frontend (`App.jsx`) se modificará para incluir inputs de creación manual de subtareas y habilitar la edición en línea.
- No se requieren cambios en el Backend ya que los endpoints CRUD de `Subtask` ya soportan estas operaciones.

---

**Fecha:** 2026-02-22
**Contexto/Conversación:** [Actual] Generación de README.md
**Decisión u Orden del Usuario:**

- *¿Qué se decidió?*: Generar un `README.md` orientado exclusivamente a la funcionalidad técnica y operativa de la herramienta.
- *¿Por qué?*: Eliminar ruido conceptual de la metodología interna ("Kairós", "Kratos", "Khaos") para que el repositorio sea comprensible para cualquier usuario técnico ajeno al marco de trabajo operativo.

**Impacto en la Arquitectura/Proyecto:**

- El archivo raíz `README.md` ha sido reescrito con un enfoque 100% funcional y una estética premium.

---

**Fecha:** 2026-02-23
**Contexto/Conversación:** [Actual] Creación de env.example
**Decisión u Orden del Usuario:**

- *¿Qué se decidió?*: Crear un archivo `env.example` que sirva como plantilla para las variables de entorno necesarias.
- *¿Por qué?*: Para facilitar la configuración del proyecto por parte de nuevos desarrolladores, especificando claramente que se requiere una API Key de Gemini.

**Impacto en la Arquitectura/Proyecto:**

- Se añade un archivo de documentación técnica (`env.example`) en la raíz del proyecto.
