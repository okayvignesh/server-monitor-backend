const si = require("systeminformation");

exports.fetchCpuUsage = async () => {
  const load = await si.currentLoad();
  return load.currentLoad.toFixed(2);
};

exports.getCpuInfo = async () => {
  const cpu = await si.cpu();
  return {
    manufacturer: cpu.manufacturer,
    brand: cpu.brand,
    speed: cpu.speed,
    cores: cpu.cores,
  };
};
