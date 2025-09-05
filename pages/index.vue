<script setup>
const laptops = await queryContent('tarea2/laptops').where({ _extension: 'md' }).find()
</script>

<template>
  <section>
    <h1>Catálogo de Laptops</h1>
    <ul>
      <li v-for="lap in laptops" :key="lap._path">
        <NuxtLink :to="lap._path">{{ lap.brand }} {{ lap.model }}</NuxtLink>
      </li>
    </ul>
  </section>
</template>
