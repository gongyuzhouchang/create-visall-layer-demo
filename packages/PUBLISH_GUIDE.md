# VISALL NPM包发布指南

## 概述
本指南详细说明了如何发布VISALL项目的NPM包，包括私有仓库和公共仓库两种情况。

## 发布前准备

### 1. 检查包配置
确保每个包的`package.json`配置正确：

```json
{
  "name": "@visall/core",
  "version": "1.0.0",
  "description": "VISALL数据可视化核心包",
  "main": "dist/index.js",
  "module": "dist/index.esm.js",
  "types": "dist/index.d.ts",
  "files": [
    "dist",
    "README.md",
    "LICENSE"
  ],
  "keywords": [
    "visall",
    "visualization",
    "chart",
    "data"
  ],
  "author": "VISALL Team",
  "license": "MIT",
  "homepage": "https://github.com/your-org/visall",
  "repository": {
    "type": "git",
    "url": "https://github.com/your-org/visall.git"
  },
  "bugs": {
    "url": "https://github.com/your-org/visall/issues"
  }
}
```

### 2. 检查构建产物
确保所有包都能正确构建：

```bash
# 在packages目录下执行
npm run build:all
```

### 3. 运行测试
```bash
# 运行所有测试
npm test

# 运行特定包的测试
cd core && npm test
cd table && npm test
cd text && npm test
```

### 4. 检查依赖版本
确保所有依赖版本正确且一致：

```bash
# 检查依赖
npm ls
```

## 发布流程

### 方案一：发布到私有仓库（推荐）

#### 1. 确认私有仓库配置
```bash
# 检查当前registry
npm config get registry
# 应该显示：https://miniapp.10jqka.com.cn/npmserver/

# 如果不是私有仓库，设置私有仓库
npm config set registry https://miniapp.10jqka.com.cn/npmserver/
```

#### 2. 登录私有仓库
```bash
npm login
# 输入您的私有仓库账号密码
```

#### 3. 发布包
```bash
# 发布core包
cd core
npm publish

# 发布table包
cd ../table
npm publish

# 发布text包
cd ../text
npm publish

# 发布chart包（如果需要）
cd ../chart
npm publish
```

### 方案二：发布到公共NPM仓库

#### 1. 切换到公共仓库
```bash
npm config set registry https://registry.npmjs.org/
```

#### 2. 检查包名可用性
```bash
npm view @visall/core
npm view @visall/table
npm view @visall/text
```

#### 3. 登录NPM
```bash
npm login
# 输入您的npmjs.org账号密码
```

#### 4. 发布包
```bash
# 发布core包
cd core
npm publish --access public

# 发布table包
cd ../table
npm publish --access public

# 发布text包
cd ../text
npm publish --access public
```

## 版本管理策略

### 语义化版本控制
遵循[Semantic Versioning](https://semver.org/)规范：
- **主版本号（Major）**: 不兼容的API更改
- **次版本号（Minor）**: 向后兼容的功能性新增
- **修订号（Patch）**: 向后兼容的Bug修复

### 版本更新命令
```bash
# 更新patch版本 (1.0.0 -> 1.0.1)
npm version patch

# 更新minor版本 (1.0.0 -> 1.1.0)
npm version minor

# 更新major版本 (1.0.0 -> 2.0.0)
npm version major
```

### 统一版本管理
```bash
# 批量更新所有包版本
npm run version:patch
npm run version:minor
npm run version:major
```

## 发布注意事项

### 1. 包名冲突
- 如果包名已被占用，考虑使用不同的组织名或包名
- 例如：`@your-company/visall-core`

### 2. 文件包含
确保`package.json`中的`files`字段包含所有必要文件：
```json
{
  "files": [
    "dist/",
    "README.md",
    "LICENSE",
    "*.d.ts"
  ]
}
```

### 3. 依赖关系
- 确保`peerDependencies`正确配置
- 避免将开发依赖包含在`dependencies`中
- 检查版本范围是否合理

### 4. 构建产物
- 确保生成ES模块和CommonJS两种格式
- 包含TypeScript类型定义文件
- 检查文件大小和压缩效果

### 5. 文档和示例
- 每个包都应有完整的README
- 提供使用示例和API文档
- 包含变更日志（CHANGELOG.md）

## 发布脚本

### 自动化发布脚本
```bash
#!/bin/bash
# publish.sh

set -e

echo "开始发布VISALL包..."

# 1. 清理和构建
npm run clean
npm run build:all

# 2. 运行测试
npm test

# 3. 检查版本
echo "当前版本："
npm run version:check

# 4. 确认发布
read -p "确认发布这些版本? (y/N): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    # 5. 发布各个包
    cd core && npm publish
    cd ../table && npm publish
    cd ../text && npm publish
    cd ../chart && npm publish
    
    echo "✅ 所有包发布成功！"
else
    echo "❌ 发布已取消"
fi
```

## 发布后验证

### 1. 检查包是否发布成功
```bash
npm view @visall/core
npm view @visall/table
npm view @visall/text
```

### 2. 测试安装
```bash
# 在新目录中测试安装
mkdir test-install
cd test-install
npm init -y
npm install @visall/core @visall/table @visall/text
```

### 3. 更新文档
- 更新项目README
- 更新使用文档
- 通知团队成员

## 常见问题

### 1. 权限问题
```bash
# 如果遇到权限错误
npm whoami
npm access list packages
```

### 2. 网络问题
```bash
# 设置代理（如果需要）
npm config set proxy http://proxy.company.com:8080
npm config set https-proxy http://proxy.company.com:8080
```

### 3. 包大小问题
```bash
# 检查包大小
npm pack --dry-run
```

### 4. 版本冲突
```bash
# 强制发布（谨慎使用）
npm publish --force
```

## 最佳实践

1. **渐进式发布**: 先发布到私有仓库测试，再发布到公共仓库
2. **版本锁定**: 使用exact版本号避免意外更新
3. **持续集成**: 设置CI/CD自动化发布流程
4. **监控反馈**: 建立包使用情况监控和反馈机制
5. **文档维护**: 保持文档和示例的及时更新

## 回滚策略

如果发布出现问题：
```bash
# 撤销发布（仅限24小时内）
npm unpublish @visall/core@1.0.0

# 发布修复版本
npm version patch
npm publish
```

---

**注意**: 请根据您的具体环境和需求调整上述配置和流程。 