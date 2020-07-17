$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Main__Chat__Box" data-message-id=${message.id}>
          <div class="Main__Chat__Box__User">
            <div class="Main__Chat__Box__User__Name">
              ${message.user_name}
            </div>
            <div class="Main__Chat__Box__User__Data">
              ${message.created_at}
            </div>
          </div>
          <div class="Main__Chat__Box__Message">
            <p class="Main__Chat__Box__Message__Content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="Main__Chat__Box" data-message-id=${message.id}>
          <div class="Main__Chat__Box__User">
            <div class="Main__Chat__Box__User__Name">
              ${message.user_name}
            </div>
            <div class="Main__Chat__Box__User__Data">
              ${message.created_at}
            </div>
          </div>
          <div class="Main__Chat__Box__Message">
            <p class="Main__Chat__Box__Message__Content">
              ${message.content}
            </p>
          </div>
        </div>`
        return html;
    };
  }

  let reloadMessages = function() {
    let last_message_id = $('.Main__Chat__Box:last').data("message-id") || 0;
    console.log(last_message_id)
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        let insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.Main__Chat').append(insertHTML);
        $('.Main__Chat').animate({ scrollTop: $('.Main__Chat')[0].scrollHeight});
      }
   })
    .fail(function() {
      alert('error');
    });
  };
  setInterval(reloadMessages, 7000);
});