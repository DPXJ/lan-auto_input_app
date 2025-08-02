# 自动输入工具 - 在线部署说明

## 🚀 在线部署方案

### 方案一：GitHub Pages（免费）

1. **创建GitHub仓库**
   ```bash
   # 在GitHub上创建新仓库
   # 上传auto-input.html文件
   ```

2. **启用GitHub Pages**
   - 进入仓库设置
   - 找到Pages选项
   - 选择main分支
   - 保存设置

3. **访问地址**
   ```
   https://你的用户名.github.io/仓库名/auto-input.html
   ```

### 方案二：Netlify（免费）

1. **注册Netlify账号**
2. **拖拽部署**
   - 将auto-input.html文件拖拽到Netlify部署区域
   - 自动生成在线地址

3. **访问地址**
   ```
   https://你的项目名.netlify.app
   ```

### 方案三：Vercel（免费）

1. **注册Vercel账号**
2. **导入项目**
   - 上传auto-input.html文件
   - 自动部署

3. **访问地址**
   ```
   https://你的项目名.vercel.app
   ```

## 📱 手机使用方式

### 方式一：直接打开文件
1. 将auto-input.html传输到手机
2. 用手机浏览器直接打开
3. **优点**：无需网络，完全离线
4. **缺点**：剪贴板功能可能受限

### 方式二：在线访问
1. 部署到在线服务
2. 在手机浏览器中访问网址
3. **优点**：功能完整，无需传输文件
4. **缺点**：需要网络连接

## 🔧 本地服务器替代方案

### 方案一：手机端服务器
```bash
# 在手机上安装Termux（Android）
# 安装Python
pkg install python

# 启动服务器
python -m http.server 8000

# 访问 http://localhost:8000/auto-input.html
```

### 方案二：使用其他工具
- **HFS (HTTP File Server)**：轻量级文件服务器
- **XAMPP**：本地Web服务器套件
- **Live Server**：VS Code扩展

## 📋 推荐方案

### 最佳方案：GitHub Pages
1. **免费**：无需任何费用
2. **稳定**：GitHub提供稳定服务
3. **简单**：上传文件即可使用
4. **HTTPS**：支持安全连接

### 快速方案：直接传输
1. **微信传输**：最快速的方式
2. **离线使用**：无需网络
3. **即时可用**：传输后立即使用

## 🌐 在线部署步骤（GitHub Pages）

### 1. 创建仓库
```bash
# 在GitHub上创建新仓库
# 仓库名：auto-input-tool
```

### 2. 上传文件
```bash
# 将auto-input.html重命名为index.html
# 上传到仓库根目录
```

### 3. 启用Pages
- Settings → Pages
- Source: Deploy from a branch
- Branch: main
- Folder: / (root)

### 4. 访问地址
```
https://你的用户名.github.io/auto-input-tool/
```

## 📱 手机浏览器推荐

- **iOS**: Safari（最佳兼容性）
- **Android**: Chrome、Edge、Firefox
- **通用**: 任何现代浏览器

## ⚠️ 注意事项

1. **剪贴板权限**：首次使用可能需要授权
2. **HTTPS要求**：现代浏览器需要HTTPS才能使用剪贴板API
3. **浏览器兼容性**：建议使用最新版本浏览器
4. **网络连接**：在线版本需要网络，本地版本无需网络

## 🎯 最终推荐

**对于日常使用**：推荐GitHub Pages部署
**对于快速测试**：推荐微信传输文件
**对于离线使用**：推荐直接传输到手机 