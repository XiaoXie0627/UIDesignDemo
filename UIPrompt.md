# UIUX设计风格深度提示词指南

> 本文档包含6种精选UI设计风格的可复用提示词，可用于指导AI生成高质量的UI界面代码。

---

## 一、Dark Mode Excellence（深色模式）

### 风格特点

- 深灰而非纯黑的背景色（#121212 ~ #1a1a2e）
- 略微去饱和的强调色
- 高对比度但护眼的文本色
- 精致的阴影层次

### 可深入优化方向
1. **多主题变体**：纯黑(AMOLED)、深灰、深蓝、深紫等主题
2. **动态渐变背景**：微妙的渐变光球装饰
3. **微交互**：按钮光泽、卡片抬升、列表项滑入
4. **数据可视化**：迷你图表、环形进度、实时数据动画
5. **高级组件**：模态框、抽屉、下拉菜单、工具提示、骨架屏

### 完整提示词

```
请创建一个Dark Mode Excellence风格的管理后台界面，要求：

【色彩系统】
- 背景色：主背景 #0a0a0f，次级背景 #121218，卡片背景 #1e1e2a
- 强调色：主色 #bb86fc，辅助色 #03dac6，警告色 #cf6679
- 文本色：主文本 rgba(255,255,255,0.95)，次文本 rgba(255,255,255,0.7)，弱文本 rgba(255,255,255,0.45)
- 边框色：rgba(255,255,255,0.06) ~ rgba(255,255,255,0.15)

【视觉效果】
- 背景添加微妙的渐变光球装饰（紫色+青色），使用filter: blur(100px)
- 添加噪点纹理覆盖层，opacity: 0.02
- 卡片使用多层阴影：0 4px 12px rgba(0,0,0,0.4)
- 统计卡片包含迷你趋势折线图

【布局结构】
- 左侧固定侧边栏（280px），包含logo、导航菜单（分组）、用户卡片
- 顶部固定导航栏，包含面包屑、搜索框（支持⌘K快捷键）、通知按钮、用户头像
- 欢迎区域显示问候语和快捷操作按钮
- 统计卡片行（4列），每张卡片包含图标、数值、标签、趋势、迷你图表
- 主内容区使用2:1网格布局，包含图表卡片、数据表格、团队成员、快捷操作

【组件要求】
- 统计卡片：hover时抬升4px，阴影加深
- 数据表格：支持复选框全选、状态徽章、操作按钮
- 图表柱状图：悬停显示数值tooltip，柱子渐变色
- 团队成员：头像+在线状态指示器+状态文本
- 按钮：主要按钮使用渐变背景，次要按钮使用surface背景，支持禁用状态
- 进度条：支持success/warning/danger颜色变体
- Toast通知：从右下角滑入，支持4种类型，3秒自动消失

【动效要求】
- 统计卡片入场：依次淡入上移，间隔100ms
- 图表柱状图：从底部生长动画
- 团队成员：从左侧滑入
- 页面切换：平滑过渡

【响应式】
- 1200px以下：统计卡片2列，内容区单列
- 1024px以下：侧边栏折叠为图标模式
- 768px以下：侧边栏隐藏，顶部栏堆叠
```

---

## 二、HarmonyOS（鸿蒙风格）

### 风格特点
- 轻拟物美学：柔和渐变与适度光影
- 全场景一致性：手机/平板/车机/智慧屏统一
- 沉浸视觉保护：避免大面积高亮浅色
- 轻量交互：简化手势，降低学习成本

### 可深入优化方向
1. **全场景适配**：一套代码适配多种设备尺寸
2. **原子化服务**：可拖拽的小组件卡片
3. **手势交互**：双指捏合编辑、长按菜单
4. **多设备协同**：跨设备数据流转UI
5. **服务卡片**：不同尺寸的信息卡片（1x2, 2x2, 2x4, 4x4）

### 完整提示词

