const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getSupport = async (req, res, next) => {
  res
    .status(200)
    .json({
      xsetwacom: await isSupported("xsetwacom"),
      "nvidia-settings": await isSupported("nvidia-settings"),
      xrandr: await isSupported("xrandr"),
    });
};

async function isSupported(command) {
  let result = false;
  try {
    const { stdout } = await exec(`which ${command}`);
    if (stdout) {
      result = true;
    }
  } catch {}
  return result;
}

module.exports = { getSupport };
