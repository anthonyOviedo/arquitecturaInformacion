<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

useHead({
  title: 'Experiencias de café de Costa Rica | Alma del Volcán',
  meta: [
    {
      name: 'description',
      content:
        'Vive un recorrido sensorial por café de especialidad de Costa Rica: selecciona tu ritual, descubre orígenes y recibe tueste fresco en menos de 48 horas.'
    }
  ]
})

type HeroStat = { label: string; value: string; detail: string }
const heroStats: HeroStat[] = [
  { label: 'Denominaciones de origen', value: '8', detail: 'Microlotes de altura' },
  { label: 'Tiempo al tueste', value: '48 h', detail: 'Desde tu orden' },
  { label: 'Productores aliados', value: '35', detail: 'Cooperativas sostenibles' }
]

const heroImage =
  'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=1600&q=80'

type Experience = {
  id: string
  title: string
  tagline: string
  description: string
  image: string
  highlights: string[]
}

const experiences: Experience[] = [
  {
    id: 'amanecer',
    title: 'Amanecer en Tarrazú',
    tagline: 'Brillo cítrico y miel de caña',
    description:
      'Empieza el día con un pour-over calibrado y aromas a flor de azahar. Nuestro barista digital ajusta molienda y temperatura por ti.',
    image: 'https://images.unsplash.com/photo-1461988091159-192b6df7054f?auto=format&fit=crop&w=900&q=80',
    highlights: [
      'Molienda a medida para V60 o Kalita',
      'Suscripción semanal con tueste 48 h',
      'Notas de mandarina, miel y cacao suave'
    ]
  },
  {
    id: 'ritual',
    title: 'Ritual volcánico',
    tagline: 'Cuerpo redondo y cacao intenso',
    description:
      'Un espresso inspirado en los suelos volcánicos de Tres Ríos. Configura tu perfil y recibe cápsulas o granos listos para tu máquina.',
    image: 'https://images.unsplash.com/photo-1447933601403-0c6688de566e?auto=format&fit=crop&w=900&q=80',
    highlights: [
      'Curvas de tueste para espresso o moka',
      'Blend exclusivo con notas de panela',
      'Recomendaciones de maridaje en la app'
    ]
  },
  {
    id: 'tarde',
    title: 'Tarde en el bosque nuboso',
    tagline: 'Suavidad herbácea y flores blancas',
    description:
      'Experimenta un cold brew infusionado en frío con agua de manantial. Ideal para tardes cálidas y coctelería de autor.',
    image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80',
    highlights: [
      'Infusiones en frío de 18 horas',
      'Concentrado listo para mocktails',
      'Notas de lavanda, vainilla y caña dulce'
    ]
  }
]

const selectedExperience = ref<Experience>(experiences[0])

type RegionHighlight = {
  name: string
  altitude: string
  profile: string
  detail: string
}

const regionHighlights: RegionHighlight[] = [
  {
    name: 'Tarrazú',
    altitude: '1 200 – 1 900 msnm',
    profile: 'Cítricos brillantes, miel y chocolate',
    detail: 'Cafetales en terrazas con sombra nativa que preservan biodiversidad y agua cristalina.'
  },
  {
    name: 'Valle Central',
    altitude: '1 000 – 1 400 msnm',
    profile: 'Cuerpo aterciopelado y notas a nuez',
    detail: 'Fincas familiares con procesos honey y lavado que resaltan dulzor natural.'
  },
  {
    name: 'Tres Ríos',
    altitude: '1 200 – 1 650 msnm',
    profile: 'Cacao intenso, melaza y especias',
    detail:
      'Suelos volcánicos rodeados por los volcanes Irazú y Turrialba que concentran minerales únicos.'
  }
]

type BrewProfile = {
  id: string
  name: string
  method: string
  notes: string
  balance: number
  ritual: string
}

const brewProfiles: BrewProfile[] = [
  {
    id: 'pour-over',
    name: 'Brillante',
    method: 'Pour-over',
    notes: 'Ideal para quienes buscan acidez cítrica y un final sedoso.',
    balance: 28,
    ritual: 'Recomendado con microlotes de Tarrazú tostados ligero.'
  },
  {
    id: 'chemex',
    name: 'Equilibrada',
    method: 'Chemex',
    notes: 'Dulzura envolvente con notas a caramelo y frutas tropicales.',
    balance: 52,
    ritual: 'Perfecta para Valle Central y métodos de filtro compartidos.'
  },
  {
    id: 'espresso',
    name: 'Intensa',
    method: 'Espresso',
    notes: 'Cuerpo profundo, crema densa y recuerdos de cacao.',
    balance: 82,
    ritual: 'Explota los perfiles volcánicos de Tres Ríos en espresso o moka.'
  }
]

