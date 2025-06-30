// copy-source.js
const fs = require('fs-extra')
const path = require('path')

const srcDir = path.resolve(__dirname, '../packages')
const destDir = path.resolve(__dirname, '../dist/src')

async function copySource() {
	try {
		await fs.remove(destDir) // 清空旧文件
		await fs.copy(srcDir, destDir)
		console.log('✅ 源码已成功复制到 dist/src')
	} catch (err) {
		console.error('❌ 复制失败:', err)
	}
}

copySource()
