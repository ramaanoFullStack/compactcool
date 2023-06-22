jQuery(function ($) {

  $('.compactCool-load-button').click(function () {

    var button = $(this),
      data = {
        'action': 'loadmore',
        'page': sct_loadmore_params.current_page,
        'query': sct_loadmore_params.posts

      };


    $.ajax({
      type: "POST",
      dataType: "html",
      url: sct_loadmore_params.ajaxurl,
      data: data,
      beforeSend: function (xhr) {
        button.html('<span>LOADING</span>');
      },

      success: function (data) {
        if (data) {

          button.html('<span>LOAD MORE</span>').prev().after(data);
          sct_loadmore_params.current_page++;

          if (sct_loadmore_params.current_page == sct_loadmore_params.max_page)
            button.hide();

        } else {
          button.hide();

        }
      }
    });
  });
});
