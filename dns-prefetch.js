import fs from "fs";
import path from "path";

/**
 * 递归遍历目录获取所有匹配扩展名的文件
 */
function getAllFiles(dir, extensions) {
  const files = [];
  const traverse = (currentDir) => {
    for (const entry of fs.readdirSync(currentDir, { withFileTypes: true })) {
      const fullPath = path.join(currentDir, entry.name);
      if (entry.isDirectory()) {
        traverse(fullPath);
      } else if (extensions.includes(path.extname(entry.name).slice(1))) {
        files.push(fullPath);
      }
    }
  };
  traverse(dir);
  return files;
}

/**
 * Vite 插件：DNS 预解析
 * @param {Object} options - 插件配置
 * @param {string} options.outDir - 输出目录，默认 'dist'
 * @param {string[]} options.extensions - 扫描的文件扩展名
 * @param {string[]} options.includeDomains - 需要 DNS 预解析的域名白名单（为空则使用所有提取到的域名）
 */
export default function dnsPrefetchPlugin(options = {}) {
  const {
    outDir = "dist",
    extensions = ["html", "js", "css"],
    includeDomains = [],
  } = options;

  const urlRegex = /(?:https?:)?\/\/([a-zA-Z0-9][-a-zA-Z0-9]*(?:\.[a-zA-Z0-9][-a-zA-Z0-9]*)+)/g;

  return {
    name: "vite-plugin-dns-prefetch",
    apply: "build",
    enforce: "post",

    closeBundle() {
      const distPath = path.resolve(process.cwd(), outDir);
      if (!fs.existsSync(distPath)) return;

      const files = getAllFiles(distPath, extensions);
      const domains = new Set();

      // 提取所有域名
      for (const file of files) {
        const content = fs.readFileSync(file, "utf-8");
        let match;
        urlRegex.lastIndex = 0;
        while ((match = urlRegex.exec(content)) !== null) {
          const domain = match[1];
          // 如果设置了白名单，只添加白名单中的域名；否则排除本地域名
          if (includeDomains.length > 0) {
            if (includeDomains.some((d) => domain.includes(d))) {
              domains.add(domain);
            }
          }
        }
      }

      if (domains.size === 0) return;

      console.log(`🌐 [DNS Prefetch] 提取到 ${domains.size} 个域名:`, [...domains]);

      // 生成 dns-prefetch link 标签
      const links = [...domains]
        .map((d) => `    <link rel="dns-prefetch" href="//${d}">`)
        .join("\n");

      const insertContent = `\n    <meta http-equiv="x-dns-prefetch-control" content="on">\n${links}\n`;

      // 注入到 index.html
      const indexPath = path.join(distPath, "index.html");
      if (!fs.existsSync(indexPath)) return;

      let html = fs.readFileSync(indexPath, "utf-8");
      html = html.replace(/(<head[^>]*>)/, `$1${insertContent}`);
      fs.writeFileSync(indexPath, html, "utf-8");

      console.log(`✅ [DNS Prefetch] 已注入 ${domains.size} 个 dns-prefetch 标签`);
    },
  };
}

