$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="MessageBox">
            <div class="Chat-main__message-list__speaker">
              ${message.user_name}
            </div>
            <div class="Chat-main__message-list__time">
              ${message.created_at}
            </div>
            <p class="Chat-main__message-list__text">
              ${message.content}
            </p>
            <img class="Form__inputimage" src="${message.image}">
            </div>
          </div>`

      return html;
    } else {
      let html =
      `<div class="MessageBox">
          <div class="Chat-main__message-list__speaker">
            ${message.user_name}
          </div>
          <div class="Chat-main__message-list__time">
            ${message.created_at}
          </div>
          <p class="Chat-main__message-list__text">
            ${message.content}
          </p>
      </div>`
      return html;
    };
  }

  $('.Chat-main__post-form__message').on('submit', function(e){
    e.preventDefault();
    let formData = new FormData(this);
    let url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })

    .done(function(data){
      let html = buildHTML(data);
      $('.Chat-main__message-list').append(html);
      $('.Chat-main__post-form__message')[0].reset();
      $('.Chat-main__message-list').animate({ scrollTop: $('.Chat-main__message-list')[0].scrollHeight});
      $('.Form__submit').prop('disabled', false);
    })
    
    .fail(function() {
      alert("メッセージ送信に失敗しました");
    });

  });
});
