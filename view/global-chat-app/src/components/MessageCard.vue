<template>
  <div class="card" :style="{ backgroundColor: getColor(weather) }">
    <div class="info">
      <div class="username-tag">{{ username }}</div>
      <p class="message-text">{{ message }}</p>
      <div class="timestamp">{{ date }}</div>
    </div>
    <div class="weather">
      <span class="weather-icon">{{ getIcon(weather) }}</span>
      <span class="weather-temp">{{ temp }}°F</span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  messageData: Object
})

const { username, message, date, weather, temp } = props.messageData

const getIcon = (condition) => {
  switch (condition) {
    case 'Clear': return '☀️'
    case 'Clouds': return '🌥️'
    case 'Rain': return '🌧️'
    case 'Snow': return '❄️'
    case 'Thunderstorm': return '⛈️'
    default: return '❓'
  }
}

const getColor = (condition) => {
  switch (condition) {
    case 'Clear': return '#FF6961'
    case 'Clouds': return '#85C1E9'
    case 'Rain': return '#A9A9A9'
    case 'Snow': return '#ADD8E6'
    case 'Thunderstorm': return '#555555'
    default: return '#D3D3D3'
  }
}
</script>

<style scoped>
.card {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  border-radius: 12px;
  margin-bottom: 16px;
  color: #fff;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding-right: 12px;
}

.username-tag {
  align-self: flex-start;
  background-color: rgba(255, 255, 255, 0.15);
  padding: 4px 10px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.9rem;
  margin-bottom: 8px;
}

.message-text {
  text-align: center;
  font-size: 1.2rem;
  font-weight: 600;
  line-height: 1.4;
  margin: 0 auto;
  word-break: break-word;
  overflow-wrap: anywhere;
}

.timestamp {
  margin-top: 12px;
  font-size: 0.75rem;
  opacity: 0.85;
  text-align: center;
}

.weather {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: 1rem;
  font-weight: 700;
  gap: 4px;
  min-width: 60px;
}
</style>