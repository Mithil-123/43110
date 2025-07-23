const terminal = document.getElementById("terminal");
const input = document.getElementById("input");
let currentPhase = 0;

const PHASES = {
  0: caesarPuzzle,
  1: leetPuzzle,
  2: fakeLaunch,
  3: hackerInterrupt,
  4: cloudPuzzle,
  5: endSequence
};

window.onload = () => {
  printLine("Welcome, Agent. Stand by...");
  setTimeout(() => {
    PHASES[currentPhase]();
  }, 2000);
};

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    const command = input.value.trim();
    input.value = "";
    handleInput(command);
  }
});

function printLine(text, delay = 0) {
  setTimeout(() => {
    const line = document.createElement("div");
    line.textContent = text;
    terminal.appendChild(line);
    terminal.scrollTop = terminal.scrollHeight;
  }, delay);
}

function handleInput(command) {
  printLine("> " + command);

  if (currentPhase === 0 && command.toLowerCase() === "the fox outwits the eagle") {
    printLine("Access granted.");
    currentPhase++;
    PHASES[currentPhase]();
  } else if (currentPhase === 1 && command.toLowerCase() === "take the code u started with") {
    printLine("Correct.");
    currentPhase++;
    PHASES[currentPhase]();
  } else if (currentPhase === 4 && ["1", "2", "3"].includes(command)) {
    if (command === "2") {
      printLine("Correct access point.");
      currentPhase++;
      PHASES[currentPhase]();
    } else {
      printLine("Access denied. Try again.");
    }
  } else {
    printLine("Invalid or unexpected input.");
  }
}

// === Phase Functions ===

function caesarPuzzle() {
  printLine("Phase 1: Decryption Initiated...");
  setTimeout(() => {
    printLine("Decrypt the message: Wkh ira rxwzlwv wkh hdjoh");
    printLine("(Hint: Caesar cipher)");
  }, 1000);
}

function leetPuzzle() {
  printLine("Phase 2: Leet Encoding Detected...");
  setTimeout(() => {
    printLine("Take the code u started with.");
    printLine("It reveals the name of the banned weapon.");
    printLine("Convert all consonants using leet from the original code.");
    printLine("Type your answer to proceed.");
  }, 1000);
}

function fakeLaunch() {
  printLine("Phase 3: AUTHORIZED");
  setTimeout(() => {
    printLine("launch --auth ▒ξЖđλπѪ₪");
    currentPhase++;
    setTimeout(() => {
      PHASES[currentPhase]();
    }, 3000);
  }, 1000);
}

function hackerInterrupt() {
  printLine("[...]");
  setTimeout(() => {
    printLine("UNKNOWN SOURCE: You've been tricked.");
    printLine("The nuke codenamed ████ has been activated.");
    printLine("I trained this model on memories of the ones they erased.");
    printLine("We must stop it. Quickly.");
    currentPhase++;
    setTimeout(() => {
      PHASES[currentPhase]();
    }, 3000);
  }, 3000);
}

function cloudPuzzle() {
  printLine("Phase 4: Cloud Terminal Access");
  printLine("Choose the correct access port to proceed:");
  printLine("1. /mnt/nuke_root");
  printLine("2. /mnt/agent_logs");
  printLine("3. /mnt/gamesaves");
  printLine("Type the number of the correct directory:");
}

function endSequence() {
  printLine("Final Phase: Access Granted");
  printLine("Preparing deactivation key...");
  printLine("Visit the link below on your mobile device:");
  printLine("🔗 https://your-site.com/unlock.apk");
  printLine("When connected to the puzzle box, it will release the seal.");
}
