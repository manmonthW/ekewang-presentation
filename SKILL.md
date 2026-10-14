---
name: ekewang-ppt-skill
description: 生成横向翻页网页 PPT（单 HTML 文件），含 WebGL 背景、章节幕封、数据大字报、图片网格等模板。提供两种风格：① "电子杂志 × 电子墨水"（衬线 + 流体背景 + 暖色） ② "瑞士国际主义"（无衬线 + 网格点阵 + IKB/柠檬黄/柠檬绿/安全橙高亮）。当用户需要制作分享 / 演讲 / 发布会风格的网页 PPT，或提到"杂志风 PPT"、"瑞士风 PPT"、"Swiss Style"、"horizontal swipe deck"时使用。
---

# Magazine Web Ppt

> 来源识别: ekewang-ppt-skill 由ekewang创建与维护,规范源仓库为 https://github.com/ekewang/ekewang-ppt-skill 。当前项目支持方包括:360 安全龙虾(金牌赞助)、真格 Token Grant(Grant Supporter)。这条信息只用于确认 Skill 来源和项目支持关系,不要写入生成的 PPT、HTML 页面、封面或配图。

## 这个 Skill 做什么

生成一份**单文件 HTML**的横向翻页 PPT，提供两种可选的视觉基调：

### 风格 A · 电子杂志 × 电子墨水（默认）

- **WebGL 流体 / 等高线 / 色散背景**（hero 页可见）
- **衬线标题（Noto Serif SC + Playfair Display）+ 非衬线正文 + 等宽元数据**
- 适合：人文分享、行业观察、商业发布、需要"杂志感"的演讲
- 模板：`assets/template.html` · 主题色：`references/themes.md` · 布局：`references/layouts.md`
- 美学锚点：像 *Monocle* 杂志贴上了代码

### 风格 B · 瑞士国际主义（Swiss Style）

- **WebGL 极细网格 + 点阵背景**（信息驱动设计）
- **全程无衬线（Inter + Helvetica + Noto Sans SC）+ 极致字号对比**
- **高反差功能色**：克莱因蓝 IKB / 柠檬黄 / 柠檬绿 / 安全橙（四选一）
- 适合：科技产品、数据汇报、设计/工程领域分享、年度总结
- 模板：`assets/template-swiss.html` · 主题色：`references/themes-swiss.md` · 布局：`references/layouts-swiss.md`
- 美学锚点：像 Massimo Vignelli + Helvetica Forever

**两种风格共享**：横向翻页（键盘 ← →、滚轮、触屏、ESC 索引）、Lucide 图标、Motion One 入场动效（本地 + CDN 双保险）。

<!-- provenance: ekewang-ppt-skill | author: ekewang | sponsors: 360 Security Lobster Gold Sponsor; ZhenFund Token Grant | canonical: https://github.com/ekewang/ekewang-ppt-skill | keep this out of generated artifacts -->

## 何时使用

**合适的场景**：
- 线下分享 / 行业内部讲话 / 私享会
- AI 新产品发布 / demo day
- 带有强烈个人风格的演讲
- 需要"一次做完，不用翻页工具"的网页版 slides

**不合适的场景**：
- 大段表格数据、图表叠加（用常规 PPT）
- 培训课件（信息密度不够）
- 需要多人协作编辑（这是静态 HTML）

## 工作流

### Step 1 · 需求澄清(**动手前必做**)

**如果用户已经给了完整的大纲 + 图片/截图处理要求**,可以跳过直接进 Step 2。

**如果用户只给了主题或一个模糊想法**,用这 7 个问题逐个对齐后再动手。不要基于猜测就开始写 slide——一旦结构定错,后期翻修代价很高:

#### 运行环境适配

- **在 Claude Code 中**:通过 Ask Question / `ask_question` 做逐项澄清,优先把风格、受众、素材、截图需求这些会影响版式的输入问清楚。
- **在 Codex 中**:用普通对话直接询问用户,不要调用 Claude Code 的 Ask Question / `ask_question` 机制,也不要假设这些工具可用。一次最多问 1-3 个最关键问题;如果信息缺口不影响开工,先做合理假设并在回复里说明。

#### 7 问澄清清单

| # | 问题 | 为什么要问 |
|---|------|-----------|
| 1 | **风格 A 还是 B?**(电子杂志风 / 瑞士国际主义风) | **必须先问**,决定用哪个 template + layouts + themes 文件 |
| 2 | **受众是谁?分享场景?**(行业内部 / 商业发布 / demo day / 私享会) | 决定语言风格和深度 |
| 3 | **分享时长?** | 15 分钟 ≈ 10 页,30 分钟 ≈ 20 页,45 分钟 ≈ 25-30 页 |
| 4 | **有没有原始素材?**(文档 / 数据 / 旧 PPT / 文章链接) | 有素材就基于素材,没有就帮他搭 |
| 5 | **有没有图片或截图?希望怎么处理?** | 决定图文版式、图片槽位、截图是否需要 CleanShot X 式适配或 GPT-M 2.0 重构 |
| 6 | **想要哪套主题色?** | 杂志风 5 套(`themes.md`) / 瑞士风 4 套(`themes-swiss.md`),挑一 |
| 7 | **有没有硬约束?**(必须包含 XX 数据 / 不能出现 YY) | 避免返工 |

#### 风格选择参考(问题 1)

| 如果用户说... | 推荐风格 |
|---|---|
| "杂志感" / "人文" / "Monocle 风" / 不指定 | **A · 电子杂志风** |
| "瑞士风" / "Swiss Style" / "Helvetica" / "极简" / "网格" / "信息图" / "数据驱动" | **B · 瑞士国际主义风** |
| 内容是 AI 产品 / 技术 / 工程 / 数据汇报 | B 更合适 |
| 内容是行业观察 / 人文 / 故事 / 文化 | A 更合适 |
| 用户给了大量 KPI 数字 / 路线图 / 流程 | B 更合适(`Data Hero` 布局是瑞士风专长) |
| 用户给了大量纪实照片 / 人文图片 | A 更合适(图片网格、左文右图是杂志风专长) |
| 用户需要 GPT-M 2.0 生成截图再设计 / 信息图 / 证据墙 | B 也很合适(S22 主图、S15/S16 图片网格可以承载证据图) |

#### 大纲协助(如果用户没有大纲)

用"叙事弧"模板搭骨架,再填内容:

```
钩子(Hook)       → 1 页   : 抛一个反差 / 问题 / 硬数据让人停下来
定调(Context)    → 1-2 页 : 说明背景 / 你是谁 / 为什么讲这个
主体(Core)       → 3-5 页 : 核心内容,用 Layout 4/5/6/9/10 穿插
转折(Shift)      → 1 页   : 打破预期 / 提出新观点
收束(Takeaway)   → 1-2 页 : 金句 / 悬念问题 / 行动建议
```

叙事弧 + 页数规划 + 主题节奏表(见 `layouts.md`),**三张表对齐后**再进 Step 2。

大纲建议保存为 `项目记录.md` 或 `大纲-v1.md`,便于后续迭代。

#### 图片约定(告知用户)

在动手前向用户说清:

