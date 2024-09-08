<script>
    import { createEventDispatcher } from "svelte";
    const dispatch = createEventDispatcher();

    import { currentPage } from "$lib/stores/general";
</script>

<nav>
    <a href="{$currentPage === "GAME" ? "/" : ""}">
        <img alt="Blitz Logo" id="logo" src="./logo.svg" draggable="false"/>
    </a>

    <button id="nav-btn" on:click={() => {dispatch("btn-click")}}>
        {$currentPage === "GAME" ? "resign" : "login"}
    </button>
</nav>

<style>
    #logo {
        position: relative;
        height: 22.5px;
        float: left;
        margin-top: 10.5px;
    }

    #nav-btn {
        position: relative;
        float: right;
        height: 42.5px;
        width: 130px;
        font-family: "Roboto Mono", sans-serif;
        font-size: 15px;
        background: #efefef;
        color: #313030;
        border: none;
        cursor: pointer;
        user-select: none;
    }

    #nav-btn:hover {
        transition: .1s linear;
        color: #fff;
        background: #313030;
    }
</style>