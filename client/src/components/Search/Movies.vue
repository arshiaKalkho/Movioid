<template lang="">
  <ul calss="scene-list">
            <li class="scene-list-element" v-for="(movie,index) in movieList" :key="index">
                <div class="element-header">
                    <span class="place-holder-text">scene no:</span>
                    {{scene.index}}<br/>
                    <span class="place-holder-text">from:</span> {{scene.startTime}}
                    <span class="place-holder-text">to:</span> {{scene.endTime}}
                    
                </div>
                
                <div class="element-body">
                <span class="place-holder-text">Type:</span> {{scene.type}}
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
  },

  }

</script>
<style lang=""></style>
