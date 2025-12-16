// =======================
// Paste your real content here (from your GitHub profile + repos)
// =======================
const PROFILE = {
  name: "Saman Chudhary",
  kicker: "HELLO THERE",
  headline: "I’m Saman Chudhary.\nI build modern web experiences.",
  subhead:
    "Developer focused on clean UI, performance, and scalable code. I enjoy building products end-to-end.",
  about:
    "Replace this with your actual summary from GitHub/Resume: what you do, what you're learning, and what kind of roles/projects you want.",
  resumeUrl: "https://github.com/Saman-Chudhary", // put your resume link (Drive/PDF) here
  email: "your@email.com",
  github: "https://github.com/Saman-Chudhary",
  linkedin: "https://www.linkedin.com/in/your-link/",
  social: [
    { label: "GitHub", icon: "fa-brands fa-github", url: "https://github.com/Saman-Chudhary" },
    { label: "LinkedIn", icon: "fa-brands fa-linkedin", url: "https://www.linkedin.com/in/your-link/" },
    { label: "Email", icon: "fa-regular fa-envelope", url: "mailto:your@email.com" }
  ],
  stats: [
    { value: "10+", label: "Projects" },
    { value: "2025", label: "Active year" },
    { value: "∞", label: "Learning" }
  ],
  whatIDo: [
    "Frontend development (responsive UI, accessibility)",
    "Backend APIs (auth, CRUD, integrations)",
    "Database + deployment (practical shipping)"
  ],
  skills: [
    {
      title: "Frontend",
      icon: "fa-solid fa-code",
      desc: "HTML, CSS, JavaScript, React (edit to match your stack)."
    },
    {
      title: "Backend",
      icon: "fa-solid fa-server",
      desc: "Node.js/Express, REST APIs, authentication (edit to match)."
    },
    {
      title: "Tools",
      icon: "fa-solid fa-screwdriver-wrench",
      desc: "Git/GitHub, VS Code, Postman, CI basics (edit to match)."
    }
  ],
  contactBlurb:
    "Open to internships / freelance / collaborations. Send a message and I’ll respond as soon as possible."
};

// Add your repos/projects here (title, tags, demo, github)
const PROJECTS = [
  {
    title: "Project One",
    desc: "One-line value statement for your project.",
    tags: ["Web", "Frontend"],
    year: "2025",
    role: "Developer",
    github: "https://github.com/Saman-Chudhary",
    demo: "#"
  },
  {
    title: "Project Two",
    desc: "What it does + why it matters.",
    tags: ["API", "Backend"],
    year: "2025",
    role: "Full-stack",
    github: "https://github.com/Saman-Chudhary",
    demo: "#"
  },
  {
    title: "Project Three",
    desc: "Highlight a feature (auth, payments, dashboards, etc.).",
    tags: ["React", "UI"],
    year: "2024",
    role: "Frontend",
    github: "https://github.com/Saman-Chudhary",
    demo: "#"
  }
];

// =======================
// Rendering
// =======================
const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}

function setHTML(id, html) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = html;
}

function renderProfile() {
  setText("brandName", PROFILE.name);
  setText("footerName", PROFILE.name);
  setText("heroKicker", PROFILE.kicker);

  // headline supports line breaks
  const heroTitle = $("#heroTitle");
  if (heroTitle) {
    heroTitle.innerHTML = PROFILE.headline
      .replace(PROFILE.name, `<span class="accent">${PROFILE.name}</span>`)
      .replace(/\n/g, "<br/>");
  }
  setText("heroSub", PROFILE.subhead);
  setText("aboutText", PROFILE.about);

  const resumeBtn = $("#resumeBtn");
  if (resumeBtn) resumeBtn.href = PROFILE.resumeUrl;

  setText("emailText", PROFILE.email);
  const emailLink = $("#emailLink");
  if (emailLink) emailLink.href = `mailto:${PROFILE.email}`;

  const githubLink = $("#githubLink");
  if (githubLink) githubLink.href = PROFILE.github;

  const linkedinLink = $("#linkedinLink");
  if (linkedinLink) linkedinLink.href = PROFILE.linkedin;

  setText("contactBlurb", PROFILE.contactBlurb);

  // social pills
  setHTML(
    "socialLinks",
    PROFILE.social
      .map(
        (s) => `
      <a class="pill" href="${s.url}" ${s.url.startsWith("mailto:") ? "" : 'target="_blank" rel="noreferrer"'}>
        <i class="${s.icon}"></i>
        <span>${s.label}</span>
      </a>`
      )
      .join("")
  );

  // stats
  setHTML(
    "stats",
    PROFILE.stats
      .map(
        (st) => `
      <div class="stat reveal">
        <b>${st.value}</b>
        <span>${st.label}</span>
      </div>`
      )
      .join("")
  );

  // what i do
  setHTML(
    "whatIDo",
    PROFILE.whatIDo
      .map((x) => `<li class="reveal"><i class="fa-solid fa-check"></i><span>${x}</span></li>`)
      .join("")
  );

  // skill cards
  setHTML(
    "skillCards",
    PROFILE.skills
      .map(
        (c) => `
      <article class="card reveal">
        <div class="card__icon"><i class="${c.icon}"></i></div>
        <h3>${c.title}</h3>
        <p>${c.desc}</p>
      </article>`
      )
      .join("")
  );

  setText("year", String(new Date().getFullYear()));
}

