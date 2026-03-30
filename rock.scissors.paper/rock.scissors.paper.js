// 分数 
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

//更新分数显示
function updateScore() {
  document.getElementById('score').innerText =
    `Wins: ${score.wins} | Losses: ${score.losses} | Ties: ${score.ties}`;
}

// 随机电脑出拳 
function pickComputerMove() {
  const randomNumber = Math.random();

  if (randomNumber < 1 / 3) {
    return 'rock';
  } else if (randomNumber < 2 / 3) {
    return 'paper';
  } else {
    return 'scissors';
  }
}

// 游戏主逻辑 
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let result = '';

  if (playerMove === computerMove) {
    result = 'Tie';
    score.ties++;
  } else if (
    (playerMove === 'rock' && computerMove === 'scissors') ||
    (playerMove === 'paper' && computerMove === 'rock') ||
    (playerMove === 'scissors' && computerMove === 'paper')
  ) {
    result = 'You Win';
    score.wins++;
  } else {
    result = 'You Lose';
    score.losses++;
  }

  localStorage.setItem('score', JSON.stringify(score));

  document.getElementById('result').innerText =
    `You: ${playerMove} | Computer: ${computerMove} → ${result}`;

  updateScore();
}

// 玩家按钮
document.querySelectorAll('.move-btn').forEach((button)=> {
  button.addEventListener('click', function() {
    const move = button.dataset.move;
    playGame(move);
  });
});

// 重置
document.getElementById('resetBtn').addEventListener('click', ()=> {
  score = {
    wins: 0,
    losses: 0,
    ties: 0
  };

  localStorage.setItem('score', JSON.stringify(score));
  updateScore();
  document.getElementById('result').innerText = 'Score Reset';
});

//自动播放 
let intervalId = null;
let isAutoPlaying = false;

document.getElementById('autoBtn').addEventListener('click', () => {
  if (!isAutoPlaying) {
    intervalId = setInterval(()=> {
      const moves = ['rock', 'paper', 'scissors'];
      const randomMove = moves[Math.floor(Math.random() * 3)];
      playGame(randomMove);
    }, 1000);

    isAutoPlaying = true;
   autoBtn.innerText = 'Stop Auto';
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    autoBtn.innerText = 'Auto Play';
  }
});

//初始化
updateScore();