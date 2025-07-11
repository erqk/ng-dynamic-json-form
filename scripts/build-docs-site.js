const { exec, spawn } = require("child_process");
const waitOn = require("wait-on");
const os = require("os");

const PORT = 4201;
const SERVER_URL = `tcp:localhost:${PORT}`;

function run(command, args = [], options = {}) {
  return new Promise((resolve, reject) => {
    const proc = spawn(command, args, {
      stdio: "inherit",
      shell: true,
      ...options,
    });

    proc.on("close", (code) => {
      if (code !== 0)
        return reject(new Error(`❌ ${command} exited with code ${code}`));
      resolve();
    });
  });
}

function killByPid(pid) {
  return new Promise((resolve, reject) => {
    const platform = os.platform();

    if (platform === "win32") {
      // /F: force, /T: kill child processes too
      exec(`taskkill /PID ${pid} /F /T`, (error) => {
        if (error) return reject(error);
        resolve();
      });
    } else {
      // kill process group with signal
      exec(`kill -9 ${pid}`, (error) => {
        if (error) return reject(error);
        resolve();
      });
    }
  });
}

async function main() {
  let serverProc;

  try {
    console.log("🔧 Step 1: Building library...");
    await run("npm", ["run", "build:lib"]);

    console.log("🚀 Step 2: Starting dev server...");
    serverProc = spawn("npm", ["run", "start"], {
      stdio: "inherit",
      shell: true,
    });

    console.log("⏳ Step 3: Waiting for server to be ready...");
    await waitOn({ resources: [SERVER_URL], timeout: 60000 });

    console.log("📄 Step 4: Running prerender...");
    await run("npm", ["run", "prerender"]);

    console.log("🛑 Step 5: Stopping dev server...");
    await killByPid(serverProc.pid);

    console.log("✅ All steps completed.");
  } catch (err) {
    console.error("🔥 Error:", err.message);

    if (serverProc?.pid) {
      try {
        await killByPid(serverProc.pid);
      } catch (killErr) {
        console.warn("⚠️ Failed to kill server process:", killErr.message);
      }
    }

    process.exit(1);
  }
}

main();
