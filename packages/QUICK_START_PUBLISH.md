# VISALL NPM包快速发布指南

## 快速发布流程

### 🚀 一键发布（推荐）

```bash
# 1. 进入packages目录
cd packages

# 2. 发布前检查
./pre-publish-check.sh

# 3. 如果检查通过，直接发布
./publish.sh
```

### 📝 版本管理发布

```bash
# 1. 更新版本
./version-update.sh patch   # 修复版本 1.0.0 -> 1.0.1
# 或
./version-update.sh minor   # 功能版本 1.0.0 -> 1.1.0
# 或
./version-update.sh major   # 主要版本 1.0.0 -> 2.0.0

# 2. 提交版本更改
git add .
git commit -m "chore: bump version to v1.0.1"

# 3. 发布
./publish.sh
```

## 发布前必读

### ✅ 发布条件检查清单

- [ ] 已登录NPM账号 (`npm whoami`)
- [ ] 确认NPM registry (`npm config get registry`)
- [ ] 代码已提交到Git
- [ ] 所有包构建成功
- [ ] 版本号正确设置
- [ ] 包配置完整

### 🔧 环境准备

#### 1. NPM账号和权限
```bash
# 检查登录状态
npm whoami

# 如果未登录
npm login
```

#### 2. Registry配置
```bash
# 查看当前配置
npm config get registry

# 私有仓库（公司内部）
npm config set registry https://miniapp.10jqka.com.cn/npmserver/

# 公共仓库
npm config set registry https://registry.npmjs.org/
```

#### 3. 构建环境
```bash
# 安装依赖
npm install

# 测试构建
npm run build:all
```

## 发布到不同仓库

### 🏢 发布到私有仓库（当前配置）

您的环境已配置为私有仓库：`https://miniapp.10jqka.com.cn/npmserver/`

```bash
# 确认配置
npm config get registry
# 输出: https://miniapp.10jqka.com.cn/npmserver/

# 直接发布
./publish.sh
```

### 🌍 发布到公共NPM仓库

如果要发布到公共仓库：

```bash
# 1. 切换到公共仓库
npm config set registry https://registry.npmjs.org/

# 2. 检查包名是否可用
npm view @visall/core
npm view @visall/table
npm view @visall/text
npm view @visall/chart

# 3. 如果包名被占用，修改包名
# 编辑各个package.json中的name字段
# 例如: "@your-company/visall-core"

# 4. 登录NPM
npm login

# 5. 发布（需要--access public参数）
./publish.sh
```

## 发布后操作

### 🏷️ 创建版本标签
```bash
# 获取当前版本
VERSION=$(cd core && npm pkg get version | tr -d '"')

# 创建标签
git tag "v$VERSION"

# 推送标签
git push origin "v$VERSION"
git push origin --tags
```

### 📦 验证发布结果
```bash
# 检查包是否发布成功
npm view @visall/core
npm view @visall/table
npm view @visall/text
npm view @visall/chart

# 在新目录测试安装
mkdir test-install && cd test-install
npm init -y
npm install @visall/core @visall/table @visall/text @visall/chart
```

### 📄 更新文档
- [ ] 更新项目主README
- [ ] 更新包的使用文档
- [ ] 通知团队成员
- [ ] 更新CHANGELOG

## 常见问题解决

### ❌ 权限错误
```bash
# 检查登录状态
npm whoami

# 检查包权限
npm access list packages

# 重新登录
npm logout
npm login
```

### ❌ 包名冲突
```bash
# 检查包名可用性
npm view @visall/core

# 如果冲突，修改包名
# 方案1: 使用组织名
# "@your-company/visall-core"

# 方案2: 使用不同前缀
# "@visall-ui/core"
```

### ❌ 构建失败
```bash
# 清理构建缓存
npm run clean
rm -rf node_modules package-lock.json
npm install

# 重新构建
npm run build:all
```

### ❌ 网络问题
```bash
# 设置代理（如果需要）
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080

# 或使用淘宝镜像
npm config set registry https://registry.npmmirror.com/
```

### ❌ 版本冲突
```bash
# 强制发布（谨慎使用）
npm publish --force

# 或者更新版本号
npm version patch
npm publish
```

## 脚本说明

### 🔍 pre-publish-check.sh
- 全面的发布前检查
- 验证包配置、依赖、构建等
- 确保发布成功率

### 📦 publish.sh
- 自动化发布流程
- 包含构建、测试、发布、验证
- 支持颜色输出和错误处理

### 🔢 version-update.sh
- 统一版本管理
- 自动更新包间依赖
- 支持语义化版本控制

## 高级用法

### 🔄 批量操作
```bash
# 批量清理
find . -name "node_modules" -type d -exec rm -rf {} +
find . -name "dist" -type d -exec rm -rf {} +

# 批量安装
npm run install:all

# 批量构建
npm run build:all
```

### 🎯 选择性发布
```bash
# 只发布特定包
cd core && npm publish
cd table && npm publish
```

### 🚨 紧急回滚
```bash
# 撤销发布（24小时内）
npm unpublish @visall/core@1.0.1

# 发布修复版本
npm version patch
npm publish
```

## 最佳实践

1. **渐进式发布**: 先发布到私有仓库测试
2. **版本锁定**: 依赖使用精确版本号
3. **持续集成**: 设置CI/CD自动发布
4. **监控反馈**: 建立使用监控机制
5. **文档维护**: 及时更新文档和示例

---

**📞 需要帮助？**
- 检查 [PUBLISH_GUIDE.md](./PUBLISH_GUIDE.md) 详细指南
- 运行 `./pre-publish-check.sh` 诊断问题
- 联系技术支持团队 