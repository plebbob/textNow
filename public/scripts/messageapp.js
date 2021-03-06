console.log("Sanity Check: JS is working!");
var template;
var $messageList;
var allMessages = [];

$(document).ready(function() {

  $messageList = $('#message');

  var source = $('#message-template').html();
  template = Handlebars.compile(source);

  $('#inbox-form').on('submit', function(e) {
    e.preventDefault();
    var newData = $(this).serializeArray();
      $.ajax({
        method: 'POST',
        url: '/api/messages',
        data: newData,
        success: postSuccess,
        error: postError,
      });
  });
});

function render () {
  $messageList.empty();
  var html = template({ messages: allMessages});
  $messageList.append(html);
}

// create a new message
function postSuccess(json) {
  $('#inbox-form input').val(" ");
  $('#message').val(" ");
  allMessages.push(json);
  render();

  console.log('post messages success', json);
}

function postError(err) {
  console.log('POST Error: ', err);
}
