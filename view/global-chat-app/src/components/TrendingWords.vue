<template>
  <div class="trending">
    <h2>Trending</h2>
    <table>
      <thead>
        <tr><th>Words</th><th>Mentions</th></tr>
      </thead>
      <tbody>
        <tr v-for="(count, word) in trending" :key="word">
          <td>{{ word }}</td>
          <td>{{ count }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { toRefs } from 'vue'

const props = defineProps({
  messages: {
    type: Array,
    required: true
  }
})

const { messages } = toRefs(props)

const trending = computed(() => {
  const wordCount = {}

messages.value.forEach(({ message }) => {
    const words = message.toLowerCase().split(/\s+/)
    for (const word of words) {
      const cleaned = word.replace(/[^a-z']/g, '')  
      if (cleaned.length === 0) continue
      wordCount[cleaned] = (wordCount[cleaned] || 0) + 1
    }
  })

  return Object.fromEntries(
    Object.entries(wordCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
  )
})
</script>

<style scoped>
.trending {
  margin-top: 0;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 25px;
  background-color: #007bdd;  /* Make the background white */
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05); /* Optional subtle shadow */
  color: #FFFFFF;
  font-weight: 700;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 0.5rem;
  text-align: center;
  border-bottom: 1px solid #ddd;
}

h2 {
  text-align: center;
  margin-bottom: 1rem;
}
</style>