function uniqueTags(projects) {
  const all = projects.flatMap((p) => p.tags || []);
  return ["All", ...Array.from(new Set(all))];
}

let activeTag = "All";

function renderFilters() {
  const tags = uniqueTags(PROJECTS);
  setHTML(
    "filters",
    tags
      .map(
        (t) => `
      <button class="filter ${t === activeTag ? "is-active" : ""}" data-tag="${t}">
        ${t}
      </button>`
      )
      .join("")
  );

  $$("#filters .filter").forEach((btn) => {
    btn.addEventListener("click", () => {
      activeTag = btn.dataset.tag;
      renderFilters();
      renderProjects();
    });
  });
}

function projectCard(p, index) {
  const tags = (p.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");
  return `
    <article class="project reveal" data-index="${index}" tabindex="0" role="button" aria-label="Open project ${p.title}">
      <div class="project__thumb"></div>
      <div class="project__body">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="tags">${tags}</div>
      </div>
    </article>
  `;
}

function renderProjects() {
  const filtered =
    activeTag === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => (p.tags || []).includes(activeTag));

  setHTML("projectGrid", filtered.map(projectCard).join(""));

  // map click -> open modal using original index by title match
  $$("#projectGrid .project").forEach((card) => {
    const title = $(".project__body h3", card)?.textContent;
    const idx = PROJECTS.findIndex((p) => p.title === title);

    const open = () => openModal(PROJECTS[idx]);
    card.addEventListener("click", open);
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") open();
    });
  });

  observeReveals();
}

function openModal(project) {
  const modal = $("#modal");
  const content = $("#modalContent");
  if (!modal || !content) return;

  const tags = (project.tags || []).map((t) => `<span class="tag">${t}</span>`).join("");

  content.innerHTML = `
    <div class="modal__header">
      <div>
        <h3>${project.title}</h3>
        <p>${project.desc}</p>
      </div>
      <div class="modal__actions">
        ${project.demo && project.demo !== "#" ? `<a class="btn btn--primary" href="${project.demo}" target="_blank" rel="noreferrer">Live Demo</a>` : ""}
        ${project.github ? `<a class="btn btn--ghost" href="${project.github}" target="_blank" rel="noreferrer">GitHub</a>` : ""}
      </div>
    </div>

    <div class="modal__grid">
      <div class="modal__preview"></div>
      <div class="modal__meta">
        <div class="metaRow"><b>Year</b><span>${project.year || "-"}</span></div>
        <div class="metaRow"><b>Role</b><span>${project.role || "-"}</span></div>
        <div class="metaRow"><b>Tags</b><span>${tags || "-"}</span></div>
      </div>
    </div>
  `;

  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  const modal = $("#modal");
  if (!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

function bindModal() {
  const modal = $("#modal");
  if (!modal) return;

  modal.addEventListener("click", (e) => {
    const target = e.target;
    if (target && target.dataset && target.dataset.close === "true") closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });
}

function bindNav() {
  const toggle = $(".navToggle");
  const nav = $("#nav");
  if (!toggle || !nav) return;

  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  // close on click
  $$("#nav a").forEach((a) => {
    a.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

let revealObserver;
function observeReveals() {
  if (revealObserver) revealObserver.disconnect();

  const items = $$(".reveal");
  revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) en.target.classList.add("is-visible");
      });
    },
    { threshold: 0.12 }
  );

  items.forEach((el) => revealObserver.observe(el));
}

// init
renderProfile();
renderFilters();
renderProjects();
bindModal();
bindNav();
observeReveals();
