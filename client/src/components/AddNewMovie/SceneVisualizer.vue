<template lang="">
    <div class="scene-list-visual">
        <ul calss="scene-list">
            <li class="scene-list-element" v-for="(scene,index) in sceneList" :key="index">
                <div class="element-header">
                    <p><span class="place-holder-text small">scene no:</span>
                    {{scene.index}}<br/></p>
                    <p><span class="place-holder-text medium">Type:</span> {{scene.type}}</p>
                    <p><span class="place-holder-text medium">from:</span> {{scene.startTime}}
                    <span class="place-holder-text medium">to:</span> {{scene.endTime}}</p>
                    
                </div>
                
                
                <button v-on:click="sendIndexToParentToDelete(scene.index)" class="delete-button">delete</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"ScneceVisualizer",
    props:{
        sceneList:Array,
        sendIndexToParent:{type: Function}
    },
    data(){
        return{
            indexToBeDeleted:null
        }
    },
    methods:{
        sendIndexToParentToDelete(index){
            this.sendIndexToParent(index-1)
        }
    }
    
}
</script>
<style lang="css" scoped>
    
    .small{
        font-size: 0.8rem;
    }
    .medium{
        font-size: 0.95rem;
    }
    
    .scene-list-element{
        list-style-type: none;
        margin:5px;
        border:1px solid var(--color-text);
        border-radius: 3px;
        padding: 0.5rem;
        height:6rem;
        width:fit-content;

    }
    .element-header{
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        margin-bottom: 0;
    }
    .scene-list-visual{
        
        overflow-y: scroll;
        background-color: var(--color-primary);
        color: var(--color-accent);
        height:20rem;
        width: fit-content;
        border:1px outset var(--color-text);
        border-radius: 5px;
    }
    
    .delete-button{
        color:red;
        background-color:var(--color-primary);
        border:none;
        border-radius: 3px;
        padding:0 1px;
    }
    .delete-button:hover{
        background: red;
        color:var(--color-accent)
    }
    
    .place-holder-text{
        color: var(--color-text);
        
    }
    
</style>