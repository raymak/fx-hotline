"use strict";

self.port.emit('log', 'the panel says hello');
document.getElementById('submit-btn').addEventListener('click', (e)=>{
    self.port.emit('submit', document.getElementById('text-area').value); 
});