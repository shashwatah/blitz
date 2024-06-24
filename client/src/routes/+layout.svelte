<script>
    import { page } from "$app/stores";
    import TopBar from "$lib/components/TopBar.svelte";
    
    $: onHomePage = $page.url.pathname === "/";
    $: onGamePage = $page.url.pathname === "/game";
</script>

<div id="topbar-container" class="{onGamePage ? "in-game" : "not-in-game"}">
    <TopBar {onHomePage} {onGamePage}/>
</div>

<slot></slot>

<style>
    #topbar-container {
        height: 42.5px;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);
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