// Sets current date and time in the header
$("#current-date").text(moment().format("ll, LT"));

// For each .time-block element, set locally stored value to time block if local storage data exists before page load
function initPlanner() {
    $(".time-block").each(function () {
        var id = $(this).attr("id");
        var schedule = localStorage.getItem(id);
        if (schedule !== null) {
            $(this).children(".schedule").val(schedule);
        }
    });
};
initPlanner();

// Colors the time blocks according to if their ID's are greater or equal to current moment() hour
function colorTimeBlocks() {
    hour = moment().hours();
    $(".time-block").each(function () {
        var timeBlockHour = parseInt($(this).attr("id"));
        if (timeBlockHour > hour) {
            $(this).addClass("future")
        }
        else if (timeBlockHour === hour) {
            $(this).addClass("present");
        }
        else {
            $(this).addClass("past");
        }
    })
};
colorTimeBlocks();

// save button used in both click events 
var saveButton = $('.saveBtn');
// save text to local storage
// changes save buttons on click
saveButton.on('click', function() {
    let hour = $(this).parent().attr("id");
    var userScheduleItem = $(this).siblings('.schedule').val();
    localStorage.setItem(hour, userScheduleItem);
    $(this).text('Saved!');
    $(this).addClass('saved');
    $(this).removeClass('saveBtn');
});

// clear local storage and text content 
// reset save buttons
$('#clear').on('click', function() {
    localStorage.clear();
    $(".time-block").find("textarea").val("");
    saveButton.removeClass('saved');
    saveButton.addClass('saveBtn');
});