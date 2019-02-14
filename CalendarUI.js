var events = [
  {
    day: "2",
    month: "4",
    year: "2019",
    events: ["AAAAAA", "1", "2Hello"]
  },
  {
    day: "5",
    month: "4",
    year: "2019",
    events: ["AAAAAA", "2", "AAAAAA"]
  },
  {
    day: "2",
    month: "3",
    year: "2019",
    events: ["Hello", "Hello", "dateObj"]
  },
  {
    day: "27",
    month: "10",
    year: "1999",
    events: ["AAAAAA", "AAAAAA", "Hello"]
  },
  {
    day: "20",
    month: "2",
    year: "2019",
    events: ["Hello", "Hello", "AAdateObjAAAA"]
  },
  {
    day: "24",
    month: "2",
    year: "2019",
    events: ["AAAAAA", "dateObj", "Hello"]
  },
  {
    day: "2",
    month: "3",
    year: "2019",
    events: ["Hello", "Hello", "AAAAAA"]
  }
];

var dateObj = new Date();
var month = dateObj.getUTCMonth() + 1;
var day = dateObj.getUTCDate();
var year = dateObj.getUTCFullYear();
var dayWeekNumber = dateObj.getDay();
var daysMonth = new Date(year, month, 0).getDate();
var state = "calendar";

var listOfDays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
var dayWeek = listOfDays[6];
var view = null;

function showDatepicker() {
  clearHtml();
  generateCalendar("inputCalendar");
}

function changeView() {
  console.log("ddshdhsdh");
  if (view == "ListOfWeek") {
    generateCalendar("calendar");
  } else if (view == "Calendar") {
    generateListOfWeek();
  }
}

function findOfYear() {
  console.log(typeof year);
  year = parseInt(DOMik.getElement("#inputYear").value);
  console.log(typeof year);
  month = parseInt(DOMik.getElement("#inputMounth").value);
  clearHtml();
  generateCalendar("calendar");
}

function backMonth() {
  var dayWeekNumber = new Date(year, month, 0).getDay();
  dayWeek = listOfDays[dayWeekNumber - 1];
  month -= 1;
  if (month <= 0) {
    year -= 1;
    month = 12;
  }
  console.log(year + " " + month);

  clearHtml();
  generateCalendar("calendar");
}

function nextMonth() {
  var dayWeekNumber = new Date(year, month, 0).getDay();
  dayWeek = listOfDays[dayWeekNumber];
  month += 1;
  if (month > 12) {
    year += 1;
    month = 1;
  }
  console.log(year + " " + month);

  clearHtml();
  generateCalendar("calendar");
}

function clickOnDay(id, day) {
  if (state == "calendar") {
    var listEvent = DOMik.getElement("#listEvent");
    var fc = listEvent.firstChild;

    while (fc) {
      listEvent.removeChild(fc);
      fc = listEvent.firstChild;
    }
    var isHaveEvent = false;
    events.map(function(obj) {
      if (obj.day + obj.month + obj.year === id) {
        for (var i = 0; i < obj.events.length; i++) {
          DOMik.addElement("#listEvent", "Li", "eventLi" + i);
          DOMik.changeElementAttribute("#eventLi" + i, {
            class: "list-group-item list-group-item-primary"
          });
          DOMik.setText("#eventLi" + i, obj.events[i]);
        }
        isHaveEvent = true;
      }
    });
    if (isHaveEvent == false) {
      alert("Don't have event");
    }
  } else if (state == "inputCalendar") {
    DOMik.changeElementAttribute("#inputCl", {
      value: day + "/" + month + "/" + year
    });
  }
}

function clearHtml() {
  DOMik.removeElement("#mainTable");
  DOMik.removeElement("#back");
  DOMik.removeElement("#next");
  DOMik.removeElement("#calendarNav");
}

