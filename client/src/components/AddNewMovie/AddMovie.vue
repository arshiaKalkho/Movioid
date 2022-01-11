<template lang="">
  
  <div class="addMovie-container">
  
    <div class="addMovie-header">
      <h3>Add New Movie</h3>
      <p class="secondary-text">the main part of this form is the events, each event need to have a score which is explained below and must have a time stamp within the movie duration time.<br>All Movies will be manually reviewed before uploading so please NO SPOILERS...</p>
    </div>
  
    <div class="addMovie-form">
      <div class="addMovie-form-left">
        <h3 class="primary-text">Info</h3>
        
        <label for="input-title">Title: </label>
        <input id="input-title" class="input" v-model="title">
        
        <label for="input-title">Movie Duration: (minutes) </label>
        <input id="input-title" class="input" min="0" type="number" v-model="duration">
        

        <label for="input-genre">Genre: </label>
        <select id="input-genre" class="input" v-model="selected">
          <option v-bind:value="{ genre: 'Action' }">Action</option>
          <option v-bind:value="{ genre: 'Comedy' }">Comedy</option>
          <option v-bind:value="{ genre: 'Drama' }">Drama</option>
          <option v-bind:value="{ genre: 'Fantasy' }">Fantasy</option>
          <option v-bind:value="{ genre: 'Horror' }">Horror</option>
          <option v-bind:value="{ genre: 'Mystery' }">Mystery</option>
          <option v-bind:value="{ genre: 'Romance' }">Romance</option>
          <option v-bind:value="{ genre: 'Thriller' }">Thriller</option>
          <option v-bind:value="{ genre: 'Western'}">Western</option>
        </select>
        

        
        
          
        

      </div>
      
      <div class="addMovie-form-right">
        
        <h3 class="primary-text">Scenes</h3>
        
        <label for="input-startTime">Scene start time </label>
        <input id="input-startTime" class="input" min="0" type="number" v-model="tempStartTime">
        
        <label for="input-endTime">Scene end time </label>
        <input id="input-endTime" class="input" min="0" type="number" v-model="tempEndTime">
        
        

        <label for="input-intensity">Scene type</label>
        <select id="input-intensity" class="input" v-model="tempType">
          <option v-bind:value="{ genre: 1 }">1 (awkward moments)</option>
          <option v-bind:value="{ genre: 2 }">2 (kisses)</option>
          <option v-bind:value="{ genre: 3 }">3 (french kisses)</option>
          <option v-bind:value="{ genre: 4 }">4 (making out no nudity)</option>
          <option v-bind:value="{ genre: 5 }">5 (nudity)</option>
        </select>
        <button class="add-scence"> Add Scene</button>
        <button class="delete-scence"> Delete Last Scene</button>
      </div>
    </div>
    <SceneVisualizer
          :sceneList="scenes" />
  </div>
</template>
<script>
import SceneVisualizer from './SceneVisualizer.vue'

export default {
  name: "AddMovie",
  components:{
    SceneVisualizer
  },
  data(){
    return{
      genre:"",
      title: "",
      scenes:[{
        name:"movie0",
        ranks:3
      },
      {
        name:"movie1",
        ranks:3
      },
      {
        name:"movie1",
        ranks:3
      },
      {
        name:"movie1",
        ranks:3
      },
      {
        name:"movie1",
        ranks:3
      },
      {
        name:"movie2",
        ranks:3
      }],
      duration:"",
      tempStartTime:0,
      tempEndTime:0,
      tempType:0,
      err: ''
    }
  }
};
</script>
<style lang="css">
  .addMovie-header{
  margin:1rem;
  width:85%;
  height: fit-content;
  text-align: center;
  background-color: var(--color-primary);
  padding:2px 0;
  border: 1px outset var(--color-text);
  border-radius: 5px;
  }
  .addMovie-form-left{
    display:flex;
    flex-direction: column;
    gap:1rem;
  }
  .addMovie-form-right{
    display:flex;
    flex-direction: column;
    gap:1rem;
  }
.addMovie-container{
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: fit-content;
  background-image: url(../../assets/addEditMovieBackground.jpg);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  margin-top: 0;
}
.addMovie-form{
  display:flex;
  justify-content: space-evenly;
  align-items: flex-start;
  padding: 5px 0;
  width:85%;
  height:fit-content;
  background-color: var(--color-primary);
  opacity: 0.7;
  border-radius: 5px;
  border: 1px outset var(--color-text);
  transition: 200ms ease-in-out;
  margin-bottom: 1rem;
}
.scene-list{
  width:fill;
  height:fill;
  background:red;
}

.input{
  border-radius: 3px;
  caret-color:var(--color-text);
  color:var(--color-text);
  background-color:var(--color-primary);
}
.input:focus{
  outline:none;
  outline-color:var(--color-text);
}
.addMovie-form:hover{
  opacity: 0.9;
  transition: 200ms ease-in-out;
}
.delete-scence,
.add-scence{
  border: none;
  border-radius: 5px;
}
.delete-scence:hover,
.add-scence:hover{
  color:white;
}
.delete-scence:active,
.add-scence:active{
  color:var(--color-primary);
}
.delete-scence{
  background-color: red;
}

.add-scence{
  height: 1.5rem;
  background-color: rgb(17, 200, 17);
}
@media only screen and (max-width: 500px) {
  .addMovie-form{
    flex-direction: column;
    align-items: center;
  }
}

  </style>
