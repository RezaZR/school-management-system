import { createWebHistory, createRouter } from 'vue-router';

import HomePage from '@/pages/HomePage.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/create',
    name: 'Create',
    component: () => import('@/pages/CreatePage.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;