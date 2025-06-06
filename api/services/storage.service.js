const si = require("systeminformation");

exports.getStorageInfo = () => {
  const storage = si.fsSize();
  return storage;
};
