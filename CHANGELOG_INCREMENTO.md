# CHANGELOG - Incremento Semana 11

Completa este archivo antes de entregar.

## Nombre del proyecto
Formulario de Inscripcion Modular con Validaciones y Resumen Dinamico

## Integrantes
-GISELA FRANCO

## Version entregada
v1.0-semana11

## Funcionalidad agregada o ajustada
Describe el incremento semanal implementado.
En este incremento implementé un sistema robusto de captura de inscripciones por partes. Agregué validación interceptando el envío nativo del formulario para evaluar campos mediante expresiones regulares y reglas de negocio estrictas. También acoplé un sistema de almacenamiento local (localStorage) persistente que alimenta una tabla dinámica de registros y un bloque de indicadores superiores que calculan en tiempo real los totales, registros válidos y el taller con mayor demanda.

## Archivos modificados
- [x] index.html
- [x] css/styles.css
- [x] js/app.js
- [x] docs/03_checklist_requisitos.md
- [x] docs/04_matriz_pruebas.md
- [x] docs/05_bitacora_depuracion.md

## Validaciones implementadas
- [x] Nombre obligatorio y minimo de caracteres.
- [x] Edad numerica y mayor o igual a 12.
- [x] Telefono de 10 digitos.
- [x] Correo con formato valido.
- [x] Seleccion de taller.
- [x] Confirmacion de datos.

## Errores corregidos durante la depuracion
Resume los errores mas importantes corregidos.
- Corregí el error de referencia `null` en la lectura inicial del formulario condicionando su carga al DOM.
- Eliminé la ejecución automática de la función de limpieza removiendo los paréntesis incorrectos de la referencia del callback.
- Activé el control nativo del evento de envío con `preventDefault()` para evitar que la página se recargara perdiendo los datos.
- Reestructuré las condiciones de validación lógicas de edad (cambiando el operador a `< 12`) y de teléfono/correo usando los operadores booleanos correctos (`||`).
- Solucioné un desbordamiento de ciclo en el renderizado de la tabla cambiando el operador de iteración a menor estricto (`<`).

## Pruebas realizadas
Resume las pruebas manuales y automaticas ejecutadas.
- **Pruebas manuales:** Forcé errores ingresando nombres cortos, edades inválidas, teléfonos incompletos de 7 dígitos y correos mal formateados para verificar el despliegue dinámico del banner rojo. Luego ingresé datos correctos para comprobar que el formulario se limpiara y los paneles de resumen sumaran el registro.
- **Pruebas automatizadas:** Ejecuté el archivo de la suite `tests.html` en el navegador, validando de forma sistemática que las funciones críticas exportadas en `window.Semana11Feature` pasaran todos los casos de prueba unitarios con éxito ("OK" en verde).

## Reflexion tecnica
Explica que aprendiste sobre depuracion, control de flujos e integracion correcta.
Aprendí que la integración correcta requiere programar a la defensiva, asegurando que el script de JavaScript valide la existencia real de las etiquetas HTML antes de intentar colgar manejadores de eventos. Sobre el control de flujos, comprendí el impacto crítico que tiene un solo operador lógico; confundir un menor estricto o usar un `&&` en lugar de un `||` puede invertir u ocultar errores de negocio en cascada. Finalmente, la depuración sistemática me enseñó a no adivinar el error, sino a rastrearlo de forma ordenada combinando las alertas rojas de la consola con la efectividad de las pruebas unitarias automáticas.
