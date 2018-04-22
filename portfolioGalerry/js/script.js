$(document).ready(function(){
  $('nav a').on('click', function(){
    //current class assigniment
    $('nav li.current').removeClass('current');
    $(this).parent().addClass('current');
    //set heading text
    $('h1#heading').text($(this).text());

    //get & filter link text

    var category = $(this).text().toLowerCase().replace(' ', '-');

    //remove hidden class if all projects are selected
    if(category == 'all-projects'){
      $('ul#gallery li:hidden').fadeIn('slow').removeClass('hidden');
    }else{
      $('ul#gallery li').each(function(){
        if(!$(this).hasClass(category)){
          $(this).hide().addClass('hidden');
        }else{
          $(this).fadeIn('slow').removeClass('hidden');
        }
      });
    }
    //stop link behavior
    return false
  });
  $('ul#gallery li').on('mouseenter', function(){
    //get data atribute values
    var title = $(this).children().data('title');
    var desc = $(this).children().data('desc');

    //validation
    if(desc == null){
      desc = 'Click to enlarge';
    }
    if(title == null){
      title = '';
    }
    //create overlay div
    $(this).append('<div class="overlay"></div');

    //get the overlay div

    var overlay = $(this).children('.overlay');
    //add html to overlay
    overlay.html('<h3>'+title+'</h3><p>'+desc+'</p>');

    //fade in overlay
    overlay.fadeIn(800);
  });
  //mouse leave overlay
  $('ul#gallery li').on('mouseleave', function(){
    //create overlay div
    $(this).append('<div class="overlay"></div');

    //get the overlay div

    var overlay = $(this).children('.overlay');

    //fade out overlay
    overlay.fadeOut(500);
  });
});
