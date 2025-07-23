let terminal = document.getElementById("terminal");
let input = document.getElementById("command");
let prompt = document.getElementById("prompt");

let phase = 0;
let progress = {
  phase1: false,
  phase2: false,
  phase3: false,
  phase4: false
};

function appendOutput(text) {
  terminal.innerHTML += text + "<br>";
  terminal.scrollTop = terminal.scrollHeight;
}

function nextPrompt() {
  prompt.innerText = "agent@shr:~$";
  input.value = "";
  input.focus();
}

function startPhase1() {
  phase = 1;
  appendOutput("agent@shr:~$ access key required");
  appendOutput("agent@shr:~$ decrypt the following:");
  appendOutput("Ymj jflq hmfjxj ymj ktc gz ytu gwjsji gjwtru ny gjtzy xujhp");
  nextPrompt();
}

function startPhase2() {
  phase = 2;
  appendOutput("auth accepted...");
  appendOutput("executing launch command...");
  setTimeout(() => {
    appendOutput("launch authorized.");
    setTimeout(() => {
      appendOutput("uploading payload: ICBM...");
      setTimeout(() => {
        appendOutput("error: unknown anomaly in uplink.");
        appendOutput("intercepted by unidentified entity...");
        setTimeout(() => {
          appendOutput("WARNING: You have been tricked. This is not a simulation.");
          appendOutput("You must stop the ICBM.");
          appendOutput("agent@shr:~$ solve this: 43110 was their codename. What is its true name?");
          nextPrompt();
        }, 3000);
      }, 1500);
    }, 1500);
  }, 1000);
}

function startPhase3() {
  phase = 3;
  appendOutput("Correct. Identity partially recovered.");
  appendOutput("Final key required. Decoding will begin.");
  appendOutput("agent@shr:~$ override required. Submit counter-command:");
  nextPrompt();
}

function startPhase4() {
  phase = 4;
  appendOutput("Counter-command accepted.");
  appendOutput("ICBM shutdown initiated...");
  appendOutput("System: box unlocked. Retrieve contents.");
  nextPrompt();
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    let command = input.value.trim();
    appendOutput("agent@shr:~$ " + command);

    if (phase === 1) {
      if (command.toLowerCase() === "the quick brown fox jumps over the lazy eagle") {
        progress.phase1 = true;
        startPhase2();
      } else {
        appendOutput("access denied. try again.");
        nextPrompt();
      }
    }

    else if (phase === 3) {
      if (command.toLowerCase().includes("auth") || command.toLowerCase().includes("override")) {
        progress.phase3 = true;
        startPhase4();
      } else {
        appendOutput("invalid counter-command.");
        nextPrompt();
      }
    }

    else if (phase === 2) {
      if (command === "43110") {
        startPhase3();
      } else {
        appendOutput("incorrect. hint: leetspeak.");
        nextPrompt();
      }
    }

    else {
      appendOutput("unknown command.");
      nextPrompt();
    }
  }
});

window.onload = () => {
  appendOutput("agent@shr:~$ system online");
  setTimeout(() => {
    startPhase1();
  }, 1000);
};
