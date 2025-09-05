<script setup lang="ts">
const route = useRoute()

// Get the single CSV document
const doc = await queryContent('laptops').findOne()

// For CSV, rows are in `doc.body`
const rows = doc?.body || []

// Expect a `category` column in the CSV to match the route param
const list = computed(() =>
  rows.filter((r: any) => (r.category || '').toLowerCase() === String(route.params.category).toLowerCase())
)
</script>

<template>
  <section>
    <h1>Catálogo de {{ route.params.category }}</h1>
    <ul>
      <li v-for="(item, i) in list" :key="i">
        <NuxtLink :to="`/laptops/${item.slug}`">{{ item.Marca }} {{ item.Modelo }}</NuxtLink>
        — {{ item['Sistema Operativo'] }}
      </li>
    </ul>
  </section>
</template>
