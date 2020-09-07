import { createApp } from 'vue'
import App from '@/App.vue'
import router from '@/router'
import store from '@/store'
import ApolloClient from 'apollo-boost'
import { DefaultApolloClient } from '@vue/apollo-composable'
import '@/assets/tailwind.css'

const app = createApp(App)

app.use(store)
app.use(router)

const apolloClient = new ApolloClient({ uri: 'http://localhost:8080/' })
app.provide(DefaultApolloClient, apolloClient)

app.mount('#app')
