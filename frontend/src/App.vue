<script setup lang="ts">

import { ref, onMounted, nextTick } from 'vue'
import ServiceCard from './component/ServiceCard.vue'
import TestimonialCarousel from './component/TestimonialCarousel.vue'
import { useWordPress } from './composables/useWordPress.js'

//  CMS Data
const { loading, error, fetchServices, fetchFAQ, fetchTestimonials } = useWordPress()
const services = ref<any[]>([])
const faqs = ref<any[]>([])
const testimonials = ref<any[]>([])

onMounted(async () => {
  ;[services.value, faqs.value, testimonials.value] = await Promise.all([
    fetchServices(),
    fetchFAQ(),
    fetchTestimonials(),
  ])
})

//  Navegación
const menuOpen = ref(false)
const darkMode = ref(false)

function toggleMenu() { menuOpen.value = !menuOpen.value }
function closeMenu() { menuOpen.value = false }

function toggleDark() {
  darkMode.value = !darkMode.value
  document.documentElement.setAttribute('data-theme', darkMode.value ? 'dark' : 'light')
  localStorage.setItem('theme', darkMode.value ? 'dark' : 'light')
}

function scrollTo(id: string) {
  closeMenu()
  nextTick(() => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
  })
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark') { darkMode.value = true; document.documentElement.setAttribute('data-theme', 'dark') }
})

//  FAQ Accordion
const openFaq = ref<number | null>(null)
function toggleFaq(id: number) {
  openFaq.value = openFaq.value === id ? null : id
}

//  Formulario de Contacto
const contactForm = ref({
  nombre: '',
  correo: '',
  servicio: '',
  mensaje: '',
  honeypot: '', // campo trampa anti-robots (oculto)
})
const errors = ref({ nombre: '', correo: '', mensaje: '' })
const submitted = ref(false)
const submitting = ref(false)
const csrfToken = ref(Math.random().toString(36).slice(2)) // simulación token CSRF

// Rellena el campo servicio desde tarjeta
function selectService(serviceId: string) {
  const s = services.value.find(s => s.serviceId === serviceId)
  contactForm.value.servicio = s?.title || serviceId
  scrollTo('contacto')
}

function validateField(field: 'nombre' | 'correo' | 'mensaje') {
  const v = contactForm.value
  if (field === 'nombre') {
    errors.value.nombre = v.nombre.trim().length < 2 ? 'El nombre debe tener al menos 2 caracteres.' : ''
  }
  if (field === 'correo') {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    errors.value.correo = !re.test(v.correo.trim()) ? 'Ingresa un correo electrónico válido.' : ''
  }
  if (field === 'mensaje') {
    errors.value.mensaje = v.mensaje.trim().length < 10 ? 'El mensaje debe tener al menos 10 caracteres.' : ''
  }
}

function validateAll(): boolean {
  validateField('nombre'); validateField('correo'); validateField('mensaje')
  return !errors.value.nombre && !errors.value.correo && !errors.value.mensaje
}

async function submitForm() {
  // Anti-robot: si honeypot tiene contenido, ignorar
  if (contactForm.value.honeypot) return

  if (!validateAll()) return
  submitting.value = true

  // Simulación de envío (aquí iría la llamada al backend)
  await new Promise(r => setTimeout(r, 1200))
  submitted.value = true
  submitting.value = false

  // Reset
  contactForm.value = { nombre: '', correo: '', servicio: '', mensaje: '', honeypot: '' }
  errors.value = { nombre: '', correo: '', mensaje: '' }

  setTimeout(() => { submitted.value = false }, 5000)
}
</script setup>

