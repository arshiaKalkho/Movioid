<template lang="">
  <ul class="movie-list">
            <li class="movie-list-element" v-for="(movie,index) in movieList" :key="index">
                <div class="movie-list-element-container">
                  <div class="element-header">
                      <h2 class="place-holder-text">Title: {{movie.title}} </h2>
                    
                      <span class="place-holder-text">Genre: </span> {{movie.genre}}
                      <br/>
                      <span class="place-holder-text">Posted By: </span> {{movie.author}}
                      
                  </div>
                
                <div class="element-body">
                <span class="place-holder-text">Duration:</span> {{movie.duration}}<br/>
                <button v-on:click="sendIndexToParentToDelete(scene.index)" class="delete-button">delete</button>
                </div>
                </div>
            </li>
        </ul>
</template>
<script>
export default {
  name:"movies",
  props:{
    movieList:Array
  }
  }

</script>
<style lang="css">
.movie-list{
  background-color: var(--color-primary);
  list-style-type: none;
  margin:5px;
  border:1px solid var(--color-text);
  border-radius: 3px;
  padding: 3px;
  height:fit-content;
  
  width:calc(70vw + 6.5rem);
 

}
.movie-list-element-container{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.movie-list-element{
  border-bottom: 1px solid var(--color-text);
  padding:1rem;
  height: 5rem;
}
@media only screen and (max-width: 500px) {
  .movie-list{
    
    width:calc(60vw + 6.5rem);
  }
}
</style>