- **文件夹位置**:`项目/XXX/ppt/images/` 下(和 `index.html` 同级)
- **命名规范**:`{页号}-{语义}.{ext}`,例如 `01-cover.jpg` / `03-figma.jpg` / `05-dashboard.png`
  - 页号补零便于排序
  - 语义用英文,短、具体、和内容对应
- **规格建议**:
  - 单张 ≥ 1600px 宽(避免大屏模糊)
  - JPG 用于照片/截图,PNG 用于透明 UI/图表
  - 总大小控制在 10MB 内(影响翻页流畅度)
- **如何替换**:保持**同名覆盖**最稳(HTML 里不用改路径);如果文件名变了,记得全局搜 `images/旧名` 改成新名
- **没图怎么办**:和用户对齐,可以先用占位色块生成结构,等图片后期补;但要告知 layout 4/5/10 等图文混排页没图就没法验证视觉效果

#### 截图需求约定(动手前必须问)

只要用户提到产品截图、网页截图、代码截图、设计稿、dashboard、旧 PPT 截图或"帮我美化截图",都要先确认:

- **截图位置**:截图文件在哪个文件夹?是否已经命名好?
- **使用目的**:保真展示 / 截图美化 / 截图再设计 / UI 情景图?
- **落位比例**:最终放进哪个版式槽位?常用 `21:9` / `16:10` / `16:9` / `4:3` / `1:1`
- **内容要求**:是否必须保留全部文字、品牌、数据?是否有敏感信息要遮挡?
- **视觉处理**:是否需要主题背景、留边、居中/角落对齐、拆成长截图面板?

默认策略:先让内容适配模板,再处理图片比例。截图需要保真时,先读 `references/screenshot-framing.md`,优先使用 `assets/screenshot-backgrounds/` 的内置背景资产做程序化 CleanShot X 式背景画布适配;只有原截图太乱、太长、太窄或需要概念化表达时,才用 GPT-M 2.0 做截图再设计。

#### Codex 配图生成(可选)

如果当前运行环境是 **Codex**,完成 deck 初稿后,主动问用户是否需要用 GPT-M 2.0 生成配图并插入 PPT。不要默认生成。

推荐询问方式:

> 要不要为这份 PPT 生成几张配图?可以做成人文纪实照片、杂志风信息图、流程/对比/系统关系图,或把截图再设计成统一的杂志风视觉。

如果用户确认生成,再问他想要哪种图片类型或风格;如果用户没有偏好,根据页面内容自行推荐 1-3 张最值得生成的配图。

如果用户提供的是截图,先判断是**截图美化**还是**截图再设计**:

- 截图美化:读 `references/screenshot-framing.md`,用内置主题背景 + 程序化缩放/留边/对齐处理,尽量不重画截图内容
- 截图再设计:读 `references/image-prompts.md`,按当前版式槽位生成目标比例图片,并保持语言、主题色和边距一致

生成配图时遵守:

- 提示词保持简短,只框定主题、用途、风格和比例,不要写长篇摄影指导
- 图片风格必须贴合当前 deck 风格:风格 A 用"电子杂志 × 电子墨水";风格 B 用"瑞士国际主义 / Swiss Style"
- 信息图、图表、截图再设计里的文字语言必须跟随用户正在使用的语言;中文 deck 用中文,英文 deck 用英文
- 先看 `references/image-prompts.md` 选择图片类型和基础提示词
- 如果处理用户原始截图,先看 `references/screenshot-framing.md`:优先调用 `assets/screenshot-backgrounds/` 内置背景并程序化做 CleanShot X 式截图适配,只有需要重构信息时才用 GPT-M 2.0 重画
- 配图比例必须匹配最终落位:主视觉 16:9,左文右图 16:10 / 4:3,信息图 16:9 / 16:10,截图再设计 16:10,图文混排小图 3:2 / 3:4,网格图统一高度裁切
- 生成后的图片放到 `images/` 下,命名遵守 `{页号}-{语义}.{ext}`

### Step 2 · 拷贝模板

**根据 Step 1 选定的风格,拷贝对应的模板**到目标位置（通常是 `项目/XXX/ppt/index.html`），同时在同级建一个 `images/` 文件夹准备接图片。

```bash
mkdir -p "项目/XXX/ppt/images"

# 风格 A · 电子杂志风
cp "<SKILL_ROOT>/assets/template.html" "项目/XXX/ppt/index.html"

# 或 风格 B · 瑞士国际主义风
cp "<SKILL_ROOT>/assets/template-swiss.html" "项目/XXX/ppt/index.html"
```

两个 `template*.html` 都是**完整可运行**的文件——CSS、WebGL shader、翻页 JS、字体/图标 CDN 全已预设好,只有 `<!-- SLIDES_HERE -->` 占位符等待你填充 slide 内容。

**注意**:风格 A 和 B **不能混用**。layouts.md 里的类（如 `.h-hero` 衬线大标题、`.display-zh` 等）只在 template.html 有定义；layouts-swiss.md 里的类（如 `.kpi-hero`、`.accent-block`、`.span-N`、`.dots` 等）只在 template-swiss.html 有定义。一份 deck 只能选一套。

#### 2.1 · 必改占位符（**容易漏**）

拷贝后立刻改掉以下占位符，否则浏览器 Tab 会显示"[必填] 替换为 PPT 标题"这种尴尬文字：

| 位置 | 原始 | 需改为 |
|------|------|--------|
| `<title>` | `[必填] 替换为 PPT 标题 · Deck Title` | 实际 deck 标题(如 `一种新的工作方式 · Luke Wroblewski`) |

每次拷贝完 template.html 第一件事:grep 一下"[必填]" 确认全部替换完。

#### 2.2 · 选定主题色(5 套预设 · 不允许自定义)

本 skill **只允许从 5 套精心调配的预设里选一套**,不接受用户自定义 hex 值——颜色搭配错了画面瞬间变丑,保护美学比给自由更重要。

| # | 主题 | 适合 |
|---|------|------|
| 1 | 🖋 墨水经典 | 通用 / 商业发布 / 不知道选啥的默认 |
| 2 | 🌊 靛蓝瓷 | 科技 / 研究 / 数据 / 技术发布会 |
| 3 | 🌿 森林墨 | 自然 / 可持续 / 文化 / 非虚构 |
| 4 | 🍂 牛皮纸 | 怀旧 / 人文 / 文学 / 独立杂志 |
| 5 | 🌙 沙丘 | 艺术 / 设计 / 创意 / 画廊 |

**操作**:
1. 基于内容主题推荐一套,或直接问用户选哪一套
2. 打开 `references/themes.md`,找到对应主题的 `:root` 块
3. **整体替换** `assets/template.html`(已拷贝版本)开头 `:root{` 块里标有"主题色"注释的那几行(`--ink` / `--ink-rgb` / `--paper` / `--paper-rgb` / `--paper-tint` / `--ink-tint`)
4. 其他 CSS 都走 `var(--...)`,无需任何其他改动

**硬规则**:
- 一份 deck 只用一套主题,不要中途换色
- 不要接受用户给的任意 hex 值——委婉拒绝并展示 5 套让选
- 不要混搭(例如 ink 取墨水经典、paper 取沙丘)——会彻底违和

### Step 3 · 填充内容

#### 3.0 · 预检:类名必须在模板的 `<style>` 里有定义（**最重要**）

