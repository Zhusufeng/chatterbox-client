// YOUR CODE HERE:
var app = {};

app.init = function() {};

app.send = function(obj) {
  var msgStringified = JSON.stringify(obj);

  $.ajax({
    type: "POST",
    data: msgStringified
    // dataType: 'text'
  });
};

app.fetch = function() {
  $.ajax({
    type: "GET"
  });
};

app.clearMessages = function() {
  $('#chats').empty();
  //$('#chats').remove();
};

app.renderMessage = function(msg) {
  var msgText = '<p>' + msg.text + '</p>';
  $('#chats').append(msgText);
};

app.renderRoom = function(roomName) {
  var rmName = '<option value="#' + roomName +'">' + roomName + '</option>';
  $('#roomSelect').append(rmName);
};

app.handleUsernameClick = function() {
  $('#main').find('.username').click(function() {
  // turn messages related to username into bold (addClass and use CSS)
  });
};