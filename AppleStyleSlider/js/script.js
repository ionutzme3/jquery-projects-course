$(document).ready(function(){
  var totalWidth = 0;
  var positions = new Array();

  $('#slides .slide').each(function(i){
    positions[i] = totalWidth;
    totalWidth += $(this).width();

    if(!$(this). width()){
      alert ('Please add a with to your image');
      return false;
    }
  });
  $('#slides').width(totalWidth);
  $('#menu ul li a').click(function(e, keepScroll){
    $('li.product').removeClass('active').addClass('inactive');
    //Add active class to parent

    $(this).parent().addClass('active');

    var pos = $(this).parent().prevAll('.product').length;
    $('#slides').stop().animate({marginLeft: -positions[pos] + 'px'} , 450);

    //prevent default
    e.preventDefault();

    if(!autoScroll) clearinterval(itvl);
  });

  //make first image active
  $('#menu ul li.product:first').addClass('active').siblings().addClass('inactive');
  //AutoScroll

  var current = 1;
  function autoScroll(){
    if(current == -1 ) return false;
    $('#menu ul li a').eq(current%$('#menu ul li a').length).trigger('click', [true]);
    current++;
  }
  //Duration for autoScroll

  var duration = 2;
  var itvl = setInterval(function(){autoScroll()}, duration*1000);
});
