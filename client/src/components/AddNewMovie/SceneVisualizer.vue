<template lang="">
    <div class="scene-list-visual">
        <ul calss="scene-list">
            <li class="scene-list-element" v-for="(scene,index) in sceneList" :key="index">
                <div class="elemetn-header">
                    {{scene.name}}
                </div>
                
                <div class="element-body">
                    {{scene.ranks}}
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
<style lang="css">
    .scene-list-element{
        list-style-type: none;
        float:right;
        margin:5px;
        border:1px solid var(--color-text);

    }
    .scene-list-visual{
        overflow-x:scroll;
        background-color: var(--color-primary);
        width: 85%;
        border:1px outset var(--color-text);
        border-radius: 5px;
    }
    .element-body{

    }
    
</style>