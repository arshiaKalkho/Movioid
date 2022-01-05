import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Main/Home.vue'
import AddMovie from '../components/AddNewMovie/AddMovie'
import EditMovie from '../components/EditExistingMovie/EditMovie'



const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/add',
    name: 'AddMovie',
    component: AddMovie
  },
  {
    path: '/edit',
    name: 'EditMovie',
    component: EditMovie
  }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router