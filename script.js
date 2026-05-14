const languageData = {
  Spanish: {
    title: "Practice ordering coffee",
    copy: "Sol adapts the next prompt to your accent, pace, and confidence.",
    line: "Quisiera un cafe con leche."
  },
  French: {
    title: "Ask for a train ticket",
    copy: "Sol listens for rhythm, liaison, and the phrases you almost know.",
    line: "Je voudrais un billet pour Lyon."
  },
  Korean: {
    title: "Order lunch politely",
    copy: "Sol guides honorifics, pronunciation, and natural sentence endings.",
    line: "Bibimbap hana juseyo."
  }
};

const languageButtons = document.querySelectorAll(".language-switcher .chip");
const coachTitle = document.querySelector("#coach-title");
const coachCopy = document.querySelector("#coach-copy");
const learnerLine = document.querySelector("#learner-line");
const speakButton = document.querySelector("#speak-button");
const speakLabel = document.querySelector("#speak-label");
const speakIcon = document.querySelector("#speak-icon");
const dialogueCard = document.querySelector(".dialogue-card");
const lessonCards = document.querySelectorAll(".lesson-card");
const navItems = document.querySelectorAll(".nav-item");
const pageScreens = document.querySelectorAll(".page-screen");
const modeTabs = document.querySelectorAll(".mode-tab");
const promptCards = document.querySelectorAll(".prompt-card");
const revealButton = document.querySelector(".primary-action");
const profileButton = document.querySelector("#profile-button");
const signOutButton = document.querySelector("#sign-out-button");
const authScreens = document.querySelectorAll(".auth-screen");
const authOpenButtons = document.querySelectorAll("[data-auth-open]");
const authCloseButtons = document.querySelectorAll("[data-auth-close]");
const bottomNav = document.querySelector(".bottom-nav");
const phone = document.querySelector(".phone");
const appKicker = document.querySelector("#app-kicker");
const appTitle = document.querySelector("#app-title");
const settingsBack = document.querySelector("#settings-back");
const notificationsButton = document.querySelector("#notifications-button");
const seeLessonsButton = document.querySelector("#see-lessons-button");
const subscriptionButton = document.querySelector("#subscription-button");
const backHomeButtons = document.querySelectorAll("[data-back-home]");
const backSettingsButtons = document.querySelectorAll("[data-back-settings]");
const placementButton = document.querySelector("[data-open-placement]");
const lessonDetailTitle = document.querySelector("#lesson-detail-title");
const lessonDetailCopy = document.querySelector("#lesson-detail-copy");
const toast = document.querySelector("#app-toast");
const flashcardWord = document.querySelector("#flashcard-word");
const flashcardMeaning = document.querySelector("#flashcard-meaning");
const flashcardExample = document.querySelector("#flashcard-example");
const flashcardStatus = document.querySelector("#flashcard-status");
const flashcardCount = document.querySelector("#flashcard-count");
const flashcardProgressBar = document.querySelector("#flashcard-progress-bar");
const flashcardReveal = document.querySelector("#flashcard-reveal");
const flashcardRatingButtons = document.querySelectorAll("[data-flash-rating]");

const settingOptions = {
  "voice-speed": ["Slow", "Normal", "Fast"],
  "correction-mode": ["Gentle coaching", "Detailed correction", "Strict scoring"],
  "target-language": ["Spanish", "French", "Korean"],
  "native-language": ["English", "Mandarin", "Spanish"],
  level: ["A1 starter", "A2 beginner", "B1 intermediate"]
};

const flashcards = [
  {
    word: "la cuenta",
    meaning: "the bill, the check",
    example: "La cuenta, por favor.",
    status: "Due now"
  },
  {
    word: "gracias",
    meaning: "thank you",
    example: "Gracias por ayudarme.",
    status: "Known"
  },
  {
    word: "azucar",
    meaning: "sugar",
    example: "Cafe con azucar, por favor.",
    status: "Learning"
  },
  {
    word: "mesa",
    meaning: "table",
    example: "Tenemos una mesa para dos.",
    status: "Learning"
  },
  {
    word: "izquierda",
    meaning: "left",
    example: "Gira a la izquierda.",
    status: "Needs work"
  }
];

