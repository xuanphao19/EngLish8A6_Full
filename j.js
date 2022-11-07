var dragging = false;
var days = document.querySelectorAll(".day");
var offset = 0;

function activateDay() {
  var activeElement = document.activeElement;
  var activeAItem = document.querySelector(".active-a");
  var activeBItem = document.querySelector(".active-b");

  if (activeAItem && activeBItem) {
    clearActiveDays();
    clearRange();
    activeElement.classList.add("active-a");
    return;
  }

  if (activeAItem) activeElement.classList.add("active-b");
  else activeElement.classList.add("active-a");
}

function clearActiveDays() {
  var activeAItem = document.querySelector(".active-a");
  var activeBItem = document.querySelector(".active-b");

  if (activeAItem) activeAItem.classList.remove("active-a");
  if (activeBItem) activeBItem.classList.remove("active-b");
}

function clearRange() {
  days.forEach((item) => {
    item.classList.remove("range");
  });
}

function calculateRange() {
  var activeAIndex, activeBIndex;

  days.forEach((item, index) => {
    if (item.classList.contains("active-a")) activeAIndex = index;
    if (item.classList.contains("active-b")) activeBIndex = index;
  });

  if (activeAIndex < activeBIndex) {
    for (var i = activeAIndex; i <= activeBIndex; i++) {
      days[i].classList.add("range");
    }
  }

  if (activeAIndex > activeBIndex) {
    for (var i = activeAIndex; i >= activeBIndex; i--) {
      days[i].classList.add("range");
    }
  }
}

function startMove(item) {
  dragging = true;

  var activeAItem = document.querySelector(".active-a");
  var activeBItem = document.querySelector(".active-b");

  if (!activeBItem && activeAItem) {
    item.classList.add("active-b");
    calculateRange();
  } else {
    clearActiveDays();
    clearRange();
    item.classList.add("active-a");
  }
}

function move(item) {
  if (dragging) {
    var activeA = document.querySelector(".active-a");
    var prevActiveB = document.querySelector(".active-b");

    clearRange();

    if (prevActiveB) prevActiveB.classList.remove("active-b");
    if (!item.classList.contains("active-a")) item.classList.add("active-b");

    var activeB = document.querySelector(".active-b");

    calculateRange();
  }
}

function endMove(item) {
  dragging = false;
}

window.addEventListener("mouseup", (e) => {
  dragging = false;
});

days.forEach((item, index) => {
  var dayNumber = item.querySelector(".day-number").innerHTML;

  if (dayNumber === "1" && !item.classList.contains("next-mon")) {
    offset = index;
  }

  item.addEventListener("mousedown", (e) => {
    startMove(item);
  });

  item.addEventListener("mousemove", (e) => {
    move(item);
  });

  item.addEventListener("mouseup", (e) => {
    endMove(item);
  });
});

window.addEventListener("keyup", (e) => {
  var key = e.keyCode;

  switch (key) {
    case 13:
      activateDay();
      calculateRange();
      break;
  }
});

document.querySelector(".reset").addEventListener("click", (e) => {
  clearActiveDays();
  clearRange();
});
