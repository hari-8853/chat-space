$(function(){
  function buildHTML(message){
    if ( message.image ) {
      let html =
        `<div class="Message-box" data-message-id=${message.id}>
          <div class="Message-info">
            <div class="Message-info__user-name">
              ${message.user_name}
            </div>
            <div class="Message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>
            <img class="Message__image" src="${message.image}">
          </div>
        </div>`
      return html;
    } else {
      let html =
        `<div class="Message-box" data-message-id=${message.id}>
          <div class="Message-info">
            <div class="Message-info__user-name">
              ${message.user_name}
            </div>
            <div class="Message-info__date">
              ${message.created_at}
            </div>
          </div>
          <div class="Message">
            <p class="Message__content">
              ${message.content}
            </p>            
          </div>
        </div>`
      return html;
    }
  }
  $(".form").on('submit', function(e){
    e.preventDefault()
    let formData = new FormData(this)
    let url = $(this).attr('action')
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
      $('.Message-list').append(html);
      $('form')[0].reset();
      
      $('.Message-list').animate({ scrollTop: $('.Message-list')[0].scrollHeight});
      $('.Submit-btn').prop("disabled", false);
    })
    .fail(function(){
      alert("メッセージの送信に失敗しました")
      $('.Submit-btn').prop("disabled", false)
    });
  });


});
