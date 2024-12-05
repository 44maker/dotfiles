// 定义主函数
const proxyName = "代理模式";

// 覆写规则
function overwriteRules(params) {
  const customRules = [
    // 在此添加自定义规则，最高优先级

  ];

  const rules = [
    ...customRules,
    "RULE-SET,reject,广告拦截",
    "RULE-SET,direct,DIRECT",
    "RULE-SET,cncidr,DIRECT",
    "RULE-SET,private,DIRECT",
    "RULE-SET,lancidr,DIRECT",
    "GEOIP,LAN,DIRECT,no-resolve",
    "GEOIP,CN,DIRECT,no-resolve",
    "RULE-SET,applications,DIRECT",
    "RULE-SET,openai,ChatGPT",
    "RULE-SET,claude,Claude",
    "RULE-SET,spotify,Spotify",
    "RULE-SET,netflix,Netflix",
    "RULE-SET,telegramcidr,电报消息,no-resolve",
    "RULE-SET,tld-not-cn," + proxyName,
    "RULE-SET,icloud," + proxyName,
    "RULE-SET,apple," + proxyName,
    "RULE-SET,gfw," + proxyName,
    "RULE-SET,greatfire," + proxyName,
    "RULE-SET,proxy," + proxyName,
    "MATCH,漏网之鱼",
  ];

  const ruleProviders = {
    reject: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/reject.txt",
      path: "./ruleset/reject.yaml",
      interval: 86400,
    },
    icloud: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/icloud.txt",
      path: "./ruleset/icloud.yaml",
      interval: 86400,
    },
    apple: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/apple.txt",
      path: "./ruleset/apple.yaml",
      interval: 86400,
    },
    proxy: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/proxy.txt",
      path: "./ruleset/proxy.yaml",
      interval: 86400,
    },
    google: {
      type: "http",
      behavior: "classical",
      url: "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/Google/Google.yaml",
      path: "./ruleset/google.yaml",
      interval: 86400,
    },
    bilibili: {
      type: "http",
      behavior: "classical",
      url: "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/BiliBili/BiliBili.yaml",
      path: "./ruleset/bilibili.yaml",
      interval: 86400,
    },
    openai: {
      type: "http",
      behavior: "classical",
      url: "https://fastly.jsdelivr.net/gh/blackmatrix7/ios_rule_script@master/rule/Clash/OpenAI/OpenAI.yaml",
      path: "./ruleset/custom/openai.yaml",
    },
    claude: {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Claude/Claude.yaml",
      path: "./ruleset/custom/Claude.yaml",
    },
    spotify: {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Spotify/Spotify.yaml",
      path: "./ruleset/custom/Spotify.yaml",
    },
    netflix: {
      type: "http",
      behavior: "classical",
      url: "https://raw.githubusercontent.com/blackmatrix7/ios_rule_script/master/rule/Clash/Netflix/Netflix.yaml",
      path: "./ruleset/custom/Netflix.yaml",
    },
    telegramcidr: {
      type: "http",
      behavior: "ipcidr",
      url: "https://fastly.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/telegramcidr.txt",
      path: "./ruleset/custom/telegramcidr.yaml",
    },
    direct: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/direct.txt",
      path: "./ruleset/direct.yaml",
      interval: 86400,
    },
    private: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/private.txt",
      path: "./ruleset/private.yaml",
      interval: 86400,
    },
    gfw: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/gfw.txt",
      path: "./ruleset/gfw.yaml",
      interval: 86400,
    },
    greatfire: {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/greatfire.txt",
      path: "./ruleset/greatfire.yaml",
      interval: 86400,
    },
    "tld-not-cn": {
      type: "http",
      behavior: "domain",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/tld-not-cn.txt",
      path: "./ruleset/tld-not-cn.yaml",
      interval: 86400,
    },
    cncidr: {
      type: "http",
      behavior: "ipcidr",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/cncidr.txt",
      path: "./ruleset/cncidr.yaml",
      interval: 86400,
    },
    lancidr: {
      type: "http",
      behavior: "ipcidr",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/lancidr.txt",
      path: "./ruleset/lancidr.yaml",
      interval: 86400,
    },
    applications: {
      type: "http",
      behavior: "classical",
      url: "https://cdn.jsdelivr.net/gh/Loyalsoldier/clash-rules@release/applications.txt",
      path: "./ruleset/applications.yaml",
      interval: 86400,
    },
  };

  params["rule-providers"] = ruleProviders;
  params["rules"] = rules;
}

