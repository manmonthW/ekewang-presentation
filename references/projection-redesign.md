# 大厅投屏重设计 · 文字页改成"一眼看懂"的方法

> 来源:2026-10 一场 44 页、百人阶梯教室的讲座 deck(风格 B · IKB),从 v24 到 v30 共改了 25 页。
> 适用:deck 内容已定、要在大厅/教室投屏,后排观众看不清、页面"全是字"的时候。两种风格都能用,示例代码按风格 B 写。

## 1. 先判断哪页要改

逐页过一遍,满足任一条就列入重设计清单:

- 观众要读的字小于 1080p 下 28px(约 2.6vh),只能靠讲者念
- 一页里有三段以上并列的说明文字,没有一个视觉主角
- 页面在讲"变化 / 差距 / 比例 / 顺序 / 组成",却只用文字讲
- 结论藏在正文里,没有单独露出来

按收益排成三批:**P0** 每部分最关键的论据页和信息最挤的页 → **P1** 有图形化潜力的列表页 → **P2** 只需放大关键句的页。每批做完就验收、存档,不一次改完再看。

## 2. 五条原则

1. **每页一个视觉主角。** 关键词抽成大字,解释交给口头(写进演讲稿)。
2. **关系用图形表达,不用句子:**

   | 内容在说 | 用这个图形 |
   |---|---|
   | 过时 / 被推翻 / 贬值 | 删除线(`.vx-strike`,动画里"划掉") |
   | 从 A 变成 B | 上下或左右对照 + 箭头 `→` / `↓` |
   | 理论与实际的差距 | 两根长短条,空白处写差距含义 |
   | 比例(5%、1/5) | 10×10 点阵或 5 个方块,亮/划掉其中几个 |
   | 能力逐级递进 | 台阶(高度递增的列) |
   | 时间先后 | 横向时间轴,重点节点用 accent |
   | 几项组成一个整体 | 公式图 `A + B + C + D` |
   | 一环扣一环 | 箭头链 |
   | 一句完整的话里的几个要素 | 逐段下划线 + 上标编号,和要素同步亮起 |
   | 增长 / 下降 | 大数字旁配 2-3 根微型柱 |

3. **每页最多一块实心色块,只放结论。** 色块里的话就是这页要观众带走的那句。
4. **入场动画按讲稿顺序分步出现。** 先出旧的/问题,再划掉/给证据,最后推入结论色块;全程 3-4 秒。B 低功耗模式和 ESC 索引直接显示终态。
5. **字号有底线:** 观众要读的字 ≥ `--vx-body`(1080p 约 30px);小字只留给出处、标签、英文原文。

**不删页、不删内容要点。** 用户说过不删的内容(长介绍、产品清单)保留,改成标签或缩小成说明行,而不是砍掉。删页必须用户点头。

## 3. 公共组件(写一次,所有页共用)

### 3.1 播放钩子:给当前页加 `.vx-play`

模板的翻页 JS 会异步挂 `window.__playSlide`。在第一页 `<section>` 之前放一段脚本,用 `Object.defineProperty` 包一层,不改模板 JS:

```html
<script>
/* 每次播放给当前页加 .vx-play 重放 CSS 动画;B 静态模式下不加,直接显示终态 */
(function(){var f;Object.defineProperty(window,'__playSlide',{configurable:true,get:function(){return f&&w;},set:function(v){f=v;}});
function w(i){f(i);var all=document.querySelectorAll('#deck > section.slide');all.forEach(function(s){s.classList.remove('vx-play');});if(window.__lowPowerMode)return;var s=all[i];if(!s)return;void s.offsetWidth;s.classList.add('vx-play');}})();
</script>
```

动画只写在 `.vx-play` 下,所以**不加类 = 终态**:B 静态、ESC 缩略图、打印都自动正确,不用另写覆盖。`void s.offsetWidth` 强制回流,翻回同一页时动画能重放。

重设计页的 `<section>` 写 `data-animate="vx"`(模板不认识的 recipe 会退化为淡入 `[data-anim]` 标题,正好)。

### 3.2 字号令牌与组件 CSS

