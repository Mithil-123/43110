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
  appendOutput("Access granted.");
  setTimeout(() => {
    appendOutput("Fetching internal commands █ █ █ █ █ █ █ █");
    setTimeout(() => {
      appendOutput("agent@shr:~$ auth ICBM_INTERNAL_OVERRIDE");
      setTimeout(() => {
        startPhase3();
      }, 2000);
    }, 2000);
  }, 1000);
}

function startPhase3() {
  phase = 3;
  progress.phase3 = true;
  appendOutput("⣿⢿⣻⣯⣷⢽⣾⢿⣿");
  appendOutput("Interrupt Detected.");
  appendOutput("voice@unknown: They lied to you. ICBM launch was masked as a test.");
  appendOutput("voice@unknown: You triggered it. But you can stop it.");
  appendOutput("voice@unknown: Solve the access puzzle. I hid it in the cloud.");
  appendOutput("voice@unknown: The final name is encoded. Find it before it ends.");
  setTimeout(() => {
    startPhase4();
  }, 3000);
}

function startPhase4() {
  phase = 4;
  appendOutput("agent@shr:~$ ssh cloud-access");
  appendOutput("Connecting to encrypted cloud server █ █ █");
  appendOutput("Welcome to secure-node-9. Type 'ls' to begin.");
  nextPrompt();
}

function processCommand(command) {
  if (phase === 0) {
    startPhase1();
    return;
  }

  if (phase === 1 && command.toLowerCase().includes("the quick brown fox jumps over the lazy eagle")) {
    progress.phase1 = true;
    startPhase2();
    return;
  }

  if (phase === 4) {
    if (command.trim() === "ls") {
      appendOutput("/data /enc /vault /access-key.txt");
    } else if (command.trim() === "cat /access-key.txt") {
      appendOutput("ICBM_access.final_phase.key = '???'");
      appendOutput("voice@unknown: Remember, the answer is forbidden. You were never supposed to say it.");
    } else {
      appendOutput("-bash: command not found: " + command);
    }
    nextPrompt();
    return;
  }

  appendOutput("-bash: command not found: " + command);
  nextPrompt();
}

input.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    const cmd = input.value;
    appendOutput("agent@shr:~$ " + cmd);
    processCommand(cmd);
  }
});

window.onload = () => {
  appendOutput("agent@shr:~$ system online");
  nextPrompt();
};