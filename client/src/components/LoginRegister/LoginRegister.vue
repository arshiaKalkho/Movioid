<template lang="">
    <div class="login-register-container">
        <div class="floating-container">
            <h3>Login/Register</h3>
            <span class="error">{{err}}</span>
            <div class="login-box">
                <label for="username">Username: </label>
                <input id="username" type="text" class="input" v-model="userName">
                <label for="password" >Password: </label>
                <input id="password" type="password" class="input" v-model="password">
                <button v-on:click="login" class="login-button ">Login</button>
            </div>
            <div class="register-box">
                <label for="retype-password">confirm password
                    <span class="subText">(for registeration only)</span>
                </label>
                <input id="retype-password" type="password" class="input"  v-model="confirmPassword">
                <label for="password">Email: </label>
                <input id="email" type="text" class="input" v-model="email">
            </div>
            <div class="buttons-contianer">
                <button v-on:click="register" class="register-button">Reginster</button>
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
            email:"",
            err:""
        }
    },
    methods:{
        async login(){
            DataServices.loginUser(this.userName, this.password).then(()=>{
                this.err=""
            }).catch(()=>{
                this.err="username or password incorrect"
            })
        },
        async register(){
            document.getElementById
            
            if(!this.password ||!this.confirmPassword || !this.email ){
                this.err = "please fill all the fields"
                return
            }
            if(this.password != this.confirmPassword){
                this.err = "passwords don't match"
                return
            }
            DataServices.registerUser(this.userName, this.password, this.email).then(()=>{
                location.reload();
                }).catch(()=>{
                this.err="username or email is already in use"
            })

            
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
    .error{
    color: red;
    font-size: 0.7rem;
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