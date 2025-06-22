#!/bin/bash

# === CONFIGURATION ===
BACKEND_REPO="https://github.com/okayvignesh/server-monitor-backend.git"
FRONTEND_REPO="https://github.com/okayvignesh/server-monitor-frontend.git"
BACKEND_DIR="/opt/server-monitor-backend"
FRONTEND_DIR="/opt/server-monitor-frontend"
NODE_VERSION_REQUIRED="18"

# === 1. Install Node.js if not present ===
install_node() {
  if ! command -v node >/dev/null 2>&1; then
    echo "Node.js not found. Installing Node.js..."
    curl -fsSL https://deb.nodesource.com/setup_${NODE_VERSION_REQUIRED}.x | bash -
    apt-get install -y nodejs
  else
    echo "Node.js already installed. Skipping..."
  fi
}

# === 2. Clone Repos ===
clone_repos() {
  echo "Cloning backend repo..."
  git clone $BACKEND_REPO $BACKEND_DIR || echo "Backend repo already cloned."

  echo "Cloning frontend repo..."
  git clone $FRONTEND_REPO $FRONTEND_DIR || echo "Frontend repo already cloned."
}

pull_repos() {
  echo "Pulling latest backend changes from repo.."
  cd $BACKEND_DIR && git pull

  echo "Pulling latest frontend changes from repo.."
  cd $FRONTEND_DIR && git pull
}

# === 3. Install Dependencies & Build ===
install_dependencies() {
  echo "Installing backend dependencies..."
  cd $BACKEND_DIR && npm install

  echo "Installing frontend dependencies..."
  cd $FRONTEND_DIR && npm install && npm run build
}

# === 4. Create systemd services ===
create_systemd_services() {
  echo "Creating backend systemd service..."

  cat > /etc/systemd/system/server-monitor-backend.service <<EOF
[Unit]
Description=Server Monitor Backend
After=network.target

[Service]
ExecStart=/usr/bin/node $BACKEND_DIR/server.js
WorkingDirectory=$BACKEND_DIR
Restart=always
RestartSec=3
Environment=NODE_ENV=production
User=ubuntu
Group=ubuntu

[Install]
WantedBy=multi-user.target
EOF

  echo "Creating frontend systemd service..."

  cat > /etc/systemd/system/server-monitor-frontend.service <<EOF
[Unit]
Description=Server Monitor Frontend (Next.js)
After=network.target

[Service]
ExecStart=/usr/bin/npm run start -- -p 4001
WorkingDirectory=$FRONTEND_DIR
Restart=always
RestartSec=3
Environment=NODE_ENV=production
User=nobody
Group=nogroup

[Install]
WantedBy=multi-user.target
EOF
}

# === 5. Start and Enable Services ===
enable_and_start_services() {
  sudo systemctl daemon-reload
  sudo systemctl enable server-monitor-backend
  sudo systemctl enable server-monitor-frontend
  sudo systemctl start server-monitor-backend
  sudo systemctl start server-monitor-frontend
  echo "✅ Services started and enabled on boot."
}

# === Run the Script ===
install_node
clone_repos
pull_repos
install_dependencies
create_systemd_services
enable_and_start_services
