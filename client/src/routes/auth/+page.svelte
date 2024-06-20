<script>
    let login = true;

    // @ts-ignore
    function btnClick(event) {
        if (!event.target.classList.contains("active")) {
            toggleActive();
        }
    }

    function toggleActive() {
        login = login ? false : true;
    }
</script>

<div id="auth-container">
    <label for="email-input">email</label>
    <input type="email" class="auth-input" id="email-input"/>
    <label for="pass-input">password</label>
    <input type="password" class="auth-input" id="pass-input"/>

    <div id="auth-btn-container">
        <button class="auth-btn {!login ? "active" : ""}" id="reg-btn" on:click={btnClick}>register</button>
        <button class="auth-btn {login ? "active" : ""}" id="log-btn" on:click={btnClick}>login</button>
    </div>
</div>

<style>
    #auth-container {
        position: relative;
        height: auto;
        width: 350px;
        margin-left: 50%;
        transform: translateX(-50%);
        top: 250px;
    }

    label {
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
        color: #a2a2a2;
        display: inline-block;
        margin-bottom: 10px;
    }

    .auth-input {
        border: 2px solid #efefef;
        height: 50px;
        width: calc(100% - 30px);
        font-size: 17px;
        font-family: "Roboto Mono", sans-serif;
        padding: 0px 15px;
        user-select: none;
    }

    .auth-input:focus {
        outline: none;
    }

    #email-input {
        margin-bottom: 45px;
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
        color: lightgrey;
        cursor: pointer;
    }

    .auth-btn:focus {
        outline: none;
    }

    #reg-btn {
        float: left;
    }

    #log-btn {
        float: right;
    }

    .active {
        width: 140px;
        background: #fff;
        border: 2px solid #efefef;
        color: #000;
        transition: .1s ease-in;
}
</style>