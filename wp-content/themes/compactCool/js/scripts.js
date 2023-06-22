(function($) {
  $(document).ready(function() {
    "use strict";


    if (location.hash) {
      setTimeout(function() {

        window.scrollTo(0, 0);
      }, 1);
    }



    // LEAFLET MAP
    var map = L.map('map', {
      zoomControl: false,
      zoom: false,
      scrollWheelZoom: false,
      attributionControl: false,
      dragging: false,
    }).setView([-33.83781025355302, 151.2093766168913], 21);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ' ',
      //detectRetina: true,
    }).addTo(map);



    var map2 = L.map('map2', {
      zoomControl: false,
      zoom: false,
      scrollWheelZoom: false,
      attributionControl: false,
      dragging: false,
    }).setView([-35.258457,149.1315648], 21);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: ' ',
      //detectRetina: true,
    }).addTo(map2);



    // FIXED NAVBAR
    $(window).on("scroll touchmove", function() {
      $('.navbar').toggleClass('fixed', $(document).scrollTop() > 1);

    });


    // STICKY FILTER
    var headerHeight = $(".projects-milestones").outerHeight();
    var navbarHeight = $(".navbar").outerHeight();
    var $nav = $(".projects-filters");

    $(window).scroll(function() {
      if ($(window).scrollTop() > headerHeight + 100) {
        $("body").addClass('sticky-projects-filters');
        $nav.addClass('nav-fixed-top');
      } else {
        $("body").removeClass('sticky-projects-filters');
        $nav.removeClass('nav-fixed-top');
      }
    });


    // HAMBURGER MENU
    $(".navbar .hamburger-menu").click(function() {
      $(this).toggleClass('active');
      $('body').toggleClass('hamburger-menu-active');

    });




    // CONTACT LITE BOX
    $(".contact-button").click(function() {
      $('body').addClass('display-contact');
    });

    $(".contact-us .contact-top .close-button").click(function() {
      $('.navbar .hamburger-menu').removeClass('hamburger-menu-active');
      $('body').removeClass('hamburger-menu-active');
      $('body').removeClass('display-contact');
    });


    $('body').keydown(function(e) {

      if (e.keyCode == 27) {
        $('.navbar .hamburger-menu').removeClass('hamburger-menu-active');
        $('body').removeClass('hamburger-menu-active');
        $('body').removeClass('display-contact');
      }
    });



    // HOME SERVICES TAB
    $( function() {
    $( "#tabz" ).tabs();
    } );




    $('#tabs li a:not(:first)').addClass('inactive');
    $('.compactCool-home-services-tab .tab-content').hide();
    $('.compactCool-home-services-tab .tab-content:first').show();


    $('#tabs li a').on("mouseover", function () {
      var t = $(this).attr('id');
      if ($(this).hasClass('inactive')) {
        $('#tabs li a').addClass('inactive');
        $(this).removeClass('inactive');
        $('.tab-content').hide();
        $('#' + t + 'C').fadeIn('slow');
        $('.service-list').removeClass('active');
        $('#' + t + 'D').addClass('active');
      }
    });


    $('ul.service-tabs li').on("mouseover", function () {
    $('ul.service-tabs li').not(this).removeClass('ui-tab ui-tabs-active ui-state-active');
    $(this).addClass('ui-tab ui-tabs-active ui-state-active');
    var relatedTabId = $(this).find("a").attr("href");
    $('.service-list').not(relatedTabId).hide();
    $(relatedTabId).show();
});






    // HOME SERVICES MOBILE ACCORDION
    var animTime = 300,
      clickPolice = false;

    $(document).on('touchstart click', '.services-title-button', function() {
      if (!clickPolice) {
        clickPolice = true;

        var currIndex = $(this).index('.services-title-button'),
          targetHeight = $('.content-box-inner').eq(currIndex).outerHeight();

        $('.content-box').removeClass('open');
        $('.services-title-button').removeClass('selected');
        $(this).addClass('selected');

        $('.content-box').stop().animate({
          height: 0
        }, animTime);
        $('.content-box').eq(currIndex).stop().animate({
          height: targetHeight
        }, animTime);

        setTimeout(function() {
          clickPolice = false;
        }, animTime);
      }

    });



  });
  // END DOCUMENT READY






  if ($(".horizontal-gallery")[0]) {
    let hor_gallery = document.querySelector(".horizontal-gallery");
    gsap.to(hor_gallery, {
      x: () => -(hor_gallery.scrollWidth - document.documentElement.clientWidth) + "px",
      ease: "none",
      scrollTrigger: {
        trigger: hor_gallery,
        invalidateOnRefresh: true,
        pin: true,
        scrub: 1,
        end: () => "+=" + hor_gallery.offsetWidth,
      },
    });
  }



  // MASONRY GALLERY
  var $masonryGallery = $('.masonry-gallery').isotope({
    itemSelector: '.gallery-image',
    percentPosition: true,

  });
  $masonryGallery.imagesLoaded().progress(function() {
    $masonryGallery.isotope('layout');
  });




  // SMART STICKY
  var didScroll;
  var lastScrollTop = 0;
  var delta = 0;
  var navbarHeight = $('.navbar').outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = true;
    }
  }, 0);

  function hasScrolled() {
    var st = $(this).scrollTop();

    if (Math.abs(lastScrollTop - st) <= delta)
      return;

    if (st > lastScrollTop && st > navbarHeight) {
      $('body').removeClass('nav-down').addClass('nav-up');
    } else {
      if (st + $(window).height() < $(document).height()) {
        $('body').removeClass('nav-up').addClass('nav-down');
      }
    }

    lastScrollTop = st;
  };




  // SLIDER
  $(".slider-progress").css("width", $('.slider-controls').css("height"));
  if ($(".main-slider")[0]) {
    var interleaveOffset = 0.5;
    var mainSlider = new Swiper('.main-slider', {
      slidesPerView: 1,
      speed: 1000,
      watchSlidesProgress: true,
      pagination: {
        el: ".slider-progress",
        type: "progressbar",
      },
      breakpoints: {
        1023: {
          parallax: false,
        }
      }
    });


    // DESC SLIDER
    var sliderFraction = new Swiper('.desc-slider', {
      slidesPerView: 1,

      speed: 1000,
      touchRatio: 0,
      navigation: {
        nextEl: ".slider-controls .next",
        prevEl: ".slider-controls .prev"
      },
      pagination: {
        el: '.slider-controls .fraction',
        type: 'fraction',
      },
      thumbs: {
        swiper: sliderFraction
      }

    });

    mainSlider.on("slideChangeTransitionStart", function() {
      sliderFraction.slideTo(mainSlider.activeIndex);
    });
    sliderFraction.on("transitionStart", function() {
      mainSlider.slideTo(sliderFraction.activeIndex);
    });
  }



  // RELATED PROJECTS CAROUSEL
  var swiper = new Swiper('.related-projects-carousel', {

    spaceBetween: 0,
    loop: false,
    breakpoints: {

      1024: {
        slidesPerView: 3,
        spaceBetween: 0,
      },
      820: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      768: {
        slidesPerView: 2,
        spaceBetween: 25,
      },
      640: {
        slidesPerView: 1,
        spaceBetween: 25,
      },
    }
  });




  // RECENT NEWS
  if ($(".compactCool-recent-news")[0]) {
    var swiper = new Swiper('.compactCool-recent-news', {
      spaceBetween: 0,
      navigation: {
        nextEl: '.compactCool-recent-news-controls .next',
        prevEl: '.compactCool-recent-news-controls .prev'
      },
      breakpoints: {
        1180: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
        1024: {
          slidesPerView: 3,
          spaceBetween: 0,
        },
        764: {
          slidesPerView: 2,
          spaceBetween: 0,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      }
    });
  }


  // INITIATIVE CAROUSEL
  if ($(".initiative-carousel")[0]) {
    var swiper = new Swiper('.initiative-carousel', {
      spaceBetween: 0,
      loop:true,
      navigation: {
        nextEl: '.initiative-carousel .next',
        prevEl: '.initiative-carousel .prev'
      },
      breakpoints: {
        1180: {
          slidesPerView: "auto",
          spaceBetween: 50,
        },
        1024: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },
        764: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      }
    });
  }


  // INITIATIVE CAROUSEL
  if ($(".initiative-quote-carousel")[0]) {
    var swiper = new Swiper('.initiative-quote-carousel', {
      slidesPerView: 1,
      spaceBetween: 0,
      navigation: {
        nextEl: '.initiative-quote-carousel .next',
        prevEl: '.initiative-quote-carousel .prev'
      }
    });
  }



  // INITIATIVE CAROUSEL
  if ($(".compactCool-career-carousel")[0]) {
    var swiper = new Swiper('.compactCool-career-carousel', {
      spaceBetween: 0,
      loop:true,
      navigation: {
        nextEl: '.compactCool-career-carousel .next',
        prevEl: '.compactCool-career-carousel .prev'
      },
      breakpoints: {
        1180: {
          slidesPerView: "auto",
          spaceBetween: 50,
        },
        1024: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },
        764: {
          slidesPerView: 2,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 0,
        },
      }
    });
  }






  // MARQUEE
  if ($(".compactCool-section-title h2 span")[0]) {
    let currentScroll = 0;
    let isScrollingDown = true;
    let tween = gsap.to(".compactCool-section-title h2 span", {
      xPercent: -100,
      repeat: -1,
      duration: 10,
      ease: "linear"
    }).totalProgress(0.3);

    window.addEventListener("scroll", function() {
      if (window.pageYOffset > currentScroll) {
        isScrollingDown = true;
      } else {
        isScrollingDown = false;
      }

      gsap.to(tween, {
        timeScale: isScrollingDown ? 1 : -1
      });

      currentScroll = window.pageYOffset
    });
  }



  // ODOMETER
  $(window).load(function() {
    $('.compactCool-milestones .odometer').each(function() {
      $(this).html($(this).data('count'));
    });

  if ($(".odometer")[0]) {
    $(document).scroll(function () {
      $('.odometer').each(function () {
        var parent_section_postion = $(this).closest('.elementor-element-966743f, .elementor-element-9544fb5').position();
        var parent_section_top = parent_section_postion.top;
        if ($(document).scrollTop() > parent_section_top - 500) {
          if ($(this).data('status') == 'yes') {
            $(this).html($(this).data('count'));
            $(this).data('status', 'no');
          }
        }
      });
    });
  }


    gsap.registerPlugin(ScrollTrigger);

    if ($(".project-single-header .header-image")[0]) {
      gsap.to('.project-single-header .header-image', {
        duration: 1,
        opacity: 1,
        scale: 1
      });
    }

    //  NEW PARALLAX
    gsap.utils.toArray("[data-module-parallax]").forEach((section) => {
      gsap.utils.toArray(section.querySelectorAll("[data-parallax]")).forEach((parallax) => {
        const depth = parallax.dataset.speed;
        const movement = -(parallax.offsetHeight * depth);

        gsap.fromTo(
          parallax, {
            y: -movement
          }, {
            y: movement,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              scrub: true,
            }
          }
        );
      });
    });




  });








})(jQuery);