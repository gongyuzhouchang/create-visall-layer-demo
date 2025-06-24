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

# 检查是否在packages目录
if [ ! -f "package.json" ] || [ ! -d "core" ]; then
    error "请在packages目录下运行此脚本"
    exit 1
fi

info "开始发布前检查..."

# 检查项目计数器
check_count=0
pass_count=0

# 检查函数
check_item() {
    local description=$1
    local command=$2
    
    check_count=$((check_count + 1))
    
    info "检查: $description"
    
    if eval "$command"; then
        success "✓ $description"
        pass_count=$((pass_count + 1))
        return 0
    else
        error "✗ $description"
        return 1
    fi
}

# 1. 检查包配置文件
info "== 包配置检查 =="

packages=("core" "table" "text" "chart")
for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        check_item "检查 $package/package.json 存在" "[ -f $package/package.json ]"
        
        # 检查必要字段
        check_item "检查 $package 包名" "cd $package && npm pkg get name | grep -q '@visall/$package'"
        check_item "检查 $package 版本" "cd $package && npm pkg get version | grep -q '[0-9]'"
        check_item "检查 $package 描述" "cd $package && npm pkg get description | grep -q '\"'"
        check_item "检查 $package 主入口" "cd $package && npm pkg get main | grep -q 'dist/index.js'"
        check_item "检查 $package 类型定义" "cd $package && npm pkg get types | grep -q 'dist/index.d.ts'"
        check_item "检查 $package files字段" "cd $package && npm pkg get files | grep -q 'dist'"
    fi
done

# 2. 检查源代码
echo
info "== 源代码检查 =="

for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        check_item "检查 $package 源代码目录" "[ -d $package/src ]"
        check_item "检查 $package 入口文件" "[ -f $package/src/index.ts ]"
        check_item "检查 $package TypeScript配置" "[ -f $package/tsconfig.json ]"
        check_item "检查 $package Rollup配置" "[ -f $package/rollup.config.js ]"
    fi
done

# 3. 检查依赖关系
echo
info "== 依赖关系检查 =="

check_item "检查根目录依赖" "npm ls --depth=0 > /dev/null 2>&1"

for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        check_item "检查 $package 依赖" "cd $package && npm ls --depth=0 > /dev/null 2>&1"
    fi
done

# 4. 检查构建配置
echo
info "== 构建配置检查 =="

check_item "检查根目录构建脚本" "npm pkg get scripts.build:all | grep -q '\"'"

for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        check_item "检查 $package 构建脚本" "cd $package && npm pkg get scripts.build | grep -q 'rollup'"
    fi
done

# 5. 尝试构建
echo
info "== 构建测试 =="

info "清理旧的构建产物..."
rm -rf */dist */build

info "尝试构建所有包..."

# 构建各个包
build_success=true
packages=("core" "table" "text" "chart")
for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        info "构建 $package 包..."
        cd "$package"
        if ! npm run build >/dev/null 2>&1; then
            error "$package 包构建失败"
            build_success=false
        fi
        cd ..
    fi
done

if $build_success; then
    success "构建成功"
    pass_count=$((pass_count + 1))
else
    error "构建失败"
fi
check_count=$((check_count + 1))

# 6. 检查构建产物
echo
info "== 构建产物检查 =="

for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        check_item "检查 $package 构建产物目录" "[ -d $package/dist ]"
        check_item "检查 $package JS文件" "[ -f $package/dist/index.js ]"
        check_item "检查 $package ESM文件" "[ -f $package/dist/index.esm.js ]"
        check_item "检查 $package 类型定义文件" "[ -f $package/dist/index.d.ts ]"
    fi
done

# 7. 检查包大小
echo
info "== 包大小检查 =="

for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        info "检查 $package 包大小:"
        cd "$package"
        npm pack --dry-run 2>/dev/null | grep "npm notice" | grep -E "(package size|unpacked size)" || true
        cd ..
        pass_count=$((pass_count + 1))
    fi
done
check_count=$((check_count + 4))

# 8. 检查NPM配置
echo
info "== NPM配置检查 =="

current_registry=$(npm config get registry)
info "当前NPM Registry: $current_registry"

if npm whoami >/dev/null 2>&1; then
    logged_user=$(npm whoami)
    success "已登录用户: $logged_user"
    pass_count=$((pass_count + 1))
else
    warning "未登录到NPM"
fi
check_count=$((check_count + 1))

# 9. 检查Git状态
echo
info "== Git状态检查 =="

if [ -n "$(git status --porcelain)" ]; then
    warning "工作目录有未提交的更改"
    git status --short
else
    success "工作目录干净"
    pass_count=$((pass_count + 1))
fi
check_count=$((check_count + 1))

current_branch=$(git branch --show-current)
info "当前分支: $current_branch"

# 10. 检查版本一致性
echo
info "== 版本一致性检查 =="

versions=()
for package in "${packages[@]}"; do
    if [ -d "$package" ]; then
        version=$(cd "$package" && npm pkg get version | tr -d '"')
        versions+=("$version")
        info "$package: $version"
    fi
done

# 检查所有版本是否一致
first_version=${versions[0]}
all_same=true
for version in "${versions[@]}"; do
    if [ "$version" != "$first_version" ]; then
        all_same=false
        break
    fi
done

if $all_same; then
    success "所有包版本一致: $first_version"
    pass_count=$((pass_count + 1))
else
    warning "包版本不一致，建议使用 ./version-update.sh 统一版本"
fi
check_count=$((check_count + 1))

# 11. 最终报告
echo
info "== 检查报告 =="

echo "检查项目: $check_count"
echo "通过项目: $pass_count"
echo "失败项目: $((check_count - pass_count))"

if [ $pass_count -eq $check_count ]; then
    success "🎉 所有检查项目通过！可以发布"
    echo
    info "发布命令: ./publish.sh"
    exit 0
else
    error "❌ 部分检查项目未通过，请修复后再发布"
    echo
    info "通过率: $(echo "scale=1; $pass_count * 100 / $check_count" | bc)%"
    exit 1
fi 