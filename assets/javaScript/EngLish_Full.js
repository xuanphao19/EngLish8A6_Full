// Vẽ Canvas:
{
  var canvas = document.getElementById("canvas");
  var ctx = canvas.getContext("2d");
  var radius = canvas.height / 2;
  ctx.translate(radius, radius);
  radius = radius * 0.95;
  setInterval(drawClock, 1000);

  function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawTime(ctx, radius);
  }

  function drawFace(ctx, radius) {
    var grad;
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    // ctx.fillStyle = "violet";
    ctx.fill();
    var img = document.getElementById("scream");
    ctx.drawImage(img, -132, -132, 265, 285);
    grad = ctx.createRadialGradient(0, 0, radius * 0.85, 0, 0, radius * 1.18);
    grad.addColorStop(0, "#88cd88");
    grad.addColorStop(0.4, "#fff");
    grad.addColorStop(1, "#eb94dd");
    // grad.addColorStop(0, "#333");
    // grad.addColorStop(0.4, "white");
    // grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.14;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.075, 0, 2 * Math.PI);
    ctx.fillStyle = "blue";
    ctx.strokeStyle = "#0000ffb3";
    ctx.fill();
  }

  function drawNumbers(ctx, radius) {
    var ang;
    var num;
    var gradient;
    ctx.font = radius * 0.16 + "px Verdana";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillStyle = "rgb(239 0 255)";
    for (num = 1; num < 13; num++) {
      ang = (num * Math.PI) / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.8);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.8);
      ctx.rotate(-ang);
    }
  }

  function drawTime(ctx, radius) {
    var now = new Date();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var second = now.getSeconds();
    //hour
    hour = hour % 12;
    hour =
      (hour * Math.PI) / 6 +
      (minute * Math.PI) / (6 * 60) +
      (second * Math.PI) / (360 * 60);
    drawHand(ctx, hour, radius * 0.46, radius * 0.08);
    //minute
    minute = (minute * Math.PI) / 30 + (second * Math.PI) / (30 * 60);
    drawHand(ctx, minute, radius * 0.7, radius * 0.065);
    // second
    second = (second * Math.PI) / 30;
    drawHand(ctx, second, radius * 0.82, radius * 0.02);
  }

  function drawHand(ctx, pos, length, width) {
    ctx.beginPath();
    ctx.lineWidth = width;
    ctx.lineCap = "round";
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}

// ***************************************** Create App *********************************************
var AppElement = document.querySelector("#App");
var $ = AppElement.querySelector(".App_content");
var CoursesMenu = AppElement.querySelector(".openMenu");
var moduleElement = AppElement.querySelector(".AppModule");
var answerElement = $.querySelector("#answer_content");

// ******* on page load *********
function App() {
  followCourses.Start();
  showAppModule();
  coursesItem();
  getRandomQuesId();
  handleUI();
}

function handleUI() {
  handleUI_Start();
  getRandomQuestion();
  questPictures();
  speakerWaves();
  showSuggestions();
  console.log(`Gợi ý dành cho bạn: `, correctAnswer);
}

var showAppModule = function () {
  CoursesMenu.addEventListener("click", () => {
    moduleElement.removeEventListener("animationend", listenerClose);
    if (moduleElement) {
      moduleElement.style.display = "block";
    }
  });
};
function listenerClose() {
  moduleElement.style.animation = "";
  moduleElement.style.display = "none";
}
var CoursesClose = moduleElement.querySelector(".Courses_close");
CoursesClose.addEventListener("click", (e) => {
  closeModule(e);
});
function closeModule(_e) {
  moduleElement.style.animation = "fadeOut 0.5s";
  moduleElement.addEventListener("animationend", listenerClose);
}

// Tìm số (n) ngẫu nhiên theo index trong phạm vi max được truyền vào
var randomNumbers = [];
var n = 0;
var j = 0;
var minRequirements = followCourses.unitCourses[0].minReq;
var i = 0;

function randomNumber(max) {
  j++;
  n = Math.floor(Math.random() * max);
  var check = randomNumbers.includes(n);
  if (!check) {
    randomNumbers.push(n);
  } else {
    while (check) {
      n = Math.floor(Math.random() * max);
      check = randomNumbers.includes(n);
      if (!check) {
        randomNumbers.push(n);
      }
    }
  }
  if (randomNumbers.length === max) {
    randomNumbers = [];
  }
}

