---
description: CICLO DE PRUEBAS Y AUTO-SANACIÓN
---

# WORKFLOW: CICLO DE PRUEBAS Y AUTO-SANACIÓN

Validación de Contexto: Lee el archivo docs/TODO.md para comprender exactamente qué subtarea o historia de usuario se acaba de completar.

Diseño de la Prueba (Kratos): Redacta un conjunto de pruebas unitarias o de integración dirigidas explícitamente a validar el "Límite Intransgredible" y la "Métrica Principal de Optimización" acordados para esta tarea.

Ejecución y Observabilidad: Ejecuta las pruebas en la terminal de Antigravity. Si ocurre un fallo de entorno o la terminal no responde correctamente, invoca inmediatamente el "PROTOCOLO DE AUTO-SANACIÓN Y BYPASS DE TERMINAL" (redirección a.log).

Cosecha (Khaos): Documenta los fallos de diseño revelados por las pruebas en docs/MEMORY.md para evitar repetir el patrón arquitectónico defectuoso en futuras iteraciones.
