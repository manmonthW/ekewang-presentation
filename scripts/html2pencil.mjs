#!/usr/bin/env node
/**
 * html2pencil.mjs — 将 ekewang-ppt-skill 生成的 HTML PPT 拆分为独立页面，
 * 逐页导入 OpenPencil 生成可编辑的 .fig 文件。
 *
 * 用法:
 *   node scripts/html2pencil.mjs input.html [-o output.fig] [--pages 1,3,5] [--open]
 *
 * 依赖:
 *   npm install -g @open-pencil/cli
 *
 * 流程:
 *   1. 解析 HTML，提取 <style> 和所有 <section class="slide ..."> 页面
 *   2. 为每页生成独立 HTML 片段（含完整 CSS + 外部字体链接）
 *   3. 调用 openpencil import 逐页导入，合并为多页 .fig 文件
 *   4. (可选) 自动打开 OpenPencil 桌面端
 */

import { readFileSync, writeFileSync, mkdirSync, rmSync, existsSync } from 'node:fs'
import { resolve, basename, dirname, join } from 'node:path'
import { execSync, spawnSync } from 'node:child_process'
import { tmpdir } from 'node:os'

// ═══════════════════════════════════════════════════════════════
// CLI 参数解析
// ═══════════════════════════════════════════════════════════════

const args = process.argv.slice(2)
const flags = {}
const positionals = []

for (let i = 0; i < args.length; i++) {
  if (args[i] === '-o' || args[i] === '--output') { flags.output = args[++i]; continue }
  if (args[i] === '--pages') { flags.pages = args[++i]; continue }
  if (args[i] === '--open') { flags.open = true; continue }
  if (args[i] === '--keep-tmp') { flags.keepTmp = true; continue }
  if (args[i] === '--page-width') { flags.pageWidth = args[++i]; continue }
  if (args[i] === '--page-height') { flags.pageHeight = args[++i]; continue }
  if (args[i] === '-h' || args[i] === '--help') { flags.help = true; continue }
  positionals.push(args[i])
}

if (flags.help || positionals.length === 0) {
  console.log(`
html2pencil — 将 ekewang-ppt-skill 生成的 HTML PPT 导入 OpenPencil

用法:
  node scripts/html2pencil.mjs <input.html> [options]

选项:
  -o, --output <path>     输出 .fig 文件路径 (默认: <input>.fig)
  --pages <range>         指定导入页码, 如 1,3,5 或 1-3,5 (默认全部)
  --page-width <px>       单页宽度, 默认 1920
  --page-height <px>      单页高度, 默认 1080
  --open                  导入完成后自动打开 OpenPencil
  --keep-tmp              保留临时文件 (调试用)
  -h, --help              显示帮助

示例:
  node scripts/html2pencil.mjs output/index.html -o slides.fig
  node scripts/html2pencil.mjs deck.html --pages 1-5 --open
`)
  process.exit(0)
}

// ═══════════════════════════════════════════════════════════════
// 检查 openpencil CLI 是否可用
// ═══════════════════════════════════════════════════════════════

function checkOpenPencil() {
  try {
    execSync('openpencil --version', { stdio: 'pipe' })
    return true
  } catch {
    console.error('❌ 未找到 openpencil CLI。请先安装:')
    console.error('   npm install -g @open-pencil/cli')
    console.error('   # 或: bun add -g @open-pencil/cli')
    process.exit(1)
  }
}

// ═══════════════════════════════════════════════════════════════
// HTML 解析 — 提取 CSS 和 Slides
// ═══════════════════════════════════════════════════════════════

function extractSlides(html) {
  // 提取所有 <link> 标签 (字体等)
  const linkTags = []
  const linkRegex = /<link[^>]*>/gi
  let linkMatch
  while ((linkMatch = linkRegex.exec(html)) !== null) {
    linkTags.push(linkMatch[0])
  }

  // 提取所有 <style> 块
  const styles = []
  const styleRegex = /<style[^>]*>([\s\S]*?)<\/style>/gi
  let styleMatch
  while ((styleMatch = styleRegex.exec(html)) !== null) {
    styles.push(styleMatch[1])
  }

  // 提取所有 <section class="slide ..."> 块
  const slides = []
  const slideRegex = /<section\s+class="slide[^"]*"[^>]*>[\s\S]*?<\/section>/gi
  let slideMatch
  while ((slideMatch = slideRegex.exec(html)) !== null) {
    slides.push(slideMatch[0])
  }

  // 如果没找到 section，尝试用 div.slide
  if (slides.length === 0) {
    const divRegex = /<div\s+class="slide[^"]*"[^>]*>[\s\S]*?<\/div>\s*(?=<div\s+class="slide|$)/gi
    let divMatch
    while ((divMatch = divRegex.exec(html)) !== null) {
      slides.push(divMatch[0])
    }
  }

  return { linkTags, styles, slides }
}