// Lấy ID khi click Hạng mục khóa học:
var unitList = moduleElement.querySelector(".Courses_list");
var unitElement = unitList.querySelectorAll(".Courses_item");
function coursesItem() {
  unitList.addEventListener("click", function (e) {
    i = 0;
    j = 0;
    randomNumbers = [];
    const tgt = e.target;
    if (tgt.closest(".Courses_item")) {
      questionId = tgt.closest(".Courses_item").id;
    }
    closeModule();
    clearErrorMsg();
    getRandomQuesId(questionId);
    handleUI();
  });
}
// Chuyển ID hạng mục khóa học thành tên Obj fake fetch() API
// var Units;
var Units;
var lengths;
var questionId = followCourses.unitCourses[0].id;
function getRandomQuesId(questionId) {
  followCourses.unitCoursesArr(questionId);
  if (Units) {
    Units = Units;
    lengths = Units.length;
  } else {
    lengths = 0;
    questionId = followCourses.unitCourses[0].id;
    Units = followCourses.unitCourses[0].info;
    lengths = Units.length;
    minRequirements = followCourses.unitCourses[0].minReq;
  }
}

var categoriesEle = $.querySelector(".categories");
progression = $.querySelector(".progression");
total = $.querySelector(".total");
function handleUI_Start() {
  categoriesEle.innerHTML = `Luyện tập ${questionId}`;
  if (i < 10) {
    progression.innerHTML = `0${i} / `;
  } else {
    progression.innerHTML = `${i} / `;
  }
  total.innerHTML = `<pre> ${lengths}</pre>`;
}

// Tạo câu hỏi ngẫu nhiên và hiển thị ra giao diện
var questionStaging = $.querySelector(".question_staging");
var randomQuestion;
var correctAnswer = "";
function getRandomQuestion() {
  lengths = Units.length;
  randomNumber(lengths);
  randomQuestion = Units[n];
  questionStaging.innerHTML = randomQuestion[1];
  correctAnswer = randomQuestion[0];
}

// Xử lý nếu có ảnh thì hiển thị ra giao diện khi hàm được gọi.
var scream = AppElement.querySelector("#scream");
function questPictures() {
  for (var items of randomQuestion) {
    var itemImg;
    if (items.includes("png") || items.includes("jpg")) {
      itemImg = items;
      scream.src = `./assets/img/${itemImg}`;
    }
  }
}

//  Các hàm xử lý Audio:
var audioLists = [
  /* 0 */ "Am_Ohno",
  /* 1 */ "Uoc_mo_cua_Me",
  /* 2 */ "yeah",
  /* 3 */ "Tambiet",
  /* 4 */ "Nhac_nen_hay",
  /* 5 */ "Tieng_bom",
  /* 6 */ "Tiengkimgiaydonghokeu",
  /* 7 */ "Xin_chao",
  /* 8 */ "WelcomeToWonderland",
  /* 9 */ "Tieng_voTay0133",
];
// Xử lý Audio khi có audio question music: audioItem audioQuestions
var audioQuestions = AppElement.querySelector("#audioQuestions");
var audioItem = AppElement.querySelector(".audioItem");
function speakerWaves() {
  for (var items of randomQuestion) {
    var itemMp3;
    if (
      items.includes("audio") ||
      items.includes("mp3") ||
      items.includes("sound")
    ) {
      itemMp3 = items;
      // questionStaging.innerHTML = `Listen, rewrite what you hear:`;
      audioQuestions.style.display = "block";
      audioItem.src = `${itemMp3}`;
    }
    if (itemMp3 === undefined) {
      audioQuestions.style.display = "none";
      var noAudioItem = audioLists[6];
      itemMp3 = `./assets/audio/${noAudioItem}.mp3`;
      audioItem.src = `${itemMp3}`;
    }
  }
}
audioQuestions.addEventListener("click", () => {
  audioItem.style.transform = "scale(0.3)";
  audioItem.play();
  if (isPlayIng) {
    pauseBackgroundMusic();
  }
});