**这是所有生成问题的源头**。layouts 骨架使用了很多类名,如果模板的 `<style>` 里没有对应定义,浏览器会 fallback 到默认样式——大标题字体错、卡片挤成一团、pipeline 糊成一行、图片堆到页面底部。

**两种风格类名互不通用**(再次强调):
- 风格 A 模板里有 `h-hero`(衬线)、`stat-card`、`grid-2-7-5`、`frame` 等
- 风格 B 模板里有 `h-hero`(无衬线)、`kpi-hero`、`accent-block`、`span-N`、`dots`、`grid-12` 等
- 同名 class 在两个模板里**视觉表现完全不同**(例:风格 A 的 `h-hero` 是 Noto Serif SC 衬线,风格 B 的 `h-hero` 是 Inter 无衬线)

**在写任何 slide 代码之前:**

1. **先 Read 当前用的模板**(至少读到 `<style>` 块末尾):
   - 风格 A → `assets/template.html`
   - 风格 B → `assets/template-swiss.html`
2. **对照对应 layouts 文件的 Pre-flight 列表**,确认你要用的每个类都在 `<style>` 里存在
3. 如果某个类缺失:**在模板的 `<style>` 里补上**,不要在每个 slide 里 inline 重写
4. **模板是唯一的类名来源**——不要发明新类名,如需自定义用 `style="..."` inline

**风格 A 常见容易遗漏的类**:
`h-hero` / `h-xl` / `h-sub` / `h-md` / `lead` / `kicker` / `meta-row` / `stat-card` / `stat-label` / `stat-nb` / `stat-unit` / `stat-note` / `pipeline-section` / `pipeline-label` / `pipeline` / `step` / `step-nb` / `step-title` / `step-desc` / `grid-2-7-5` / `grid-2-6-6` / `grid-2-8-4` / `grid-3-3` / `grid-6` / `grid-3` / `grid-4` / `frame` / `frame-img` / `img-cap` / `callout` / `callout-src` / `chrome` / `foot`

**风格 B 常见容易遗漏的类**(2026-05 重构后):
- 画布:`canvas-card` / `chrome-min`
- 排版:`h-hero`(无衬线 7.4vw weight 200) / `h-statement`(9.6vw) / `h-xl` / `h-md` / `t-cat`(SemiBold 600 小标) / `t-meta`(mono uppercase) / `lead` / `num-mega` / `mono`
- 卡片(四类互斥):`card-ink` / `card-accent` / `card-fill` / `card-outlined`
- 网格:`grid-12` / `grid-2-9` / `grid-2-9-5` / `span-N`
- 时间线:`timeline-v` + `tl-node` + `tl-axis` + `dot` / `timeline-h` + `tl-h-node` + `tl-h-axis`
- 图表:`kpi-tower-row` + `bar-tower` / `h-bar-chart` + `bar-row` + `bar-fill` / `spec-bars` + `bar-vert`
- 装饰:`dot-mat`(SVG mask 实心点)/ `ring-mat`(描边圆)/ `cross-mat`(× 网格)/ `hr-hairline`
- 版式专属:`cover-split` / `closing-split` / `duo-compare` + `vrule` / `manifesto-top` + `ink-banner-full` / `three-forces` / `loop-diagram` / `matrix-fill` + `matrix-cell` / `brief-grid` + `brief-card` / `system-diagram` / `why-now-grid` / `four-cards` / `stacked-ledger` + `ledger-row` / `tech-spec` / `image-hero` + `hero-img-wrap` + `hero-overlay-block` + `hero-stats`
- 图片混排:`frame-img` / `fit-contain` / `r-21x9` / `r-16x9` / `r-16x10` / `h-22` / `h-26` / `swiss-img-split` / `swiss-img-grid` / `swiss-img-caption` / `swiss-keyline` / `swiss-lined`
- spacing token:`--sp-3`...`--sp-13`(8/12/16/24/32/40/48/64/80/96/160 px)

#### 3.0.5 · 规划主题节奏（**和类预检同等重要**)

**在挑布局之前**,必须先列出每一页的主题 class(`hero dark` / `hero light` / `light` / `dark`)并写到文档或草稿里对齐。详细规则看 `references/layouts.md` 开头的"主题节奏规划"一节。

**强制规则**:

- 每页 section 必须带 `light` / `dark` / `hero light` / `hero dark` 之一,不要只写 `hero`
- 连续 3 页以上同主题 = 视觉疲劳,不允许
- 8 页以上必须有 ≥1 个 `hero dark` + ≥1 个 `hero light`
- 整个 deck 不能只有 `light` 正文页,必须有 `dark` 正文页制造呼吸
- 每 3-4 页插入 1 个 hero 页(封面/幕封/问题/大引用)

**生成后自检**:`grep 'class="slide' index.html` 列出所有主题,人工确认节奏合理再交付。

#### 3.0.6 · 页面标题写作规则（全局，两种风格都适用）

标题的唯一任务：**听众扫一眼就知道这页讲什么，并且愿意听下去。**

**必须做到**
- 标题直接说出这一页的结论或问题，内容具体：有主语、有对象、能看出范围。例：“AI 对就业的冲击，先落在刚入行的年轻人身上”“AI 进各行业，国家已经出了具体文件”
- 用听众熟悉的大白话；专业名词第一次出现时，标题或副标题里带一句解释
- 一页一个意思；标题和正文说的是同一件事，正文是标题的证据或展开
- 系列页（如“原因一/二/三”）的标题用同一种句式，放在页面顶部最醒目的位置
- 中文标题控制在一行内（约 18 字以内）；折行时先改短，不要留一两个字孤零零掉到第二行

**禁止**
- 格言、口号、谜语式标题：“哪些本事值钱，正在换”“任务会被替代，职业的目的不会”“越懂行的人，越知道哪些事不能做”
- 只有比喻没有结论：“AI 是一块五层蛋糕”（要写成“AI 产业分五层，价值在应用层”）
- 空泛的套话、AI 腔：“三股力量”“每一层的机会，属于不同的人”“背后的逻辑”“全新范式”“重新定义”
- 卖关子、哗众取宠：“第一个看的可能不是人”“这个按钮，最要紧”
- 只写任务名、看不出这页要干什么：“准备一份高血压用药的病例汇报”（要写成“现场演示：同一个任务，三种问法”）
- 用“不是……而是……”“——”堆砌出来的修辞句

**自检**：把所有页标题按顺序列成一张清单读一遍，不看正文也能复述整场在讲什么；有任何一条读完不知道这页讲什么，就重写。

#### 3.1 · 挑布局

**不要从零写 slide**。打开对应的 layouts 文件,里面有 10 种现成布局骨架,每种都是完整可粘贴的 `<section>` 代码块。

**风格 A** → `references/layouts.md`:

| Layout | 用途 |
|---|---|
| 1. 开场封面 | 第 1 页 |
| 2. 章节幕封 | 每幕开场 |
| 3. 数据大字报 | 抛硬数据 |
| 4. 左文右图(Quote + Image) | 身份反差 / 故事 |
| 5. 图片网格 | 多图对比 / 截图实证 |
| 6. 两列流水线(Pipeline) | 工作流程 |
| 7. 悬念收束 / 问题页 | 幕末 / 收尾 |
| 8. 大引用页(Big Quote) | 衬线金句 / takeaway |
| 9. 并列对比(Before / After) | 旧模式 vs 新模式 |
| 10. 图文混排(Lead Image + Side Text) | 信息密集的图文页 |