function buildPageHTML(linkTags, styles, slideHTML, pageWidth, pageHeight) {
  // 将 slide 从 100vw/100vh 改为固定尺寸，方便 OpenPencil 精确导入
  const modifiedCSS = styles.join('\n')
    // 将横向翻页相关的 CSS 覆盖为单页模式
    .replace(/#deck\{[^}]+\}/g, '')
    .replace(/\.slide\{[^}]+\}/g, '')

  return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
${linkTags.join('\n')}
<style>
/* === 原始样式 === */
${modifiedCSS}

/* === 单页覆盖 === */
html, body {
  margin: 0; padding: 0;
  width: ${pageWidth}px; height: ${pageHeight}px;
  overflow: hidden;
}
.slide, section.slide {
  width: ${pageWidth}px !important;
  height: ${pageHeight}px !important;
  flex: none !important;
  position: relative;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-sizing: border-box;
}
/* 禁用动画，确保静态渲染 */
*, *::before, *::after {
  animation: none !important;
  transition: none !important;
}
canvas.bg, canvas.ascii-bg, #bg-grid, #bg-dark, #bg-light {
  display: none !important;
}
</style>
</head>
<body>
${slideHTML}
</body>
</html>`
}

// ═══════════════════════════════════════════════════════════════
// 页码解析
// ═══════════════════════════════════════════════════════════════

function parsePages(str, total) {
  const result = new Set()
  for (const part of str.split(',')) {
    const trimmed = part.trim()
    if (trimmed.includes('-')) {
      const [a, b] = trimmed.split('-').map(Number)
      for (let i = a; i <= Math.min(b, total); i++) result.add(i)
    } else {
      const n = Number(trimmed)
      if (n >= 1 && n <= total) result.add(n)
    }
  }
  return [...result].sort((a, b) => a - b)
}

// ═══════════════════════════════════════════════════════════════
// 主流程
// ═══════════════════════════════════════════════════════════════

function main() {
  checkOpenPencil()

  const inputPath = resolve(positionals[0])
  if (!existsSync(inputPath)) {
    console.error(`❌ 文件不存在: ${inputPath}`)
    process.exit(1)
  }

  const pageWidth = Number(flags.pageWidth || 1920)
  const pageHeight = Number(flags.pageHeight || 1080)
  const outputPath = flags.output
    ? resolve(flags.output)
    : inputPath.replace(/\.html?$/i, '.fig')

  console.log(`📖 读取: ${inputPath}`)
  const html = readFileSync(inputPath, 'utf-8')
  const { linkTags, styles, slides } = extractSlides(html)

  if (slides.length === 0) {
    console.error('❌ 未找到任何 slide (<section class="slide ..."> 或 <div class="slide ...">)')
    process.exit(1)
  }

  console.log(`📑 检测到 ${slides.length} 页`)

  // 筛选页码
  let selectedIndices = [...Array(slides.length).keys()].map(i => i + 1)
  if (flags.pages) {
    selectedIndices = parsePages(flags.pages, slides.length)
    console.log(`📌 选取第 ${selectedIndices.join(', ')} 页`)
  }

  // 创建临时目录
  const tmpDir = join(tmpdir(), `html2pencil-${Date.now()}`)
  mkdirSync(tmpDir, { recursive: true })

  const pageFiles = []

  // 生成每页独立 HTML
  for (const idx of selectedIndices) {
    const slideHTML = slides[idx - 1]
    const pageHTML = buildPageHTML(linkTags, styles, slideHTML, pageWidth, pageHeight)
    const pagePath = join(tmpDir, `page-${String(idx).padStart(3, '0')}.html`)
    writeFileSync(pagePath, pageHTML, 'utf-8')
    pageFiles.push({ idx, path: pagePath })
  }

  console.log(`📁 临时文件: ${tmpDir}`)
  console.log(`🔄 开始导入 OpenPencil...`)
  console.log('')

  // 逐页导入
  const importedFiles = []
  for (const { idx, path: pagePath } of pageFiles) {
    const pageOutput = join(tmpDir, `page-${String(idx).padStart(3, '0')}.fig`)
    const label = `  [${idx}/${slides.length}]`

    try {
      const result = spawnSync('openpencil', [
        'import', pagePath,
        '-o', pageOutput,
        '-f', 'fig',
        '--pageName', `Slide ${idx}`
      ], {
        stdio: 'pipe',
        timeout: 30000
      })

      if (result.status === 0 && existsSync(pageOutput)) {
        console.log(`${label} ✅ Slide ${idx}`)
        importedFiles.push(pageOutput)
      } else {
        const err = result.stderr?.toString() || result.stdout?.toString() || 'unknown error'
        console.log(`${label} ⚠️  Slide ${idx} 导入失败: ${err.trim().split('\n')[0]}`)
      }
    } catch (e) {
      console.log(`${label} ⚠️  Slide ${idx} 超时或异常: ${e.message}`)
    }
  }

  console.log('')

  if (importedFiles.length === 0) {
    console.error('❌ 所有页面导入失败。请检查 openpencil 版本和 HTML 格式。')
    cleanup(tmpDir)
    process.exit(1)
  }

  // 合并多页 .fig 文件（如果只有一页直接复制）
  if (importedFiles.length === 1) {
    execSync(`cp "${importedFiles[0]}" "${outputPath}"`)
  } else {
    // 使用 openpencil convert 合并，或直接使用第一个文件
    // OpenPencil 当前不支持 merge，所以我们用第一个文件作为基础
    // 并将其他页面通过 eval 插入
    try {
      // 尝试用 openpencil 的 merge 功能
      const mergeArgs = ['convert', importedFiles[0], outputPath]
      const mergeResult = spawnSync('openpencil', mergeArgs, { stdio: 'pipe', timeout: 30000 })

      if (mergeResult.status !== 0) {
        // fallback: 复制第一个文件
        execSync(`cp "${importedFiles[0]}" "${outputPath}"`)
      }

      // 如果有多个页面，提示用户手动合并
      if (importedFiles.length > 1) {
        console.log(`💡 提示: 共生成 ${importedFiles.length} 个独立 .fig 文件。`)
        console.log(`   主文件: ${outputPath}`)
        console.log(`   其他页面在临时目录中，可在 OpenPencil 中逐个打开后复制到主文件。`)
        // 复制所有页面到输出目录
        const outDir = dirname(outputPath)
        const outBase = basename(outputPath, '.fig')
        for (let i = 1; i < importedFiles.length; i++) {
          const dest = join(outDir, `${outBase}-page${selectedIndices[i]}.fig`)
          execSync(`cp "${importedFiles[i]}" "${dest}"`)
        }
      }
    } catch (e) {
      execSync(`cp "${importedFiles[0]}" "${outputPath}"`)
    }
  }

  console.log(`✅ 输出: ${outputPath}`)
  console.log(`   共 ${importedFiles.length} 页成功导入`)

  // 自动打开
  if (flags.open) {
    console.log(`🚀 正在打开 OpenPencil...`)
    try {
      spawnSync('openpencil', [outputPath], { stdio: 'ignore', detached: true })
    } catch {
      console.log('   无法自动打开，请手动打开 OpenPencil 桌面端加载文件。')
    }
  }

  // 输出后续操作提示
  console.log('')
  console.log('📋 后续操作:')
  console.log('   1. 在 OpenPencil 中打开 .fig 文件，手动调整对齐/字体/重叠')
  console.log('   2. 导出为最终格式:')
  console.log(`      openpencil export ${outputPath} -f png -s 2`)
  console.log(`      openpencil export ${outputPath} -f html --html standalone`)
  console.log('   3. (Windows) 转为 .pptx:')
  console.log(`      pencil2pptx ${outputPath.replace('.fig', '.pen')} -o presentation.pptx`)

  cleanup(tmpDir)
}

function cleanup(tmpDir) {
  if (!flags.keepTmp) {
    try { rmSync(tmpDir, { recursive: true, force: true }) } catch {}
  }
}

main()
