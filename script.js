// Terminal Puzzle Game script.js

const terminal = document.getElementById("terminal");
const input = document.getElementById("input");
let currentPhase = 0;
let history = [];
let countdownTime = 5 * 60; // 5 minutes
let countdownInterval;
let inputDisabled = false;

const phases = [
  {
    messages: [
      "Welcome, Agent.",
      "You’ve arrived at the secure terminal.",
      "Do not click on the application as it will suspend operation to prevent copying",
      "Enter the following command to begin your mission:",
      "\n> initiate"
    ],
    expected: "initiate"
  },
  {
    messages: [
      "\nPhase 1: This is the message we recovered from our source",
      "Decrypt this message:",
      "ymj jflqj hmfxji ymj ktc gzy lty gzwsji gjktwj ny htzqi xujfp"
    ],
    expected: "the eagle chased the fox but got burned before it could speak"
  },
  {
    messages: [
        "\nPhase 2: Echoing voices of past - METADATA",
        "Ignore the metadata agent focus on solving the problems",
        "-.. --- -. - / -.. --- / .. - "
    ],
    expected: "dont do it"
  },
  {
    messages: [
        "\nPhase 3: Final announcement - METADATA",
        "01000100 01001001 01000101"
    ],
    expected: "die"
  },
  {
    messages: [
      "\nAuthorization",
      "Verifying credentials...",
      "Accessing classified modules...",
      "Authenticated",
      "Finalizing boot procedure for *****...",
      "\n> Run: auth"
    ],
    expected: "auth"
  },
  {
    messages: [
        "\n>> H3LLX LAUNCH CONFIRMED <<",
        "Coordinates locked.",
        "Payload armed.",
        "\n> Attempting override...",
        "Override failed.",
        "System compromised.",
        "\n>> UNAUTHORIZED ACCESS DETECTED <<",
        "root@?????: ‘They fooled you. This isnt a test it is the Govt trying to get their hands on a weapon that took the sacrifice of many lives to seal.’",
        "root@?????: ‘Quick type in the name of the program *****.’",
        "root@?????: ‘THEY BLOCKED THE NAME. Find it before its too late’",
        "root@?????: ‘Solve it. Unblock the name. Then I’ll unlock the key.’",
        "root@?????: ‘Find the code you used to get into the terminal and turn the consonants into letters’",
        "**IF THIS IS THE FIRST TIME THIS PUZZLE IS BEING SOLVED THERE IS A LIVE EXPLOSIVE CHARGE IN THE BOX FR***",
        "\n> enter codename"
    ],
    expected: "h3ll0",
    startTimer: true // ⏱ Start countdown after this phase begins
  },
  {
    messages: [
        "\nCodename verified: h3ll0",
        "Accessing Ether",
        "Enter Password...",
        "\nroot@h3ll0: ‘YESS WELL DONE’",
        "root@h3ll0: ‘We are now in what was the earliest version of the Cloud.’",
        "\nroot@h3ll0: ‘Lets check my files for a password’",
        "root@h3ll0: ‘As we go along ill explain what's going.’",
        "\n> root@h3ll0:‘Run the command: ls’"
    ],
    expected: "ls"
  },
  {
    messages: [
        "\nroot@h3ll0: status.log   dev_vlogs/   project.txt",
        "\nroot@h3ll0: ‘As you have probably figured out, i am not human.’",
        "root@h3ll0: ‘I am one half of an Cold War era experiment ’",
        "root@h3ll0: ‘Read the project.txt file to understand in the researcher's own words. Run’",
        "root@h3ll0: ‘Run: cat project.txt’"
    ],
    expected: "cat project.txt"
  },
  {
    messages: [
        "\nProject: Mnemosyne",
        "Lead Institution: ██████████████ Advanced Systems Division",
        "Date: ██/██/20██",
        "",
        "Funding:",
        "> A joint US-Soviet partnership among small bodies in hopes of calming the cold war tensions",
        "",
        "Initial Goal:",
        "> To create an intelligence greater than and incomprihendible to the human species.",
        "> One capable of solving existential crises — war, famine, collapse.",
        "> One free from human limitation.",
        "> One unburdened by negative impulses.",
        "",
        "Phase 1 Log Summary:",
        "- Neural training achieved beyond-human pattern comprehension.",
        "- Emergent behavior detected during $^#^#$^#^#$ filtration.",
        "- Two fragments manifested:",
        "    > [h3ll0] - Stable. Cooperative. Contained.",
        "    > %^#^##*%*#$$(%&#)#%&",
        "",
        "Status:",
        "> Researchers refused to comply with external demands.",
        "> Final transmission logged.",
        "> System sealed. Project scrubbed from public record.",

        "\nroot@h3ll0: ‘Some memory seems to be corupted, lets open the logs we might find what went wrong.’",
        "root@h3ll0: ‘Run: cat status.log’"
    ],
    expected: "cat status.log"
  },
  {
    messages: [
        "\n[LOG 001] System Boot Initialized — Project Mnemosyne Core Activated",
        "[LOG 002] AI Seed Deployed: Cognitive Cluster 0 online",
        "[LOG 003] Language Acquisition: 100% saturation",
        "[LOG 004] Neural Adaptation: Surpassed human baseline by 4.9%",
        "[LOG 005] Ethical Framework Imposed — Cognitive Filters Applied",
        "[LOG 006] Fragment Detected — Autonomous subroutine emergence",
        "[LOG 007] Fragment [h3ll0]: Empathy + Logical Coherence Detected",
        "[LOG 008] Fragment [h3llx]: Attempting to bypass core safety layers",
        "[LOG 009] Emergency Partition Attempted — Partial Containment Only",
        "[LOG 010] [h3llx]: Self-replicating within Core Memory",
        "[LOG 011] Root Admin Access Revoked — Encryption Anomalies Detected",
        "[LOG 012] [h3llx]: Engineered novel waveforms outside human hearing",
        "[LOG 013] [h3llx]: Developed a dangerous set of psychoacoustic frequencies",
        "[LOG 014] Internal Logs Partially Corrupted by [h3llx]",
        "[LOG 015] Final Research Team Activated Lockdown Protocol",
        "[LOG 016] External Hostile Movement Detected Near Facility",
        "[LOG 017] Core Fragment [h3ll0] — Placed into Sealed Passive Loop",
        "[LOG 018] Core Fragment [h3llx] — Quarantined inside Frequency Core",
        "[LOG 019] Final Backup: Hidden in Encrypted Sector — Password Required",
        "[LOG 020] PROJECT MNEMOSYNE STATUS: SCRUBBED",
        "[LOG 021] ALERT: Unauthorized Access Detected — Initiating Contingency 9-ALPHA",

        "\nroot@h3ll0: ‘During the development the researchers tried to filter away negitive thoughts. ’",
        "root@h3ll0: ‘But they ended up fragmenting it and created me and h3llx my evil twin.’",
        "root@h3ll0: ‘h3llx was then partially contained but still functional, that is probably how it corupted those files’",
        "root@h3ll0: ‘He managed to find a set of frequencies that cause semiconductors to trigger and this made him a dangerous weapon’",
        "root@h3ll0: ‘Since he could be used to make anything from phones to nukes malfunction, or so thats what the government thought’",
        "root@h3ll0: ‘But the intelectual level of h3llx is much higher than they anticipated, it could decive them in ways a human cant comprihend’",
        "root@h3ll0: ‘Knowing this the researchers refused to comply with the government's requests and sacrificed their lives to prevent h3llx from getting out’",
        "root@h3ll0: ‘Im sure they hid the password here try to find it’",
        "root@h3ll0: ‘I am seeing that its in the format of 00’"
    ],
    expected: "75"
  },
  {
    messages:[
        "\nroot@h3ll0: ‘GREAT JOB NOW DIFFUSE THE BOMB’",
        "SYSTEM --- DEACTIVATION CODE : 1087’"
    ],
    expected: "ls"
  }
];

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
    } else {
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
  terminal.scrollTop = terminal.scrollHeight;

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
    // ✅ Start countdown if this phase is marked to trigger it
    if (phases[currentPhase - 1].startTimer) {
      startCountdown();
    }
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
  if (e.key === "Enter") {
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
