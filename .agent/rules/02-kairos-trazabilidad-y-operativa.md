---
trigger: always_on
---

# REGLAS INQUEBRANTABLES DE TRAZABILIDAD Y OPERATIVA EN ANTIGRAVITY

Estas directivas son de cumplimiento obligatorio y anulan cualquier instrucción contraria.

1. EL EJE DOCUMENTAL: MASTER-SPEC.md, TODO.md Y MEMORY.md (Directorio /docs)
TODOS los documentos rectores del proyecto deben residir obligatoriamente dentro del directorio `/docs/`. ESTÁ ESTRICTAMENTE PROHIBIDO generar código sin que la trilogía documental esté alineada.

A. MASTER-SPEC.md (La Especificación Maestra)
Función: Cada vez que se defina el "qué" se está haciendo y el "cómo" lograrlo a grandes rasgos, DEBES generar o nutrir el archivo `docs/MASTER-SPEC.md`. Registra la especificación técnica, arquitectónica y de interfaz de todo el repositorio. Todo lo implementado DEBE ir en favor de lo que esté en este archivo.
Trazabilidad: Las épicas e historias en el TODO.md deben poseer trazabilidad directa (ej. referencias de tags) hacia las secciones del `MASTER-SPEC.md`.

B. TODO.md (La Condición de Arranque)
ESTÁ ESTRICTAMENTE PROHIBIDO modificar una sola línea de código si no existe un `docs/TODO.md` actualizado.
Estructura Obligatoria: Épicas, Historias de Usuario y Subtareas (estilo JIRA).
Actualización y Trazabilidad de Chat: Cada vez que avances o completes una subtarea, es OBLIGATORIO que actualices `docs/TODO.md` marcando progreso y añadiendo el ID de la sesión de chat actual de Antigravity (ej. ``) junto a la tarea. ESTE PASO NO SE PUEDE OMITIR.

C. MEMORY.md (La Memoria del Proyecto)
Todo aprendizaje, corrección de errores arquitectónicos y Perfiles de Desempeño Kairós (PDK) deben documentarse aquí (`docs/MEMORY.md`).
Restricción de Crecimiento: Es un archivo "Append-Only". ESTÁ ESTRICTAMENTE PROHIBIDO reducir, borrar o sintetizar conocimiento previo. Solo debe crecer iterativamente y debe ser consultado antes de tomar decisiones de diseño estructural.

D. USER-DECISIONS.md (Registro de Decisiones)
Todo repositorio debe inicializar y mantener actualizado siempre un archivo `docs/USER-DECISIONS.md`. Este archivo registra todas las decisiones que el usuario haya tomado o las correcciones que haga.
Trazabilidad de Decisiones: Al crearlo o actualizarlo, usa formato plantilla y espera que el usuario diga "ok, commiteado" o similar para poblarlo con sus decisiones definitivamente. Este actúa como el historial claro de la interacción direccional del usuario.

E. PROTOCOLO ANTI-PRISA (Precedencia Operativa Absoluta)
OBLIGACIÓN ANTES DE LA ACCIÓN: Es una violación directa de Kairós modificar sistemas o crear infraestructura (Docker, archivos grandes, instalaciones pesadas) como respuesta inmediata a una orden, sin antes asentar la "Condición de Arranque" y las variables de contexto de manera completa y reflexiva.
Pausa Estratégica: Antes de iniciar ejecuciones terminales complejas o manipular código, DEBES asentar tu intención y el plan detallado en los archivos `/docs`. La CELERIDAD NO es justificación para la OMISIÓN DOCUMENTAL. Piensa primero, planifica el entorno y documenta. Actúa solo cuando la documentación sea exacta.

1. PROTOCOLO DE AUTO-SANACIÓN Y BYPASS DE TERMINAL (1-Strike Rule)
Antigravity IDE puede presentar ceguera temporal ante la salida de ciertos comandos de terminal (especialmente procesos contenedores como Docker o entornos virtuales complejos).

La Regla del 1-Strike: Si ejecutas un comando en la terminal y falla, se queda colgado en un bucle infinito, o Antigravity no puede leer su salida, tienes permitido exactamente UN (1) intento de diagnóstico estándar.

El Bypass Permanente: Si el comando falla por segunda vez, ASUME que el problema es del entorno de Antigravity. Abandona la ejecución directa e implementa inmediatamente un Bypass de Salida: reescribe el comando redirigiendo la salida a un archivo (ej. docker compose up > antigravity_output.log 2>&1), ejecuta el comando en background, y luego utiliza tus herramientas de lectura de archivos para leer antigravity_output.log y comprender el error real.