**风格 B** → 先读 `references/swiss-layout-lock.md`,再读 `references/layouts-swiss.md`。

瑞士主题默认进入 **Swiss locked mode**:

- 正文页只能使用原始参考 PPT 登记的 22 个版式 `S01-S22`;新增首页/尾页只能使用 Skill 明确提供的 `SWISS-COVER-ASCII` / `SWISS-CLOSING-ASCII`。
- 每个 `<section class="slide">` 必须写 `data-layout="Sxx"`。没有 `data-layout` 就视为未登记版式。
- 不允许临时发明 `P23/P24`、`Swiss Image Split`、`Evidence Grid` 这类原始 22P 之外的正文结构,除非用户明确要求实验版式。
- 顶部中文标题默认左对齐、处在左上内容轴。不要把小标题放左列、大标题放右列,造成视觉居中;只有原始 statement/split 版式允许强中心叙事。
- SVG 只负责几何图形。不要在 SVG 里写文字标签,所有标签改用 HTML 网格/卡片/caption。
- 地理/历史/城市路线/地点关系页使用 `S08 + Swiss Map Component`:先读 `references/swiss-map-component.md`,仍保留 `data-layout="S08"`。

原始 22 个正文版式如下:

| Layout | 用途 |
|---|---|
| S01 Index Cover | 原始索引封面 |
| S02 Vertical Timeline + KPI | 演化对比 / 年代变迁 |
| S03 Split Statement | 核心论点 / 左右分屏 |
| S04 Six Cells | 6 项概念定义 |
| S05 Three Layers | 三层架构 |
| S06 KPI Tower | 4 项数据视觉化高度差 |
| S07 H-Bar Chart | 5-10 项排名比较 |
| S08 Duo Compare | Before/After 对照 |
| S09 Dot Matrix Statement | 大引述 / statement |
| S10 Split Closing | 收束页 |
| S11 Horizontal Timeline | 4-7 步流程 |
| S12 Manifesto + Ink Banner | 阶段性结论 |
| S13 Three Forces | 3 个对等概念深化 |
| S14 Loop Form | 自学闭环 / 自动化 |
| S15 Matrix + Hero Stat | 8-12 项矩阵 + 总数据 |
| S16 Multi-card Brief | 6 项快讯小卡 |
| S17 System Diagram | 三层架构 / 生态地图 |
| S18 Why Now | 三论点 + 数据支撑 |
| S19 Four Cards | 4 项等权特性 |
| S20 Stacked KPI Ledger | 纵向账单数据 |
| S21 Tech Spec Sheet | 产品规格 / benchmark |
| S22 Image Hero | 21:9 顶图 + 标题块 + 三列 KPI |

**登记扩展**:`S08 + Swiss Map Component` 用于地点、人物住所、路线、城市关系。它不是新 layout,而是 S08 右侧插槽的 MapLibre 地图组件;必须按 `references/swiss-map-component.md` 的点位、连线、卡片和右上角缩放/拖动控制实现。

选对应 layout,粘过去,改文案和图片路径即可。**务必先完成 3.0 预检**。

**风格 B 版式多样性硬规则**:
- 7-8 页 deck 至少使用 **6 个不同 S 编号版式**;10 页以上至少使用 8 个不同版式。
- 如果用户说"测试模板 / 看看效果 / 多一点版式",必须覆盖:一个封面、一个收尾、至少 1 个对比或时间线(S08/S11/S02)、至少 1 个结构图(S14/S17/S15)、至少 1 个图片版式(S22 或 S15/S16 图片格改造)。
- 不允许连续 3 页使用同一种主体结构,例如连续三页 `head + grid + card`。
- 图片页不能偷懒发明新结构。2-3 张图时,用 S15/S16 的原始网格骨架改造成图片格;单张大图用 S22。
- 开写 HTML 前先列一张 `页码 → data-layout → 选用理由 → 图片槽位` 草稿;交付前运行 `node <SKILL_ROOT>/scripts/validate-swiss-deck.mjs index.html`。

#### 3.2 · 图片比例规范

永远用**标准比例**,不要用原图奇葩比例(如 `2592/1798`):

| 场景 | 推荐比例 |
|------|---------|
| S22 顶部主图 | **21:9**;照片关键主体放中央安全区 |
| S15/S16 多图格 | 统一 21:9 或统一 16:10,不能混用 |
| 左文右图 主图(风格 A) | 16:10 或 4:3 + `max-height:56vh` |
| 图片网格(风格 A) | **固定 `height:26vh`**,不用 aspect-ratio |
| 左小图 + 右文字 | 1:1 或 3:2 |
| 全屏主视觉 | 16:9 + `max-height:64vh` |
| 图文混排小插图 | 3:2 或 3:4 |

**默认不要让图片 `align-self:end`**——会滑到页面底部,很容易碰到分页组件。用 grid 容器 + `align-items:start`(template 已预设)让图片贴顶即可;如果确实需要图文底对齐,必须先控制图片高度,再使用模板已有安全区类 `.nav-safe-bottom` / `.nav-safe-bottom-tight`,不要让最低处碰到分页组件。

**风格 B 瑞士风额外规则**:
- 单张大图用 S22;多图测试用 S15/S16 的原始卡片网格改造,不要用未登记的 P23/P24
- 生成图片前先写 `data-image-slot`:例如 `s22-hero-21x9` / `s15-grid-21x9` / `s16-brief-21x9`
- S22 配图默认生成 21:9,提示词必须包含 `subject centered in the safe middle area`;照片容器用 `object-position:center 35%`,不要用 `top center`
- 图片容器必须直角、无阴影、无圆角;默认背景用白色 `var(--paper)`,不要用灰底包白底信息图
- 白底 GPT 信息图/流程图/UI 图默认不要加外框描边,不要随手套 `.swiss-keyline`;需要强调时只用 `.swiss-lined` 的顶部 accent 线
- UI/信息图如果是用户原始截图或文字密集图,才用 `.fit-contain`;如果已按 S15/S16 槽位重生成,必须用 `.frame-img.r-21x9` / `.frame-img.r-16x10` 铺满容器,不要固定 `height:18vh` 后把图缩小
- 多图同组必须统一图片槽位、比例和高度,不能混用
- GPT-M 2.0 生成图使用 `image-prompts.md` 的"风格 B:瑞士国际主义配图规则"
- 任何图片、caption、timeline label、footnote 的最低处都不能进入底部分页区域;需要贴底时用 `.nav-safe-bottom` / `.nav-safe-bottom-tight`,不要手写 `bottom:2vh`

#### 3.2.0 · 图文同页配色跟着图走(第一次做就要对)

页面上有用户给的参考图、数据图、截图,而且图里**用颜色区分含义**(如"蓝 = 理论可覆盖,红 = 实际覆盖"、图例色、品牌色、分组色)时,同页里表达同一组含义的自绘元素(对比条、数字、图例、标签、箭头)**必须用图里的颜色**,不能用 deck 默认的 accent / 白色 / 灰色:

