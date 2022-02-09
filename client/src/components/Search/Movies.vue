<template lang="">
  <ul class="movie-list">
            results: {{numOfresults}}
            <li class="movie-list-element" v-for="(movie,index) in movieList" :key="index">
                <div class="movie-list-element-container">
                  <div class="element-header">
                      <h3 class="place-holder-text">Title: <span class="data">{{movie.title}}</span> </h3>
                      
                      <h3 class="place-holder-text">Rating: <span class="data">{{movie.rating}}</span> </h3>

                      
                  </div>
                
                  <div class="element-body">
                      <span class="place-holder-text">Genre: </span> <span class="data">{{movie.genre}}</span>
                      <br/>
                      <span class="place-holder-text">Posted By: </span> <span class="data">{{movie.author}}</span>
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
  },
  data() {
    return {
      numOfresults:0
    }
  },
  created() {
    this.numOfresults = this.movieList.length
  },
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
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
}
.element-header{
  width: fill;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.5rem;
}
.movie-list-element{
  border-bottom: 1px solid var(--color-text);
  border-top: 1px solid var(--color-text);
  margin-bottom: 0.5rem;
  padding:1rem;
  height: 2rem;
  overflow: hidden;
  transition: 200ms ease-in-out;
}
.movie-list-element:hover{
  
  transition: 200ms ease-in-out;
  overflow: visible;
  height: fit-content;
}
.data{
  color: var(--color-accent);
}
@media only screen and (max-width: 500px) {
  .movie-list{
    
    width:calc(60vw + 6.5rem);
  }
}
</style>
