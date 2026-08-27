const courses = [
  {
    id: 1, title: "Modern JavaScript: From Zero to Production", category: "Development",
    instructor: "Aarav Mehta", rating: 4.9, students: 28400, level: "Beginner", price: 39,
    gradient: "gradient-a", icon: "</>", duration: "8h 20m",
    description: "Build modern browser applications with JavaScript, DOM APIs, async workflows, modules and clean architecture."
  },
  {
    id: 2, title: "UI/UX Design Masterclass", category: "Design",
    instructor: "Maya Rao", rating: 4.9, students: 32100, level: "All levels", price: 45,
    gradient: "gradient-b", icon: "✦", duration: "10h 10m",
    description: "Turn product ideas into clear interfaces with user flows, wireframes, prototypes and a practical design system."
  },
  {
    id: 3, title: "Data Analytics with SQL & Dashboards", category: "Data",
    instructor: "Rohan Kapoor", rating: 4.8, students: 19800, level: "Beginner", price: 34,
    gradient: "gradient-c", icon: "▥", duration: "6h 40m",
    description: "Query real-world datasets, uncover trends and present decisions clearly through dashboards and stories."
  },
  {
    id: 4, title: "AI Workflows for Knowledge Workers", category: "AI",
    instructor: "Nina Shah", rating: 4.9, students: 41600, level: "Beginner", price: 29,
    gradient: "gradient-d", icon: "◎", duration: "5h 55m",
    description: "Use practical AI workflows for research, writing, analysis, ideation and repetitive tasks with confidence."
  },
  {
    id: 5, title: "Product Strategy: From Idea to Launch", category: "Business",
    instructor: "Kabir Singh", rating: 4.7, students: 12400, level: "Intermediate", price: 49,
    gradient: "gradient-c", icon: "↗", duration: "7h 15m",
    description: "Learn market discovery, positioning, prioritization, roadmaps and launch planning with a real product case."
  },
  {
    id: 6, title: "React Frontend Projects Lab", category: "Development",
    instructor: "Dev Patel", rating: 4.8, students: 22100, level: "Intermediate", price: 42,
    gradient: "gradient-a", icon: "⚛", duration: "9h 30m",
    description: "Ship responsive React interfaces through hands-on projects covering state, routing, reusable UI and APIs."
  },
  {
    id: 7, title: "Figma for Fast Product Design", category: "Design",
    instructor: "Leah Kim", rating: 4.8, students: 15700, level: "Beginner", price: 31,
    gradient: "gradient-b", icon: "◈", duration: "4h 50m",
    description: "Create polished product screens in Figma and move quickly from blank canvas to clickable prototype."
  },
  {
    id: 8, title: "Python for Data Thinking", category: "Data",
    instructor: "Ishaan Verma", rating: 4.9, students: 26500, level: "Beginner", price: 37,
    gradient: "gradient-d", icon: "Py", duration: "8h 05m",
    description: "Learn Python through data tasks: cleaning, transformation, visualization and small automation projects."
  },
  {
    id: 9, title: "Prompt Engineering for Creators", category: "AI",
    instructor: "Zoya Malik", rating: 4.7, students: 18200, level: "All levels", price: 25,
    gradient: "gradient-a", icon: "✎", duration: "3h 45m",
    description: "Build reliable prompts for brainstorming, content creation, analysis and rapid prototyping."
  }
];

const state = {
  category: "all",
  query: "",
  sort: "popular"
};

const courseGrid = document.getElementById("courseGrid");
const emptyState = document.getElementById("emptyState");
const modal = document.getElementById("courseModal");
const toast = document.getElementById("toast");

function formatStudents(n) {
  return n >= 1000 ? `${(n / 1000).toFixed(n % 1000 === 0 ? 0 : 1)}k` : n;
}

function filteredCourses() {
  let list = courses.filter(c => {
    const matchesCategory = state.category === "all" || c.category === state.category;
    const haystack = `${c.title} ${c.category} ${c.instructor}`.toLowerCase();
    return matchesCategory && haystack.includes(state.query.toLowerCase());
  });

  if (state.sort === "rating") list.sort((a,b) => b.rating - a.rating);
  if (state.sort === "price-low") list.sort((a,b) => a.price - b.price);
  if (state.sort === "popular") list.sort((a,b) => b.students - a.students);
  return list;
}

