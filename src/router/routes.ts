import { RouteRecordRaw } from 'vue-router';
import HomeVue from '../views/Home.vue';
import CharacterDetailVue from '../views/CharacterDetail.vue';
import PageNotFoundVue from '../views/PageNotFound.vue';
import AboutVue from '../views/About.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'About',
    component: AboutVue,
  },
  {
    path: '/characters',
    name: 'Home',
    component: HomeVue,
  },
  {
    path: '/characters/:id',
    name: 'CharacterDetail',
    component: CharacterDetailVue,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: PageNotFoundVue,
  },
];

export default routes;
