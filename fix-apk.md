# APK安装问题修复指南

## 🚨 "packageInfo is null" 错误解决方案

### 问题原因分析：
1. **PWA Builder生成的APK签名问题**
2. **包名冲突或无效**
3. **缺少必要的权限配置**
4. **APK文件损坏**

### 解决方案：

#### 方案一：重新签名APK（推荐）

1. **下载APK签名工具**
   ```bash
   # 使用Android SDK的apksigner
   # 或者下载APK Signer应用
   ```

2. **重新签名APK**
   ```bash
   # 使用apksigner重新签名
   apksigner sign --ks keystore.jks --out signed-app.apk original-app.apk
   ```

#### 方案二：使用Bubblewrap重新生成

1. **安装Bubblewrap**
   ```bash
   npm install -g @bubblewrap/cli
   ```

2. **生成新的APK**
   ```bash
   bubblewrap init --manifest https://dpxj.github.io/lan-auto_input_app/manifest.json
   bubblewrap build
   ```

#### 方案三：手动修复

1. **解压APK文件**
   ```bash
   # 将APK重命名为.zip
   mv app.apk app.zip
   
   # 解压文件
   unzip app.zip
   ```

2. **检查AndroidManifest.xml**
   - 确保包名正确
   - 检查权限配置
   - 验证应用名称

3. **重新打包**
   ```bash
   # 重新压缩为APK
   zip -r new-app.apk *
   ```

### 📱 安装步骤

#### 1. 允许未知来源应用
- 设置 → 安全 → 未知来源
- 或者设置 → 应用 → 特殊应用访问 → 安装未知应用

#### 2. 卸载旧版本
- 如果之前安装过，先卸载
- 清理应用数据

#### 3. 安装新APK
- 点击APK文件
- 确认安装
- 等待安装完成

### 🔧 故障排除

#### 如果仍然无法安装：

1. **检查APK完整性**
   ```bash
   # 验证APK文件
   aapt dump badging app.apk
   ```

2. **检查设备兼容性**
   - 确保Android版本支持
   - 检查CPU架构匹配

3. **使用ADB安装**
   ```bash
   adb install -r app.apk
   ```

4. **查看详细错误**
   ```bash
   adb logcat | grep "package"
   ```

### 🎯 推荐方案

**最佳解决方案：使用Bubblewrap**
- 更稳定的APK生成
- 正确的签名配置
- 自动处理权限
- Google官方支持

### 📋 检查清单

- [ ] 允许安装未知来源应用
- [ ] 卸载旧版本应用
- [ ] 使用Bubblewrap生成APK
- [ ] 验证APK文件完整性
- [ ] 检查设备兼容性

### 🆘 如果问题持续

1. **使用PWA安装**（最简单）
   - 在Chrome中访问：https://dpxj.github.io/lan-auto_input_app/
   - 点击"添加到主屏幕"
   - 像原生应用一样使用

2. **联系支持**
   - 提供详细的错误信息
   - 包含设备型号和Android版本 