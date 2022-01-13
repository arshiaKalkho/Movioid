<template lang="">
    <div class="login-register-container">
        <div class="floating-container">
            <h3>Login/Register</h3>
            <div class="login-box">
                <label for="username">Username: </label>
                <input id="username" type="text" class="input">
                <label for="password">Password: </label>
                <input id="password" type="text" class="input">
                <button class="login-button ">Login</button>
            </div>
            <div class="register-box">
                <label for="retype-password">confirm password
                    <span class="subText">(for registeration only)</span>
                </label>
                <input id="retype-password" type="text" class="input">
                <label for="password">Email: </label>
                <input id="password" type="text" class="input">
            </div>
            <div class="buttons-contianer">
                <button class="register-button">Reginster</button>
            </div>
        </div>
    </div>
</template>
<script>
import DataServices from "../../dataServices"
export default {
    data(){
        return{
            userName:"",
            password:"",
            confirmPassword:"",
            email:""
        }
    },
    methods:{
        login(){
            DataServices.loginUser
        },
        register(){

        }
    }
}
</script>
<style lang="css" scoped>
    .login-register-container{
        width:100%;
        height:100vh;
        background-image: url(../../assets/login-background.jpg);
        background-repeat: no-repeat;
        background-position: center;
        background-size: cover;

        display:flex;
        align-items: center;
        justify-content: center;
    }
    .floating-container{
        width:16rem;
        height:fit-content;
        border-radius: 5px;
        border:1px inset var(--color-text);
        background-color:var(--color-primary);
        padding: 0.5rem;
        display:flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .login-box{
        margin-top: 1rem;
        display:flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .register-box{
        margin-top:0.5rem;
        display:flex;
        align-items: center;
        flex-direction: column;
        justify-content: center;
    }
    .buttons-contianer{
        margin: 0.5rem;
        display:flex;
        align-items: center;
        flex-direction: row;
        justify-content: center;
    }
    button{
        padding:2px 0.5rem;
        height: 1.5rem;
        border-radius: 4px;
        background-color: var(--color-text);
        margin:0.5rem;
        border:1px solid black;
    }
    .login-button:hover,
    .register-button:hover{
        color:var(--color-accent)
    }
    .login-button:active,
    .register-button:active{
        background-color:var(--color-accent)
    }
    .subText{
        font-size: 0.5rem;
    }

    .login-box{
    }
</style>