// Set the date we're counting down to
var countDownDate = new Date("Dec 29, 2023 15:37:25").getTime();

var x = setInterval(function() {
var now = new Date().getTime();
var distance = countDownDate - now;

var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);


document.getElementById("countdown").innerHTML = days + "d" + "&nbsp " + hours + "h" + "&nbsp "
+ minutes + "m" + "&nbsp " + seconds + "s" + " ";

if (distance < 0) {
  clearInterval(x);
  document.getElementById("countdown").innerHTML = "0 " + "0 " + "0 " + "0 ";
  }
}, 1000);


//add event to calendar

document.getElementById('addToCalendar').addEventListener('touchstart', function() {
  var eventDate = '20231229T183000'; // Format: YYYYMMDDTHHMMSS
  var eventName = 'Δημήτρης & Κατερίνα';
  var eventDescription = 'Γάμος Δημήτρη & Κατερίνας';
  var eventLocation = '';

  var calendarEvent = 'BEGIN:VCALENDAR\n' +
                      'VERSION:2.0\n' +
                      'BEGIN:VEVENT\n' +
                      'SUMMARY:' + eventName + '\n' +
                      'DTSTART:' + eventDate + '\n' +
                      'DTEND:' + eventDate + '\n' +
                      'DESCRIPTION:' + eventDescription + '\n' +
                      'LOCATION:' + eventLocation + '\n' +
                      'STATUS:CONFIRMED\n' +
                      'SEQUENCE:0\n' +
                      'BEGIN:VALARM\n' +
                      'TRIGGER:-PT15M\n' +
                      'DESCRIPTION:Reminder\n' +
                      'ACTION:DISPLAY\n' +
                      'END:VALARM\n' +
                      'END:VEVENT\n' +
                      'END:VCALENDAR';

  var blob = new Blob([calendarEvent], { type: 'text/calendar;charset=utf-8' });
  var url = window.URL.createObjectURL(blob);
  var link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'event.ics');
  document.body.appendChild(link);
  link.click();
  
  document.body.removeChild(link);
});

addToCalendarButton.addEventListener('touchstart', function(event) {
    event.preventDefault(); 
    addToCalendarHandler(event);
});


addToCalendarButton.addEventListener('click', addToCalendarHandler);

//type effect

var i = 0;
var txt = 'Δημήτρης Παπαγεωργίου & Αικατερίνη Νάνου';
var typingSpeed = 50; // Controls the number of characters appended in each animation frame
var animationDuration = 2500; // Total duration of the animation in milliseconds
var typingElement = document.getElementById("us");
var startTime;

function typeWriter(timestamp) {
  if (!startTime) {
    startTime = timestamp;
  }
  
  var progress = timestamp - startTime;
  var totalFrames = Math.ceil(animationDuration / (1000 / 60)); // Total frames based on 60 frames per second

  var frame = Math.min(Math.floor(progress / (animationDuration / totalFrames)), totalFrames);
  var chunk = Math.min(typingSpeed, Math.floor(txt.length * (frame / totalFrames))); // Calculate how many characters to append in this frame
  typingElement.innerHTML = txt.slice(0, chunk);

  if (chunk < txt.length) {
    requestAnimationFrame(typeWriter);
  }
}

function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

function checkScroll() {
  if (isInViewport(typingElement)) {
    requestAnimationFrame(typeWriter);
  }
}

window.addEventListener("scroll", checkScroll);

