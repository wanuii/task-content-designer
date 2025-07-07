import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhTw from 'element-plus/es/locale/lang/zh-tw'
import router from './router'
import 'remixicon/fonts/remixicon.css'

const app = createApp(App)

app.use(ElementPlus, { locale: zhTw }).use(router).mount('#app')