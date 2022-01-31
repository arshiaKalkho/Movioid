<template lang="">
  <ul class="movie-list">
            <li class="movie-list-element" v-for="(movie,index) in movieList" :key="index">
                <div class="element-header">
                    <span class="place-holder-text">scene no:</span>
                    {{movie.index}}<br/>
                    <span class="place-holder-text">from:</span> {{movie.startTime}}
                    <span class="place-holder-text">to:</span> {{movie.endTime}}
                    
                </div>
                
                <div class="element-body">
                <span class="place-holder-text">Type:</span> {{movie.type}}
                </div>
                <button v-on:click="sendIndexToParentToDelete(scene.index)" class="delete-button">delete</button>
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
  
  width:50vw;
}
@media only screen and (max-width: 500px) {
  .movie-list{
    width:calc(60vw + 6.5rem);
  }
}
</style>
