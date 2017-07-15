// YOUR CODE HERE:
var app = {
  server: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
  text: 'string',
  username: 'default',
  roomname: 'Lobby'
};

// var username = escapeHTML(window.location.search.slice(10));

app.init = function() {

  app.username = window.location.search.slice(10);

  //when submit is pressed
  $('#submitBtn').on('click', function() {
    var message = {
      username: username,
      text: escapeHTML(document.getElementById('writeComment').value),
      roomname: app.getRoomName()
    };
    //console.log(message);
    // POST/send secure text to server
    app.send(message);
    // $("#writeComment").empty();
    document.getElementById('writeComment').value = '';
  });

  app.getRoomName();

  $('#newRoom').on('click', function() {
    console.log($('#newRoom').text());
    app.addRoom($('#newRoom').text());
  });

};

app.getRoomName = function() {
  // Create new room when 'New room...' option is clicked
  var currentRoom;
  $('#roomSelect').on('change', function() {
    //console.log(this);
    var e = document.getElementById('roomSelect');
    var newRoomName = e.options[e.selectedIndex].text;
    // app.fetch();
    app.renderRoom(newRoomName);
  });
  var e = document.getElementById('roomSelect');
  currentRoom = e.options[e.selectedIndex].text;
  return currentRoom;
};

app.send = function(obj) {
  var msgStringified = JSON.stringify(obj);

  $.ajax({
    url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: msgStringified,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};

app.fetch = function() {
  $.ajax({
    url: 'http://parse.hrr.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {
      order: '-createdAt',
      limit: 30
    },
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message received');
      //app.renderRoom(data.results.roomname)
      for (var i = 0; i < data.results.length; i++) {
        console.log(data.results[i]);

        app.renderMessage(data.results[i]);
      }
      // app.renderMessage(data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to receive the message', data);
    }
  });
};

app.clearMessages = function() {
  $('#chats').empty();
  //$('#chats').remove();
};

app.renderMessage = function(msgObj) {
  var secName = '<p>' + escapeHTML(msgObj.username) + '</p>';
  var secMsgText = '<p>' + escapeHTML(msgObj.text) + '</p>';
  $('#chats').append(secName);
  $('#chats').append(secMsgText);
};

app.renderRoom = function(roomName) {
  // $('#roomSelect').append('<li id="' + roomName +'">' + roomName + '</li>');
  // Hide/clear whatever room you're in
  app.clearMessages();
  // Specify data wanted
  // Get messages data for that room
  app.fetch();
  // Display messages data in room
};

app.handleUsernameClick = function() {
  $('#main').find('.username').click(function() {
  // turn messages related to username into bold (addClass and use CSS)
  });
};

//when new room is clicked
app.addRoom = function(roomName) {
  //display a prompt box for room name input
  var rmName = prompt('Enter new room name: ');
  //escapeHTML the room name
  var secureRoomName = escapeHTML(rmName);
  $('#roomSelect').append('<option value="' + secureRoomName + '">' + secureRoomName + '</option>');
  //take value from prompt and add to dropdown menu
  app.renderRoom(secureRoomName);
};

//escape html, meaning turn inserted messages into safe strings
var entityMap = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
  '/': '&#x2F;',
  '`': '&#x60;',
  '=': '&#x3D;'
};

function escapeHTML(string) {
  return String(string).replace(/[&<>"'`=\/]/g, function (s) {
    return entityMap[s];
  });
}

app.init();









