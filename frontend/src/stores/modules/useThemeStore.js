import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: false,
  }),

  actions: {
    initTheme() {
      // 讀取本地儲存的主題設定
      const savedTheme = localStorage.getItem('theme')

      // 若有儲存的設定，則使用該設定
      if (savedTheme) {
        this.isDark = savedTheme === 'dark'
      } else {
        // 否則檢查系統偏好設定
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
        this.isDark = prefersDark
      }

      // 應用主題
      this.applyTheme()

      // 監聽系統主題變更
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (localStorage.getItem('theme') === null) {
          this.isDark = e.matches
          this.applyTheme()
        }
      })
    },

    toggleTheme() {
      this.isDark = !this.isDark
      this.applyTheme()
      localStorage.setItem('theme', this.isDark ? 'dark' : 'light')
    },

    applyTheme() {
      // 設置 HTML data-theme 屬性來切換 CSS 變數
      document.documentElement.setAttribute('data-theme', this.isDark ? 'dark' : 'light')
    },
  },
})