function main(params) {
  if (!params.proxies) return params;
  overwriteRules(params);
  overwriteProxyGroups(params);
  overwriteDns(params);
  // 填充rule-provider
  if (!params['rule-providers']) {
    params['rule-providers'] = {};
  }
  const newProvider = {
    type: "http",
    interval: 86400,
    behavior: "domain",
    format: "text",
    url: "https://raw.githubusercontent.com/xishang0128/rules/main/clash%20or%20stash/prevent_dns_leak/prevent_dns_leak_domain.list"
  };
  params['rule-providers']['prevent_dns_leak'] = newProvider;

  // 填充规则
  const matchRule = params.rules.find(rule => rule.startsWith("MATCH"));
  const name = matchRule ? matchRule.split(",").pop() : null;
  const newRule = `RULE-SET,prevent_dns_leak,${name}`;
  if (name) {
    params.rules.unshift(newRule);
  }

  // 修改dns为fakeip
  if (!params.dns) {
    params.dns = {};
  }
  const dnsparams = params.dns;
  if (!dnsparams['enhanced-mode'] || dnsparams['enhanced-mode'] !== "fake-ip") {
    dnsparams['enhanced-mode'] = "fake-ip";
  }

  return params;
}
// 覆写代理组
function overwriteProxyGroups(params) {
  // 所有代理
  const allProxies = params["proxies"].map((e) => e.name);

  // 自动选择代理组，按地区分组选延迟最低
  const autoProxyGroupRegexs = [
    { name: "HK - 自动选择", regex: / 香港 | HK|Hong|🇭🇰/ },
    { name: "TW - 自动选择", regex: / 台湾 | TW|Taiwan|Wan|🇨🇳|🇹🇼/ },
    {
      name: "SG - 自动选择",
      regex: / 新加坡 | 狮城 | SG| sg*| sg1| reality|Singapore|🇸🇬/,
    },
    { name: "JP - 自动选择", regex: / 日本 | JP|Japan|🇯🇵/ },
    { name: "US - 自动选择", regex: / 美国 | US|United States|America|🇺🇸/ },
    {
      name: "其它 - 自动选择",
      regex: /(?!.*(?: 剩余 | 到期 | 主页 | 官网 | 游戏 | 关注))(.*)/,
    },
  ];

  const autoProxyGroups = autoProxyGroupRegexs
    .map((item) => ({
      name: item.name,
      type: "url-test",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      proxies: getProxiesByRegex(params, item.regex),
      hidden: true,
    }))
    .filter((item) => item.proxies.length > 0);

  // 手工选择代理组
  const manualProxyGroups = [
    {
      name: "HK - 手工选择",
      regex: / 香港| HK|Hong|🇭🇰/,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/hk.svg",
    },
    {
      name: "TW - 手工选择",
      regex: / 台湾 | TW|Taiwan|Wan|🇨🇳|🇹🇼/,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/tw.svg",
    },
    {
      name: "SG - 手工选择",
      regex: / 新加坡 | 狮城 | SG| sg*| sg1| reality|Singapore|🇸🇬/,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/sg.svg",
    },
    {
      name: "JP - 手工选择",
      regex: / 日本 | JP|Japan|🇯🇵/,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/jp.svg",
    },
    {
      name: "US - 手工选择",
      regex: / 美国 | US|United States|America|🇺🇸/,
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/flags/us.svg",
    },
  ];

  const manualProxyGroupsparams = manualProxyGroups
    .map((item) => ({
      name: item.name,
      type: "select",
      proxies: getManualProxiesByRegex(params, item.regex),
      icon: item.icon,
      hidden: false,
    }))
    .filter((item) => item.proxies.length > 0);

  const groups = [
    {
      name: proxyName,
      type: "select",
      url: "http://www.gstatic.com/generate_204",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/adjust.svg",
      proxies: [
        "自动选择",
        "手动选择",
        "负载均衡 (散列)",
        "负载均衡 (轮询)",
        "DIRECT",
      ],
    },
    {
      name: "手动选择",
      type: "select",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/link.svg",
      proxies: allProxies,
    },
    {
      name: "自动选择",
      type: "select",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/speed.svg",
      proxies: ["ALL - 自动选择"],
    },
    {
      name: "负载均衡 (散列)",
      type: "load-balance",
      url: "http://www.gstatic.com/generate_204",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/balance.svg",
      interval: 300,
      "max-failed-times": 3,
      strategy: "consistent-hashing",
      lazy: true,
      proxies: allProxies,
    },
    {
      name: "负载均衡 (轮询)",
      type: "load-balance",
      url: "http://www.gstatic.com/generate_204",
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/merry_go.svg",
      interval: 300,
      "max-failed-times": 3,
      strategy: "round-robin",
      lazy: true,
      proxies: allProxies,
    },
    {
      name: "ALL - 自动选择",
      type: "url-test",
      url: "http://www.gstatic.com/generate_204",
      interval: 300,
      tolerance: 50,
      proxies: allProxies,
      hidden: true,
    },
    {
      name: "BiliBili",
      type: "select",
      proxies: [
        proxyName,
        "DIRECT",
        "HK - 自动选择",
        "TW - 自动选择",
        "HK - 手工选择",
        "TW - 手工选择",
      ],
      icon: "https://raw.githubusercontent.com/fmz200/wool_scripts/main/icons/apps/BiliBili_01.png",
    },
    {
      name: "Google",
      type: "select",
      proxies: [
        proxyName,
        "HK - 自动选择",
        "TW - 自动选择",
        "SG - 自动选择",
        "JP - 自动选择",
        "US - 自动选择",
        "其它 - 自动选择",
        "HK - 手工选择",
        "TW - 手工选择",
        "SG - 手工选择",
        "JP - 手工选择",
        "US - 手工选择",
      ],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/google.svg",
    },
    {
      name: "电报消息",
      type: "select",
      proxies: [
        proxyName,
        "HK - 自动选择",
        "TW - 自动选择",
        "SG - 自动选择",
        "JP - 自动选择",
        "US - 自动选择",
        "其它 - 自动选择",
        "HK - 手工选择",
        "TW - 手工选择",
        "SG - 手工选择",
        "JP - 手工选择",
        "US - 手工选择",
      ],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/telegram.svg",
    },
    {
      name: "ChatGPT",
      type: "select",
      proxies: [
        proxyName,
        "HK - 自动选择",
        "TW - 自动选择",
        "SG - 自动选择",
        "JP - 自动选择",
        "US - 自动选择",
        "其它 - 自动选择",
        "HK - 手工选择",
        "TW - 手工选择",
        "SG - 手工选择",
        "JP - 手工选择",
        "US - 手工选择",
      ],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/chatgpt.svg",
    },
    {
      name: "Claude",
      type: "select",
      proxies: [
        proxyName,
        "HK - 自动选择",
        "TW - 自动选择",
        "SG - 自动选择",
        "JP - 自动选择",
        "US - 自动选择",
        "其它 - 自动选择",
        "HK - 手工选择",
        "TW - 手工选择",
        "SG - 手工选择",
        "JP - 手工选择",
        "US - 手工选择",
      ],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/claude.svg",
    },
    {
      name: "Netflix",
      type: "select",
      proxies: [
        proxyName,
        "HK - 自动选择",
        "TW - 自动选择",
        "SG - 自动选择",
        "JP - 自动选择",
        "US - 自动选择",
        "其它 - 自动选择",
        "HK - 手工选择",
        "TW - 手工选择",
        "SG - 手工选择",
        "JP - 手工选择",
        "US - 手工选择",
      ],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/netflix.svg",
    },
    {
      name: "Spotify",
      type: "select",
      proxies: [
        proxyName,
        "HK - 自动选择",
        "TW - 自动选择",
        "SG - 自动选择",
        "JP - 自动选择",
        "US - 自动选择",
        "其它 - 自动选择",
        "HK - 手工选择",
        "TW - 手工选择",
        "SG - 手工选择",
        "JP - 手工选择",
        "US - 手工选择",
      ],
      icon: "https://storage.googleapis.com/spotifynewsroom-jp.appspot.com/1/2020/12/Spotify_Icon_CMYK_Green.png",
    },
    {
      name: "漏网之鱼",
      type: "select",
      proxies: ["DIRECT", proxyName],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/fish.svg",
    },
    {
      name: "广告拦截",
      type: "select",
      proxies: ["REJECT", "DIRECT", proxyName],
      icon: "https://fastly.jsdelivr.net/gh/clash-verge-rev/clash-verge-rev.github.io@main/docs/assets/icons/block.svg",
    },
  ];

  autoProxyGroups.length &&
    groups[2].proxies.unshift(...autoProxyGroups.map((item) => item.name));
  groups.push(...autoProxyGroups);
  groups.push(...manualProxyGroupsparams);
  params["proxy-groups"] = groups;
}