const selectedProfile = ref<BrewProfile>(brewProfiles[1])
const flavorBalance = ref<number>(selectedProfile.value.balance)

const balanceDescriptor = computed(() => {
  if (flavorBalance.value < 40) {
    return {
      title: 'Brillante & floral',
      description: 'Resalta cítricos dulces, flor de café y acidez jugosa típica de Tarrazú.'
    }
  }
  if (flavorBalance.value < 70) {
    return {
      title: 'Sedosa & mielada',
      description: 'Balance dulce con textura cremosa y recuerdos a caña que definen el Valle Central.'
    }
  }
  return {
    title: 'Intensa & achocolatada',
    description: 'Sensación aterciopelada con cacao especiado y melaza propia de Tres Ríos.'
  }
})

const sliderGradient = computed(() => {
  if (flavorBalance.value < 40) {
    return 'linear-gradient(135deg, #f7efe5 0%, #d0a362 100%)'
  }
  if (flavorBalance.value < 70) {
    return 'linear-gradient(135deg, #f7efe5 0%, #c38452 100%)'
  }
  return 'linear-gradient(135deg, #f7efe5 0%, #8c4a2f 100%)'
})

const timelineSteps = [
  {
    title: 'Selección en altura',
    description: 'Granos maduros recolectados a mano en cafetales sombreados por el bosque nuboso.'
  },
  {
    title: 'Beneficiado preciso',
    description: 'Procesos honey y lavado controlados que conservan dulzor natural y reducen el uso de agua.'
  },
  {
    title: 'Tueste bajo demanda',
    description: 'Perfilamos curvas térmicas exclusivas para cada microlote y método que elijas.'
  },
  {
    title: 'Entrega fresca',
    description: 'Despacho en menos de 48 horas con trazabilidad completa desde la finca a tu puerta.'
  }
]

const heroActions = [
  { label: 'Explorar experiencias', target: 'experiencias', variant: 'primary' },
  { label: 'Conocer orígenes', target: 'origenes', variant: 'ghost' }
]

const scrollToSection = (sectionId: string) => {
  if (!process.client) return
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const selectExperience = (experience: Experience) => {
  selectedExperience.value = experience
}

const selectProfile = (profile: BrewProfile) => {
  selectedProfile.value = profile
  flavorBalance.value = profile.balance
}

let revealObserver: IntersectionObserver | null = null

onMounted(() => {
  if (!process.client) return

  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
        }
      })
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    }
  )

  document.querySelectorAll<HTMLElement>('.reveal-on-scroll').forEach((element) => {
    element.classList.add('is-ready')
    revealObserver?.observe(element)
  })
})

onBeforeUnmount(() => {
  revealObserver?.disconnect()
})
</script>

