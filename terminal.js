const socket = io();

const term = new Terminal({
  cursorBlink: true,
  theme: {
    background: "#1e1e1e",
    foreground: "#ffffff"
  }
});

term.open(document.getElementById('terminal'));
term.focus();

socket.emit('terminal.init');

term.onData(data => {
  socket.emit('terminal.keystroke', data);
});

socket.on('terminal.data', data => {
  term.write(data);
});
