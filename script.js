const clockDiv = document.getElementById("nowTime");
const todayDiv = document.getElementById("today");
const timerDiv = document.getElementById("timer");
const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const resetButton = document.getElementById("reset");

//시계
function getDay() {
    let now = new Date();
    let year = now.getFullYear(); //년도
    let month = number(now.getMonth() + 1); //달 1-12, getMonth 에서 0 = 1월, 1 = 2월
    let date = number(now.getDate()); //날짜 1-31
    let dayNumber = now.getDay(); //요일 1-7
    const dayList = ["일", "월", "화", "수", "목", "금", "토"];
    let day = dayList[dayNumber]; //배열은 0부터 숫자를 셈

    todayDiv.textContent = year + "-" + month + "-" + date + " " + day;
}

function getTime() {
    let now = new Date();
    let hour = number(now.getHours()); //시 0-23
    let minute = number(now.getMinutes()); //분 0-59
    let second = number(now.getSeconds()); //초 0-59
    let noon = "AM"; //오전 오후 구분

    //0시는 12시로 변경
    if (now.getHours() == 0) {
        hour = 12;
    }

    //오전 오후 구분
    if (now.getHours() >= 12) {
        noon = "PM";
        // 12시 초과면 12 빼기
        if (now.getHours() > 12) {
            hour -= 12;
        }
    }

    clockDiv.textContent = noon + " " + hour + ":" + minute + ":" + second;
}

function number(num) {
    if (num < 10){
        num = "0" + num; //5같은경우 05로 표시
    }
    return num;
}

function clock() {
    getTime();
    getDay();
}

setInterval(clock, 1000) //시계 1초마다 작동

//타이머
let milli = 0; // 밀리초
let second = 0; // 초
let minute = 0; // 분
let timerRunning = false; // 중복실행방지

startButton.onclick = function() { // 타이머 시작
    if (timerRunning == false) { // 타이머가 실행중이 아니면
    timerPerform = setInterval(timer, 10); // 10밀리초마다 timer 작동
    timerRunning = true; // 타이머 상태를 실행중으로 바꿈
    }
}

stopButton.onclick = function() {
    clearInterval(timerPerform) // 타이머 멈추기
    timerRunning = false // 타이머 작동중이지 않음으로 바꾸기
}

resetButton.onclick = function() { // 타이머 초기화
    timerDiv.textContent = "00:00:00"
    milli = 0;
    second = 0;
    minute = 0;
}

function timer() {
    milli++;
    if (milli > 99) { // 100밀리초는 1초
        second++;
        milli = 0;
    }
    if (second > 59) { // 60초는 1분
        minute++;
        second = 0;
    }
    timerDiv.textContent = `${number(minute)}:${number(second)}:${number(milli)}`
}