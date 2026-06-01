# ProviEmplea

ProviEmplea es una landing page desarrollada con *Vue.js* e integrada con *WordPress como CMS*, cuyo objetivo es conectar empresas con talento humano basado en habilidades, promoviendo procesos de selección más inclusivos y eficientes.

---

##  Descripción del proyecto

El sistema ProviEmplea permite visualizar información dinámica gestionada desde WordPress, mientras que el frontend está desarrollado en Vue.js con componentes reutilizables.

La plataforma incluye secciones informativas como:
- Nosotros
- Servicios
- Preguntas Frecuentes
- Formulario de contacto

---

## Tecnologías utilizadas

- Vue.js 3
- Vue Router
- JavaScript
- HTML5 / CSS3
- Bootstrap 5
- WordPress (CMS)
- REST API (WP JSON)

---

## Estructura del proyecto
frontend/
├── public/
│   └── images/
├── src/
│   ├── assets/
│   ├── components/
│   ├── views/
│   ├── router/
│   ├── App.vue
│   └── main.js
wordpress/
└── (CMS WordPress local)

## MS WordPress

El proyecto utiliza WordPress como sistema de gestión de contenidos (CMS).

Los datos de las secciones como:

* Nosotros
* Servicios
* FAQ

son administrados desde WordPress y consumidos mediante la API REST.
 Componentes principales

Tarjeta de servicios

## Componente reutilizable que muestra:

* Título
* Descripción
* Botón de contacto

## Carrusel de testimonios

Muestra opiniones de usuarios o empresas de forma dinámica y responsiva.

## Formulario de contacto

Incluye:

* Nombre
* Correo
* Servicio de interés
* Mensaje

⸻

## Accesibilidad y buenas prácticas

* Uso de etiquetas semánticas (header, section, footer)
* Diseño responsive (mobile-first)
* Textos alternativos en imágenes (alt)
* Navegación clara e intuitiva
* Contraste adecuado en UI

⸻

## Flujo del proyecto

1. WordPress gestiona el contenido (CMS)
2. Vue consume la API REST
3. El frontend renderiza la información dinámicamente
4. El usuario interactúa con la landing page

⸻

## Funcionalidades
* Landing page responsive
* Navegación por secciones
* Integración con CMS WordPress
* Formulario de contacto funcional
* Componentes reutilizables
* Modo claro/oscuro