let currentFlashcard = 0;
let flashcardRevealed = false;
let flashcardAdvanceTimer;

const pageMeta = {
  home: ["Today's path", "Spanish with Sol"],
  practice: ["Practice", "AI conversation room"],
  words: ["Word bank", "Review due today"],
  progress: ["Progress", "Weekly fluency"],
  settings: ["Account", "User settings"],
  notifications: ["Notifications", "Today"],
  lessons: ["Lesson", "Lesson detail"],
  subscription: ["Plan", "Subscription"],
  placement: ["Placement", "Find your level"],
  "screen-map": ["Design map", "30 screens"],
  "lesson-library": ["Lessons", "Library"],
  "conversation-history": ["History", "AI conversations"],
  "pronunciation-lab": ["Practice", "Pronunciation lab"],
  "listening-practice": ["Practice", "Listening"],
  "writing-coach": ["Coach", "Writing"],
  "grammar-coach": ["Coach", "Grammar"],
  "review-session": ["Review", "Memory session"],
  "word-detail": ["Words", "Word detail"],
  phrasebook: ["Words", "Phrasebook"],
  "daily-challenge": ["Challenge", "Daily sprint"],
  achievement: ["Progress", "Achievements"],
  calendar: ["Schedule", "Study calendar"],
  "ai-plan": ["AI plan", "7-day path"],
  "goal-settings": ["Settings", "Goals"],
  "language-settings": ["Settings", "Languages"],
  "voice-settings": ["Settings", "Voice"],
  security: ["Settings", "Security"],
  "help-center": ["Support", "Help center"]
};

languageButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = languageData[button.dataset.language];

    languageButtons.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    coachTitle.textContent = selected.title;
    coachCopy.textContent = selected.copy;
    learnerLine.textContent = selected.line;
  });
});

speakButton.addEventListener("click", () => {
  const isRecording = dialogueCard.classList.toggle("recording");

  speakLabel.textContent = isRecording ? "Listening..." : "Start speaking";
  speakIcon.textContent = isRecording ? "stop" : "mic";
  speakButton.setAttribute("aria-pressed", String(isRecording));
});

lessonCards.forEach((card) => {
  card.addEventListener("click", () => {
    lessonCards.forEach((item) => item.classList.remove("selected"));
    card.classList.add("selected");
    coachTitle.textContent = card.dataset.title;
    coachCopy.textContent = `AI recommendation: ${card.dataset.score} after one focused round.`;
    lessonDetailTitle.textContent = card.dataset.title;
    lessonDetailCopy.textContent = `${card.dataset.score} expected from one focused AI coaching round.`;
    showPage("lessons");
  });
});

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    showPage(item.dataset.target, item);
  });
});

