<template lang="">
    <div class="scene-list-visual">
        
        {{sceneList[0]}}
    </div>
</template>
<script>
export default {
    name:"ScneceVisualizer",
    props:['sceneList']            
        
        
    
}
</script>
<style lang="css">
    .scene-list-visual{
        width: 2rem;
        height: 2rem;
        background-color: red;
    }
</style>