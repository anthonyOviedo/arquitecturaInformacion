<script setup>
import { useRoute } from 'vue-router'
import { queryContent } from '#content'

const route = useRoute()
const slug = route.params.slug
const path = Array.isArray(slug) ? slug.join('/') : slug

const doc = await queryContent(`laptops/${path}`).findOne()
</script>

<template>
  <div>
    <ContentDoc :document="doc" />
  </div>
</template>
