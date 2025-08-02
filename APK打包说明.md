# Android APK打包说明

## 🚀 PWA应用安装（推荐）

### 方法一：Chrome浏览器安装
1. 在Android手机上打开Chrome浏览器
2. 访问：https://dpxj.github.io/lan-auto_input_app/
3. 点击Chrome菜单（三个点）
4. 选择"添加到主屏幕"或"安装应用"
5. 确认安装，应用会出现在主屏幕上

### 方法二：其他浏览器安装
- **Edge浏览器**：菜单 → 添加到主屏幕
- **Firefox**：菜单 → 添加到主屏幕
- **Samsung Internet**：菜单 → 添加到主屏幕

## 📱 APK打包方案

### 方案一：使用Bubblewrap（推荐）

#### 1. 安装Node.js和Java
```bash
# 确保已安装Node.js 14+
# 确保已安装Java 11+
```

#### 2. 安装Bubblewrap
```bash
npm install -g @bubblewrap/cli
```

#### 3. 初始化项目
```bash
bubblewrap init --manifest https://dpxj.github.io/lan-auto_input_app/manifest.json
```

#### 4. 构建APK
```bash
bubblewrap build
```

### 方案二：使用PWA Builder

#### 1. 访问PWA Builder
- 打开：https://www.pwabuilder.com/
- 输入网址：https://dpxj.github.io/lan-auto_input_app/

#### 2. 生成APK
- 点击"Build My PWA"
- 选择"Android"
- 下载生成的APK文件

### 方案三：使用TWA（Trusted Web Activity）

#### 1. 创建Android Studio项目
```bash
# 使用Android Studio创建新项目
# 选择"Trusted Web Activity"模板
```

#### 2. 配置TWA
```xml
<!-- 在AndroidManifest.xml中配置 -->
<activity android:name="com.google.androidbrowserhelper.trusted.LauncherActivity">
    <intent-filter>
        <action android:name="android.intent.action.MAIN" />
        <category android:name="android.intent.category.LAUNCHER" />
    </intent-filter>
    <meta-data android:name="android.webkit.WebManifest"
        android:resource="@xml/web_manifest" />
</activity>
```

#### 3. 构建APK
- 在Android Studio中点击"Build"
- 选择"Build Bundle(s) / APK(s)"
- 选择"Build APK(s)"

## 🔧 手动打包步骤

### 1. 准备环境
```bash
# 安装Android SDK
# 安装Gradle
# 配置环境变量
```

### 2. 创建项目结构
```
android-app/
├── app/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   ├── res/
│   │   │   └── AndroidManifest.xml
│   │   └── web/
│   │       ├── index.html
│   │       ├── style.css
│   │       ├── script.js
│   │       ├── manifest.json
│   │       └── sw.js
│   └── build.gradle
└── build.gradle
```

### 3. 配置WebView
```java
// MainActivity.java
public class MainActivity extends AppCompatActivity {
    private WebView webView;
    
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        webView = findViewById(R.id.webview);
        webView.getSettings().setJavaScriptEnabled(true);
        webView.getSettings().setDomStorageEnabled(true);
        webView.loadUrl("file:///android_asset/index.html");
    }
}
```

### 4. 构建APK
```bash
./gradlew assembleRelease
```

## 📋 推荐方案对比

| 方案 | 难度 | 功能完整性 | 推荐度 |
|------|------|------------|--------|
| PWA安装 | ⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ |
| Bubblewrap | ⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| PWA Builder | ⭐ | ⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| TWA | ⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ |
| 手动打包 | ⭐⭐⭐⭐ | ⭐⭐⭐⭐⭐ | ⭐⭐ |

## 🎯 最终推荐

### 最佳方案：PWA安装
- **优点**：最简单，功能完整，无需额外工具
- **缺点**：需要网络首次访问
- **适用**：大多数用户

### 备选方案：Bubblewrap
- **优点**：生成原生APK，功能完整
- **缺点**：需要开发环境
- **适用**：需要分发APK的场景

## 📱 安装后的体验

### PWA应用特性：
- ✅ 像原生应用一样运行
- ✅ 支持离线使用
- ✅ 自动更新
- ✅ 推送通知（可选）
- ✅ 全屏体验
- ✅ 主屏幕图标

### 功能完整性：
- ✅ 自动聚焦输入框
- ✅ 键盘自动弹出
- ✅ 一键复制到剪贴板
- ✅ 历史记录管理
- ✅ 响应式设计

## 🚀 快速开始

**推荐使用PWA安装方式：**

1. 在Android手机上打开Chrome
2. 访问：https://dpxj.github.io/lan-auto_input_app/
3. 点击菜单 → 添加到主屏幕
4. 完成！现在可以像原生应用一样使用

这样你就可以在Android手机上像使用原生应用一样使用自动输入工具了！🎉 