document.addEventListener("click", (event) => {
  const openButton = event.target.closest("[data-open-page]");
  if (openButton) {
    showPage(openButton.dataset.openPage);
    return;
  }

  const button = event.target.closest("button");
  if (!button) return;

  const settingKey = button.dataset.settingEdit;
  if (settingKey) {
    editSetting(button, settingKey);
    return;
  }

  if (button.closest(".onboarding-picks")) {
    setActiveWithin(button, ".onboarding-picks", ".chip");
    showToast(`${button.textContent.trim()} goal selected`);
    return;
  }

  if (button.closest(".mode-tabs")) {
    showToast(`${button.textContent.trim()} mode selected`);
    return;
  }

  if (button.closest(".question-card")) {
    setActiveWithin(button, ".question-card", "button");
    showToast(button.textContent.includes("Quiero") ? "Correct answer selected" : "Try another option");
    return;
  }

  if (button.closest(".answer-grid")) {
    setActiveWithin(button, ".answer-grid", "button");
    if (button.closest('[data-page="goal-settings"]')) {
      const dailyGoal = document.querySelector(".setting-row strong");
      const dailyGoalMeta = document.querySelector(".setting-row small");
      dailyGoal.textContent = "Daily goal";
      dailyGoalMeta.textContent = `${button.textContent.trim()} per day`;
    }
    showToast(`${button.textContent.trim()} selected`);
    return;
  }

  if (button.closest(".review-actions")) {
    setActiveWithin(button, ".review-actions", "button");
    showToast(`Review marked: ${button.textContent.trim()}`);
    return;
  }

  if (button.classList.contains("word-tile")) {
    document.querySelectorAll(".word-tile").forEach((tile) => tile.classList.remove("choice-selected"));
    button.classList.add("choice-selected");
    const word = button.querySelector("strong").textContent;
    const index = flashcards.findIndex((card) => card.word === word);
    if (index >= 0) {
      clearTimeout(flashcardAdvanceTimer);
      currentFlashcard = index;
      renderFlashcard(false);
    }
    showToast(`${word} opened in flashcard`);
    return;
  }

  const flashRating = button.dataset.flashRating;
  if (flashRating) {
    rateFlashcard(button, flashRating);
    return;
  }

  if (button.classList.contains("lesson-start")) {
    showPage("practice", document.querySelector('[data-target="practice"]'));
    showToast("Lesson started");
    return;
  }

  if (button.classList.contains("primary-action")) {
    handlePrimaryAction(button);
    return;
  }

  if (button.classList.contains("setting-control")) {
    showToast("Setting editor opened");
    return;
  }

  if (button.classList.contains("menu-row")) {
    showToast(`${button.querySelector("span")?.textContent || "Setting"} selected`);
    return;
  }

  if (button.classList.contains("text-button")) {
    handleTextButton(button);
  }
});

modeTabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    modeTabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
  });
});

promptCards.forEach((card) => {
  card.addEventListener("click", () => {
    promptCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
  });
});

renderFlashcard(false);

profileButton.addEventListener("click", () => {
  showPage("settings");
});

settingsBack.addEventListener("click", () => {
  showPage("home", document.querySelector('[data-target="home"]'));
});

notificationsButton.addEventListener("click", () => {
  showPage("notifications");
});

seeLessonsButton.addEventListener("click", () => {
  showPage("lessons");
});

subscriptionButton.addEventListener("click", () => {
  showPage("subscription");
});

backHomeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showPage("home", document.querySelector('[data-target="home"]'));
  });
});

backSettingsButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showPage("settings");
  });
});

signOutButton.addEventListener("click", () => {
  showAuth("login");
});

authOpenButtons.forEach((button) => {
  button.addEventListener("click", () => {
    showAuth(button.dataset.authOpen);
  });
});

authCloseButtons.forEach((button) => {
  button.addEventListener("click", () => {
    hideAuth();
    showPage("home", document.querySelector('[data-target="home"]'));
  });
});

placementButton.addEventListener("click", () => {
  hideAuth();
  showPage("placement");
});

function showPage(target, activeNavItem) {
  pageScreens.forEach((screen) => screen.classList.remove("active"));
  document.querySelector(`[data-page="${target}"]`).classList.add("active");
  appKicker.textContent = pageMeta[target][0];
  appTitle.textContent = pageMeta[target][1];
  phone.classList.toggle("compact", target !== "home");

  navItems.forEach((navItem) => navItem.classList.remove("active"));
  if (activeNavItem) {
    activeNavItem.classList.add("active");
  }
  const mainPages = ["home", "practice", "words", "progress"];
  bottomNav.style.display = mainPages.includes(target) ? "flex" : "none";
  phone.classList.toggle("no-nav", !mainPages.includes(target));
}

function showAuth(target) {
  phone.classList.add("auth-mode");
  authScreens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.auth === target);
  });
}

function hideAuth() {
  phone.classList.remove("auth-mode");
  authScreens.forEach((screen) => screen.classList.remove("active"));
}

