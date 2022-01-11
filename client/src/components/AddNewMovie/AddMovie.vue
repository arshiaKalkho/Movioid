<template lang="">
  
  <div class="addMovie-container">
  
    <div class="addMovie-header">
      <h3>Add New Movie</h3>
      <p class="secondary-text">the main part of this form is the events, each event need to have a score which is explained below and must have a time stamp within the movie duration time.<br>All Movies will be manually reviewed before uploading so please NO SPOILERS...</p>
    </div>
    
    
    <div class="add-movie-container">

    
      
      <div class="addMovie-form">
        
        <div class="addMovie-form-left">
          <h3 class="primary-text">Info</h3>
          
          <label for="input-title">Title: </label>
          <input :disabled="disableMovieInputs" id="input-title" class="input" v-model="title">
          
          <label for="input-title">Movie Duration: (minutes) </label>
          <input :disabled="disableMovieInputs" id="input-title" class="input" min="0" type="number" v-model="duration">
          

          <label for="input-genre">Genre: </label>
          <select :disabled="disableMovieInputs" id="input-genre" class="input drop-down" v-model="genre">
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
          
            <span class="error">{{movieErr}}</span>
            <button v-on:click="confirmMovieInfo" class="add-scence" :disabled="disableMovieInputs">Confirm Movie Info</button>
          
            <button v-on:click = "reset" class="delete-scence"> Start Over Completely</button>

          
            
          

        </div>
        
        <div class="addMovie-form-right">
          <div class="scenes-left">
            <h3 class="primary-text">Add Scenes</h3>
            <div class="movie-info-warn" v-if="disableSceneInputs">Please confirm movie info</div>
            <label for="input-startTime">Scene start time </label>
            <input :disabled="disableSceneInputs" id="input-startTime" class="input" min="0" type="number" v-model="tempStartTime">
            
            <label for="input-endTime">Scene end time </label>
            <input :disabled="disableSceneInputs" id="input-endTime" class="input" min="0" type="number" v-model="tempEndTime">
            
            

            <label for="input-intensity">Scene type</label>
            <select :disabled="disableSceneInputs" id="input-intensity drop-down" class="input" v-model="tempType">
              <option v-bind:value="{ genre: 'awkward' }">awkward</option>
              <option v-bind:value="{ genre: 'kiss' }">kiss</option>
              <option v-bind:value="{ genre: 'nudity' }">nudity</option>
            </select>
            <span class="error">{{sceneErr}}</span>
            
            <button :disabled="disableSceneInputs" v-on:click="addScene" class="add-scence"> Add Scene</button>
            
            <button :disabled="disableSceneInputs" v-on:click="sortScenesByStartTime" class="sort-scence">Sort Scences</button>
            
            <button :disabled="disableSceneInputs" v-on:click="submitMovie" class="add-scence"> Submit Movie</button>
            
          </div>
          
          <SceneVisualizer :sendIndexToParent="deleteSelectedScene" :sceneList="scenes" />
        
        </div>
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
      disableMovieInputs:false,
      disableSceneInputs:true,
      sceneToDelete:null,
      genre:"",
      title: "",
      scenes:[],
      duration:0,
      tempStartTime:0,
      tempEndTime:0,
      tempType:"",
      sceneErr: "",
      movieErr: ""
    }
  },
  methods:{
    addScene(){
      if(this.tempStartTime === 0 || this.tempEndTime === 0 || this.tempType === ""){
        this.sceneErr= "Please Make sure all the start time, end time and scence types are filled"
      }else if(this.tempStartTime > this.tempEndTime){
        this.sceneErr ="Start time cannot come after end time"
      }else if(this.tempStartTime > this.duration){
        this.sceneErr ="Start or end time cannot be after movie ends"
      }else{
      const temp = {
          startTime:this.tempStartTime,
          endTime:this.tempEndTime,
          type:this.tempType.genre,
          index:this.scenes.length+1
        }
        const isScenceValid = this.checkSceneOverlap(temp)
        if(isScenceValid){
          this.sceneErr = "Scene time conflict with scene number: "+isScenceValid.index;
        }else{
          this.sceneErr="";
          this.scenes.push(temp);
        }
      }
      
    },
    confirmMovieInfo(){
      if(this.title === ""){
        this.movieErr = "Please enter a title"
      }else if(this.duration <= 0){
        this.movieErr = "Duration cannot be 0"
      }else if(this.genre === ""){
        this.movieErr = "Please choose a genre"
      }
      else{
        this.disableMovieInputs=true;
        this.disableSceneInputs=false;
        this.movieErr = "";
      }
      
    },
    checkSceneOverlap(sceneObj){//returns null or the conflicting obj
      return this.scenes.find(element => {
        if((sceneObj.startTime > element.startTime &&
        sceneObj.startTime < element.endTime)||
        (sceneObj.endTime > element.startTime &&
        sceneObj.startTime < element.endTime)){
          return element;
        }
        if(sceneObj.startTime === element.startTime && sceneObj.endTime === element.endTime){
          return element;
        }
      });
      
    },
    sortScenesByStartTime(){
      this.scenes.sort((a,b)=>{return a.startTime-b.startTime})
    }
    ,
    deleteSelectedScene(index){
      const tempindex = this.scenes.findIndex(indx => indx.index === index+1)
      if(tempindex>=0)
        this.scenes.splice(tempindex,1)
    }
    ,
    reset(){
      this.disableMovieInputs=false;
      this.disableSceneInputs=true
      this.sceneToDelete=null
      this.genre="";
      this.title="";
      this.scenes = [];
      this.duration = 0;
      this.tempStartTime = 0;
      this.tempEndTime = 0;
      this.tempType = "";
      this.sceneErr = "";
    }
    ,submitMovie(){
      //send axios requirest to backend with current data
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
  .add-movie-container{
    width:100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 1rem;
    
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

  .movie-info-warn{
    margin:-1rem 0;
    opacity:0;
    
  }
  .addMovie-form-right:hover .movie-info-warn{
    
    opacity:1;
    color: red;
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
.error{
  color: red;
  font-size: 0.6rem;
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
.sort-scence,
.delete-scence,
.add-scence{
  border: none;
  border-radius: 5px;
}
.sort-scence:hover,
.delete-scence:hover,
.add-scence:hover{
  color:white;
}
.sort-scence:active,
.delete-scence:active,
.add-scence:active{
  color:var(--color-primary);
}
.sort-scence{
  background-color: grey;
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
@media only screen and (max-width: 450px) {
  
  .scenes-left{
    width: 35vw;
  }
  .addMovie-form-right{
    gap: 0.5rem;
  }
}

  </style>
