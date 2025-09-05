<script setup lang="ts">
const route = useRoute()
const doc = await queryContent('laptops').findOne()
const rows = doc?.body || []
const item = computed(() => rows.find((r: any) => String(r.slug) === String(route.params.slug)))
</script>

<template>
  <article v-if="item">
    <h1>{{ item.Marca }} {{ item.Modelo }}</h1>
    <p>Sistema Operativo: {{ item['Sistema Operativo'] }}</p>
    <p>Tamaño de pantalla: {{ item['Tamaño de pantalla'] }}</p>
    <p>Procesador: {{ item.Procesador }}</p>
  </article>
  <p v-else>No encontrado.</p>
</template>