// Xử lý hiển thị gợi ý:
var suggestionsElement = $.querySelector(".suggestionsBack");
function showSuggestions() {
  for (var items of randomQuestion) {
    var itemSuggestions = items.endsWith("Gợi ý:", 6);
    var suggestionsValue;
    if (itemSuggestions) {
      suggestionsValue = items;
      suggestionsElement.innerHTML = `${suggestionsValue}`;
    }
    if (suggestionsValue === undefined) {
      suggestionsElement.innerHTML = `Câu này dễ mà con <br> Cố gắng suy nghĩ xem nào!`;
    }
  }
}

// Handle Show date time:
var dates = new Date();
var date = dates.getDate();
var current_date;
if (date < 10) {
  current_date = `Ngày 0${dates.getDate()} / ${
    dates.getMonth() + 1
  } / ${dates.getFullYear()}`;
} else {
  current_date = `Ngày: ${dates.getDate()} Tháng: ${
    dates.getMonth() + 1
  } Năm: ${dates.getFullYear()}`;
}
$.querySelector(".shows_date").innerHTML = current_date;
$.querySelector(".shows_dates").innerHTML = current_date;

var current_day = dates.getDay();
var day_name = "";
switch (current_day) {
  case 0:
    day_name = "Chủ nhật";
    break;
  case 1:
    day_name = "Thứ hai";
    break;
  case 2:
    day_name = "Thứ ba";
    break;
  case 3:
    day_name = "Thứ tư";
    break;
  case 4:
    day_name = "Thứ năm";
    break;
  case 5:
    day_name = "Thứ sau";
    break;
  case 6:
    day_name = "Thứ bảy";
}
$.querySelector(".shows_time").innerHTML = day_name;
$.querySelector(".shows_times").innerHTML = day_name;

// Handle countTime:
var timeSum = AppElement.querySelector(".timeSum");
class Stopwatch {
  constructor(elem) {
    var time = 0;
    var offset;
    var interval;
    function update() {
      if (this.isOn) {
        time += delta();
      }
      elem.textContent = timeFormatter(time);
    }
    function delta() {
      var now = Date.now();
      var timePassed = now - offset;
      offset = now;
      return timePassed;
    }
    function timeFormatter(time) {
      time = new Date(time);
      var minutes = time.getMinutes().toString();
      var seconds = time.getSeconds().toString();
      var milliseconds = time.getMilliseconds().toString();
      var millisecond = Math.floor(milliseconds / 10);
      if (minutes.length < 2) {
        minutes = "0" + minutes;
      }
      if (seconds.length < 2) {
        seconds = "0" + seconds;
      }
      if (millisecond < 10) {
        millisecond = `0${millisecond}`;
      }
      if (seconds == 10) {
        btnSubmits.textContent = "Stop";
      }
      var result = `${minutes}: ${seconds}: ${millisecond}`;
      return result;
    }

    this.start = function () {
      interval = setInterval(update.bind(this), 1);
      offset = Date.now();
      this.isOn = true;
      this.isOnStartAudio = true;
    };

    this.stop = function () {
      clearInterval(interval);
      interval = null;
      this.isOn = false;
      this.isOnStartAudio = true;
    };

    this.reset = function () {
      time = 0;
      interval = null;
      this.isOn = false;
      this.isOnStartAudio = false;
      update();
    };
    this.isOn = false;
    this.isOnStartAudio = false;
  }
}

function start() {
  watch.start();
}

function stop() {
  btnStart.textContent = "Start";
  watch.stop();
}

function stopWhenOn() {
  btnStart.textContent = "Start";
  watch.stop();
  watch.reset();
}

btnStart.addEventListener("click", function () {
  var audioHelloList = audioLists[7];
  if (!watch.isOnStartAudio) {
    audioPlay(audioHelloList);
  }
  if (btnSubmits.textContent === "Nộp bài") {
    clearErrorMsg();
  }
  answerElement.focus();
  coatingEnd();
  start();
});

btnPause.addEventListener("click", function () {
  if (watch.isOn) {
    backgroundMusic.pause();
    stop();
  }
});

// Tạo lớp phủ Input:
var coating = $.querySelector(".coating");
coating.addEventListener("click", function () {
  coatingStart();
});
function coatingStart() {
  coating.style.opacity = 1;
  coating.innerHTML = "Vui lòng Click Start để bắt đầu!";
}
function coatingEnd() {
  coating.style.opacity = 0;
  coating.style.display = "none";
}