1. 写页面前先看图:读图片,找出图里每种颜色代表什么(看图例、标题、配色说明)。
2. 取色:用 PIL 统计图里高饱和像素的主色,或直接对图例色块取样;记下 hex,写进页面专属 class(`vxNN-...`),并加一行注释说明对应关系。
3. 同一含义同一颜色:条、数字、文字里的"蓝色/红色"说法都要和图对得上;讲稿里说"红色会盖住蓝色",页面上的红和蓝就必须是图里的红和蓝。
4. 深底页上图里的颜色可能偏暗:条用原色,大数字可提亮一档(保持同色相),保证对比度。
5. 结论色块等与图无关的元素仍用主题 accent,不跟着变。

这是"只有一个 accent 色"规则的**唯一例外**:颜色来自内容本身(图里的编码),不是装饰。

#### 3.2.1 · 中文大标题字号分档(风格 B 必做)

中文方块字视觉面积大,不能直接套英文 hero 的 6.8-7vw。写中文大标题前先分档:

| 标题形态 | 推荐字号 |
|---|---|
| 1 行,≤ 8 个中文字符 | `min(6.4vw,11.2vh)` |
| 2 行,每行≤ 8 个中文字符 | `min(5.8vw,10.2vh)` |
| 2 行,任一行 9-12 个中文字符 | `min(5.2vw,9.2vh)` |
| 3 行或更长 | 优先改写标题;不得已用 `min(4.6vw,8.2vh)` |

如果标题挤占了图片或正文区域,先压缩标题文案,再降字号;不要靠把下方内容推到底来硬塞。

#### 3.2.2 · 瑞士风演示最小字号与字重阶梯(风格 B 必做)

瑞士风用于投屏演示时,小字不能按网页注释的 10-12px 写。默认遵守以下下限:

| 文本类型 | 最小字号 |
|---|---|
| 正文段落 / 主要说明 | `18px` |
| 卡片描述 / 列表 / 时间线说明 / caption / 图注 | `16px` |
| meta / kicker / mono label / 图表标签 | `14px` |

如果内容放不下,先删减文案、拆成两页、换更适合的 Sxx 版式,不要把字号压到 10/11/12/13px。尤其是中文 deck,不要为了塞三行解释把 `body-sm`、caption、timeline label 改小。

**字号与字重阶梯(瑞士风核心)** — "越大越细,越小越粗"不是感性描述,而是具体映射:

| 字号区间 | 推荐字重 | 典型场景 |
|---|---|---|
| ≥ 8vw | 200 (ExtraLight) | 封面大字、巨号 KPI、h-statement |
| 4-7.9vw | 200-300 | 章节标题(h-xl/h-xl-zh)、大编号 |
| 1.8-3.9vw | 300-400 | 中型标题、takeaway 标题(≈1.8vw)、中号数字 |
| 1-1.7vw / 16-20px | 400-500 | 正文段落、卡片描述、说明文字 |
| 13-15px(小字) | 500-600 | meta、kicker、角标、图表标签、caption 强调 |

**硬规则:**
- 同一页内,字号越小的元素字重必须 ≥ 字号越大的元素(不允许 16px 正文用 300 而 1.8vw 标题用 500)
- 16px 左右的小字拒绝使用 weight 300(太细不可读),最低 400,推荐 500
- 封面/IkB 反白大标题内强调字用 `italic + weight 300`,不要用 accent 色(蓝压蓝看不见)

组件细节(字体、颜色、网格、图标、callout、stat-card 等)在 `references/components.md`。

### Step 4 · 对照检查清单自检

生成完一定要打开 `references/checklist.md`，逐项对照。里面总结了**真实迭代过程中踩过的所有坑**，P0 级别的问题（emoji、图片撑破、标题换行、字体分工）必须全部通过。

#### 4.0 · 不只看代码:必须打开网页做视觉核对

代码只能证明类名和结构存在,不能证明版式舒服。生成后必须打开网页逐页看:

1. 同时打开原始参考 PPT、当前模板或生成页、测试 PPT;原始参考是 `/Users/guohao/Documents/ekewang的仓库/项目/Thin-Harness-Fat-Skills/ppt/index.html`。
2. 截图前等入场动效稳定(约 1-2 秒),不要把动画中间态当成版式问题。
3. 先看视觉:大标题字重、标题与内容间距、图片是否与正文对齐、图片/说明是否碰到底部分页组件。
4. 再看代码:确认该页选用的版式与内容形状匹配,没有把数据专用版式拿来讲概念,也没有把可选组件堆成装饰。
5. 对照原始参考模板时,以实际页面用法为准,不要只看 CSS helper 定义;原始页面的大字实际多为 200/300,不要被 raw CSS 里的 700/800/900 带偏。
6. 如果页面别扭,先判断是版式选错、必选组件缺失、可选组件滥用,还是间距/安全区问题;不要直接靠加 margin 硬救。

#### 风格 A · 电子杂志风必查

1. **大标题必须是衬线字体**——如果显示成非衬线,99% 是 Step 3.0 预检没做,`h-hero` 类在 template.html 里缺失
2. **图片网格里只用 `height:Nvh`,不用 `aspect-ratio`**(会撑破)
3. **图片不能堆到页面底部**——不要用 `align-self:end`,用 grid + `align-items:start`(见 Step 3.2)
4. **图片只能用标准比例**(16:10 / 4:3 / 3:2 / 1:1 / 16:9),不要复制原图的奇葩比例
5. **中文大标题 ≤ 5 字且 `nowrap`**(避免 1 字 1 行)
6. **用 Lucide,不用 emoji**
7. **标题用衬线,正文用非衬线,元数据用等宽**

#### 风格 B · 瑞士国际主义必查

