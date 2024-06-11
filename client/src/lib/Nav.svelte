<div id="nav">
    <button class="nav-btn sec-btn" id="about-btn">about</button>
    <button class="nav-btn sec-btn" id="rules-btn">rules</button>
    <button class="nav-btn" id="acc-btn">sign in</button>
</div>

<style>
    #nav {
        position: relative;
        float: right;
    }

    .nav-btn {
        height: 42.5px;
        font-family: "Roboto Mono", sans-serif;
        font-size: 15px;
        color: #313030;
        cursor: pointer;
        user-select: none;
    }

    .sec-btn {
        width: auto;
        margin-right: 30px;
        background: none;
        border: none;
    }

    .sec-btn:hover {
        transition: .1s linear;
        font-weight: 500;
        color: #000;
    }

    #acc-btn {
        width: 130px;
        border: none;
        background: #efefef;
    }

    #acc-btn:hover {
        transition: .1s linear;
        color: #efefef;
        background: #313030;
    }
</style>