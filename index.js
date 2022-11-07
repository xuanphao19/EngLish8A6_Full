// ***************************************** Create App *********************************************
var AppElement = document.querySelector('#App');
var $ = AppElement.querySelector('.App_content');
var CoursesMenu = AppElement.querySelector('.openMenu');
var moduleElement = AppElement.querySelector('.AppModule');
var answerElement = $.querySelector('#answer_content');
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
  CoursesMenu.addEventListener('click', () => {
    moduleElement.removeEventListener('animationend', listenerClose);
    if (moduleElement) {
      moduleElement.style.display = 'block';
    }
  });
};
function listenerClose() {
  moduleElement.style.animation = '';
  moduleElement.style.display = 'none';
}
var CoursesClose = moduleElement.querySelector('.Courses_close');
CoursesClose.addEventListener('click', (e) => {
  closeModule(e);
});
function closeModule(_e) {
  moduleElement.style.animation = 'fadeOut 0.5s';
  moduleElement.addEventListener('animationend', listenerClose);
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
var unitList = moduleElement.querySelector('.Courses_list');
var unitElement = unitList.querySelectorAll('.Courses_item');
function coursesItem() {
  unitList.addEventListener('click', function (e) {
    i = 0;
    j = 0;
    randomNumbers = [];
    const tgt = e.target;
    if (tgt.closest('.Courses_item')) {
      questionId = tgt.closest('.Courses_item').id;
    }
    closeModule();
    clearErrorMsg();
    getRandomQuesId(questionId);
    handleUI();
  });
}
// Chuyển ID hạng mục khóa học thành tên Obj fake fetch() API
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

var categoriesEle = $.querySelector('.categories');
progression = $.querySelector('.progression');
total = $.querySelector('.total');
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
var questionStaging = $.querySelector('.question_staging');
var randomQuestion;
var correctAnswer = '';
function getRandomQuestion() {
  lengths = Units.length;
  randomNumber(lengths);
  randomQuestion = Units[n];
  questionStaging.innerHTML = randomQuestion[1];
  correctAnswer = randomQuestion[0];
}

// Xử lý nếu có ảnh thì hiển thị ra giao diện khi hàm được gọi.
var scream = AppElement.querySelector('#scream');
function questPictures() {
  for (var items of randomQuestion) {
    var itemImg;
    if (items.includes('png') || items.includes('jpg')) {
      itemImg = items;
      scream.src = `./assets/img/${itemImg}`;
    }
  }
}

//  Các hàm xử lý Audio:
var audioLists = [
  /* 0 */ 'Am_Ohno',
  /* 1 */ 'Uoc_mo_cua_Me',
  /* 2 */ 'yeah',
  /* 3 */ 'Tambiet',
  /* 4 */ 'Nhac_nen_hay',
  /* 5 */ 'Tieng_bom',
  /* 6 */ 'Tiengkimgiaydonghokeu',
  /* 7 */ 'Xin_chao',
  /* 8 */ 'WelcomeToWonderland',
  /* 9 */ 'Tieng_voTay0133',
];
// Xử lý Audio khi có audio question music: audioItem audioQuestions
var audioQuestions = AppElement.querySelector('#audioQuestions');
var audioItem = AppElement.querySelector('.audioItem');
function speakerWaves() {
  for (var items of randomQuestion) {
    var itemMp3;
    if (items.includes('audio') || items.includes('mp3') || items.includes('sound')) {
      itemMp3 = items;
      // questionStaging.innerHTML = `Listen, rewrite what you hear:`;
      audioQuestions.style.display = 'block';
      audioItem.src = `${itemMp3}`;
    }
    if (itemMp3 === undefined) {
      audioQuestions.style.display = 'none';
      var noAudioItem = audioLists[6];
      itemMp3 = `./assets/audio/${noAudioItem}.mp3`;
      audioItem.src = `${itemMp3}`;
    }
  }
}
audioQuestions.addEventListener('click', () => {
  audioItem.style.transform = 'scale(0.3)';
  audioItem.play();
  if (isPlayIng) {
    pauseBackgroundMusic();
  }
});

// Xử lý hiển thị gợi ý:
var suggestionsElement = $.querySelector('.suggestionsBack');
function showSuggestions() {
  for (var items of randomQuestion) {
    var itemSuggestions = items.endsWith('Gợi ý:', 6);
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
  current_date = `Ngày 0${dates.getDate()} / ${dates.getMonth() + 1} / ${dates.getFullYear()}`;
} else {
  current_date = `Ngày: ${dates.getDate()} Tháng: ${dates.getMonth() + 1} Năm: ${dates.getFullYear()}`;
}
$.querySelector('.shows_date').innerHTML = current_date;
$.querySelector('.shows_dates').innerHTML = current_date;

var current_day = dates.getDay();
var day_name = '';
switch (current_day) {
  case 0:
    day_name = 'Chủ nhật';
    break;
  case 1:
    day_name = 'Thứ hai';
    break;
  case 2:
    day_name = 'Thứ ba';
    break;
  case 3:
    day_name = 'Thứ tư';
    break;
  case 4:
    day_name = 'Thứ năm';
    break;
  case 5:
    day_name = 'Thứ sau';
    break;
  case 6:
    day_name = 'Thứ bảy';
}
$.querySelector('.shows_time').innerHTML = day_name;
$.querySelector('.shows_times').innerHTML = day_name;

// Handle countTime:
var timeSum = AppElement.querySelector('.timeSum');
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
        minutes = '0' + minutes;
      }
      if (seconds.length < 2) {
        seconds = '0' + seconds;
      }
      if (millisecond < 10) {
        millisecond = `0${millisecond}`;
      }
      if (seconds == 10) {
        btnSubmits.textContent = 'Stop';
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
  btnStart.textContent = 'Start';
  watch.stop();
}

function stopWhenOn() {
  btnStart.textContent = 'Start';
  watch.stop();
  watch.reset();
}

btnStart.addEventListener('click', function () {
  var audioHelloList = audioLists[7];
  if (!watch.isOnStartAudio) {
    audioPlay(audioHelloList);
  }
  if (btnSubmits.textContent === 'Nộp bài') {
    clearErrorMsg();
  }
  answerElement.focus();
  coatingEnd();
  start();
});

btnPause.addEventListener('click', function () {
  if (watch.isOn) {
    backgroundMusic.pause();
    stop();
  }
});

// Tạo lớp phủ Input:
var coating = $.querySelector('.coating');
coating.addEventListener('click', function () {
  coatingStart();
});
function coatingStart() {
  coating.style.opacity = 1;
  coating.innerHTML = 'Vui lòng Click Start để bắt đầu!';
}
function coatingEnd() {
  coating.style.opacity = 0;
  coating.style.display = 'none';
}

// Handle Error App:
var suggestionsMsg = $.querySelector('.suggestions');
var errorMessage = $.querySelector('.errorMessage');
var warningMsgs;
var answerValue;
function testValue(answerElement) {
  answerValue = answerElement.value;
  var regex = /^\S.*(?!.*[^\S])(?=.*[a-zA-Z]).*$/;
  var testPun = /[!:;"()',.?-]/;
  if (errorMessage) {
    if (correctAnswer !== answerValue) {
      suggestionsMsg.textContent = '';
      if (!answerValue) {
        return (warningMsgs = `Mỗi ⭐ bằng 1k NÈ. <br> ⭐ Đang chờ bạn CHINH PHỤC hem!<br>*  *  *<br> "Không có Tri thức<br> là TỰ làm nhục CHÍNH MÌNH!" `);
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
    errorMessage.style.padding = '8px';
    suggestionsMsg.style.padding = '10px 8px 0';
    suggestionsMsg.style.marginTop = '10px';
    answerElement.style.backgroundColor = ' #fad5d58c';
    answerElement.classList.add('addInvalid');
    testResult = false;
  } else {
    clearErrorMsg();
    testResult = true;
  }
};
// Xóa mọi thứ khi focus
clearErrorMsg = () => {
  errorMessage.innerHTML = '';
  suggestionsMsg.innerHTML = '';
  errorMessage.style.padding = '0';
  answerElement.style = '';
  suggestionsMsg.style = '';
  answerElement.classList = '';
  submitResult.classList = '';
  submitResult.innerHTML = '';
};

//Handle Click Next btn:
var cardNext = $.querySelector('#next');
var congratulationMusic = audioLists[9];
var medals = '';
var stars = $.querySelector('.star');

cardNext.addEventListener('click', () => {
  i = i;
  console.log(`111111111111111`, i, `i + 1 =`, i + 1, questionId);
  var audioErrorList = audioLists[0];
  var audioYeahList = audioLists[2];
  answerValue = answerElement.value;
  submitResult.innerHTML = '';

  if (i >= 1 && i < minRequirements) {
    btnSubmits.textContent = 'Stop';
  }
  if (i + 1 === minRequirements) {
    btnSubmits.textContent = 'Nộp bài!';
  }
  if (submitResult.matches('.correctResults') && coating.style.display === 'block') {
    clearErrorMsg();
    return;
  }
  if (!watch.isOn) {
    coatingStart();
  } else if (watch.isOn && submitResult.matches('.correctResult') && !answerValue) {
    answerElement.focus();
    submitResult.classList = '';
    submitResult.innerHTML = '';
    return;
  } else if (watch.isOn && flipCardInner.matches('.is-flipped') && !answerValue) {
    flipCardInner.classList.remove('is-flipped');
    suggestions.textContent = 'Xem gợi ý';
    answerElement.focus();
    return;
  } else {
    if (submitResult.matches('.correctResults')) {
      submitResult.innerHTML = '';
      submitResult.classList.remove('.correctResults');
      btnSubmits.textContent = 'Stop!';
      answerElement.focus();
      return;
    }
    handleTest();
    if (testResult === true) {
      answerElement.focus();
      medals += '⭐';
      submitResult.classList.add('correctResult');
      submitResult.innerHTML = `<div id='sum10'>Bạn đã nhân được: ${medals} <br> Mỗi ⭐ = 1k Cố săn thật nhiều ⭐ nha! </div>`;
      if (btnSubmits.textContent === 'Nộp bài!' && i + 1 === minRequirements) {
        submitResult.innerHTML = `Chúc mừng bạn!<br> Bạn đã vượt qua thử thách. <br> Bạn vẫn có thể tiếp tục luyện tập <br> Nếu bạn muốn nâng cao Trình độ!`;
        backgroundMusic.pause();
        submitResult.classList.add('correctResults');
        audioPlay(congratulationMusic);
      } else {
        audioPlay(audioYeahList);
      }
      i++;
      handleUI();
      answerElement.value = '';
    } else {
      medals = medals.slice(1);
      submitResult.classList.add('correctResult');
      submitResult.innerHTML = `<div id='sum10'>Xin Chúc mừng: <br> Bạn đã Quay vào Ô: Trừ 1 ⭐ </div>`;
      answerElement.placeholder = '💥💥💥💥💥💥💥💥💥💥💥💥💥';
      audioPlay(audioErrorList);
      createRandomSong(songs);
    }
  }
  stars.textContent = `${medals}`;
});
// Xóa massage lỗi và input value khi focus input:
var flipCardInner = $.querySelector('.flip-card-inner');
answerElement.addEventListener('focus', function handleClearError(e) {
  playBackgroundMusic();
  clearErrorMsg();
  if (flipCardInner.matches('.is-flipped')) {
    flipCardInner.classList.remove('is-flipped');
    suggestions.textContent = 'Xem gợi ý';
  }
  audioItem.pause();
  answerElement.placeholder = 'Enter your answer! 🌻 🌻 🌻';
  e.target.value = '';
});

// Xử lý so sánh (Tham chiếu) input value với chỗi gốc:
answerElement.oninput = function () {
  answerValue = answerElement.value;
  clearErrorMsg();
  autoGrow();
  // Xử lý báo lỗi khi nhập trường đầu vào bị sai:
  // let resultValue = correctAnswer;
  // let result = resultValue.includes(answerValue);
  // if (result) {
  //   answerElement.classList.remove("addInvalid");
  //   answerElement.classList.add("unInvalid");
  // } else {
  //   answerElement.classList.remove("unInvalid");
  //   answerElement.classList.add("addInvalid");
  // }
};

// Mở rộng hộp nhập dữ liệu đầu vào answer:
function autoGrow() {
  answerElement.style.height = answerElement.scrollHeight + 'px';
}

// Xử lý xoay flashCard Xem gợi ý:
var suggestions = $.querySelector('#suggestions-btn');
suggestions.addEventListener('click', () => {
  clearErrorMsg();
  if (!watch.isOn) {
    coatingStart();
  } else if (answerElement.value === '') {
    flipCardInner.classList.toggle('is-flipped');
    if (flipCardInner.matches('.is-flipped')) {
      suggestions.textContent = 'Đóng gợi ý';
      if (isPlayIng) {
        pauseBackgroundMusic();
      }
      audioItem.play();
    } else {
      answerElement.focus();
      suggestions.textContent = 'Xem gợi ý';
    }
    return;
  } else if (answerElement.value === correctAnswer) {
    if (!flipCardInner.matches('.is-flipped')) {
      congratulationMusic = audioLists[9];
      audioPlay(congratulationMusic);
      suggestions.textContent = 'Đóng gợi ý';
      flipCardInner.classList.toggle('is-flipped');
      suggestionsElement.innerHTML = `Xin chúc mừng bạn đã đưa ra đáp án hoàn toàn chính xác!`;
    } else {
      answerElement.focus();
      suggestions.textContent = 'Xem gợi ý';
    }
  } else {
    if (!flipCardInner.matches('.is-flipped')) {
      flipCardInner.classList.toggle('is-flipped');
      suggestions.textContent = 'Đóng gợi ý';
      suggestionsMsg.innerHTML = `<div id='sum10'>Click Next để kiểm tra kết quả của bạn!</div>`;
      if (isPlayIng) {
        pauseBackgroundMusic();
      }
      audioItem.play();
    } else {
      answerElement.focus();
      suggestions.textContent = 'Xem gợi ý';
    }
  }
});

// Hướng dẫn nộp bài
var btnSubmits = $.querySelector('#btnSubmits');
var submitResult = $.querySelector('#submitResult');
btnSubmits.addEventListener('click', function () {
  if (btnSubmits.textContent === 'Hướng dẫn') {
    submitResult.classList.add('correctResult');
    setDirectionBlock();
    return;
  }

  if (btnSubmits.textContent === 'Stop' || (1 <= i && i < minRequirements)) {
    submitResult.classList.add('correctResult');
    submitResult.innerHTML = `<div id='sum10'>Bạn cần trả lời chính xác tối thiểu ${minRequirements} Câu hỏi trước khi bấm Dừng lại<br> Đừng nản chí! Kiên trì bạn sẽ Thành Công</div>`;
  }

  if (i === minRequirements) {
    submitResult.classList.add('correctResults');
    submitResult.innerHTML = `Chúc mừng bạn đã vượt qua thử thách! <br> Kết quả của bạn đã được gửi tới hòm thư: nguyenthanhhoa075@gmail.com.`;
    backgroundMusic.pause();
    stop();
    watch.isOn ? stopWhenOn() : watch.reset();
    var audioGoodBeyList = audioLists[3];
    audioPlay(audioGoodBeyList);
    coating.style.display = 'block';
    coating.style.opacity = 0;
    btnSubmits.textContent = 'SeeAgain!';
    i = 0;
    progression.innerHTML = `00 /`;
  }
});

var audioElement = $.querySelector('#audios');
function audioPlay(audioList) {
  audioElement.src = `./assets/audio/${audioList}.mp3`;
  audioElement.play();
}

var backgroundMusic;
var isPlayIng = false;
function playBackgroundMusic() {
  backgroundMusic = $.querySelector('#backgroundMusic');
  isPlayIng = true;
  backgroundMusic.play();
  backgroundMusic.addEventListener(
    'ended',
    function () {
      this.currentTime = 0;
      this.play();
    },
    false,
  );
}
function pauseBackgroundMusic() {
  isPlayIng = false;
  backgroundMusic.pause();
}

// Chặn hành vi mặc định của Keydown và gán cho keydown Enter bằng onClick cardNext
answerElement.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    event.preventDefault();
    cardNext.click();
    answerValue = '';
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
var moduleDirection = AppElement.querySelector('.moduleDirection');
var direction = AppElement.querySelector('.direction');
function setDirectionBlock() {
  moduleDirection.style.display = 'block';
}
function setDirectionNone() {
  moduleDirection.style.display = 'none';
}
function setAfterBlock() {
  direction.style.setProperty('--AfterDpl', 'block');
}
function setAfterNone() {
  direction.style.setProperty('--AfterDpl', 'none');
}
function setBeforeBlock() {
  direction.style.setProperty('--dpn', 'block');
}
function setBeforeNone() {
  direction.style.setProperty('--dpn', 'none');
}
var directionClose = moduleDirection.querySelector('.direction_close');
var directionContinue = moduleDirection.querySelector('.direction_continue');
directionClose.addEventListener('click', function () {
  setDirectionNone();
});

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
// Vẽ Canvas:
{
  var canvas = document.getElementById('canvas');
  var ctx = canvas.getContext('2d');
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
    var img = document.getElementById('scream');
    ctx.drawImage(img, -132, -132, 265, 285);
    grad = ctx.createRadialGradient(0, 0, radius * 0.85, 0, 0, radius * 1.18);
    grad.addColorStop(0, '#88cd88');
    grad.addColorStop(0.4, '#fff');
    grad.addColorStop(1, '#eb94dd');
    // grad.addColorStop(0, "#333");
    // grad.addColorStop(0.4, "white");
    // grad.addColorStop(1, "#333");
    ctx.strokeStyle = grad;
    ctx.lineWidth = radius * 0.14;
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.075, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.strokeStyle = '#0000ffb3';
    ctx.fill();
  }

  function drawNumbers(ctx, radius) {
    var ang;
    var num;
    var gradient;
    ctx.font = radius * 0.16 + 'px Verdana';
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';
    ctx.fillStyle = 'rgb(239 0 255)';
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
    hour = (hour * Math.PI) / 6 + (minute * Math.PI) / (6 * 60) + (second * Math.PI) / (360 * 60);
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
    ctx.lineCap = 'round';
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.stroke();
    ctx.rotate(-pos);
  }
}
var unitList = document.querySelector('.Courses_list');
var followCourses = {
  unitCourses: [
    {
      id: 'Unit1',
      className: 'Courses_item',
      image: './assets/img/MisaCute.png',
      minReq: 10,
      info: [
        [
          "Let's hang out this weekend!",
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/4-1.mp3',
          "Gợi ý:<br> Let's hang out this weekend!",
          'Hai_co_tam.png',
        ],
        [
          'My favourite leisure activity is arranging flowers.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/2-1.mp3',
          'Gợi ý:<br> My favourite leisure activity is arranging flowers.',
          'Hatrang.png',
        ],
        ['Leisure activity', 'hoạt động lúc rảnh rỗi', 'Gợi ý:<br> ... activity ', 'MisaCute.png'],
        [
          'Girls love window shopping.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/5-1.mp3',
          'Gợi ý:<br> Girls love window shopping.',
          'ChinBacNuiRung.jpg',
        ],
        [
          'They go window shopping without buying or paying anything.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/6-1.mp3',
          'Gợi ý:<br> They go window shopping without buying or paying anything.',
          'PhotDoi.jpg',
        ],
        [
          'Do you like pet training?',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/7-1.mp3',
          'Gợi ý:<br> Tình anh như nước dâng cao, <br> Tình em như dải lụa đào tẩm hương.',
        ],
        [
          "What is your brother's name?",
          'tên em trai của bạn là gì',
          "Gợi ý:<br> ... brother's name?",
          'Screenshot_20210503-120123_Gallery.jpg',
        ],
        [
          'Making crafts was my favourite leisure activity during summer holiday.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/9-1.mp3',
          'Gợi ý:<br> Anh đi đường ấy xa xa, <br> Để em ôm bóng trăng tà năm canh.',
          'Annotation 2022-10-01 180957.png',
        ],
        [
          'My parents gave me an amazing craft kit which has beads, buttons, stickers and wool, etc.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/10-1.mp3',
          'Gợi ý:<br> My parents gave me an amazing craft kit which has beads, buttons, stickers and wool, etc.',
          'Thanh_ngu.png',
        ],
        [
          'Look! This is my hand-made bracelet.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/11-1.mp3',
          'Gợi ý:<br> Học - học nữa - học mãi <br> (Lê-Nin).',
        ],
        [
          "Check out this craft kit. I think you'll like it.",
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/12-1.mp3',
          'Gợi ý:<br> Người hỏi về điều mình chưa biết là nhà bác học, người xấu hổ không dám hỏi là kẻ thù của chính mình.',
          'khaigiang8A6_2022.png',
        ],
        [
          "Wow, it's got all things I need: stickers, wool, buttons… This craft kit is right up my street!",
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/13-1.mp3',
          "Gợi ý:<br> Wow, it's got all things I need: stickers, wool, buttons… This craft kit is right up my street!",
          'GVCN8A6_2022.png',
        ],
        [
          'Playing beach games is fun.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/1-1.mp3',
          'Gợi ý:<br> Dẫu xây chín bậc phù đồ, <br> Không bằng làm phúc, cứu cho một người.',
          'tapthe8A6.png',
        ],
        [
          'A day in the sun is a great time to play beach games.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/2-2.mp3',
          'Gợi ý:<br> Nhiễu điều phủ lấy giá gương <br> Người trong một nước phải thương nhau cùng',
          'trungthu2022.png',
        ],
        [
          'Doing DIY is the most creative leisure activity.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/3-4.mp3',
          'Gợi ý:<br> Nghèo mà có nghĩa có nhân <br> Còn hơn sang cả mà lòng bội phu.',
        ],
        [
          'I feel satisfied with these DIY flower vases.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/4-2.mp3',
          'Gợi ý:<br> Lấy hận thù diệt hận thù <br> Hận thù không mất nghìn thu vẫn còn',
        ],
        [
          'My DIY project is to make some new bookshelves this summer.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/5-1.mp3',
          'Gợi ý:<br> Ba năm quân tử trồng tre,<br> Mười năm uốn gậy, đánh què tiểu nhân.',
        ],
        [
          'Play beach games',
          'chơi các môn thể thao trên bãi biển',
          'Gợi ý:<br> Chim khôn kêu tiếng rảnh rang,  <br> Người khôn nói tiếng dịu dàng dễ nghe.',
        ],
        ['Satisfied', 'hài lòng', 'Gợi ý:<br> Có đỏ mà chẳng có thơm <br> Như hoa dâm bụt, nên cơm cháo gì.'],
        ['DIY project', 'N:dự án, kế hoạch tự làm (đồ gì)', 'Gợi ý:<br> DIY project'],
        [
          'Mountain biking',
          'n: hoạt động đạp xe leo núi',
          'Gợi ý:<br> Lúc nghèo thì chẳng ai nhìn <br> Đến khi đỗ trạng chín nghìn anh em.',
        ],
        ['Go mountain biking', 'v: đạp xe leo núi', 'Gợi ý:<br> Một gánh sách không bằng một giáo viên giỏi'],
        ['Socialising', 'n: hoạt động giao lưu', 'Gợi ýTrọng thầy mới được làm thầy'],
        ['Socialise', 'v: giao lưu', 'Gợi ý:<br> Muốn biết phải hỏi, muốn giỏi phải học'],
        ['Texting', 'n: nhắn tin', 'Gợi ý', 'Bán tự vi sư, nhất tự vi sư'],
        ['Text', 'v: nhắn tin', 'Gợi ý:<br> Thời gian dẫu bạc mái đầu <br> Tim trò vẫn tạc đậm câu ơn thầy'],
        [
          'Surfing the Internet',
          'n: lướt web',
          'Gợi ý:<br> Con ơi ghi nhớ lời này <br> Công cha, nghĩa mẹ, công thầy chớ quên.',
        ],
        [
          'Surf the Internet',
          'v: lướt web',
          'Gợi ý:<br> Ăn quả nhớ kẻ trồng cây <br> Có danh có vọng nhớ thầy khi xưa.',
        ],
        [
          'eating',
          'I fancy ... out with friends at the weekend',
          'Gợi ý:<br> Mấy ai là kẻ không thầy <br> Thế gian thường nói đố mày làm nên.',
        ],
        [
          'Doing',
          '.... DIY brings you a lot of amazing benefits',
          'Gợi ý:<br> Ơn thầy soi lối mở đường <br> Cho con vững bước dặm trường tương lai',
        ],
        [
          'Paddy',
          'n: cánh đồng lúa',
          'Gợi ý:<br> Cứ vui chơi cho hết đời trai trẻ <br>Rồi âm thầm lặng lẽ đạp xích lô.',
        ],
        ['Rice', 'n: lúa, gạo, cơm', 'Gợi ý:<br> Gái đâu có gái lạ lùng, <br> Chồng chẳng nằm cùng, ném chó xuống ao.'],
        ['Rice straw', 'rơm', 'Gợi ý:<br> Chồng người đánh giặc sông Lô <br> Chồng em ngồi bếp rang ngô cháy quần'],
        ["What is your sister's name?", 'Tên chị gái của bạn là gì', "Gợi ý:<br> ... sister's name?", 'MisaCute.png'],
        ['DIY: Do-It-Yourself', 'tự làm, tự sửa (đồ gì)', 'Gợi ý:<br> DIY: Do-It-Yourself'],
        [
          'Harvest time',
          'n: mùa thu hoạch, mùa gặt',
          'Gợi ý:<br> Học trò đèn sách hôm mai <br> Ngày sau thi đỗ nên trai mới hào <br> Làm nên quan thấp, quan cao <br> Làm nên vọng tía võng đào nghênh ngang.',
        ],
        [
          'Harvest = Collect',
          'v: thu hoạch, gặt',
          'Gợi ý:<br> Giàu người ta chẳng có tham <br> Khó khăn ta liệu ta làm ta ăn.',
        ],
        [
          'Ripe',
          'ad: chín',
          'Gợi ý:<br> Cô kia cắt cỏ bên sông <br> Có muốn ăn nhãn thì lồng sang đây <br> Sang đây anh nắm cổ tay <br> Anh hỏi câu này: Có lấy anh chăng?',
        ],
        [
          'Buffalo-drawn cart',
          'xe trâu kéo',
          'Gợi ý:<br> Bao giờ cho gạo bén sàng? <br> Cho trăng bén gió, cho nàng bén anh?',
        ],
        [
          'Grill fish in rice straw',
          'v: nướng cá bằng rơm',
          'Gợi ý:<br> Ước gì anh lấy được nàng <br> Để anh mua gạch Bát Tràng về xây <br> Xây dọc rồi lại xây ngang, <br> Xây hồ bán nguyệt cho nàng rửa chân.',
        ],
        ['Fly a kite', 'v: thả diều', 'Gợi ý:<br> Bắt đầu ngủ giữa tiết 3 <br> Đến khi tỉnh giấc đã là tiết 5.'],
        [
          'Herd the buffalo',
          'chăn trâu',
          'Gợi ý:<br> Học là học biết giữ giàng <br> Biết điều nhân nghĩa biết đàng hiếu trung​',
        ],
        [
          'Go herding the buffalo',
          'v: chăn trâu',
          'Gợi ý:<br> Muốn sang thì bắc cầu Kiều <br>Muốn con hay chữ thì yêu lấy thầy.',
        ],
        ['Herd the cattle', 'v: chăn bò', 'Gợi ýHọc khôn đến chết, học nết đến già.'],
        ['Herd the sheep', 'v: chăn cừu', 'Gợi ýHọc hành vất vả kết quả ngọt bùi.'],
        ['Livestock', 'gia súc', 'Gợi ý', 'Học thầy học bạn, vô vạn phong lưu.'],
        [
          'Ride a buffalo',
          'cưỡi trâu',
          'Gợi ý:<br> Làm trai cố chí lập thân <br> Rồi ra gặp hội phong vân cũng vừa <br> Nên ra tay kiếm tay cờ <br> Chẳng nên thì chớ, chẳng nhờ tay ai.',
        ],
        ['Pick fruit', 'hái trái cây', 'Gợi ý:<br> Bàn tay ta làm nên tất cả <br> Có sức người sỏi đá cũng thành cơm.'],
        ['Pick wild flowers', 'hái hoa dại', 'Gợi ý:<br> Làm người ăn tối lo mai <br> Việc mình hồ dễ để ai lo lường.'],
        ['Collect hay', 'lượm cỏ khô', 'Gợi ý:<br> Collect hay'],
        [
          'Collect water',
          'lấy nước',
          'Gợi ý:<br> Learn from the mistakes of others. You can never live long enough to make them all yourself.',
        ],
        [
          'Convenient',
          'ad: thuận tiện',
          'Gợi ý:<br> Học là học để mà hành <br> Vừa hành vừa học mới thành người khôn.',
        ],
        ['Inconvenient', 'ad: bất tiện', 'Gợi ý:<br> Rủ nhau đi học i o <br> Một ngày một chữ, con bò cũng thông.'],
        [
          'Peaceful',
          'ad: yên bình',
          'Gợi ý:<br> Khuyên ai đọc sách ngâm thơ <br> Dùi mài kinh sử để chờ kịp khoa <br> Mai sau nối được nghiệp nhà <br> Trước là mát mặt sau là vinh thân.',
        ],
        ['Hospitable', 'hiếu khách', 'Gợi ý:<br> Học trò học hiếu học trung <br> Học cho đến mực anh hùng mới thôi.'],
        [
          'Generous',
          'hào phóng',
          'Gợi ý:<br> Nhỏ còn thơ dại biết chi <br> Lớn thì đi học, học thì phải siêng <br>Theo đòi cũng thể bút nghiêng <br> Thua em kém chị cũng nên hổ mình.',
        ],
        [
          'I like hanging out with the girl next door.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson1/ly-thuyet/audio/3-1.mp3',
          'Gợi ý:<br> Cơm cha áo mẹ chữ thầy <br> Gắng công mà học có ngày thành danh.',
        ],
        [
          'Flying kites in the wide open countryside is great fun',
          'Viết lại vd(123) Fly a kite',
          'Gợi ý:<br> Flying kites in the wide open countryside is great fun',
        ],
        ["What is your father's name?", 'Tên bố của bạn là gì', 'Gợi ý:<br> What is your...', 'Dai_Nhan.png'],
        ["What is your mother's name?", 'Tên mẹ của bạn là gì?', 'Gợi ý:<br> What is your....', 'HiepPhan.png'],
        [
          'Vietnamese people are very hospitable',
          'Viết lại vd(123) với từ: Hospitable',
          'Gợi ý:<br> Vietnamese people are very hospitable',
        ],
        [
          'Livestock include farm animals such as buffalo, cow, goat or sheep',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson2/vocab/audio/3-1.mp3',
          'Gợi ý:<br> Livestock include farm animals such as buffalo, cow, goat or sheep',
        ],
        [
          'Paddy field',
          'Listen, rewrite what you hear:❤️',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson1/vocab/audio/1.mp3',
        ],
        [
          'Harvest time',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson1/vocab/audio/4.mp3',
        ],
        [
          'Go herding the buffaloes',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson1/vocab/audio/11.mp3',
          'Gợi ý:<br> Go herding the buffaloes',
        ],
        [
          'Herd the buffaloes',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson1/vocab/audio/10.mp3',
          'Gợi ý:<br> Herd the buffaloes',
        ],
        [
          'Mountain biking on Sunday is really exciting.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/6-1.mp3',
          'Gợi ý:<br> Mountain biking on Sunday is really exciting.',
        ],
        [
          'You should go mountain biking more often.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/7-1.mp3',
          'Gợi ý:<br> You should go mountain biking more often.',
        ],
        [
          "There isn't much socialising at the party.",
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/8-1.mp3',
          "Gợi ý:<br> There isn't much socialising at the party.",
        ],
        [
          'She socialised with many new friends at the summer camp.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/9-1.mp3',
          'Gợi ý:<br> She socialised with many new friends at the summer camp.',
        ],
        [
          'Too much texting can be harmful to our health.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/10-1.mp3',
          'Gợi ý:<br> Too much texting can be harmful to our health.',
        ],
        [
          'She pulled out the phone and sent him a text.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/11-2.mp3',
          'Gợi ý:<br> She pulled out the phone and sent him a text.',
        ],
        [
          'Surfing the Internet has become his daily routine.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/12-1.mp3',
          'Gợi ý:<br> Surfing the Internet has become his daily routine.',
        ],
        [
          'I often surf the net for learning tips.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson2/ly-thuyet/audio/13-1.mp3',
          'Gợi ý:<br> I often surf the net for learning tips.',
        ],
        [
          'He won the first prize for breaking bricks.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson3/ex3/1.mp3',
          'Gợi ý:<br> He won the first prize for breaking bricks.',
        ],
        [
          'The presentation provided brilliant ideas.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson3/ex3/2.mp3',
          'Gợi ý:<br> The presentation provided brilliant ideas.',
        ],
        [
          'Brian is preparing a brief presentation on practicing british accent.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson3/ex3/3.mp3',
          'Gợi ý:<br> Brian is preparing a brief presentation on practicing british accent.',
        ],
        [
          'The president ap proved the program to protect ze bras.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson3/ex3/4.mp3',
          'Gợi ý:<br>  The president ap proved the program to protect ze bras.',
        ],
        [
          'The pretty princess prefers broccoli to brown bread for breakfast',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson3/ex3/5.mp3',
          'Gợi ý:<br> The pretty princess prefers broccoli to brown bread for breakfast',
        ],
        [
          'I like skateboarding/ to skateboard in my free time.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson4/ly-thuyet/1-1.mp3',
          'Gợi ý:<br> I like skateboarding/ to skateboard in my free time.',
        ],
        [
          'She loves training/ to train her dog.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson4/ly-thuyet/2-1.mp3',
          'Gợi ý:<br> She loves training/ to train her dog.',
        ],
        [
          'My mother prefers going/ to go jogging.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson4/ly-thuyet/4-1.mp3',
          'Gợi ý:<br> My mother prefers going/ to go jogging.',
        ],
      ],
    },
    {
      id: 'Unit2',
      className: 'Courses_item',
      image: './assets/img/Hatrang.png',
      minReq: 10,
      info: [
        [
          'Virtual',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Virtual',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/1.mp3',
        ],
        [
          'I always take great care of my virtual cat',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> I always take great care of my virtual cat',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/1-1.mp3',
        ],
        [
          'Addicted (to something)',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Addicted (to something)',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/2.mp3',
        ],
        [
          'Many teenagers are addicted to Facebook.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Many teenagers are addicted to Facebook.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/2-1.mp3',
        ],
        [
          'Harmful (to somebody/ something)',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Harmful (to somebody/ something)',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/3.mp3',
        ],
        [
          'Using computers all day long can be harmful to our health.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Using computers all day long can be harmful to our health.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/3-1.mp3',
        ],
        [
          'Have harmful effects on somebody/ something',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Have harmful effects on somebody/ something',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/4.mp3',
        ],
        [
          'Using computers all day long can have harmful effects on our health.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Using computers all day long can have harmful effects on our health.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/4-1.mp3',
        ],
        [
          'Rely on somebody/ something',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Rely on somebody/ something',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/5.mp3',
        ],
        [
          'A study finds that 91% of American teens rely on smartphones to go online.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> A study finds that 91% of American teens rely on smartphones to go online.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/5-1.mp3',
        ],
        [
          'A study finds that 91% of American teens rely on smartphones to go online.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> A study finds that 91% of American teens rely on smartphones to go online.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/5-1.mp3',
        ],
        [
          'Ban somebody from doing something',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Ban somebody from doing something',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/6.mp3',
        ],
        [
          'Some parents ban their children from playing video games on weekdays.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Some parents ban their children from playing video games on weekdays.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson5/ly-thuyet/audio/6-1.mp3',
        ],
        [
          'I believe that life would be so boring without computers and the Internet.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> I believe that life would be so boring without computers and the Internet.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/8.mp3',
        ],
        [
          'I think shopping there will be wonderful.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> I think shopping there will be wonderful.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/9.mp3',
        ],
        [
          "I'm certain that he will be satisfied with my DIY project.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> I'm certain that he will be satisfied with my DIY project.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/10.mp3',
        ],
        [
          'In my opinion, her bracelet is quite beautiful.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> In my opinion, her bracelet is quite beautiful.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/11.mp3',
        ],
        [
          'Do you think so?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Do you think so?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/18.mp3',
        ],
        [
          'What do you think about shopping now?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> What do you think about shopping now?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/19.mp3',
        ],
        [
          'Do you think hanging out with friends is fun?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Do you think hanging out with friends is fun?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/20.mp3',
        ],
        [
          'What is your view on banning the kids from computer games?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> What is your view on banning the kids from computer games?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/21.mp3',
        ],
        [
          'Same.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Same.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/24.mp3',
        ],
        [
          'So-so.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> So-so.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/25.mp3',
        ],
        [
          'Sure.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Sure.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/26.mp3',
        ],
        [
          'Maybe.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br>Maybe.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/27.mp3',
        ],
        [
          'Exactly',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Exactly',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/29.mp3',
        ],
        [
          "That's so true.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> That's so true.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/30.mp3',
        ],
        [
          'I agree with you.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> I agree with you.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/31.mp3',
        ],
        [
          "I couldn't agree with you more.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> I couldn't agree with you more.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/32.mp3',
        ],
        [
          "I don't think so.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> I don't think so.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/37.mp3',
        ],
        [
          "I don't agree with you.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> I don't agree with you.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/38.mp3',
        ],
        [
          "I'm afraid I don't agree.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> I'm afraid I don't agree.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/39.mp3',
        ],
        [
          "I couldn't agree with you more.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> I couldn't agree with you more.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/41.mp3',
        ],
        [
          'Do you think hanging out with friends is fun?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Do you think hanging out with friends is fun?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/20.mp3',
        ],
        [
          'I agree with you. Meeting friends always makes me relaxed.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> I agree with you. Meeting friends always makes me relaxed.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson6/ly-thuyet/40.mp3',
        ],
        [
          'Relaxing',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Relaxing',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/1.mp3',
        ],
        [
          'Relaxing leisure activities include massage, eating out or watching sports.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Relaxing leisure activities include massage, eating out or watching sports.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/1-1.mp3',
        ],
        [
          'Mental',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Mental',
          'Mental health affects how we think, feel, and act.',
        ],
        [
          'Physical',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Physical',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/3.mp3',
        ],
        [
          'Playing online games for hours is harmful to your physical health.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Playing online games for hours is harmful to your physical health.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/3-3.mp3',
        ],
        [
          'Indoor',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Indoor',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/4.mp3',
        ],
        [
          'This indoor swimming pool is awesome.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> This indoor swimming pool is awesome.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/4-1.mp3',
        ],
        [
          'Indoors',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Indoors',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/5.mp3',
        ],
        [
          'Many teenagers stay indoors all day to surf the net.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Many teenagers stay indoors all day to surf the net.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/5-1.mp3',
        ],
        [
          'Outdoor',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Outdoor',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/6.mp3',
        ],
        [
          'I adore outdoor leisure activities like mountain biking.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> I adore outdoor leisure activities like mountain biking.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/6-1.mp3',
        ],
        [
          'Outdoors',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Outdoors',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/7.mp3',
        ],
        [
          'People watching',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> People watching',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/8.mp3',
        ],
        [
          'Jack loves to have breakfast outdoors in his beautiful garden.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Jack loves to have breakfast outdoors in his beautiful garden.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/7-1.mp3',
        ],
        [
          'My favourite outdoor activity is doing people watching.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> My favourite outdoor activity is doing people watching.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/8-1.mp3',
        ],
        [
          'Hooked (on something)',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Hooked (on something)',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/9.mp3',
        ],
        [
          'I was hooked on this game immediately.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> I was hooked on this game immediately.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/9-1.mp3',
        ],
        [
          'Join somebody/ something',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Join somebody/ something',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/10.mp3',
        ],
        [
          'Do you want to join us?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Do you want to join us?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson7/ly-thuyet/audio/10-1.mp3',
        ],
        [
          'What about you?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> What about you?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson9/ly-thuyet/1.mp3',
        ],
        [
          'enough',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> enough',
          'https://dic.tienganh123.com/sound/e/enough.mp3',
        ],
        [
          'tomorrow',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Học trước quên sau! Vậy mà vẫn lười',
          'https://dic.tienganh123.com/sound/t/tomorrow.mp3',
        ],
        [
          'brother',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> brother',
          'https://dic.tienganh123.com/sound/b/brother.mp3',
        ],
        // kết thúc unit 11111111111111111111111111111111111111111111111111111111
        [
          'Blue',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Blue',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/1.mp3',
        ],
        [
          'Blossom',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Blossom',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/2.mp3',
        ],
        [
          'Eatable',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Eatable',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/3.mp3',
        ],
        [
          'A black table',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> A black table',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/4.mp3',
        ],
        [
          'Blair blamed her for their terrible blind date.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Blair blamed her for their terrible blind date.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/5.mp3',
        ],
        [
          'Clock',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Clock',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/6.mp3',
        ],
        [
          'Circle',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Circle',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/7.mp3',
        ],
        [
          'Eclipse',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Eclipse',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/8.mp3',
        ],
        [
          'A classic bicycle',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> A classic bicycle',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/9.mp3',
        ],
        [
          "Claire's class clapped for the clumsy clown.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> Claire's class clapped for the clumsy clown.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/10.mp3',
        ],
        [
          'Block',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Block',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/12.mp3',
        ],
        [
          'Blink',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Blink',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/13.mp3',
        ],
        [
          'Clink',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Clink',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson3/lythuyet/14.mp3',
        ],
        [
          'The price in the village is cheaper than in the city.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> The price in the village is cheaper than in the city.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson4/lythuyet/1.mp3',
        ],
        [
          'The education in the city is better than in the village.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> The education in the city is better than in the village.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson4/lythuyet/2.mp3',
        ],
        [
          'The price in the city is more expensive than in the village.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> The price in the city is more expensive than in the village.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson4/lythuyet/3.mp3',
        ],
        [
          'The price in the city is more expensive than in the village.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> The price in the city is more expensive than in the village.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson4/lythuyet/3.mp3',
        ],
        [
          'People treat the others more kindly in the countryside than in the city.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> People treat the others more kindly in the countryside than in the city.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson4/lythuyet/4.mp3',
        ],
        [
          'People work harder but earn less in the countryside.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> People work harder but earn less in the countryside.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson4/lythuyet/5.mp3',
        ],
        [
          'People work harder but earn less in the countryside.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> People work harder but earn less in the countryside.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson4/lythuyet/5.mp3',
        ],
        [
          'Livestock',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Livestock',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson5/lythuyet/audio/1.mp3',
        ],
        [
          'These livestock provide owners with dairy products, meat and clothing.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> These livestock provide owners with dairy products, meat and clothing.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson5/lythuyet/audio/1-1.mp3',
        ],
        [
          "They've just put up their tent in the middle of a vast grassland.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> They've just put up their tent in the middle of a vast grassland",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson5/lythuyet/audio/2-1.mp3',
        ],
        [
          "They've just put up their tent in the middle of a vast grassland.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> They've just put up their tent in the middle of a vast grassland.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson5/lythuyet/audio/3-1.mp3',
        ],
        [
          'A ger is the best choice for the nomadic life.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> A ger is the best choice for the nomadic life.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson5/lythuyet/audio/4-1.mp3',
        ],
        [
          'The nomad never stays in a city for more than two months.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> The nomad never stays in a city for more than two months.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson5/lythuyet/audio/5-1.mp3',
        ],
        [
          'A ger is the best choice for the nomadic life.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> A ger is the best choice for the nomadic life.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson5/lythuyet/audio/6-1.mp3',
        ],
        [
          'The nomads often herd the camels every day.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> The nomads often herd the camels every day.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson5/lythuyet/audio/7-1.mp3',
        ],
        [
          'The Mongolian nomadic women do the housework and milk the horses.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> The Mongolian nomadic women do the housework and milk the horses.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson5/lythuyet/audio/8-1.mp3',
        ],
        [
          'What do you like about Mongolian nomadic life?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> What do you like about Mongolian nomadic life?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/7.mp3',
        ],
        [
          'I really like their living space, so free and close to nature.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> I really like their living space, so free and close to nature.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/8.mp3',
        ],
        [
          'I totally agree with you. I also fancy their living environment.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> I totally agree with you. I also fancy their living environment.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/9.mp3',
        ],
        [
          "Well, I adore horses and I'm very keen on riding them.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> Well, I adore horses and I'm very keen on riding them.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/10.mp3',
        ],
        [
          'What do you dislike about Mongolian nomadic life?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> What do you dislike about Mongolian nomadic life?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/17.mp3',
        ],
        [
          "Oh, I can't stand their lack of privacy.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> Oh, I can't stand their lack of privacy.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/18.mp3',
        ],
        [
          'Uhm, I find their way of life extremely inconvenient.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Uhm, I find their way of life extremely inconvenient.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/19.mp3',
        ],
        [
          'What do you like about Mongolian nomadic life?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> What do you like about Mongolian nomadic life?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/7.mp3',
        ],
        [
          'What do you dislike about Mongolian nomadic life?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> What do you dislike about Mongolian nomadic life?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/17.mp3',
        ],
        [
          'Uhm, Elin detests their lack of privacy but I find it interesting. Noticeably, none of us can stand the great inconvenience of having almost no access to education or modern technology.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Uhm, Elin detests their lack of privacy but I find it interesting. Noticeably, none of us can stand the great inconvenience of having almost no access to education or modern technology.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/lythuyet/28.mp3',
        ],
        [
          'What do you like about Mongolian nomadic life?',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> What do you like about Mongolian nomadic life?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit2/lesson6/ex3/1.mp3',
        ],
        // ["", "Listen, rewrite what you hear:", "Gợi ý:<br> ", ""],
      ],
    },
    {
      id: 'Unit3',
      className: 'Courses_item',
      image: './assets/img/Screenshot_20210503-120123_Gallery.jpg',
      minReq: 10,
      info: [
        // Từ vựng căn bản:
        [
          'Ethnic groups (peoples)',
          '(n) các dân tộc',
          'Gợi ý:<br> Ethnic groups (peoples)',
          'Hai_co_tam.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/1.mp3',
        ],
        [
          'Ethnic minority groups',
          '(n) các dân tộc thiểu số',
          'Gợi ý:<br> Ethnic minority groups',
          'Hatrang.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/2.mp3',
        ],
        [
          'Mountainous regions',
          'n: vùng núi',
          'Gợi ý:<br> Mountainous regions',
          'MisaCute.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/3.mp3',
        ],
        [
          'Account for',
          'v) chiếm',
          'Gợi ý:<br> Account for',
          'ChinBacNuiRung.jpg',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/4.mp3',
        ],
        [
          'Diverse',
          'adj) đa dạng',
          'Gợi ý:<br> Diverse',
          'PhotDoi.jpg',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/5.mp3',
        ],
        [
          'Majority',
          'n) đa số',
          'Gợi ý:<br> Majority',
          'Annotation 2022-10-01 180957.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/6.mp3',
        ],
        [
          'Minority',
          'n) thiểu số',
          'Gợi ý:<br> Minority',
          'Thanh_ngu.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/7.mp3',
        ],
        [
          'Gather',
          'v) tụ tập, tập trung',
          'Gợi ý:<br> Gather',
          'khaigiang8A6_2022.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/8.mp3',
        ],
        [
          'Museum of Ethnology',
          'n) bảo tàng dân tộc học',
          'Gợi ý:<br> Museum of Ethnology',
          'GVCN8A6_2022.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/9.mp3',
        ],
        [
          'Curious about',
          'adj) tò mò về',
          'Gợi ý:<br> Curious about ',
          'tapthe8A6.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/10.mp3',
        ],
        [
          'Customs',
          'n) phong tục',
          'Gợi ý:<br> Customs',
          'trungthu2022.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/11.mp3',
        ],
        [
          'Stilt house',
          'n) nhà sàn',
          'Gợi ý:<br> Stilt house',
          'Dai_Nhan.png',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/1.mp3',
        ],
        [
          'Communal house',
          'n) đình làng, nhà rông',
          'Gợi ý:<br> Communal house',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/2.mp3',
        ],
        [
          'Pagoda',
          'n) chùa',
          'Gợi ý:<br> Pagoda',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/3.mp3',
        ],
        [
          'Temple',
          'n) đền',
          'Gợi ý:<br> Temple',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/4.mp3',
        ],
        [
          'Ceremony',
          'n) nghi lễ',
          'Gợi ý:<br> Ceremony',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/5.mp3',
        ],
        [
          'Festival',
          'n) Lễ hội',
          'Gợi ý:<br> Festival ',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/6.mp3',
        ],
        [
          'Shawl',
          'n) Khăn phiêu',
          'Gợi ý:<br> Shawl',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/7.mp3',
        ],
        [
          'Waterwheel',
          'n) cối xay nước, cọn nước',
          'Gợi ý:<br> Waterwheel',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/8.mp3',
        ],
        [
          'Terraced field',
          'n: ruộng bậc thang',
          'Gợi ý:<br> Terraced field',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/9.mp3',
        ],
        [
          'Open-air market',
          'n: chợ ngoài trời',
          'Gợi ý:<br> Open-air market',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/10.mp3',
        ],
        [
          'Cultivation',
          'n) việc cày cấy, trồng trọt',
          'Gợi ý:<br> Cultivation',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/1.mp3',
        ],
        [
          'Plough',
          'v: Cày',
          'Gợi ý:<br> Plough',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/2.mp3',
        ],
        [
          'Five-coloured sticky rice',
          'n: xôi ngũ sắc',
          'Gợi ý:<br> Five-coloured sticky rice',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/3.mp3',
        ],
        [
          'Spin thread',
          'v.phr) kéo sợi',
          'Gợi ý:<br> Spin thread',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/4.mp3',
        ],
        [
          'Dye',
          'v: nhuộm',
          'Gợi ý:<br> Dye',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/5.mp3',
        ],
        [
          'Weave',
          'v) đan, dệt (vải, thảm, ...)',
          'Gợi ý:<br> Weave',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/6.mp3',
        ],
        [
          'Embroidery',
          'n) họa tiết thêu, vải thêu',
          'Gợi ý:<br> Embroidery',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/7.mp3',
        ],
        [
          'Worship',
          'v) thờ',
          'Gợi ý:<br> Worship',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/8.mp3',
        ],
        [
          'Ancestor',
          'n: tổ tiên',
          'Gợi ý:<br> Ancestor',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/9.mp3',
        ],
        // Cấu trúc ngữ pháp:
        ['Question word', '(How, When, Where, Why, What, Who, Whose, Which) gọi là gì?', 'Gợi ý:<br> Học lại đi', '3'],
        [
          'How, When, Where, Why, What, Who, Whose, Which',
          'Nêu những Question word cơ bản',
          'How, When, Where, Why, What, Who, Whose, Which',
          '3',
        ],
        ['Question word + V ...?', 'Công thức câu cơ bản với Question word', 'Gợi ý:<br> Question word + V ...?', '3'],
        [
          'Excited',
          'Điền từ trái nghĩa với: Bored',
          'Gợi ý:<br> Excited',
          'https://dic.tienganh123.com/sound/b/bore.mp3',
        ],
        [
          'Majority',
          'Điền từ trái nghĩa với: Minority',
          'Gợi ý:<br> Majority',
          'https://dic.tienganh123.com/sound/m/minority.mp3',
        ],
        [
          'Curious',
          'Điền từ trái nghĩa với: Incurious',
          'Gợi ý:<br> Curious',
          'https://dic.tienganh123.com/sound/i/incurious.mp3',
        ],
        [
          'traditional',
          'Điền từ trái nghĩa với: modern',
          'Gợi ý:<br> traditional',
          'https://dic.tienganh123.com/sound/m/modern.mp3',
        ],
        [
          'interesting',
          'Điền từ trái nghĩa với: boring',
          'Gợi ý:<br> interesting',
          'https://dic.tienganh123.com/sound/b/boring.mp3',
        ],
        [
          'simple',
          'Điền từ trái nghĩa với: complicated',
          'Gợi ý:<br> simple',
          'https://dic.tienganh123.com/sound/c/complicated.mp3',
        ],
        [
          'important',
          'Điền từ trái nghĩa với: insignificant',
          'Gợi ý:<br> important',
          'https://dic.tienganh123.com/sound/i/insignificant.mp3',
        ],
        [
          'mountainous',
          'Điền từ trái nghĩa với: flat',
          'Gợi ý:<br> mountainous',
          'https://dic.tienganh123.com/sound/f/flat.mp3',
        ],
        ['minor', 'Điền từ trái nghĩa với: major', 'Gợi ý:<br> minor', 'https://dic.tienganh123.com/sound/m/major.mp3'],
        [
          'diversity',
          'Nhập dạng danh từ: diverse',
          'Gợi ý:<br> diversity',
          'https://dic.tienganh123.com/sound/d/diverse.mp3',
        ],
        [
          'minority',
          'Nhập dạng danh từ: minor',
          'Gợi ý:<br> minority',
          'https://dic.tienganh123.com/sound/m/minor.mp3',
        ],
        [
          'culture',
          'Nhập dạng danh từ: cultural',
          'Gợi ý:<br> culture',
          'https://dic.tienganh123.com/sound/c/cultural.mp3',
        ],
        [
          'ethnology or ethnic or ethnicity',
          'Nhập dạng danh từ: ethnic',
          'Gợi ý:<br> ethnology or ethnic or ethnicity',
          'https://dic.tienganh123.com/sound/e/ethnic.mp3',
        ],
        [
          'tradition',
          'Nhập dạng danh từ: traditional',
          'Gợi ý:<br> tradition',
          'https://dic.tienganh123.com/sound/t/traditional.mp3',
        ],
        [
          'majority',
          'Nhập dạng danh từ: major',
          'Gợi ý:<br> majority',
          'https://dic.tienganh123.com/sound/m/major.mp3',
        ],

        [
          'Which ethnic group has the smallest population?',
          'Dịch câu: Dân tộc nào có dân số ít nhất?',
          'Gợi ý:<br> Which ethnic group has the smallest population?',
          '3',
        ],
        [
          'Câu hỏi có tân ngữ/ bổ ngữ/ trạng ngữ: là những câu hỏi bắt đầu bằng từ để hỏi theo sau bởi trợ động từ (be, do, have) hoặc động từ khuyết thiếu',
          'Công thức này là câu gì: Question word + aux./ modal + S + V …?',
          'Gợi ý:<br> Câu hỏi có tân ngữ/ bổ ngữ/ trạng ngữ: là những câu hỏi bắt đầu bằng từ để hỏi (How, When, Where, Why, What, Who, Whose, Which) theo sau bởi trợ động từ (be, do, have) hoặc động từ khuyết thiếu (should, could, may, ...) tiếp đến là chủ ngữ và động từ ở dạng nguyên thể.',
          '3',
        ],
        [
          'Where can we find terraced fields?',
          'Dịch câu: Chúng ta có thể tìm thấy ruộng bậc thang ở đâu?',
          'Gợi ý:<br> Where can we find terraced fields?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson4/lythuyet/2.mp3',
        ],
        [
          'Which of you have visited the Temple of Literature?',
          'Dịch câu: Ai trong số các em đã từng thăm quan Văn Miếu?',
          'Gợi ý:<br> Which of you have visited the Temple of Literature?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson4/lythuyet/3.mp3',
        ],
        [
          "Which dish do you prefer, 'pho' or 'bun cha'?",
          'Dịch câu: Em thích món ăn nào hơn, phở hay bún chả?',
          "Gợi ý:<br> Which dish do you prefer, 'pho' or 'bun cha'?",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson4/lythuyet/4.mp3',
        ],
        ['Yes/ No questions', 'Đây là loại câu gì: Aux./ Modal + S + V …?', 'Gợi ý:<br> Yes/ No questions', '3'],
        [
          'Yes, S + aux./ modal. or No, S + aux./ modal + not.',
          'Loại câu này (Aux./ Modal + S + V …?) có dạng trả lời ntn?',
          'Gợi ý:<br> Yes, S + aux./ modal. or  No, S + aux./ modal + not.',
          '3',
        ],
        [
          'Did they visit SaPa last month? Yes, they did',
          'Dịch và trả lời câu: Họ đi SaPa tháng trước phải không?',
          'Gợi ý:<br> Did they visit SaPa last month? Yes, they did',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson4/lythuyet/5.mp3',
        ],
        [
          'Which ethnic groups live mostly in the Central Highlands?',
          'Hoàn thành câu: ...ethnic groups live mostly in the Central Highlands?',
          // "Những dân tộc nào sống chủ yếu ở vùng Tây nguyên?",
          'Gợi ý:<br> Which ethnic groups live mostly in the Central Highlands?',
          '3',
        ],
        [
          'Why do the minority ethnic people seldom go to hospital?',
          'Hoàn thành câu: ...do the minority ethnic people seldom go to hospital?',
          // "Tại sao những người dân tộc thiểu số lại hiếm khi đi bệnh viện thế nhỉ?",
          'Gợi ý:<br> Why do the minority ethnic people seldom go to hospital?',
          '3',
        ],
        [
          "Why do you like to eat 'Thang Co' a dish of the H'mong?",
          "Hoàn thành câu: ...do you like to eat 'Thang Co' a dish of the H'mong?",
          // "Tại sao bạn lại thích ăn món "Thắng Cố" - một món ăn của người dân tộc H'Mông thế?",
          "Gợi ý:<br> Why do you like to eat 'Thang Co' a dish of the H'mong?",
          '3',
        ],
        [
          'What gifts do you often buy when you visit Ha Giang province?',
          'Hoàn thành câu: ...gifts do you often buy when you visit Ha Giang province? ',
          // "Bạn thường mua quà tặng gì khi tới thăm tỉnh Hà Giang?",
          'Gợi ý:<br> What gifts do you often buy when you visit Ha Giang province?',
          '3',
        ],
        [
          'How long does it take to travel from Hanoi to Sapa by train?',
          'Hoàn thành câu: ...does it take to travel from Hanoi to Sapa by train?',
          // "Đi tàu từ Hà Nội lên Sa Pa mất bao lâu?",
          'Gợi ý:<br> How long does it take to travel from Hanoi to Sapa by train?',
          '3',
        ],
        [
          'What age do the minority ethnic boys and girls often get married?',
          'Hoàn thành câu: ...age do the minority ethnic boys and girls often get married?',
          // "Con trai và con gái người dân tộc thiểu số thường kết hôn ở tuổi nào?",
          'Gợi ý:<br> What age do the minority ethnic boys and girls often get married?',
          '3',
        ],
        [
          'At the communal house.',
          'Trả lời câu sau: Where can I find the oldest person in your village?',
          'Gợi ý:<br> At the communal house.',
          '3',
        ],
        [
          'How should I go to Viet Nam Museum of Ethnology?',
          'Đặt câu hỏi cho câu trả lời sau: You should go by bus.',
          'Gợi ý:<br> How should I go to Viet Nam Museum of Ethnology?',
          '3',
        ],
        [
          'Whose costume is the simplest?',
          "Đặt câu hỏi cho câu trả lời sau: The Tay's",
          'Gợi ý:<br> Whose costume is the simplest?',
          '3',
        ],
        [
          'Do the minority ethnic people in Sapa speak English well?',
          'Đặt câu hỏi cho câu trả lời sau: Yes, they do.',
          'Gợi ý:<br> Do the minority ethnic people in Sapa speak English well?',
          '3',
        ],
        [
          'They represent the 5 elements of life.',
          'Trả lời câu sau: What do the colours of five-sticky rice represent?',
          'Gợi ý:<br> They represent the 5 elements of life.',
          '3',
        ],
        [
          'In the northwest of the house compound.',
          'Trả lời câu sau: Where is the kitchen located in the house compound?',
          'Gợi ý:<br> In the northwest of the house compound.',
          '3',
        ],
        [
          'The kitchen God.',
          'Trả lời câu sau: Who is believed to live in the kitchen?',
          'Gợi ý:<br> The kitchen God.',
          '3',
        ],
        [
          'Sweet.',
          'Trả lời câu sau: Which do the women NOT make offerings of to worship the kitchen?',
          'Gợi ý:<br> Sweet.',
          '3',
        ],
        [
          'The human mouth.',
          'Trả lời câu sau: What does the entrance of the kitchen symbolize?',
          'Gợi ý:<br> The human mouth.',
          '3',
        ],
        [
          'a + countable singular noun (phrase) starting with a consonant sound',
          'Sử dụng mạo từ (a) trong trường hợp nào?',
          'Gợi ý:<br> a + countable singular noun (phrase) starting with a consonant sound <br> Mạo từ a chỉ được sử dụng trước các (cụm) danh từ đếm được số ít và mang nghĩa là một, mỗi, từng hay bất kỳ. Đồng thời, từ đứng ngay sau a phải bắt đầu bằng một phụ âm.',
          '3',
        ],
        [
          'an + countable singular noun (phrase) starting with a vowel sound',
          'Sử dụng mạo từ (an) trong trường hợp nào?',
          'Gợi ý:<br> an + countable singular noun (phrase) starting with a vowel sound <br>Mạo từ an chỉ được sử dụng trước các (cụm) danh từ đếm được số ít và mang nghĩa là một, mỗi, từng hay bất kỳ. Đồng thời, từ đứng ngay sau an phải bắt đầu bằng một nguyên âm.',
          '3',
        ],
        [
          '1. the + noun (phrase) that is easily understood 2. the + noun (phrase) that has already been mentioned 3. the + noun (phrase) that is unique 4. the + superlative comparison',
          'Trường hợp nào dùng mạo từ (the) ?',
          'Gợi ý:<br> 1. the + noun (phrase) that is easily understood 2. the + noun (phrase) that has already been mentioned 3. the + noun (phrase) that is unique 4. the + superlative comparison <br>Mạo từ the đứng trước những (cụm) danh từ mà người đọc và người nghe đều dễ dàng biết được đối tượng mà nó nhắc đến. The cũng đứng trước (cụm) danh từ được nhắc đến trước đó hoặc (cụm) danh từ chỉ những khái niệm duy nhất. Đặc biệt, chúng ta luôn dùng the trước tính từ hoặc trạng từ ở dạng so sánh nhất.',
          '3',
        ],
        [
          'Viet Nam is the fatherland of many ethnic groups.',
          'Hoàn thành: Viet Nam is ... fatherland of many ethnic groups.',
          'Gợi ý:<br> Viet Nam is the fatherland of many ethnic groups.',
          '3',
        ],
        [
          'In the plain and midland, ethnic groups grow water rice, building the culture of villages and hamlets.',
          'Hoàn thành: In the plain and midland, ethnic groups grow water rice, building ... culture of villages and hamlets.',
          'Gợi ý:<br> In the plain and midland, ethnic groups grow water rice, building the culture of villages and hamlets.',
          '3',
        ],
        [
          'Among ethnic minorities, the largest ones are Tay, Thai, Muong, Hoa, Khmer, and Nung with a population of around 1 million each.',
          'Hoàn thành: Among ethnic minorities, the largest ones are Tay, Thai, Muong, Hoa, Khmer, and Nung with ... population of around 1 million each.',
          'Gợi ý:<br> Among ethnic minorities, the largest ones are Tay, Thai, Muong, Hoa, Khmer, and Nung with a population of around 1 million each.',
          '3',
        ],
        [
          'The most appropriate manner of greeting the Vietnamese is a gentle handshake and a smile.',
          'Hoàn thành: ... most appropriate manner of greeting ... Vietnamese is ... gentle handshake and a smile. ',
          'Gợi ý:<br> The most appropriate manner of greeting the Vietnamese is a gentle handshake and a smile.',
          '3',
        ],
        [
          "Waterwheels play an important role in many minority ethnic groups' lives.",
          "Hoàn thành: Waterwheels play ... important role in many minority ethnic groups' lives.",
          "Gợi ý:<br> Waterwheels play an important role in many minority ethnic groups' lives.",
          '3',
        ],
        [
          'Đã đọc tối thiểu 3 lần',
          'Dạng câu: (Alternative questions?) được trả lời ntn?',
          'Gợi ý:<br> Đã đọc tối thiểu 3 lần: Với dạng câu hỏi lựa chọn (trong câu hỏi thường có từ or đứng giữa các lựa chọn), câu trả lời thường theo 3 cách. Cách thứ nhất, nêu tên các lựa chọn. Cách thứ hai, đồng ý với tất cả các lựa chọn bằng cách dùng các từ như: Both, Both of them, .... Cách thứ ba, từ chối tất cả các lựa chọn bằng cách dùng các từ như: Neither, None of them, ....',
          '3',
        ],
        [
          'How many ethnic groups are there in Viet Nam?',
          'Listen, rewrite what you hear:',
          // "Có bao nhiêu dân tộc ở Việt Nam?",
          'Gợi ý:<br> How many ethnic groups are there in Viet Nam?',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/1-1.mp3',
        ],
        [
          'The majority of the other 53 ethnic minority groups gather in the mountainous regions.',
          'Listen, rewrite what you hear:',
          // "Phần lớn 53 dân tộc thiểu số còn lại sống tập trung ở các vùng núi.",
          'Gợi ý:<br> The majority of the other 53 ethnic minority groups gather in the mountainous regions.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/2-1.mp3',
        ],
        [
          "Most of the H'mong people live in the mountainous regions.",
          'Listen, rewrite what you hear:',
          // "Phần lớn người dân tộc H'Mông sống ở các vùng núi.",
          "Gợi ý:<br> Most of the H'mong people live in the mountainous regions.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/3-1.mp3',
        ],
        [
          "Most of the H'mong people live in the mountainous regions.",
          'Listen, rewrite what you hear:',
          // "Phần lớn người dân tộc H'Mông sống ở các vùng núi.",
          "Gợi ý:<br> Most of the H'mong people live in the mountainous regions.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/3-1.mp3',
        ],
        [
          'There are 54 ethnic groups in Viet Nam among which Kinh people account for 86% of the population.',
          'Listen, rewrite what you hear:',
          // "Có 54 dân tộc ở Việt Nam, trong đó dân tộc kinh chiếm 86% tổng dân số.",
          'Gợi ý:<br> There are 54 ethnic groups in Viet Nam among which Kinh people account for 86% of the population.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/4-1.mp3',
        ],
        [
          'How diverse!',
          'Listen, rewrite what you hear:',
          // "Đa dạng thế!",
          'Gợi ý:<br> How diverse!',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/5-1.mp3',
        ],
        [
          'The majority of the other 53 ethnic minority groups gather in the mountainous regions.',
          'Listen, rewrite what you hear:',
          // "Phần lớn 53 dân tộc thiểu số còn lại sống tập trung ở các vùng núi.",
          'Gợi ý:<br> The majority of the other 53 ethnic minority groups gather in the mountainous regions.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/6-1.mp3',
        ],
        [
          'The Odu ethnic minority group has the smallest population in Viet Nam.',
          'Listen, rewrite what you hear:',
          // "Dân tộc thiểu số Ơ Đu là dân tộc có dân số ít nhất ở Việt Nam.",
          'Gợi ý:<br> The Odu ethnic minority group has the smallest population in Viet Nam.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/7-1.mp3',
        ],
        [
          'In the Central Highlands the Cham, Khmer, Ede mostly gather.',
          'Listen, rewrite what you hear:',
          // "Người dân tộc Chăm, Khơ Me, Ê Đê ... tập trung chủ yếu ở vùng Tây Nguyên.",
          'Gợi ý:<br> In the Central Highlands the Cham, Khmer, Ede mostly gather.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/8-1.mp3',
        ],
        [
          "If you are curious about the ethnic peoples' customs and cultures, visit Viet Nam Museum of Ethnology.",
          'Listen, rewrite what you hear:',
          // "Nếu bạn tò mò về phong tục và văn hóa của các dân tộc, hãy tới thăm bảo tàng dân tộc học Việt Nam.",
          "Gợi ý:<br> If you are curious about the ethnic peoples' customs and cultures, visit Viet Nam Museum of Ethnology.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/9-1.mp3',
        ],
        [
          "The foreign visitors are always curious about the locals' daily lives.",
          'Listen, rewrite what you hear:',
          // "Du khách nước ngoài luôn tò mò về cuộc sống hàng ngày của những người dân địa phương.",
          "Gợi ý:<br> The foreign visitors are always curious about the locals' daily lives.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/10-1.mp3',
        ],
        [
          'Each ethnic group has their own customs.',
          'Listen, rewrite what you hear:',
          // "Mỗi dân tộc có phong tục riêng của họ.",
          'Gợi ý:<br> Each ethnic group has their own customs.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson1/vocab/audio/11-1.mp3',
        ],
        [
          'Stilt houses are often made from wood, bamboo and cane.',
          'Listen, rewrite what you hear:',
          // "Những ngôi nhà sàn thường được dựng từ gỗ, tre và trúc.",
          'Gợi ý:<br> Stilt houses are often made from wood, bamboo and cane.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/1-1.mp3',
        ],
        [
          'Communal houses combine the role of a village meeting house and a place of worship.',
          'Listen, rewrite what you hear:',
          // "Đình làng mang vai trò như một nơi tụ họp của cả làng và cũng là nơi thờ cúng.",
          'Gợi ý:<br> Communal houses combine the role of a village meeting house and a place of worship.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/2-1.mp3',
        ],
        [
          'The One Pillar Pagoda has unique architecture.',
          'Listen, rewrite what you hear:',
          // "Ngôi chùa một cột mang kiến trúc rất độc đáo.",
          'Gợi ý:<br> The One Pillar Pagoda has unique architecture.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/3-1.mp3',
        ],
        [
          'Hanoi is famous for Ngoc Son temple. ',
          'Listen, rewrite what you hear:',
          //  "Hà Nội nổi tiếng với địa danh đền Ngọc Sơn.",
          'Gợi ý:<br> Hanoi is famous for Ngoc Son temple. ',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/4-1.mp3',
        ],
        [
          'Red Dao ethnic people in Yen Bai mountainous province are playing music at a wedding ceremony.',
          'Listen, rewrite what you hear:',
          //  "Một nhóm người dân tộc Dao đỏ ở tỉnh miền núi Yên Bái đang chơi nhạc trong một lễ cưới.",
          'Gợi ý:<br> Red Dao ethnic people in Yen Bai mountainous province are playing music at a wedding ceremony.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/5-1.mp3',
        ],
        [
          'Festivals in different regions of Viet Nam show our multicultural society.',
          'Listen, rewrite what you hear:',
          // "Các lễ hội ở những vùng miền khác nhau trên đất nước Việt Nam của chúng ta thể hiện một xã hội đa văn hóa.",
          'Gợi ý:<br> Festivals in different regions of Viet Nam show our multicultural society.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/6-1.mp3',
        ],
        [
          'Black Thai women often wear the shawl.',
          'Listen, rewrite what you hear:',
          // "Phụ nữ dân tộc Thái đen thường đội khăn piêu.",
          'Gợi ý:<br> Black Thai women often wear the shawl.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/7-1.mp3',
        ],
        [
          'Visiting Cao Bang province, you will see a lot of waterwheels on rivers.',
          'Listen, rewrite what you hear:',
          //  "Đến thăm tỉnh Cao Bằng, các em sẽ thấy rất nhiều cọn nước trên các dòng sông.",
          'Gợi ý:<br> Visiting Cao Bang province, you will see a lot of waterwheels on rivers.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/8-1.mp3',
        ],
        [
          'The terraced fields in Sa Pa look like a picture of nature with great beauty.',
          // "Ruộng bậc thang ở Sa Pa trông như bức tranh thiên nhiên mang vẻ đẹp hùng vĩ.",
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> The terraced fields in Sa Pa look like a picture of nature with great beauty.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/9-1.mp3',
        ],
        [
          'Most of the open-air markets of ethnic peoples start in the early morning.',
          'Listen, rewrite what you hear:',
          //  "Hầu hết các phiên chợ ngoài trời của bà con dân tộc thiểu số bắt đầu từ sáng sớm",
          'Gợi ý:<br> Most of the open-air markets of ethnic peoples start in the early morning.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson2/vocab/audio/10-1.mp3',
        ],

        [
          'Wet rice cultivation is common in Viet Nam.',
          'Listen, rewrite what you hear:',
          // "Trồng lúa nước rất phổ biến ở Việt Nam.",
          'Gợi ý:<br> Wet rice cultivation is common in Viet Nam.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/1-1.mp3',
        ],
        [
          "They often hold the ploughing and rice planting competition in 'Long tong' festival.",
          'Listen, rewrite what you hear:',
          // "Họ thường tổ chức cuộc thi cày và cấy lúa trong lễ hội 'Lồng Tồng'",
          "Gợi ý:<br> They often hold the ploughing and rice planting competition in 'Long tong' festival.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/2-1.mp3',
        ],
        [
          'They often cook five-coloured sticky rice for the Tet celebration.',
          'Listen, rewrite what you hear:',
          // "Họ thường nấu xôi ngũ sắc để ăn Tết.",
          'Gợi ý:<br> They often cook five-coloured sticky rice for the Tet celebration.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/3-1.mp3',
        ],
        [
          'They spin thread, dye it dark indigo and weave cloth with a little embroidery.',
          'Listen, rewrite what you hear:',
          // "Họ quay sợi, nhuộm sợi màu chàm và dệt những tấm vải với rất ít họa tiết thêu.",
          'Gợi ý:<br> They spin thread, dye it dark indigo and weave cloth with a little embroidery.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/4-1.mp3',
        ],
        [
          'He dyed his hair gray.',
          'Listen, rewrite what you hear:',
          // "Anh ấy đã nhuộm tóc thành màu hoa râm.",
          'Gợi ý:<br> He dyed his hair gray.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/5-1.mp3',
        ],
        [
          'Those minority ethnic girls are skilled at spinning and weaving.',
          'Listen, rewrite what you hear:',
          // "Những cô gái dân tộc thiểu số ấy rất thành thục quay sợi và dệt vải.",
          'Gợi ý:<br> Those minority ethnic girls are skilled at spinning and weaving.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/6-1.mp3',
        ],
        [
          "H'mong colourful traditional costumes are decorated with a lot of embroidery.",
          'Listen, rewrite what you hear:',
          // "Trang phục truyền thống sặc sỡ của người dân tộc H'Mông được trang trí với rất nhiều họa tiết thêu.",
          "Gợi ý:<br> H'mong colourful traditional costumes are decorated with a lot of embroidery.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/7-1.mp3',
        ],
        [
          'They worship their ancestors and the Gods of natural environment.',
          'Listen, rewrite what you hear:',
          // "Họ thờ tổ tiên và các vị thần thiên nhiên.",
          'Gợi ý:<br> They worship their ancestors and the Gods of natural environment.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/8-1.mp3',
        ],
        [
          'They worship their ancestors and the Gods of natural environment.',
          'Listen, rewrite what you hear:',
          // "Họ thờ tổ tiên và các vị thần thiên nhiên.",
          'Gợi ý:<br> They worship their ancestors and the Gods of natural environment.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson6/lythuyet/audio/9-1.mp3',
        ],

        [
          'Now, I would like to talk about the Cham people.',
          'Listen, rewrite what you hear: ',
          // "Bây giờ, tôi muốn trình bày về dân tộc chăm.",
          'Gợi ý:<br> Now, I would like to talk about the Cham people.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/1.mp3',
        ],
        [
          'Have you ever talked to a Cham person? Well, there are many interesting things about this ethnic group that I want to share with you.',
          'Listen, rewrite what you hear: ',
          // "Các bạn đã bao giờ nói chuyện với 1 người dân tộc Chăm chưa? Dân tộc này có nhiều điều thú vị mà tôi muốn chia sẻ với các bạn sau đây.",
          'Gợi ý:<br> Have you ever talked to a Cham person? Well, there are many interesting things about this ethnic group that I want to share with you.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/2.mp3',
        ],
        [
          "I was really impressed by the folk dance of the Cham people. That's why I read more about them and here is some information I would like to tell you.",
          'Listen, rewrite what you hear: ',
          // "Tôi đã rất ấn tượng với điệu múa dân gian của người dân tộc Chăm. Do đó, tôi đã đọc nhiều hơn về họ và sau đây là 1 số thông tin tôi muốn chia sẻ cùng các bạn.",
          "Gợi ý:<br> I was really impressed by the folk dance of the Cham people. That's why I read more about them and here is some information I would like to tell you.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/3.mp3',
        ],
        [
          'With a population of 162 thousand, the Cham gather mainly in southern provinces such as Ninh Thuan, Binh Thuan, Dong Nai and Tay Ninh.',
          'Listen, rewrite what you hear: ',
          // "Với dân số 162 nghìn người, dân tộc Chăm sống tập trung chủ yếu ở các tỉnh miền Nam như Ninh Thuận, Bình Thuận, Đồng Nai và Tây Ninh.",
          'Gợi ý:<br> With a population of 162 thousand, the Cham gather mainly in southern provinces such as Ninh Thuan, Binh Thuan, Dong Nai and Tay Ninh.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/6.mp3',
        ],
        [
          'The Cham have a population of nearly 162 thousand people living in the provinces of Ninh Thuan, Binh Thuan, Dong Nai and Tay Ninh.',
          'Listen, rewrite what you hear: ',
          // "Dân tộc Chăm có dân số gần 162 nghìn người sống ở các tỉnh Ninh Thuận, Bình Thuận, Đồng Nai và Tây Ninh.",
          'Gợi ý:<br> The Cham have a population of nearly 162 thousand people living in the provinces of Ninh Thuan, Binh Thuan, Dong Nai and Tay Ninh.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/7.mp3',
        ],
        [
          'Their language belongs to the Malayo-Polynesian group.',
          'Listen, rewrite what you hear: ',
          // "Ngôn ngữ của họ thuộc ngữ hệ Nam đảo.",
          'Gợi ý:<br> Their language belongs to the Malayo-Polynesian group.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/8.mp3',
        ],
        [
          'The Cham language belongs to the Malayo-Polynesian group.',
          'Listen, rewrite what you hear: ',
          // "Ngôn ngữ của người Chăm thuộc ngữ hệ Nam đảo.",
          'Gợi ý:<br> The Cham language belongs to the Malayo-Polynesian group.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/9.mp3',
        ],
        [
          'Well, their production activities are rather diverse. Like most other groups in Viet Nam, they cultivate wet rice. Besides that, they also fish and make handicrafts. I was impressed by their hand-made pottery and I adored their silk.',
          'Listen, rewrite what you hear: ',
          // "À, hoạt động sản xuất của họ khá đa dạng. Giống như hầu hết các dân tộc ở Việt Nam, họ trồng lúa nước. Bên cạnh đó, họ cũng đánh bắt cá và làm đồ thủ công. Tôi đã ấn tượng với đồ gốm thủ công của họ và tôi thích vải lụa của họ.",
          'Gợi ý:<br> Well, their production activities are rather diverse. Like most other groups in Viet Nam, they cultivate wet rice. Besides that, they also fish and make handicrafts. I was impressed by their hand-made pottery and I adored their silk.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/14.mp3',
        ],
        [
          'Their production activities include: cultivating wet rice, fishing and making handicrafts. The Cham are famous for their silk and hand-made pottery.',
          'Listen, rewrite what you hear: ',
          // "Hoạt động sản xuất của họ bao gồm: trồng lúa nước, đánh bắt cá và làm đồ thủ công. Người Chăm nổi tiếng với vải lụa và đồ gốm làm bằng tay.",
          'Gợi ý:<br> Their production activities include: cultivating wet rice, fishing and making handicrafts. The Cham are famous for their silk and hand-made pottery.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/15.mp3',
        ],
        [
          'The Cham have a tradition of wet rice cultivation. They are also experienced in fishing and making handicrafts, especially silk and hand-made pottery.',
          'Listen, rewrite what you hear: ',
          // "Người Chăm có truyền thống trồng lúa nước. Họ cũng có nhiều kinh nghiệm trong đánh bắt cá và làm đồ thủ công, đặc biệt là vải lụa và đồ gốm làm bằng tay.",
          'Gợi ý:<br> The Cham have a tradition of wet rice cultivation. They are also experienced in fishing and making handicrafts, especially silk and hand-made pottery.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/16.mp3',
        ],
        [
          'Every year, they hold the Kate festival to commemorate the dead and honour heroes in the Cham community. Various agricultural ceremonies are performed during the year for a new canal, for young rice and for so many other occasions.',
          'Listen, rewrite what you hear: ',
          // "Hàng năm, họ tổ chức lễ hội Ka-tê để tưởng nhớ những người đã khuất và vinh danh những người anh hùng trong cộng đồng người Chăm. Các nghi lễ nông nghiệp khác nhau cũng được tổ chức trong suốt cả năm vào dịp mừng 1 con kênh mới, mừng lúa non và rất nhiều các dịp khác nữa.",
          'Gợi ý:<br> Every year, they hold the Kate festival to commemorate the dead and honour heroes in the Cham community. Various agricultural ceremonies are performed during the year for a new canal, for young rice and for so many other occasions.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/lythuyet/19.mp3',
        ],
        [
          'population',
          'With the ... of about 400, the Brau people is one of the least populous groups in Viet Nam. ',
          // "Với dân số khoảng 400 người, dân tộc Brâu là một trong những dân tộc ít dân nhất ở Việt Nam.",
          'Gợi ý:<br> population',
          '',
        ],
        [
          'gather or live',
          'Hoàn thành: Most Brau people ... in Dac Me village, Bo Y commune, Ngoc Hoi district, Kon Tum province. ',
          // "Hầu hết người Brâu sống ở làng Đắc Mế, xã Bờ Y, huyện Ngọc Hồi, tỉnh Kon Tum.",
          'Gợi ý:<br> gather or live',
          '',
        ],
        [
          'belongs',
          'Hoàn thành: The Brau speak Brao which ... to Mon-Khmer language group.',
          // "Dân tộc Brâu nói tiếng Brao một ngôn ngữ thuộc nhóm Môn-Khơ Me.",
          'Gợi ý:<br> belongs',
          '',
        ],

        [
          'grow or cultivate or plant',
          'Hoàn thành: Leading a nomadic life, the Brau ... rice and corn using simple tools like digging sticks.',
          // "Sống cuộc sống du mục, người Brâu trồng lúa và ngô sử dụng những công cụ thô sơ ví dụ như gậy đào lỗ tra hạt.",
          'Gợi ý:<br> grow or cultivate or plant',
          '',
        ],
        [
          'festival',
          "Hoàn thành: The most important ... in the year of the Brau is the 'new rice' celebration after each harvest time.",
          // "Lễ hội quan trọng nhất trong năm của người Brâu là lễ mừng cơm mới sau mỗi mùa thu hoạch.",
          'Gợi ý:<br> festival',
          '',
        ],
        [
          'Around 1,200,000 people.',
          'Trả lời: What is the population of the Hoa in Viet Nam?',
          '',
          'Gợi ý:<br> Around 1,200,000 people.',
          '',
        ],
        [
          'They gather mainly in Lam Dong province.',
          'Trả lời: Where do the Churu mainly live?',
          'Gợi ý:<br> They gather mainly in Lam Dong province.',
          '',
          '',
        ],
        [
          'It belongs to Mon Khmer group.',
          'Trả lời: Which group does Ba Na language belong to?',
          'Gợi ý:<br> It belongs to Mon Khmer group.',
          '',
          '',
        ],
        [
          'It is at the end of Lunar November or December.',
          "Trả lời: When is New Year holiday for the H'mong people?",
          'Gợi ý:<br> It is at the end of Lunar November or December.',
          '',
          '',
        ],
        [
          "To show the Pa Then's strength and wish to conquer nature, send bad spirits away and bring them peace.",
          'Trả lời: Why do the Pa Then celebrate fire jumping festival?',
          "Gợi ý:<br> To show the Pa Then's strength and wish to conquer nature, send bad spirits away and bring them peace.",
          '',
          '',
        ],
        [
          'Have you ever talked to a Cham person? Well, there are many fascinating things about this ethnic group that I want to share with you. ',
          'Listen, rewrite what you hear: ',
          'Gợi ý:<br> Have you ever talked to a Cham person? Well, there are many fascinating things about this ethnic group that I want to share with you. ',
          '',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/ex4/1.mp3',
        ],
        [
          'The Cham have a population of about 162 thousand inhabitants living in the provinces of Ninh Thuan, Binh Thuan, Dong Nai and Tay Ninh.',
          'Listen, rewrite what you hear: ',
          'Gợi ý:<br> The Cham have a population of about 162 thousand inhabitants living in the provinces of Ninh Thuan, Binh Thuan, Dong Nai and Tay Ninh.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/ex4/2.mp3',
          '',
        ],
        [
          'Their language belongs to the Malayo-Polynesian group.',
          'Listen, rewrite what you hear: ',
          'Gợi ý:<br> Their language belongs to the Malayo-Polynesian group.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/ex4/3.mp3',
          '',
        ],
        [
          'The Cham have a tradition of wet rice cultivation. They are also experienced in fishing and making handicrafts, especially silk and hand-made pottery.',
          'Listen, rewrite what you hear: ',
          'Gợi ý:<br> The Cham have a tradition of wet rice cultivation. They are also experienced in fishing and making handicrafts, especially silk and hand-made pottery.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/ex4/4.mp3',
          '',
        ],
        [
          'Every year, they hold the Kate festival to commemorate the dead and honour heroes in the Cham community. Various agricultural ceremonies are performed during the year for a new canal, for young rice and for so many other occasions.',
          'Listen, rewrite what you hear: ',
          'Gợi ý:<br> Every year, they hold the Kate festival to commemorate the dead and honour heroes in the Cham community. Various agricultural ceremonies are performed during the year for a new canal, for young rice and for so many other occasions.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/ex4/5.mp3',
          '',
        ],
        [
          "Personally, I find the Cham ethnic people very interesting. Experience their way of life if possible, it's worth your time",
          'Listen, rewrite what you hear: ',
          "Gợi ý:<br> Personally, I find the Cham ethnic people very interesting. Experience their way of life if possible, it's worth your time",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson7/ex4/6.mp3',
          '',
        ],
        [
          'false',
          'Listen, confirm true or false: <br> Five-coloured sticky rice is a popular dish in Southern Viet Nam.',
          'Gợi ý:<br> Trả lời Đúng hoặc Sai bằng English',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson8/ex1/1.mp3',
          '',
        ],
        [
          'false',
          'Listen, confirm true or false: <br>  The dish is in nine colours.',
          'Gợi ý:<br> Trả lời Đúng hoặc Sai bằng English',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson8/ex1/1.mp3',
          '',
        ],
        [
          'true',
          'Listen, confirm true or false: <br> Each of the colours represents an important element of life.',
          'Gợi ý:<br> Trả lời Đúng hoặc Sai bằng English',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson8/ex1/1.mp3',
          '',
        ],
        [
          'false',
          'Listen, confirm true or false: <br> Those elements are believed to create perfect harmony for heaven, earth and animals.',
          'Gợi ý:<br> Trả lời Đúng hoặc Sai bằng English',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson8/ex1/1.mp3',
          '',
        ],
        [
          'true',
          'Listen, confirm true or false: <br> They often prepare this dish to celebrate Tet holiday.',
          'Gợi ý:<br> Trả lời Đúng hoặc Sai bằng English',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson8/ex1/1.mp3',
          // "",
        ],
        [
          'This is a very easy dish to make.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> This is a very easy dish to make.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson9/lythuyet/1.mp3',
          // "Đây là một món ăn rất dễ làm.",
        ],
        [
          'Try this delicious recipe.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Try this delicious recipe.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson9/lythuyet/2.mp3',
          // "Hãy thử công thức nấu ăn ngon tuyệt này.",
        ],
        [
          "It is very simple to make 'Xoi Gac' the unique red sticky rice if you follow these steps.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> It is very simple to make 'Xoi Gac' the unique red sticky rice if you follow these steps.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson9/lythuyet/3.mp3',
          // "Làm món 'Xôi Gấc' rất đơn giản nếu bạn thực hiện theo những bước sau.",
        ],
        [
          'Once the rice is drained, add the salt.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Once the rice is drained, add the salt.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson9/lythuyet/4.mp3',
          // "Khi gạo đã được để ráo, hãy bỏ thêm chút muối."
        ],
        [
          'After the rice is drained, add the salt.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> After the rice is drained, add the salt.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson9/lythuyet/5.mp3',
          // "Sau khi gạo được để ráo, hãy cho thêm muối."
        ],
        [
          'Before adding the salt, drain the rice.',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Before adding the salt, drain the rice.',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson9/lythuyet/6.mp3',
          // "Trước khi thêm muối, hãy để ráo gạo."
        ],
        [
          'Serve this dish with ...',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Trong phần kết cuối cùng, thường chúng ta sẽ miêu tả cách trình bày món ăn khi đã hoàn thành. Có thể sử dụng các cụm từ như: Serve this dish with ...',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson9/lythuyet/7.mp3',
          // ""
        ],
        [
          'This dish is delicious with ...',
          'Listen, rewrite what you hear:',
          'Gợi ý:<br> Trong phần kết cuối cùng, thường chúng ta sẽ miêu tả cách trình bày món ăn khi đã hoàn thành. Có thể sử dụng các cụm từ như: This dish is delicious with ...',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson9/lythuyet/8.mp3',
          // ""
        ],
        [
          "It is very simple to make 'Xoi Gac' the unique red sticky rice if you follow these steps. First, rinse and then soak the sticky rice in water. After 6 to 8 hours, drain the rice well. Next, add the white wine to the “gac” seeds before you squish and squeeze them tightly. Then, mix the sticky rice, the “gac” seeds and some salt together thoroughly and wait for 10 minutes. The next step is to steam the mixture for at least 30 minutes. Remember to check if it is fully cooked before gently mixing in the sugar and coconut milk. After steaming it for 5 more minutes, you now can serve this delicious dish with some shredded coconut.",
          'Listen, rewrite what you hear:',
          "Gợi ý:<br> It is very simple to make 'Xoi Gac' the unique red sticky rice if you follow these steps. First, rinse and then soak the sticky rice in water. After 6 to 8 hours, drain the rice well. Next, add the white wine to the “gac” seeds before you squish and squeeze them tightly. Then, mix the sticky rice, the “gac” seeds and some salt together thoroughly and wait for 10 minutes. The next step is to steam the mixture for at least 30 minutes. Remember to check if it is fully cooked before gently mixing in the sugar and coconut milk. After steaming it for 5 more minutes, you now can serve this delicious dish with some shredded coconut.",
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit3/lesson9/lythuyet/9.mp3',
          // ""
        ],
        [
          'What is Black Thai ethnic cuisine famous for?',
          'Viết lại câu sau: What is Black Thai ethnic cuisine famous for?',
          'Gợi ý:<br> What is Black Thai ethnic cuisine famous for?',
          '',
          '',
        ],
        [
          'What is stored and served in large earthen jars?',
          'Viết lại câu sau: What is stored and served in large earthen jars?',
          'Gợi ý:<br> ',
          '',
          '',
        ],
        [
          "Where can I find restaurants serving the best dishes of 'carried-under-arm' pig? or Where can we find restaurants serving the best dishes of 'carried-under-arm' pig?",
          "Viết lại câu sau: Where can I find restaurants serving the best dishes of 'carried-under-arm' pig? or Where can we find restaurants serving the best dishes of 'carried-under-arm' pig?",
          'Gợi ý:<br> ',
          '',
          '',
        ],
        [
          'Who usually catch the frog for food in the forest when night falls?',
          'Viết lại câu sau: Who usually catch the frog for food in the forest when night falls?',
          'Gợi ý:<br> ',
          '',
          '',
        ],
        [
          "Why is the Coho's food often served dry?",
          "Viết lại câu sau: Why is the Coho's food often served dry?",
          'Gợi ý:<br> ',
          '',
          '',
        ],
        [
          'Most of the community activities take place at the communal houses',
          'Hoàn thành câu: Most of the community activities take place at the ...',
          'Gợi ý:<br> Most of the community activities take place at the communal houses',
          '',
          '',
        ],
        [
          'To prepare for the traditional Vietnamese wedding, people often choose a date and time for the marriage ceremony.',
          'Hoàn thành câu: To prepare for the traditional Vietnamese wedding, people often choose a date and time for the marriage ...',
          'Gợi ý:<br> To prepare for the traditional Vietnamese wedding, people often choose a date and time for the marriage ceremony.',
          '',
          '',
        ],
        [
          'Khmer people have a unique cultural heritage which is their traditional dances.',
          'Hoàn thành câu: Khmer people have a unique cultural heritage which is their ...',
          'Gợi ý:<br> Khmer people have a unique cultural heritage which is their traditional dances.',
          '',
          '',
        ],
        [
          'Dak Lak is the most ethnically diverse province with 44 different ethnic groups.',
          'Hoàn thành câu: Dak Lak is the most ethnically ... with 44 different ethnic groups.',
          'Gợi ý:<br> Dak Lak is the most ethnically diverse province with 44 different ethnic groups.',
          '',
          '',
        ],
        [
          'September and October is the most beautiful time to enjoy the fairy scene of terraced fields in Hoang Su Phi, Ha Giang.',
          'Hoàn thành câu: September and October is the most beautiful time to enjoy the fairy scene of ... in Hoang Su Phi, Ha Giang.',
          'Gợi ý:<br> September and October is the most beautiful time to enjoy the fairy scene of terraced fields in Hoang Su Phi, Ha Giang.',
          '',
          '',
        ],
        [
          'Ethnic minorities account for nearly 15 percent of the population in Vietnam.',
          'Hoàn thành câu: ... account for nearly 15 percent of the population in Vietnam.',
          'Gợi ý:<br> Ethnic minorities account for nearly 15 percent of the population in Vietnam.',
          '',
          '',
        ],
        [
          'Two small bedrooms. or Two small bedrooms are on either side of the common room.',
          'Trả lời câu: What are on either side of the common room?',
          'Gợi ý:<br> Two small bedrooms. or Two small bedrooms are on either side of the common room.',
          '',
          '',
        ],
        [
          "The head of the house's. or The head of the house's is on the left side of the great room.",
          'Trả lời câu: Whose bedroom is on the left side of the great room?',
          "Gợi ý:<br> The head of the house's. or The head of the house's is on the left side of the great room.",
          '',
          '',
        ],
        [
          "Father-in-law and older brothers-in-law. or Father-in-law and older brothers-in-law are not allowed to enter the couple's room.",
          "Trả lời câu: Who is not allowed to enter the couple's room?",
          "Gợi ý:<br> Father-in-law and older brothers-in-law. or Father-in-law and older brothers-in-law are not allowed to enter the couple's room.",
          '',
          '',
        ],
        [
          "After the funeral. or They return to their bedroom, or move to the parents' bedroom after the funeral.",
          "Trả lời câu: When do the couple return to their bedroom, or move to the parents' bedroom if they are the oldest son and daughter-in-law?",
          "Gợi ý:<br> After the funeral. or They return to their bedroom, or move to the parents' bedroom after the funeral.",
          '',
          '',
        ],
        [
          "In the common room. or They will sleep in the common room. or They'll sleep in the common room.",
          'Trả lời câu: Where will their widowed mother or father sleep?',
          "Gợi ý:<br> In the common room. or They will sleep in the common room. or They'll sleep in the common room.",
          '',
          '',
        ],

        // ["", "", "Gợi ý:<br> ", "", ""],
        // // ['0', '1', '2', '', '4', '5', '6'],
      ],
    },
    {
      id: 'Giữa_kỳI',
      className: 'Courses_item',
      image: './assets/img/HiepPhan.png',
      minReq: 3,
      info: [
        [
          'The president ap proved the program to protect ze bras.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson3/ex3/4.mp3',
          'Gợi ý:<br>  The president ap proved the program to protect ze bras.',
        ],
        [
          'The pretty princess prefers broccoli to brown bread for breakfast',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson3/ex3/5.mp3',
          'Gợi ý:<br> The pretty princess prefers broccoli to brown bread for breakfast',
        ],
        [
          'I like skateboarding/ to skateboard in my free time.',
          'Listen, rewrite what you hear:',
          'https://www.tienganh123.com/file/phothong/lop8-moi/unit1/lesson4/ly-thuyet/1-1.mp3',
          'Gợi ý:<br> I like skateboarding/ to skateboard in my free time.',
        ],
      ],
    },
  ],
  renderUnit: function () {
    const htmls = this.unitCourses.map((unitItem) => {
      return `
        <div id="${unitItem.id}" class="${unitItem.className}">
          <div class="list_avatar">
            <img src="${unitItem.image}" alt="${unitItem.id}" class="App_avatar" />
          </div>
          <span class="courseName">EngLish 8A6 ${unitItem.id}</span>
        </div>;
      `;
    });
    unitList.innerHTML = htmls.join('');
  },
  Start: function () {
    this.renderUnit();
  },

  unitCoursesArr: function (questionId) {
    minRequirements = 0;
    this.unitCourses.map((unitCourse) => {
      if (questionId === unitCourse.id) {
        Units = unitCourse.info;
        minRequirements = unitCourse.minReq;
        questionId === unitCourse.id;
      }
    });
    return Units;
  },
};

var songs = [
  'Lười học thì chóng làm quan',
  'Luyện mãi thành tài, miệt mài tất giỏi',
  'Sai rồi! Cố gắng lên con',
  'Gần đúng rồi bạn, Cố lên nào',
  'Học thầy chẳng tày học bạn.',
  'Ngu dốt là tội ác, là giặc',
  'Có học mới biết, có đi mới đến.',
  'Học là học đạo làm người <br> Con đừng lêu lổng kẻ cười người chê.',
  'The eye sees only what the mind is prepared to comprehend.',
  'Learn from yesterday, live for today, hope for tomorrow.',
  'Being ignorant is not so much a shame, as being unwilling to learn.',
  'Ngu dốt là tội ác, là giặc',
];
