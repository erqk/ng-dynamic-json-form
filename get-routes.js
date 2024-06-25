/**https://samvloeberghs.be/posts/angular-v9-universal-ssr-and-prerendering-out-of-the-box/#rendering-more-dynamic-routes */

const fs = require("fs");
const hostOrigin = "http://localhost:4201";
const docsPath = `${hostOrigin}/assets/docs`;
const routesFile = "./routes.txt";
const endOfLine = require("os").EOL;
const staticRoutes = ["/", "/docs", "/playground"];

fetch(`${docsPath}/index.md`).then(async (res) => {
  if (!res.ok) return;
  const data = await res.text();
  const allIndexPaths = data.match(/(\.+\/){1,}.+\.md/g);
  const allVersions =
    `${data}`.match(/(##)\s(\d\.){1,}(\d*)\s*(\(deprecated\))*/g) || [];

  const targetVersion = allVersions
    .map((x) => x.split("##")[1].trim()[0])
    .sort()
    .reverse()[0];

  const targetIndexPaths = allIndexPaths.filter(
    (x) => x.indexOf(`/v${targetVersion}/`) > -1
  );

  const routes = await targetIndexPaths.reduce(async (acc, curr) => {
    const req = await fetch(`${docsPath}/${curr.replace(/(\.+\/){1,}/, "")}`);
    const fileList = await req.text();
    if (!fileList) return acc;

    const result = fileList
      .match(/v{1,}.+\.md/g)
      .map((x) => x.replace(/v{1,}\d*\//, ""))
      .map((x) => `/docs/${x}`);

    (await acc).push(...result);
    return acc;
  }, Promise.resolve([]));

  routes.unshift(...staticRoutes);
  fs.writeFileSync(routesFile, routes.join(endOfLine), "utf-8");
});
