const output = document.getElementById("output");
const input = document.getElementById("terminalInput");
const audio = document.getElementById("audioPlayer");

const state = {
  current: "caesar",
  solved: []
};

const puzzles = {
  caesar: {
    answer: "the eagle chased the fox but got burned before it could speak",
    next: "leet",
    onSolve: () => {
      show("ACCESS GRANTED\nNext challenge loading...");
      playAudio("assets/audio/hacker_intro.mp3");
    }
  },
  leet: {
    answer: "confused but too late",
    next: "hacker",
    onSolve: () => {
      show("launch --auth ▒ξЖđλπѪ₪\nERROR: INTERRUPTED");
    }
  },
  hacker: {
    answer: "h3ll0",
    next: "cloud",
    onSolve: () => {
      show("You're in. Accessing cloud terminal...");
    }
  },
  cloud: {
    answer: "3",
    next: null,
    onSolve: () => {
      show("Download the APK: https://example.com/unlock.apk");
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

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const cmd = input.value.toLowerCase().trim();
    show("agent@h3ll0:~$ " + cmd);
    input.value = "";

    if (cmd === "clear") {
      output.innerHTML = "";
      return;
    }

    const currentPuzzle = puzzles[state.current];
    if (currentPuzzle && cmd === currentPuzzle.answer) {
      currentPuzzle.onSolve();
      state.solved.push(state.current);
      state.current = currentPuzzle.next;
    } else if (state.current === "cloud") {
      if (["1", "2"].includes(cmd)) {
        show("That file doesn't exist or is restricted.");
      } else {
        show("Command not recognized or incorrect answer.");
      }
    } else {
      show("Command not recognized or incorrect answer.");
    }
  }
});

// Initial greeting
show("Welcome Agent. Solve the puzzle to proceed.");
