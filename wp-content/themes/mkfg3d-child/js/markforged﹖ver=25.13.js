(function ($) {
  var menuState = false;
  $(document).ready(function() {
    $('.header-menu-button').click(function(e) {
      if (menuState) {
        $('.header-dropdown-wrapper').addClass('collapsed');
      }
      else {
        $('.header-dropdown-wrapper').removeClass('collapsed');
      }
      menuState = !menuState;
    });

    var h = document.querySelector('.fancybar');
    var stuck = false;
    var stickPoint = getDistance();

    function getDistance() {
      var topDist = 100;
      return topDist;
    }

    window.onscroll = function(e) {
      var distance = getDistance() - window.pageYOffset;
      var offset = window.pageYOffset;
      if (h && (distance <= 0) && !stuck) {
        h.style.transition = 'height 100ms cubic-bezier(.25, .46, .45, .94)';
        h.style.height = '45px';
        h.style.top = '0px';
        // h.style.transform = 'scaleY(1)';
        h.style.opacity = '1';
        h.style.zIndex = '100';
        stuck = true;
        
      } else if (h && stuck && (offset <= stickPoint)){
        // h.style.transition = 'none';
        // h.style.position = 'absolute';
        // h.style.top = '55px';
        // h.style.transform = 'scaleY(0)';
        h.style.height = '0';
        h.style.zIndex = '-5000';
        stuck = false;
      }
    }
  })
})(jQuery);
