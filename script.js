(() => {
  const root = document.documentElement;
  const header = document.querySelector('.site-header');
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.site-nav');
  const navLinks = Array.from(document.querySelectorAll('.nav-link'));
  const languageToggle = document.querySelector('.lang-toggle');
  const languageToggleText = document.querySelector('.lang-toggle-text');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');
  const yearEl = document.querySelector('#year');
  const copyButtons = Array.from(document.querySelectorAll('.copy-btn'));
  const copyToast = document.querySelector('#copy-toast');
  const heroNameEl = document.querySelector('#hero-name');
  const heroSloganEl = document.querySelector('#hero-slogan');
  const musicBanner = document.querySelector('[data-music-banner]');
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const metaRefs = {
    description: document.querySelector('meta[name="description"]'),
    keywords: document.querySelector('meta[name="keywords"]'),
    ogTitle: document.querySelector('meta[property="og:title"]'),
    ogDescription: document.querySelector('meta[property="og:description"]'),
    ogLocale: document.querySelector('meta[property="og:locale"]'),
    ogSiteName: document.querySelector('meta[property="og:site_name"]'),
    twitterTitle: document.querySelector('meta[name="twitter:title"]'),
    twitterDescription: document.querySelector('meta[name="twitter:description"]')
  };

  const themeColors = {
    dark: '#070707',
    light: '#FBF9F5'
  };

  const i18n = {
    zh: {
      meta: {
        lang: 'zh-CN',
        title: '李语涵 | 产品经理个人展示',
        description: '李语涵产品经理求职个人展示页，聚焦AI产品实习经验、数据驱动成果、产品思维与跨团队协作能力。',
        keywords: '产品经理,AI产品经理,求职,个人主页,简历,李语涵,产品设计,数据驱动',
        ogTitle: '李语涵 | 产品经理个人展示',
        ogDescription: '聚焦AI产品实践、业务增长成果与产品方法论的专业个人展示。',
        ogLocale: 'zh_CN',
        ogSiteName: '李语涵个人展示',
        twitterTitle: '李语涵 | 产品经理个人展示',
        twitterDescription: '产品经理求职主页：核心优势、项目成果、工作经历与联系方式。'
      },
      copySuccess: '已复制',
      copyFail: '复制失败',
      theme: {
        switchToLight: '切换到亮色模式',
        switchToDark: '切换到暗色模式',
        toggleTitle: '切换明暗主题'
      },
      language: {
        switchToEnglish: '切换到英文版',
        switchToChinese: '切换到中文版',
        buttonZh: '中',
        buttonEn: 'EN',
        toggleTitleZh: '切换到中文',
        toggleTitleEn: 'Switch to English'
      },
      menu: {
        open: '打开菜单',
        close: '关闭菜单'
      },
      brand: {
        ariaLabel: '回到首页',
        name: '李语涵',
        role: '产品经理'
      },
      skip: {
        link: '跳转到主要内容'
      },
      nav: {
        ariaLabel: '主导航',
        home: 'Home',
        about: 'About Me',
        experience: 'Experience',
        highlights: 'Highlights',
        skills: 'Skills',
        contact: 'Contact'
      },
      hero: {
        eyebrow: 'AI PRODUCT MANAGER',
        name: '李语涵',
        slogan: '用产品逻辑连接用户价值与业务增长',
        ctaPrimary: '查看项目经历',
        ctaSecondary: '联系我',
        quote: '从 0 到 1 搭建产品，<br />用数据驱动持续迭代。',
        kpi1Label: '资源包购买转化',
        kpi2Label: '国际业务日活用户',
        kpi3Label: '平台月注册量',
        scroll: '向下滚动'
      },
      about: {
        tag: 'About Me',
        title: '关于我',
        summary: '北京交通大学硕士在读，聚焦 AI 与平台型产品方向。擅长以用户洞察定义需求，以指标体系验证效果，在跨团队协同中推动方案从策略到落地。',
        education: {
          title: '教育背景',
          item1: '北京交通大学 信息与通信工程 硕士<br />（2024.09 - 2027.06）',
          item2: '北京交通大学 通信工程 本科<br />（2020.09 - 2024.06）'
        },
        strengths: {
          title: '产品优势',
          item1: '产品规划：可独立完成从定位、竞品分析到PRD输出',
          item2: '数据驱动：围绕转化、活跃、效率构建指标闭环',
          item3: '协作推动：兼顾研发、算法、运营与业务目标对齐'
        },
        honors: {
          title: '荣誉与竞赛',
          item1: '国家奖学金 / “钟茂钧”专项奖学金',
          item2: '“挑战杯”一等奖 / “互联网+”二等奖',
          item3: '第九届网络技术挑战赛全国一等奖',
          item4: '三好学生 / 优秀团员'
        }
      },
      honors: {
        heading: '荣誉影像',
        description: '点击左右按钮切换，点击当前主卡可放大查看。',
        stage: '荣誉轮播，支持左右方向键切换',
        prev: '查看上一张',
        next: '查看下一张',
        closePreview: '关闭荣誉预览',
        dialog: '荣誉证书预览',
        close: '关闭预览',
        cardAria: '查看荣誉：{title}'
      },
      experience: {
        tag: 'Experience',
        title: '实习经历',
        summary: '以结果为导向的产品实践，从策略设计到上线验证均有完整经验。',
        kimi: {
          company: '北京月之暗面科技有限公司',
          link: '访问 Kimi 开放平台官网',
          meta: 'API Team | 产品实习生 | 2026.01 - 2026.04',
          item1: '参与 Kimi 企业版产品设计，规划“数据不进训练、后端标识隔离”的核心合规逻辑，串联企业认证、批量下单、坐席分配及成员管理闭环。',
          item2: '搭建 Kimi 开放平台充值、账单、支付状态等核心模块埋点体系，定义关键事件并构建转化漏斗，定位支付前后流失节点并推动体验优化。',
          item3: '完成主流竞品商业化模式调研，分别设计 B 端渠道追踪与返点结算体系、C 端双向代金券裂变规则，推动平台月注册量环比增长约 35%。',
          item4: '通过 Dify 搭建 AI 客服 bot，完成 LLM、知识检索和问题分类模块配置，减少人工转接频次并提升客服自动化能力。'
        },
        zhipu: {
          company: '北京智谱华章科技股份有限公司',
          link: '访问北京智谱华章科技股份有限公司官网',
          meta: 'MaaS 平台部 | 产品实习生 | 2025.06 - 2025.10',
          item1: '参与 MCP 生态平台从 0 到 1 建设，明确“一站式调用、端内闭环”定位并推动规划排期。',
          item2: '主导 BigModel 多核心板块改版，推动资源包转化率从 3% 提升至 5.2%。',
          item3: '参与双品牌国际业务策略落地，支撑 Z.ai API 平台日活跃用户增长至 1w+。',
          item4: '主导跨平台合作引流，推动来自 Cherry Studio 的模型日 token 消耗约 3.5 亿。',
          item5: '制定知识库召回评测规则并实现人评机评皮尔逊相关系数 0.899。'
        },
        baidu: {
          company: '百度时代网络技术（北京）有限公司',
          link: '访问百度千帆平台官网',
          meta: 'AI 业务质量效能组 | 测试开发实习生 | 2024.09 - 2024.12',
          item1: '主导文心一言质量保障，设计防御性与性能指标体系并参与需求评审。',
          item2: '建立头部 AI 产品功能对比矩阵，提炼多轮对话与复杂推理优化建议。',
          item3: '重构 Markdown 检测与错误率逻辑，使检测准确率提升 20%。',
          item4: '协同算法与运营团队优化版本管理和用例策略，推动四则运算准确率提升 18%。'
        },
        baic: {
          company: '北京汽车股份有限公司',
          link: '访问北京汽车股份有限公司官网',
          meta: '信息技术部 | 产品项目管理实习生 | 2024.07 - 2024.09',
          item1: '主导工单系统优化需求分析，输出多方案对比并落地“服务台+多维表格”。',
          item2: '独立完成工单系统 0 到 1 搭建，推动试点上线后满意度达到 95%。',
          item3: '构建自动化数据看板与可视化指标体系，推动工单处理效率提升 30%。'
        }
      },
      highlights: {
        tag: 'Highlights',
        title: '成果数据与案例亮点',
        summary: '通过关键指标可视化，直观展示产品决策带来的业务价值。',
        metric1: {
          label: '资源包购买转化率',
          note: '从 3.0% 提升至 5.2%'
        },
        metric2: {
          label: '控制台点击 PV',
          note: '改版后提升 15%'
        },
        metric3: {
          label: '国际平台日活用户',
          note: '9 月底突破万级'
        },
        metric4: {
          label: '平台月注册量增长',
          note: '裂变活动后环比增长 35%'
        },
        chart: {
          title: '核心能力雷达（能力成熟度）',
          note: '基于实习项目产出与指标结果的综合评估（满分 100）',
          ariaLabel: '产品能力评估条形图',
          item1: '需求洞察',
          item2: '产品规划',
          item3: '数据分析',
          item4: '跨团队协同',
          item5: '落地推进'
        }
      },
      skills: {
        tag: 'Skills',
        title: '专业技能',
        summary: '覆盖产品设计、AI工具链、数据分析与开发协作能力。',
        group1: {
          title: '产品与协作工具'
        },
        group2: {
          title: 'AI 与平台工具'
        },
        group3: {
          title: '技术与数据能力'
        },
        group4: {
          title: '证书与语言',
          item1: 'CET-6 554',
          item2: '计算机二级MS',
          item3: '计算机三级网络技术',
          item4: '普通话一级乙等'
        }
      },
      contact: {
        tag: 'Contact',
        title: '联系方式',
        summary: '期待产品经理、AI 产品、平台产品相关岗位机会。欢迎通过邮件或电话联系，我可以进一步提供完整项目材料与作品细节。',
        nameLabel: '姓名',
        nameValue: '李语涵',
        phoneLabel: '电话',
        emailLabel: '邮箱',
        locationLabel: '所在地',
        locationValue: '北京',
        copy: '复制',
        copyPhoneAria: '复制电话',
        copyEmailAria: '复制邮箱'
      },
      footer: {
        copyPrefix: '©',
        copyText: '李语涵 · Product Manager Portfolio'
      }
    },
    en: {
      meta: {
        lang: 'en',
        title: 'Yuhan Li | Product Manager Portfolio',
        description: 'Yuhan Li\'s product manager portfolio showcasing AI product internships, data-driven impact, product thinking, and cross-functional collaboration.',
        keywords: 'product manager,AI product manager,portfolio,resume,Yuhan Li,product design,data-driven growth',
        ogTitle: 'Yuhan Li | Product Manager Portfolio',
        ogDescription: 'A professional portfolio focused on AI product execution, growth results, and product thinking.',
        ogLocale: 'en_US',
        ogSiteName: 'Yuhan Li Portfolio',
        twitterTitle: 'Yuhan Li | Product Manager Portfolio',
        twitterDescription: 'Product manager portfolio featuring strengths, project outcomes, experience, and contact details.'
      },
      copySuccess: 'Copied',
      copyFail: 'Copy failed',
      theme: {
        switchToLight: 'Switch to light mode',
        switchToDark: 'Switch to dark mode',
        toggleTitle: 'Toggle theme'
      },
      language: {
        switchToEnglish: 'Switch to English',
        switchToChinese: '切换到中文',
        buttonZh: '中',
        buttonEn: 'EN',
        toggleTitleZh: '切换到中文',
        toggleTitleEn: 'Switch to English'
      },
      menu: {
        open: 'Open menu',
        close: 'Close menu'
      },
      brand: {
        ariaLabel: 'Back to homepage',
        name: 'Yuhan Li',
        role: 'Product Manager'
      },
      skip: {
        link: 'Skip to main content'
      },
      nav: {
        ariaLabel: 'Main navigation',
        home: 'Home',
        about: 'About Me',
        experience: 'Experience',
        highlights: 'Highlights',
        skills: 'Skills',
        contact: 'Contact'
      },
      hero: {
        eyebrow: 'AI PRODUCT MANAGER',
        name: 'Yuhan Li',
        slogan: 'Connecting user value and business growth through product thinking',
        ctaPrimary: 'View Experience',
        ctaSecondary: 'Contact Me',
        quote: 'Build products from 0 to 1,<br />then iterate with data.',
        kpi1Label: 'Package Purchase Conversion',
        kpi2Label: 'Daily Active Users in Global Business',
        kpi3Label: 'Monthly Registrations',
        scroll: 'Scroll down'
      },
      about: {
        tag: 'About',
        title: 'About Me',
        summary: 'Master\'s student at Beijing Jiaotong University, focused on AI products and platform products. Strong at turning user insight into clear requirements, validating outcomes with metrics, and driving cross-functional execution from strategy to launch.',
        education: {
          title: 'Education',
          item1: 'M.Eng. in Information and Communication Engineering, Beijing Jiaotong University<br />(Sep 2024 - Jun 2027)',
          item2: 'B.Eng. in Communication Engineering, Beijing Jiaotong University<br />(Sep 2020 - Jun 2024)'
        },
        strengths: {
          title: 'Core Strengths',
          item1: 'Product planning: able to independently handle positioning, competitive analysis, and PRD delivery',
          item2: 'Data-driven execution: builds metric loops around conversion, activity, and efficiency',
          item3: 'Cross-functional ownership: aligns engineering, algorithms, operations, and business goals'
        },
        honors: {
          title: 'Awards & Competitions',
          item1: 'National Scholarship / Zhong Maojun Special Scholarship',
          item2: '1st Prize, Challenge Cup / 2nd Prize, Internet+ Innovation Competition',
          item3: 'National 1st Prize, 9th Network Technology Challenge',
          item4: 'Merit Student / Outstanding Youth League Member'
        }
      },
      honors: {
        heading: 'Honors Gallery',
        description: 'Use the arrows to browse. Click the centered card to view it in full size.',
        stage: 'Honors carousel. Use left and right arrow keys to navigate.',
        prev: 'Previous honor',
        next: 'Next honor',
        closePreview: 'Close honor preview',
        dialog: 'Honor certificate preview',
        close: 'Close preview',
        cardAria: 'View honor: {title}'
      },
      experience: {
        tag: 'Experience',
        title: 'Internship Experience',
        summary: 'Hands-on product work with full-cycle experience from strategy design to launch validation.',
        kimi: {
          company: 'Moonshot AI',
          link: 'Visit the Kimi Platform',
          meta: 'API Team | Product Intern | Jan 2026 - Apr 2026',
          item1: 'Contributed to the design of Kimi Business Edition, defining core compliance logic such as training exclusion and backend identity isolation while connecting enterprise verification, bulk ordering, seat allocation, and member management into one closed loop.',
          item2: 'Built the event tracking framework for recharge, billing, and payment-status flows on the Kimi Platform, mapped the funnel, identified drop-off points around payment, and drove experience improvements.',
          item3: 'Researched leading monetization models and proposed a B-side channel tracking and rebate settlement system plus a C-side bilateral coupon referral mechanism, helping monthly registrations grow by about 35% MoM.',
          item4: 'Built an AI customer service bot with Dify by configuring LLM, knowledge retrieval, and issue classification modules, reducing manual handoff and improving service automation.'
        },
        zhipu: {
          company: 'Zhipu AI',
          link: 'Visit the Zhipu AI website',
          meta: 'MaaS Platform Department | Product Intern | Jun 2025 - Oct 2025',
          item1: 'Participated in building an MCP ecosystem platform from 0 to 1, clarifying the product position around one-stop access and in-app closed-loop usage while pushing roadmap planning.',
          item2: 'Led the revamp of multiple key modules in BigModel, increasing package purchase conversion from 3% to 5.2%.',
          item3: 'Supported the rollout of global strategy across two brands, helping the Z.ai API platform reach 10k+ daily active users.',
          item4: 'Led cross-platform traffic acquisition partnerships, driving roughly 350 million daily tokens consumed from Cherry Studio.',
          item5: 'Defined evaluation rules for knowledge-base retrieval quality and achieved a Pearson correlation of 0.899 between human and machine scoring.'
        },
        baidu: {
          company: 'Baidu',
          link: 'Visit the Qianfan Platform',
          meta: 'AI Quality & Efficiency Team | Test Development Intern | Sep 2024 - Dec 2024',
          item1: 'Led quality assurance for ERNIE Bot by designing defensive and performance metrics and participating in requirement reviews.',
          item2: 'Built a comparison matrix of leading AI products and distilled optimization suggestions for multi-turn dialogue and complex reasoning.',
          item3: 'Refactored Markdown detection and error-rate logic, improving detection accuracy by 20%.',
          item4: 'Worked with algorithm and operations teams to optimize version management and test strategies, improving arithmetic accuracy by 18%.'
        },
        baic: {
          company: 'BAIC Motor',
          link: 'Visit the BAIC website',
          meta: 'IT Department | Product Project Management Intern | Jul 2024 - Sep 2024',
          item1: 'Led requirement analysis for service-ticket system optimization, compared multiple solution paths, and landed a service-desk plus multi-dimensional table workflow.',
          item2: 'Independently built a ticketing system from 0 to 1, with pilot satisfaction reaching 95% after launch.',
          item3: 'Created automated dashboards and visual metrics, improving ticket-processing efficiency by 30%.'
        }
      },
      highlights: {
        tag: 'Highlights',
        title: 'Impact & Selected Outcomes',
        summary: 'Key metrics that make the business value of product decisions easy to see.',
        metric1: {
          label: 'Package Purchase Conversion',
          note: 'Improved from 3.0% to 5.2%'
        },
        metric2: {
          label: 'Console Click PV',
          note: 'Up 15% after the redesign'
        },
        metric3: {
          label: 'Global Platform DAU',
          note: 'Passed 10k by late September'
        },
        metric4: {
          label: 'Monthly Registration Growth',
          note: 'Up 35% MoM after the referral campaign'
        },
        chart: {
          title: 'Core Capability Radar (Maturity Score)',
          note: 'A composite view based on internship output and business results (out of 100)',
          ariaLabel: 'Bar chart of product capability assessment',
          item1: 'User Insight',
          item2: 'Product Planning',
          item3: 'Data Analysis',
          item4: 'Cross-team Collaboration',
          item5: 'Execution'
        }
      },
      skills: {
        tag: 'Skills',
        title: 'Professional Skills',
        summary: 'Capabilities across product design, AI toolchains, data analysis, and technical collaboration.',
        group1: {
          title: 'Product & Collaboration Tools'
        },
        group2: {
          title: 'AI & Platform Tools'
        },
        group3: {
          title: 'Technical & Data Skills'
        },
        group4: {
          title: 'Certifications & Languages',
          item1: 'CET-6 554',
          item2: 'National Computer Rank Exam Level 2 (MS Office)',
          item3: 'National Computer Rank Exam Level 3 (Network Technology)',
          item4: 'Putonghua Proficiency Test Level 1-B'
        }
      },
      contact: {
        tag: 'Contact',
        title: 'Get in Touch',
        summary: 'Open to product manager opportunities in AI products and platform products. Feel free to reach out by email or phone, and I can share more detailed project materials and portfolio context.',
        nameLabel: 'Name',
        nameValue: 'Yuhan Li',
        phoneLabel: 'Phone',
        emailLabel: 'Email',
        locationLabel: 'Location',
        locationValue: 'Beijing',
        copy: 'Copy',
        copyPhoneAria: 'Copy phone number',
        copyEmailAria: 'Copy email address'
      },
      footer: {
        copyPrefix: '©',
        copyText: 'Yuhan Li · Product Manager Portfolio'
      }
    }
  };

  const honorsData = [
    { src: 'honors/national_scholarship.jpg', title: { zh: '国家奖学金', en: 'National Scholarship' } },
    { src: 'honors/zhong_maojun_scholarship.jpg', title: { zh: '“钟茂钧”专项奖学金', en: 'Zhong Maojun Special Scholarship' } },
    { src: 'honors/challenge_cup_1st.png', title: { zh: '“挑战杯”一等奖', en: 'Challenge Cup - 1st Prize' } },
    { src: 'honors/internet_plus_innovation_2nd.png', title: { zh: '“互联网+”二等奖', en: 'Internet+ Innovation Competition - 2nd Prize' } },
    { src: 'honors/c4_network_champion_national.jpg', title: { zh: '网络技术挑战赛全国一等奖', en: 'National 1st Prize, Network Technology Challenge' } },
    { src: 'honors/c4_network_champion_north_china.jpg', title: { zh: '网络技术挑战赛华北一等奖', en: 'North China 1st Prize, Network Technology Challenge' } },
    { src: 'honors/c4_network_3rd_north_china.jpg', title: { zh: '网络技术挑战赛华北三等奖', en: 'North China 3rd Prize, Network Technology Challenge' } },
    { src: 'honors/innovation_project_beijing.png', title: { zh: '北京市创新创业训练项目', en: 'Beijing Innovation and Entrepreneurship Training Project' } },
    { src: 'honors/innovation_project_school.jpg', title: { zh: '校级创新创业训练项目', en: 'University-level Innovation and Entrepreneurship Training Project' } },
    { src: 'honors/academic_excellence_scholarship_2022.jpg', title: { zh: '学业优秀奖学金（2022）', en: 'Academic Excellence Scholarship (2022)' } },
    { src: 'honors/academic_excellence_scholarship_2023.jpg', title: { zh: '学业优秀奖学金（2023）', en: 'Academic Excellence Scholarship (2023)' } },
    { src: 'honors/merit_student_2022.jpg', title: { zh: '三好学生（2022）', en: 'Merit Student (2022)' } },
    { src: 'honors/merit_student_2023.jpg', title: { zh: '三好学生（2023）', en: 'Merit Student (2023)' } },
    { src: 'honors/outstanding_youth_member_school.jpg', title: { zh: '校级优秀团员', en: 'Outstanding Youth League Member (University)' } },
    { src: 'honors/outstanding_youth_member_college.jpg', title: { zh: '院级优秀团员', en: 'Outstanding Youth League Member (School of Study)' } }
  ];

  let currentTheme = 'dark';
  let currentLanguage = 'zh';
  let heroTyped = false;

  const getMessage = (path, language = currentLanguage) => {
    return path.split('.').reduce((value, key) => value?.[key], i18n[language]);
  };

  const applyContentMap = (selector, attribute, language = currentLanguage) => {
    document.querySelectorAll(selector).forEach((el) => {
      const key = el.getAttribute(attribute);
      const value = getMessage(key, language);
      if (typeof value === 'undefined') return;

      if (attribute === 'data-i18n') {
        el.textContent = value;
      } else if (attribute === 'data-i18n-html') {
        el.innerHTML = value;
      } else if (attribute === 'data-i18n-aria-label') {
        el.setAttribute('aria-label', value);
      } else if (attribute === 'data-i18n-title') {
        el.setAttribute('title', value);
      } else if (attribute === 'data-i18n-data-type-text') {
        el.setAttribute('data-type-text', value);
        el.textContent = value;
      }
    });
  };

  const updateMenuToggleLabel = () => {
    if (!menuToggle) return;
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-label', expanded ? getMessage('menu.close') : getMessage('menu.open'));
  };

  const updateThemeToggle = () => {
    if (!themeToggle) return;

    const nextThemeLabel = currentTheme === 'light' ? getMessage('theme.switchToDark') : getMessage('theme.switchToLight');
    themeToggle.setAttribute('aria-label', nextThemeLabel);
    themeToggle.setAttribute('aria-pressed', String(currentTheme === 'light'));
    themeToggle.setAttribute('title', getMessage('theme.toggleTitle'));
  };

  const updateLanguageToggle = () => {
    if (!languageToggle || !languageToggleText) return;

    const switchLabel = currentLanguage === 'zh' ? getMessage('language.switchToEnglish') : getMessage('language.switchToChinese');
    languageToggle.setAttribute('aria-label', switchLabel);
    languageToggle.setAttribute('aria-pressed', String(currentLanguage === 'en'));
    languageToggle.setAttribute('title', switchLabel);
    languageToggleText.textContent = currentLanguage === 'zh' ? getMessage('language.buttonEn') : getMessage('language.buttonZh');
  };

  const applyTheme = (theme) => {
    currentTheme = theme;
    document.body.dataset.theme = theme;

    if (themeMeta) {
      themeMeta.setAttribute('content', themeColors[theme] || themeColors.dark);
    }

    updateThemeToggle();
  };

  const updateMeta = () => {
    const meta = i18n[currentLanguage].meta;
    document.title = meta.title;
    root.lang = meta.lang;

    if (metaRefs.description) metaRefs.description.setAttribute('content', meta.description);
    if (metaRefs.keywords) metaRefs.keywords.setAttribute('content', meta.keywords);
    if (metaRefs.ogTitle) metaRefs.ogTitle.setAttribute('content', meta.ogTitle);
    if (metaRefs.ogDescription) metaRefs.ogDescription.setAttribute('content', meta.ogDescription);
    if (metaRefs.ogLocale) metaRefs.ogLocale.setAttribute('content', meta.ogLocale);
    if (metaRefs.ogSiteName) metaRefs.ogSiteName.setAttribute('content', meta.ogSiteName);
    if (metaRefs.twitterTitle) metaRefs.twitterTitle.setAttribute('content', meta.twitterTitle);
    if (metaRefs.twitterDescription) metaRefs.twitterDescription.setAttribute('content', meta.twitterDescription);
  };

  const applyLanguage = (language) => {
    currentLanguage = language;

    updateMeta();
    applyContentMap('[data-i18n]', 'data-i18n');
    applyContentMap('[data-i18n-html]', 'data-i18n-html');
    applyContentMap('[data-i18n-aria-label]', 'data-i18n-aria-label');
    applyContentMap('[data-i18n-title]', 'data-i18n-title');
    applyContentMap('[data-i18n-data-type-text]', 'data-i18n-data-type-text');

    updateMenuToggleLabel();
    updateThemeToggle();
    updateLanguageToggle();

    if (copyToast) {
      copyToast.textContent = '';
      copyToast.classList.remove('is-visible');
    }

    document.dispatchEvent(new CustomEvent('portfolio:languagechange', { detail: { language } }));
  };

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  applyTheme('dark');
  applyLanguage('zh');

  const typeText = (el, speed, delay = 0) =>
    new Promise((resolve) => {
      if (!el) {
        resolve();
        return;
      }

      const source = (el.getAttribute('data-type-text') || el.textContent || '').trim();
      if (!source) {
        resolve();
        return;
      }

      if (prefersReducedMotion) {
        el.textContent = source;
        resolve();
        return;
      }

      const chars = Array.from(source);
      el.textContent = '';
      let index = 0;

      const run = () => {
        el.textContent += chars[index];
        index += 1;

        if (index >= chars.length) {
          resolve();
          return;
        }

        setTimeout(run, speed);
      };

      setTimeout(run, delay);
    });

  const runHeroTypewriter = async () => {
    if (heroTyped) return;
    heroTyped = true;

    await typeText(heroNameEl, 170, 90);
    await typeText(heroSloganEl, 70, 130);
  };

  if (!prefersReducedMotion) {
    if (heroNameEl) heroNameEl.textContent = '';
    if (heroSloganEl) heroSloganEl.textContent = '';
  }

  document.addEventListener('portfolio:languagechange', () => {
    if (!heroTyped || prefersReducedMotion) return;
    if (heroNameEl) heroNameEl.textContent = heroNameEl.getAttribute('data-type-text') || '';
    if (heroSloganEl) heroSloganEl.textContent = heroSloganEl.getAttribute('data-type-text') || '';
  });

  const toggleHeader = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 16);
  };

  const setActiveNavLink = (id) => {
    if (!id) return;

    navLinks.forEach((link) => {
      const active = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', active);
      if (active) {
        link.setAttribute('aria-current', 'page');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  };

  toggleHeader();
  window.addEventListener('scroll', toggleHeader, { passive: true });

  if (menuToggle && nav) {
    menuToggle.addEventListener('click', () => {
      const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', String(!expanded));
      nav.classList.toggle('is-open', !expanded);
      updateMenuToggleLabel();
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        const targetId = link.getAttribute('href')?.replace(/^#/, '');
        setActiveNavLink(targetId);
        menuToggle.setAttribute('aria-expanded', 'false');
        nav.classList.remove('is-open');
        updateMenuToggleLabel();
      });
    });
  }

  if (languageToggle) {
    languageToggle.addEventListener('click', () => {
      applyLanguage(currentLanguage === 'zh' ? 'en' : 'zh');
    });
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      applyTheme(currentTheme === 'light' ? 'dark' : 'light');
    });
  }

  const revealItems = Array.from(document.querySelectorAll('.reveal'));
  const revealObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');

        if (entry.target.classList.contains('hero-left')) {
          runHeroTypewriter();
        }

        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((el) => revealObserver.observe(el));

  setTimeout(() => {
    if (!heroTyped) {
      runHeroTypewriter();
    }
  }, 1200);

  const sections = Array.from(document.querySelectorAll('.section-anchor'));
  const syncActiveNavWithScroll = () => {
    if (!sections.length) return;

    const headerHeight = header?.offsetHeight || 0;
    const probeY = window.scrollY + headerHeight + Math.min(window.innerHeight * 0.28, 180);

    let activeSection = sections[0];

    sections.forEach((section) => {
      if (section.offsetTop <= probeY) {
        activeSection = section;
      }
    });

    setActiveNavLink(activeSection.getAttribute('id'));
  };

  let navSyncFrame = 0;
  const requestNavSync = () => {
    if (navSyncFrame) return;

    navSyncFrame = window.requestAnimationFrame(() => {
      navSyncFrame = 0;
      syncActiveNavWithScroll();
    });
  };

  syncActiveNavWithScroll();
  window.addEventListener('scroll', requestNavSync, { passive: true });
  window.addEventListener('resize', requestNavSync);
  window.addEventListener('hashchange', requestNavSync);

  if (musicBanner && !prefersReducedMotion) {
    let bannerFrame = 0;
    const baseScoreShift = 120;

    const syncMusicBanner = () => {
      bannerFrame = 0;

      const rect = musicBanner.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const distance = viewportHeight - rect.top;
      const progress = Math.max(0, Math.min(distance / (viewportHeight + rect.height), 1));
      const shift = baseScoreShift - Math.round(progress * 560);

      musicBanner.style.setProperty('--score-shift', `${shift}px`);
    };

    const requestBannerSync = () => {
      if (bannerFrame) return;

      bannerFrame = window.requestAnimationFrame(syncMusicBanner);
    };

    syncMusicBanner();
    window.addEventListener('scroll', requestBannerSync, { passive: true });
    window.addEventListener('resize', requestBannerSync);
  }

  const counterEls = Array.from(document.querySelectorAll('[data-counter]'));
  const animateCounter = (el) => {
    const target = Number(el.getAttribute('data-counter'));
    const decimals = Number(el.getAttribute('data-decimals') || 0);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1150;
    const start = performance.now();

    const update = (now) => {
      const ratio = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - ratio, 3);
      const value = target * eased;

      el.textContent = `${value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
      })}${suffix}`;

      if (ratio < 1) {
        requestAnimationFrame(update);
      }
    };

    requestAnimationFrame(update);
  };

  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        animateCounter(entry.target);
        obs.unobserve(entry.target);
      });
    },
    { threshold: 0.66 }
  );

  counterEls.forEach((el) => counterObserver.observe(el));

  const fallbackCopy = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', 'readonly');
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();

    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch (_) {
      ok = false;
    }

    document.body.removeChild(textarea);
    return ok;
  };

  const showCopyToast = (message) => {
    if (!copyToast) return;

    copyToast.textContent = message;
    copyToast.classList.add('is-visible');

    clearTimeout(showCopyToast.timer);
    showCopyToast.timer = setTimeout(() => {
      copyToast.classList.remove('is-visible');
    }, 1200);
  };

  const copyText = async (text) => {
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (_) {
        return fallbackCopy(text);
      }
    }

    return fallbackCopy(text);
  };

  const honorsRoot = document.querySelector('[data-honors-carousel]');
  if (honorsRoot) {
    const stage = honorsRoot.querySelector('.honors-stage');
    const track = honorsRoot.querySelector('[data-honors-track]');
    const prevBtn = honorsRoot.querySelector('[data-honors-prev]');
    const nextBtn = honorsRoot.querySelector('[data-honors-next]');
    const titleEl = honorsRoot.querySelector('[data-honors-title]');
    const indexEl = honorsRoot.querySelector('[data-honors-index]');
    const lightbox = document.querySelector('#honor-lightbox');
    const lightboxImage = document.querySelector('#honor-lightbox-image');
    const lightboxCaption = document.querySelector('#honor-lightbox-caption');
    const lightboxCloseControls = Array.from(document.querySelectorAll('[data-honor-close]'));

    if (track && honorsData.length > 0) {
      const getHonorTitle = (index) => honorsData[index]?.title?.[currentLanguage] || '';
      const getHonorCardLabel = (title) => getMessage('honors.cardAria').replace('{title}', title);

      const cards = honorsData.map((item, index) => {
        const card = document.createElement('button');
        card.className = 'honor-card';
        card.type = 'button';
        card.setAttribute('data-card-index', String(index));

        const media = document.createElement('span');
        media.className = 'honor-card-media';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = item.title[currentLanguage];
        img.loading = 'lazy';
        img.decoding = 'async';

        media.appendChild(img);
        card.appendChild(media);
        track.appendChild(card);

        return card;
      });

      const total = cards.length;
      let activeIndex = 0;
      let hoveredIndex = null;
      const bodyOverflow = document.body.style.overflow;

      const normalizeIndex = (index) => {
        const mod = index % total;
        return mod < 0 ? mod + total : mod;
      };

      const getCircularOffset = (index, centerIndex) => {
        let offset = index - centerIndex;
        const midpoint = Math.floor(total / 2);
        if (offset > midpoint) offset -= total;
        if (offset < -midpoint) offset += total;
        return offset;
      };

      const openLightbox = (index) => {
        if (!lightbox || !lightboxImage || !lightboxCaption) return;
        const title = getHonorTitle(index);
        const item = honorsData[index];
        lightboxImage.src = item.src;
        lightboxImage.alt = title;
        lightboxCaption.textContent = title;
        lightbox.hidden = false;
        document.body.style.overflow = 'hidden';
      };

      const closeLightbox = () => {
        if (!lightbox || lightbox.hidden) return;
        lightbox.hidden = true;
        document.body.style.overflow = bodyOverflow;
      };

      const renderCards = () => {
        cards.forEach((card, index) => {
          const offset = getCircularOffset(index, activeIndex);
          const distance = Math.abs(offset);
          const visible = distance <= 2;

          let x = 0;
          let y = 0;
          let scale = 1;
          let rotate = 0;
          let blur = 0;
          let opacity = 1;
          let push = 0;

          if (distance === 1) {
            x = offset * 31;
            y = 12;
            scale = 0.9;
            rotate = offset > 0 ? 2.8 : -2.8;
            opacity = 0.82;
          } else if (distance === 2) {
            x = offset * 52;
            y = 25;
            scale = 0.78;
            rotate = offset > 0 ? 5 : -5;
            blur = 0.4;
            opacity = 0.5;
          }

          if (hoveredIndex !== null && visible) {
            const hoverOffset = getCircularOffset(index, hoveredIndex);
            const hoverDistance = Math.abs(hoverOffset);

            if (index === hoveredIndex) {
              scale += 0.045;
              y -= 8;
            } else if (hoverDistance <= 2) {
              const direction = hoverOffset > 0 ? 1 : -1;
              push = direction * (hoverDistance === 1 ? 24 : 12);
            }
          }

          const title = getHonorTitle(index);
          const image = card.querySelector('img');

          card.classList.toggle('is-active', offset === 0);
          card.classList.toggle('is-hidden', !visible);
          card.setAttribute('aria-hidden', String(!visible));
          card.setAttribute('aria-label', getHonorCardLabel(title));
          card.tabIndex = visible ? 0 : -1;
          card.style.setProperty('--x', String(x));
          card.style.setProperty('--y', `${y}px`);
          card.style.setProperty('--scale', String(scale));
          card.style.setProperty('--rotate', `${rotate}deg`);
          card.style.setProperty('--push', `${push}px`);
          card.style.setProperty('--blur', `${blur}px`);
          card.style.setProperty('--opacity', visible ? String(opacity) : '0');
          card.style.setProperty('--z', String(40 - distance * 8 + (index === hoveredIndex ? 2 : 0)));

          if (image) {
            image.alt = title;
          }
        });

        if (titleEl) {
          titleEl.textContent = getHonorTitle(activeIndex);
        }

        if (indexEl) {
          indexEl.textContent = `${activeIndex + 1} / ${total}`;
        }

        if (lightbox && !lightbox.hidden && lightboxCaption && lightboxImage) {
          lightboxCaption.textContent = getHonorTitle(activeIndex);
          lightboxImage.alt = getHonorTitle(activeIndex);
        }
      };

      const setActiveIndex = (nextIndex) => {
        activeIndex = normalizeIndex(nextIndex);
        renderCards();
      };

      cards.forEach((card, index) => {
        card.addEventListener('mouseenter', () => {
          hoveredIndex = index;
          renderCards();
        });

        card.addEventListener('mouseleave', () => {
          hoveredIndex = null;
          renderCards();
        });

        card.addEventListener('focus', () => {
          hoveredIndex = index;
          renderCards();
        });

        card.addEventListener('blur', () => {
          hoveredIndex = null;
          renderCards();
        });

        card.addEventListener('click', () => {
          if (index === activeIndex) {
            openLightbox(index);
            return;
          }

          setActiveIndex(index);
        });
      });

      if (prevBtn) {
        prevBtn.addEventListener('click', () => {
          setActiveIndex(activeIndex - 1);
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', () => {
          setActiveIndex(activeIndex + 1);
        });
      }

      if (stage) {
        stage.addEventListener('keydown', (event) => {
          if (event.key === 'ArrowLeft') {
            event.preventDefault();
            setActiveIndex(activeIndex - 1);
          } else if (event.key === 'ArrowRight') {
            event.preventDefault();
            setActiveIndex(activeIndex + 1);
          }
        });
      }

      lightboxCloseControls.forEach((closeEl) => {
        closeEl.addEventListener('click', closeLightbox);
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeLightbox();
        }
      });

      document.addEventListener('portfolio:languagechange', renderCards);

      renderCards();
    }
  }

  copyButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const text = button.getAttribute('data-copy') || '';
      const ok = await copyText(text);

      if (!ok) {
        showCopyToast(getMessage('copyFail'));
        return;
      }

      showCopyToast(getMessage('copySuccess'));
    });
  });
})();
