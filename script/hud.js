/* ============================================================
   HUD.JS - Interactive logic for the Blade Runner HUD
   ============================================================ */

const projHTML = {
  radar: `<div class="proj-vis radar-vis hud-override"><div class="vis-bg-grid"></div><div class="vis-overlay-text">RAG_COPILOT: ACTIVE</div><div class="radar-rings"><div class="ring r1"></div><div class="ring r2"></div><div class="ring r3"></div></div><div class="radar-sweep"></div><div class="radar-targets"><div class="target t1"></div><div class="target t2"></div><div class="target t3"></div><div class="target t4"></div></div></div>`,
  pipeline: `<div class="proj-vis circuit-vis hud-override"><div class="vis-bg-grid"></div><div class="vis-overlay-text">ORCHESTRATOR</div><div class="circuit-paths"><div class="c-path h1"><div class="c-packet"></div></div><div class="c-path v1"><div class="c-packet" style="animation-delay:0.5s"></div></div><div class="c-path h2"><div class="c-packet" style="animation-delay:1s"></div></div><div class="c-path h3"><div class="c-packet" style="animation-delay:0.2s"></div></div></div><div class="circuit-nodes"><div class="c-node n1"></div><div class="c-node n2"></div><div class="c-node n3"></div><div class="c-node n4"></div></div></div>`,
  vector: `<div class="proj-vis hex-vis hud-override"><div class="vis-bg-grid"></div><div class="vis-overlay-text">VECTOR_DB</div><div class="hex-grid">0x4F2A 0x11B3 0x99FA 0x22C1 0x00FF 0xAA22 0x4F2A 0x11B3 0x99FA 0x22C1 0x22C1 0x00FF 0xAA22 0x4F2A 0x11B3 0x99FA 0x4F2A 0x11B3 0x99FA 0x22C1 0x99FA 0x22C1 0x00FF 0xAA22 0x4F2A 0x11B3 0x4F2A 0x11B3 0x99FA 0x00FF 0x00FF 0xAA22 0x4F2A 0x11B3 0x99FA 0x22C1 0xAA22 0x4F2A 0x11B3 0x99FA 0x4F2A 0x11B3 0x99FA 0x22C1 0x00FF 0xAA22 0x4F2A 0x11B3 0x99FA 0x22C1</div><div class="hex-scanner"></div></div>`,
  chart: `<div class="proj-vis spectrum-vis hud-override"><div class="vis-bg-grid"></div><div class="vis-overlay-text">AGGREGATION</div><div class="spectrum-bars"><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div><div class="s-bar"></div></div></div>`
};

const projectsData = [
  {
    id: 'proj-1',
    visHtml: projHTML.radar,
    title: '> JAMHUR_PLATFORM',
    desc: 'Civic action platform with AI copilot and geospatial mapping. Status: DEPLOYED.',
    tech: 'NODE / MONGODB / BULLMQ / VERCEL_AI'
  },
  {
    id: 'proj-2',
    visHtml: projHTML.pipeline,
    title: '> AI_DISPUTE_ENGINE',
    desc: 'Hybrid Orchestration Pipeline. 5-stage dispute resolution engine combining deterministic Node.js logic with LLM synthesis.',
    tech: 'NODE / POSTGRESQL / GOOGLE_GEMINI'
  },
  {
    id: 'proj-3',
    visHtml: projHTML.vector,
    title: '> DOCENT_ASSISTANT',
    desc: 'Hybrid RAG architecture combining Qdrant vector search with BAAI cross-encoder semantic reranking.',
    tech: 'REACT / FASTAPI / QDRANT / DOCKER'
  },
  {
    id: 'proj-4',
    visHtml: projHTML.chart,
    title: '> FILM_ANALYTICS',
    desc: 'Local-first analytics dashboard for visualizing personal IMDb viewing history. Processes ratings data.',
    tech: 'REACT / TYPESCRIPT / APEXCHARTS'
  },
  {
    id: 'proj-5',
    visHtml: projHTML.pipeline,
    title: '> MUGHAL_ELECTRONICS',
    desc: 'Full-stack e-commerce with AI chatbot and comprehensive test suite.',
    tech: 'MERN / TAILWIND / JEST / CYPRESS'
  },
  {
    id: 'proj-6',
    visHtml: projHTML.vector,
    title: '> REEL_VISION',
    desc: 'AI Batch URL Extractor. Vision LLM pipeline extracting URLs from Instagram reel frames.',
    tech: 'PYTHON / FFMPEG / GEMINI_VISION'
  },
  {
    id: 'proj-7',
    visHtml: projHTML.pipeline,
    title: '> NLP_PROCESSOR',
    desc: 'Multilingual NLP Complaint Processor with Roman Urdu NER and intent classification.',
    tech: 'PYTHON / NLP / TRANSFORMERS'
  },
  {
    id: 'proj-8',
    visHtml: projHTML.chart,
    title: '> FX_STORE',
    desc: 'Desktop E-Commerce built with Java 21 + JavaFX, clean MVC + DAO.',
    tech: 'JAVA / JAVAFX / MYSQL / JDBC'
  },
  {
    id: 'proj-9',
    visHtml: projHTML.radar,
    title: '> ACADEMIC_SYSTEMS',
    desc: 'Route Navigation (Dijkstra\'s), Hostel Portal, Real-Time Stock System.',
    tech: 'JAVA / NODE / MONGODB'
  }
];

