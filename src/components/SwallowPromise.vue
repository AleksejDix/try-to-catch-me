<template>
  <slot></slot>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'

function fetchData() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('Network Error'))
    }, 1000)
  })
}

onMounted(() => {
  fetchData().then((data) => {
    console.error('data:', data)
  })
})
</script>
