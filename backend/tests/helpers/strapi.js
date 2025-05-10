const { createStrapi } = require("@strapi/strapi");
const fs = require("fs");
const path = require("path");

let strapiInstance;

async function setupStrapi() {
  if (!strapiInstance) {
    // Create .tmp directory if it doesn't exist
    const tmpDir = path.join(process.cwd(), ".tmp");
    if (!fs.existsSync(tmpDir)) {
      fs.mkdirSync(tmpDir, { recursive: true });
    }

    strapiInstance = await createStrapi({
      appDir: process.cwd(),
      distDir: process.cwd(),
      serveAdminPanel: false,
    });
    await strapiInstance.load();
    await strapiInstance.server.mount();
  }
  return strapiInstance;
}

async function cleanupStrapi() {
  if (!strapiInstance) return;

  // Close server first
  await strapiInstance.server.httpServer.close();

  // Close database connection
  await strapiInstance.db.connection.destroy();

  // Destroy strapi instance
  await strapiInstance.destroy();
  strapiInstance = null;

  // Remove entire .tmp directory
  const tmpDir = path.join(process.cwd(), ".tmp");
  if (fs.existsSync(tmpDir)) {
    await removeDirectory(tmpDir);
  }
}

// Helper function to recursively remove directory
async function removeDirectory(dirPath) {
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath);

    for (const file of files) {
      const curPath = path.join(dirPath, file);
      if (fs.lstatSync(curPath).isDirectory()) {
        await removeDirectory(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    }
    fs.rmdirSync(dirPath);
  }
}

module.exports = { setupStrapi, cleanupStrapi };
