<script setup lang="ts">
/**
 * TestimonialCarousel.vue
 * Carrusel de testimonios responsive y accesible.
 * Soporte touch/swipe en móvil, teclado en escritorio.
 */
import { ref, computed, onMounted, onUnmounted } from 'vue'

interface Testimonial {
  id: number
  name: string
  role: string
  text: string
  initials: string
}

const props = defineProps<{ testimonials: Testimonial[] }>()

const current = ref(0)
const total = computed(() => props.testimonials.length)
const autoplayTimer = ref<ReturnType<typeof setInterval> | null>(null)

// Touch swipe
const touchStartX = ref(0)

function prev() {
  current.value = (current.value - 1 + total.value) % total.value
  resetAutoplay()
}
function next() {
  current.value = (current.value + 1) % total.value
  resetAutoplay()
}
function goTo(i: number) {
  current.value = i
  resetAutoplay()
}

function startAutoplay() {
  autoplayTimer.value = setInterval(next, 5000)
}
function resetAutoplay() {
  if (autoplayTimer.value) clearInterval(autoplayTimer.value)
  startAutoplay()
}

function onTouchStart(e: TouchEvent) {
  touchStartX.value = e.touches[0].clientX
}
function onTouchEnd(e: TouchEvent) {
  const diff = touchStartX.value - e.changedTouches[0].clientX
  if (Math.abs(diff) > 50) diff > 0 ? next() : prev()
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === 'ArrowLeft') prev()
  if (e.key === 'ArrowRight') next()
}

onMounted(() => {
  startAutoplay()
  window.addEventListener('keydown', onKeydown)
})
onUnmounted(() => {
  if (autoplayTimer.value) clearInterval(autoplayTimer.value)
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <section
    class="carousel"
    aria-roledescription="carrusel"
    aria-label="Testimonios de candidatos"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <div class="carousel__track" role="list">
      <div
        v-for="(t, i) in testimonials"
        :key="t.id"
        class="carousel__slide"
        :class="{ 'carousel__slide--active': i === current }"
        role="listitem"
        :aria-hidden="i !== current"
      >
        <blockquote class="testimonial">
          <p class="testimonial__text">"{{ t.text }}"</p>
          <footer class="testimonial__footer">
            <div class="testimonial__avatar" aria-hidden="true">{{ t.initials }}</div>
            <div>
              <cite class="testimonial__name">{{ t.name }}</cite>
              <span class="testimonial__role">{{ t.role }}</span>
            </div>
          </footer>
        </blockquote>
      </div>
    </div>

    <div class="carousel__controls" role="group" aria-label="Controles del carrusel">
      <button
        class="carousel__btn"
        @click="prev"
        aria-label="Testimonio anterior"
      >&#8592;</button>

      <div class="carousel__dots" role="tablist" aria-label="Seleccionar testimonio">
        <button
          v-for="(_, i) in testimonials"
          :key="i"
          class="carousel__dot"
          :class="{ 'carousel__dot--active': i === current }"
          @click="goTo(i)"
          :aria-label="`Testimonio ${i + 1}`"
          :aria-selected="i === current"
          role="tab"
        />
      </div>

      <button
        class="carousel__btn"
        @click="next"
        aria-label="Siguiente testimonio"
      >&#8594;</button>
    </div>
  </section>
</template>

<style scoped>
.carousel {
  position: relative;
  overflow: hidden;
  padding: 1rem 0 2rem;
}
.carousel__track {
  position: relative;
  min-height: 220px;
}
.carousel__slide {
  position: absolute;
  inset: 0;
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.4s ease;
}
.carousel__slide--active {
  opacity: 1;
  pointer-events: auto;
  position: relative;
}
.testimonial {
  background: #f7fafc;
  border-left: 4px solid #005288;
  border-radius: 8px;
  padding: 1.5rem;
  margin: 0;
  max-width: 680px;
  margin: 0 auto;
}
.testimonial__text {
  font-size: 1rem;
  line-height: 1.7;
  color: #2d3748;
  font-style: italic;
  margin-bottom: 1.25rem;
}
.testimonial__footer {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.testimonial__avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: #005288;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 0.9rem;
  flex-shrink: 0;
}
.testimonial__name {
  display: block;
  font-style: normal;
  font-weight: 600;
  color: #003f6b;
  font-size: 0.95rem;
}
.testimonial__role {
  font-size: 0.82rem;
  color: #718096;
}
.carousel__controls {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin-top: 1.25rem;
}
.carousel__btn {
  background: none;
  border: 1.5px solid #005288;
  color: #005288;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}
.carousel__btn:hover { background: #e8f0fe; }
.carousel__btn:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }
.carousel__dots {
  display: flex;
  gap: 8px;
}
.carousel__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: #cbd5e0;
  border: none;
  cursor: pointer;
  transition: background 0.2s, transform 0.2s;
}
.carousel__dot--active {
  background: #005288;
  transform: scale(1.3);
}
.carousel__dot:focus-visible { outline: 3px solid #f59e0b; outline-offset: 2px; }

@media (max-width: 640px) {
  .testimonial { padding: 1rem; }
  .testimonial__text { font-size: 0.92rem; }
}
</style>
