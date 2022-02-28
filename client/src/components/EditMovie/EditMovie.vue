<template lang="">
  <div class="addMovie-container">
  
    <div class="addMovie-header">
      <h3>edit movie</h3>
      
    </div>
    
    
    <div class="add-movie-container">

    
      
      <div class="addMovie-form">
        
        <div class="addMovie-form-left">
          <h3 class="primary-text">Info</h3>
          <label for="input-title">Title: </label>
          <input id="input-title" class="input" v-model="title">
          
          
          <label for="input-title">Movie Duration: (minutes) </label>
          <input  id="input-title" class="input" min="0" type="number" v-model="duration">
          
          <label for="input-title">Image Link: </label>
          <input  id="input-title" class="input" v-model="image">

          <label for="input-genre">Genre: </label>
          <select  id="input-genre" class="input drop-down" v-model="genre">
            <option v-bind:genre="'Action' ">Action</option>
            <option v-bind:genre="'Comedy' ">Comedy</option>
            <option v-bind:genre="'Drama' ">Drama</option>
            <option v-bind:genre="'Fantasy' ">Fantasy</option>
            <option v-bind:genre="'Horror' ">Horror</option>
            <option v-bind:genre="'Mystery' ">Mystery</option>
            <option v-bind:genre="'Romance' ">Romance</option>
            <option v-bind:genre="'Thriller' ">Thriller</option>
            <option v-bind:genre="'Western'">Western</option>
          </select>
          
            <span class="error">{{movieErr}}</span>
            <button v-on:click="confirmMovieInfo" class="add-scence" >Confirm Movie Info</button>
          

          
            
          

        </div>
        
        <div class="addMovie-form-right">
          <div class="scenes-left">
            <h3 class="primary-text">Add Scenes</h3>
            <div class="movie-info-warn" v-if="disableSceneInputs">Please confirm movie info</div>
            <label for="input-startTime">Scene start time </label>
            <input  id="input-startTime" class="input" min="0" type="number" v-model="tempStartTime">
            
            <label for="input-endTime">Scene end time </label>
            <input id="input-endTime" class="input" min="0" type="number" v-model="tempEndTime">
            
            

            <label for="input-intensity">Scene type</label>
            <select  id="input-intensity" class="input drop-down" v-model="tempType">
              <option v-bind:value="{ genre: 'awkward' }">awkward</option>
              <option v-bind:value="{ genre: 'kiss' }">kiss</option>
              <option v-bind:value="{ genre: 'nudity' }">nudity</option>
            </select>
            <span class="error">{{sceneErr}}</span>
            
            <button  v-on:click="addScene" class="add-scence"> Add Scene</button>
            
            <button  v-on:click="sortScenesByStartTime" class="sort-scence">Sort Scences</button>
            
            <button  v-on:click="submitMovie" class="add-scence"> Submit Changes</button>
            
          </div>
          
          <SceneVisualizer :sendIndexToParent="deleteSelectedScene" :sceneList="scenes" />
        
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import SceneVisualizer from '../AddNewMovie/SceneVisualizer.vue'
import DataServices from '../../dataServices'

export default {
  name: "EditMovie",
  props:{
    refTitle:{required:true}
  },
  components:{
    SceneVisualizer
  }
  ,data(){
    return{
      sceneToDelete:null,
      image:"",
      genre:"",
      title: "",
      scenes:[],
      duration:0,
      tempStartTime:0,
      tempEndTime:0,
      rating: 0,
      tempType:"",
      sceneErr: "",
      movieErr: "",
      successMassage:""
      }
    },
    created(){
      DataServices.getMoviesByTitle(this.refTitle)
      .then((movie)=>{
        this.image = movie.image;
        this.genre = movie.genre;
        this.title = movie.title;
        this.scenes = movie.scenes;
        this.duration = movie.duration;
        this.rating = movie.rating;
      }).catch(()=>{
        this.movieErr = "error geting movie"
      })
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
  
    ,async submitMovie(){
      this.calculateRating();
      DataServices.addNewMovie({
        image:this.image,
        title:this.title,
        genre:this.genre,
        duration:this.duration,
        scenes:this.scenes,
        rating:this.rating
      }).then(res=>{
        if(res.status === 201){
          this.reset()
        }
      }).catch(()=>{
        this.sceneErr="A movie exists with the same title"
      })
      
    },
    calculateRating(){
      this.rating=0;
      this.scenes.forEach(element => {
        if(element.type === "awkward"){
          this.rating+=1;
        }else if(element.type === "kiss"){
          this.rating+=3;
        }else{
          this.rating+=5;
        }
      });
      
      this.rating = this.rating/this.scenes.length;
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
}</style>
