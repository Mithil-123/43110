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

let currentPhase = 0;
let terminalDiv, countdownDiv;
let inputBuffer = "";
let promptLine;
let timer = null;
let timeLeft = 900;

document.addEventListener("DOMContentLoaded", init);

function typeLine(text, delay = 30) {
    return new Promise(resolve => {
        let i = 0;
        let line = document.createElement("div");
        terminalDiv.appendChild(line);
        let interval = setInterval(() => {
            line.textContent += text[i];
            terminalDiv.scrollTop = terminalDiv.scrollHeight;
            i++;
            if (i >= text.length) {
                clearInterval(interval);
                resolve();
            }
        }, delay);
    });
}

async function printMessages(messages) {
    for (let msg of messages) {
        await typeLine(msg);
    }
    addPrompt();
}

function addPrompt() {
    promptLine = document.createElement("div");
    promptLine.innerHTML = `<span class="green">agent@shr :</span> <span id="typed"></span><span class="cursor">█</span>`;
    terminalDiv.appendChild(promptLine);
    terminalDiv.scrollTop = terminalDiv.scrollHeight;
}

function updatePrompt() {
    const typedSpan = promptLine.querySelector("#typed");
    typedSpan.textContent = inputBuffer;
    terminalDiv.scrollTop = terminalDiv.scrollHeight;
}

function startCountdown() {
    countdownDiv.style.display = "block";
    updateCountdown();
    timer = setInterval(() => {
        timeLeft--;
        updateCountdown();
        if (timeLeft <= 0) {
            clearInterval(timer);
            countdownDiv.classList.remove("blink");
            countdownDiv.innerHTML = "00:00 — Impact!";
            countdownDiv.style.color = "#f00";
        }
    }, 1000);
}

function updateCountdown() {
    let mins = String(Math.floor(timeLeft / 60)).padStart(2, '0');
    let secs = String(timeLeft % 60).padStart(2, '0');
    countdownDiv.innerHTML = `${mins}:${secs}`;

    if (timeLeft <= 10) {
        countdownDiv.style.color = "#f00";
    } else {
        countdownDiv.style.color = "#00ff00";
    }

    if (timeLeft <= 5 && timeLeft > 0) {
        countdownDiv.classList.add("blink");
    } else {
        countdownDiv.classList.remove("blink");
    }
}

async function processInput(value) {
    promptLine.remove(); // remove current input line
    if (value.trim().toLowerCase() === phases[currentPhase].expected) {
        currentPhase++;
        if (currentPhase < phases.length) {
            // ✅ Start timer immediately if this phase has startTimer flag
            if (phases[currentPhase].startTimer) {
                startCountdown();
            }
            await printMessages(phases[currentPhase].messages);
        } else {
            await typeLine("SEQUENCE COMPLETE");
        }
    } else {
        await typeLine("INVALID CODE");
        addPrompt();
    }
}

function init() {
    terminalDiv = document.getElementById("terminal");
    countdownDiv = document.getElementById("countdown");
    countdownDiv.style.display = "none";

    printMessages(phases[0].messages);

    document.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            processInput(inputBuffer);
            inputBuffer = "";
        } else if (e.key === "Backspace") {
            inputBuffer = inputBuffer.slice(0, -1);
            updatePrompt();
        } else if (e.key.length === 1) {
            inputBuffer += e.key;
            updatePrompt();
        }
    });
}