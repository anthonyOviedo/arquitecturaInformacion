<script setup>
const route = useRoute()
const slug = Array.isArray(route.params.slug) ? route.params.slug.join('/') : route.params.slug
const item = await queryContent('laptops/' + slug).findOne()
</script>

<template>
  <article v-if="item">
    <h1>{{ item.brand }} {{ item.model }}</h1>
    <p>Sistema Operativo: {{ item.operatingSystem }}</p>
    <p>Tamaño de pantalla: {{ item.screenSize }}</p>
    <p>Procesador: {{ item.processor }}</p>
    <ContentRenderer :value="item" />
  </article>
  <p v-else>No encontrado.</p>
</template>
