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
    document.querySelector(".flashcard h2").textContent = word;
    document.querySelector(".flashcard p:last-of-type").textContent = button.querySelector("span").textContent;
    showToast(`${word} opened in flashcard`);
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

if (revealButton) {
  revealButton.addEventListener("click", () => {
    revealButton.textContent = "La cuenta, por favor.";
  });
}

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

  if (label === "Reveal example" || label === "La cuenta, por favor.") {
    button.textContent = "La cuenta, por favor.";
    showToast("Example revealed");
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
