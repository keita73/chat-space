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
  $('.Form').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      let html = buildHTML(data);
      $('.Main__Chat').append(html);      
      $('form')[0].reset();
      $('.Main__Chat').animate({ scrollTop: $('.Main__Chat')[0].scrollHeight});
      $('.Form__submit').prop('disabled', false);
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });
  });
});