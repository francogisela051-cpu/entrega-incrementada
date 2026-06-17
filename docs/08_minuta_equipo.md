# Minuta de equipo

Usar solo si la actividad se desarrolla en parejas o grupos de 2 a 4 estudiantes.

## Integrantes

| Nombre              | Rol              | Tareas asignadas                                                                      | Evidencia de participacion                                                        |
| ------------------- | ---------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| Alejandra Valencia  | Coordinador/a    | Gestión de tiempos, revisión de la estructura general y entrega final.                | Control del checklist de requisitos y subida del archivo a Moodle.                |
| Everaldy Ayala      | Programador/a JS | Corrección lógica del script `js/app.js` por partes (validaciones, eventos y ciclos). | Commits en el repositorio con las soluciones aplicadas a las funciones críticas.  |
| Alejandro Velazquez | Tester           | Ejecución de pruebas manuales y automatizadas en `tests.html`.                        | Reporte de errores de consola y capturas de pantalla de los estados OK.           |
| Everaldy Ayala      | Documentador/a   | Redacción del reporte técnico, matriz de pruebas y bitácora de depuración.            | Diligenciamiento de las tablas de hallazgos y reflexiones finales del incremento. |

## Acuerdos de trabajo

- Horario de trabajo: Tardes de 2:00 PM a 6:00 PM
- Medio de comunicacion: WhatsApp y videollamadas por Microsoft Teams
- Carpeta o repositorio compartido: Repositorio privado en GitHub
- Responsable de entrega en Moodle: Alejandra Valencia

## Registro de avances

| Fecha      | Avance realizado                                                                                              | Responsable                          | Pendiente                             |
| ---------- | ------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------- |
| 18/05/2026 | Clonación del proyecto, apertura en VS Code y detección de errores iniciales de consola (`null`).             | Todos                                | Corregir las funciones del script.    |
| 20/05/2026 | Ajuste por partes de las validaciones de edad, teléfono y correo electrónico. Pruebas de formulario inválido. | Everaldy Ayala / Alejandro Velazquez | Validar el guardado de datos.         |
| 22/05/2026 | Corrección del ciclo de la tabla, renderizado exitoso, paso de `tests.html` a verde y documentación final.    | Todos                                | Ninguno. Proyecto completado al 100%. |

## Conflictos o dificultades

Al principio tuvimos problemas de coordinación para entender por qué el formulario se recargaba solo y borraba los datos ingresados. Alejandro Velazquez notó en las pruebas manuales que la página parpadeaba, y revisando el código por partes con Everaldy Ayala, detectamos que la instrucción `evento.preventDefault()` estaba comentada en la función `manejarEnvio`. Lo solucionamos activándola, lo que nos permitió retener la información en pantalla, desplegar el banner de error correctamente y guardar de forma exitosa los registros en el almacenamiento local.
