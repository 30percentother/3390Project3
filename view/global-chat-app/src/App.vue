<template>
  <div class="app-container">
    <header class="app-header">
      <button @click="toggleDarkMode" class="dark-toggle">🌓</button>
      <h1 class="app-title">🌍 Global Chat</h1>
      <div class="actions-right">
        <div v-if="currentUser" class="profile-box">
          <span class="username-label">{{ currentUser.username }}</span>
          <button @click="showMenu = !showMenu" class="profile-icon">👤</button>
          <div v-if="showMenu" class="dropdown">
            <button @click="logout">Logout</button>
            <button @click="deleteAccount">Remove Account</button>
          </div>
        </div>
      </div>
    </header>

    <LoginForm v-if="!currentUser" @loginSuccess="onLogin" />

    <div v-else class="main-grid">
      <div class="left-column">
        <DailyQuestion />
      </div>

      <div class="center-column">
        <PostForm @messagePosted="fetchMessages" :currentUser="currentUser" />
        <div v-for="msg in messages" :key="msg.id">
          <MessageCard
            :messageData="msg"
            :currentUser="currentUser"
            @messageChanged="fetchMessages"
          />
        </div>
      </div>

      <div class="right-column">
        <TrendingPanel />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import LoginForm from './components/LoginForm.vue'
import PostForm from './components/PostForm.vue'
import MessageCard from './components/MessageCard.vue'
import DailyQuestion from './components/DailyQuestion.vue'
import TrendingPanel from './components/TrendingPanel.vue'

const messages = ref([])
const currentUser = ref(null)
const showMenu = ref(false)

const fetchMessages = async () => {
  try {
    const res = await axios.get('http://localhost:3000/getMessages')
    messages.value = res.data
  } catch (err) {
    console.error('Failed to fetch messages:', err)
  }
}

const onLogin = (user) => {
  currentUser.value = user
}

const logout = () => {
  localStorage.removeItem('currentUser')
  currentUser.value = null
  showMenu.value = false
}

const deleteAccount = async () => {
  if (!confirm('Are you sure you want to delete your account?')) return
  try {
    await axios.post('http://localhost:3000/deleteAccount', {
      username: currentUser.value.username
    })
    logout()
    alert('Account deleted successfully.')
  } catch (err) {
    console.error('Delete failed:', err)
    alert('Failed to delete account.')
  }
}

const toggleDarkMode = () => {
  document.body.classList.toggle('dark-mode')
}

onMounted(() => {
  const savedUser = localStorage.getItem('currentUser')
  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  }
  fetchMessages()
})
</script>

<style>
body {
  background-color: #F9FAFB;
  color: #333333;
  font-family: sans-serif;
  margin: 0;
  padding: 0;
  transition: background-color 0.3s ease, color 0.3s ease;
}

:root {
  --login-bg: #f3f6fb;
  --login-text: #2C3E50;
  --panel-bg: #2C3E50;
  --header-bg: #2C3E50;
  --icon-color: #4A90E2;
  --message-bg: #ffffff;
  --trending-bg: #F9FAFB;
  --response-bg: #F9FAFB;
  --bubble-bg: #f1f1f1;
  --title-bg: #e4e8f0;
  --title-text: #2C3E50;
  --login-container-bg: #dce3ec;
  --primary-button: #4A90E2;
  --button-text: white;
  --bubble-bg: #f1f1f1;
  --reply-box-bg: #ffffff;
}



body.dark-mode {
  
  --login-container-bg: #2b2b2b;
  --login-bg: #2a2a2a;
  --login-text: #f0f0f0;
  --header-bg: #2a2a2a;
  --icon-color: #66b2ff;
  --message-bg: #2c2c2c;
  --trending-bg: #333333;
  --response-bg: #333333;
  --bubble-bg: #3b3b3b;
  --title-bg: #494747;
  --title-text: #eeeeee;
  background-color: #1e1e1e;
  color: #eeeeee;
  --bubble-bg: #3b3b3b;
  --reply-box-bg: #2c2c2c;
  --reply-textbox-bg:#3b3b3b;
}

body.dark-mode :is(
  .card,
  .login-card,
  .daily-question,
  .trending-panel,
  .app-header,
  .message-text,
  .question-text,
  .username-label,
  .timestamp,
  strong,
  p,
  span,
  li,
  h1,
  h2,
  h3,
  h4
) {
  color: #eeeeee !important;
}

body.dark-mode input,
body.dark-mode textarea {
  background-color: #333;
  color: #f0f0f0 !important;
  border-color: #555;
}

body.dark-mode .dropdown,
body.dark-mode .login-card,
body.dark-mode .daily-question,
body.dark-mode .trending-panel {
  background-color: var(--response-bg);
  color: #eeeeee !important;
}

body.dark-mode .card {
  background-color: var(--message-bg);
  color: #eeeeee !important;
  transition: background-color 0.3s ease;
}

body.dark-mode .action {
  color:rgb(248, 250, 252) !important;
}

body.dark-mode .delete {
  color: #ff6b6b !important;
}



body.dark-mode button:hover {
  background-color:rgb(194, 195, 197) !important;
}

body.dark-mode .login-container {
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.4);
}

body.dark-mode .dropdown button {
  color: white !important;
}

</style>

<style scoped>

.app-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
}
.profile-icon,
.dark-toggle {
  background: none !important;
  border: none;
  padding: 0;
  outline: none;
  box-shadow: none;
}

.dark-toggle.top-left {
  position: absolute;
  top: 12px;
  left: 16px;
  font-size: 18px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  z-index: 10;
}

.app-header {
  min-height: 100px; /* give a bit more height for centering */
  background: var(--header-bg);
  color: white;
  padding: 24px;
  border-radius: 12px;
  margin-bottom: 20px;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.1);
}


/* Global Chat Box*/
.app-title {
  font-size: 2rem;
  font-weight: 700;
  letter-spacing: 1px;
  background-color: var(--title-bg);
  color: var(--title-text);
  padding: 12px 120px;
  border-radius: 12px;
  margin-bottom: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  position: absolute;
  top: 30%;
  left: 50%;
  transform: translate(-50%,-50%);
}


.actions-right {
  position: absolute;
  top: 16px;
  right: 24px;
  display: flex;
  align-items: center;
  gap: 14px;
}


.profile-box {
  background-color: var(--title-bg);
  border: 1px solid rgba(255, 255, 255, 0.1);
  padding: 8px 14px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  gap: 16px;
  color: white;
}

.username-label {
  color: var(--title-text);
  font-weight: 600;
  white-space: nowrap;
}

.profile-icon {
  font-size: 20px;
  background: none;
  border: none;
  cursor: pointer;
  color: var(--icon-color);
}

.profile-wrapper {
  position: relative;
}

.dropdown {
  position: absolute;
  top: 50px;
  right: 0px;
  background: white;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  z-index: 100;
}

.dropdown button {
  display: block;
  width: 100%;
  background: none;
  border: none;
  padding: 6px 12px;
  text-align: left;
  cursor: pointer;
  color: #2C3E50;
}

.main-grid {
  display: grid;
  grid-template-columns: 1fr 2fr 1fr;
  gap: 20px;
}

.left-column,
.center-column,
.right-column {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.dark-toggle {
  font-size: 18px;
  background: none;
  border: none;
  color: white;
  cursor: pointer;
}

</style>
