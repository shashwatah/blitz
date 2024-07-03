<script lang="ts">
    import AuthForm from "$lib/components/AuthForm.svelte";

    let formOnLogin = true;
   
    // @ts-ignore
    function handleFormToggle(event) {
        formOnLogin = event.detail.formOnLogin;
    }

    // @ts-ignore
    function handleFormSubmit(event) {
        console.log("form-submit", event.detail.formAuthType);
    }
</script>

<div id="auth-form-container" class="auth-form-container-{formOnLogin ? "log" : "reg"}">
    <AuthForm on:form-toggle={handleFormToggle} on:form-submit={handleFormSubmit}/>
</div>

<style>
    #auth-form-container {
        position: relative;
        height: auto;
        width: 350px;
        margin-left: 50%;
        transform: translateX(-50%);
    }

    .auth-form-container-log {
        margin-top: 250px;
    }

    .auth-form-container-reg {
        margin-top: 200px;
    }
</style>