const express = require('express');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const pty = require('node-pty');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

const port = process.env.PORT || 5000;

app.use(express.static(path.join(__dirname, 'public')));
app.use('/xterm', express.static(path.join(__dirname, 'node_modules', 'xterm')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'templates', 'index.html'));
});

io.on('connection', (socket) => {
  console.log(`📡 New socket connected: ${socket.id}`);

  // Use /bin/bash for WSL
  const shell = '/bin/bash';

  try {
    const ptyProcess = pty.spawn(shell, ['--login'], {
      name: 'xterm-color',
      cols: 80,
      rows: 30,
      cwd: process.env.HOME || '/',
      env: process.env
    });

    ptyProcess.onData((data) => {
      console.log(`[PTY → Client]: ${data}`);
      socket.emit('terminal.data', data);
    });

    socket.on('terminal.keystroke', (data) => {
      console.log(`[Client → PTY]: ${data}`);
      ptyProcess.write(data);
    });

    socket.on('terminal.init', () => {
      ptyProcess.write('clear\n');
    });

    socket.on('disconnect', () => {
      console.log(`❌ Socket disconnected: ${socket.id}`);
      ptyProcess.kill();
    });
  } catch (err) {
    console.error(`❌ Error spawning shell: ${err.message}`);
    socket.emit('terminal.data', `Shell error: ${err.message}\r\n`);
  }
});

server.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
