$(document).one('pageinit', function(){
  //Display runs
  showRuns();
  //Add handler
  $('#submitAdd').on('tap', addRun);

  //Edit handler
  $('#submitEdit').on('tap', editRun);

  //Delete handler
  $('#stats').on('tap', '#deleteLink' ,deleteRun);

  //Set current  handler
  $('#stats').on('tap', '#editLink', setCurrent);

  //Clear handler
  $('#clearRuns').on('tap', clearRuns);


  /*
  *Show All runs on homepage
  **/
  function showRuns(){
    //get runs object
    var runs = getRunsObjects();
    //check if empty
    if(runs != '' & runs != null){
      for (var i=0;i<runs.length; i++){
        $('#stats').append('<li class="ui-body-inherit ui-li-static"><strong>Date:</strong>'+runs[i]["date"]+
        ' <br><strong>Distance: </strong>'+runs[i]["miles"]+'m<div class="controls">' +
        '<a href="#edit" id="editLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'">Edit</a> | <a href="#" id="deleteLink" data-miles="'+runs[i]["miles"]+'" data-date="'+runs[i]["date"]+'" onclick="return confirm(\'Are You Sure? \')">Delete</a></div></li>')
      }
      $('#home').bind('pageinit', function(){
        $('#stats').listview('refresh');
      });
    }else{
      $('#stats').html('<p>You have no logged runs</p>');
    }
  }
  /*
  *Add Run
  **/
  function addRun(){
    //Get Form Values
    var miles = $('#addMiles').val();
    var date = $('#addDate').val();

    //create 'run' object
    var run = {
      date: date,
      miles: parseFloat(miles)

    };
    var runs = getRunsObjects();
    //Add run to runs array
    runs.push(run);
    alert('Run Added');
    //set stringified objectto localStorage
    localStorage.setItem('runs', JSON.stringify(runs));
    //Redirect
    window.location.href="index.html";
    return false;
  }
  /*
  *Edit Run
  **/
  function editRun(){
    //get current data
    currentMiles = localStorage.getItem('currentMiles');
    currentDate = localStorage.getItem('currentDate');

    var runs = getRunsObjects();

    // loop throug runs
    for(i=0; i<runs.length;i++){
      if(runs[i].miles == currentMiles && runs[i].date == currentDate){
        runs.splice(i, 1);
      }
      localStorage.setItem('runs', JSON.stringify(runs));
    }


    //Get Form Values
    var miles = $('#editMiles').val();
    var date = $('#editDate').val();

    //create 'run' object
    var update_run = {
      date: date,
      miles: parseFloat(miles)

    };
    //Add run to runs array
    runs.push(update_run);
    alert('Run Updated');
    //set stringified objectto localStorage
    localStorage.setItem('runs', JSON.stringify(runs));
    //Redirect
    window.location.href="index.html";
    return false;
  }

  /*
  *Delete  Run
  **/
  function deleteRun(){
    //Set ls item
    localStorage.setItem('currentMiles', $(this).data('miles'));
    localStorage.setItem('currentDate', $(this).data('date'));

    //get current data
    currentMiles = localStorage.getItem('currentMiles');
    currentDate = localStorage.getItem('currentDate');

    var runs = getRunsObjects();

    // loop throug runs
    for(i=0; i<runs.length;i++){
      if(runs[i].miles == currentMiles && runs[i].date == currentDate){
        runs.splice(i, 1);
      }
      localStorage.setItem('runs', JSON.stringify(runs));
    }

    alert('Run Deleted');
    //Redirect
    window.location.href="index.html";
    return false;
  }
  function clearRuns(){
    localStorage.removeItem('runs');
    $('#stats').html('<p>You have no logged runs!</p>');
  }
  /*
  *get the runs objects
  **/
  function getRunsObjects(){
    // set runs array
    var runs = new Array();
    //get current runs from local storage

    var currentRuns = localStorage.getItem('runs');
    //check localStorage
    if(currentRuns != null){
      // set to runs
      var runs = JSON.parse(currentRuns);
    }
    // return runs objects
    return runs.sort(function(a, b){return new Date(b.date) - new Date(a.date)});
  }
  /*
  *Set the current clicked miles and date
  **/
  function setCurrent(){
    //Set ls item
    localStorage.setItem('currentMiles', $(this).data('miles'));
    localStorage.setItem('currentDate', $(this).data('date'));

    //insert form field
    $('#editMiles').val(localStorage.getItem('currentMiles'));
    $('#editDate').val(localStorage.getItem('currentDate'))

  }
});
