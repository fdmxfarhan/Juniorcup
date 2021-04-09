
var socket = io();

var form = document.getElementById('sendchat');
var message = document.getElementById('chat-msg');
var sender = document.getElementById('chat-sender');
var field = document.getElementById('chat-field');
var team = document.getElementById('chat-team');
var messageContainer = document.getElementById('messages-container');

form.addEventListener('submit', function(e) {
    e.preventDefault();
    // const formData = new FormData(form);
    // const queryString = new URLSearchParams(formData).toString();
    if (message.value) {
        var d = new Date();
        socket.emit(`chat${field.value}`, {
            message: message.value, 
            senderName: sender.value, 
            senderRole: 'student', 
            senderTeam: team.value, 
            time: `${d.getHours()}:${d.getMinutes()}`,
            date: Date.now
        });
        message.value = '';
    }
});

socket.on(`chat${field.value}`, function(msg) {
    if(msg.senderName != sender.value)
    {
        var inMessage = document.createElement('div');
        inMessage.classList.add('in-message');
        var message = document.createElement('div');
        message.classList.add('message');
        
        var senderMsg = document.createElement('div');
        senderMsg.classList.add('sender');
        senderMsg.textContent = msg.senderName;
        
        var msgCont = document.createElement('div');
        msgCont.classList.add('msg-content');
        msgCont.textContent = msg.message;
        
        var timeMsg = document.createElement('div');
        timeMsg.classList.add('time');
        timeMsg.textContent = msg.time;
        
        message.appendChild(senderMsg);
        message.appendChild(msgCont);
        message.appendChild(timeMsg);
        inMessage.appendChild(message);
        messageContainer.appendChild(inMessage);
        messageContainer.scrollTo(0,1000000000);
    }
    else
    {
        var inMessage = document.createElement('div');
        inMessage.classList.add('out-message');
        var message = document.createElement('div');
        message.classList.add('message');
        
        var senderMsg = document.createElement('div');
        senderMsg.classList.add('sender');
        senderMsg.textContent = msg.senderName;
        
        var msgCont = document.createElement('div');
        msgCont.classList.add('msg-content');
        msgCont.textContent = msg.message;
        
        var timeMsg = document.createElement('div');
        timeMsg.classList.add('time');
        timeMsg.textContent = msg.time;
        
        // message.appendChild(senderMsg);
        message.appendChild(msgCont);
        message.appendChild(timeMsg);
        inMessage.appendChild(message);
        messageContainer.appendChild(inMessage);
        messageContainer.scrollTo(0,1000000000);
    }
});