const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getAll = async (req, res, next) => {
  res.status(200).json(await getAllDevices());
};

const getDeviceOverview = async (req, res, next) => {
  res.status(200).json(await getDeviceData(req.params));
};

const mapToOutput = async (req, res, next) => {
  const id = req.body.id;
  const output = req.body.output;
  res.status(200).json(await mapOutput({ id, output }));
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

async function getDeviceData({ id }) {
  let result = {};
  try {
    const { stdout } = await exec(`xsetwacom --get ${id} all`);
    const options = stdout.split("\n");
    for (option of options) {
      try {
        const [m, name, value] = /^Option\s+\"(.*)\"\s\"(.*)\"$/.exec(option);
        result[name] = value;
      } catch {}
    }
  } catch {}
  return result;
}

async function mapOutput({ id, output }) {
  let display = false;
  try {
    await exec(`xsetwacom --set ${id} MapToOutput ${output}`);
    display = output;
  } catch {}
  return { option: "MapToOutput", id: Number(id), output: display };
}

module.exports = { getAll, getDeviceOverview, mapToOutput };
