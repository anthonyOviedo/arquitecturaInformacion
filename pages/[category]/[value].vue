<script setup>
import { useRoute } from 'vue-router'
import { queryContent } from '#content'

const route = useRoute()
const { category, value } = route.params

const categories = {
  brand: { field: 'brand', title: 'Marca' },
  operatingSystem: { field: 'operatingSystem', title: 'Sistema Operativo' },
  screenSize: { field: 'screenSize', title: 'Tamaño de pantalla' },
  processor: { field: 'processor', title: 'Procesador' }
}

const meta = categories[category]
if (!meta) {
  throw createError({ statusCode: 404, statusMessage: 'Categoría no válida' })
}

const laptops = await queryContent('laptops').where({ [meta.field]: value }).find()
</script>

<template>
  <div>
    <h2>{{ meta.title }}: {{ value }}</h2>
    <ul>
      <li v-for="lap in laptops" :key="lap._path">
        <NuxtLink :to="lap._path">{{ lap.model }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
