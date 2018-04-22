$(document).ready(function(){
  //Set Options
  var speed = 500;
  var autoswitch = true;
  var autoswitch_speed = 4000

  //Add initial active class
  $('.slide').first().addClass('active');

  //Hide all slides
  $('.slide').hide();

  //Show all slide

  $('.slide').show();
// Next Handler
  $('#next').on('click', nextSlide);
// Prev Hanlder
  $('#prev').on('click', prevSlide);
//Auto Slider Hanlder
  if(autoswitch == true){
    setInterval(nextSlide, autoswitch_speed);
  }

// Switch to the next slide1
  function nextSlide(){
    $('.active').removeClass('active').addClass('oldActive');
    if ($('.oldActive').is(':last-child')){
      $('.slide').first().addClass('active');
    }else{
      $('.oldActive').next().addClass('active');
    }
    $('.oldActive').removeClass('oldActive');
    $('.slide').fadeOut(speed);
    $('.active').fadeIn(speed);
  }
//Switch to prev slide
function prevSlide(){
  $('.active').removeClass('active').addClass('oldActive');
  if ($('.oldActive').is(':first-child')){
    $('.slide').last().addClass('active');
  }else{
    $('.oldActive').prev().addClass('active');
  }
  $('.oldActive').removeClass('oldActive');
  $('.slide').fadeOut(speed);
  $('.active').fadeIn(speed);
}
});