function generateCalendar(parent) {
  state = parent;
  view = "Calendar";
  var table = "";
  var isStart = false;
  var isHaveEvents = false;
  var id = "";
  var rows = 6;
  var cols = 6;
  var numberDay = "";
  var styleDay = "";
  events.map(function(obj) {
    if (obj.month == month && obj.year == year) {
      isHaveEvents = true;
    }
  });
  for (var r = 0; r < rows; r++) {
    table += "<tr>";
    for (var i = 0; i <= cols; i++) {
      if (listOfDays[i] === dayWeek && !isStart) {
        numberDay = 1;
        isStart = true;
      }
      if (
        month === dateObj.getMonth() + 1 &&
        year === dateObj.getUTCFullYear()
      ) {
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
          "<td><div class='col text-center'><button name='" +
          numberDay +
          "' onClick='clickOnDay(this.id ,this.name )' id='" +
          id +
          "' type='button' class='" +
          styleDay +
          "'>" +
          numberDay +
          "</button></div></td>";
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
    thForWeekDay += '<th scope="col">' + listOfDays[weekDay] + "</th>";
  }

  //A longer way to setHTMLContent()

  // DOMik.addElement("#calendar", "nav", "calendarNav");
  // DOMik.changeElementAttribute("#calendarNav", {
  //   class: "navbar navbar-dark bg-dark"
  // });

  // DOMik.addElement("#calendarNav", "a", "data");
  // DOMik.changeElementAttribute("a", {
  //   class: "navbar-brand text-primary"
  // }).setText("#data", day + "/" + month + "/" + year);

  // DOMik.addElement("#calendarNav", "form", "form");
  // DOMik.changeElementAttribute("#form", {
  //   class: "form-inline"
  // });

  DOMik.setHTMLСontent(
    "#" + parent,
    '<nav id="calendarNav" class="navbar navbar-dark bg-dark"> <a class="navbar-brand text-primary">' +
      day +
      "/" +
      month +
      "/" +
      year +
      '</a> "<form class="form-inline my-2 my-lg-0">' +
      '<input class="form-control" type="number" value="' +
      month +
      '" id="inputMounth">' +
      '<input class="form-control" type="number" value="' +
      year +
      '" id="inputYear">' +
      '<button id="find" class="btn btn-outline-success my-2 my-sm-0">Search</button> </form>" </nav>'
  );

  DOMik.setHTMLСontent(
    "#" + parent,
    '<table id="mainTable" class="table table-dark table-bordered"> <thead> <tr> ' +
      thForWeekDay +
      "</tr> </thead><tbody>" +
      table +
      "</tbody></table>",
    true
  );
  DOMik.setHTMLСontent(
    "#" + parent,
    '<button id="back" type="button" class="btn btn-primary btn-lg">< Back</button>',
    true
  );
  DOMik.setHTMLСontent(
    "#" + parent,
    '<div class="float-right"><button id="next" type="button" class="btn btn-primary btn-lg">Next ></button></div>',
    true
  );
  DOMik.addEvent("#find", "click", findOfYear);
  DOMik.addEvent("#back", "click", backMonth);
  DOMik.addEvent("#next", "click", nextMonth);
}

function generateListOfWeek() {
  view = "ListOfWeek";
  var liElements = "";
  var styleDay = "";
  var id = "";
  for (var i = 0; i < listOfDays.length; i++) {
    if (
      day + i == dateObj.getUTCDate() &&
      month == dateObj.getUTCMonth() + 1 &&
      year == dateObj.getUTCFullYear()
    ) {
      styleDay = "list-group-item-primary";
    }

    events.map(function(obj) {
      if (obj.month == month && obj.year == year && obj.day == day + i) {
        styleDay = "list-group-item-warning";
        id = obj.day + obj.month + obj.year;
      }
    });

    liElements +=
      '<div class="col text-center"><li onclick="clickOnDay(this.id)" id="' +
      id +
      '" class="list-group-item ' +
      styleDay +
      '"> ' +
      listOfDays[i] +
      " " +
      (day + i) +
      "/" +
      month +
      "/" +
      year +
      "</li></div>";

    styleDay = "";
  }

  DOMik.setHTMLСontent(
    "#calendar",
    "<button id='up' class='btn btn-primary btn-lg btn-block'> Up </button>"
  );
  DOMik.setHTMLСontent(
    "#calendar",
    '<ul class="list-group"> ' + liElements + " </ul>",
    true
  );
  DOMik.setHTMLСontent(
    "#calendar",
    "<button id='down' class='btn btn-primary btn-lg btn-block'> Down </button>",
    true
  );
  DOMik.addEvent("#down", "click", downWeek);
  DOMik.addEvent("#up", "click", upWeek);
}

function downWeek() {
  if (day === daysMonth - 6) {
    day = 1;
    month += 1;
  } else {
    day += 1;
  }
  if (day == daysMonth - 5) {
    day = 1;
    month += 1;
    daysMonth = new Date(year, month, 0).getDate();
  }
  if (month == 12) {
    month = 1;
    year += 1;
    daysMonth = new Date(year, month, 0).getDate();
  }
  generateListOfWeek();
}

function upWeek() {
  day -= 1;
  if (day < 1) {
    month -= 1;
    daysMonth = new Date(year, month, 0).getDate();
    day = daysMonth - 6;
  }
  if (month < 1) {
    daysMonth = new Date(year, month, 0).getDate();
    month = 12;
    year -= 1;
  }
  generateListOfWeek();
}