<template>
  <div class="app">

    <!-- ── HEADER / NAV  -->
    <header class="header" role="banner">
      <div class="header__inner container">
        <a href="#inicio" class="header__logo" @click.prevent="scrollTo('inicio')" aria-label="ProviEmplea - Ir al inicio">
          <span class="logo-badge">PE</span>
          <span class="logo-text">ProviEmplea</span>
        </a>

        <nav
          class="nav"
          :class="{ 'nav--open': menuOpen }"
          id="main-nav"
          role="navigation"
          aria-label="Navegación principal"
        >
          <ul class="nav__list">
            <li><a class="nav__link" href="#nosotros"  @click.prevent="scrollTo('nosotros')">Nosotros</a></li>
            <li><a class="nav__link" href="#servicios" @click.prevent="scrollTo('servicios')">Servicios</a></li>
            <li><a class="nav__link" href="#testimonios" @click.prevent="scrollTo('testimonios')">Testimonios</a></li>
            <li><a class="nav__link" href="#faq"       @click.prevent="scrollTo('faq')">FAQ</a></li>
            <li><a class="nav__link nav__link--cta" href="#contacto" @click.prevent="scrollTo('contacto')">Contáctanos</a></li>
          </ul>
        </nav>

        <div class="header__actions">
          <button
            class="btn-icon"
            @click="toggleDark"
            :aria-label="darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'"
            :title="darkMode ? 'Modo claro' : 'Modo oscuro'"
          >
            {{ darkMode ? 'Modo claro' : 'Modo oscuro' }}
          </button>
          <button
            class="hamburger"
            :class="{ 'hamburger--open': menuOpen }"
            @click="toggleMenu"
            :aria-expanded="menuOpen"
            aria-controls="main-nav"
            aria-label="Abrir o cerrar menú"
          >
            <span></span><span></span><span></span>
          </button>
        </div>
      </div>
    </header>

    <main id="main-content">

      <!--  HERO  -->
      <section id="inicio" class="hero" aria-labelledby="hero-title">
        <div class="hero__bg" aria-hidden="true"></div>
        <div class="hero__content container">
          <span class="hero__eyebrow">Municipalidad de Providencia</span>
          <h1 id="hero-title" class="hero__title">
            Empleo justo,<br>sin etiquetas
          </h1>
          <p class="hero__sub">
            Conectamos empresas con talentos evaluados solo por sus habilidades.<br>
            Sin nombre, sin foto, sin dirección. Solo capacidad.
          </p>
          <div class="hero__btns">
            <button class="btn btn--primary" @click="scrollTo('servicios')">Ver servicios</button>
            <button class="btn btn--outline" @click="scrollTo('contacto')">Contáctanos</button>
          </div>
        </div>
      </section>

      <!--  NOSOTROS  -->
      <section id="nosotros" class="section section--alt" aria-labelledby="nosotros-title">
        <div class="container">
          <div class="section-grid">
            <div class="section-grid__text">
              <span class="label-tag">Quiénes somos</span>
              <h2 id="nosotros-title" class="section__title">Promovemos el empleo sin discriminación</h2>
              <p>
                ProviEmplea es la bolsa de trabajo de la <strong>Municipalidad de Providencia</strong>.
                Nuestra misión es eliminar las barreras de entrada al mundo laboral conectando
                a empresas locales con candidatos calificados a través de un proceso de selección
                anónimo y basado exclusivamente en competencias.
              </p>
              <p>
                Las empresas reciben perfiles con habilidades, experiencia y evaluaciones técnicas,
                pero <strong>nunca</strong> acceden al nombre, fotografía, edad, género ni lugar
                de residencia de los postulantes hasta que se concrete una entrevista formal.
              </p>
              <ul class="feature-list">
                <li>✓ Selección 100% basada en habilidades</li>
                <li>✓ Sin discriminación por origen, género o edad</li>
                <li>✓ Gratuito para candidatos y empresas</li>
                <li>✓ Acompañamiento durante todo el proceso</li>
              </ul>
            </div>
            <div class="section-grid__visual" aria-hidden="true">
              <div class="stat-cards">
                <div class="stat-card">
                  <span class="stat-card__num">+1.200</span>
                  <span class="stat-card__label">Candidatos activos</span>
                </div>
                <div class="stat-card">
                  <span class="stat-card__num">+350</span>
                  <span class="stat-card__label">Empresas registradas</span>
                </div>
                <div class="stat-card">
                  <span class="stat-card__num">87%</span>
                  <span class="stat-card__label">Tasa de satisfacción</span>
                </div>
                <div class="stat-card">
                  <span class="stat-card__num">0</span>
                  <span class="stat-card__label">Datos personales visibles</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--  SERVICIOS  -->
      <section id="servicios" class="section" aria-labelledby="servicios-title">
        <div class="container">
          <span class="label-tag">Lo que ofrecemos</span>
          <h2 id="servicios-title" class="section__title">Nuestros servicios</h2>
          <p class="section__sub">Soluciones para empresas y candidatos en cada etapa del proceso.</p>

          <div v-if="loading" class="loading" aria-live="polite" aria-busy="true">
            Cargando servicios…
          </div>
          <div v-else-if="error" class="error-notice" role="alert">
            Usando datos locales (CMS no disponible).
          </div>

          <div class="cards-grid" role="list">
            <ServiceCard
              v-for="svc in services"
              :key="svc.id"
              :image="svc.image"
              :title="svc.title"
              :description="svc.description"
              :service-id="svc.serviceId"
              @contact="selectService"
              role="listitem"
            />
          </div>
        </div>
      </section>

      <!-- TESTIMONIOS  -->
      <section id="testimonios" class="section section--alt" aria-labelledby="testimonios-title">
        <div class="container">
          <span class="label-tag">Lo que dicen</span>
          <h2 id="testimonios-title" class="section__title">Testimonios</h2>
          <p class="section__sub">Experiencias reales de candidatos y empresas que usaron ProviEmplea.</p>
          <TestimonialCarousel v-if="testimonials.length" :testimonials="testimonials" />
        </div>
      </section>

      <!-- FAQ-->
      <section id="faq" class="section" aria-labelledby="faq-title">
        <div class="container container--narrow">
          <span class="label-tag">Preguntas frecuentes</span>
          <h2 id="faq-title" class="section__title">¿Tienes dudas?</h2>

          <div class="accordion" role="list">
            <div
              v-for="faq in faqs"
              :key="faq.id"
              class="accordion__item"
              role="listitem"
            >
              <button
                class="accordion__trigger"
                :aria-expanded="openFaq === faq.id"
                :aria-controls="`faq-body-${faq.id}`"
                @click="toggleFaq(faq.id)"
              >
                <span>{{ faq.question }}</span>
                <span class="accordion__icon" aria-hidden="true">
                  {{ openFaq === faq.id ? '−' : '+' }}
                </span>
              </button>
              <div
                :id="`faq-body-${faq.id}`"
                class="accordion__body"
                :class="{ 'accordion__body--open': openFaq === faq.id }"
                role="region"
              >
                <p>{{ faq.answer }}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!--  CONTACTO  -->
      <section id="contacto" class="section section--alt" aria-labelledby="contacto-title">
        <div class="container container--narrow">
          <span class="label-tag">Escríbenos</span>
          <h2 id="contacto-title" class="section__title">Formulario de contacto</h2>

          <!-- Notificación de éxito -->
          <div
            v-if="submitted"
            class="toast toast--success"
            role="alert"
            aria-live="assertive"
          >
            ✓ Mensaje enviado con éxito. Te responderemos pronto.
          </div>

          <form
            class="contact-form"
            @submit.prevent="submitForm"
            novalidate
            aria-label="Formulario de contacto"
          >
            <!-- Token CSRF oculto (simulado) -->
            <input type="hidden" name="_csrf" :value="csrfToken" />

            <!-- Honeypot anti-robots: oculto visualmente, visible para bots -->
            <div class="visually-hidden" aria-hidden="true">
              <label for="website">No completar este campo</label>
              <input id="website" v-model="contactForm.honeypot" type="text" name="website" tabindex="-1" autocomplete="off" />
            </div>

            <div class="form-group">
              <label class="form-label" for="nombre">
                Nombre completo <span aria-hidden="true">*</span>
              </label>
              <input
                id="nombre"
                v-model="contactForm.nombre"
                type="text"
                class="form-input"
                :class="{ 'form-input--error': errors.nombre }"
                @blur="validateField('nombre')"
                autocomplete="name"
                required
                aria-required="true"
                :aria-describedby="errors.nombre ? 'error-nombre' : undefined"
              />
              <span v-if="errors.nombre" id="error-nombre" class="form-error" role="alert">
                {{ errors.nombre }}
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="correo">
                Correo electrónico <span aria-hidden="true">*</span>
              </label>
              <input
                id="correo"
                v-model="contactForm.correo"
                type="email"
                class="form-input"
                :class="{ 'form-input--error': errors.correo }"
                @blur="validateField('correo')"
                autocomplete="email"
                required
                aria-required="true"
                :aria-describedby="errors.correo ? 'error-correo' : undefined"
              />
              <span v-if="errors.correo" id="error-correo" class="form-error" role="alert">
                {{ errors.correo }}
              </span>
            </div>

            <div class="form-group">
              <label class="form-label" for="servicio">Servicio de interés</label>
              <select id="servicio" v-model="contactForm.servicio" class="form-input">
                <option value="">Selecciona un servicio (opcional)</option>
                <option v-for="svc in services" :key="svc.serviceId" :value="svc.title">
                  {{ svc.title }}
                </option>
              </select>
            </div>

            <div class="form-group">
              <label class="form-label" for="mensaje">
                Mensaje <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="mensaje"
                v-model="contactForm.mensaje"
                class="form-input form-textarea"
                :class="{ 'form-input--error': errors.mensaje }"
                @blur="validateField('mensaje')"
                rows="5"
                required
                aria-required="true"
                :aria-describedby="errors.mensaje ? 'error-mensaje' : undefined"
              ></textarea>
              <span v-if="errors.mensaje" id="error-mensaje" class="form-error" role="alert">
                {{ errors.mensaje }}
              </span>
            </div>

            <button
              type="submit"
              class="btn btn--primary btn--full"
              :disabled="submitting"
              :aria-busy="submitting"
            >
              {{ submitting ? 'Enviando…' : 'Enviar mensaje' }}
            </button>

            <p class="form-legal">
              Al enviar, aceptas nuestra <a href="#" class="link">política de privacidad</a>.
              Tus datos no serán compartidos con terceros.
            </p>
          </form>
        </div>
      </section>
    </main>

    <!--  FOOTER  -->
    <footer class="footer" role="contentinfo">
      <div class="container footer__grid">
        <div>
          <div class="footer__brand">
            <span class="logo-badge logo-badge--sm">PE</span>
            <span class="logo-text">ProviEmplea</span>
          </div>
          <p class="footer__desc">
            Bolsa de trabajo de la Municipalidad de Providencia. Empleo justo para todos.
          </p>
        </div>
        <div>
          <h3 class="footer__heading">Navegación</h3>
          <ul class="footer__links">
            <li><a href="#nosotros"    @click.prevent="scrollTo('nosotros')">Nosotros</a></li>
            <li><a href="#servicios"   @click.prevent="scrollTo('servicios')">Servicios</a></li>
            <li><a href="#faq"         @click.prevent="scrollTo('faq')">FAQ</a></li>
            <li><a href="#contacto"    @click.prevent="scrollTo('contacto')">Contacto</a></li>
          </ul>
        </div>
        <div>
          <h3 class="footer__heading">Contacto</h3>
          <address class="footer__address">
            <p>Municipalidad de Providencia</p>
            <p>Av. Pedro de Valdivia 360, Providencia</p>
            <p><a href="mailto:proviemplea@providencia.cl" class="link">proviemplea@providencia.cl</a></p>
          </address>
        </div>
      </div>
      <div class="footer__bottom">
        <p>© {{ new Date().getFullYear() }} ProviEmplea — Municipalidad de Providencia. Todos los derechos reservados.</p>
      </div>
    </footer>

  </div>
</template>
