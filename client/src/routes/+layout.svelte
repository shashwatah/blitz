<script>
    import TopBar from "$lib/components/TopBar.svelte";
    import { currentPage } from "$lib/stores/general.stores";
</script>

<div id="topbar-container" class="{$currentPage === "GAME" ? "in-game" : "not-in-game"}">
    <TopBar/>
</div>

<slot></slot>

<style>
    #topbar-container {
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