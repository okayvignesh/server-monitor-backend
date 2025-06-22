const si = require('systeminformation');
const fs = require('fs').promises;
const os = require('os');
const { exec } = require('child_process');

exports.fetchCpuUsage = async () => {
	const load = await si.currentLoad();
	return load.currentLoad.toFixed(2);
};

exports.getCpuInfo = async () => {
	try {
		const cpu = await si.cpu();
		const basicInfo = {
			manufacturer: cpu.manufacturer || 'Unknown',
			brand: cpu.brand || 'Unknown',
			speed: cpu.speed || 'N/A',
			cores: cpu.cores || os.cpus().length,
		};

		const isComplete =
			basicInfo.manufacturer !== 'Unknown' &&
			basicInfo.brand !== 'Unknown' &&
			basicInfo.speed !== 'N/A';

		if (isComplete) return basicInfo;

		const platform = os.platform();

		if (platform === 'linux') {
			try {
				const data = await fs.readFile('/proc/cpuinfo', 'utf8');
				const lines = data.split('\n');
				const info = {};

				for (const line of lines) {
					const [key, value] = line.split(':').map((s) => s.trim());
					if (!key || !value) continue;

					if (
						['hardware', 'model name', 'cpu part'].includes(key.toLowerCase())
					) {
						info[key] = value;
					}
				}

				return {
					manufacturer: 'ARM/Linux',
					brand:
						info['model name'] ||
						info['Hardware'] ||
						info['cpu part'] ||
						'Unknown ARM CPU',
					speed: 'N/A',
					cores: os.cpus().length,
				};
			} catch (err) {
        throw err
			}
		}

		if (platform === 'darwin') {
			return new Promise((resolve) => {
				exec('sysctl -n machdep.cpu.brand_string', (err, stdout) => {
					if (!err && stdout) {
						return resolve({
							manufacturer: 'Apple/Intel',
							brand: stdout.trim(),
							speed: 'N/A',
							cores: os.cpus().length,
						});
					} else {
						return resolve(basicInfo);
					}
				});
			});
		}

		if (platform === 'win32') {
			return new Promise((resolve) => {
				exec(
					'wmic cpu get Name,Manufacturer,NumberOfCores /format:csv',
					(err, stdout) => {
						if (!err && stdout) {
							const lines = stdout.trim().split('\n');
							const lastLine = lines[lines.length - 1];
							const parts = lastLine.split(',');

							return resolve({
								manufacturer: parts[1] || 'Unknown',
								brand: parts[2] || 'Unknown',
								speed: 'N/A',
								cores: parseInt(parts[3]) || os.cpus().length,
							});
						} else {
							return resolve(basicInfo);
						}
					}
				);
			});
		}

		return basicInfo;
	} catch (err) {
		return {
			error: 'Failed to get CPU info',
			details: err.message,
		};
	}
};
