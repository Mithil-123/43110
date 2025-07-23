// Terminal Puzzle Game script.js

const terminal = document.getElementById("terminal");
const input = document.getElementById("input");
let currentPhase = 0;
let history = [];

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
      "Ymj vznhp gwtbs ktc ozrux tajw ymj qfed itl",
      "(Hint: It’s a Caesar cipher with a +5 shift)",
      "\n> (enter decrypted sentence)"
    ],
    expected: "the quick brown fox jumped over the lazy dog"
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
  terminal.scrollTop = terminal.scrollHeight;

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
  prompt.innerHTML = `<span class='green'>agent@shr</span>:~$ <span id='active-input'></span>`;
  terminal.appendChild(prompt);
  terminal.scrollTop = terminal.scrollHeight;
}

function processInput(value) {
  printLine(`agent@shr:~$ ${value}`);
  if (value.trim().toLowerCase() === phases[currentPhase].expected) {
    currentPhase++;
    if (currentPhase < phases.length) {
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
      printLine("Mission complete.");
    }
  } else {
    printLine("Access denied. Try again.");
  }
  input.value = "";
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    const value = input.value;
    if (value) {
      processInput(value);
    }
  }
});

// Initial boot
function startBootMessages(index = 0) {
  if (index < phases[0].messages.length) {
    printLine(phases[0].messages[index], 30, () => startBootMessages(index + 1));
  } else {
    printPrompt();
  }
}
startBootMessages();

// Keep prompt at bottom
const observer = new MutationObserver(() => {
  input.focus();
});
observer.observe(terminal, { childList: true });
