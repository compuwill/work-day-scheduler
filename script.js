//set the current date
var now = moment();
$("#currentDay").text(now.format("dddd, MMMM Do"))

//function for creating time blocks
var createTimeBlock = function(time) {
  
  var row = $("<div>").addClass("row timeblock mw-100")    
    var hour = $("<span>").addClass("hour col-2 col-s-1").text(time.format("hA"))
    var timeblock = $("<div>").addClass("").addClass("mw-100 col-8 col-s-10")
      var description = $("<p>").addClass("description").text('test')
    var save = $("<btn>").addClass("saveBtn col-2 col-s-1 d-flex align-items-center justify-content-center").html("<i class='fas fa-save'></i>")



  //check time
  if(time.isBefore(now))
    timeblock.addClass("past")
  if(time.isAfter(now))
    timeblock.addClass("future")
  if(time.isBefore(now) && time.add(1,'h').isAfter(now))
    timeblock.addClass("present")

  row.append(hour)
  row.append(timeblock)
    timeblock.append(description)
  row.append(save)
  $(".container").append(row)
}

//on load, create the time blocks
for(var i = 8; i <= 17; i++)
{
  var time = moment(now,"L").set("hour",i).set("minute",0)
  createTimeBlock(time)

}




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

  // recreate p element
  var taskP = $("<p>").text(text);

  // replace textarea with p element
  $(this).replaceWith(taskP);
});