function setActiveWithin(button, containerSelector, itemSelector) {
  const container = button.closest(containerSelector);
  container.querySelectorAll(itemSelector).forEach((item) => {
    item.classList.remove("active", "choice-selected");
  });
  button.classList.add(button.classList.contains("chip") ? "active" : "choice-selected");
}

function handlePrimaryAction(button) {
  const label = button.textContent.trim();

  if (button.id === "flashcard-reveal") {
    if (!flashcardRevealed) {
      renderFlashcard(true);
      showToast("Answer revealed");
    } else {
      nextFlashcard();
      showToast("Next flashcard");
    }
    return;
  }

  if (label === "Keep Plus") {
    button.textContent = "Plus active";
    showToast("Subscription confirmed");
    return;
  }

  if (label === "I remembered") {
    showToast("Memory review saved");
    return;
  }

  if (label === "Start sprint") {
    button.textContent = "Sprint running...";
    showToast("Daily challenge started");
    return;
  }

  if (label === "Regenerate plan") {
    button.textContent = "Plan refreshed";
    showToast("AI plan regenerated");
    return;
  }

  showToast(`${label} selected`);
}

function handleTextButton(button) {
  const label = button.textContent.trim();

  if (label === "Shuffle") {
    const grid = document.querySelector(".word-grid");
    grid.append(...Array.from(grid.children).reverse());
    showToast("Words shuffled");
    return;
  }

  if (label === "Forgot password?") {
    showToast("Password reset link sent");
  }
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => {
    toast.classList.remove("show");
  }, 1500);
}

function renderFlashcard(revealed) {
  const card = flashcards[currentFlashcard];
  flashcardRevealed = revealed;

  flashcardWord.textContent = card.word;
  flashcardStatus.textContent = card.status;
  flashcardMeaning.textContent = revealed ? card.meaning : "Tap reveal when you remember the meaning.";
  flashcardExample.textContent = revealed ? `Example: ${card.example}` : "Example appears after reveal.";
  flashcardReveal.textContent = revealed ? "Next card" : "Reveal answer";
  flashcardCount.textContent = `${currentFlashcard + 1} / ${flashcards.length}`;
  flashcardProgressBar.style.width = `${((currentFlashcard + 1) / flashcards.length) * 100}%`;
  flashcardRatingButtons.forEach((button) => button.classList.remove("choice-selected"));
}

function rateFlashcard(button, rating) {
  if (!flashcardRevealed) {
    renderFlashcard(true);
  }

  flashcardRatingButtons.forEach((item) => item.classList.remove("choice-selected"));
  button.classList.add("choice-selected");
  const statusMap = {
    hard: "Needs work",
    learning: "Learning",
    known: "Known"
  };
  flashcards[currentFlashcard].status = statusMap[rating];
  flashcardStatus.textContent = statusMap[rating];
  showToast(`${flashcards[currentFlashcard].word} marked ${statusMap[rating].toLowerCase()}`);
  clearTimeout(flashcardAdvanceTimer);
  flashcardAdvanceTimer = setTimeout(nextFlashcard, 650);
}

function nextFlashcard() {
  clearTimeout(flashcardAdvanceTimer);
  currentFlashcard = (currentFlashcard + 1) % flashcards.length;
  renderFlashcard(false);
}

function editSetting(button, key) {
  const options = settingOptions[key];
  if (!options) {
    showToast("Setting updated");
    return;
  }

  const valueNode = button.closest(".setting-row")?.querySelector("[data-setting-value]") || button.querySelector("strong");
  const current = valueNode.textContent.trim();
  const next = options[(options.indexOf(current) + 1) % options.length] || options[0];
  valueNode.textContent = next;

  if (key === "target-language") {
    document.querySelector('[data-open-page="language-settings"] strong').textContent = next;
  }

  showToast(`${button.querySelector("span")?.textContent || key.replaceAll("-", " ")} set to ${next}`);
}