```
请创建一个HarmonyOS风格的管理界面，要求：

【色彩系统】
- 背景色：#f5f6fa（浅灰蓝）
- 卡片背景：#ffffff
- 主色：#007AFF（iOS蓝），辅助色：#5856D6（紫）
- 状态色：成功 #34C759，警告 #FF9500，危险 #FF3B30
- 文本色：主文本 #1d1d1f，次文本 #6e6e73，弱文本 #aeaeb2

【视觉效果】
- 轻拟物风格：图标使用柔和渐变背景（如 linear-gradient(135deg, #007AFF, #5856D6)）
- 圆角设计：卡片 20px，按钮 12px，图标 10px
- 阴影轻柔：0 4px 12px rgba(0,0,0,0.06)
- 统计卡片使用线性渐变图标背景

【布局结构】
- 左侧侧边栏（240px），深色背景（#1a1a2e）
- 顶部栏：页面标题+副标题、搜索框、通知按钮
- 统计卡片行（4列），包含图标、数值、标签、趋势、迷你图表
- 内容区2列布局：快捷功能、最近活动、团队成员、快速设置

【组件要求】
- 导航菜单：图标+文字，active状态使用渐变背景
- 统计卡片：图标使用渐变背景圆角方块，包含sparkline折线图
- 环形进度：使用SVG circle实现，支持渐变色
- 快捷功能：4宫格按钮，hover时背景变化+轻微上移
- 活动时间线：图标+标题+时间，不同活动类型不同图标颜色
- 团队网格：头像+姓名+状态指示器（在线/离开/离线）
- 设置项：图标+标签+开关，开关使用圆角滑块设计
- 按钮：主要按钮渐变背景，次要按钮灰色背景，文字按钮无背景

【动效要求】
- 卡片入场：依次淡入上移，cubic-bezier(0.4, 0, 0.2, 1)
- 点击反馈：scale(0.98)，150ms恢复
- 开关切换：滑块平滑移动
- Toast通知：从下方弹出，圆角卡片风格

【响应式】
- 1200px以下：统计卡片2列
- 768px以下：侧边栏隐藏，快捷功能2列
```

---

## 三、Glassmorphism（毛玻璃风格）

### 风格特点
- 半透明背景 + 背景模糊
- 微妙的玻璃边框
- 渐变色彩背景
- 层叠的玻璃卡片

### 可深入优化方向
1. **玻璃层级**：多层玻璃叠加，不同透明度
2. **色彩吸收**：玻璃根据下方内容动态调整色调
3. **动态模糊**：根据滚动距离/交互状态变化模糊度
4. **光线折射**：模拟真实玻璃的折射和反射
5. **鼠标跟踪**：光效跟随鼠标移动

### 完整提示词

```
请创建一个Glassmorphism风格的管理界面，要求：

【背景设计】
- 深色渐变背景：linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)
- 添加5个漂浮的渐变光球（使用border-radius: 50% + filter: blur(60px) + opacity: 0.6）
  - 紫色球 #667eea → #764ba2，尺寸500px，位置左上
  - 粉色球 #f093fb → #f5576c，尺寸400px，位置右中
  - 蓝色球 #4facfe → #00f2fe，尺寸350px，位置左下
  - 绿色球 #43e97b → #38f9d7，尺寸300px，位置中间
  - 橙色球 #fa709a → #fee140，尺寸250px，位置右下
- 光球添加浮动动画：20s infinite ease-in-out

【玻璃效果类】
- .glass-panel：background: rgba(255,255,255,0.15)，backdrop-filter: blur(20px)，border: 1px solid rgba(255,255,255,0.2)
- .glass-surface：background: rgba(255,255,255,0.1)，backdrop-filter: blur(10px)
- .glass-inset：background: rgba(0,0,0,0.2)，backdrop-filter: blur(10px)
- .glass-pill：圆角980px的玻璃药丸按钮

【布局结构】
- 左侧玻璃侧边栏（260px）
- 顶部玻璃导航栏
- 统计卡片行（4列），每张卡片包含玻璃图标、数值、趋势、迷你图表
- 内容区2:1布局：图表、团队、订单、快捷操作

【组件要求】
- 导航项：active状态使用渐变背景（紫→粉）
- 统计图标：52px方形，圆角14px，渐变色背景
- 图表柱状图：渐变色（紫→粉），悬停显示tooltip
- 团队成员：头像渐变色，在线状态绿色指示器
- 订单列表：玻璃卡片内嵌，状态徽章颜色区分
- 快捷操作：2x2网格，图标+文字，hover上移效果
- 按钮：主要按钮渐变背景，边框按钮透明+边框，幽灵按钮全透明

【动效要求】
- 鼠标跟踪：光球跟随鼠标移动，不同球不同速度
- 卡片入场：依次淡入上移
- 图表动画：柱子从底部生长
- Toast通知：玻璃质感，左侧彩色边框，滑入动画

【响应式】
- 1200px以下：统计卡片2列，内容单列
- 768px以下：侧边栏隐藏
```

