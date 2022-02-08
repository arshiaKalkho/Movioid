import {createRouter, createWebHistory} from 'vue-router'
import Home from '../components/Main/Home.vue'
import AddMovie from '../components/AddNewMovie/AddMovie'
import EditMovie from '../components/EditMovie/EditMovie'
import LoginRegister from '../components/LoginRegister/LoginRegister'
import dataServices from '../dataServices'


const isUserAllowed = async (to,from,next)=>{//check auth middlewear
  
  if(!localStorage.getItem("refreshToken")){
    next('/login')
  }else{
    dataServices.validateAccessToken()
    .catch(()=>{
      dataServices.getNewAccessToken()//if access token not valid
      .catch(()=>{
        next('/login')//failed redir to login
      })
    })
  }
  next()

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
    path: '/editMovie',
    name: 'EditMovie',
    beforeEnter: isUserAllowed,
    component: EditMovie
  },
  {
    path: '/login',
    name: 'LoginRegister',
    component: LoginRegister
  }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
export default router