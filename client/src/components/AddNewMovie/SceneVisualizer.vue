<template lang="">
    <div class="scene-list-visual">
        <ul calss="scene-list">
            <li class="scene-list-element" v-for="(scene,index) in sceneList" :key="index">
                <div class="element-header">
                    <span class="place-holder-text">scene no:</span>
                    {{index}}<br/>
                    <span class="place-holder-text">from:</span> {{scene.startTime}}
                    <span class="place-holder-text">to:</span> {{scene.endTime}}
                </div>
                
                <div class="element-body">
                <span class="place-holder-text">Type:</span> {{scene.type}}
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name:"ScneceVisualizer",
    props:{
        sceneList:Array
    }
    
}
</script>
<style lang="css" scoped>
    
  
    
    .scene-list-element{
        list-style-type: none;
        margin:5px;
        border:1px solid var(--color-text);
        border-radius: 3px;
        padding: 3px;
        height:5rem;
        width:fit-content;

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
    .element-header::after{
        content: "";
        height: 5px;
        width:2rem;
        background:red;
        
    }
    
    .element-body{
        margin-bottom: 5px;
        
    }
    .place-holder-text{
        color: var(--color-text);
    }
    
</style>