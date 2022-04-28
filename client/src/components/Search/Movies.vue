<template lang="">
  <ul class="movie-list">
            results: {{numOfresults}}
            <li class="movie-list-element" v-for="(movie,index) in movieList" :key="index">
                <div class="movie-list-element-container">
                  <div class="element-header">
                      <h3 class="place-holder-text">Title: <span class="data">{{movie.title[0].toUpperCase() + movie.title.substring(1)}}</span> </h3>
                      
                      <h3 class="place-holder-text">Rating: <span class="data">{{movie.rating}}</span> </h3>
                  </div>
                
                  <div class="element-body">
                      <div>
                        <span class="place-holder-text">Genre: </span><span class="data">{{movie.genre}}</span>
                        <br/>
                        
                        <span class="place-holder-text">Duration:</span><span class="data"> {{movie.duration}}</span>
                        <br/>
                        <button v-on:click="redirToEdit(movie.title)" class="delete-button">edit</button>
                      </div>
                      <RatingVisualizer :rating="movie.rating" />
                      <div>
                        <img :src="movie.image" alt="image not available" class="movie-image">
                        <br/>
                        <span class="place-holder-text">Posted By: </span><span class="data">{{movie.author}}</span>
                        
                      </div>
                  </div>
                </div>
            </li>
        </ul>
</template>
<script>
import RatingVisualizer from "./RatingVisualizer.vue"

export default {
  name:"movies",
  props:{
    movieList:Array
  },
  components:{
    RatingVisualizer
  },
  data() {
    return {
      numOfresults:0
    }
  },
  created(){
    this.numOfresults = this.movieList.length
  },
  updated() {
    
    this.numOfresults = this.movieList.length
  },
  methods:{
    redirToEdit(){
      
    }
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
  min-height:40vh;
  max-height: 45vh;
  overflow-y: scroll;
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
  margin-bottom: 1rem;
}
.movie-list-element{
  border-bottom: 1px solid var(--color-text);
  border-top: 1px solid var(--color-text);
  margin-bottom: 0.5rem;
  padding:1rem;
  height: 2.5rem;
  overflow: hidden;
  transition: 300ms ease-in-out;
}
.movie-image{
  width:3.5rem;
  height: 4.5rem;
}
.element-body{
  width: stretch;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: 300ms ease-in-out;
  opacity: 0;
}
.movie-list-element:hover .element-body{
  opacity: 1;
  transition: 300ms ease-in-out;
}
.movie-list-element:hover{
  transition: 300ms ease-in-out;
  overflow: visible;
  height: 8rem;
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
