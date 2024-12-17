import { init, browserTracingIntegration, replayIntegration } from '@sentry/vue'
import './assets/main.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

init({
  app,
  dsn: 'https://6449c2c00f13a41f10583b766304552d@o4508483835199488.ingest.de.sentry.io/4508483837165648',
  integrations: [browserTracingIntegration({ router }), replayIntegration()],

  // Tracing
  tracesSampleRate: 1.0, //  Capture 100% of the transactions
  // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
  tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

app.use(createPinia())
app.use(router)

app.mount('#app')

app.config.errorHandler = (err, instance, info) => {
  console.error('this is handled globaly', err, instance, info)
}
