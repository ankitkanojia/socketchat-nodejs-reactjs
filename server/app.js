const express = require('express')
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
var nameCollection = [];
var messageCollection = [];
var i = 0;

var port = process.env.PORT || 3030;

app.use(express.static(__dirname + '/'));

io.on('connection', client => {

  client.on('get_names', () => {
    io.sockets.emit('namecollection', nameCollection)
  })

  client.on('send_message', (messageDetails) => {
    messageCollection = messageCollection.concat(messageDetails);
    io.sockets.emit('get_messages', messageCollection)
  })
  
  
  client.on('add_name', (name) => {
    i = i + 1;
    var onlineUser = OnlineUsers.find(m => m.id === i);
    onlineUser.name = name;
    var isExists = nameCollection.find(m => m === name);
    if (isExists == null) { nameCollection = nameCollection.concat(onlineUser); }
    io.sockets.emit('namecollection', nameCollection);
  })

  client.on('disconnect', () => { });
});

server.listen(port, function(){
  console.log('listening on *:3000');
});

var OnlineUsers = [
  {
    "id": 1,
    "name": "Louis Litt",
    "photo": "louislitt.png",
    "status": "online",
    "lastmessage": "You just got LITT up, Mike."
  },
  {
    "id": 2,
    "name": "Harvey Specter",
    "photo": "harveyspecter.png",
    "status": "online",
    "lastmessage": "Wrong. You take the gun, or you"
  },
  {
    "id": 3,
    "name": "Rachel Zane",
    "photo": "rachelzane.png",
    "status": "online",
    "lastmessage": "I was thinking that we could have."
  },
  {
    "id": 4,
    "name": "Donna Paulsen",
    "photo": "donnapaulsen.png",
    "status": "online",
    "lastmessage": "Mike, I know everything! I'm Donna.."
  },
  {
    "id": 5,
    "name": "Mike Ross",
    "photo": "mikeross.png",
    "status": "online",
    "lastmessage": "Rachel, I know everything! I'm Donna.."
  }
];
