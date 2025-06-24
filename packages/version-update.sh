#!/bin/bash

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

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

# 检查参数
if [ $# -eq 0 ]; then
    echo "用法: $0 <patch|minor|major>"
    echo "  patch - 修复版本 (1.0.0 -> 1.0.1)"
    echo "  minor - 功能版本 (1.0.0 -> 1.1.0)"
    echo "  major - 主要版本 (1.0.0 -> 2.0.0)"
    exit 1
fi

VERSION_TYPE=$1

# 验证版本类型
if [[ ! "$VERSION_TYPE" =~ ^(patch|minor|major)$ ]]; then
    error "无效的版本类型: $VERSION_TYPE"
    echo "请使用: patch, minor, 或 major"
    exit 1
fi

# 检查是否在packages目录
if [ ! -f "package.json" ] || [ ! -d "core" ]; then
    error "请在packages目录下运行此脚本"
    exit 1
fi

info "开始更新版本 ($VERSION_TYPE)..."

# 显示当前版本
info "当前版本:"
echo "Core: $(cd core && npm pkg get version | tr -d '\"')"
echo "Table: $(cd table && npm pkg get version | tr -d '\"')"
echo "Text: $(cd text && npm pkg get version | tr -d '\"')"
echo "Chart: $(cd chart && npm pkg get version | tr -d '\"')"

# 确认更新
echo
read -p "确认更新所有包的 $VERSION_TYPE 版本? (y/N): " -n 1 -r
echo

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    info "版本更新已取消"
    exit 0
fi

# 更新各包版本
packages=("core" "table" "text" "chart")

for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        info "更新 $package 版本..."
        cd "$package"
        npm version "$VERSION_TYPE" --no-git-tag-version
        new_version=$(npm pkg get version | tr -d '"')
        success "$package 更新到版本 $new_version"
        cd ..
    fi
done

# 更新根目录package.json的版本
info "更新根目录版本..."
npm version "$VERSION_TYPE" --no-git-tag-version
root_version=$(npm pkg get version | tr -d '"')
success "根目录更新到版本 $root_version"

# 显示新版本
echo
success "版本更新完成！新版本:"
echo "Core: $(cd core && npm pkg get version | tr -d '\"')"
echo "Table: $(cd table && npm pkg get version | tr -d '\"')"
echo "Text: $(cd text && npm pkg get version | tr -d '\"')"
echo "Chart: $(cd chart && npm pkg get version | tr -d '\"')"

# 更新依赖关系
info "更新包间依赖关系..."

# 更新table包中的@visall/core依赖
cd table
if grep -q "@visall/core" package.json; then
    core_version=$(cd ../core && npm pkg get version | tr -d '"')
    npm pkg set dependencies.@visall/core="^$core_version"
    success "Table包中的@visall/core依赖已更新到 ^$core_version"
fi
cd ..

# 更新text包中的@visall/core依赖
cd text
if grep -q "@visall/core" package.json; then
    core_version=$(cd ../core && npm pkg get version | tr -d '"')
    npm pkg set dependencies.@visall/core="^$core_version"
    success "Text包中的@visall/core依赖已更新到 ^$core_version"
fi
cd ..

# 更新integration-example中的依赖
if [ -d "integration-example" ]; then
    info "更新integration-example依赖..."
    cd integration-example
    
    core_version=$(cd ../core && npm pkg get version | tr -d '"')
    table_version=$(cd ../table && npm pkg get version | tr -d '"')
    text_version=$(cd ../text && npm pkg get version | tr -d '"')
    chart_version=$(cd ../chart && npm pkg get version | tr -d '"')
    
    npm pkg set dependencies.@visall/core="^$core_version"
    npm pkg set dependencies.@visall/table="^$table_version"
    npm pkg set dependencies.@visall/text="^$text_version"
    npm pkg set dependencies.@visall/chart="^$chart_version"
    
    success "Integration-example依赖已更新"
    cd ..
fi

echo
info "建议下一步操作:"
echo "  1. 检查更改: git diff"
echo "  2. 提交更改: git add . && git commit -m \"chore: bump version to $root_version\""
echo "  3. 构建测试: npm run build:all"
echo "  4. 发布包: ./publish.sh"

success "版本更新完成！" 