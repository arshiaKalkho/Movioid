<template>
  
  
  <div class="search-box-container">
  
    <input class="search-box" placeholder="Search for movies and tv shows" />
    <button class="search-button button">Search</button>
    <div class="search-buttons">
      <router-link to="/login" v-if="!isUserLoggedIn">
        <button class="LoginRegister-button button" >
          <span class="login-inner-text">Login</span>
          /
          <span class="register-inner-text">Register</span>
        </button>
      </router-link>
      <button class="LoginRegister-button button logout" v-on:click="logout" v-if="isUserLoggedIn" > 
          <span class="login-inner-text">Log</span>
          <span class="register-inner-text">Out</span>
        </button>
    </div>
  </div>
</template>

<script>
  import DataServices from'../../dataServices';
  
  
  
export default {
  name: "Search",
  props:{
    toggleLoading:Function,
    isUserLoggedIn:Boolean
  },
  Data(){
    return{
      latestMovies:[],
      searchQuery: '',
      error: '',
      
    }
  },
  methods:{
    async logout(){
        this.toggleLoading();
      DataServices.logOutUser().then(()=>{
        this.toggleLoading();
        location.reload();
      }).catch(()=>{
        this.toggleLoading();
        this.error = "something went wrong"
      })
    }
  }
  
};
</script>

<style>
.search-box-container {
  padding-bottom: 2rem;
  padding-left: 5.5rem;
}
.search-error{
  width:fit-content;
  padding: 2px;
  height: 2rem;
  background-color: var(--color-primary);
  border: 1px solid red;
  border-radius: 5px;
}
.search-box {
  text-align: center;
  font-size:1.5rem;
  width: 40vw;
  border:none;
  border-radius:3px;
  caret-color:var(--color-text);
  color:var(--color-text);
  background-color:var(--color-primary);
}
.search-box:focus{
  outline:none;
  outline-color:var(--color-text);
}
.search-buttons {
  margin-top: 1rem;
  margin-bottom:0;
}
.button {
  color: var(--color-text);
  border: none;
  border-radius: 3px;
  height: 2rem;
  background: var(--color-HeaderFooter);
  border: 1px solid grey;
}

.button:hover {
  border: 1px solid var(--color-text);
}
.search-button {
  
  font-size:1.5rem;
  margin-left: 0.5rem;
  width: 6rem;
}
.LoginRegister-button {
  color: white;
  transition: 200ms ease-in-out;
  font-size:1.1rem;
  padding:3px;
}
.LoginRegister-button:hover {
  border-image: linear-gradient(
      to right,
      var(--color-accent),
      var(--color-text)
    )
    1;
  transition: 100ms ease-in-out;
}
.logout{
  border:1px solid red;
}

.login-inner-text {
  color: var(--color-text);
  transition: 200ms ease-in-out;
}
.register-inner-text {
  color: var(--color-accent);
  transition: 200ms ease-in-out;
}
.LoginRegister-button:hover .login-inner-text {
  color: var(--color-accent);
  transition: 200ms ease-in-out;
}
.LoginRegister-button:hover .register-inner-text {
  color: var(--color-text);
  transition: 200ms ease-in-out;
}
.LoginRegister-button:active,
.search-button:active {
  background: var(--color-accent);
}
@media only screen and (max-width: 500px) {
  
  .search-box-container{
    padding:0;
  }
  .search-box{
    height:1.5rem;
    font-size:1rem;
    width:60vw;
    margin-bottom:0.5rem;
  }
  .LoginRegister-button,
  .search-button {
    height:2rem;
  }
}
</style>