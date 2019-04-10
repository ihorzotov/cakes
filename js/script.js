var APP = {};
APP.HTML = $('html');
APP.$document = $(document);
APP.$stepsLine = $('.active-line');
APP.fileClearBtn = $('.js-file-clear');
APP.inputLabel = $('.input-file__label');
APP.formSubmit = $('.js-form__submit');
APP.modalBtn = $('.js-modal-btn');
APP.modalContainer = $('.modal');
APP.modalContacts = $('.modal-contact');
APP.closeModal = $('.close-modal');
APP.zoomBtn = $('.zoom-btn');
APP.modalZoom = $('.modal-zoom');
APP.zoomIMG = $('.modal-zoom__image'),
APP.preloader = $('.preloader');
APP.hamburger = $('.hamburger');


APP.$document.ready(function(){

  window.onload = function(){
    APP.preloader.removeClass('active');
    setTimeout(function(){
      APP.HTML.removeClass('overflow');
      $('.main__frst').addClass('animate');
    },500);
  };

// modal
  APP.modalBtn.on('click', function(){
    APP.modalContacts.addClass('active');
    APP.HTML.addClass('overflow');
  });

  APP.closeModal.on('click', function(){
    APP.modalContainer.removeClass('active');
    APP.HTML.removeClass('overflow');
  });

  APP.$document.on('click','.zoom-btn', function() {
    var source = $(this).parent().attr('style').replace('background-image: ','');

    APP.zoomIMG.attr('src', source.slice(4, source.length - 2 ) );
    APP.modalZoom.addClass('active');
    APP.HTML.addClass('overflow');
  });

  APP.modalZoom.click(function(){
    $(this).removeClass('active');
    APP.HTML.removeClass('overflow');
  });
// 

// slick
  function initSlick(rootNode, options) {
    var defaults = {
        arrows:true,
        dots: true,
        prevArrow: '<button class="slick-prev slick-arrow" type="button" style=""><i class="icon-uniE938"></i></button>',
        nextArrow: '<button class="slick-next slick-arrow" type="button" style=""><i class="icon-uniE937"></i></button>',
        infinite: false,
        speed: 300,
    }

    for (var option in options) {
        defaults[option] = options[option];
    }

    $(rootNode).slick(defaults);
  };

  var slickMap = [{
      node: '.example-slider',
      options: {
        slidesPerRow: 2,
        rows: 2,
        responsive: [{
          breakpoint: 1140,
            settings: {
              slidesPerRow: 1,
            }
          },{
          breakpoint: 576,
            settings: {
              slidesPerRow: 1,
              rows: 1,
              activateRows: true,
            }
          },
        ]
      },
  },{
      node: '.product-slider',
      options: {
        slidesToShow: 2,
        slidesToScroll: 2,
        adaptiveHeight: true,
        responsive: [{
          breakpoint: 1140,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      },
  },{
      node: '.slider-reviews',
      options: {
        slidesToShow: 3,
        slidesToScroll: 2,
        adaptiveHeight: true,
        responsive: [{
          breakpoint: 1140,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 1,
            }
          },{
          breakpoint: 576,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
            }
          }
        ]
      },
  },
  ];
  slickMap.forEach(function(slick){
      initSlick(slick.node, slick.options)
  });
//

//change to wp form input
$('.input-file__el').on('change', function(event){
  var files = event.originalEvent.target.files[0].name,
      parent = $('.input-file');

  parent.find('.title').addClass('active').end().find('.js-file-name').html(files);
});

APP.inputLabel.on('click', function(){
  $('.input-file__el').click();
  //change to wp form input
});

APP.fileClearBtn.on('click', function(){
  $(this).parent('.title').removeClass('active').find('.js-file-name').text('');
  $('.input-file__el').val('');//change to wp form input
});

function stepsLinePosition(){
  var activeElPosition = $('.line-steps__circle.active').position().left + 8;

  APP.$stepsLine.css({
    'width': activeElPosition+'px',
  });
};
stepsLinePosition();

$(window).resize(function(){
  var windowWidth = $(window).width();

  if(!APP.preloader.hasClass('active')){
    if (windowWidth < 1366 ) {
      APP.preloader.hide();
    }else{
      APP.preloader.show();
    }
  }
  stepsLinePosition();
});

// form tabs change
(function(){

  var container = $('.form-content__tab'),
      tabLenght = container.length,
      button = $('.nav-btn')
      prevBtn = $('.nav-btn__prev'),
      nextBtn = $('.nav-btn__next');
  
  function buttonClassChange(){
    var activeContainer = APP.$document.find('.form-content__tab.active'),
        submitBtn = $('.form__nav .wb-pink');

    submitBtn.addClass('disabled');
    if (activeContainer.index() + 1 == 1) {
      prevBtn.addClass('disabled');
    }else if(activeContainer.index() + 1 == tabLenght){
      nextBtn.addClass('disabled');
      submitBtn.removeClass('disabled');
    }
  };
  buttonClassChange();
  
  button.on('click', function(){
    var toggle = $('.js-toggle.active');

    button.removeClass('disabled');

    if ($(this).hasClass('nav-btn__next')) {
      toggle.removeClass('active').next().addClass('active');
    }else if($(this).hasClass('nav-btn__prev')){
      toggle.removeClass('active').prev().addClass('active');
    };

    buttonClassChange();
    stepsLinePosition();
  });

}());

// form submit
APP.formSubmit.on('click', function(){
  var checkbox = $('.js-checkbox');
      checkedStatus = checkbox.prop('checked');
  
  if(checkedStatus == true){
    APP.$stepsLine.css({
      'width': '100%',
    });
    checkbox.parent('.container').removeClass('disabled');
  }else{
    checkbox.parent('.container').addClass('disabled');
  }
});

APP.hamburger.on('click', function(){
  var content = $('.header-content, .block-product');

  content.toggleClass('active');
  APP.HTML.toggleClass('overflow mobile');
});
// 

function currentSlideCount(item){
  var dotsLenght = $(item).find('.slick-dots li').length,
      activeIndex = $(item).find('.slick-dots li.slick-active').index() + 1;

  $(item).find('.slick-dots').attr('data-lenght',dotsLenght);
  $(item).find('.slick-dots').attr('data-current',activeIndex);
}

$('.slider-counter').each(function(key, item){

  currentSlideCount(item)

  $(item).on('afterChange', function(event, slick, currentSlide, nextSlide){
    currentSlideCount(item)
  });

});


})//document ready

 APP.$document.on('touchstart', '.product-slider__card', handleTouchStart ,false);
 APP.$document.on('touchmove', '.product-slider__card', handleTouchMove ,false);
  var xDown = null,
      yDown = null;

  function handleTouchStart(evt) {
      xDown = evt.touches[0].clientX;
      yDown = evt.touches[0].clientY;
  }; 

  function handleTouchMove(evt) {
      if ( ! xDown || ! yDown ) {
          return;
      }
      var xUp = evt.touches[0].clientX,
          yUp = evt.touches[0].clientY,
          xDiff = xDown - xUp,
          yDiff = yDown - yUp,
          container = $('.product-slider .slick-current .product-slider__card');

      if ( yDiff > 0 ) {
        console.log('123');
        container.addClass('active');
      } else { 
        container.removeClass('active');
      } 
      xDown = null;
      yDown = null;
  };