// Handle Error App:
var suggestionsMsg = $.querySelector(".suggestions");
var errorMessage = $.querySelector(".errorMessage");
var warningMsgs;
var answerValue;
function testValue(answerElement) {
  answerValue = answerElement.value;
  var regex = /^\S.*(?!.*[^\S])(?=.*[a-zA-Z]).*$/;
  var testPun = /[!:;"()',.?-]/;
  if (errorMessage) {
    if (correctAnswer !== answerValue) {
      suggestionsMsg.textContent = "";
      if (!answerValue) {
        return (warningMsgs = `"Nhân bất học bất tri lý. <br> Ngọc bất trác, bất thành khí!" <br>*  *  *<br> "Không có Tri thức<br> là TỰ làm nhục CHÍNH MÌNH!" `);
      } else if (!regex.test(answerValue)) {
        return `Không sử dụng khoảng trắng <br> để bắt đầu hoặc kết thúc`;
      } else if (!/[A-Z]/.test(answerValue)) {
        return (warningMsgs = `Chú ý: Cần viết "HOA" cho chính xác`);
      } else if (testPun.test(correctAnswer) && !testPun.test(answerValue)) {
        return (warningMsgs = `Chú ý: Sử dụng dấu câu cho chính xác`);
      }
      warningMsgs = `Sai bét tè lè nhẹt rồi bạn ơi!<br>Sai bét tè lè nhẹt rồi bạn ơi!<br>Sai bét tè lè nhẹt rồi bạn ơi!<br>Sai bét tè lè nhẹt rồi bạn ơi!<br>`;
      suggestionsMsg.textContent = `Học lại đi em ơi!`;
    } else {
      return undefined;
    }
  }
  return warningMsgs;
}
var testResult;
handleTest = () => {
  var warningMsg = testValue(answerElement);
  if (warningMsg) {
    errorMessage.innerHTML = warningMsg;
    errorMessage.style.padding = "8px";
    suggestionsMsg.style.padding = "10px 8px 0";
    suggestionsMsg.style.marginTop = "10px";
    answerElement.style.backgroundColor = " #fad5d58c";
    answerElement.classList.add("addInvalid");
    testResult = false;
  } else {
    clearErrorMsg();
    testResult = true;
  }
};

clearErrorMsg = () => {
  errorMessage.innerHTML = "";
  suggestionsMsg.innerHTML = "";
  errorMessage.style.padding = "0";
  answerElement.style = "";
  suggestionsMsg.style = "";
  answerElement.classList = "";
  submitResult.classList = "";
  submitResult.innerHTML = "";
};
//Handle Click Next btn:
var cardNext = $.querySelector("#next");
var congratulationMusic = audioLists[9];
var medals = "";
cardNext.addEventListener("click", () => {
  i = i;
  console.log(`111111111111111`, i, `i + 1 =`, i + 1, questionId);
  var audioErrorList = audioLists[0];
  var audioYeahList = audioLists[2];
  answerValue = answerElement.value;
  submitResult.innerHTML = "";

  if (i >= 1 && i < minRequirements) {
    btnSubmits.textContent = "Stop";
  }
  if (i + 1 === minRequirements) {
    btnSubmits.textContent = "Nộp bài!";
  }
  if (
    submitResult.matches(".correctResults") &&
    coating.style.display === "block"
  ) {
    clearErrorMsg();
    return;
  }
  if (!watch.isOn) {
    coatingStart();
  } else if (
    watch.isOn &&
    submitResult.matches(".correctResult") &&
    !answerValue
  ) {
    answerElement.focus();
    submitResult.classList = "";
    submitResult.innerHTML = "";
    return;
  } else if (
    watch.isOn &&
    flipCardInner.matches(".is-flipped") &&
    !answerValue
  ) {
    flipCardInner.classList.remove("is-flipped");
    suggestions.textContent = "Xem gợi ý";
    answerElement.focus();
    return;
  } else {
    if (submitResult.matches(".correctResults")) {
      submitResult.innerHTML = "";
      submitResult.classList.remove(".correctResults");
      btnSubmits.textContent = "Stop!";
      answerElement.focus();
      return;
    }
    handleTest();
    if (testResult === true) {
      answerElement.focus();
      medals += "⭐";
      submitResult.classList.add("correctResult");
      submitResult.innerHTML = `<div id='sum10'>Bạn đã nhân được: ${medals} <br> Mỗi ⭐ = 1k Cố săn thật nhiều ⭐ nha! </div>`;
      if (btnSubmits.textContent === "Nộp bài!" && i + 1 === minRequirements) {
        submitResult.innerHTML = `Chúc mừng bạn!<br> Bạn đã vượt qua thử thách. <br> Bạn vẫn có thể tiếp tục luyện tập <br> Nếu bạn muốn nâng cao Trình độ!`;
        backgroundMusic.pause();
        submitResult.classList.add("correctResults");
        audioPlay(congratulationMusic);
      } else {
        audioPlay(audioYeahList);
      }
      i++;
      handleUI();
      answerElement.value = "";
    } else {
      medals = medals.slice(1);
      submitResult.classList.add("correctResult");
      submitResult.innerHTML = `<div id='sum10'>Chúc mừng bạn Quay vào Ô: Trừ 1 ⭐ </div>`;
      answerElement.placeholder = "💥💥💥💥💥💥💥💥💥💥💥💥💥";
      audioPlay(audioErrorList);
      createRandomSong(songs);
    }
  }
  console.log(medals);
});

// Xóa massage lỗi và input value khi focus input:
var flipCardInner = $.querySelector(".flip-card-inner");
answerElement.addEventListener("focus", function handleClearError(e) {
  playBackgroundMusic();
  clearErrorMsg();
  if (flipCardInner.matches(".is-flipped")) {
    flipCardInner.classList.remove("is-flipped");
    suggestions.textContent = "Xem gợi ý";
  }
  audioItem.pause();
  answerElement.placeholder = "Enter your answer! 🌻 🌻 🌻";
  e.target.value = "";
});

// Xử lý so sánh (Tham chiếu) input value với chỗi gốc:
answerElement.oninput = function () {
  answerValue = answerElement.value;
  clearErrorMsg();
  autoGrow();
  // Xử lý báo lỗi khi nhập trường đầu vào bị sai:
  let resultValue = correctAnswer;
  let result = resultValue.includes(answerValue);
  if (result) {
    answerElement.classList.remove("addInvalid");
    answerElement.classList.add("unInvalid");
  } else {
    answerElement.classList.remove("unInvalid");
    answerElement.classList.add("addInvalid");
  }
};

// Mở rộng hộp nhập dữ liệu đầu vào answer:
function autoGrow() {
  answerElement.style.height = answerElement.scrollHeight + "px";
}

var suggestions = $.querySelector("#suggestions-btn");
suggestions.addEventListener("click", () => {
  clearErrorMsg();
  if (!watch.isOn) {
    coatingStart();
  } else if (answerElement.value === "") {
    flipCardInner.classList.toggle("is-flipped");
    if (flipCardInner.matches(".is-flipped")) {
      suggestions.textContent = "Đóng gợi ý";
      if (isPlayIng) {
        pauseBackgroundMusic();
      }
      audioItem.play();
    } else {
      answerElement.focus();
      suggestions.textContent = "Xem gợi ý";
    }
    return;
  } else if (answerElement.value === correctAnswer) {
    if (!flipCardInner.matches(".is-flipped")) {
      congratulationMusic = audioLists[9];
      audioPlay(congratulationMusic);
      suggestions.textContent = "Đóng gợi ý";
      flipCardInner.classList.toggle("is-flipped");
      suggestionsElement.innerHTML = `Xin chúc mừng bạn đã đưa ra đáp án hoàn toàn chính xác!`;
    } else {
      answerElement.focus();
      suggestions.textContent = "Xem gợi ý";
    }
  } else {
    if (!flipCardInner.matches(".is-flipped")) {
      flipCardInner.classList.toggle("is-flipped");
      suggestions.textContent = "Đóng gợi ý";
      suggestionsMsg.innerHTML = `<div id='sum10'>Click Next để kiểm tra kết quả của bạn!</div>`;
      if (isPlayIng) {
        pauseBackgroundMusic();
      }
      audioItem.play();
    } else {
      answerElement.focus();
      suggestions.textContent = "Xem gợi ý";
    }
  }
});

// Hướng dẫn nộp bài
var btnSubmits = $.querySelector("#btnSubmits");
var submitResult = $.querySelector("#submitResult");
btnSubmits.addEventListener("click", function () {
  if (btnSubmits.textContent === "Hướng dẫn") {
    submitResult.classList.add("correctResult");
    submitResult.innerHTML = `<div id='sum10'>Bạn bấm Start để bắt đâu trả lời câu hỏi<br> Nhập xong đáp án bấm tiếp tục để đi tiếp <br>Không nghĩ được đáp án bấm "Xem gợi ý" để nhận trợ giúp (Chỉ những câu khó) <br> Khi click Start sẽ bắt đầu tính thời gian<br>Cảm ơn bạn đã ủng hộ chúng tôi! <br> Vui lòng không tự động sao chép, chia sẻ dưới mọi hình thức.🥇🥇🥇</div>`;
    return;
  }

  if (btnSubmits.textContent === "Stop" || (1 <= i && i < minRequirements)) {
    submitResult.classList.add("correctResult");
    submitResult.innerHTML = `<div id='sum10'>Bạn cần trả lời chính xác tối thiểu ${minRequirements} Câu hỏi trước khi bấm Dừng lại<br> Đừng nản chí! Kiên trì bạn sẽ Thành Công</div>`;
  }

  if (i === minRequirements) {
    submitResult.classList.add("correctResults");
    submitResult.innerHTML = `Chúc mừng bạn đã vượt qua thử thách! <br> Kết quả của bạn đã được gửi tới hòm thư: nguyenthanhhoa075@gmail.com.`;
    backgroundMusic.pause();
    stop();
    watch.isOn ? stopWhenOn() : watch.reset();
    var audioGoodBeyList = audioLists[3];
    audioPlay(audioGoodBeyList);
    coating.style.display = "block";
    coating.style.opacity = 0;
    btnSubmits.textContent = "SeeAgain!";
    i = 0;
    progression.innerHTML = `00 /`;
  }
});
var audioElement = $.querySelector("#audios");
function audioPlay(audioList) {
  audioElement.src = `./assets/audio/${audioList}.mp3`;
  audioElement.play();
}

var backgroundMusic;
var isPlayIng = false;
function playBackgroundMusic() {
  backgroundMusic = $.querySelector("#backgroundMusic");
  isPlayIng = true;
  backgroundMusic.play();
  backgroundMusic.addEventListener(
    "ended",
    function () {
      this.currentTime = 0;
      this.play();
    },
    false
  );
}
function pauseBackgroundMusic() {
  isPlayIng = false;
  backgroundMusic.pause();
}

// Chặn hành vi mặc định của Keydown và gán cho keydown Enter bằng onClick cardNext
answerElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    cardNext.click();
    answerValue = "";
  }
});