// 覆写 DNS 设置，防止 DNS 泄露
function overwriteDns(params) {
  const cnDnsList = [
    "https://223.5.5.5/dns-query",
    "https://1.12.12.12/dns-query",
  ];
  const trustDnsList = [
    "quic://dns.cooluc.com",
    "https://1.0.0.1/dns-query",
    "https://1.1.1.1/dns-query",
  ];

  const dnsOptions = {
    enable: true,
    "prefer-h3": true,
    "enhanced-mode": "redir-host",
    "default-nameserver": cnDnsList,
    nameserver: cnDnsList,
    fallback: trustDnsList,
    "fallback-filter": {
      geoip: true,
      "geoip-code": "CN",
      geosite: ["gfw"],
      ipcidr: ["240.0.0.0/4"],
      domain: ["+.google.com", "+.facebook.com", "+.youtube.com"],
    },
  };

  const githubPrefix = "https://fastgh.lainbo.com/";

  const rawGeoxURLs = {
    geoip:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geoip-lite.dat",
    geosite:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/geosite.dat",
    mmdb:
      "https://github.com/MetaCubeX/meta-rules-dat/releases/download/latest/country-lite.mmdb",
  };

  const accelURLs = Object.fromEntries(
    Object.entries(rawGeoxURLs).map(([key, githubUrl]) => [
      key,
      `${githubPrefix}${githubUrl}`,
    ])
  );

  const otherOptions = {
    "unified-delay": true,
    "tcp-concurrent": true,
    profile: {
      "store-selected": true,
      "store-fake-ip": true,
    },
    sniffer: {
      enable: true,
      sniff: {
        TLS: {
          ports: [443, 8443],
        },
        HTTP: {
          ports: [80, "8080-8880"],
          "override-destination": true,
        },
      },
    },
    "geodata-mode": "memory",
    "geox-url": accelURLs,
  };

  params.dns = { ...params.dns, ...dnsOptions };
  Object.keys(otherOptions).forEach((key) => {
    params[key] = otherOptions[key];
  });
}

function getProxiesByRegex(params, regex) {
  const matchedProxies = params.proxies
    .filter((e) => regex.test(e.name))
    .map((e) => e.name);
  return matchedProxies.length > 0 ? matchedProxies : ["手动选择"];
}

function getManualProxiesByRegex(params, regex) {
  const matchedProxies = params.proxies
    .filter((e) => regex.test(e.name))
    .map((e) => e.name);
  return matchedProxies.length > 0
    ? matchedProxies
    : ["DIRECT", "手动选择", proxyName];
}
