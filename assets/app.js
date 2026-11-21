(function () {
  "use strict";

  // ---------- language ----------
  // Data values stay Chinese internally (filters, grouping); only what is shown is translated.
  var LANG = pickLang();
  var EN = {};       // fixed values (options, statuses, schools) -> English, from data/i18n_en.json
  var TEXT_EN = {};  // approved free text -> its English translation, built from cases
  var UI = {
    zh: {
      title: "美签 F1/J1 Case 汇总",
      lede: "汇总 F1/J1 美签匿名问卷结果：2026 年 8 月及之后面签的，以及更早面签、但到 8 月还没有下签（比如一直在 check）的 case 都包括在内，帮助大家了解各学校、各方向的情况。",
      disclaimer: "<strong>注意：</strong>数据是自愿填写，未经核实，不构成法律意见，而且可能有偏差，仅作为参考。",
      schedule: "不定期更新。",
      meta: "数据更新：{0}（北京时间） · 共 {1} 例 · 最新提交 {2}",
      loadFail: "数据加载失败：",
      cta: "填写 / 更新我的 case",
      ctaNote: "过签、check、被拒的情况都欢迎填写，样本越多越有参考价值。",
      filters: "筛选",
      f_visa_type: "签证类型", f_result: "签证状态", f_location: "面签地点", f_interview_month: "面签月份",
      f_purpose: "赴美目的", f_field_us: "赴美方向", f_school: "学校",
      schoolPh: "本/硕/博任一学校，如：上海交通", reset: "清除筛选", all: "全部",
      grpResult: "按结果", grpStatus: "具体情况", grpVisa: "合并 New / Renew", grpVisaType: "具体类型",
      refusedAll: "拒签（全部）", visaF1: "F1（New + Renew）", visaJ1: "J1（New + Renew）",
      countAll: "全部 {0} 例", countSome: "当前筛选：{0} / {1} 例",
      overview: "总览", legend: "图例", cases: "Case 数", share: "占 {0}%",
      medianCheck: "Check 天数中位数", withCheck: "{0} 例有 check", nCases: "{0} 例",
      empty: "没有符合条件的 case", emptyCheck: "没有符合条件的 check case", emptySchool: "没有符合条件的学校",
      multi: "多选", multiField: "多选，一个 case 可计入多个方向",
      checkTitle: "Check 天数", checkSub: "每个点是一个 case，从面签当天算起；仍在 check 的算到填写当天。",
      stillCheck: "仍在 Check", refusedAfter: "Check 后拒签", approvedAfter: "Check 后通过", days: "{0} 天",
      schoolsTitle: "按学校", lvAny: "任一", lvUndergrad: "本科", lvMaster: "硕士", lvPhd: "博士", levels: "学校层级",
      schoolsSub: "“任一”指本、硕、博任一阶段在该校；同一人在同校读多个阶段只计一次。<span class=\"anon-school\">斜体虚线</span>表示填写者没有透露具体校名。“任一”里美本/美硕/美博合并为“美校”，非陆本/硕/博非美本/硕/博合并为“非陆校非美校”。",
      thSchool: "学校", thStage: "阶段", thN: "例数", thResult: "结果", thOk: "通过", thCheck: "Check中", thRefused: "拒签",
      stage: { undergrad: "本", master: "硕", phd: "博" },
      anonTitle: "填写者未透露具体校名",
      casesTitle: "全部 case", casesSub: "按最近提交时间排序。自由填写的内容经过人工脱敏后才公开。",
      updated: "更新于 {0}",
      d_interview: "面签", d_prev: "上次结果", d_purpose: "目的", d_school: "学校", d_field_us: "赴美方向",
      d_field_prev: "之前方向", d_bg: "背景", d_asked: "被问", d_supp: "补材料", d_validity: "有效期", d_orig: "原填写", siteNote: "站点备注：",
      d_other_exp: "其它经历", studying: "在读",
      csc: "CSC {0}", military: "军工/国防 {0}", notFilled: "未填",
      sep: "、", open: "（", close: "）", colon: "：",
      tr: "", untranslated: "",
      b_ok: "通过", b_check: "Check中", b_f: "拒签 212(f)", b_b: "拒签 214(b)", b_x: "其他代码/其他情况",
      bd_location: "面签地点", bd_month: "面签月份", bd_visa: "签证类型", bd_purpose: "赴美目的", bd_attempt: "这一波第几次签",
      bd_field_us: "赴美研究/学习方向", bd_field_prev: "赴美之前的研究/学习方向", bd_bg: "科研经历和论文背景",
      bd_csc: "CSC 公派经历", bd_military: "军队院校/军工单位/国防重点实验室经历", bd_asked: "面签被问了什么", bd_supp: "有没有要求补材料",
      switchTo: "EN", switchLabel: "Switch to English"
    },
    en: {
      title: "US F1/J1 Visa Cases 2026",
      lede: "Results of an anonymous survey of F1/J1 US visa cases: interviews in August 2026 or later, plus earlier interviews still not issued by August (e.g. stuck in “check”). “Check” means administrative processing under INA 221(g).",
      disclaimer: "<strong>Note:</strong> self-reported and unverified; not legal advice; may be biased. For reference only.",
      schedule: "Updated from time to time.",
      meta: "Data updated {0} (Beijing time) · {1} cases · latest submission {2}",
      loadFail: "Failed to load data: ",
      cta: "Submit / update my case",
      ctaNote: "The survey is in Chinese. Approved, in check or refused — every case helps.",
      filters: "Filters",
      f_visa_type: "Visa type", f_result: "Visa status", f_location: "Interview location", f_interview_month: "Interview month",
      f_purpose: "Purpose", f_field_us: "Field in the US", f_school: "School",
      schoolPh: "Undergrad/master's/PhD school, e.g. Tsinghua", reset: "Reset", all: "All",
      grpResult: "By result", grpStatus: "Details", grpVisa: "New + Renew", grpVisaType: "Details",
      refusedAll: "Refused (all)", visaF1: "F1 (New + Renew)", visaJ1: "J1 (New + Renew)",
      countAll: "All {0} cases", countSome: "Filtered: {0} / {1} cases",
      overview: "Overview", legend: "Legend", cases: "Cases", share: "{0}% of cases",
      medianCheck: "Median check days", withCheck: "{0} cases with check", nCases: "{0}",
      empty: "No matching cases", emptyCheck: "No matching cases with check", emptySchool: "No matching schools",
      multi: "Multiple choice", multiField: "Multiple choice — a case can count under several fields",
      checkTitle: "Days in check", checkSub: "Each dot is one case, counted from the interview date; cases still in check are counted up to the submission date.",
      stillCheck: "Still in check", refusedAfter: "Then refused", approvedAfter: "Then approved", days: "{0} days",
      schoolsTitle: "By school", lvAny: "Any", lvUndergrad: "Undergrad", lvMaster: "Master's", lvPhd: "PhD", levels: "School level",
      schoolsSub: "“Any” = the school appears at any stage (undergrad, master's or PhD); a person is counted once per school. <span class=\"anon-school\">Dotted italics</span> mark schools the respondent chose not to name. Under “Any”, US schools and schools outside mainland China & the US are each merged across stages.",
      thSchool: "School", thStage: "Stage", thN: "Cases", thResult: "Results", thOk: "Approved", thCheck: "In check", thRefused: "Refused",
      stage: { undergrad: "UG", master: "MS", phd: "PhD" },
      anonTitle: "The respondent did not name the school",
      casesTitle: "All cases", casesSub: "Sorted by latest submission. Free-text answers are published only after manual de-identification; English versions are translated from the Chinese original.",
      updated: "Updated {0}",
      d_interview: "Interview", d_prev: "Previous", d_purpose: "Purpose", d_school: "Schools", d_field_us: "Field (US)",
      d_field_prev: "Field (before)", d_bg: "Background", d_asked: "Asked", d_supp: "Documents", d_validity: "Validity", d_orig: "Original answer", siteNote: "Site note: ",
      d_other_exp: "Other experience", studying: "in progress",
      csc: "CSC: {0}", military: "Military/defense: {0}", notFilled: "n/a",
      sep: ", ", open: " (", close: ")", colon: ": ",
      tr: "translated from Chinese", untranslated: "Chinese original, translation pending",
      b_ok: "Approved", b_check: "In check", b_f: "Refused 212(f)", b_b: "Refused 214(b)", b_x: "Other code / other",
      bd_location: "Interview location", bd_month: "Interview month", bd_visa: "Visa type", bd_purpose: "Purpose in the US", bd_attempt: "Attempt in this round",
      bd_field_us: "Field of study/research in the US", bd_field_prev: "Previous field of study/research", bd_bg: "Research & publication background",
      bd_csc: "CSC-funded experience", bd_military: "Military academy / defense industry / defense key lab experience", bd_asked: "What the officer asked", bd_supp: "Extra documents requested",
      switchTo: "中文", switchLabel: "切换到中文"
    }
  };

  function pickLang() {
    var q = /[?&]lang=(zh|en)\b/.exec(location.search);
    if (q) return q[1];
    try { var s = localStorage.getItem("lang"); if (s === "zh" || s === "en") return s; } catch (e) {}
    return /^zh/i.test(navigator.language || "zh") ? "zh" : "en";
  }
  function t(key) {
    var s = UI[LANG][key];
    for (var i = 1; i < arguments.length; i++) s = s.split("{" + (i - 1) + "}").join(arguments[i]);
    return s;
  }
  // Display text for a fixed data value.
  function V(v) { return LANG === "en" && v != null ? (EN[v] || TEXT_EN[v] || v) : v; }

  // Outcome buckets — status colours, always shown with icon + label.
  var BUCKETS = [
    { k: "ok", icon: "✓" }, { k: "check", icon: "◔" }, { k: "f", icon: "✕" }, { k: "b", icon: "✕" }, { k: "x", icon: "?" }
  ];
  function bname(k) { return t("b_" + k); }

  var BREAKDOWNS = [
    { title: "bd_location", get: function (c) { return c.location === "其他" && c.location_other ? c.location_other : c.location; } },
    { title: "bd_month", get: function (c) { return c.interview_month; }, byKey: true },
    { title: "bd_visa", get: function (c) { return c.visa_type; } },
    { title: "bd_purpose", get: function (c) { return c.purpose; } },
    { title: "bd_attempt", get: function (c) { return c.attempt; } },
    { title: "bd_field_us", get: function (c) { return c.field_us; }, sub: "multiField" },
    { title: "bd_field_prev", get: function (c) { return c.field_prev; }, sub: "multi" },
    { title: "bd_bg", get: function (c) { return c.research_bg; }, sub: "multi" },
    { title: "bd_csc", get: function (c) { return c.csc; } },
    { title: "bd_military", get: function (c) { return c.military; } },
    { title: "bd_asked", get: function (c) { return c.asked; }, sub: "multi" },
    { title: "bd_supp", get: function (c) { return c.supplement; }, sub: "multi" }
  ];
  var TEXT_FIELDS = ["visa_type_other", "location_other", "status_other", "validity_other", "asked_other", "supplement_other", "notes",
    "purpose_other", "research_bg_other", "field_us_other", "field_us_detail", "field_prev_other", "field_prev_detail",
    "prev_result_other", "edu_other", "other_exp"];
  // Place names are just translated, without the "translated from Chinese" note.
  var NO_NOTE = ["location_other"];
  var LAST = ["其他", "其它", "不确定", "未填写"];
  var NOT_SCHOOL = ["无本科学校", "无硕士学校", "无博士学校", "未填写", "未知", "其它（未填校名）", "赴美读本（本次）", "赴美读硕（本次）", "赴美读博（本次）"];
  var PLACEHOLDER = [];  // stand-ins for undisclosed school names, from meta.json
  var COUNTRY_ONLY = ["美本", "美硕", "美博", "非陆本非美本", "非陆硕非美硕", "非陆博非美博", "美校", "非陆校非美校"];
  // In the "任一" view a person may be at such a school in several stages, so merge the stage names.
  var ANY_NAME = { "美本": "美校", "美硕": "美校", "美博": "美校", "非陆本非美本": "非陆校非美校", "非陆硕非美硕": "非陆校非美校", "非陆博非美博": "非陆校非美校" };
  var LEVELS = ["undergrad", "master", "phd"];
  // School value meaning "the degree this visa is for" -> the purpose it repeats.
  var THIS_TIME = { "赴美读博（本次）": "PhD", "赴美读硕（本次）": "Master", "赴美读本（本次）": "Undergraduate" };
  var CJK = /[㐀-鿿]/;
  // A school level holds one name, or (v2 survey, e.g. two master's degrees) a list of names.
  function schoolsOf(c, l) { var v = c[l]; return v == null ? [] : Array.isArray(v) ? v : [v]; }

  var all = [], meta = {};
  var state = { filters: {}, school: "", level: "any" };

  function $(s) { return document.querySelector(s); }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }
  function bucket(c) {
    if (c.outcome === "approved") return "ok";
    if (c.outcome === "pending") return "check";
    if (c.outcome === "refused" && c.refusal_code === "212(f)") return "f";
    if (c.outcome === "refused" && c.refusal_code === "214(b)") return "b";
    return "x";
  }
  function isPseudo(s) { return COUNTRY_ONLY.indexOf(s) >= 0 || PLACEHOLDER.indexOf(s) >= 0; }
  function schoolHTML(s) {
    return PLACEHOLDER.indexOf(s) >= 0 ? '<span class="anon-school" title="' + esc(t("anonTitle")) + '">' + esc(V(s)) + "</span>" : esc(V(s));
  }
  // A free-text answer as HTML: in English, the approved translation plus a "translated" note.
  function freeHTML(c, field) {
    var zh = c[field];
    if (!zh) return "";
    if (LANG !== "en" || !CJK.test(zh)) return esc(zh);
    var en = c[field + "_en"];
    if (en && NO_NOTE.indexOf(field) >= 0) return esc(en);
    return en ? esc(en) + ' <span class="tr-note">' + esc(t("tr")) + "</span>"
      : esc(zh) + ' <span class="tr-note">' + esc(t("untranslated")) + "</span>";
  }
  // A chart label: fixed values and short typed-in names (e.g. a city under 其他) are simply translated.
  function labelHTML(v) { return esc(V(v)); }
  function pct(n, d) { return d ? Math.round((n / d) * 100) : 0; }
  function asList(v) { return Array.isArray(v) ? v : [v == null || v === "" ? "未填写" : v]; }
  function emptyCounts() { var o = { n: 0 }; BUCKETS.forEach(function (b) { o[b.k] = 0; }); return o; }
  function byDisplay(a, b) { return String(V(a)).localeCompare(String(V(b)), LANG === "en" ? "en" : "zh"); }

  // ---------- filters ----------
  // Extra aggregate options shown at the top of a select ("g:"/"b:" values).
  var VISA_GROUPS = [
    { v: "g:F1", name: "visaF1", test: function (c) { return /\bF1$/.test(c.visa_type || ""); } },
    { v: "g:J1", name: "visaJ1", test: function (c) { return /\bJ1$/.test(c.visa_type || ""); } }
  ];
  var RESULT_GROUPS = BUCKETS.map(function (b) {
    return { v: "b:" + b.k, name: "b_" + b.k, test: function (c) { return bucket(c) === b.k; } };
  });
  RESULT_GROUPS.splice(2, 0, { v: "g:refused", name: "refusedAll", test: function (c) { return c.outcome === "refused"; } });

  function matches(key, want, c) {
    var groups = key === "visa_type" ? VISA_GROUPS : key === "result" ? RESULT_GROUPS : [];
    for (var i = 0; i < groups.length; i++) if (groups[i].v === want) return groups[i].test(c);
    var v = key === "result" ? c.status : c[key];
    return Array.isArray(v) ? v.indexOf(want) >= 0 : v === want;
  }

  function filtered() {
    var q = state.school.trim().toLowerCase();
    return all.filter(function (c) {
      for (var key in state.filters) {
        var want = state.filters[key];
        if (want && !matches(key, want, c)) return false;
      }
      if (q) {
        var hit = LEVELS.some(function (l) {
          return schoolsOf(c, l).some(function (s) { return (s + "\n" + (EN[s] || "")).toLowerCase().indexOf(q) >= 0; });
        });
        if (!hit) return false;
      }
      return true;
    });
  }

  function option(v, name, n) {
    return '<option value="' + esc(v) + '">' + esc(name) + (LANG === "en" ? " (" + n + ")" : "（" + n + "）") + "</option>";
  }

  // (Re)build the option lists in the current language, keeping the current selection.
  function buildSelects() {
    document.querySelectorAll("select[data-filter]").forEach(function (sel) {
      var key = sel.getAttribute("data-filter");
      var counts = {};
      all.forEach(function (c) { asList(key === "result" ? c.status : c[key]).forEach(function (v) { counts[v] = (counts[v] || 0) + 1; }); });
      var vals = Object.keys(counts);
      if (key === "interview_month") vals.sort().reverse();
      else vals.sort(function (a, b) { return counts[b] - counts[a] || byDisplay(a, b); });
      var groups = key === "visa_type" ? VISA_GROUPS : key === "result" ? RESULT_GROUPS : null;
      var dupNames = (groups || []).map(function (x) { return UI.zh[x.name]; });
      var plain = vals.filter(function (v) { return dupNames.indexOf(v) < 0; })
        .map(function (v) { return option(v, V(v), counts[v]); }).join("");
      var html = '<option value="">' + esc(t("all")) + "</option>";
      if (groups) {
        var g = groups.map(function (x) {
          var n = all.filter(x.test).length;
          return n ? option(x.v, t(x.name), n) : "";
        }).join("");
        html += '<optgroup label="' + esc(t(key === "result" ? "grpResult" : "grpVisa")) + '">' + g + "</optgroup>" +
          '<optgroup label="' + esc(t(key === "result" ? "grpStatus" : "grpVisaType")) + '">' + plain + "</optgroup>";
      } else html += plain;
      sel.innerHTML = html;
      sel.value = state.filters[key] || "";
    });
  }

  function setupControls() {
    document.querySelectorAll("select[data-filter]").forEach(function (sel) {
      sel.addEventListener("change", function () { state.filters[sel.getAttribute("data-filter")] = sel.value; render(); });
    });
    $("#school-q").addEventListener("input", function (e) { state.school = e.target.value; render(); });
    $("#reset").addEventListener("click", function () {
      state.filters = {}; state.school = "";
      document.querySelectorAll("select[data-filter]").forEach(function (s) { s.value = ""; });
      $("#school-q").value = "";
      render();
    });
    document.querySelectorAll("#level-toggle button").forEach(function (b) {
      b.addEventListener("click", function () {
        state.level = b.getAttribute("data-level");
        document.querySelectorAll("#level-toggle button").forEach(function (x) { x.setAttribute("aria-pressed", String(x === b)); });
        renderSchools(filtered());
      });
    });
    $("#lang").addEventListener("click", function () {
      LANG = LANG === "en" ? "zh" : "en";
      try { localStorage.setItem("lang", LANG); } catch (e) {}
      try {
        var u = new URL(location.href);
        u.searchParams.set("lang", LANG);
        history.replaceState(null, "", u.toString());
      } catch (e) {}
      applyLang();
    });
  }

  // ---------- pieces ----------
  function barHTML(name, cnt) {
    var parts = [], label = [];
    BUCKETS.forEach(function (b) {
      var v = cnt[b.k];
      if (!v) return;
      label.push(bname(b.k) + " " + v);
      parts.push('<span class="seg ' + b.k + '" style="flex:' + v + ' 1 0" data-tip="' +
        esc(name + " · " + bname(b.k) + t("colon") + v + " / " + cnt.n + (LANG === "en" ? " (" : "（") + pct(v, cnt.n) + (LANG === "en" ? "%)" : "%）")) +
        '"><span class="lbl">' + v + "</span></span>");
    });
    return '<div class="bar" role="img" aria-label="' + esc(name + " · " + t("nCases", cnt.n) + t("colon") + label.join(t("sep"))) + '">' + parts.join("") + "</div>";
  }

  function fitLabels(root) {
    root.querySelectorAll(".seg .lbl").forEach(function (l) {
      l.classList.remove("hidden");
      if (l.offsetWidth > l.parentNode.clientWidth - 6) l.classList.add("hidden");
    });
  }

  function tally(cases, get) {
    var groups = {};
    cases.forEach(function (c) {
      var seen = {};
      asList(get(c)).forEach(function (v) {
        if (seen[v]) return;
        seen[v] = 1;
        var g = groups[v] || (groups[v] = emptyCounts());
        g.n++; g[bucket(c)]++;
      });
    });
    return groups;
  }

  function orderKeys(groups, byKey) {
    var keys = Object.keys(groups);
    if (byKey) return keys.sort();
    return keys.sort(function (a, b) {
      var la = LAST.indexOf(a) >= 0, lb = LAST.indexOf(b) >= 0;
      if (la !== lb) return la ? 1 : -1;
      return groups[b].n - groups[a].n || byDisplay(a, b);
    });
  }

  // ---------- sections ----------
  function renderTiles(cases) {
    var tt = emptyCounts();
    cases.forEach(function (c) { tt.n++; tt[bucket(c)]++; });
    var days = cases.filter(function (c) { return c.had_check && c.check_days != null; })
      .map(function (c) { return c.check_days; }).sort(function (a, b) { return a - b; });
    var median = days.length ? (days.length % 2 ? days[(days.length - 1) / 2] : Math.round((days[days.length / 2 - 1] + days[days.length / 2]) / 2)) : null;

    var html = '<div class="tile hero"><div class="label">' + esc(t("cases")) + '</div><div class="value">' + tt.n + "</div></div>";
    BUCKETS.forEach(function (b) {
      if (b.k === "x" && !tt.x) return;
      html += '<div class="tile"><div class="label"><span class="key ' + b.k + '"></span>' + b.icon + " " + esc(bname(b.k)) +
        '</div><div class="value">' + tt[b.k] + '</div><div class="note">' + esc(t("share", pct(tt[b.k], tt.n))) + "</div></div>";
    });
    html += '<div class="tile"><div class="label">' + esc(t("medianCheck")) + '</div><div class="value">' + (median == null ? "—" : median) +
      '</div><div class="note">' + esc(t("withCheck", days.length)) + "</div></div>";
    $("#tiles").innerHTML = html;
  }

  function renderLegend() {
    var hasX = all.some(function (c) { return bucket(c) === "x"; });
    $("#legend").innerHTML = BUCKETS.filter(function (b) { return b.k !== "x" || hasX; }).map(function (b) {
      return '<span><span class="key ' + b.k + '"></span>' + b.icon + " " + esc(bname(b.k)) + "</span>";
    }).join("");
  }

  function renderBreakdowns(cases) {
    $("#breakdowns").innerHTML = BREAKDOWNS.map(function (d) {
      var groups = tally(cases, d.get);
      var keys = orderKeys(groups, d.byKey);
      var body = keys.length ? '<div class="rows">' + keys.map(function (k) {
        return '<div class="name">' + labelHTML(k) + "</div>" + barHTML(V(k), groups[k]) + '<div class="n">' + esc(t("nCases", groups[k].n)) + "</div>";
      }).join("") + "</div>" : '<p class="empty">' + esc(t("empty")) + "</p>";
      return '<section class="card"><h2>' + esc(t(d.title)) + '</h2><p class="sub">' + (d.sub ? esc(t(d.sub)) : "") + "</p>" + body + "</section>";
    }).join("");
  }

  function niceStep(max) {
    var steps = [5, 10, 20, 30, 50, 100, 200];
    for (var i = 0; i < steps.length; i++) if (max / steps[i] <= 6) return steps[i];
    return 500;
  }

  function renderCheck(cases) {
    var rows = [
      { name: "stillCheck", test: function (c) { return c.outcome === "pending"; } },
      { name: "refusedAfter", test: function (c) { return c.had_check && c.outcome === "refused"; } },
      { name: "approvedAfter", test: function (c) { return c.had_check && c.outcome === "approved"; } }
    ];
    var withDays = cases.filter(function (c) { return c.had_check && c.check_days != null; });
    if (!withDays.length) { $("#check-chart").innerHTML = '<p class="empty">' + esc(t("emptyCheck")) + "</p>"; return; }
    var maxDays = Math.max.apply(null, withDays.map(function (c) { return c.check_days; }));
    var step = niceStep(maxDays);
    var top = Math.max(step, Math.ceil(maxDays / step) * step);
    var html = '<div class="strip">';
    rows.forEach(function (r) {
      var list = withDays.filter(r.test);
      if (!list.length) return;
      var seen = {};
      html += '<div class="strip-row"><div class="name">' + esc(t(r.name)) + (LANG === "en" ? " (" + list.length + ")" : "（" + list.length + "）") + '</div><div class="track">';
      list.forEach(function (c) {
        var k = bucket(c), dup = seen[c.check_days] = (seen[c.check_days] || 0) + 1;
        var dy = dup === 1 ? 0 : (dup % 2 ? 1 : -1) * Math.ceil((dup - 1) / 2) * 7;
        var desc = [c.id, t("days", c.check_days), V(c.status), (c.interview_date || c.interview_month || "") + " " + (V(c.location) || "")];
        html += '<button type="button" class="dot" style="left:' + (c.check_days / top * 100) + "%;transform:translateY(" + dy + "px);--c:var(--" + k + ')" data-tip="' +
          esc(desc.join(" · ")) + '" aria-label="' + esc(desc.slice(0, 3).join(t("sep"))) + '"></button>';
      });
      html += "</div></div>";
    });
    html += '<div class="axis"><div></div><div class="ticks">';
    for (var v = 0; v <= top; v += step) html += '<span style="left:' + (v / top * 100) + '%">' + v + "</span>";
    html += "</div></div></div>";
    $("#check-chart").innerHTML = html;
  }

  function renderSchools(cases) {
    var level = state.level;
    var stage = t("stage");
    var groups = {}, levelsOf = {};
    cases.forEach(function (c) {
      var names = {};
      LEVELS.forEach(function (l) {
        if (level !== "any" && level !== l) return;
        schoolsOf(c, l).forEach(function (s) {
          if (!s || NOT_SCHOOL.indexOf(s) >= 0) return;
          if (level === "any" && ANY_NAME[s]) s = ANY_NAME[s];
          var lv = names[s] = names[s] || [];
          if (lv.indexOf(l) < 0) lv.push(l);
        });
      });
      Object.keys(names).forEach(function (s) {
        var g = groups[s] || (groups[s] = emptyCounts());
        g.n++; g[bucket(c)]++;
        var lv = levelsOf[s] || (levelsOf[s] = {});
        names[s].forEach(function (x) { lv[x] = (lv[x] || 0) + 1; });
      });
    });
    var keys = Object.keys(groups).sort(function (a, b) {
      var pa = isPseudo(a), pb = isPseudo(b);
      if (pa !== pb) return pa ? 1 : -1;
      return groups[b].n - groups[a].n || byDisplay(a, b);
    });
    if (!keys.length) { $("#schools").innerHTML = '<tbody><tr><td class="empty">' + esc(t("emptySchool")) + "</td></tr></tbody>"; return; }
    var head = "<thead><tr><th>" + esc(t("thSchool")) + "</th>" + (level === "any" ? '<th class="hide-sm">' + esc(t("thStage")) + "</th>" : "") +
      '<th class="num">' + esc(t("thN")) + "</th><th>" + esc(t("thResult")) + '</th><th class="num hide-sm">' + esc(t("thOk")) +
      '</th><th class="num hide-sm">' + esc(t("thCheck")) + '</th><th class="num hide-sm">' + esc(t("thRefused")) + "</th></tr></thead>";
    var body = keys.map(function (s) {
      var g = groups[s];
      var lv = levelsOf[s];
      var lvText = LEVELS.map(function (l) { return lv[l] ? stage[l] + (LANG === "en" ? " " : "") + lv[l] : ""; }).filter(Boolean).join(" ");
      return '<tr class="' + (COUNTRY_ONLY.indexOf(s) >= 0 ? "pseudo" : "") + '"><td>' + schoolHTML(s) + "</td>" +
        (level === "any" ? '<td class="hide-sm">' + lvText + "</td>" : "") +
        '<td class="num">' + g.n + '</td><td class="barcell">' + barHTML(V(s), g) + "</td>" +
        '<td class="num hide-sm">' + g.ok + '</td><td class="num hide-sm">' + g.check + '</td><td class="num hide-sm">' + (g.f + g.b + g.x) + "</td></tr>";
    }).join("");
    $("#schools").innerHTML = head + "<tbody>" + body + "</tbody>";
    fitLabels($("#schools"));
  }

  // "A、B（other） · detail" as HTML, with translated values and free text.
  function withOther(c, list, otherField, detailField) {
    var s = (list || []).map(function (v) { return esc(V(v)); }).join(esc(t("sep")));
    var other = otherField ? freeHTML(c, otherField) : "";
    var detail = detailField ? freeHTML(c, detailField) : "";
    if (other) s += esc(t("open")) + other + esc(t("close"));
    if (detail) s += (s ? " · " : "") + detail;
    return s;
  }

  function renderCases(cases) {
    var sorted = cases.slice().sort(function (a, b) {
      return (b.updated || "").localeCompare(a.updated || "") || b.id.localeCompare(a.id);
    });
    if (!sorted.length) { $("#cases").innerHTML = '<p class="empty">' + esc(t("empty")) + "</p>"; return; }
    var stage = t("stage");
    $("#cases").innerHTML = sorted.map(function (c) {
      var k = bucket(c);
      var b = BUCKETS.filter(function (x) { return x.k === k; })[0];
      var rows = [];
      function row(label, html) { if (html) rows.push("<dt>" + esc(t(label)) + "</dt><dd>" + html + "</dd>"); }
      var loc = esc(V(c.location)) + (c.location_other ? esc(t("open")) + freeHTML(c, "location_other") + esc(t("close")) : "");
      var visa = esc(V(c.visa_type)) + (c.visa_type_other ? esc(t("open")) + freeHTML(c, "visa_type_other") + esc(t("close")) : "");
      row("d_interview", [esc(c.interview_date || c.interview_month || ""), loc, visa, esc(V(c.attempt) || "")].filter(Boolean).join(" · "));
      row("d_prev", esc(V(c.prev_result) || "") + (c.prev_result_other ? esc(t("open")) + freeHTML(c, "prev_result_other") + esc(t("close")) : ""));
      row("d_purpose", esc(V(c.purpose) || "") + (c.purpose_other ? esc(t("open")) + freeHTML(c, "purpose_other") + esc(t("close")) : ""));
      var studying = c.studying || [];
      // Skip "无X学校", and "赴美读X（本次）" when it only repeats the purpose shown above
      // (a self-contradicting one, e.g. purpose Master + 赴美读博（本次）, stays visible as filled).
      var shown = function (s) { return !/^无.+学校$/.test(s) && THIS_TIME[s] !== c.purpose; };
      var school = LEVELS.filter(function (l) { return schoolsOf(c, l).filter(shown).length; })
        .map(function (l) {
          return esc(stage[l]) + " " + schoolsOf(c, l).filter(shown).map(schoolHTML).join(esc(t("sep"))) +
            (studying.indexOf(l) >= 0 ? esc(t("open") + t("studying") + t("close")) : "");
        }).join(" → ");
      row("d_school", [school, c.edu_other ? freeHTML(c, "edu_other") : ""].filter(Boolean).join(" · "));
      row("d_field_us", withOther(c, c.field_us, "field_us_other", "field_us_detail"));
      row("d_field_prev", withOther(c, c.field_prev, "field_prev_other", "field_prev_detail"));
      row("d_bg", [esc(t("csc", V(c.csc) || t("notFilled"))), esc(t("military", V(c.military) || t("notFilled"))),
        withOther(c, c.research_bg, "research_bg_other")].filter(Boolean).join(" · "));
      row("d_other_exp", freeHTML(c, "other_exp"));
      row("d_asked", withOther(c, c.asked, "asked_other"));
      row("d_supp", withOther(c, c.supplement, "supplement_other"));
      row("d_validity", c.validity ? esc(V(c.validity)) + (c.validity_other ? esc(t("open")) + freeHTML(c, "validity_other") + esc(t("close")) : "") : "");
      // An unclassified "其他情况" shows the free text in the title; once classified, the title
      // stays short (optional status_note) and the original wording goes in the card body.
      var unclassified = c.status === "其他情况";
      var status = esc(V(c.status)) +
        (c.status_note ? esc(t("open") + V(c.status_note) + t("close")) : unclassified && c.status_other ? esc(t("colon")) + freeHTML(c, "status_other") : "") +
        (c.had_check && c.check_days != null ? " · check " + esc(t("days", c.check_days)) : "");
      if (!unclassified || c.status_note) row("d_orig", freeHTML(c, "status_other"));
      return '<article class="case"><div class="case-top"><span class="case-id">' + esc(c.id) + '</span><span class="case-date">' + esc(t("updated", c.updated)) + "</span></div>" +
        '<div class="badge"><span class="key ' + k + '"></span>' + b.icon + " " + status + "</div>" +
        "<dl>" + rows.join("") + "</dl>" + (c.notes ? '<div class="notes">' + freeHTML(c, "notes") + "</div>" : "") +
        (c.card_note ? '<div class="site-note">' + esc(t("siteNote") + V(c.card_note)) + "</div>" : "") + "</article>";
    }).join("");
  }

  function render() {
    var cases = filtered();
    var active = Object.keys(state.filters).some(function (k) { return state.filters[k]; }) || state.school.trim();
    $("#count").textContent = active ? t("countSome", cases.length, all.length) : t("countAll", all.length);
    renderTiles(cases);
    renderBreakdowns(cases);
    renderCheck(cases);
    renderSchools(cases);
    renderCases(cases);
    fitLabels(document);
  }

  // Static text in index.html: data-i18n (text), data-i18n-html (markup), data-i18n-ph (placeholder), data-i18n-aria.
  function applyStatic() {
    document.documentElement.lang = LANG === "en" ? "en" : "zh-CN";
    document.querySelectorAll("[data-i18n]").forEach(function (el) { el.textContent = t(el.getAttribute("data-i18n")); });
    document.querySelectorAll("[data-i18n-html]").forEach(function (el) { el.innerHTML = t(el.getAttribute("data-i18n-html")); });
    document.querySelectorAll("[data-i18n-ph]").forEach(function (el) { el.placeholder = t(el.getAttribute("data-i18n-ph")); });
    document.querySelectorAll("[data-i18n-aria]").forEach(function (el) { el.setAttribute("aria-label", t(el.getAttribute("data-i18n-aria"))); });
    var title = LANG === "en" ? t("title") : (meta.site_title || t("title"));
    $("#title").textContent = title; document.title = title;
    var btn = $("#lang");
    btn.textContent = t("switchTo"); btn.setAttribute("aria-label", t("switchLabel")); btn.setAttribute("lang", LANG === "en" ? "zh-CN" : "en");
  }

  function applyLang() {
    applyStatic();
    if (!all.length && !meta.generated_at) return;
    $("#meta").textContent = t("meta", meta.generated_at, meta.cases, meta.latest_submission || "—");
    if (meta.survey_url) $("#actions").innerHTML = '<a class="btn" href="' + esc(meta.survey_url) + '" target="_blank" rel="noopener">' + esc(t("cta")) + "</a>" +
      '<span class="cta-note">' + esc(t("ctaNote")) + "</span>";
    renderLegend();
    buildSelects();
    render();
  }

  // ---------- tooltip (mouse hover + tap on touch) ----------
  function setupTip() {
    var tip = $("#tip"), pinned = null;
    function place(x, y) {
      var w = tip.offsetWidth, h = tip.offsetHeight;
      var left = Math.min(Math.max(8, x + 12), window.innerWidth - w - 8);
      var top = y + 16 + h > window.innerHeight ? y - h - 12 : y + 16;
      tip.style.left = left + "px"; tip.style.top = top + "px";
    }
    function show(el, x, y) { tip.textContent = el.getAttribute("data-tip"); tip.hidden = false; place(x, y); }
    function hide() { tip.hidden = true; pinned = null; }
    document.addEventListener("pointerover", function (e) {
      if (e.pointerType === "touch") return;
      var el = e.target.closest("[data-tip]");
      if (el) show(el, e.clientX, e.clientY);
    });
    document.addEventListener("pointermove", function (e) {
      if (e.pointerType !== "touch" && !tip.hidden && !pinned) place(e.clientX, e.clientY);
    });
    document.addEventListener("pointerout", function (e) {
      if (e.pointerType === "touch" || pinned) return;
      var el = e.target.closest("[data-tip]");
      if (el && !el.contains(e.relatedTarget)) hide();
    });
    document.addEventListener("click", function (e) {
      var el = e.target.closest("[data-tip]");
      if (el && el !== pinned) { show(el, e.clientX, e.clientY); pinned = el; }
      else hide();
    });
    document.addEventListener("focusin", function (e) {
      var el = e.target.closest && e.target.closest("[data-tip]");
      if (el) { var r = el.getBoundingClientRect(); show(el, r.left + r.width / 2, r.bottom); }
    });
    document.addEventListener("focusout", function () { if (!pinned) hide(); });
    window.addEventListener("scroll", function () { if (!tip.hidden) hide(); }, { passive: true });
  }

  function init(m, cases, en) {
    meta = m; all = cases; EN = en || {};
    PLACEHOLDER = meta.placeholder_schools || [];
    all.forEach(function (c) {
      TEXT_FIELDS.forEach(function (f) { if (c[f] && c[f + "_en"]) TEXT_EN[c[f]] = c[f + "_en"]; });
    });
    setupControls();
    setupTip();
    applyLang();
    var tm;
    window.addEventListener("resize", function () { clearTimeout(tm); tm = setTimeout(function () { fitLabels(document); }, 120); });
  }

  applyStatic();
  function getJSON(u) { return fetch(u, { cache: "no-cache" }).then(function (r) { return r.json(); }); }
  Promise.all([getJSON("data/meta.json"), getJSON("data/cases.json"), getJSON("data/i18n_en.json").catch(function () { return {}; })])
    .then(function (res) { init(res[0], res[1], res[2]); })
    .catch(function (err) { $("#meta").textContent = t("loadFail") + err.message; });
})();
