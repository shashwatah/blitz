<script>
    import { currentPage } from "$lib/general.stores";
</script>

<div id="topbar">
    <a href="{$currentPage === "GAME" ? "/" : ""}"><img alt="Blitz Logo" id="logo" src="./logo.svg" draggable="false"/></a>

    <div id="navigation">
        {#if $currentPage === "GAME"}
            <button id="col-btn" class="nav-btn"></button>
        {:else}
            <!-- <button class="nav-btn sec-btn" id="about-btn">about</button>
            <button class="nav-btn sec-btn" id="rules-btn">rules</button> -->
            <a href="/auth"><button id="acc-btn" class="nav-btn">login</button></a>
        {/if}
    </div>
</div>

<style>
    #logo {
        position: relative;
        height: 22.5px;
        float: left;
        margin-top: 10.5px;
    }

    #navigation {
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

    #col-btn {
        width: 42.5px;
        background: #efefef;
    }

    #col-btn:hover {
        transition: .1s linear;
        background: #313030;
    }

    /* .sec-btn {
        width: auto;
        margin-right: 30px;
        background: none;
    }

    .sec-btn:hover {
        transition: .1s linear;
        font-weight: 500;
        color: #000;
    } */

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