// Terminal Puzzle Game script.js

const terminal = document.getElementById("terminal");
const input = document.getElementById("input");
let currentPhase = 0;
let history = [];
let countdownTime = 5 * 60; // 5 minutes
let countdownInterval;
let inputDisabled = false;
let audio = new Audio();

const audioMap = {
  0: "audio/0.mp3",
  3: "audio/3.mp3",
  7: "audio/7.mp3",
  10: "audio/10.mp3",
  13: "audio/13.mp3"
};

const phases = [
  // Your full phases array remains unchanged...
];

function playPhaseAudio(phase) {
  if (audioMap[phase]) {
    audio.src = audioMap[phase];
    audio.play().catch(() => {});
  }
}

function startCountdown() {
  countdownInterval = setInterval(() => {
    countdownTime--;
    updateCountdown();

    if (countdownTime <= 0) {
      clearInterval(countdownInterval);
      printLine(">> SYSTEM FAILURE. Target impacted.");
      inputDisabled = true;
      document.removeEventListener("keydown", handleKey);
    }
  }, 1000);
}

function updateCountdown() {
  const minutes = String(Math.floor(countdownTime / 60)).padStart(2, "0");
  const seconds = String(countdownTime % 60).padStart(2, "0");
  const timerElement = document.getElementById("timer");

  if (timerElement) {
    timerElement.textContent = `> T-minus ${minutes}:${seconds}`;
  } else {
    const timer = document.createElement("div");
    timer.id = "timer";
    timer.textContent = `> T-minus ${minutes}:${seconds}`;
    terminal.appendChild(timer);
    scrollToBottom();
  }
}

function scrollToBottom() {
  terminal.scrollTop = terminal.scrollHeight;
}

function printLine(text, delay = 30, callback) {
  const line = document.createElement("div");
  terminal.appendChild(line);
  scrollToBottom();

  let i = 0;
  function typeChar() {
    if (i < text.length) {
      line.textContent += text[i++];
      scrollToBottom();
      setTimeout(typeChar, delay);
    } else {
      if (text.includes(">> H3LLX LAUNCH CONFIRMED <<")) {
        startCountdown();
      }
      if (callback) callback();
    }
  }
  typeChar();
}

function printPrompt() {
  const prompt = document.createElement("div");
  prompt.className = "prompt-line";

  const prefix = document.createElement("span");
  prefix.className = "green";
  prefix.textContent = "agent@shr:~$ ";

  const activeInput = document.createElement("span");
  activeInput.id = "active-input";
  activeInput.textContent = "";

  prompt.appendChild(prefix);
  prompt.appendChild(activeInput);
  terminal.appendChild(prompt);
  scrollToBottom();

  input.value = "";

  input.oninput = () => {
    activeInput.textContent = input.value;
  };

  input.focus();
}

function processInput(value) {
  printLine(`agent@shr:~$ ${value}`);
  if (value.trim().toLowerCase() === phases[currentPhase].expected) {
    currentPhase++;
    if (currentPhase < phases.length) {
      playPhaseAudio(currentPhase);
      setTimeout(() => {
        function printMessages(index) {
          if (index < phases[currentPhase].messages.length) {
            printLine(phases[currentPhase].messages[index], 30, () => printMessages(index + 1));
          } else {
            printPrompt();
          }
        }
        printMessages(0);
      }, 300);
    } else {
      clearInterval(countdownInterval);
      const timer = document.getElementById("timer");
      if (timer) timer.remove();
      printLine("Mission complete.");
    }
  } else {
    printLine("Access denied. Try again.");
  }
  input.value = "";
}

function handleKey(e) {
  if (e.key === "Enter" && !inputDisabled) {
    const value = input.value;
    if (value) {
      processInput(value);
    }
  }
}

input.addEventListener("keydown", handleKey);

function startBootMessages(index = 0) {
  if (index < phases[0].messages.length) {
    printLine(phases[0].messages[index], 30, () => startBootMessages(index + 1));
  } else {
    printPrompt();
  }
}

startBootMessages();

const observer = new MutationObserver(() => {
  input.focus();
});
observer.observe(terminal, { childList: true });
