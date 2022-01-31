<template>
  <div v-bind:class="{ loading: loading}" class="main" >
    <div v-if="currentUser != ''" calss="welcome">Welcom {{currentUser}}</div>
    <loading-spinner v-if="loading"></loading-spinner>
  
    <Search :toggleLoading="toggleLoading" :isUserLoggedIn="isUserLoggedIn"></Search>
    <Movies :movieList="movies"></Movies>
  </div>

</template>

<script>
import DataServices from "../../dataServices"
import loadingSpinner from '../Loading/loadingSpinner';
import Search from "../Search/Search.vue";
import Movies from "../Search/Movies.vue"
export default {
  name: "Home",
  data(){
    return{
      currentUser:"",
      movies:[],
      isUserLoggedIn:false,
      loading:false,
      err:""
    }
  },
  components: {
    Search,
    loadingSpinner,
    Movies
  },
  async created(){
    this.loading = true;
    DataServices.getVerifiedUsername().then((user)=>{
      this.currentUser = user;
      this.isUserLoggedIn = true;
    }).catch(()=>{
      this.isUserLoggedIn = false;
      this.currentUser = "";
    })
    
    DataServices.getLatestMovies().then((movies)=>{
      console.log(movies)
      this.movies = movies;
      this.loading = false;
    }).catch(()=>{
      this.err = "sorry service not available"
      this.loading = false
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
  justify-content: flex-end;
  gap: 3rem;
  background-image: url(../../assets/movioid-main-page-background.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 0;
  padding-bottom: 2rem;
}
.welcome{
  padding-bottom: 2rem;
}
.loading{
  opacity: 0.4;
}
</sytle>
