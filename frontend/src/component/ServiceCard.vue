<script setup lang="ts">
/**
 * ServiceCard.vue
 * Componente reutilizable de tarjeta de servicio.
 * Props: image, title, description, serviceId
 * Emite evento 'contact' con el id del servicio seleccionado.
 */
defineProps<{
  image: string
  title: string
  description: string
  serviceId: string
}>()

const emit = defineEmits<{
  contact: [serviceId: string]
}>()
</script>

<template>
  <article
    class="service-card"
    role="article"
    :aria-label="`Servicio: ${title}`"
  >
    <div class="service-card__img-wrap">
      <img
        :src="image"
        :alt="`Imagen del servicio: ${title}`"
        class="service-card__img"
        loading="lazy"
        width="320"
        height="200"
      />
    </div>
    <div class="service-card__body">
      <h3 class="service-card__title">{{ title }}</h3>
      <p class="service-card__desc">{{ description }}</p>
      <button
        class="service-card__btn"
        @click="emit('contact', serviceId)"
        :aria-label="`Contactar sobre: ${title}`"
      >
        Contáctanos
      </button>
    </div>
  </article>
</template>

<style scoped>
.service-card {
  background: #ffffff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: 300px;
  flex-shrink: 0;
}
.service-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 82, 136, 0.12);
}
.service-card__img-wrap {
  width: 100%;
  height: 180px;
  overflow: hidden;
  background: #f0f4f8;
}
.service-card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.service-card__body {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex: 1;
}
.service-card__title {
  font-size: 1.05rem;
  font-weight: 600;
  color: #003f6b;
  margin: 0;
}
.service-card__desc {
  font-size: 0.9rem;
  color: #4a5568;
  line-height: 1.6;
  margin: 0;
  flex: 1;
}
.service-card__btn {
  align-self: flex-start;
  background: #005288;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1.25rem;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s ease;
}
.service-card__btn:hover {
  background: #003f6b;
}
.service-card__btn:focus-visible {
  outline: 3px solid #f59e0b;
  outline-offset: 2px;
}
</style>
