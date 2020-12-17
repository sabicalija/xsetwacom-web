const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getAll = async (req, res, next) => {
  res.status(200).json(await getAllDevices());
};

async function getAllDevices() {
  let result = [];
  try {
    const { stdout } = await exec("xsetwacom --list devices");
    const devices = stdout.replace(/\t/g, " ").split("\n");
    for (device of devices) {
      try {
        const [
          m,
          name,
          id,
          type,
        ] = /^(.*)\s+id:\s+(.*?)\s+type:\s+(.*)\s+$/.exec(device);
        result.push({ name: name.trim(), id: Number(id), type: type.trim() });
      } catch {}
    }
  } catch {}
  return result;
}

module.exports = { getAll };
