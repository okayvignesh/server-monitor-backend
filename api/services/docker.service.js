const si = require('systeminformation');
const { exec } = require('child_process');

function isDockerAvailable() {
	return new Promise((resolve) => {
		exec('docker info', (error) => {
			if (error) {
				resolve(false);
			} else {
				resolve(true);
			}
		});
	});
}

exports.getAllContainers = async () => {
	const isAvailable = await isDockerAvailable();

	if (!isAvailable) {
		return { error: 'Docker is not available or not running.' };
	}

	const containers = await si.dockerAll();
	const currentTime = Math.floor(Date.now() / 1000);

	return containers.map((container) => ({
		name: container.name,
		tag: container.image,
		uptime: container.state === 'exited' ? 0 : currentTime - container.started,
		status: container.state,
	}));
};