<template>
  <main class="page">
    <section class="hero">
      <div class="hero__background" :style="{ backgroundImage: `url(${heroImage})` }" />
      <div class="hero__overlay" />
      <div class="container hero__content">
        <span class="hero__tag">Café de especialidad · Costa Rica</span>
        <h1 class="hero__title">Siente la esencia volcánica en cada taza</h1>
        <p class="hero__subtitle">
          Configura experiencias inmersivas con café recién tostado, directo de productores costarricenses.
        </p>
        <div class="hero__actions">
          <button
            v-for="action in heroActions"
            :key="action.target"
            :class="['button', action.variant === 'ghost' ? 'button--ghost' : 'button--primary']"
            type="button"
            @click="scrollToSection(action.target)"
          >
            {{ action.label }}
          </button>
        </div>
        <div class="hero__stats">
          <div v-for="stat in heroStats" :key="stat.label" class="stat-card">
            <span class="stat-card__value">{{ stat.value }}</span>
            <span class="stat-card__label">{{ stat.label }}</span>
            <p class="stat-card__detail">{{ stat.detail }}</p>
          </div>
        </div>
      </div>
    </section>

    <section id="experiencias" class="section experiences reveal-on-scroll">
      <div class="container">
        <header class="section__header">
          <h2>Elige tu momento ideal</h2>
          <p>Activa una experiencia curada y descubre cómo personalizamos molienda, tueste y ritual.</p>
        </header>
        <div class="experiences__grid">
          <article
            v-for="experience in experiences"
            :key="experience.id"
            :class="['experience-card', { 'is-active': experience.id === selectedExperience.id }]"
            @click="selectExperience(experience)"
          >
            <div class="experience-card__media" :style="{ backgroundImage: `url(${experience.image})` }">
              <span class="experience-card__tag">{{ experience.tagline }}</span>
            </div>
            <div class="experience-card__body">
              <h3>{{ experience.title }}</h3>
              <p>{{ experience.description }}</p>
            </div>
          </article>
        </div>
        <transition name="fade-slide">
          <div :key="selectedExperience.id" class="experience-detail">
            <h3>{{ selectedExperience.title }}</h3>
            <ul>
              <li v-for="highlight in selectedExperience.highlights" :key="highlight">
                {{ highlight }}
              </li>
            </ul>
          </div>
        </transition>
      </div>
    </section>

    <section id="origenes" class="section origins reveal-on-scroll">
      <div class="container origins__layout">
        <div class="origins__visual">
          <div class="origins__image">
            <img
              src="https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?auto=format&fit=crop&w=1000&q=80"
              alt="Paisaje cafetalero de Costa Rica"
              loading="lazy"
            />
          </div>
          <span class="origins__caption">Bosques nubosos, suelos volcánicos y microclimas que perfuman cada grano.</span>
        </div>
        <div class="origins__content">
          <h2>Orígenes con identidad costarricense</h2>
          <p>Conecta con microlotes trazables cultivados en equilibrio con la naturaleza.</p>
          <div class="origins__cards">
            <article v-for="region in regionHighlights" :key="region.name" class="origin-card">
              <h3>{{ region.name }}</h3>
              <p class="origin-card__profile">{{ region.profile }}</p>
              <p class="origin-card__altitude">{{ region.altitude }}</p>
              <p class="origin-card__detail">{{ region.detail }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <section class="section sensory reveal-on-scroll">
      <div class="container sensory__grid">
        <div class="sensory__panel">
          <h2>Afina tu perfil sensorial</h2>
          <p>Desliza para encontrar tu balance perfecto entre brillo, dulzor e intensidad.</p>
          <div class="sensory__meter" :style="{ background: sliderGradient }">
            <input v-model="flavorBalance" type="range" min="0" max="100" />
            <div class="sensory__labels">
              <span>Brillante</span>
              <span>Dulce</span>
              <span>Intenso</span>
            </div>
          </div>
          <div class="sensory__result">
            <h3>{{ balanceDescriptor.title }}</h3>
            <p>{{ balanceDescriptor.description }}</p>
          </div>
        </div>
        <div class="sensory__profiles">
          <h3>Perfiles recomendados</h3>
          <div class="profile-grid">
            <button
              v-for="profile in brewProfiles"
              :key="profile.id"
              :class="['profile-card', { 'is-selected': profile.id === selectedProfile.id }]"
              type="button"
              @click="selectProfile(profile)"
            >
              <span class="profile-card__name">{{ profile.name }}</span>
              <span class="profile-card__method">{{ profile.method }}</span>
              <p class="profile-card__notes">{{ profile.notes }}</p>
            </button>
          </div>
          <div class="profile-detail">
            <p>{{ selectedProfile.ritual }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section journey reveal-on-scroll">
      <div class="container">
        <header class="section__header">
          <h2>Ruta del grano a tu taza</h2>
          <p>Transparencia total con hitos monitoreados en tiempo real.</p>
        </header>
        <div class="timeline">
          <div
            v-for="(step, index) in timelineSteps"
            :key="step.title"
            class="timeline__step"
            :style="{ transitionDelay: `${index * 80}ms` }"
          >
            <span class="timeline__index">{{ index + 1 }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section cta reveal-on-scroll">
      <div class="container cta__content">
        <div>
          <h2>Agenda una cata virtual</h2>
          <p>Descubre lotes exclusivos con un barista costarricense en vivo y recibe tu kit degustación en casa.</p>
        </div>
        <button class="button button--ghost" type="button" @click="scrollToSection('experiencias')">
          Iniciar recorrido
        </button>
      </div>
    </section>
  </main>
</template>

<style scoped>
:global(:root) {
  --coffee-dark: #2b1d14;
  --coffee-medium: #8c5a2b;
  --coffee-cream: #f7efe5;
  --coffee-leaf: #4e8d64;
  --coffee-sand: #d0a362;
  --coffee-shadow: rgba(26, 18, 12, 0.7);
  --coffee-white: #fff9f3;
  --coffee-black: #120b07;
  font-family: 'Inter', 'Helvetica Neue', Arial, sans-serif;
}

.page {
  background: var(--coffee-cream);
  color: var(--coffee-dark);
  min-height: 100vh;
  overflow-x: hidden;
}

.container {
  width: min(1100px, 92vw);
  margin: 0 auto;
}

.section {
  padding: 5rem 0;
}

.section__header {
  text-align: center;
  max-width: 640px;
  margin: 0 auto 3rem;
  color: var(--coffee-dark);
}

.section__header h2 {
  font-size: clamp(2rem, 3vw, 2.6rem);
  margin-bottom: 0.75rem;
}

.section__header p {
  font-size: 1rem;
  opacity: 0.78;
}

.hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem 0 4rem;
  color: #ffffff;
}

.hero__background,
.hero__overlay {
  position: absolute;
  inset: 0;
}

.hero__background {
  background-size: cover;
  background-position: center;
  transform: scale(1.05);
  transition: transform 12s ease;
  filter: saturate(1.1) brightness(0.9);
}

.hero:hover .hero__background {
  transform: scale(1.1);
}

.hero__overlay {
  background: linear-gradient(120deg, rgba(18, 11, 7, 0.9) 15%, rgba(43, 29, 20, 0.75) 55%, rgba(18, 11, 7, 0.6) 100%);
}

.hero__content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  animation: fade-in 1s ease forwards;
}

.hero__tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  width: fit-content;
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  text-transform: uppercase;
  letter-spacing: 0.12em;
  font-size: 0.75rem;
  font-weight: 600;
}

