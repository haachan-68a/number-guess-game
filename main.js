// 1〜100までのランダムな正解の数字を決める
let secretNumber = Math.floor(Math.random() * 100) + 1;

// 挑戦回数
let attempts = 0;

// HTMLの要素を取得する
const guessInput = document.getElementById('guess-input');
const guessBtn = document.getElementById('guess-btn');
const message =  document.getElementById('message');
const restartBtn = document.getElementById('restart-btn');
const gameArea = document.getElementById('game-area');

// 「推測する」ボタンがクリックされた時の処理
guessBtn.addEventListener('click', checkGuess);

// Enterキーを押した時にも推測できるようにする
guessInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') {
    checkGuess();
  }
});

function checkGuess() {
  const userGuess = Number(guessInput.value);
  
  // 入力チェック（空欄や範囲外の時）
  if (!userGuess || userGuess < 1 || userGuess > 100) {
    message.textContent = "⚠️ 1から100までの数字を入力してね！";
    message.className = "mt-6 text-lg font-medium text-amber-600 min-h-[1.75rem]";
    return;
  }
  
  attempts++;
  
  // 判定ロジック
  if (userGuess === secretNumber) {
    message.textContent = `🎉 正解！ ${attempts}回目で当てたよ！`;
    message.className = "mt-6 text-lg font-bold text-emerald-600 min-h-[1.75rem]";
    endGame();
  } else if (userGuess < secretNumber) {
    message.textContent = "📈 もっと大きい数字だよ！";
    message.className = "mt-6 text-lg font-medium text-blue-600 min-h-[1.75rem]";
  } else {
    message.textContent = "📉 もっと小さい数字だよ！";
    message.className = "mt-6 text-lg font-medium text-rose-600 min-h-[1.75rem]";
  }
  
  // 入力欄をクリアしてフォーカスを戻す
  guessInput.value = "";
  guessInput.focus();
};

// ゲームクリア時の処理
function endGame() {
  gameArea.classList.add('hidden'); // 入力欄とボタンを隠す
  restartBtn.classList.remove('hidden'); // リトライボタンを表示する
}

// 「もう一度遊ぶ」ボタンがクリックされた時の処理
restartBtn.addEventListener('click', () => {
  secretNumber = Math.floor(Math.random() * 100) + 1;
  attempts = 0;
  message.textContent = "";
  guessInput.value = "";
  gameArea.classList.remove('hidden');
  restartBtn.classList.add('hidden');
  guessInput.focus();
});