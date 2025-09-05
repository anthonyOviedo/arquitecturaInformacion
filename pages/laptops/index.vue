<script setup>
// Lista todo el contenido Markdown bajo content/laptops
const laptops = await queryContent('laptops').where({ _extension: 'md' }).find()
</script>

<template>
  <section>
    <h1>Laptops</h1>
    <p v-if="!laptops.length">No hay elementos en <code>content/laptops</code>.</p>
    <ul v-else>
      <li v-for="doc in laptops" :key="doc._path">
        <NuxtLink :to="doc._path">{{ doc.title || doc._path.split('/').pop() }}</NuxtLink>
      </li>
    </ul>
  </section>
</template>