.hero__title {
  font-size: clamp(2.8rem, 5vw, 3.6rem);
  line-height: 1.1;
  max-width: 14ch;
  text-shadow: 0 10px 40px rgba(0, 0, 0, 0.45);
}

.hero__subtitle {
  font-size: 1.05rem;
  max-width: 46ch;
  opacity: 0.85;
}

.hero__actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
}

.button {
  border: none;
  cursor: pointer;
  border-radius: 999px;
  font-weight: 600;
  padding: 0.8rem 1.6rem;
  font-size: 0.95rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.button--primary {
  background: linear-gradient(120deg, #f0cf97, #c8894f);
  color: var(--coffee-black);
  box-shadow: 0 12px 25px rgba(0, 0, 0, 0.25);
}

.button--ghost {
  background: transparent;
  color: #ffffff;
  border: 1.5px solid rgba(255, 255, 255, 0.65);
}

.button:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 32px rgba(0, 0, 0, 0.28);
}

.hero__stats {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  margin-top: 1rem;
}

.stat-card {
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(14px);
  padding: 1.2rem 1.3rem;
  border-radius: 18px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.stat-card__value {
  display: block;
  font-size: 2rem;
  font-weight: 700;
}

.stat-card__label {
  display: block;
  font-size: 0.85rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  opacity: 0.75;
}

.stat-card__detail {
  margin-top: 0.6rem;
  font-size: 0.85rem;
  opacity: 0.72;
}

.experiences__grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.experience-card {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 20px 40px rgba(19, 12, 8, 0.08);
  transition: transform 0.4s ease, box-shadow 0.4s ease, border 0.3s ease;
  border: 1px solid rgba(140, 74, 47, 0.15);
  display: flex;
  flex-direction: column;
}

.experience-card__media {
  background-size: cover;
  background-position: center;
  aspect-ratio: 4 / 5;
  position: relative;
}

.experience-card__media::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(18, 11, 7, 0) 40%, rgba(18, 11, 7, 0.6) 100%);
}

.experience-card__tag {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  padding: 0.4rem 0.8rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.88);
  color: var(--coffee-black);
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  z-index: 1;
}

.experience-card__body {
  padding: 1.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  flex: 1;
}