---

## 四、Liquid Glass（苹果液态玻璃）

### 风格特点
- 苹果最新设计语言
- 实时光影响应
- 高级饱和度增强
- 精致的层级感

### 可深入优化方向
1. **实时光影**：跟随设备陀螺仪/鼠标位置变化
2. **镜头光晕**：模拟相机镜头的光晕效果
3. **HDR效果**：高动态范围的色彩表现
4. **液体流动**：背景液体流动动画
5. **层级折射**：多层玻璃之间的折射效果

### 完整提示词

```
请创建一个Liquid Glass风格的管理界面，要求：

【背景设计】
- 浅色渐变背景：linear-gradient(135deg, #f5f5f7 0%, #e8e8ed 100%)
- 添加3个光晕效果（使用filter: blur(100px) + opacity: 0.5）
  - 蓝色光晕 rgba(0,122,255,0.3)，600px，右上
  - 紫色光晕 rgba(88,86,214,0.25)，500px，左下
  - 绿色光晕 rgba(52,199,89,0.2)，400px，中间
- 光晕添加浮动动画：20s infinite ease-in-out

【液态玻璃效果类】
- .liquid-panel：
  - background: rgba(255,255,255,0.72)
  - backdrop-filter: blur(40px) saturate(180%)
  - border: 1px solid rgba(255,255,255,0.18)
  - box-shadow: 0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)
  - 添加顶部反射线：::before 伪元素，1px渐变线
- .liquid-surface：半透明表面，带轻微阴影
- .liquid-inset：内凹效果，inset阴影

【布局结构】
- 左侧液态玻璃侧边栏（260px）
- 顶部液态玻璃导航栏
- 统计卡片行（4列），hover时抬升+阴影加深
- 内容区2:1布局

【色彩系统】
- 主色：#007AFF
- 辅助色：#5856D6
- 成功：#34C759
- 警告：#FF9500
- 危险：#FF3B30
- 文本：#1d1d1f 主色，#6e6e73 次色，#aeaeb2 弱色

【组件要求】
- 统计卡片：hover效果 translateY(-4px) scale(1.01)，阴影加深
- 图表柱状图：渐变色（蓝→紫），hover时亮度提升+阴影
- 团队成员：头像圆形，在线状态边框2px白色
- 快捷操作：2x2网格，hover时背景变蓝+上移
- 按钮：主要按钮蓝色实色+阴影，次要按钮液态玻璃背景
- 搜索框：液态玻璃背景，focus时边框变蓝

【动效要求】
- 光晕跟踪：跟随鼠标移动，不同光晕不同速度
- 卡片入场：cubic-bezier(0.25, 0.46, 0.45, 0.94) 缓动
- 柱状图：从底部生长，带弹性效果
- Toast通知：液态玻璃质感，左侧彩色边框

【响应式】
- 1200px以下：统计卡片2列
- 768px以下：侧边栏隐藏，顶部栏堆叠
```

---

## 五、小米澎湃OS风格

### 风格特点
- 液态玻璃视觉
- 生命感动效
- 控制中心设计
- 柔性框架适配

### 可深入优化方向
1. **控制中心**：更多快捷控制、滑动条、组合开关
2. **生命感动效**：更流畅的过渡、弹性动画
3. **AI动态壁纸**：根据时间/天气变化的背景
4. **全场景适配**：手机/平板/车机/智能家居
5. **设备互联**：多设备状态展示、数据流转