// HUD Initialization
window.addEventListener('hud-activated', () => {
  startTerminalFeed();
});

// ── Project Navigation ──
const navBtns = document.querySelectorAll('.hud-nav-btn');
const projDisplay = document.getElementById('hud-proj-display');

navBtns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    // Update active state
    navBtns.forEach(b => b.classList.remove('active'));
    e.target.classList.add('active');

    // Get Data
    const targetId = e.target.getAttribute('data-target');
    const data = projectsData.find(p => p.id === targetId);

    if (data && projDisplay) {
      // Re-trigger CSS animation
      projDisplay.style.animation = 'none';
      projDisplay.offsetHeight; // trigger reflow
      projDisplay.style.animation = 'hud-glitch-in 0.3s ease-out';

      // Update HTML
      projDisplay.innerHTML = `
        <div class="hud-proj-img">
          <div class="img-wireframe"></div>
          ${data.visHtml}
        </div>
        <div class="hud-proj-info">
          <h2 class="hud-proj-title">${data.title}</h2>
          <p class="hud-proj-desc">${data.desc}</p>
          <div class="hud-proj-tech">${data.tech}</div>
        </div>
      `;
    }
  });
});

// ── Terminal Feed Simulation ──
let feedInterval;
function startTerminalFeed() {
  const terminal = document.getElementById('hud-terminal');
  if (!terminal) return;
  
  terminal.innerHTML = ''; // clear
  clearInterval(feedInterval);

  const logs = [
    "INIT SYSTEM KERNEL...",
    "LOADING SUBJECT METADATA...",
    "FETCHING ACADEMIC_RECORDS... OK (CGPA: 3.91)",
    "ANALYZING SKILL MATRIX...",
    "REACT_TS_NODE: VALIDATED",
    "PYTHON_RAG_AI: VALIDATED",
    "DOCKER_REDIS_BULLMQ: ACTIVE",
    "EVALUATING NSCT METRICS... 99.6 PERCENTILE",
    "SYNCING GITHUB REPOSITORIES...",
    "JAMHUR [CIVIC_TECH] DEPLOYED",
    "FILM_ANALYTICS DEPLOYED",
    "SYSTEM READY."
  ];

  let logIndex = 0;
  
  // Add initial lines fast
  for(let i=0; i<3; i++) {
    addLogLine(logs[logIndex++]);
  }

  // Slowly drip the rest
  feedInterval = setInterval(() => {
    if (logIndex >= logs.length) {
      // Generate random hex dumps for infinite feed
      const hex = Array.from({length: 8}, () => Math.floor(Math.random()*16).toString(16)).join('');
      addLogLine(`0x${hex}  SYS_OP_NOP`);
    } else {
      addLogLine(logs[logIndex++]);
    }
  }, 800);

  function addLogLine(text) {
    const el = document.createElement('div');
    el.className = 'term-line';
    el.textContent = `> ${text}`;
    terminal.appendChild(el);
    
    // Keep only last 15 lines
    if (terminal.children.length > 15) {
      terminal.removeChild(terminal.firstChild);
    }
  }
}

// ── Live Hex Data Stream ──
let streamInterval;
function startDataStream() {
  const streamEl = document.getElementById('hud-stream');
  if (!streamEl) return;
  streamEl.innerHTML = '';
  
  if (streamInterval) clearInterval(streamInterval);
  
  const prefixes = ['SYNC_MEM', 'ALLOC', 'V_KAMPFF', 'SEC_OVERRIDE', 'TELEMETRY'];
  
  streamInterval = setInterval(() => {
    const hex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
    const pre = prefixes[Math.floor(Math.random() * prefixes.length)];
    
    const p = document.createElement('p');
    p.textContent = `> ${pre} // 0x${hex}`;
    
    streamEl.appendChild(p);
    
    if (streamEl.children.length > 5) {
      streamEl.removeChild(streamEl.firstChild);
    }
  }, 300);
}

// Start stream when HUD opens, stop when closes
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.target.classList.contains('active')) {
      startDataStream();
    } else {
      if (streamInterval) clearInterval(streamInterval);
    }
  });
});

const overlay = document.getElementById('hud-overlay');
if (overlay) {
    observer.observe(overlay, { attributes: true, attributeFilter: ['class'] });
}

// Clear interval when closing HUD
document.getElementById('btn-exit-hud')?.addEventListener('click', () => {
  clearInterval(feedInterval);
});
