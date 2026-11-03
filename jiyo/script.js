const envelopeScene = document.querySelector("#envelope-scene");
const envelopeButton = document.querySelector("#envelope-toggle");
const letter = document.querySelector("#letter");
const hint = document.querySelector("#envelope-hint");
const musicButton = document.querySelector("#music-toggle");
const musicLabel = document.querySelector("#music-label");
const melody = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 783.99, 659.25];
let audioContext;
let masterGain;
let melodyTimer;
let noteIndex = 0;
let musicEnabled = false;
let hasOpened = false;

function updateMusicControl() {
  musicButton.setAttribute("aria-pressed", String(musicEnabled));
  musicLabel.textContent = musicEnabled ? "Pause music" : "Play music";
}

function playNextNote() {
  if (!musicEnabled || !audioContext || !masterGain) return;

  const oscillator = audioContext.createOscillator();
  const noteGain = audioContext.createGain();
  const startTime = audioContext.currentTime;
  oscillator.type = "sine";
  oscillator.frequency.value = melody[noteIndex];
  noteGain.gain.setValueAtTime(0.0001, startTime);
  noteGain.gain.exponentialRampToValueAtTime(0.22, startTime + 0.04);
  noteGain.gain.exponentialRampToValueAtTime(0.0001, startTime + 0.48);
  oscillator.connect(noteGain);
  noteGain.connect(masterGain);
  oscillator.start(startTime);
  oscillator.stop(startTime + 0.5);
  noteIndex = (noteIndex + 1) % melody.length;
  melodyTimer = window.setTimeout(playNextNote, 520);
}

async function startMusic() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    musicEnabled = false;
    musicLabel.textContent = "Music unavailable";
    musicButton.disabled = true;
    musicButton.setAttribute("aria-pressed", "false");
    return;
  }

  if (!audioContext) {
    audioContext = new AudioContextClass();
    masterGain = audioContext.createGain();
    masterGain.gain.value = 0.12;
    masterGain.connect(audioContext.destination);
  }

  await audioContext.resume();
  if (musicEnabled) playNextNote();
}

function stopMusic() {
  window.clearTimeout(melodyTimer);
  if (masterGain && audioContext) {
    masterGain.gain.setTargetAtTime(0, audioContext.currentTime, 0.04);
  }
}

function enableMusic() {
  musicEnabled = true;
  updateMusicControl();
  if (masterGain && audioContext) {
    masterGain.gain.setTargetAtTime(0.12, audioContext.currentTime, 0.04);
  }
  void startMusic();
}

envelopeButton.addEventListener("click", () => {
  const isOpen = envelopeButton.getAttribute("aria-expanded") !== "true";
  envelopeButton.setAttribute("aria-expanded", String(isOpen));
  envelopeButton.setAttribute("aria-label", isOpen ? "Close the envelope" : "Open the envelope");
  envelopeScene.classList.toggle("is-open", isOpen);
  letter.setAttribute("aria-hidden", String(!isOpen));
  hint.textContent = isOpen ? "Tap the envelope to close your note" : "Tap the envelope to open your note";

  if (isOpen && !hasOpened) {
    hasOpened = true;
    enableMusic();
  }
});

musicButton.addEventListener("click", () => {
  musicEnabled = !musicEnabled;
  updateMusicControl();
  if (musicEnabled) {
    void startMusic();
  } else {
    stopMusic();
  }
});
