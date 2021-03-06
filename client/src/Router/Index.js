import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Main/Home.vue'
import AddMovie from '../components/AddNewMovie/AddMovie'
import EditMovie from '../components/EditMovie/EditMovie'
import LoginRegister from '../components/LoginRegister/LoginRegister'
import dataServices from '../dataServices'
import notFound from '../components/NotFound/NotFound'


const isUserAllowed = async (to,from,next)=>{//check auth middlewear
  
  if(!localStorage.getItem("refreshToken")){
    next('/login')
  }else{
    dataServices.validateAccessToken()
    .catch(()=>{//if access token not valid
      dataServices.getNewAccessToken()
      .catch(()=>{
        next('/login')//failed, redir to login
      })
    })
    next()
  }


}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/addMovie',
    name: 'AddMovie',
    beforeEnter: isUserAllowed,
    component: AddMovie
  },
  {
    path: '/editMovie/:refTitle',
    name: 'EditMovie',
    props: true,
    beforeEnter: isUserAllowed,
    component: EditMovie
  },
  {
    path: '/login',
    name: 'LoginRegister',
    component: LoginRegister
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'notFound',
    component: notFound
  }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router