<div id="chat-box">
    <div id="history"></div>
    <input type="text" id="msg-input" placeholder="type your message"/>
</div>

<style>
    #chat-box {
        height: 100%;
        width: 100%;        
    }

    #history {
        position: fixed;
        top: 0px;
        height: calc(100% - 44px);
        width: 100%;
    }

    #msg-input {
        position: fixed;
        bottom: .5px;
        height: 40px;
        width: calc(100% - 20px);
        background: #efefef;
        border: none;
        border-top: 1px solid #d1d1d1;
        padding: 0px 10px;
        font-size: 15px;
        font-family: "Roboto Mono", sans-serif;
        color: #313131;
    }

    #msg-input::placeholder {
        color: #a2a2a2;
    }
</style>