```css
:root{--vx-body:max(19px,min(1.55vw,2.75vh));--vx-key:min(2.6vw,4.6vh);--vx-big:min(3.4vw,6vh);--vx-num:min(7.2vw,12.8vh)}
.vx-body{font-family:var(--sans),var(--sans-zh);font-size:var(--vx-body);line-height:1.45;font-weight:400;text-wrap:pretty}
.vx-key{font-family:var(--sans),var(--sans-zh);font-size:var(--vx-key);font-weight:300;line-height:1.18;letter-spacing:-.02em;text-wrap:pretty}
.vx-big{font-family:var(--sans),var(--sans-zh);font-size:var(--vx-big);font-weight:300;line-height:1.1;letter-spacing:-.03em}
.vx-num{font-family:var(--sans);font-weight:200;font-size:var(--vx-num);line-height:.9;letter-spacing:-.045em;font-feature-settings:"tnum"}
.vx-num small{font-family:var(--sans),var(--sans-zh);font-size:.3em;font-weight:400;letter-spacing:0;margin-left:.15em}
.vx-tag{font-family:var(--mono);font-size:max(14px,.85vw);font-weight:600;letter-spacing:.08em;text-transform:uppercase}
.vx-dim{color:var(--text-helper)}  .vx-soft{color:var(--text-secondary)}  .vx-acc{color:var(--accent)}
.slide.dark .vx-dim{color:rgba(255,255,255,.42)} .slide.dark .vx-soft{color:rgba(255,255,255,.72)} .slide.dark .vx-acc{color:var(--accent-bright)}
.vx-verdict{background:var(--accent);color:var(--accent-on);padding:2.8vh 2vw}
.vx-strike{position:relative;display:inline-block}
.vx-strike::after{content:"";position:absolute;left:-.06em;right:-.06em;top:54%;height:max(2px,.07em);background:currentColor;transform-origin:left center}
.vx-chip{display:inline-block;font-family:var(--sans),var(--sans-zh);font-size:max(16px,1vw);font-weight:500;padding:.5vh .7vw;border:1px solid currentColor;line-height:1.3;white-space:nowrap}
```

四档字号的分工:`--vx-num` 主角数字,`--vx-big` 结论色块里的话,`--vx-key` 关键词/大字答案,`--vx-body` 观众要读的说明。比 `--vx-body` 小的只能是 `.vx-tag`、出处和英文原文。

### 3.3 分步入场:`data-vx` + `--d`

```css
@keyframes vx-fade{from{opacity:0}}
@keyframes vx-rise{from{opacity:0;transform:translateY(2.4vh)}}
@keyframes vx-drop{from{opacity:0;transform:translateY(-1.4vh)}}
@keyframes vx-slide{from{opacity:0;transform:translateX(3vw)}}
@keyframes vx-pop{from{opacity:0;transform:scale(.4)}}
@keyframes vx-sx{from{transform:scaleX(0)}}
@keyframes vx-sy{from{transform:scaleY(0)}}
.vx-play [data-vx]{animation-duration:.6s;animation-timing-function:cubic-bezier(.16,1,.3,1);animation-fill-mode:both;animation-delay:var(--d,0s)}
.vx-play [data-vx=fade]{animation-name:vx-fade;animation-timing-function:ease-out}
.vx-play [data-vx=rise]{animation-name:vx-rise}
.vx-play [data-vx=drop]{animation-name:vx-drop}
.vx-play [data-vx=slide]{animation-name:vx-slide;animation-duration:.7s}
.vx-play [data-vx=pop]{animation-name:vx-pop;animation-duration:.4s}
.vx-play [data-vx=grow-x]{animation-name:vx-sx;animation-duration:1s;transform-origin:left center}
.vx-play [data-vx=grow-y]{animation-name:vx-sy;animation-duration:.8s;transform-origin:center bottom}
.vx-play [data-vx=strike]::after{animation:vx-sx .45s cubic-bezier(.6,0,.2,1) var(--d,0s) both}
```

用法:`<span class="vx-key vx-strike" data-vx="strike" style="--d:1.4s">记忆知识</span>`。

