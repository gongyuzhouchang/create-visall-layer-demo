#!/usr/bin/env node

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

// 获取项目名称，默认为 my-visall-project
const projectName = process.argv[2] || 'my-visall-project';
const currentPath = process.cwd();
const projectPath = path.join(currentPath, projectName);
const templatePath = path.join(__dirname, 'template');

console.log('🚀 正在创建 VISALL Layer 项目...');
console.log(`📁 项目名称: ${projectName}`);
console.log(`📍 创建位置: ${projectPath}`);

// 检查目录是否已存在
if (fs.existsSync(projectPath)) {
  console.error(`❌ 错误: 目录 ${projectName} 已存在！`);
  process.exit(1);
}

try {
  // 复制模板文件
  console.log('📋 复制模板文件...');
  fs.copySync(templatePath, projectPath);

  // 更新 package.json 中的项目名称
  console.log('⚙️ 配置项目信息...');
  const packageJsonPath = path.join(projectPath, 'package.json');
  const packageJson = require(packageJsonPath);
  packageJson.name = projectName;
  packageJson.description = `VISALL Layer demo project - ${projectName}`;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  console.log('✅ 项目创建成功！');
  console.log('');
  console.log('🎯 接下来运行以下命令：');
  console.log(`   cd ${projectName}`);
  console.log('   npm install');
  console.log('   npm run dev');
  console.log('');
  console.log('📚 更多信息请查看项目中的 README.md 文件');
} catch (error) {
  console.error('❌ 创建项目时发生错误:', error.message);
  process.exit(1);
}
