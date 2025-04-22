
const { spawn } = require('child_process');
const path = require('path');

// Function to check if Python is installed
async function checkPython() {
  return new Promise((resolve) => {
    const python = spawn('python', ['--version']);
    python.on('exit', (code) => {
      resolve(code === 0);
    });
  });
}

// Function to install Python dependencies
function installPythonDeps() {
  console.log('Installing Python dependencies...');
  const pip = spawn('pip', ['install', '-r', 'backend/requirements.txt'], {
    stdio: 'inherit'
  });

  return new Promise((resolve, reject) => {
    pip.on('exit', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(new Error('Failed to install Python dependencies'));
      }
    });
  });
}

// Function to start the Flask server
function startFlaskServer() {
  console.log('Starting Flask server...');
  const flask = spawn('python', ['backend/app.py'], {
    stdio: 'inherit'
  });

  flask.on('error', (err) => {
    console.error('Failed to start Flask server:', err);
  });

  return flask;
}

// Function to start the frontend
function startFrontend() {
  console.log('Starting frontend...');
  const npm = spawn('npm', ['run', 'dev'], {
    stdio: 'inherit'
  });

  npm.on('error', (err) => {
    console.error('Failed to start frontend:', err);
  });

  return npm;
}

// Main function to start everything
async function main() {
  try {
    const hasPython = await checkPython();
    if (!hasPython) {
      console.error('Python is not installed. Please install Python first.');
      process.exit(1);
    }

    await installPythonDeps();
    const flaskProcess = startFlaskServer();
    const frontendProcess = startFrontend();

    // Handle cleanup on exit
    process.on('SIGINT', () => {
      flaskProcess.kill();
      frontendProcess.kill();
      process.exit();
    });

  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

main();
