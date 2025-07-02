const terminal = document.getElementById('terminal');
const toggleBtn = document.getElementById('toggle-theme');

toggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  toggleBtn.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
});

const lines = [
  { p: 'shoaib@intro:~$', c: 'whoami', o: 'A Curious SE Student, interested in everything CS and Engineering and more' },
  { p: 'shoaib@intro:~$', c: 'skills --list', o: 'Web Dev, MERN Stack, Software Testing, Java, JavaFX, C++, Tailwind, SASS, Cypress, ...' },
  { p: 'shoaib@intro:~$', c: 'projects', o: '↳ mern elecronics store web app\n↳ javafx mvc desktop app\n↳ Multithreaded socket programming stock updates system' },
  { p: 'shoaib@intro:~$', c: '', o: '' } // Final blinking prompt
];

let idx = -1;

function type(text, el, i = 0, done = () => {}) {
  if (i >= text.length) return done();
  el.textContent += text.charAt(i);
  terminal.scrollTop = terminal.scrollHeight;
  setTimeout(() => type(text, el, i + 1, done), 25 + Math.random() * 30);
}

function typeOutput(output, callback) {
  const lines = output.split('\n');
  let printed = 0;

  function printLine() {
    if (printed >= lines.length) return callback();
    const div = document.createElement('div');
    div.className = 'output line';
    terminal.appendChild(div);
    type(lines[printed], div, 0, () => {
      printed++;
      printLine();
    });
  }

  printLine();
}

function addLine() {
  idx++;
  if (idx >= lines.length) return;

  const { p, c, o } = lines[idx];
  const lineDiv = document.createElement('div');
  lineDiv.className = 'line';

  const promptSpan = document.createElement('span');
  promptSpan.className = 'prompt';
  promptSpan.textContent = p + ' ';

  const commandSpan = document.createElement('span');
  commandSpan.className = 'command';

  if (idx === lines.length - 1) {
    commandSpan.classList.add('caret');
  }

  lineDiv.appendChild(promptSpan);
  lineDiv.appendChild(commandSpan);
  terminal.appendChild(lineDiv);

  if (c) {
    type(c, commandSpan, 0, () => {
      if (o) {
        typeOutput(o, nextLine);
      } else {
        nextLine();
      }
    });
  } else {
    nextLine();
  }

  terminal.scrollTop = terminal.scrollHeight;
}

function nextLine() {
  setTimeout(() => addLine(), 800);
}

function startTerminal() {
  terminal.textContent = '';
  idx = -1;
  nextLine();
}

startTerminal();
