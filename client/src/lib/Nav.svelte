<script>
    export let inGame;
</script>


<div id="nav">
    {#if inGame}
        <button class="nav-btn" id="menu-btn"></button>
    {:else}
        <button class="nav-btn sec-btn" id="about-btn">about</button>
        <button class="nav-btn sec-btn" id="rules-btn">rules</button>
        <a href="/auth"><button class="nav-btn" id="acc-btn">login</button></a>
    {/if}
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
        border: none;
        cursor: pointer;
        user-select: none;
    }

    #menu-btn {
        width: 42.5px;
        background: #efefef;
    }

    #menu-btn:hover {
        transition: .1s linear;
        background: #313030;
    }

    .sec-btn {
        width: auto;
        margin-right: 30px;
        background: none;
    }

    .sec-btn:hover {
        transition: .1s linear;
        font-weight: 500;
        color: #000;
    }

    #acc-btn {
        width: 130px;
        background: #efefef;
    }

    #acc-btn:hover {
        transition: .1s linear;
        color: #fff;
        background: #313030;
    }
</style>