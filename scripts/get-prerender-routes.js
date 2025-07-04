/**https://samvloeberghs.be/posts/angular-v9-universal-ssr-and-prerendering-out-of-the-box/#rendering-more-dynamic-routes */
// Modified by ChatGPT

const fs = require("fs");
const path = require("path");
const os = require("os");

const docsRoot = path.resolve(__dirname, "../src/assets/docs");
const routesFile = "./routes.txt";
const staticRoutes = ["/", "/docs", "/playground"];
const endOfLine = os.EOL;

function readText(filePath) {
  return fs.readFileSync(filePath, "utf-8");
}

function main() {
  const indexPath = path.join(docsRoot, "index.md");
  console.log(indexPath);
  if (!fs.existsSync(indexPath)) {
    console.error("❌ index.md not found");
    process.exit(1);
  }

  const data = readText(indexPath);
  const allIndexPaths = data.match(/(\.+\/){1,}.+\.md/g);
  const allVersions =
    data.match(/(##)\s(\d\.){1,}(\d*)\s*(\(deprecated\))*/g) || [];

  const targetVersion = allVersions
    .map((x) => x.split("##")[1].trim()[0])
    .sort()
    .reverse()[0];

  const targetIndexPaths = allIndexPaths.filter((x) =>
    x.includes(`/v${targetVersion}/`)
  );

  const routes = [];

  targetIndexPaths.forEach((relPath) => {
    const filePath = path.resolve(docsRoot, relPath.replace(/^(\.+\/)+/, ""));
    if (!fs.existsSync(filePath)) return;

    const fileList = readText(filePath);
    const matches = fileList.match(/v{1,}.+\.md/g) || [];

    const result = matches.map((x) => `/docs/${x.replace(/v{1,}\d*\//, "")}`);

    routes.push(...result);
  });

  routes.unshift(...staticRoutes);
  fs.writeFileSync(routesFile, routes.join(endOfLine), "utf-8");
  console.log(`✅ Wrote ${routes.length} routes to ${routesFile}`);
}

main();
