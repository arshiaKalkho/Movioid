<template lang="">
    <div>
        <div class="loading-spinner"></div>
        <div class="loading-spinner1"></div>
        <div class="loading-spinner2"></div>
    </div>
</template>
<script>
export default {
    name:"loadingSpinner"
}
</script>
<style lang="css" scoped>
@keyframes spinner {
        0% {
        -webkit-transform: rotate(0deg);
        -moz-transform: rotate(0deg);
        -ms-transform: rotate(0deg);
        -o-transform: rotate(0deg);
        transform: rotate(0deg);
        }
        100% {
        -webkit-transform: rotate(360deg);
        -moz-transform: rotate(360deg);
        -ms-transform: rotate(360deg);
        -o-transform: rotate(360deg);
        transform: rotate(360deg);
        }
    }
    .loading-spinner,
    .loading-spinner1,
    .loading-spinner2{
        position:fixed;
        top:50vh;
        left:46vw;
        border-radius: 1rem;
        content: '';
        height:2rem;
        width: 2rem;
        animation: spinner 950ms infinite ease-in-out;
    }
    
    .loading-spinner1{
        
        animation: spinner 1000ms infinite ease-in-out;
    }
    .loading-spinner2{
        
        animation: spinner 1050ms infinite ease-in-out;
    }
    .loading-spinner::before,
    .loading-spinner1::before,
    .loading-spinner2::before,
    .loading-spinner::after,
    .loading-spinner1::after,
    .loading-spinner2::after{
        content: '';
        border: 2px solid var(--color-accent);
        overflow:hidden;
        position:fixed;
        left:2rem;
        border-radius: 50%;
        height:1rem;
        width: 1rem;
        background-color: var(--color-text);
        
    }
    .loading-spinner::after,
    .loading-spinner1::after,
    .loading-spinner2::after{
        right:-2rem;
    }
    
</style>