.experience-card__body h3 {
  font-size: 1.2rem;
  font-weight: 700;
  color: var(--coffee-dark);
}

.experience-card__body p {
  font-size: 0.95rem;
  line-height: 1.5;
  color: rgba(27, 17, 12, 0.75);
}

.experience-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 26px 52px rgba(18, 11, 7, 0.12);
}

.experience-card.is-active {
  border: 1.5px solid rgba(78, 141, 100, 0.6);
  box-shadow: 0 26px 52px rgba(78, 141, 100, 0.24);
}

.experience-detail {
  margin-top: 2.5rem;
  padding: 2rem;
  border-radius: 28px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.92), rgba(247, 239, 229, 0.92));
  box-shadow: 0 20px 50px rgba(18, 11, 7, 0.12);
}

.experience-detail h3 {
  font-size: 1.3rem;
  margin-bottom: 1rem;
  color: var(--coffee-dark);
}

.experience-detail ul {
  display: grid;
  gap: 0.75rem;
  padding-left: 1.2rem;
  color: rgba(27, 17, 12, 0.8);
}

.origins__layout {
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
}

.origins__visual {
  display: grid;
  gap: 1rem;
}

.origins__image {
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(18, 11, 7, 0.15);
}

.origins__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.origins__caption {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(27, 17, 12, 0.6);
}

.origins__content h2 {
  font-size: clamp(2.2rem, 4vw, 2.8rem);
  margin-bottom: 1rem;
}

.origins__content p {
  font-size: 1rem;
  max-width: 40ch;
  margin-bottom: 2rem;
  color: rgba(27, 17, 12, 0.7);
}

.origins__cards {
  display: grid;
  gap: 1.2rem;
}

.origin-card {
  padding: 1.5rem;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(140, 74, 47, 0.15);
  box-shadow: 0 15px 35px rgba(18, 11, 7, 0.08);
  transition: transform 0.3s ease, border 0.3s ease;
}

.origin-card:hover {
  transform: translateY(-6px);
  border-color: rgba(78, 141, 100, 0.6);
}

.origin-card h3 {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  color: var(--coffee-dark);
}

.origin-card__profile {
  font-weight: 600;
  color: rgba(78, 141, 100, 0.95);
}

.origin-card__altitude {
  font-size: 0.9rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0.6rem 0;
  color: rgba(27, 17, 12, 0.5);
}

.origin-card__detail {
  font-size: 0.95rem;
  color: rgba(27, 17, 12, 0.75);
}

.sensory {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.85), rgba(247, 239, 229, 0.9));
}

.sensory__grid {
  display: grid;
  gap: 3rem;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: center;
}

.sensory__panel h2 {
  font-size: clamp(2.1rem, 4vw, 2.7rem);
  margin-bottom: 1rem;
}

.sensory__panel p {
  color: rgba(27, 17, 12, 0.7);
}

.sensory__meter {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 20px;
  box-shadow: inset 0 0 0 1px rgba(18, 11, 7, 0.08);
}

.sensory__meter input[type='range'] {
  width: 100%;
  appearance: none;
  background: transparent;
  height: 6px;
  margin-bottom: 1.2rem;
}

.sensory__meter input[type='range']::-webkit-slider-runnable-track {
  height: 6px;
  background: rgba(18, 11, 7, 0.15);
  border-radius: 999px;
}

.sensory__meter input[type='range']::-webkit-slider-thumb {
  appearance: none;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--coffee-white);
  border: 2px solid rgba(140, 74, 47, 0.6);
  margin-top: -8px;
  box-shadow: 0 6px 20px rgba(18, 11, 7, 0.25);
  transition: transform 0.2s ease;
}

.sensory__meter input[type='range']::-webkit-slider-thumb:hover {
  transform: scale(1.05);
}

.sensory__meter input[type='range']::-moz-range-track {
  height: 6px;
  background: rgba(18, 11, 7, 0.15);
  border-radius: 999px;
}

.sensory__meter input[type='range']::-moz-range-thumb {
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--coffee-white);
  border: 2px solid rgba(140, 74, 47, 0.6);
  box-shadow: 0 6px 20px rgba(18, 11, 7, 0.25);
}

.sensory__labels {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: rgba(18, 11, 7, 0.6);
}

.sensory__result {
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.95);
  box-shadow: 0 12px 30px rgba(18, 11, 7, 0.1);
}

