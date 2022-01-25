<template>
  <div class="main">
    
    <div v-if="currentUser != ''" calss="welcome">Welcom {{currentUser}}</div>
    <loading-spinner v-if="loading"></loading-spinner>
    <Search :toggleLoading="toggleLoading" :isUserLoggedIn="isUserLoggedIn"></Search>
  </div>
</template>

<script>
import DataServices from "../../dataServices"
import loadingSpinner from '../Loading/loadingSpinner';
import Search from "../Search/Search.vue";
export default {
  name: "Home",
  data(){
    return{
      currentUser:"",
      isUserLoggedIn:false,
      loading:false
    }
  },
  components: {
    Search,
    loadingSpinner
  },
  created(){
    DataServices.getVerifiedUsername().then((user)=>{
      this.currentUser = user;
      this.isUserLoggedIn = true;
    }).catch(()=>{
      this.isUserLoggedIn = false;
      this.currentUser = "";
    })
  },
  methods:{
    toggleLoading(){
      this.loading = !this.loading;
    }
  }
};
</script>

<sytle lang="css">
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-image: url(../../assets/movioid-main-page-background.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 0;
}
.welcome{
  padding-bottom: 2rem;
}
</sytle>