### 完整提示词

```
请创建一个小米澎湃OS风格的管理界面，要求：

【背景设计】
- 深色背景：#0d1117
- 添加3个波浪效果（filter: blur(80px) + opacity: 0.3）
  - 橙色波浪 rgba(255,106,0,0.4)，500px，右上
  - 蓝色波浪 rgba(88,166,255,0.3)，400px，左下
  - 绿色波浪 rgba(74,222,128,0.25)，350px，中间
- 波浪添加浮动动画：25s infinite ease-in-out

【玻璃效果类】
- .glass：background: rgba(255,255,255,0.06)，backdrop-filter: blur(20px)，border: 1px solid rgba(255,255,255,0.08)
- .glass-inset：background: rgba(0,0,0,0.2)，backdrop-filter: blur(10px)
- .glass-btn：background: rgba(255,255,255,0.08)，backdrop-filter: blur(10px)

【色彩系统】
- 主色：#ff6a00（小米橙），辅助色：#ff9500
- 蓝色：#58a6ff
- 成功：#4ade80
- 警告：#fbbf24
- 危险：#f87171
- 文本：白色主色，rgba(255,255,255,0.7)次色，rgba(255,255,255,0.4)弱色

【布局结构】
- 左侧玻璃侧边栏（240px）
- 顶部玻璃导航栏
- 控制中心卡片（6按钮网格：WiFi/蓝牙/静音/旋转/护眼/飞行）
- 统计卡片行（4列），包含趋势折线图
- 内容区2列：快捷功能、最近活动、团队成员、设置

【组件要求】
- 控制中心按钮：
  - 6个按钮，3x2网格
  - 默认状态：玻璃背景，图标+文字
  - 激活状态：橙色渐变背景（#ff6a00 → #ff9500）
  - 点击切换激活状态
- 统计卡片：玻璃背景，图标渐变色，趋势标签（绿色上升/红色下降）
- 团队网格：4列，头像+姓名，状态指示器
- 快捷功能：4列网格，橙色渐变图标背景
- 设置项：玻璃卡片内嵌，开关使用橙色激活色
- 按钮：主要按钮橙色渐变，次要按钮玻璃背景，边框按钮透明+边框

【动效要求】
- 波浪跟踪：跟随鼠标移动
- 控制按钮：点击时scale(0.95)，150ms恢复
- 卡片入场：依次淡入上移
- Toast通知：玻璃质感，左侧彩色边框

【响应式】
- 1200px以下：统计卡片2列，控制中心3列
- 768px以下：侧边栏隐藏，控制中心2列
```

---

## 通用提示词模板

### 快速生成模板

```
请创建一个[风格名称]风格的[界面类型]，要求：

【色彩】[主色]、[辅助色]、[背景色]、[文本色]

【视觉效果】
- [效果1]
- [效果2]

【布局】
- [布局结构描述]

【组件】
- [组件1]: [样式要求]
- [组件2]: [样式要求]

【动效】
- [动效1]
- [动效2]

【响应式】
- [断点1]: [适配方案]
- [断点2]: [适配方案]
```

### 组件扩展提示词

```
请为上述界面添加以下组件：

1. 模态框（Modal）
- [样式要求]
- [动画效果]

2. 下拉菜单（Dropdown）
- [样式要求]
- [动画效果]

3. 工具提示（Tooltip）
- [样式要求]
- [触发方式]

4. 骨架屏（Skeleton）
- [样式要求]
- [加载动画]

5. 无限滚动列表
- [样式要求]
- [加载状态]
```

### 主题切换提示词

```
请为上述界面添加主题切换功能：

1. 浅色主题
- 背景色: [色值]
- 文本色: [色值]

2. 深色主题
- 背景色: [色值]
- 文本色: [色值]

3. 跟随系统
- 使用 prefers-color-scheme 媒体查询

要求：
- 使用CSS变量实现
- 切换时平滑过渡
- 保存用户选择到localStorage
```

---

## 最佳实践建议

