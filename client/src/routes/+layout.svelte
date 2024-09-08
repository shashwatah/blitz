<script>
    import NavBar from "$lib/components/NavBar.svelte";

    import game from "$lib/controllers/game";
    import { currentPage } from "$lib/stores/general";

    function handleClick() {
        if ($currentPage === "GAME") game.resign();
    }
</script>

<div id="navbar-container" class="{$currentPage === "GAME" ? "in-game" : "not-in-game"}">
    <NavBar on:btn-click={handleClick}/>
</div>

<slot></slot>

<style>
    #navbar-container {
        height: 42.5px;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50.5%); /* ? */
        transition: 0.2s linear;
    }
    
    .in-game {
        width: 90%;
        top: 20px;
    }
    
    .not-in-game {
        width: 70%;
        top: 65px;
    }
</style>