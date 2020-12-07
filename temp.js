const fs = require('fs');
const data = require('./messageData.js');
console.log(data)

var newData = { }
data.messages.forEach(m => {
    newData[m.timestamp_ms] = { 
        sender: m.sender_name,
        content: m.content,
    }
})

fs.writeFileSync('data.json', JSON.stringify(newData));
