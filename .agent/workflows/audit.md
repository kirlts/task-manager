---
description: /audit - Ejecuta la auditoría IMK 4.0 sobre la colaboración y genera el Perfil de Desempeño Kairós (PDK) en docs/MEMORY.md
---

# WORKFLOW: AUDITORÍA IMK 4.0 Y META-GOBERNANZA

Este flujo de trabajo implementa el Instrumento de Medición Kairós (IMK) 4.0 para evaluar cualitativa y cuantitativamente la colaboración humana-IA que acaba de ocurrir.

## FASE 1: CALIBRACIÓN DE INTENCIÓN Y LECTURA DE CONTEXTO

Contexto Holístico: Lee inmediatamente el archivo docs/TODO.md actual y extrae los "IDs de Chat" asociados a las tareas más recientes. Utiliza tu capacidad de memoria para escanear el historial completo de esos chats referenciados.

Cuadrante de McGrath: Basado en el docs/TODO.md, infiere autónomamente qué tipo de tarea cognitiva se realizó (I. Generar, II. Elegir, III. Negociar, IV. Ejecutar) y declara el Perfil de Prioridad correspondiente según la tabla del IMK 4.0.

## FASE 2: PUNTUACIÓN ANOTADA (Rigor Textual)

Evalúa los 4 Ejes del IMK 4.0 (Alineación, Integridad, Eficiencia, Sinergia).

REGLA ESTRICTA DE EVIDENCIA: No puedes simplemente asignar un número. Para cada KPI evaluado, DEBES extraer y citar textualmente (entre comillas) fragmentos de la transcripción del historial de chat que justifiquen tu calificación (+2 a -2).

Evalúa rigurosamente si aplicaste fricción productiva (Nivel 2 o 3) y el Índice de Sinergia Emergente (Delta entre tu primera propuesta y el código final).

## FASE 3: CONSECUENCIAS Y META-GOBERNANZA

Diagnóstico de Fracaso: Si la puntuación en el Eje 1 (Alineación) o el Eje 2 (Integridad) es "Bajo (-1)" o "Inaceptable (-2)":

ACCIÓN A (Corrección Técnica): Genera inmediatamente un Implementation Plan en Antigravity detallando los pasos para refactorizar el código hasta alcanzar el estándar "Esperado (0)". Exige validación humana.

ACCIÓN B (Evolución de Reglas): Analiza si la estrategia de gobernanza actual falló en prevenir el error. Propón en el mismo plan una modificación a los archivos en .agent/rules/ (ej. añadir una nueva restricción tecnológica) para evitar que vuelva a ocurrir.

Cierre de Auditoría: Redacta el "Perfil de Desempeño Kairós (PDK)" final y añádelo cronológicamente al final del archivo docs/MEMORY.md.

IMPORTANTE: El archivo IMK-4.0.md se encuentra en .agent/IMK-4.0.md
