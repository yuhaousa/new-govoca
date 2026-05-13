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

const languageButtons = document.querySelectorAll(".chip");
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

const pageMeta = {
  home: ["Today's path", "Spanish with Sol"],
  practice: ["Practice", "AI conversation room"],
  words: ["Word bank", "Review due today"],
  progress: ["Progress", "Weekly fluency"],
  settings: ["Account", "User settings"],
  notifications: ["Notifications", "Today"],
  lessons: ["Lesson", "Lesson detail"],
  subscription: ["Plan", "Subscription"],
  placement: ["Placement", "Find your level"]
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

revealButton.addEventListener("click", () => {
  revealButton.textContent = "La cuenta, por favor.";
});

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
  phone.classList.toggle("no-nav", target === "settings");

  navItems.forEach((navItem) => navItem.classList.remove("active"));
  if (activeNavItem) {
    activeNavItem.classList.add("active");
  }
  const hideNavPages = ["settings", "notifications", "lessons", "subscription", "placement"];
  bottomNav.style.display = hideNavPages.includes(target) ? "none" : "flex";
  phone.classList.toggle("no-nav", hideNavPages.includes(target));
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