| 动作 | data-vx |
|---|---|
| 旧内容出现 | `fade` |
| 划掉 | `strike`(元素需带 `.vx-strike`) |
| 箭头落下 | `drop` |
| 新内容 / 台阶 / 卡片升起 | `rise` |
| 结论色块推入 | `slide`(放在最后) |
| 点阵、方块逐个出现 | `pop` |
| 对比条长出 | `grow-x`;柱子长出 `grow-y` |

### 3.4 示例:"贬值 → 升值"对照

```html
<div class="vx-row"><!-- 三列 grid -->
  <span class="vx-key vx-dim vx-strike" data-vx="strike" style="--d:1.4s">记忆知识</span> …
</div>
<div class="vx-row"><span class="vx-acc" data-vx="drop" style="--d:2.1s">↓</span> …</div>
<div class="vx-row"><span class="vx-key" data-vx="rise" style="--d:2.6s">提出问题</span> …</div>
<div class="vx-verdict" data-vx="slide" style="--d:3.3s"><div class="vx-big">专业是根，AI 是翼。</div></div>
```

页面专属的样式用 `vxNN-` 前缀(NN = 页号),放在公共组件后面,不污染模板类。

## 4. 排版细节

- **防孤字:** 所有 vx 文字带 `text-wrap:pretty`;标题折行先改短,不要靠缩字号。
- **图文等高:** 左图右文时,右栏用 `display:flex;flex-direction:column;justify-content:space-between` 并和图同高——顶部放引语(上方一条 accent 线),中间放解释,底部放出处,不要留一块空白。
- **相邻页顺序一致:** 上一页的分层图是自上而下(应用层在上),下一页讲同一组层级时也自上而下排,观众不用重新对应。
- **自绘元素和配图同色:** 图里用颜色区分含义(如蓝 = 理论、红 = 实际)时,旁边的对比条、大数字也用图里的颜色,第一次做就取色对上;不要先用 accent 再等用户指出(来源:一次 deck 的第 20 页,94% / 33% 两根条原为白色和 IKB 蓝,和右侧红蓝雷达图对不上)。
- **用户给的图优先:** 用户提供的架构图/照片比自绘图形更准,直接换上,只保留右栏引语。
- **台阶/列高度自适应:** 内容多的页(如产品清单)台阶高度用剩余空间算,不写死 vh,避免压到分页条。
- **改词同步:** 页面上的标签改了(如"进医学"→"进行业"),演讲稿里对应那句一起改。

## 5. 演讲稿同步:每页写"画面"说明

重设计后画面会"自己动",讲者必须知道顺序。每改一页,在演讲稿该页下面加一段:

```
**画面：** 翻到本页后，右侧约 4 秒内依次出现：三项旧能力被划掉 → 箭头落下 → 三项新能力升起 → 蓝色结论块推入。可以等结论块出来再开口，也可以边讲边让它走完。
```

写清:出现顺序、大约用时、讲到哪句时结论块正好出来。

## 6. 版本存档:每次修改存新版本,不覆盖

用户要求"每次修改都存成新版本文件"时,在项目里放一个 `snapshot.py`:把当前单文件 deck、演讲稿、规划文档和 `src/` 复制到 `版本/vNN/`,目录已存在就拒绝。每改一轮:

1. 改源文件 → 构建 → 校验 → 截图验收
2. 打包单文件
3. 规划文档加一条 `## vNN(日期)· 改了什么`,演讲稿同步
4. `python3 src/snapshot.py vNN`

## 7. 验收(每批都做)

- 1920×1080 和 1366×768 各截一遍改过的页,等动画走完(约 4-5 秒)再截
- 观众要读的字 ≥ 28px(1080p);无溢出;最低处不进底部分页区
- 按 B:当前页直接显示终态,没有半透明、没有没划上的删除线
- 按 ESC:索引缩略图都是终态
- 打包后的单文件断网打开,重设计页动画正常、图片在
- `validate-swiss-deck.mjs` 通过
- 演讲稿每个改过的页都有"画面"说明
