<template>
  <div class="container">
    <div class="content-area">

      <!-- ✅ Left Column -->
      <div class="daily-column side-column" style="padding-right: 10px;">
        <DailyQuestion />
      </div>

      <!-- Center Column -->
      <div class="message-list">
        <h1 class="chat-title">Global Chat</h1>

        <div class="post-wrapper">
          <PostForm @messagePosted="fetchMessages" />
        </div>

        <MessageCard
          v-for="msg in messages"
          :key="msg.id"
          :messageData="msg"
        />
      </div>

      <!-- Right Column -->
      <div class="trending-align side-column" style="padding-left: 10px;">
        <TrendingWords :messages="messages" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import PostForm from './components/PostForm.vue'
import MessageCard from './components/MessageCard.vue'
import TrendingWords from './components/TrendingWords.vue'
import DailyQuestion from './components/DailyQuestion.vue'

const messages = ref([])

const fetchMessages = async () => {
  try {
    const res = await axios.get('http://localhost:3000/getMessages')
    messages.value = res.data
  } catch (err) {
    console.error('Error fetching messages:', err)
  }
}

onMounted(fetchMessages)
</script>

<style scoped>
.container {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.chat-title-wrapper {
  max-width: 600px;
  margin: 0 auto;
}

.chat-title {
  text-align: center;
  font-size: 1.8rem;
  margin-bottom: 1rem;
}

.content-area {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  flex-wrap: wrap;
}

.message-list {
  flex: 3;
  max-width: 600px;
  width: 100%;
  box-sizing: border-box;
}

.post-wrapper {
  margin-bottom: 20px;
}

.side-column {
  flex: 2;
  max-width: 320px;
  margin-top: 78px;
  width: 100%;
}

.side-column > * {
  width: 100%;
}

textarea {
  min-height: 48px;
  resize: vertical;
}
</style>