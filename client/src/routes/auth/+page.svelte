<script lang="ts">
    // where to use numbers and where to use actual values for enums is currently undecided
    // |- this also affects other files that use enums, eg. chessboard

    enum authType {
        Login,
        Register
    }

    let activeAuthType: authType = 0;
    let onLogin: boolean = !activeAuthType;

    function toggleActiveAuthType() {
        activeAuthType = onLogin ? 1 : 0;
        onLogin = !activeAuthType;
    }

    function authBtnClick(authBtnType: authType) {
        if (authBtnType === activeAuthType) {
            console.log("hit", authBtnType.valueOf());
        } else {
            toggleActiveAuthType();
        }
    }
</script>

<div id="auth-container" class="auth-container-{onLogin ? "log" : "reg"}">
    {#if !onLogin}
        <label for="uname-input" id="uname-label" class="auth-input-label">username</label>
        <input type="text" id="uname-input" class="auth-input"/>
    {/if}
    <label for="email-input" id="email-label" class="auth-input-label">email</label>
    <input type="email" id="email-input" class="auth-input"/>
    <label for="pass-input" id="pass-label" class="auth-input-label">password</label>
    <input type="password" id="pass-input" class="auth-input"/>

    <div id="auth-btn-container">
        <button id="reg-btn" class="auth-btn f-left {!onLogin ? "auth-btn-active" : ""}"
            on:click={() => {authBtnClick(authType.Register)}}>register</button>
        <button id="log-btn" class="auth-btn f-right {onLogin ? "auth-btn-active" : ""}"
            on:click={() => {authBtnClick(authType.Login)}}>login</button>
    </div>
</div>

<style>
    #auth-container {
        position: relative;
        height: auto;
        width: 350px;
        margin-left: 50%;
        transform: translateX(-50%);
    }

    .auth-container-log {
        margin-top: 250px;
    }

    .auth-container-reg {
        margin-top: 200px;
    }

    label {
        display: inline-block;
        margin-bottom: 10px;
        color: #a2a2a2;
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
    }

    .auth-input {
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

    .auth-input:last-of-type {
        margin-bottom: 0px;
    }

    #auth-btn-container {
        position: relative;
        height: 50px;
        width: 100%;
        margin-top: 50px;
    }

    .auth-btn {
        height: 100%;
        width: auto;
        background: none;
        border: 1px solid rgba(0,0,0,0);
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
        color: #a2a2a2;
        cursor: pointer;
    }

    .auth-btn:hover {
        color: #313030;
    }

    .auth-btn-active {
        width: 140px;
        background: #fff;
        border: 2px solid #efefef;
        color: #000;
        transition: .1s linear;
    }

    .auth-btn-active:hover {
        border: 2px solid #d3d2d2;
    }
</style>