function renderCourses() {
  const list = filteredCourses();
  courseGrid.innerHTML = list.map(c => `
    <article class="course-card">
      <div class="course-art ${c.gradient}">
        <span class="course-tag">${c.category}</span>
        <div class="course-icon">${c.icon}</div>
      </div>
      <div class="course-body">
        <h3>${c.title}</h3>
        <p>${c.description}</p>
        <div class="course-meta">
          <span>${c.instructor}</span>
          <span>${c.level} · ${c.duration}</span>
        </div>
        <div class="course-bottom">
          <span class="rating">★ ${c.rating} <small>(${formatStudents(c.students)})</small></span>
          <span class="price">$${c.price}</span>
        </div>
      </div>
    </article>
  `).join("");

  courseGrid.querySelectorAll(".course-card").forEach((card, index) => {
    card.addEventListener("click", () => openCourseModal(list[index]));
    card.style.cursor = "pointer";
  });

  emptyState.classList.toggle("hidden", list.length > 0);
}

function setCategory(category) {
  state.category = category;
  document.querySelectorAll(".pill").forEach(p => p.classList.toggle("active", p.dataset.category === category));
  renderCourses();
}

document.querySelectorAll(".pill").forEach(p => p.addEventListener("click", () => setCategory(p.dataset.category)));

document.querySelectorAll(".category-card").forEach(btn => {
  btn.addEventListener("click", () => {
    setCategory(btn.dataset.filter);
    document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
  });
});

document.getElementById("sortSelect").addEventListener("change", e => {
  state.sort = e.target.value;
  renderCourses();
});

function applySearch(q) {
  state.query = q.trim();
  setCategory("all");
  renderCourses();
  document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
}

document.getElementById("heroSearchForm").addEventListener("submit", e => {
  e.preventDefault();
  applySearch(document.getElementById("heroSearch").value);
});

function openCourseModal(course) {
  document.getElementById("modalVisual").className = `modal-visual ${course.gradient}`;
  document.getElementById("modalCategory").textContent = course.category.toUpperCase();
  document.getElementById("modalTitle").textContent = course.title;
  document.getElementById("modalDescription").textContent = course.description;
  document.getElementById("modalInstructor").textContent = `Instructor: ${course.instructor}`;
  document.getElementById("modalRating").textContent = `★ ${course.rating}`;
  document.getElementById("modalLevel").textContent = `${course.level} · ${course.duration}`;
  document.getElementById("modalPrice").textContent = `$${course.price}`;
  document.getElementById("enrollBtn").dataset.courseId = course.id;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.classList.add("hidden");
  document.body.style.overflow = "";
}

document.getElementById("modalClose").addEventListener("click", closeModal);
modal.addEventListener("click", e => {
  if (e.target.dataset.close === "true") closeModal();
});
document.addEventListener("keydown", e => {
  if (e.key === "Escape") closeModal();
});

document.getElementById("enrollBtn").addEventListener("click", () => {
  const id = Number(document.getElementById("enrollBtn").dataset.courseId);
  const course = courses.find(c => c.id === id);
  const enrolled = JSON.parse(localStorage.getItem("learnspaceEnrolled") || "[]");
  if (!enrolled.includes(id)) enrolled.push(id);
  localStorage.setItem("learnspaceEnrolled", JSON.stringify(enrolled));
  closeModal();
  showToast(`${course.title} added to your learning list`);
});

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 2800);
}

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  localStorage.setItem("learnspaceTheme", document.body.classList.contains("dark") ? "dark" : "light");
});

if (localStorage.getItem("learnspaceTheme") === "dark") document.body.classList.add("dark");

document.getElementById("mobileMenu").addEventListener("click", () => {
  document.getElementById("navLinks").classList.toggle("open");
});

["loginBtn", "signupBtn", "ctaBtn"].forEach(id => {
  document.getElementById(id).addEventListener("click", () => showToast("Demo interaction — connect this button to your auth system."));
});

document.getElementById("featuredBtn").addEventListener("click", () => {
  setCategory("AI");
  document.getElementById("explore").scrollIntoView({ behavior: "smooth" });
});

document.querySelectorAll(".nav-links a").forEach(a => {
  a.addEventListener("click", () => document.getElementById("navLinks").classList.remove("open"));
});

renderCourses();
