<!-- comp needs better name? -->

<script lang="ts">
    export let buttonValue;
    export let isDisabled: boolean = false;
    export let isFirst: boolean = false;
    export let isLast: boolean = false;
</script>

<button id="game-btn" 
    class="ft-roboto
    {isDisabled ? "disabled" : ""}
    {isFirst ? "f-left" : isLast ? "f-right" : ""}">
    {buttonValue}
</button>   

<style>
    #game-btn {
        height: 100%;
        width: 30%;
        font-size: 14px;
        color: #a2a2a2;
        border: none;
        background: #efefef;
        cursor: pointer;
    }

    #game-btn:not(.disabled):hover {
        color: #313131;
    }

    #game-btn.disabled {
        color: #d1d1d1;
    }
</style>