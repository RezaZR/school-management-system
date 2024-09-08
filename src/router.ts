import { createMemoryHistory, createRouter } from 'vue-router';

import HomePage from './pages/HomePage.vue';
import CreatePage from './pages/CreatePage.vue';

const routes = [
  { path: '/', component: HomePage },
  { path: '/create', component: CreatePage },
];

const router = createRouter({
  history: createMemoryHistory(),
  routes,
});

export default router;