### 1. 色彩使用
- 主色用于重要操作和强调
- 辅助色用于次要信息
- 状态色用于反馈（成功/警告/错误/信息）
- 背景色使用相近色阶，避免强烈对比

### 2. 间距系统
- 使用8px基础单位
- 组件内边距：12px、16px、20px、24px
- 组件间距：8px、12px、16px、20px、24px

### 3. 圆角系统
- 小圆角：8px（按钮、输入框）
- 中圆角：12px-14px（卡片、图标）
- 大圆角：16px-20px（容器、侧边栏）
- 超大圆角：24px（模态框、浮层）
- 胶囊：9999px（徽章、标签）

### 4. 阴影系统
- 轻阴影：0 1px 3px rgba(0,0,0,0.1)
- 中阴影：0 4px 12px rgba(0,0,0,0.15)
- 重阴影：0 8px 24px rgba(0,0,0,0.2)
- 超重阴影：0 16px 48px rgba(0,0,0,0.25)

### 5. 动效原则
- 进入动画：300-500ms，ease-out
- 退出动画：200-300ms，ease-in
- 交互反馈：150-200ms，ease
- 使用 cubic-bezier(0.4, 0, 0.2, 1) 作为默认缓动

### 6. 响应式断点
- 移动端：< 768px
- 平板：768px - 1024px
- 桌面：1024px - 1440px
- 大屏：> 1440px

---

## 文件命名规范

```
[风格名称]/
├── index.html      # 主页面
├── styles.css      # 样式文件
├── script.js       # 交互脚本
└── assets/         # 资源文件夹（可选）
    ├── icons/      # 图标
    ├── images/     # 图片
    └── fonts/      # 字体
```

---

## 六、Google Design（Material Design 3）

### 风格特点
- **动态色彩系统**：基于主色自动生成Primary/Secondary/Tertiary/Error完整色彩
- **圆润设计语言**：大圆角（28px按钮、16px卡片、12px输入框）
- **Surface层级系统**：5级表面（Surface 0-4），通过叠加色创建深度
- **丰富组件库**：Filled/Tonal/Outlined/Elevated 4种按钮变体
- **排版系统**：Display/Headline/Title/Body/Label 5级字体层次
- **动效系统**：标准/加速/减速 3种缓动曲线

### 可深入优化方向
1. **动态颜色生成**：基于用户主色自动生成完整色彩方案
2. **主题切换**：浅色/深色/跟随系统三种模式
3. **Material You**：个性化颜色提取和应用
4. **组件扩展**：Bottom Sheet、Dialog、Navigation Bar等
5. **动效增强**：Shared Element Transitions、Container Transform

### 完整提示词

