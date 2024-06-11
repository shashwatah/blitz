<script>
    import Nav from "$lib/Nav.svelte";
</script>

<div id="topbar">
    <a href="/game"><img id="logo" src="./logo.svg" alt="blitz logo" draggable="false"/></a>
    <Nav/>
</div>

<style>
    #topbar {
        background: none;
        position: fixed;
        margin-left: 50%;
        transform: translateX(-50%);
        top: 65px;
        height: 42.5px;
        width: 70%;
    }

    #logo {
        position: relative;
        height: 22.5px;
        float: left;
        margin-top: 10.5px;
        user-select: none;
    }
</style>