const si = require('systeminformation');

exports.getStorageInfo = async () => {
	const storage = await si.fsSize();
	const filtered = storage.filter((s) => s.rw !== false);
	return filtered;
};
