# Bubblewrap APK生成指南

## 🚀 使用Bubblewrap生成APK

### 1. 安装Node.js和Java
```bash
# 确保已安装Node.js 14+
node --version

# 确保已安装Java 11+
java --version
```

### 2. 安装Bubblewrap
```bash
npm install -g @bubblewrap/cli
```

### 3. 初始化项目
```bash
# 创建新目录
mkdir auto-input-app
cd auto-input-app

# 初始化Bubblewrap项目
bubblewrap init --manifest https://dpxj.github.io/lan-auto_input_app/manifest.json
```

### 4. 配置项目
```bash
# 编辑项目配置
bubblewrap update

# 或者手动编辑 app/build.gradle
```

### 5. 构建APK
```bash
# 构建调试版本
bubblewrap build

# 构建发布版本
bubblewrap build --release
```

### 6. 找到APK文件
生成的APK文件位于：
```
app/build/outputs/apk/debug/app-debug.apk
```

## 📱 安装说明

### 方法一：ADB安装
```bash
# 连接手机并启用USB调试
adb install app/build/outputs/apk/debug/app-debug.apk
```

### 方法二：直接安装
1. 将APK文件传输到手机
2. 在手机上点击APK文件
3. 允许安装未知来源应用
4. 完成安装

## ⚠️ 注意事项

1. **首次安装**：需要允许安装未知来源应用
2. **包名**：Bubblewrap会自动生成唯一的包名
3. **签名**：使用调试签名，适合个人使用
4. **权限**：自动处理必要的权限

## 🔧 故障排除

### 如果遇到问题：
1. 确保Android SDK已正确安装
2. 检查Java版本是否为11+
3. 确保网络连接正常
4. 尝试清理并重新构建

### 常见错误：
- **SDK路径错误**：检查ANDROID_SDK_ROOT环境变量
- **Java版本错误**：确保使用Java 11
- **网络问题**：检查manifest.json是否可访问 