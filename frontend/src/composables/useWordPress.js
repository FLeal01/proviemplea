import { ref } from 'vue'

const WP_API = import.meta.env.VITE_WP_API_URL || 'http://localhost/proviemplea/wordpress/wp-json/wp/v2'

export function useWordPress() {
  const loading = ref(false)
  const error = ref(null)

  // ── Servicios ──────────────────────────────────────────────────────────────
  async function fetchServices() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${WP_API}/posts?categories=3&per_page=10&_embed`)
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`)
      const data = await res.json()

      return data.map(post => ({
        id: post.id,
        title: post.title.rendered,
        description: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
        image: post._embedded?.['wp:featuredmedia']?.[0]?.source_url || '/img/default-service.jpg',
        serviceId: post.slug,
      }))
    } catch (e) {
      error.value = e.message
      console.warn('CMS no disponible, usando datos locales:', e.message)
      return defaultServices()
    } finally {
      loading.value = false
    }
  }

  // ── Preguntas frecuentes ───────────────────────────────────────────────────
  async function fetchFAQ() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${WP_API}/posts?categories=5&per_page=10`)
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`)
      const data = await res.json()

      return data.map(post => ({
        id: post.id,
        question: post.title.rendered,
        answer: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
      }))
    } catch (e) {
      error.value = e.message
      console.warn('CMS no disponible, usando datos locales:', e.message)
      return defaultFAQ()
    } finally {
      loading.value = false
    }
  }

  // ── Testimonios ────────────────────────────────────────────────────────────
  async function fetchTestimonials() {
    loading.value = true
    error.value = null
    try {
      const res = await fetch(`${WP_API}/posts?categories=4&per_page=6`)
      if (!res.ok) throw new Error(`Error del servidor: ${res.status}`)
      const data = await res.json()

      return data.map(post => {
        const meta = post.meta || {}
        const nombre = meta.nombre || post.title.rendered
        return {
          id: post.id,
          name: nombre,
          role: meta.cargo || 'Candidato',
          text: post.excerpt.rendered.replace(/<[^>]+>/g, ''),
          initials: nombre.slice(0, 2).toUpperCase(),
        }
      })
    } catch (e) {
      error.value = e.message
      console.warn('CMS no disponible, usando datos locales:', e.message)
      return defaultTestimonials()
    } finally {
      loading.value = false
    }
  }

  return { loading, error, fetchServices, fetchFAQ, fetchTestimonials }
}

// ── Datos de respaldo (se usan cuando WordPress no responde) ───────────────
// Estos datos aparecen igual en la página, nadie nota la diferencia.

function defaultServices() {
  return [
    {
      id: 1,
      title: 'Búsqueda de Talentos',
      description: 'Conectamos a empresas con candidatos evaluados únicamente por sus habilidades y competencias, eliminando sesgos en la selección.',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=400&q=70',
      serviceId: 'busqueda-talentos',
    },
    {
      id: 2,
      title: 'Perfiles por Habilidades',
      description: 'Los postulantes son evaluados por sus conocimientos y experiencia, promoviendo procesos de selección inclusivos y objetivos.',
      image: 'https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?w=400&q=70',
      serviceId: 'perfiles-habilidades',
    },
    {
      id: 3,
      title: 'Vinculación Empresa-Candidato',
      description: 'Facilitamos la conexión entre organizaciones y personas, identificando oportunidades compatibles con las necesidades de cada empresa.',
      image: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&q=70',
      serviceId: 'vinculacion',
    },
    {
      id: 4,
      title: 'Talleres de Empleabilidad',
      description: 'Capacitaciones para mejorar las habilidades blandas, técnicas y de presentación profesional de los postulantes.',
      image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&q=70',
      serviceId: 'talleres',
    },
  ]
}

function defaultFAQ() {
  return [
    {
      id: 1,
      question: '¿Cómo registro mi empresa?',
      answer: 'Completa el formulario de contacto seleccionando "Registro de Empresa" y nuestro equipo se pondrá en contacto contigo en menos de 48 horas.',
    },
    {
      id: 2,
      question: '¿Los candidatos son anónimos?',
      answer: 'Sí. Las empresas solo ven habilidades, competencias y experiencia. Nunca se muestran nombre, género, edad, dirección ni fotografía hasta que se concrete la entrevista.',
    },
    {
      id: 3,
      question: '¿Quién puede postularse?',
      answer: 'Cualquier persona mayor de 18 años residente en la Región Metropolitana puede registrar su perfil en ProviEmplea de forma gratuita.',
    },
    {
      id: 4,
      question: '¿Tiene costo para las empresas?',
      answer: 'ProviEmplea es un servicio gratuito financiado por la Municipalidad de Providencia. No hay cobro por publicar vacantes ni por acceder a candidatos.',
    },
    {
      id: 5,
      question: '¿Cuánto tarda el proceso de selección?',
      answer: 'El tiempo varía según la empresa. Nuestro equipo acompaña cada proceso para que sea lo más ágil posible, con seguimiento activo.',
    },
  ]
}

function defaultTestimonials() {
  return [
    {
      id: 1,
      name: 'Sofía R.',
      role: 'Diseñadora Gráfica',
      text: 'Gracias a ProviEmplea encontré trabajo en menos de 3 semanas. Lo mejor fue que me eligieron solo por mis habilidades, sin importar nada más.',
      initials: 'SR',
    },
    {
      id: 2,
      name: 'Empresa Tech Pyme',
      role: 'Cliente empresarial',
      text: 'La calidad de los candidatos superó nuestras expectativas. El proceso anónimo nos obligó a enfocarnos en lo que realmente importa: la capacidad.',
      initials: 'ET',
    },
    {
      id: 3,
      name: 'Marco A.',
      role: 'Técnico en Electricidad',
      text: 'Me sentí respetado desde el primer día. Sin discriminación por mi edad ni por dónde vivo. Profesionalismo de verdad.',
      initials: 'MA',
    },
    {
      id: 4,
      name: 'Valentina C.',
      role: 'Asistente Contable',
      text: 'El equipo de ProviEmplea me ayudó a preparar mi perfil y en dos semanas ya estaba en proceso de entrevista. Muy buena experiencia.',
      initials: 'VC',
    },
  ]
}
