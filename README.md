# CloudShop

CloudShop 是一个使用纯 HTML、CSS、JavaScript 实现的虚拟商品销售网站首页，用于展示：

- GPT账号
- Spotify会员
- Netflix会员
- VPN服务

项目已按 GitHub Pages 静态站点部署方式配置，根目录中的 `index.html` 会作为网站首页加载，`styles.css` 与 `script.js` 使用相对路径引用，适合部署在 `https://<用户名>.github.io/<仓库名>/` 这类项目站点路径下。当前首页支持固定顶部导航、Logo 图标、深色模式、返回顶部按钮、滚动动画和移动端响应式布局。

## 项目结构

```text
.
├── .github/workflows/pages.yml  # GitHub Pages Actions 部署工作流
├── .nojekyll                    # 禁用 Jekyll 处理，直接发布静态文件
├── index.html                   # 网站首页
├── styles.css                   # 页面样式
├── script.js                    # 商品渲染与购买按钮交互
└── README.md                    # 项目说明与部署方法
```

## 本地预览

在项目根目录执行：

```bash
python3 -m http.server 4173
```

然后访问：

```text
http://127.0.0.1:4173/index.html
```

也可以直接用浏览器打开 `index.html` 进行静态预览。

## GitHub Pages 部署方法

本项目提供了 `.github/workflows/pages.yml`，推荐使用 GitHub Actions 发布到 GitHub Pages。

### 1. 推送代码到 GitHub main 分支

```bash
git add .
git commit -m "Configure GitHub Pages for CloudShop"
git push origin main
```

### 2. 在 GitHub 中开启 Pages

1. 打开 GitHub 仓库页面。
2. 点击仓库顶部的 **Settings**。
3. 在左侧 **Code and automation** 区域点击 **Pages**。
4. 在 **Build and deployment** 的 **Source** 中选择 **GitHub Actions**。
5. 回到 **Actions** 标签页，等待 `Deploy CloudShop to GitHub Pages` 工作流运行完成。
6. 部署成功后，在 **Settings → Pages** 页面点击 **Visit site** 查看网站。

> 说明：GitHub Pages 发布可能需要几分钟生效。如果首次访问出现 404，请等待工作流完成并稍后刷新。

## 网站访问地址格式

项目站点的默认访问地址格式为：

```text
https://<你的GitHub用户名>.github.io/<你的仓库名>/
```

如果仓库名是 `my-first-project`，用户名是 `your-name`，则访问地址为：

```text
https://your-name.github.io/my-first-project/
```

如果你把仓库命名为 `<你的GitHub用户名>.github.io`，则它会作为用户站点发布，访问地址格式为：

```text
https://<你的GitHub用户名>.github.io/
```
