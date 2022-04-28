<template>
  <div v-bind:class="{ loading: loading}" class="main" >
    <div class="welcome" v-if="currentUser != ''" >Loged in as: <strong>{{currentUser}}</strong></div>
    <div class="welcome" v-if="currentUser === ''" >
      Movioid is a <span>Vue</span> project in the making, more functionality like editing movies and 
      better rating systems with more information will be coming soon. This app uses 
      full refresh and access token system with <span>jwt</span> and <span>mongoDB</span> for the database. The
      source for this <span>MEVN</span> stack is available at my <a href="https://github.com/arshiaKalkho/Movioid">Github</a>.

    </div>
    
    <loading-spinner v-if="loading"></loading-spinner>
    <p v-if="err != ''">{{err}}</p>
    <Search :sendErrorToParent="setError" :sendMoviesToParent="setMovies" :toggleLoading="toggleLoading" :isUserLoggedIn="isUserLoggedIn"></Search>
    <Movies v-if="movies.length != 0" :movieList="movies"></Movies>
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
      this.movies = movies;
      this.loading = false;
    }).catch(()=>{
      this.err = "sorry service not available"
      this.loading = false
    })
    
    
    
  },
  updated() {//runs on every update so if the access token is expired the home page will reflect
    if(localStorage.getItem('accessToken')&&localStorage.getItem('refreshToken')){
      DataServices.validateAccessToken()//check for valid access token
      .catch(()=>{//if not valid try to get new access token
        DataServices.getVerifiedUsername()
        .then((user)=>{//user is valid, new access token set
          this.currentUser = user;
        })
        .catch(()=>{//refresh token is not valid reset and logout
          DataServices.logOutUser().then(()=>{
            this.isUserLoggedIn = false;
            this.currentUser = "";
          }).catch(()=>{
            this.err = "credentials expired please reload and login"
          })
        })
      })
    }
   
  },
  methods:{
    toggleLoading(){
      this.loading = !this.loading;
    },
    setError(err){
      this.err = err;
    },
    setMovies(movies){
      if(movies.length === 0)
        this.err ="no result found"
      else
        this.err =""
      this.movies = movies;
      
    }
  }
};
</script>
<sytle lang="css" scoped>
.main {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3rem;
  background-image: url(../../assets/movioid-main-page-background.png);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 0;
  padding-bottom: 2rem;
}
.welcome{
  max-width: 80%;
  padding: 1rem;
  background-color: var(--color-primary);
  border: 1px solid var(--color-text);
  border-radius: 5px;
  
}
.welcome>span{
  color: aliceblue;
}
.welcome>a{
  text-decoration: none;
  color: aquamarine;
}
.loading{
  opacity: 0.4;
}
@media only screen and (orientation: landscape) and (max-width:950px) 
 {
    .main{
      height: 200vh;
      
    }
}
</sytle>
