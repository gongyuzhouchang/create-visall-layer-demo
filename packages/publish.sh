#!/bin/bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 显示彩色消息
info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

success() {
    echo -e "${GREEN}✅ $1${NC}"
}

warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

error() {
    echo -e "${RED}❌ $1${NC}"
}

# 检查是否在packages目录
if [ ! -f "package.json" ] || [ ! -d "core" ] || [ ! -d "table" ] || [ ! -d "text" ]; then
    error "请在packages目录下运行此脚本"
    exit 1
fi

info "开始VISALL包发布流程..."

# 1. 检查Git状态
info "检查Git状态..."
if [ -n "$(git status --porcelain)" ]; then
    warning "工作目录有未提交的更改，请先提交或储藏更改"
    git status --short
    echo
    read -p "是否继续发布? (y/N): " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        info "发布已取消"
        exit 0
    fi
fi

# 2. 检查当前分支
current_branch=$(git branch --show-current)
info "当前分支: $current_branch"

# 3. 清理构建目录
info "清理构建目录..."
rm -rf */dist
rm -rf */build

# 4. 安装依赖
info "安装依赖..."
npm install

# 5. 构建所有包
info "构建所有包..."

# 构建各个包
packages=("core" "table" "text" "chart")
for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        info "构建 $package 包..."
        cd "$package"
        npm run build
        if [ $? -ne 0 ]; then
            error "$package 包构建失败"
            exit 1
        fi
        cd ..
    fi
done

success "所有包构建成功"

# 6. 运行测试（如果存在）
if [ -f "package.json" ] && grep -q '"test"' package.json; then
    info "运行测试..."
    npm test
    if [ $? -ne 0 ]; then
        error "测试失败"
        exit 1
    fi
    success "测试通过"
fi

# 7. 检查包大小
info "检查包大小..."
echo "Core包大小:"
cd core && npm pack --dry-run | grep "npm notice"
cd ..

echo "Table包大小:"
cd table && npm pack --dry-run | grep "npm notice"
cd ..

echo "Text包大小:"
cd text && npm pack --dry-run | grep "npm notice"
cd ..

# 8. 显示当前版本
info "当前版本信息:"
echo "Core: $(cd core && npm pkg get version | tr -d '\"')"
echo "Table: $(cd table && npm pkg get version | tr -d '\"')"
echo "Text: $(cd text && npm pkg get version | tr -d '\"')"
echo "Chart: $(cd chart && npm pkg get version | tr -d '\"')"

# 9. 检查NPM registry
current_registry=$(npm config get registry)
info "当前NPM Registry: $current_registry"

# 10. 检查登录状态
info "检查NPM登录状态..."
if ! npm whoami >/dev/null 2>&1; then
    warning "未登录到NPM，请先登录"
    npm login
fi

logged_user=$(npm whoami)
success "已登录用户: $logged_user"

# 11. 确认发布
echo
warning "即将发布以下包到 $current_registry :"
echo "  - @visall/core"
echo "  - @visall/table"
echo "  - @visall/text"
echo "  - @visall/chart"
echo

read -p "确认发布这些包? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    info "发布已取消"
    exit 0
fi

# 12. 发布包
info "开始发布包..."

# 发布core包
info "发布 @visall/core..."
cd core
if npm publish; then
    success "@visall/core 发布成功"
else
    error "@visall/core 发布失败"
    exit 1
fi
cd ..

# 发布table包
info "发布 @visall/table..."
cd table
if npm publish; then
    success "@visall/table 发布成功"
else
    error "@visall/table 发布失败"
    exit 1
fi
cd ..

# 发布text包
info "发布 @visall/text..."
cd text
if npm publish; then
    success "@visall/text 发布成功"
else
    error "@visall/text 发布失败"
    exit 1
fi
cd ..

# 发布chart包
info "发布 @visall/chart..."
cd chart
if npm publish; then
    success "@visall/chart 发布成功"
else
    error "@visall/chart 发布失败"
    exit 1
fi
cd ..

# 13. 验证发布
info "验证发布结果..."
sleep 2

echo "验证 @visall/core:"
npm view @visall/core version 2>/dev/null || echo "  未找到或暂未同步"

echo "验证 @visall/table:"
npm view @visall/table version 2>/dev/null || echo "  未找到或暂未同步"

echo "验证 @visall/text:"
npm view @visall/text version 2>/dev/null || echo "  未找到或暂未同步"

echo "验证 @visall/chart:"
npm view @visall/chart version 2>/dev/null || echo "  未找到或暂未同步"

# 14. 完成
success "🎉 所有包发布完成！"

echo
info "下一步建议:"
echo "  1. 更新项目README.md"
echo "  2. 创建Git标签: git tag v$(cd core && npm pkg get version | tr -d '\"')"
echo "  3. 推送标签: git push origin --tags"
echo "  4. 通知团队成员"
echo "  5. 更新integration-example的依赖版本"

echo
info "发布完成！" 