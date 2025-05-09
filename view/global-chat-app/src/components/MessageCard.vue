<template>
  <div class="card">
    <div class="card-header">
      <div class="profile">
        <div class="avatar">
          <img
            v-if="messageData.profilePic"
            :src="messageData.profilePic"
            alt="avatar"
          />
          <span v-else>{{ messageData.username.charAt(0).toUpperCase() }}</span>
        </div>
        <strong class="username">{{ messageData.username }}</strong>
      </div>
      <div class="weather-info">
        <span>{{ messageData.city }}</span>
        <span>{{ weatherEmoji(messageData.weather) }} {{ messageData.temp }}°F</span>
      </div>
    </div>

    <p class="message-text">{{ messageData.message }}</p>

    <div class="card-footer">
      <div class="timestamp">{{ messageData.date }}</div>
      <div class="actions">
        <span @click="like" class="action">👍 {{ messageData.likes }}</span>
        <span @click="dislike" class="action">👎 {{ messageData.dislikes }}</span>
        <span
          v-if="currentUser?.username === messageData.username"
          @click="deleteMsg"
          class="action delete"
        >🗑️</span>
      </div>
    </div>
  </div>
  <div class="reply-section">
  <div v-if="showReply" class="reply-box">
    <div v-if="comments.length" class="comment-list">
      <div v-for="c in comments" :key="c.id" class="comment">
        <strong class="comment-username">{{ c.username }}</strong>: {{ c.comment }}
        <div class="timestamp comment-time">{{ c.date }}</div>
      </div>
    </div>

    <div class="reply-form">
      <textarea v-model="newComment" placeholder="Write a reply..." rows="2" />
      <div class="reply-actions">
        <button @click="submitComment">Submit</button>
        <button class="hide-replies" @click="showReply = false">Hide Replies</button>
      </div>
    </div>
  </div>

  <button v-else class="reply-toggle" @click="showReply = true">
    💬 Reply
  </button>
</div>



</template>

<script setup>
import axios from 'axios'
const props = defineProps(['messageData', 'currentUser'])
const emit = defineEmits(['messageChanged'])

const like = async () => {
  await axios.post(`http://localhost:3000/like/${props.messageData.id}`)
  emit('messageChanged')
}

const dislike = async () => {
  await axios.post(`http://localhost:3000/dislike/${props.messageData.id}`)
  emit('messageChanged')
}

const deleteMsg = async () => {
  if (confirm('Delete this message?')) {
    await axios.post(`http://localhost:3000/deleteMessage/${props.messageData.id}`, {
      username: props.currentUser.username
    })
    emit('messageChanged')
  }
}

const weatherEmoji = (weather) => {
  const map = {
    Clear: '☀️',
    Clouds: '⛅',
    Rain: '🌧️',
    Thunderstorm: '⛈️',
    Snow: '❄️',
    Drizzle: '🌦️',
    Mist: '🌫️'
  }
  return map[weather] || '🌡️'
}

import { ref, onMounted } from 'vue'

const showReply = ref(false)
const newComment = ref('')
const comments = ref([])

const fetchComments = async () => {
  try {
    const res = await axios.get(`http://localhost:3000/getComments/${props.messageData.id}`)
    comments.value = res.data
  } catch (err) {
    console.error('Failed to fetch comments:', err)
  }
}

const submitComment = async () => {
  const user = JSON.parse(localStorage.getItem('currentUser'))
  if (!user || !newComment.value.trim()) return

  await axios.post('http://localhost:3000/addComment', {
    message_id: props.messageData.id,
    username: user.username,
    comment: newComment.value.trim()
  })

  newComment.value = ''
  fetchComments()
}

onMounted(fetchComments)

</script>

<style scoped>
.card {
  background-color: var(--message-bg);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 3px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 12px;
  color: inherit;
  border: 1px solid rgba(255, 255, 255, 0.1); /* subtle border in dark */

}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
}

.profile {
  display: flex;
  align-items: center;
  gap: 8px;
}

.username {
  font-weight: 600;
  color: inherit;
}

.avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #4A90E2;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1rem;
  border: 1px solid #ccc;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.weather-info {
  font-size: 0.9rem;
  text-align: right;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 2px;
  color: inherit;
}

.message-text {
  background-color: var(--bubble-bg) !important;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 1.1rem;
  word-wrap: break-word;
  color: inherit;
  margin: 16px 0;
  border: 1px solid rgba(255, 255, 255, 0.1); /* subtle border in dark */

}


.card-footer {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  font-size: 0.8rem;
  padding-top: 10px;
  color: inherit;
}

.timestamp {
  align-self: flex-end;
  color: inherit;
}

.actions {
  display: flex;
  gap: 12px;
}

.action {
  cursor: pointer;
  color: #4A90E2;
}

.delete {
  color: #D32F2F;
}

.reply-section {
  margin-top: 12px;
  padding-top: 8px;
}

.reply-toggle {
  background-color: #4A90E2;
  color: white;
  font-weight: 600;
  font-size: 0.65rem;
  border: none;
  border-radius: 8px;
  padding: 6px 12px;
  cursor: pointer;
  transition: background 0.2s ease;
  margin-top: 0px;
  max-width: fit-content;
}

.reply-toggle:hover {
  background-color: #357ABD;
}


body.dark-mode .reply-toggle {
  background-color: #66b2ff;
  color: #ffffff;
}

body.dark-mode .reply-toggle:hover {
  background-color: #5ea3e4;
}

.reply-box {
  background: var(--reply-box-bg);;
  padding: 8px 12px;
  border-radius: 10px;
  margin-top: 6px;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.reply-form {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-top: 8px;
}

.reply-form textarea {
  padding: 0px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  font-size: 0.85rem;
  resize: none;
  background: white;
  color: #333;
  height: 50px;
  max-height: 20px;
  background-color: var(--reply-textbox-bg);
}

body.dark-mode .hide-replies {
  background-color: #444;
  color: #eee;
}

.reply-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.reply-form button{
  padding: 6px 10px;
  border-radius: 6px;
  background-color: #4A90E2;
  color: white;
  border: none;
  cursor: pointer;
  font-size: 0.85rem;
}

.hide-replies {
  padding: 4px 8px;
  border-radius: 6px;
  background-color: #e0e0e0;
  color: #2C3E50;
  border: none;
  cursor: pointer;
  font-size: 0.75rem;
  line-height: 1;
  height: 28px;
  max-width: fit-content;
}

.comment-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.comment {
  background-color: var(--bubble-bg) !important;
  padding: 8px 12px;
  border-radius: 10px;
  font-size: 0.9rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: inherit;
}

.comment-username {
  font-weight: 700;
  font-size: 1rem;
  color: inherit;
}

.comment-time {
  font-size: 0.7rem;
  color: #888;
  margin-top: 2px;
}

</style>