```
请创建一个Google Material Design 3风格的管理界面，要求：

【色彩系统 - Material You】
- Primary: #6750A4（紫色）
- On-Primary: #FFFFFF
- Primary-Container: #EADDFF
- Secondary: #625B71
- Secondary-Container: #E8DEF8
- Tertiary: #7D5260
- Tertiary-Container: #FFD8E4
- Error: #B3261E
- Error-Container: #F9DEDC
- Surface: #FFFBFE
- Surface-Variant: #E7E0EC
- On-Surface: #1C1B1F
- On-Surface-Variant: #49454F
- Outline: #79747E

【圆角系统】
- 按钮：28px (border-radius-full)
- 卡片：16px (border-radius-lg)
- 输入框：12px顶部圆角 (border-radius-xs顶部)
- 图标按钮：50% (完全圆形)
- FAB：16px (border-radius-lg) 或 28px (border-radius-xl) 扩展型

【阴影系统 - Elevation】
- Elevation 1: 0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)
- Elevation 2: 0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)
- Elevation 3: 0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)
- 卡片hover时阴影从Elevation 1升至Elevation 2

【布局结构】
- 左侧导航抽屉（280px），包含logo、分组导航菜单、用户卡片
- 顶部应用栏（64px），包含菜单按钮、页面标题、搜索栏、通知、主题切换、用户头像
- 欢迎卡片：渐变背景，显示问候语和快捷操作按钮
- 统计卡片行（4列）：图标、数值、标签、趋势标签、迷你图表
- 主内容区2:1网格：数据表格、图表、团队成员、快捷操作、表单

【组件系统】
1. 按钮（Button）：
   - Filled Button：Primary背景，白色文字
   - Tonal Button：Secondary-Container背景
   - Outlined Button：透明背景，Outline边框
   - Text Button：无背景无边框
   - Elevated Button：Surface背景，阴影
   - 禁用状态：12%透明度

2. FAB（浮动操作按钮）：
   - 56px圆形，Primary-Container背景
   - Extended FAB：自适应宽度，28px圆角

3. Chip（徽章）：
   - 成功：绿色背景
   - 警告：橙色背景
   - 错误：Error-Container背景
   - Tonal：Secondary-Container背景
   - Outlined：透明背景+边框

4. 复选框（Checkbox）：
   - 18px方形，2px边框
   - 选中状态：Primary背景+白色勾号

5. 单选按钮（Radio）：
   - 20px圆形，2px边框
   - 选中状态：Primary边框+Primary圆点

6. 开关（Switch）：
   - 52x32px轨道，16px圆角
   - 选中状态：Primary轨道+白色滑块

7. 输入框（TextField）：
   - Filled：底部边框，背景色
   - Outlined：四周边框，透明背景
   - 聚焦时边框变Primary色

8. 表格（Table）：
   - 表头背景：Surface-Container
   - 行hover：Surface-Container背景
   - 支持复选框选择

9. Snackbar：
   - Inverse-Surface背景
   - 底部居中，圆角4px
   - 支持操作按钮

【排版系统】
- Display Small: 36px, 400 weight, 44px line-height
- Headline Medium: 28px, 400 weight, 36px line-height
- Title Large: 22px, 500 weight, 28px line-height
- Title Small: 14px, 500 weight, 20px line-height
- Body Large: 16px, 400 weight, 24px line-height
- Body Medium: 14px, 400 weight, 20px line-height
- Body Small: 12px, 400 weight, 16px line-height
- Label Large: 14px, 500 weight, 20px line-height
- Label Medium: 12px, 500 weight, 16px line-height
- Label Small: 11px, 500 weight, 16px line-height

【动效系统】
- 标准缓动：cubic-bezier(0.2, 0, 0, 1)
- 强调缓动：cubic-bezier(0.2, 0, 0, 1)
- 强调减速：cubic-bezier(0.05, 0.7, 0.1, 1)
- 强调加速：cubic-bezier(0.3, 0, 0.8, 0.15)
- 短时长：200ms
- 中时长：400ms
- 长时长：600ms

【交互要求】
- 按钮点击：涟漪效果（ripple animation）
- 卡片hover：阴影加深
- 表格行hover：背景色变化
- 图表柱状图：悬停显示tooltip
- Snackbar：3秒自动消失，可手动关闭
- 统计卡片入场：依次淡入上移，间隔100ms

【响应式】
- 1200px以下：统计卡片2列，内容单列
- 1024px以下：导航抽屉折叠为图标模式（80px）
- 768px以下：导航抽屉隐藏，顶部栏堆叠
```

### Material Design 3 色彩工具推荐
- **Material Theme Builder**: https://m3.material.io/theme-builder
- **Material Symbols**: https://fonts.google.com/icons
- **Material Design 3 官方文档**: https://m3.material.io

### 组件清单
| 组件 | 变体 | 说明 |
|------|------|------|
| Button | Filled/Tonal/Outlined/Text/Elevated | 5种按钮变体 |
| FAB | Primary/Secondary/Tertiary/Extended | 浮动操作按钮 |
| Card | Elevated/Filled/Outlined | 3种卡片变体 |
| Chip | Assist/Filter/Input/Suggestion | 4种芯片类型 |
| TextField | Filled/Outlined | 2种输入框 |
| Checkbox | - | 复选框 |
| Radio | - | 单选按钮 |
| Switch | - | 开关 |
| Snackbar | - | 消息提示 |
| Dialog | - | 对话框 |
| Bottom Sheet | - | 底部抽屉 |
| Navigation | Drawer/Rail/Bar | 3种导航 |

---

*最后更新：2026年3月23日*
