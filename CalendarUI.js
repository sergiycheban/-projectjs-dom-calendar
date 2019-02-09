var events = [
  {
    day: "2",
    month: "4",
    year: "2019",
    title: "Hello"
  },
  {
    day: "5",
    month: "4",
    year: "2019",
    title: "Hello"
  },
  {
    day: "2",
    month: "3",
    year: "2019",
    title: "Hello"
  },
  {
    day: "27",
    month: "10",
    year: "1999",
    title: "My Birthday"
  }
];

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var dayWeekNumber = dateObj.getDay();
var days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var dayWeek = days[6];

function generateCalendar() {
  var table = "";
  var isStart = false;
  var isHaveEvents = false;
  var id = "";
  var rows = 6;
  var cols = 6;
  var numberDay = "";
  var daysMonth = new Date(year, month, 0).getDate();
  events.map(function(obj) {
    if (obj.month == month && obj.year == year) {
      isHaveEvents = true;
    }
  });
  for (var r = 0; r < rows; r++) {
    table += "<tr>";
    for (var i = 0; i <= cols; i++) {
      if (days[i] === dayWeek && !isStart) {
        numberDay = 1;
        isStart = true;
      }
      if (month === dateObj.getMonth() + 1) {
        styleDay =
          numberDay == day ? "btn btn-primary" : "btn btn-outline-info";
      } else {
        styleDay = "btn btn-outline-info";
      }
      if (isHaveEvents === true) {
        events.map(function(obj) {
          if (obj.month == month && obj.year == year && obj.day == numberDay) {
            id = obj.day + obj.month + obj.year;
            styleDay = "btn btn-outline-warning";
          }
        });
      }
      if (numberDay <= daysMonth) {
        table +=
          "<td><button onClick='showEvent(this.id)' id='" +
          id +
          "' type='button' class='" +
          styleDay +
          "'>" +
          numberDay +
          "</button></td>";
      } else {
        break;
      }
      if (numberDay !== "") {
        numberDay++;
      }
      id = "";
    }
    table += "</tr>";
  }

  var thForWeekDay = "";
  for (var weekDay = 0; weekDay < 7; weekDay++) {
    thForWeekDay += '<th scope="col">' + days[weekDay] + "</th>";
  }
  DOMik.setHTMLСontent(
    "#calendar",
    '<nav id="calendarNav" class="navbar navbar-dark bg-dark"> <a class="navbar-brand text-primary">' +
      day +
      "/" +
      month +
      "/" +
      year +
      '</a> <form class="form-inline">' +
      '<input id="inputYear" class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search">' +
      ' <button id="find" class="btn btn-outline-success my-2 my-sm-0">Search</button> </form> </nav>',
    true
  );

  DOMik.setHTMLСontent(
    "#calendar",
    '<table id="mainTable" class="table table-dark"> <thead> <tr> ' +
      thForWeekDay +
      "</tr> </thead><tbody>" +
      table +
      "</tbody></table>",
    true
  );
  DOMik.setHTMLСontent(
    "#calendar",
    '<button id="back" type="button" class="btn btn-primary btn-lg">< Back</button>',
    true
  );
  DOMik.setHTMLСontent(
    "#calendar",
    '<div class="float-right"><button id="next" type="button" class="btn btn-primary btn-lg">Next ></button></div>',
    true
  );
  DOMik.addEvent("#find", "click", findOfYear);
  DOMik.addEvent("#back", "click", backMonth);
  DOMik.addEvent("#next", "click", nextMonth);
}

function findOfYear() {
  year = DOMik.getElement("#inputYear").value;
  console.log(year);
  clearHtml();
  generateCalendar();
}

function backMonth() {
  var dayWeekNumber = new Date(year, month, 0).getDay();
  dayWeek = days[dayWeekNumber - 1];
  month -= 1;
  if (month <= 0) {
    year -= 1;
    month = 12;
  }
  console.log(year + " " + month);

  clearHtml();
  generateCalendar();
}

function nextMonth() {
  var dayWeekNumber = new Date(year, month, 0).getDay();
  dayWeek = days[dayWeekNumber];
  month += 1;
  if (month > 12) {
    year += 1;
    month = 1;
  }
  console.log(year + " " + month);

  clearHtml();
  generateCalendar();
}

function showEvent(id) {
  events.map(function(obj) {
    if (obj.day + obj.month + obj.year === id) {
      alert(obj.title);
    }
  });
}

function clearHtml() {
  DOMik.removeElement("#mainTable");
  DOMik.removeElement("#back");
  DOMik.removeElement("#next");
  DOMik.removeElement("#calendarNav");
}
