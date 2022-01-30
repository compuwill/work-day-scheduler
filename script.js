var schedule = [];


//set the current date
var now = moment();
$("#currentDay").text(now.format("dddd, MMMM Do"))

//function for creating time blocks
var createTimeBlock = function(time,text) {
  var momTime = moment(now,"L").set("hour",time).set("minute",0)

  var row = $("<div>").addClass("row timeblock mw-100")    
    var hour = $("<span>").addClass("hour col-2 col-s-1").text(momTime.format("hA"))
    var timeblock = $("<div>").addClass("").addClass("mw-100 col-8 col-s-10")
      var description = $("<p>").addClass("description").text(text)
    var save = $("<btn>").addClass("saveBtn col-2 col-s-1 d-flex align-items-center justify-content-center").html("<i class='fas fa-save'></i>")



  //check time
  if(momTime.isBefore(now))
    timeblock.addClass("past")
  if(momTime.isAfter(now))
    timeblock.addClass("future")
  if(momTime.isBefore(now) && momTime.add(1,'h').isAfter(now))
    timeblock.addClass("present")

  row.append(hour)
  row.append(timeblock)
    timeblock.append(description)
  row.append(save)
  $(".container").append(row)
}

//on load, create the time blocks





//description is clicked
$(".container").on("click", "p", function () {
  var text = $(this).text().trim();
  var textInput = $("<textarea>").val(text);
  $(this).replaceWith(textInput);
  textInput.trigger("focus");
});

//Blur is lose focus
$(".container").on("blur", "textarea", function () {
  // get the textarea's current value/text
  var text = $(this).val().trim();
  
  // get the event's position in the list of other li elements
  var index = $(this).closest(".row").index();
  console.log(index)


  // recreate p element
  var taskP = $("<p>").addClass("description").text(text);

  //if the text was changed add the unsaved class
  if(schedule[index].description != text)
    taskP.addClass("unsaved")

  schedule[index].description = text;

  // replace textarea with p element
  $(this).replaceWith(taskP);
});

//save button is clicked
$(".container").on("click", "btn", function () {

  $('p').each( function(index){ $(this).removeClass("unsaved")})

  saveSchedule();
});



//Saving
var saveSchedule = function () {
  localStorage.setItem("schedule", JSON.stringify(schedule));
};

//Loading
var loadSchedule = function () {
  schedule = JSON.parse(localStorage.getItem("schedule"));

  // if nothing in localStorage, create a new object to track all scheduled events
  if (!schedule) {
    schedule = [];
    for(var i = 8; i <= 17; i++)
    {
      var newTime = i;
      var newDescription = "";
      schedule.push({
        time: newTime,
        description: newDescription})
    }

  }

  // loop over object properties
    schedule.forEach(function (event) {
      createTimeBlock(event.time,event.description)
    });

};


// load schedule for the first time
loadSchedule();
console.log(schedule)
