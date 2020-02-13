$(function(){ 

  var reloadMessages = function() {
    last_message_id = $('.main__body__message:last').data("message-id");
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages) {
      if (messages.length !== 0) {
        var insertHTML = '';
        $.each(messages, function(i, message) {
          insertHTML += buildHTML(message)
        });
        $('.main__body').append(insertHTML);
        $('.main__body').animate({ scrollTop: $('.main__body')[0].scrollHeight});
      }
    })
    .fail(function() {
      alert('error');
    });
  };

  function buildHTML(message){
   if (message.image && message.image) {
     var html =
      `<div class="main__body__message" data-message-id=${message.id}>
         <div class="main__body__message--box">
           <div class="main__body__message--box--name">
             ${message.user_name}
           </div>
           <div class="main__body__message--box--time">
             ${message.created_at}
           </div>
         </div>
         <div class="main__body__message--comment">
           <p class="main__body__message--comment--content">
             ${message.content}
           </p>
         </div>
         <img src=${message.image} >
       </div>`
       return html;
   } else if (message.content) {
     var html =
      `<div class="main__body__message" data-message-id=${message.id}>
         <div class="main__body__message--box">
           <div class="main__body__message--box--name">
             ${message.user_name}
           </div>
           <div class="main__body__message--box--time">
             ${message.created_at}
           </div>
         </div>
         <div class="main__body__message--comment">
           <p class="main__body__message--comment--content">
             ${message.content}
           </p>
         </div>
       </div>`
       return html;
   } else if (message.image) {
        var html =
         `<div class="main__body__message" data-message-id=${message.id}>
            <div class="main__body__message--box">
              <div class="main__body__message--box--name">
                ${message.user_name}
              </div>
              <div class="main__body__message--box--time">
                ${message.created_at}
              </div>
            </div>
            <img src=${message.image} >
          </div>`
     return html;
   };
 }

$('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action')
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main__body').append(html);
      $('.main__body').animate({ scrollTop: $('.main__body')[0].scrollHeight});
      $('form')[0].reset();
    })
    .fail(function() {
        alert("メッセージの送信に失敗しました")
    })
    .always(() => {
      $(".sub").removeAttr("disabled");
    });
    })
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});