var randomSong = [];
function createRandomSong(songs) {
  var songLength = songs.length;
  var m = Math.floor(Math.random() * songLength);
  var check = randomSong.includes(m);
  if (!check) {
    randomSong.push(m);
  } else {
    while (check) {
      m = Math.floor(Math.random() * songLength);
      check = randomSong.includes(m);
      if (!check) {
        randomSong.push(m);
      }
    }
  }
  if (randomSong.length === songLength) {
    randomSong = [];
  }
  suggestionsMsg.textContent = `${songs[m]}`;
}

// Đặt lại giá trị cho thuộc tính CSS của phần tử giả thông qua biến CSS:
var direction = AppElement.querySelector(".direction");
function setDisplay() {
  direction.style.setProperty("--dpn", "block");
}
function removeDisplay() {
  direction.style.setProperty("--dpn", "none");
}
setDisplay();

// Ví dụ:
// Xử lý giá trị CSS của Element và Element::after, Element::before
/* var direction = document.querySelector(".direction");
var getHeight = direction.clientHeight;
console.log(`1111111111`, `1 =`, direction, `5 =`, getHeight);
var colorss = window.getComputedStyle(direction, ".direction");
var color = window.getComputedStyle(direction, ":after");
var colors = color.getPropertyValue("bottom");
console.log(`222222222`, `2 =`, color);
console.log(`333333333`, `3 =`, colors);
console.log(`444444444`, `4 =`, colorss); */
