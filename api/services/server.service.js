const si = require("systeminformation");
const axios = require("axios");

exports.getServerInfo = async () => {
  try {
    const os = await si.osInfo();
    return {
      architecture: os.arch, // CPU architecture (e.g., x64)
      distro: os.distro, // OS distribution name (e.g., Ubuntu)
      release: os.release, // OS release version
      hostname: os.hostname, // Hostname of the machine
      platform: os.platform, // OS platform (e.g., linux, win32)
    };
  } catch (error) {
    console.error("Error fetching server info:", error);
    throw error;
  }
};

exports.getUptimeAndTimezone = async () => {
  try {
    const time = await si.time();
    const upTime = time.uptime;
    const timeZone = time.timezone;
    return {
      upTime,
      timeZone,
    };
  } catch (error) {
    console.error("Error fetching server uptime | timezone:", error);
    throw error;
  }
};

exports.getLocation = async () => {
  try {
    const ipRes = await axios.get("https://api.ipify.org?format=json");
    const ip = ipRes.data.ip;

    const geoRes = await axios.get(`https://ipapi.co/${ip}/json/`);
    return {
      city: geoRes.data.city,
      region: geoRes.data.region,
      country: geoRes.data.country
    }
  } catch (err) {
    console.error("Error getting server location:", err.message);
    throw err;
  }
};
