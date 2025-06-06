const si = require("systeminformation");

exports.fetchMemoryUsage = async () => {
  const mem = await si.mem();
  const stats = {
    total: mem.total,
    used: mem.used,
    free: mem.free,
  };
  return stats;
};
