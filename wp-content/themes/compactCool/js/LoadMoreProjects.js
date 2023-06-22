var nonce = ajax_posts.nonce;
var paged = 1;
var filters = {};

jQuery(document).ready(function($) {

  $('#load-more-button').click(function() {
    paged++;
    filters = {};
    $('.filter-checkbox:checked').each(function() {
      if (!filters[$(this).data('taxonomy')]) {
        filters[$(this).data('taxonomy')] = [];
      }
      filters[$(this).data('taxonomy')].push($(this).val());
    });
    $.ajax({
      url: ajax_posts.ajaxurl,
      type: 'post',
      data: {
        action: 'load_more_projects',
        page: paged,
        filters: filters,
        nonce: nonce
      },
      success: function(html) {
        if (html) {
          $('#project-container').append(html).fadeIn(500);
        } else {
          $('#load-more-button').hide();
        }
      }
    });
  });


  $('.filter-checkbox').click(function() {
    var filters = {};
    var filterText = $(this).siblings('label').text();
    var parent = $(this).closest('.filter-1, .filter-2, .filter-3');
    var defaultText = parent.find('h6').data('default-text');
    if (this.checked) {
      parent.find('h6').text(filterText);
      parent.find('h6').addClass('active');
    } else {
      parent.find('h6').text(defaultText);
      parent.find('h6').removeClass('active');
    }
    var checkboxes = parent.find('.filter-checkbox');
    for (var i = 0; i < checkboxes.length; i++) {
      if (checkboxes[i] != this && checkboxes[i].checked) {
        checkboxes[i].checked = false;
      }
    }
    $('.filter-checkbox:checked').each(function() {
      if (!filters[$(this).data('taxonomy')]) {
        filters[$(this).data('taxonomy')] = [];
      }
      filters[$(this).data('taxonomy')].push($(this).val());
    });
    paged = 1;
    $.ajax({
      url: ajax_posts.ajaxurl,
      type: 'post',
      data: {
        action: 'load_more_projects',
        page: paged,
        filters: filters,
        nonce: nonce
      },
      success: function(html) {
        if (html) {
          $('#project-container').fadeOut(500, function() {
            $(this).html(html).fadeIn(500);
            $('#load-more-button').show();
          });
        } else {
          $('#project-container').html("<div class='no-result'>No Results</div>");
          $('#load-more-button').hide();
        }
      }
    });
  });

  $('.clear-filters').click(function() {
    var $filterWrapper = $(this).closest('.filter-dropdown');
    $filterWrapper.find('.filter-checkbox:checked').prop('checked', false);
    $filterWrapper.find('h6').data('selected-value', '');
    $filterWrapper.find('h6').removeClass('active');
    $filterWrapper.find('h6').text(function() {
      return $(this).data('default-text');
    });

  filters = {};
  paged = 1;
  $.ajax({
    url: ajax_posts.ajaxurl,
    type: 'post',
    data: {
      action: 'load_more_projects',
      page: paged,
      filters: filters,
      nonce: nonce
    },
    success: function(html) {
      if (html) {
        $('#project-container').fadeOut(500, function() {
          $(this).html(html).fadeIn(500);
          $('#load-more-button').show();
        });
      } else {
        $('#project-container').html("<div class='no-result'>No Results</div>");
        $('#load-more-button').hide();
      }
    }
  });
});



});
