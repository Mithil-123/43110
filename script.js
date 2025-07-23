const output = document.getElementById("output");
const input = document.getElementById("terminalInput");
const audio = document.getElementById("audioPlayer");

let state = JSON.parse(localStorage.getItem("terminalState")) || {
  current: "caesar",
  solved: []
};

const puzzles = {
  caesar: {
    riddle: `Decrypt this:\nGur sbk unf pbzr, ohg gur rntyr vf rira sbeorg.\n(Hint: Caesar Cipher)`,
    answer: "the fox has come but the eagle is even forgot",
    next: "leet",
    onSolve: () => {
      show("ACCESS GRANTED\nNext challenge loading...");
      playAudio("assets/audio/hacker_intro.mp3");
    }
  },
  leet: {
    riddle: `You enter: launch --auth ▒ξЖđλπѪ₪\nSystem says: UNKNOWN USER\nThen you hear a voice...\n`,
    answer: "confused but too late",
    next: "hacker",
    onSolve: () => {
      show("launch --auth ▒ξЖđλπѪ₪\nERROR: INTERRUPTED\n\n[VOICE]: Wait. You’ve been tricked. This isn’t what you think.\nThe code they gave you was leet-speak for a forbidden word.\nYou must trace the origin. Start with what they banned.");
    }
  },
  hacker: {
    riddle: `What was the forbidden word they never let you say?\n(It's been hiding in plain sight, leet-encoded)`,
    answer: "h3ll0",
    next: "cloud",
    onSolve: () => {
      show("[VOICE]: You’ve uncovered it. That word was their weapon and their lie.\nThey used it to activate the system, but you can use it to stop it.");
    }
  },
  cloud: {
    riddle: `Choose the correct backup node to shut down the AI safely:\n[1] core_vault.img\n[2] ai_seed.gen\n[3] protocol31.msg`,
    answer: "3",
    next: null,
    onSolve: () => {
      show("Final override successful.\nDownload the APK to deactivate the core: https://example.com/unlock.apk");
    }
  }
};

function show(text) {
  const lines = text.split("\n");
  lines.forEach(line => {
    const div = document.createElement("div");
    div.classList.add("line");
    div.textContent = line;
    output.appendChild(div);
  });
  window.scrollTo(0, document.body.scrollHeight);
}

function playAudio(src) {
  audio.src = src;
  audio.play();
}

function saveState() {
  localStorage.setItem("terminalState", JSON.stringify(state));
}

function showPuzzle() {
  if (puzzles[state.current]) {
    show(puzzles[state.current].riddle);
  }
}

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.toLowerCase().trim();
    show("agent@shr:~$ " + cmd);
    input.value = "";

    if (cmd === "clear") {
      output.innerHTML = "";
      showPuzzle();
      return;
    }

    const currentPuzzle = puzzles[state.current];
    if (currentPuzzle && cmd === currentPuzzle.answer) {
      currentPuzzle.onSolve();
      state.solved.push(state.current);
      state.current = currentPuzzle.next;
      saveState();

      if (state.current) {
        setTimeout(() => {
          showPuzzle();
        }, 2000);
      }
    } else if (state.current === "cloud" && ["1", "2"].includes(cmd)) {
      show("That file doesn't exist or is restricted.");
    } else {
      show("Command not recognized or incorrect answer.");
    }
  }
});

// First load
if (state.solved.length === 0) {
  show("Welcome Agent. Solve the puzzle to proceed.\n");
}
showPuzzle();
