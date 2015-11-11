//Capitilize a string function - http://stackoverflow.com/questions/2332811/capitalize-words-in-string
String.prototype.capitalize = function() {
  return this.replace(/(?:^|\s)\S/g, function(a) { return a.toUpperCase(); });
};



$(document).ready(function() {

  $('h1').shadowtext();

  $("#share").jsSocials({
    showLabel: false,
    showCount: false,
    shares: ["twitter", "facebook"]
  });

  //Make sure the page is set to section 1
  window.onload = function(){
    $('html, body').animate({
      scrollTop: $("#section1").offset().top
    }, 0);
  }


  //Create options list for each profession (using car data)

  var $professionselect = $('.js-professionselect');
  $.each(window["car"], function(idx, object){
    $professionselect.append('<option value="' + object.job + '">' + object.job.capitalize() + '</option>');
  });



  //Handle form 1 submission
  function handleForm1(event) {
    console.log("handleForm1");
    event.preventDefault();

    //get the form values
    var selectedprof = $('#gender-gap-form1-profession').val();
    var selecteditem = $('#gender-gap-form1-item').val();

    if(selectedprof && selecteditem) {
      queryData(selectedprof, selecteditem);
      //Scroll to section3
      scrollToSection3();
      //Update the values in form 2
      $('#gender-gap-form2-profession').val(selectedprof);
      $('#gender-gap-form2-item').val(selecteditem);
    } else {
      //Tell the user to select 2 things
      // alert('please select a profession and an object');
      $("p").css("visibility", "visible");
    }
  }

  //Handle form 2 submission
  function handleForm2() {
    console.log("handleForm2");
    //get the form values
    var selectedprof = $('#gender-gap-form2-profession').val();
    var selecteditem = $('#gender-gap-form2-item').val();
    queryData(selectedprof, selecteditem);
  }


  //Query the data
  function queryData(profession, item) {
    console.log("queryData");
    //Grab the right data variable
    var data = window[item];
    //Loop over the data to find the right info
    $.each(data, function(index, object){
      if(object.job.toLowerCase() == profession.toLowerCase()) {

        //Update all the fields
        $("#menstime").text(secondsToString(data[index].men)).fadeIn("slow") ;
        $("#womenstime").text(secondsToString(data[index].women));
        $("#menssalary").text(salary[index].mensalary);
        $("#womenssalary").text(salary[index].womensalary);
        $("#menspercent").text(salary[index].menpercent + "%");
        $("#womenspercent").text(salary[index].womenpercent+ "%");
      }
    });
    //Finally update the image
    changeImage(item);
  };

  //Scroll to section 3
  function scrollToSection3() {
    $('html, body').animate({
      scrollTop: $("#section3").offset().top -1
    }, 500);
  }

  //Take a string and use that to update the object image
  function changeImage(chosenobject) {
    var $objectImage = $(".object-image");

    if (chosenobject == "nike") {
      $objectImage.attr('src','images/nike.png').fadeIn("slow");
    } else if (chosenobject == "house") {
      $objectImage.attr('src','images/house.png').fadeIn("slow");
    } else if (chosenobject == "car") {
      $objectImage.attr('src','images/car.png');
    }
  }


  //Output a time in seconds to human readable
  function secondsToString(seconds) {
    var numyears = Math.floor(seconds / 6440400);
    var numdays = Math.floor((seconds / 27792) - (numyears * 231.7357513));
    var numhours = Math.floor((seconds / 3600) - (numdays * 7.72) - (numyears * 231.7357513 * 7.72));
    var numminutes = Math.floor((seconds / 60) - (numhours * 60) - (numdays * 7.72 * 60) - (numyears * 231.7357513 * 7.72 * 60));
    var numseconds = Math.floor((seconds - (numminutes * 60) - (numhours * 60 * 60) - (numdays * 7.72 * 60 * 60) - (numyears * 231.7357513 * 7.72 * 60 * 60)));
    return pad(numyears) + ":" + pad(numdays) + ":" + pad(numhours) + ":" + pad(numminutes) + ":" + pad(numseconds);
  }

  //Pad number less than 10 with a zero
  function pad(n) {
    return (n < 10) ? ("0" + n) : n;
  }

  //Pad numbers less than 10 with 2 zeros


  //Event bindings
  $('#gender-gap-form1').on('submit', handleForm1);
  $('#gender-gap-form2-profession, #gender-gap-form2-item').on('change', handleForm2);
  // $('#gender-gap-form2-profession, #gender-gap-form2-item').on('change', numberAppear);
});
