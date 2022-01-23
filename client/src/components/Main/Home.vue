<template>
  <div class="main">
    
    <div v-if="currentUser != ''" calss="welcome">Welcom {{currentUser}}</div>
    
    <Search :isUserLoggedIn="isUserLoggedIn"></Search>
  </div>
</template>

<script>
import DataServices from "../../dataServices"

import Search from "../Search/Search.vue";
export default {
  name: "Home",
  data(){
    return{
      currentUser:"",
      isUserLoggedIn:false
    }
  },
  components: {
    Search,
  },
  created(){
    const tempUser = DataServices.getLoggedInUsername()
    if(tempUser){
      this.currentUser = tempUser;
      this.isUserLoggedIn = true;
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
