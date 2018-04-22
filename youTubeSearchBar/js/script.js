//search hendler

$(function(){
  var searchField = $('#query');
  var icon = $('#search-btn');

  //focus handler

  $(searchField).on('focus', function(){
    $(this).animate({
      width: '100%'
    }, 400);
    $(icon).animate({
      right: '10px'
    }, 400);
  });
  //blur evemt handler
  $(searchField).on('blur', function(){
    if(searchField.val() === ''){
      $(searchField).animate({
        width: '45%'
      }, 400, function() {});
      $(icon).animate({
        right: '360px'
      }, 400, function() {});
    }
  });
  $('#search-form').submit(function(e){
    e.preventDefault();
  });
});

function search(){
  // clear results
  $('#resuts').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();

  //run get request on API

  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      type: 'video',
      key:  'AIzaSyCH0i8znvwIBCWC_nZgFr8rmaUOW6AH1Hs'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          //get output
          var output = getOutput(item);

          //display results
          $('#results').append(output);
        });
        var buttons = getButtons(prevPageToken, nextPageToken);

        //Dispaly buttons
        $('#buttons').append(buttons);
      }
  );

}

//next page functions

function nextPage(){
  var token = $('#next-button').data('token');
  var q = $('#next-button').data('query');
  // clear results
  $('#resuts').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();

  //run get request on API

  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key:  'AIzaSyCH0i8znvwIBCWC_nZgFr8rmaUOW6AH1Hs'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          //get output
          var output = getOutput(item);

          //display results
          $('#results').append(output);
        });
        var buttons = getButtons(prevPageToken, nextPageToken);

        //Dispaly buttons
        $('#buttons').append(buttons);
      }
  );

}

//prev page functions

function prevPage(){
  var token = $('#prev-button').data('token');
  var q = $('#prev-button').data('query');
  // clear results
  $('#resuts').html('');
  $('#buttons').html('');

  //get form input
  q = $('#query').val();

  //run get request on API

  $.get(
    "https://www.googleapis.com/youtube/v3/search",{
      part: 'snippet, id',
      q: q,
      pageToken: token,
      type: 'video',
      key:  'AIzaSyCH0i8znvwIBCWC_nZgFr8rmaUOW6AH1Hs'},
      function(data){
        var nextPageToken = data.nextPageToken;
        var prevPageToken = data.prevPageToken;

        console.log(data);

        $.each(data.items, function(i, item){
          //get output
          var output = getOutput(item);

          //display results
          $('#results').append(output);
        });
        var buttons = getButtons(prevPageToken, nextPageToken);

        //Dispaly buttons
        $('#buttons').append(buttons);
      }
  );

}
//build Output
function getOutput(item){
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumb = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var videoDate = item.snippet.publishedAt;

  //Build utput string

  var output = '<li>' +
  '<div class="list-left">' +
  '<img src="'+thumb+'">' +
  '</div>' +
  '<div class="list-right">' +
  '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
  '<small>By <span class="cTitle">'+channelTitle+'</span>on '+videoDate+'</small>' +
  '<p>'+description+'</p>' +
  '</div>' +
  '</li>' +
  '<div class="clearfix"</div>' +
  '';

  return output;
}

//Build get buttons

function getButtons(prevPageToken, nextPageToken){
  if(!prevPageToken){
    var btnoutput = '<div class="button-container">' +
    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" ' +
    'onClick="nextPage();">Next Page<button></div>';
  }else{
    var btnoutput = '<div class="button-container">' +
    '<button id="prev-button" class="paging-button" data-token="'+prevPageToken+'" data-query="'+q+'" ' +
    'onClick="prevPage();">Prev Page<button>' +

    '<button id="next-button" class="paging-button" data-token="'+nextPageToken+'" data-query="'+q+'" ' +
    'onClick="nextPage();">Next Page<button></div>';
  }
  return btnoutput;
}