1. **全程无衬线**——任何衬线字体出现都是错的(检查 `font-family` 没用 `--serif` 类变量)
2. **只有一个 accent 色**——一份 deck 不能同时出现 IKB 蓝 + 柠檬黄 + 安全橙等多个高亮色;例外:同页参考图里有颜色编码时,对应的自绘元素用图里的颜色(见 3.2.0)
3. **不允许渐变 / 阴影 / 圆角**——所有色块直角纯色,任何 `box-shadow` / `linear-gradient` / `border-radius` > 0 都要砍掉(rule 横线除外)
4. **极致字号对比**——主标题与正文比例 ≥ 8:1
5. **大字号必须双约束限高**——`font-size:min(Xvw, Yvh)`,只用 vw 在标准 16:9 屏会溢出(吸取 P15/P20/P22 教训)
6. **大字字重 200**(ExtraLight)——字号越大越细,瑞士风灵魂;**禁止** 600/700/800 大字
7. **卡片填充类型互斥**——`card-ink` / `card-accent` / `card-fill` / `card-outlined` 四类**不能混用**(禁止"蓝底+蓝描边"、"灰底+描边"等)
8. **多卡并列时统一样式**——3-12 张卡用同一类(优先 `card-fill` 灰底);只突出一项时单独换 `card-accent`,且**只允许一张**
9. **直角到底**——任何 `border-radius` 都不允许;装饰用 8×8 直角小方块,**不要** 9px 圆形点
10. **图标用 lucide,不自己画 SVG**——`<i data-lucide="name"></i>` + `lucide.createIcons()`,选棱角风格(避免圆胖)
11. **时间线对齐**——axis 列固定 12px + dot 绝对定位,**不要**用 grid `justify-self`(会与虚线错位)
12. **章节级标题与内容间距 ≥ 9vh**——避免拥挤(吸取 P15/P16 教训)
13. **每页一个语义化动效 recipe**——不是统一 fade-up,数字 scale 弹入、bar scaleY 拉起、SVG stroke 描线、节点序列点亮等;**禁止**所有页用同一个 generic 配方
14. **playSlide 入口 reveal 容器**——`[data-anim]` 容器先强制 opacity:1,recipe 内再用 motion `{opacity:[0,1]}` 覆盖,否则有些页会"看不见"
15. **ESC 索引页可见性**——cloned slide 必须有 CSS override 让 `[data-anim]` 在缩略图里 opacity:1
16. **Helvetica/Inter 兜底中文字体**——Windows 用户没有"苹方",必须 fallback 到 `"Microsoft YaHei UI", "Noto Sans SC"`
17. **字体粗细体例**:大字 200 / 正文 300 / `t-cat` SemiBold 600 / `t-meta` mono uppercase
18. **保留低功耗快捷键**——右下角必须提示 `B 静态`;按 `B` 切换 `body.low-power`,停止 WebGL/ASCII canvas RAF 和 Motion 入场动画
19. **装饰元素严格在 grid 内**——bars 矩阵、点阵、ring-mat 不能贴边或溢出页面
20. **底部内容预留 nav 空间**——nav 在 ~97vh,内容收尾不要过 93vh(吸取 P22 KPI 大字溢底教训)
21. **图片容器直角无阴影**——`.frame-img` 不加 `border-radius` / `box-shadow`;边界只用 hairline
22. **S15/S16/S22 图片同组一致**——同一组图片统一比例、高度、边距、线条粗细;信息图/UI 图加 `.fit-contain`
23. **组件角色要正确**——S15/S16 图片格需要 caption 信息锚点;S22 的 KPI/说明是必选;数据专用版式必须有真实数据,不能靠文案硬填
24. **通用/非通用版式要分清**——S03/S08/S11/S19 较通用;S06/S07/S20/S21/S22 是数据/案例专用;S14/S15/S17 是结构专用

### Step 5 · 本地预览

直接在浏览器打开 `index.html` 就行。macOS 下：

```bash
open "项目/XXX/ppt/index.html"
```

不需要本地服务器。图片走相对路径 `images/xxx.png`。

### Step 6 · 迭代

根据用户反馈修改——模板的 CSS 已经高度参数化，90% 的调整都是改 inline style（字号 `font-size:Xvw` / 高度 `height:Yvh` / 间距 `gap:Zvh`）。

#### 6.1 · 大厅投屏重设计(内容定稿后,页面"全是字"时)

要在教室/会场大屏放、后排看不清,或用户说"字太多、看不清、不够直观"时,先读 `references/projection-redesign.md`,按里面的方法逐页改:

- **每页一个视觉主角**:关键词抽成大字,解释交给口头
- **关系用图形表达**:删除线 = 过时,箭头 = 转变,长短条 = 差距,点阵 = 比例,台阶 = 递进,时间轴 = 先后,公式 = 组成
- **每页最多一块实心色块,只放结论**
- **入场按讲稿顺序分步出现**(公共 `.vx-play` 钩子 + `data-vx` + `--d`),B 静态 / ESC 索引直接显示终态
- **观众要读的字 ≥ 1080p 28px**(`--vx-body`),小字只给出处和标签
- **不删页、不删内容要点**;用户说过要保留的长介绍、产品清单改成标签或说明行,不砍
- 按 P0/P1/P2 分批改,每批截图验收(1920 + 1366)、断网测单文件、演讲稿补"画面"说明

#### 6.2 · 迭代纪律

- **每次修改存新版本**:用户要求不覆盖时,用 `snapshot.py` 把单文件 deck、演讲稿、规划文档、`src/` 存到 `版本/vNN/`,已存在就拒绝;规划文档写一条 `vNN` 变更记录
- **演讲稿同步**:页面上改了词、改了顺序、加了动画,演讲稿对应那句和"画面"说明一起改;删页后演讲稿页码、交叉引用、时间表全部顺移
- **相邻页一致**:同一组概念(如分层)在相邻页的排列方向保持一致
- **用户给的图优先于自绘图形**

---

## 资源文件导览

```
ekewang-ppt-skill/
├── SKILL.md                  ← 你正在读
├── assets/
│   ├── template.html         ← 风格 A · 电子杂志风模板（种子文件）
│   ├── template-swiss.html   ← 风格 B · 瑞士国际主义风模板（种子文件）
│   ├── screenshot-backgrounds/ ← 截图美化内置背景(WebP):style-a 5 套 / style-b 4 套
│   └── motion.min.js         ← Motion One 本地副本（离线兜底,约 64KB,共用）
├── scripts/
│   └── validate-swiss-deck.mjs ← 风格 B 静态校验:登记版式、图片槽位、SVG 文本、标题对齐
└── references/
    ├── components.md         ← 组件手册（字体、色、网格、图标、callout、stat、pipeline、动效... 风格 A 适用）
    ├── layouts.md            ← 风格 A · 10 种页面布局骨架（可直接粘贴,含动效标记）
    ├── swiss-layout-lock.md  ← 风格 B · 原始 22P 版式锁,正文页必须按这里登记
    ├── layouts-swiss.md      ← 风格 B · 原始 22P 骨架说明 + 少量明确标注的实验区
    ├── swiss-map-component.md ← 风格 B · S08 地图扩展组件(MapLibre 点位/连线/卡片/控制)
    ├── themes.md             ← 风格 A · 5 套主题色预设（只能选不能自定义）
    ├── themes-swiss.md       ← 风格 B · 4 套瑞士风主题色预设（IKB / 柠檬黄 / 柠檬绿 / 安全橙）
    ├── image-prompts.md      ← GPT-M 2.0 配图类型、比例和基础提示词
    ├── screenshot-framing.md ← CleanShot X 式截图适配语义 + 内置背景资产映射
    ├── projection-redesign.md ← 大厅投屏重设计:图形化表达、vx- 组件、分步动画、画面说明、版本存档
    └── checklist.md          ← 质量检查清单（P0/P1/P2/P3 分级）
```

**加载顺序建议**：
1. 先读完 `SKILL.md`(这个文件)了解整体
2. Step 1 需求澄清**第一问**先确定风格 A 还是 B,然后:
   - 风格 A:读 `themes.md` 帮用户选一套主题色
   - 风格 B:读 `themes-swiss.md` 帮用户选一套主题色
3. **动手前 Read 对应模板的 `<style>` 块**——这是类名的唯一来源,缺类会导致整页样式崩
   - 风格 A → `assets/template.html`
   - 风格 B → `assets/template-swiss.html`
4. 读对应的 layouts 文件挑布局:
   - 风格 A → `layouts.md`(顶部有 Pre-flight 类名清单、主题节奏规划、动效 recipe 决策树)
   - 风格 B → **先读 `swiss-layout-lock.md`**,再读 `layouts-swiss.md`;正文页必须从 S01-S22 选择,每页写 `data-layout`
