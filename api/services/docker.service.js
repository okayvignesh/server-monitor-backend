const si = require("systeminformation");

exports.getAllContainers = async () => {
  const containers = await si.dockerAll();
  const currentTime = Math.floor(Date.now() / 1000);

  return containers.map((container) => ({
    name: container.name,
    tag: container.image,
    uptime: container.state === "exited" ? 0 : currentTime - container.started,
    status: container.state,
  }));
};
