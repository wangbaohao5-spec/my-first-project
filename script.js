const products = [
  {
    name: "GPT账号",
    icon: "🤖",
    description: "适合学习、办公与内容创作的智能 AI 账号服务。",
    price: "¥39",
    priceValue: 39,
    period: "月付",
    detailUrl: "./gpt-account.html",
  },
  {
    name: "Spotify会员",
    icon: "🎧",
    description: "畅听高品质音乐与播客，享受更纯净的收听体验。",
    price: "¥25",
    priceValue: 25,
    period: "月付",
    detailUrl: "./spotify.html",
  },
  {
    name: "Netflix会员",
    icon: "🎬",
    description: "精选影视剧集会员权益，适合追剧与家庭娱乐。",
    price: "¥45",
    priceValue: 45,
    period: "月付",
    detailUrl: "./netflix.html",
  },
  {
    name: "VPN服务",
    icon: "🔐",
    description: "稳定加密连接服务，满足多场景网络访问需求。",
    price: "¥29",
    priceValue: 29,
    period: "月付",
    detailUrl: "./vpn.html",
  },
];

const cartStorageKey = "cloudshop-cart";
const productGrid = document.querySelector("#productGrid");
const toast = document.querySelector("#toast");
const themeToggle = document.querySelector("#themeToggle");
const themeIcon = themeToggle?.querySelector(".theme-icon");
const themeText = themeToggle?.querySelector(".theme-text");
const backToTop = document.querySelector("#backToTop");
const cartCount = document.querySelector("#cartCount");
const cartItems = document.querySelector("#cartItems");
const cartTotal = document.querySelector("#cartTotal");
const cartSummaryText = document.querySelector("#cartSummaryText");
const clearCartButton = document.querySelector("#clearCartButton");
const checkoutButton = document.querySelector("#checkoutButton");
let toastTimer;

function formatPrice(value) {
  return `¥${value}`;
}

function getCart() {
  try {
    const savedCart = JSON.parse(localStorage.getItem(cartStorageKey)) || [];
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem(cartStorageKey, JSON.stringify(cart));
  updateCartCount();
  renderCartPage();
}

function getCartTotal(cart = getCart()) {
  return cart.reduce((total, item) => total + item.priceValue * item.quantity, 0);
}

function updateCartCount() {
  if (!cartCount) {
    return;
  }

  const count = getCart().reduce((total, item) => total + item.quantity, 0);
  cartCount.textContent = count;
  cartCount.setAttribute("aria-label", `购物车中有 ${count} 件商品`);
}

function addToCart(productName) {
  const product = products.find((item) => item.name === productName);

  if (!product) {
    return;
  }

  const cart = getCart();
  const existingItem = cart.find((item) => item.name === product.name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({
      name: product.name,
      icon: product.icon,
      price: product.price,
      priceValue: product.priceValue,
      period: product.period,
      detailUrl: product.detailUrl,
      quantity: 1,
    });
  }

  saveCart(cart);
  showToast(`已将 ${product.name} 加入购物车。`);
}

function removeFromCart(productName) {
  const cart = getCart().filter((item) => item.name !== productName);
  saveCart(cart);
  showToast(`已从购物车删除 ${productName}。`);
}

function clearCart() {
  saveCart([]);
  showToast("购物车已清空。");
}

function renderProducts() {
  if (!productGrid) {
    return;
  }

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
          <div class="product-actions">
            <a class="btn btn-ghost" href="${product.detailUrl}">查看详情</a>
            <button class="btn btn-primary" type="button" data-product="${product.name}">立即购买</button>
          </div>
        </article>
      `,
    )
    .join("");
}

function renderCartPage() {
  if (!cartItems) {
    return;
  }

  const cart = getCart();
  const total = getCartTotal(cart);

  if (cartTotal) {
    cartTotal.textContent = formatPrice(total);
  }

  if (cartSummaryText) {
    const count = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartSummaryText.textContent = count > 0 ? `共 ${count} 件商品，合计 ${formatPrice(total)} / 月。` : "当前购物车为空。";
  }

  if (checkoutButton) {
    checkoutButton.disabled = cart.length === 0;
  }

  if (clearCartButton) {
    clearCartButton.disabled = cart.length === 0;
  }

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="detail-icon" aria-hidden="true">🛒</div>
        <h3>购物车还是空的</h3>
        <p>返回首页选择 GPT账号、Spotify会员、Netflix会员或 VPN服务。</p>
        <a class="btn btn-primary" href="./index.html#products">去选购商品</a>
      </div>
    `;
    return;
  }

  cartItems.innerHTML = cart
    .map(
      (item) => `
        <article class="cart-item">
          <div class="cart-item-icon" aria-hidden="true">${item.icon}</div>
          <div>
            <h3>${item.name}</h3>
            <p>${item.price} / ${item.period} × ${item.quantity}</p>
            <a href="${item.detailUrl}">查看商品详情</a>
          </div>
          <strong>${formatPrice(item.priceValue * item.quantity)}</strong>
          <button class="btn btn-ghost" type="button" data-remove-product="${item.name}">删除</button>
        </article>
      `,
    )
    .join("");
}

function showToast(message) {
  if (!toast) {
    return;
  }

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
  const addButton = event.target.closest("button[data-product]");
  const removeButton = event.target.closest("button[data-remove-product]");

  if (addButton) {
    addToCart(addButton.dataset.product);
    return;
  }

  if (removeButton) {
    removeFromCart(removeButton.dataset.removeProduct);
  }
});

themeToggle?.addEventListener("click", () => {
  const nextTheme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  applyTheme(nextTheme);
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

clearCartButton?.addEventListener("click", clearCart);

checkoutButton?.addEventListener("click", () => {
  const total = getCartTotal();
  showToast(total > 0 ? `购物车合计 ${formatPrice(total)} / 月，请联系客服完成购买。` : "请先添加商品到购物车。");
});

window.addEventListener("scroll", updateBackToTopVisibility, { passive: true });

applyTheme(getPreferredTheme());
renderProducts();
renderCartPage();
updateCartCount();
setupScrollReveal();
updateBackToTopVisibility();