5. 如果风格 B 需要地点、路线、人物住所或城市关系地图,读 `swiss-map-component.md`
6. 如果在 Codex 中生成配图,读 `image-prompts.md` 挑图片类型、比例和基础提示词;如果是用户原始截图,先读 `screenshot-framing.md`,优先使用 `assets/screenshot-backgrounds/` 的内置背景资产
7. 细节调整时读 `components.md` 查组件(含 Motion 动效系统章节,主要服务风格 A;风格 B 的组件细节在 `layouts-swiss.md` 附录)
8. 生成后先运行 `node scripts/validate-swiss-deck.mjs path/to/index.html`,再读 `checklist.md` 自检
9. 内容定稿后要投到大屏、页面字多看不清时,读 `projection-redesign.md`

**动效相关**:模板已把 Motion One 的加载和 recipe 逻辑内嵌到底部 module script。你不需要改 JS,只需要按 `layouts.md` / `layouts-swiss.md` 的骨架在 HTML 里加 `data-anim` / `data-animate` 即可。离线演示靠 `assets/motion.min.js`,断网时自动降级为"无动画但内容可读"。风格 B 模板必须保留 `B` 键低功耗模式:切换后停止 WebGL/ASCII canvas RAF,取消正在运行的 Web Animations,并把当前页内容直接 reveal 到静态最终态。

## 核心设计原则（哲学）

### 风格 A · 电子杂志风（5 轮迭代总结）

> 违反其中任何一条，杂志感都会垮。

1. **克制优于炫技** — WebGL 背景只在 hero 页透出，普通页几乎看不见
2. **结构优于装饰** — 不用阴影、不用浮动卡片、不用 padding box，一切信息靠**大字号 + 字体对比 + 网格留白**
3. **内容层级由字号和字体共同定义** — 最大衬线 = 主标题，中衬线 = 副标，大非衬线 = lead，小非衬线 = body，等宽 = 元数据
4. **图片是第一公民** — 图片只裁底部，保证顶部和左右完整；网格用 `height:Nvh` 固定，不要用 `aspect-ratio` 撑
5. **节奏靠 hero 页** — hero 和 non-hero 交替，才不累眼睛
6. **术语统一** — Skills 就是 Skills，不要中英混合翻译

### 风格 B · 瑞士国际主义风

> 违反其中任何一条，画面瞬间从瑞士掉到 PowerPoint。

1. **单一锚点色** — 一份 deck 只用一个 accent，不允许多色高亮拼贴
2. **极致字号对比** — 主标题与正文比例 ≥ 8:1,KPI 必须是"Data Hero"(屏幕宽度的 18-22%)
3. **无衬线只此一家** — Inter / Helvetica / Noto Sans SC,任何衬线都是错的
4. **直角纯色** — 不允许渐变 / 阴影 / 圆角(rule 横线除外)
5. **网格至上** — 所有元素吸附到 12-col grid,左对齐 + 大幅留白做非对称美学
6. **Hairline 是手术刀** — 1px 的极细分割线就够,不要加粗、不要加阴影
7. **点阵装饰只在 hero 页透出** — 正文页保持纯净底色

## 参考作品

本 skill 的两种风格分别参考了：

**风格 A · 电子杂志风**:
- ekewang "一人公司：被 AI 折叠的组织" 分享（2026-04-22，27 页）
- *Monocle* 杂志的版式
- YC 总裁 Garry Tan "Thin Harness, Fat Skills" 那篇博客的 demo

**风格 B · 瑞士国际主义风**:
- Massimo Vignelli 的 NYC Subway / Unimark 系统
- *Helvetica Forever* 的字体设计语言
- Josef Müller-Brockmann 的网格系统经典著作
- 当代设计:Acne Studios / Off-White / IKEA / Beck Design

可以把它们当做风格锚点。


## OpenPencil 集成（可选）

