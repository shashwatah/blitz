<script lang="ts">
    import { createEventDispatcher } from "svelte";
    import { AuthType } from "$lib/types/general";
    
    const dispatch = createEventDispatcher();
    
    // using enum values as numbers 
    let formAuthType: AuthType = 0;
    let formOnLogin: boolean = true;

    function toggleFormAuthType() {
        formAuthType = formOnLogin ? 1 : 0;
        formOnLogin = !formAuthType;
        dispatch("form-toggle", {formOnLogin})
    }

    function btnClick(authType: AuthType) {
        if (authType === formAuthType) {
            dispatch("form-submit", {formAuthType})
        } else {
            toggleFormAuthType();
        }
    }
</script>

<div id="auth-form">
    <label for="uname-input" id="uname-label">username</label>
    <input type="text" id="uname-input"/>
    {#if !formOnLogin}
        <label for="email-input" id="email-label">email</label>
        <input type="email" id="email-input"/>
    {/if}
    <label for="pass-input" id="pass-label">password</label>
    <input type="password" id="pass-input"/>

    <div id="btn-container">
        <button id="reg-btn" class="btn {!formOnLogin ? "submit-btn" : "toggle-btn"} f-left"
            on:click={() => {btnClick(AuthType.Register)}}>register</button>
        <button id="log-btn" class="btn {formOnLogin ? "submit-btn" : "toggle-btn"} f-right "
            on:click={() => {btnClick(AuthType.Login)}}>login</button>
    </div>
</div>

<style>
     label {
        display: inline-block;
        margin-bottom: 10px;
        color: #a2a2a2;
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
    }

    input {
        position: relative;
        height: 50px;
        width: calc(100% - 30px);
        margin-bottom: 40px;
        border: 2px solid #efefef;
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
        padding: 0px 15px;
        user-select: none;
    }

    input:last-of-type {
        margin-bottom: 0px;
    }

    #btn-container {
        position: relative;
        height: 50px;
        width: 100%;
        margin-top: 50px;
    }

    .btn {
        height: 100%;
        width: auto;
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
        cursor: pointer;
    }

    .submit-btn {
        width: 140px;
        background: #fff;
        border: 2px solid #efefef;
        color: #000;
        transition: .1s linear;
    }

    .submit-btn:hover {
        border: 2px solid #d3d2d2;
    }

    .toggle-btn {
        color: #a2a2a2;
        border: 1px solid rgba(0,0,0,0);
        background: none;
    }

    .toggle-btn:hover {
        color: #313030;
    }
</style>