const util = require("util");
const exec = util.promisify(require("child_process").exec);

const getScreens = async (req, res, next) => {
  res.status(200).json(await getAllScreens());
};

const getMonitors = async (req, res, next) => {
  res.status(200).json(await getAllDisplays());
};

async function getAllScreens() {
  let screens = [];
  try {
    const { stdout } = await exec("xrandr");
    const rScreen = /^Screen\s+(\d+):.*current\s+(\d+)\s+x\s+(\d+).*$/gm;
    let m;
    while ((m = rScreen.exec(stdout)) !== null) {
      const [_m, screen, width, height] = m;
      screens.push({
        screen: Number(screen),
        width: Number(width),
        height: Number(height),
      });
    }
  } catch {}
  return screens;
}

async function getAllDisplays() {
  let displays = [];
  try {
    const { stdout } = await exec("xrandr");
    const rMonitors = /^(.*)\s+connected\s+(primary\s+)?(\d+)x(\d+)\+(\d+)\+(\d+).*$/gm;
    while ((m = rMonitors.exec(stdout)) !== null) {
      const [_m, name, primary, width, height, x, y] = m;
      displays.push({
        name,
        primary: primary ? true : false,
        width: Number(width),
        height: Number(height),
        x: Number(x),
        y: Number(y),
      });
    }
    const { stdout: stdout2 } = await exec("nvidia-settings --query dpys");
    const rNvidiaDisplays = /^.*?\[(\d+)\].*?\((.*?)\)\s+\(connected,\s+enabled\)$/gm;
    let nDisplays = 0;
    while ((m = rNvidiaDisplays.exec(stdout2)) !== null) {
      const [_m, index, name] = m;
      const display = displays.find((display) => display.name === name);
      display.head = `HEAD-${nDisplays}`;
      nDisplays++;
    }
  } catch {}
  return displays;
}

module.exports = { getScreens, getMonitors };
