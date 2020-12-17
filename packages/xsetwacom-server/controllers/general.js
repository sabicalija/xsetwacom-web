const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getSupport = async (req, res, next) => {
  res.status(200).json({ xsetwacom: await isXsetwacomSupport() });
};

async function isXsetwacomSupport() {
  let result = false;
  try {
    const { stdout } = await exec("which xsetwacom");
    if (stdout) {
      result = true;
    }
  } catch {}
  return result;
}

module.exports = { getSupport };
