const products = [
  {
    name: "GPT账号",
    icon: "🤖",
    description: "适合学习、办公与内容创作的智能 AI 账号服务。",
    price: "¥39",
    period: "月付",
  },
  {
    name: "Spotify会员",
    icon: "🎧",
    description: "畅听高品质音乐与播客，享受更纯净的收听体验。",
    price: "¥25",
    period: "月付",
  },
  {
    name: "Netflix会员",
    icon: "🎬",
    description: "精选影视剧集会员权益，适合追剧与家庭娱乐。",
    price: "¥45",
    period: "月付",
  },
  {
    name: "VPN服务",
    icon: "🔐",
    description: "稳定加密连接服务，满足多场景网络访问需求。",
    price: "¥29",
    period: "月付",
  },
];

const productGrid = document.querySelector("#productGrid");
const toast = document.querySelector("#toast");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = themeToggle.querySelector(".theme-icon");
const themeText = themeToggle.querySelector(".theme-text");
const backToTop = document.querySelector("#backToTop");
let toastTimer;

function renderProducts() {
  productGrid.innerHTML = products
    .map(
      (product, index) => `
        <article class="product-card reveal" style="transition-delay: ${index * 0.08}s">
          <div class="product-icon" aria-hidden="true">${product.icon}</div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-meta">
            <div>
              <span>价格</span>
              <strong>${product.price}</strong>
            </div>
            <div>
              <span>周期</span>
              <strong>${product.period}</strong>
            </div>
          </div>
          <button class="btn btn-primary" type="button" data-product="${product.name}">立即购买</button>
        </article>
      `,
    )
    .join("");
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");

  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 2400);
}

function getPreferredTheme() {
  const savedTheme = localStorage.getItem("cloudshop-theme");

  if (savedTheme) {
    return savedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function applyTheme(theme) {
  const isDark = theme === "dark";

  document.documentElement.dataset.theme = theme;
  themeToggle?.setAttribute("aria-pressed", String(isDark));

  if (themeIcon) {
    themeIcon.textContent = isDark ? "☀️" : "🌙";
  }

  if (themeText) {
    themeText.textContent = isDark ? "浅色" : "深色";
  }

  themeToggle?.setAttribute("aria-label", isDark ? "切换浅色模式" : "切换深色模式");
  localStorage.setItem("cloudshop-theme", theme);
}

function setupScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("revealed"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 },
  );

  revealElements.forEach((element) => observer.observe(element));
}

function updateBackToTopVisibility() {
  backToTop?.classList.toggle("show", window.scrollY > 420);
}

document.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-product]");

  if (!button) {
    return;
  }

  showToast(`已选择 ${button.dataset.product}，请联系客服完成购买。`);
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });

applyTheme(getPreferredTheme());
renderProducts();
setupScrollReveal();
updateBackToTopVisibility();