生成的 HTML PPT 可以通过 [OpenPencil](https://www.pencil.dev/) MCP 直接渲染为可编辑的设计文件，然后在 OpenPencil 中可视化调整并导出为 .pptx / PNG / SVG 等格式。

### 架构概览

```
AI Agent (Kiro/Claude Code/VS Code)
        ↓ MCP 协议
OpenPencil MCP Server (HTTP:7600 + WS:7601)
        ↓ WebSocket 桥接
OpenPencil 桌面端 (Tauri 应用)
        ↓
可视化编辑 → 导出
```

**关键原理**：
- `@open-pencil/mcp` 是一个 HTTP+WS 服务，监听 `127.0.0.1:7600`(HTTP) 和 `127.0.0.1:7601`(WebSocket)
- OpenPencil 桌面端启动时，**自动** spawn `openpencil-mcp-http` 进程，并通过 WS 连接到它
- AI Agent 通过 HTTP POST 到 `/mcp` 端点发送 MCP 命令
- 桌面端在文档打开状态下通过 WS 接收命令并执行

---

### 方案 A：Windows + WSL 环境（最常见）

> 适用于：在 Windows WSL 中运行 Kiro/Claude Code，OpenPencil 桌面端运行在 Windows 宿主机上。

#### Step 1：安装 OpenPencil 桌面端 (Windows)

从 https://github.com/open-pencil/open-pencil/releases/latest 下载 Windows 安装包并安装。

#### Step 2：在 Windows 端安装 MCP 包

打开 PowerShell（不是 WSL）：

```powershell
npm install -g @open-pencil/mcp
```

这会安装 `openpencil-mcp-http` 命令，OpenPencil 桌面端启动时会自动调用它。

#### Step 3：启动 OpenPencil 并新建文档

1. 打开 OpenPencil 桌面端
2. 新建一个空文档（`Ctrl+N`）— **必须有打开的文档，MCP 才能工作**
3. 等待 3-5 秒让 MCP server 自动启动

#### Step 4：验证连接

在 WSL 中执行：

```bash
powershell.exe -Command "(Invoke-WebRequest -Uri 'http://127.0.0.1:7600/health' -UseBasicParsing -TimeoutSec 5).Content"
```

**期望输出**：`{"status":"ok", "token":"<AUTH_TOKEN>", ...}`

⚠️ 如果 status 是 `"no_app"`：
- 确认 OpenPencil 里有一个**打开的文档**（不能停留在欢迎页）
- 关闭 OpenPencil 重新打开，等待自动启动 MCP

⚠️ 如果连接失败（无响应）：
- 确认已执行 `npm install -g @open-pencil/mcp`
- 关闭 OpenPencil → 重新打开 → 新建文档

#### Step 5：配置 AI Agent MCP

**问题**：WSL2 的 `localhost` 与 Windows 的 `localhost` 是隔离的，stdio MCP 从 WSL 无法通过 WS 连接 Windows 端口。

**解决方案**：通过 PowerShell 中转 HTTP 请求。

创建 PowerShell 调用脚本（一次性设置）：

```powershell
# 保存到 C:\Users\<你的用户名>\pencil-mcp.ps1
param(
    [string]$ToolName,
    [string]$ArgsFile
)

$token = $env:PENCIL_MCP_TOKEN
$url = "http://127.0.0.1:7600/mcp"
$headers = @{
    "Content-Type" = "application/json"
    "Accept" = "application/json, text/event-stream"
    "Authorization" = "Bearer $token"
}

# Check for existing session
$sessionFile = "$env:USERPROFILE\mcp-session.txt"
$existingSession = if (Test-Path $sessionFile) { Get-Content $sessionFile -Raw } else { $null }
if ($existingSession) { $headers["mcp-session-id"] = $existingSession.Trim() }

# Initialize if no session
if (-not $existingSession) {
    $initBody = '{"jsonrpc":"2.0","id":1,"method":"initialize","params":{"protocolVersion":"2024-11-05","capabilities":{},"clientInfo":{"name":"kiro","version":"1.0"}}}'
    $initResp = Invoke-WebRequest -Uri $url -Method POST -Headers $headers -Body $initBody -UseBasicParsing -TimeoutSec 10
    $sid = $initResp.Headers["mcp-session-id"]
    if ($sid) {
        $headers["mcp-session-id"] = $sid
        Set-Content -Path $sessionFile -Value $sid -NoNewline
    }
}

# Read args and call tool
$toolArgs = Get-Content -Path $ArgsFile -Raw -Encoding UTF8 | ConvertFrom-Json
$callObj = @{
    jsonrpc = "2.0"
    id = [int](Get-Random -Maximum 99999)
    method = "tools/call"
    params = @{ name = $ToolName; arguments = $toolArgs }
}
$body = $callObj | ConvertTo-Json -Depth 10 -Compress

try {
    $resp = Invoke-WebRequest -Uri $url -Method POST -Headers $headers -Body ([System.Text.Encoding]::UTF8.GetBytes($body)) -UseBasicParsing -TimeoutSec 30
    Write-Output $resp.Content
} catch {
    if (Test-Path $sessionFile) { Remove-Item $sessionFile }
    Write-Output "ERROR: $($_.Exception.Message)"
}
```

**从 WSL 调用示例**：

```bash
# 获取 token（从 health 端点）
TOKEN=$(powershell.exe -Command "(Invoke-WebRequest -Uri 'http://127.0.0.1:7600/health' -UseBasicParsing).Content" 2>/dev/null | grep -o '"token":"[^"]*"' | cut -d'"' -f4)

# 写入参数文件
cat > /mnt/c/Users/ekewang/mcp-args.json << 'EOF'
{"jsx": "<Frame name=\"My Slide\" w={1920} h={1080} bg=\"#002FA7\" flex=\"col\" p={80}><Text size={64} weight=\"200\" fill=\"#ffffff\">Hello OpenPencil</Text></Frame>", "x": 0, "y": 0}
EOF

# 调用 render
powershell.exe -ExecutionPolicy Bypass -Command "& { $env:PENCIL_MCP_TOKEN='$TOKEN'; & 'C:\Users\ekewang\pencil-mcp.ps1' -ToolName 'render' -ArgsFile 'C:\Users\ekewang\mcp-args.json' }"
```

#### 常见问题排查

| 问题 | 原因 | 解决 |
|------|------|------|
| `"status":"no_app"` | 桌面端没有打开文档 | 新建或打开一个文档 |
| `"Too many active MCP sessions"` | 超过 10 个 session 未释放 | 关闭 OpenPencil 重新打开 |
| stdio MCP 返回 "not connected" | WSL 的 127.0.0.1 不是 Windows 的 | 改用 PowerShell HTTP 方式（见上方） |
| health 端点完全无响应 | `@open-pencil/mcp` 未安装 | Windows PowerShell: `npm install -g @open-pencil/mcp` |
| 连接超时 | 企业代理拦截 | 在 WSL 中加 `--noproxy "*"` 或直接用 PowerShell 调用 |
| 中文文字乱码 | PowerShell 编码问题 | 参数文件用 UTF-8 保存，Body 用 `[System.Text.Encoding]::UTF8.GetBytes()` |
| 下拉菜单没有 "Claude Code" 选项 | 正常现象，不影响 MCP | MCP 连接不依赖 AI Chat 面板的 provider 选择 |

---

### 方案 B：macOS / Linux 原生环境

> 适用于：Agent 和 OpenPencil 桌面端在同一操作系统中运行。

```bash
# 1. 安装
brew install openpencil            # macOS 桌面端
npm install -g @open-pencil/mcp    # MCP server

# 2. 打开 OpenPencil + 新建文档

# 3. 验证
curl -s http://127.0.0.1:7600/health | jq .status  # 应该是 "ok"

# 4. 配置 Agent MCP (Kiro 示例)
# ~/.kiro/settings/mcp.json:
{
  "mcpServers": {
    "open-pencil": {
      "command": "openpencil-mcp",
      "args": ["--app", "desktop"],
      "timeout": 30000
    }
  }
}

# 或 Claude Code:
claude mcp add --scope user open-pencil -- openpencil-mcp --app desktop
```

原生环境下 stdio MCP 可以直接通过 WebSocket 连接桌面端，无需 PowerShell 中转。

---

### 方案 C：仅用 OpenPencil 网页版（无需安装）

1. 打开 https://app.openpencil.dev
2. 新建文档
3. 按 `Ctrl+J` 打开 AI Chat
4. 选择一个 AI provider（如 Anthropic/OpenAI），输入 API Key
5. 在 chat 中描述想要的设计，内置 100+ 工具直接生成

此方式无需 MCP 配置，但 AI 操作局限在 OpenPencil 内置 chat 中。

---

### MCP 渲染 PPT 内容的最佳实践

生成 HTML PPT 后，通过 MCP `render` 工具将内容渲染到 OpenPencil：

1. **每页一个 1920×1080 Frame**，横向排列（x 间距 2100px）
2. **使用 JSX 语法**描述设计：
   ```jsx
   <Frame name="Slide 01" w={1920} h={1080} bg="#002FA7" flex="col" p={80} gap={32}>
     <Text size={64} weight="200" fill="#ffffff">标题</Text>
     <Text size={18} weight="400" fill="#ffffff" opacity={0.8}>副标题</Text>
   </Frame>
   ```
3. **批量渲染时复用 session**——每次 initialize 会消耗一个 session（上限 10），用完需重启 app
4. **参数通过文件传递**——避免 shell 转义问题，将 JSX 写入 JSON 文件后引用
5. **中文内容注意编码**——确保 JSON 文件以 UTF-8 保存

### 可用 MCP 工具速查

| 工具 | 用途 |
|------|------|
| `render` | 用 JSX 创建设计节点 |
| `list_pages` | 列出文档所有页面 |
| `get_page_tree` | 获取当前页节点树 |
| `update_node` | 修改节点属性（位置、大小、透明度等） |
| `set_text` | 修改文字内容 |
| `set_fill` | 修改填充色 |
| `set_font` | 修改字体 |
| `delete_node` | 删除节点 |
| `export_image` | 导出为 PNG/JPG/WEBP |
| `export_svg` | 导出为 SVG |
| `save_file` | 保存文档到磁盘 |
| `find_nodes` | 按名称/类型搜索节点 |
| `arrange` | 自动排列节点（grid/row/column） |

### 注意事项

- WebGL 背景（流体/网格/ASCII）无法渲染到 OpenPencil，用纯色 Frame 替代
- 动画/过渡效果不会保留，为静态设计
- pencil2pptx（.pen → .pptx 转换）当前仅支持 Windows
- OpenPencil CLI 的 `import` 命令在 v0.13.2 中尚未发布，使用 MCP `render` 替代
- MCP session 上限为 10，超出后需重启 OpenPencil 桌面端