.sensory__result h3 {
  font-size: 1.3rem;
  margin-bottom: 0.6rem;
}

.sensory__profiles h3 {
  font-size: 1.1rem;
  margin-bottom: 1rem;
}

.profile-grid {
  display: grid;
  gap: 1rem;
}

.profile-card {
  border-radius: 18px;
  padding: 1.2rem 1.4rem;
  border: 1px solid rgba(140, 74, 47, 0.25);
  background: rgba(255, 255, 255, 0.9);
  text-align: left;
  cursor: pointer;
  transition: transform 0.3s ease, border 0.3s ease, box-shadow 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 18px 38px rgba(18, 11, 7, 0.12);
}

.profile-card.is-selected {
  border-color: rgba(78, 141, 100, 0.7);
  box-shadow: 0 22px 42px rgba(78, 141, 100, 0.18);
}

.profile-card__name {
  display: block;
  font-size: 1.15rem;
  font-weight: 700;
  color: var(--coffee-dark);
}

.profile-card__method {
  display: block;
  font-size: 0.85rem;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  margin: 0.4rem 0;
  color: rgba(18, 11, 7, 0.5);
}

.profile-card__notes {
  font-size: 0.95rem;
  color: rgba(18, 11, 7, 0.7);
}

.profile-detail {
  margin-top: 1.5rem;
  padding: 1.2rem 1.4rem;
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.85);
  color: rgba(18, 11, 7, 0.7);
}

.timeline {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}

.timeline__step {
  padding: 1.5rem;
  border-radius: 22px;
  background: rgba(255, 255, 255, 0.95);
  border: 1px solid rgba(140, 74, 47, 0.18);
  box-shadow: 0 18px 38px rgba(18, 11, 7, 0.1);
  transition: transform 0.35s ease, box-shadow 0.35s ease, opacity 0.35s ease;
  opacity: 0;
  transform: translateY(20px);
}

.timeline__step:hover {
  transform: translateY(-6px);
  box-shadow: 0 22px 44px rgba(18, 11, 7, 0.14);
}

.timeline__step h3 {
  margin-top: 0.8rem;
  font-size: 1.1rem;
}

.timeline__step p {
  color: rgba(18, 11, 7, 0.65);
  margin-top: 0.5rem;
}

.timeline__index {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(78, 141, 100, 0.12);
  color: var(--coffee-leaf);
  font-weight: 600;
  font-size: 0.95rem;
}

.reveal-on-scroll.is-visible .timeline__step {
  opacity: 1;
  transform: translateY(0);
}

.cta {
  background: linear-gradient(135deg, rgba(18, 11, 7, 0.92), rgba(43, 29, 20, 0.82));
  color: #ffffff;
}

.cta__content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 2rem;
}

.cta__content h2 {
  font-size: clamp(2.1rem, 4vw, 2.8rem);
  margin-bottom: 0.6rem;
}

.cta__content p {
  max-width: 48ch;
  opacity: 0.85;
}

.fade-slide-enter-active,
.fade-slide-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.fade-slide-enter-from,
.fade-slide-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.reveal-on-scroll.is-ready {
  opacity: 0;
  transform: translateY(40px);
  transition: transform 0.6s ease, opacity 0.6s ease;
}

.reveal-on-scroll.is-visible {
  opacity: 1;
  transform: translateY(0);
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 1024px) {
  .hero {
    padding: 5rem 0 3rem;
  }

  .origins__layout,
  .sensory__grid {
    grid-template-columns: 1fr;
  }

  .cta__content {
    flex-direction: column;
    text-align: center;
  }
}

@media (max-width: 768px) {
  .section {
    padding: 4rem 0;
  }

  .hero__title {
    font-size: clamp(2.4rem, 6vw, 3rem);
  }

  .hero__stats {
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  }

  .experience-detail {
    padding: 1.6rem;
  }

  .cta__content button {
    width: 100%;
  }
}

@media (max-width: 540px) {
  .hero {
    min-height: 90vh;
  }

  .hero__actions {
    flex-direction: column;
    width: 100%;
  }

  .button {
    width: 100%;
    text-align: center;
  }

  .stat-card {
    padding: 1rem;
  }

  .origins__caption {
    font-size: 0.8rem;
  }

  .timeline {
    grid-template-columns: 1fr;
  }
}
</style>

