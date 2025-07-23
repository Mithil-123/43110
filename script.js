const terminal = document.getElementById("terminal");
const input = document.getElementById("input");

let currentPhase = 0;

const phases = [
  {
    messages: [
      "Welcome, Agent.",
      "You’ve arrived at the secure terminal.",
      "Enter the following command to begin your mission:",
      "\n> initiate"
    ],
    expected: "initiate"
  },
  {
    messages: [
      "Phase 1: Caesar Cipher",
      "Decrypt this message:",
      "Ymj jflq hmfjxj ymj ktc gz ytu gwjsji gjwtru ny gjtzy xujhp",
      "(Hint: It’s a Caesar cipher with a backward shift)",
      "\n> (enter decrypted sentence)"
    ],
    expected: "the eagle chased the fox but got burned before it could speak"
  },
  {
    messages: [
      "Phase 2: Identity Confirmation",
      "Type the code you started with."
    ],
    expected: "43110"
  },
  {
    messages: [
      "Phase 3: Authorization",
      "Verifying credentials...",
      "Accessing classified modules...",
      "Authenticated. Welcome back, Agent.",
      "Finalizing boot procedure for ICBM...",
      "\n> auth"
    ],
    expected: "auth"
  },
  {
    messages: [
      "booting system...",
      "connecting to cloud...",
      "uploading keys...",
      "████ ███ ██████ ░░░░ ▒▒▒▒ ▓▓▓▓ ☠☠☠☠ 💀💀💀💀",
      "\n>> SYSTEM BREACH DETECTED <<",
      "voice.log: ‘They tricked you. This isn’t what you think.’",
      "voice.log: ‘ICBM protocol auto-engaged. Only one chance to stop it.’",
      "voice.log: ‘Find the name they erased... before time runs out.’",
      "\n> decode"
    ],
    expected: "decode"
  },
  {
    messages: [
      "Access terminal unlocked.",
      "Begin decryption sequence.",
      "(Puzzle continues here...)"
    ],
    expected: ""
  }
];

function printLine(text, delay = 30, callback) {
  const line = document.createElement("div");
  terminal.appendChild(line);
  let i = 0;

  function typeChar() {
    if (i < text.length) {
      line.textContent += text[i++];
      terminal.scrollTop = terminal.scrollHeight;
      setTimeout(typeChar, delay);
    } else if (callback) {
      callback();
    }
  }

  typeChar();
}

function printPrompt() {
  const prompt = document.createElement("div");
  prompt.className = "prompt-line";
  prompt.innerHTML = `<span class='green'>agent@shr</span>:~$ `;
  terminal.appendChild(prompt);
  terminal.scrollTop = terminal.scrollHeight;
}

function processInput(value) {
  if (!value.trim()) return;

  const echo = document.createElement("div");
  echo.textContent = `agent@shr:~$ ${value}`;
  terminal.appendChild(echo);

  if (value.trim().toLowerCase() === phases[currentPhase].expected) {
    currentPhase++;
    if (currentPhase < phases.length) {
      setTimeout(() => {
        printMessages(phases[currentPhase].messages, 0);
      }, 300);
    } else {
      printLine("Mission complete.");
    }
  } else {
    printLine("Access denied. Try again.");
  }

  input.value = "";
  terminal.scrollTop = terminal.scrollHeight;
}

function printMessages(messages, index) {
  if (index < messages.length) {
    printLine(messages[index], 30, () => printMessages(messages, index + 1));
  } else {
    printPrompt();
  }
}

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    processInput(input.value);
  }
});

function start() {
  printMessages(phases[0].messages, 0);
}
start();

const observer = new MutationObserver(() => {
  input.focus();
});
observer.observe(terminal, { childList: true });
