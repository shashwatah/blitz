<script>
    import Nav from "$lib/Nav.svelte";
    import {page} from "$app/stores";

    $: inGame = $page.url.pathname === "/game";
    $: console.log($page.url.pathname)
</script>

<div id="topbar" class="{inGame ? "in-game" : "not-in-game"}">
    <a href="{inGame ? "/" : "/game"}"><img id="logo" src="./logo.svg" alt="blitz logo" draggable="false"/></a>
    <Nav {inGame}/>
</div>

<style>
    #topbar {
        background: none;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);
        height: 42.5px;
    }

    .not-in-game {
        top: 65px;
        width: 70%;
    }

    .in-game {
        top: 20px;
        width: 90%;
    }

    #logo {
        position: relative;
        height: 22.5px;
        float: left;
        margin-top: 10.5px;
        user-select: none;
    }
</style>