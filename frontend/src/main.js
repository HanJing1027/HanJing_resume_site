import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import pinia from './stores'
import { useThemeStore } from './stores/modules/useThemeStore'

import './assets/styles/main.scss'
import 'boxicons/css/boxicons.min.css'

const app = createApp(App)

app.use(pinia)
app.use(router)

const themeStore = useThemeStore()
themeStore.initTheme()

app.mount('#app')
