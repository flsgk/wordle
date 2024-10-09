const 정답 = "APPLE";

let attempts = 0;
let index = 0; //입력이 됐을 때 다음 인덱스로 넘어가도록 (수정이 가능한 변수 let)
let timer;

function appStart() {
  //함수 전체에 로직을 포함하고

  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "the game is over!";
    div.style =
      "display:flex;justify-content:center; align-items:center;position:absolute;top:40vh;left:32vw;background-color:tomato;width:200px;height:40px;font-weight:bold";
    //자바로 div를 생성해서 스타일을 주는 법
    //상위 Element에 relation을 주지 않았기 때문에 Body를 기준으로 absolute가 결정된다.
    document.body.appendChild(div); //div를 문서 어디에 추가하는지
  };

  const gameover = () => {
    window.removeEventListener("keydown", handleKeyDown); // 키 입력이 안되도록 이벤트를 없앤다.
    displayGameover();
    clearInterval(timer); //게임 오버되면 Interval id (setInterval)를 클리어 한다.
  };

  const nextline = () => {
    if (attempts === 6) return gameover(); //6번째 시도면 nextline까지 가지 않고 gameover을 호출하고 리턴시키기
    attempts += 1;
    index = 0;
    //시도는 1을 추가해서 다음 줄로 가게 하고, 인덱스는 초기화해서 다시 처음부터 작성하도록
  };

  const handleEnterKey = () => {
    let 맞춘글자_개수 = 0;

    // 엔터키를 눌렀을 때 정답확인 코드
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']` // i가 1 ~ 4까지 늘어날 때
      );
      const 입력한_글자 = block.innerText;
      const 정답_글자 = 정답[i]; //정답의 [n]번째 글자
      if (입력한_글자 === 정답_글자) {
        맞춘글자_개수 += 1; // 입력한 글자와 정답 글자가 같으면 맞춘글자 개수도 하나 늘어난다 = 정답 카운트
        block.style.background = "#6AAA64";
      } else if (정답.includes(입력한_글자)) block.style.background = "#C9B458";
      // 입력한 글자가 정답에 포함되면 지정한 색깔로 표시
      else block.style.background = "#787C7E";
      block.style.color = "white";
      //위 2가지 다 아니라면 배경은 회색
    }
    if (맞춘글자_개수 === 5)
      gameover(); //for문을 다 돌았을 때 맞춘 글자 개수가 5면 게임 오버
    else nextline(); // 맞추지 못했을 경우 다음 줄로 넘어가라는 뜻
  };

  const handleBackSpace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = ""; // 1 전에 있는 블럭을 선택해서 텍스트를 지운다.
    }
    if (index !== 0) index -= 1; // 그리고 인덱스가 0이 아니면 하나 지운다.
  };

  const handleKeyDown = (event) => {
    // 내가 누르는 키가 블록에 업데이트 되도록 하는 것
    //addEventListener 안에 있는 함수는 암묵적으로 event 전달이 된다.

    const key = event.key.toUpperCase(); //현재의 키의 대문자
    const keyCode = event.keyCode; //현재의 키코드
    const thisBlock = document.querySelector(
      `.board-block[data-index='${attempts}${index}']`
    );
    //어떤 값의 [어떤 속성]을 뽑을 것인지 선택한 것이 thisBlock
    // ${attempts}${index} : 몇 번째 시도의 몇 번째 인덱스의 아래의 텍스트를 가져온다.

    if (event.key === "Backspace") handleBackSpace();

    if (index === 5) {
      if (event.key === "Enter") handleEnterKey();
      // 인덱스가 5일 때 엔터를 누르면 엔터를 판단하고
      else return; // 그렇지 않으면 리턴해라.
    } else if (65 <= keyCode && keyCode <= 90) {
      // 인덱스가 5가 아니라면 keycode 가 알파벳일 때 행동
      thisBlock.innerText = key; // thisBlock 안에 key를 넣는다.
      index += 1; // 키를 넣고나면 인덱스를 업데이트 한다.
    }
  };

  const startTimer = () => {
    //타이머 만드는 방법

    const start_time = new Date();

    function settime() {
      const now = new Date();
      const howlong = new Date(now - start_time);
      //.toString() = 문자열로 만들어서 뒤에서 .padStart(n, 0)를 지원할 수 있도록 한다.
      const min = howlong.getMinutes().toString().padStart(2, 0);
      const sec = howlong.getSeconds().toString().padStart(2, 0);
      const timer = document.querySelector(".time");
      timer.innerText = `${min}:${sec}`;
    }

    timer = setInterval(settime, 1000);
    //위에서 let으로 선언한 timer를 setInterval에 저장
    // timer 에서 리턴되는 값 = setInterval id
  };

  startTimer();

  window.addEventListener("keydown", handleKeyDown); //키를 누르면 이벤트가 발생, 발생했을 때 실행되는 함수 이름
}

appStart(); // 제일 마지막에 앱스타트 함수를 호출
