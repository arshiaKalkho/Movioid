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
        <select id="input-genre" class="input drop-down" v-model="selected">
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
        <div class="scenes-left">
          <h3 class="primary-text">Scenes</h3>
          
          <label for="input-startTime">Scene start time </label>
          <input id="input-startTime" class="input" min="0" type="number" v-model="tempStartTime">
          
          <label for="input-endTime">Scene end time </label>
          <input id="input-endTime" class="input" min="0" type="number" v-model="tempEndTime">
          
          

          <label for="input-intensity">Scene type</label>
          <select id="input-intensity drop-down" class="input" v-model="tempType">
            <option v-bind:value="{ genre: 'awkward moments' }">1 (awkward moments)</option>
            <option v-bind:value="{ genre: 'kisses' }">2 (kisses)</option>
            <option v-bind:value="{ genre: 'nudity' }">5 (nudity)</option>
          </select>
          <button class="add-scence"> Add Scene</button>
          <button class="delete-scence"> Delete Last Scene</button>
        </div>
        <SceneVisualizer :sceneList="scenes" />
      
      </div>
    </div>
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
        type:"nudity",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
      },
      {
        type:"kisses",
        startTime:0,
        endTime:1
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
  .scenes-left{
    display:flex;
    flex-direction: column;
    gap:1rem;
  }
  .addMovie-form-right{
    display:flex;
    flex-direction: row;
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
  padding: 1rem 0;
  width:85%;
  height:fit-content;
  min-height: 70vh;
  background-color: var(--color-primary);
 
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
@media only screen and (max-width: 700px) {
  .addMovie-form{
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
}
@media only screen and (max-width: 400px) {
  .scenes-left{
    width: 35vw;
  }
  .addMovie-form-right{
    gap: 0.5rem;
  }
}

  </style>
