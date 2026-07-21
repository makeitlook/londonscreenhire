import { writeFileSync, mkdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const outDir = join(root, "public/images/services");

mkdirSync(outDir, { recursive: true });

/** Generate a grid of LED pixel dots */
function ledGrid(cols, rows, x0, y0, gap, size, color, opacity) {
  const dots = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push(
        `<rect x="${x0 + c * gap}" y="${y0 + r * gap}" width="${size}" height="${size}" rx="1" fill="${color}" opacity="${opacity}"/>`,
      );
    }
  }
  return dots.join("\n  ");
}

const svgMap = {
  "led-screen-hire-london": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#0d1219"/>
      <stop offset="100%" stop-color="#050709"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <!-- Large video wall panel outline -->
  <rect x="160" y="100" width="880" height="475" rx="3" fill="#0a0d14" stroke="#0868f7" stroke-width="1.5" stroke-opacity="0.4"/>
  <!-- Panel grid lines -->
  ${[1, 2, 3, 4].map((i) => `<line x1="${160 + i * 176}" y1="100" x2="${160 + i * 176}" y2="575" stroke="#0868f7" stroke-width="0.5" stroke-opacity="0.2"/>`).join("\n  ")}
  ${[1, 2, 3].map((i) => `<line x1="160" y1="${100 + i * 118}" x2="1040" y2="${100 + i * 118}" stroke="#0868f7" stroke-width="0.5" stroke-opacity="0.2"/>`).join("\n  ")}
  <!-- Pixel dot clusters -->
  ${ledGrid(18, 10, 200, 130, 22, 8, "#0868f7", "0.35")}
  ${ledGrid(10, 6, 650, 220, 22, 8, "#4da3ff", "0.2")}
  <!-- Bright accent cluster -->
  <rect x="420" y="240" width="360" height="195" rx="2" fill="#0868f7" fill-opacity="0.06"/>
  <rect x="420" y="240" width="360" height="195" rx="2" fill="none" stroke="#0868f7" stroke-width="1" stroke-opacity="0.5"/>
</svg>`,

  "indoor-led-screen-hire": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#070a0f"/>
  <!-- Venue ceiling suggestion -->
  <rect x="0" y="0" width="1200" height="80" fill="#0a0e15"/>
  <!-- Rigging bars -->
  <line x1="200" y1="40" x2="1000" y2="40" stroke="#1a2030" stroke-width="6"/>
  <line x1="280" y1="40" x2="280" y2="110" stroke="#1a2030" stroke-width="3"/>
  <line x1="600" y1="40" x2="600" y2="110" stroke="#1a2030" stroke-width="3"/>
  <line x1="920" y1="40" x2="920" y2="110" stroke="#1a2030" stroke-width="3"/>
  <!-- Main LED screen -->
  <rect x="240" y="110" width="720" height="400" rx="2" fill="#08111e" stroke="#0868f7" stroke-width="2" stroke-opacity="0.6"/>
  <!-- Screen content pattern -->
  ${ledGrid(24, 13, 260, 130, 28, 10, "#0868f7", "0.25")}
  <!-- Bright horizontal band on screen -->
  <rect x="240" y="270" width="720" height="80" fill="#0868f7" fill-opacity="0.08"/>
  <!-- Floor line -->
  <rect x="0" y="560" width="1200" height="115" fill="#060810"/>
  <line x1="0" y1="560" x2="1200" y2="560" stroke="#1a2030" stroke-width="1.5"/>
</svg>`,

  "outdoor-led-screen-hire": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#050810"/>
      <stop offset="60%" stop-color="#080d18"/>
      <stop offset="100%" stop-color="#0a0f1a"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#sky)"/>
  <!-- Ground -->
  <rect x="0" y="520" width="1200" height="155" fill="#06090e"/>
  <line x1="0" y1="520" x2="1200" y2="520" stroke="#111722" stroke-width="2"/>
  <!-- Left truss leg -->
  <rect x="260" y="120" width="18" height="400" rx="2" fill="#111820"/>
  <!-- Right truss leg -->
  <rect x="922" y="120" width="18" height="400" rx="2" fill="#111820"/>
  <!-- Top truss bar -->
  <rect x="252" y="108" width="696" height="24" rx="3" fill="#131c28"/>
  <!-- LED screen panel -->
  <rect x="290" y="132" width="620" height="348" rx="2" fill="#050c18" stroke="#0868f7" stroke-width="1.5" stroke-opacity="0.5"/>
  ${ledGrid(20, 11, 308, 150, 29, 10, "#0868f7", "0.3")}
  <!-- Bright spot on screen -->
  <rect x="430" y="230" width="340" height="190" rx="1" fill="#0868f7" fill-opacity="0.07"/>
  <!-- Ground stakes -->
  <rect x="264" y="516" width="10" height="30" fill="#0c1520" rx="1"/>
  <rect x="926" y="516" width="10" height="30" fill="#0c1520" rx="1"/>
</svg>`,

  "wedding-led-screen-hire": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#080c14"/>
      <stop offset="100%" stop-color="#05070c"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#0868f7" stop-opacity="0.12"/>
      <stop offset="100%" stop-color="#0868f7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <!-- Soft glow from screen -->
  <ellipse cx="600" cy="338" rx="500" ry="280" fill="url(#glow)"/>
  <!-- Elegant arch suggestion -->
  <path d="M380 560 Q380 200 600 160 Q820 200 820 560" fill="none" stroke="#0868f7" stroke-width="1" stroke-opacity="0.25"/>
  <!-- LED backdrop panel -->
  <rect x="320" y="140" width="560" height="340" rx="3" fill="#07101f" stroke="#0868f7" stroke-width="1.5" stroke-opacity="0.5"/>
  ${ledGrid(18, 11, 338, 158, 29, 10, "#0868f7", "0.2")}
  <!-- Warm highlight sweep -->
  <rect x="320" y="280" width="560" height="80" fill="#4080ff" fill-opacity="0.06"/>
  <!-- Decorative border lines -->
  <rect x="308" y="128" width="584" height="364" rx="5" fill="none" stroke="#0868f7" stroke-width="0.75" stroke-opacity="0.2"/>
  <!-- Floor area -->
  <rect x="0" y="560" width="1200" height="115" fill="#050710"/>
  <line x1="100" y1="560" x2="1100" y2="560" stroke="#0d1525" stroke-width="1"/>
</svg>`,

  "conference-led-screen-hire": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#070a0f"/>
  <!-- Stage floor -->
  <rect x="0" y="460" width="1200" height="215" fill="#060810"/>
  <line x1="0" y1="460" x2="1200" y2="460" stroke="#111820" stroke-width="1.5"/>
  <!-- Podium -->
  <rect x="540" y="390" width="120" height="70" rx="2" fill="#0d1525"/>
  <!-- Main conference screen -->
  <rect x="200" y="100" width="800" height="340" rx="2" fill="#060e1c" stroke="#0868f7" stroke-width="1.5" stroke-opacity="0.55"/>
  ${ledGrid(26, 11, 220, 118, 29, 10, "#0868f7", "0.22")}
  <!-- Slide content suggestion — horizontal bands -->
  <rect x="220" y="130" width="300" height="14" rx="2" fill="#0868f7" fill-opacity="0.35"/>
  <rect x="220" y="158" width="220" height="8" rx="2" fill="#0868f7" fill-opacity="0.18"/>
  <rect x="220" y="178" width="260" height="8" rx="2" fill="#0868f7" fill-opacity="0.14"/>
  <!-- Speaker camera suggestion -->
  <circle cx="975" cy="218" r="28" fill="#0a1422" stroke="#0868f7" stroke-width="1" stroke-opacity="0.4"/>
  <circle cx="975" cy="218" r="14" fill="#0868f7" fill-opacity="0.2"/>
  <!-- Confidence monitor (small) -->
  <rect x="560" y="340" width="80" height="50" rx="1" fill="#080f1c" stroke="#0868f7" stroke-width="1" stroke-opacity="0.3"/>
</svg>`,

  "exhibition-led-screen-hire": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#06090d"/>
  <!-- Hall ceiling grid -->
  ${[0, 1, 2, 3, 4, 5].map((i) => `<line x1="${i * 240}" y1="0" x2="${i * 240}" y2="80" stroke="#0d1520" stroke-width="1"/>`).join("\n  ")}
  <rect x="0" y="0" width="1200" height="70" fill="#080c14"/>
  <!-- Stand back wall -->
  <rect x="120" y="70" width="960" height="490" rx="0" fill="#070c18"/>
  <!-- Main video wall (seamless multi-panel) -->
  <rect x="200" y="100" width="800" height="420" rx="1" fill="#050d1c"/>
  <!-- Panel seams -->
  ${[1, 2, 3].map((i) => `<line x1="${200 + i * 200}" y1="100" x2="${200 + i * 200}" y2="520" stroke="#0d1828" stroke-width="1.5"/>`).join("\n  ")}
  ${[1, 2].map((i) => `<line x1="200" y1="${100 + i * 140}" x2="1000" y2="${100 + i * 140}" stroke="#0d1828" stroke-width="1.5"/>`).join("\n  ")}
  <!-- Panel content: LED dots -->
  ${ledGrid(26, 13, 216, 116, 29, 10, "#0868f7", "0.28")}
  <!-- Outer wall border -->
  <rect x="200" y="100" width="800" height="420" rx="1" fill="none" stroke="#0868f7" stroke-width="1.5" stroke-opacity="0.4"/>
  <!-- Floor -->
  <rect x="0" y="560" width="1200" height="115" fill="#040608"/>
  <line x1="0" y1="560" x2="1200" y2="560" stroke="#0c1220" stroke-width="1"/>
</svg>`,

  "corporate-av-hire": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#060a10"/>
      <stop offset="100%" stop-color="#04070c"/>
    </linearGradient>
  </defs>
  <rect width="1200" height="675" fill="url(#bg)"/>
  <!-- Stage riser -->
  <rect x="0" y="490" width="1200" height="40" rx="0" fill="#090e18"/>
  <rect x="0" y="530" width="1200" height="145" fill="#060910"/>
  <!-- Truss bar above -->
  <rect x="100" y="60" width="1000" height="20" rx="3" fill="#0e1828"/>
  <!-- Drop bars from truss -->
  ${[150, 300, 460, 600, 740, 900, 1050].map((i) => `<line x1="${i}" y1="80" x2="${i}" y2="140" stroke="#0e1828" stroke-width="4"/>`).join("\n  ")}
  <!-- Lighting heads on truss (circles) -->
  ${[150, 300, 460, 600, 740, 900, 1050].map((x, i) => `<circle cx="${x}" cy="148" r="14" fill="${i === 3 ? "#0868f7" : "#0c1625"}" fill-opacity="${i === 3 ? "0.8" : "1"}" stroke="#0868f7" stroke-width="1" stroke-opacity="0.4"/>`).join("\n  ")}
  <!-- Main LED screen -->
  <rect x="280" y="140" width="640" height="350" rx="2" fill="#060e1e" stroke="#0868f7" stroke-width="1.5" stroke-opacity="0.5"/>
  ${ledGrid(20, 11, 298, 158, 30, 11, "#0868f7", "0.25")}
  <!-- Speaker return monitor (wedge shape) -->
  <polygon points="500,490 540,490 530,510 510,510" fill="#0c1525"/>
  <polygon points="660,490 700,490 690,510 670,510" fill="#0c1525"/>
  <!-- Audio speakers (rectangles either side) -->
  <rect x="140" y="280" width="100" height="180" rx="3" fill="#090f1c" stroke="#131e30" stroke-width="1"/>
  <circle cx="190" cy="330" r="24" fill="#0d1828" stroke="#0868f7" stroke-width="1" stroke-opacity="0.3"/>
  <rect x="960" y="280" width="100" height="180" rx="3" fill="#090f1c" stroke="#131e30" stroke-width="1"/>
  <circle cx="1010" cy="330" r="24" fill="#0d1828" stroke="#0868f7" stroke-width="1" stroke-opacity="0.3"/>
</svg>`,

  "stage-hire": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <rect width="1200" height="675" fill="#060810"/>
  <!-- Backdrop wall -->
  <rect x="0" y="0" width="1200" height="480" fill="#07090f"/>
  <!-- Main stage deck -->
  <rect x="100" y="420" width="1000" height="60" rx="2" fill="#0c1420"/>
  <!-- Stage edge highlight -->
  <line x1="100" y1="420" x2="1100" y2="420" stroke="#0868f7" stroke-width="1.5" stroke-opacity="0.5"/>
  <!-- Truss uprights -->
  <rect x="160" y="100" width="16" height="322" rx="2" fill="#101a28"/>
  <rect x="1024" y="100" width="16" height="322" rx="2" fill="#101a28"/>
  <!-- Top truss bar -->
  <rect x="148" y="86" width="904" height="22" rx="3" fill="#0e1828"/>
  <!-- Cross bracing on truss -->
  <line x1="176" y1="108" x2="320" y2="200" stroke="#0d1625" stroke-width="2"/>
  <line x1="320" y1="108" x2="176" y2="200" stroke="#0d1625" stroke-width="2"/>
  <line x1="880" y1="108" x2="1024" y2="200" stroke="#0d1625" stroke-width="2"/>
  <line x1="1024" y1="108" x2="880" y2="200" stroke="#0d1625" stroke-width="2"/>
  <!-- Stage steps left -->
  <rect x="60" y="440" width="80" height="18" fill="#0a1320"/>
  <rect x="50" y="458" width="90" height="18" fill="#091220"/>
  <!-- Stage steps right -->
  <rect x="1060" y="440" width="80" height="18" fill="#0a1320"/>
  <rect x="1060" y="458" width="90" height="18" fill="#091220"/>
  <!-- LED screen on truss -->
  <rect x="340" y="108" width="520" height="290" rx="2" fill="#060d1c" stroke="#0868f7" stroke-width="1.5" stroke-opacity="0.5"/>
  ${ledGrid(17, 9, 356, 124, 29, 10, "#0868f7", "0.28")}
  <!-- Floor -->
  <rect x="0" y="560" width="1200" height="115" fill="#04060a"/>
  <line x1="0" y1="560" x2="1200" y2="560" stroke="#0b1120" stroke-width="1"/>
</svg>`,

  "lighting-hire": `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="675" viewBox="0 0 1200 675">
  <defs>
    <radialGradient id="beam1" cx="30%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#0868f7" stop-opacity="0.18"/>
      <stop offset="100%" stop-color="#0868f7" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="beam2" cx="70%" cy="0%" r="80%">
      <stop offset="0%" stop-color="#4080ff" stop-opacity="0.14"/>
      <stop offset="100%" stop-color="#4080ff" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="beam3" cx="50%" cy="0%" r="60%">
      <stop offset="0%" stop-color="#0868f7" stop-opacity="0.1"/>
      <stop offset="100%" stop-color="#0868f7" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1200" height="675" fill="#050709"/>
  <!-- Atmosphere beams -->
  <rect width="1200" height="675" fill="url(#beam1)"/>
  <rect width="1200" height="675" fill="url(#beam2)"/>
  <rect width="1200" height="675" fill="url(#beam3)"/>
  <!-- Top rigging bar -->
  <rect x="80" y="50" width="1040" height="18" rx="3" fill="#0c1828"/>
  <!-- Moving head bodies -->
  ${[180, 380, 600, 820, 1020]
    .map(
      (x, i) => `
  <rect x="${x - 18}" y="68" width="36" height="28" rx="3" fill="#0c1828"/>
  <ellipse cx="${x}" cy="108" rx="18" ry="22" fill="${i === 2 ? "#0868f7" : "#0a1525"}" fill-opacity="${i === 2 ? "0.6" : "1"}" stroke="#0868f7" stroke-width="1" stroke-opacity="0.5"/>
  `,
    )
    .join("")}
  <!-- Light beam cones (triangle paths) -->
  <polygon points="180,130 60,560 300,560" fill="#0868f7" fill-opacity="0.04"/>
  <polygon points="600,130 380,560 820,560" fill="#4080ff" fill-opacity="0.05"/>
  <polygon points="1020,130 900,560 1140,560" fill="#0868f7" fill-opacity="0.04"/>
  <!-- Floor wash circles -->
  <ellipse cx="180" cy="545" rx="120" ry="20" fill="#0868f7" fill-opacity="0.08"/>
  <ellipse cx="600" cy="545" rx="200" ry="24" fill="#4080ff" fill-opacity="0.07"/>
  <ellipse cx="1020" cy="545" rx="120" ry="20" fill="#0868f7" fill-opacity="0.08"/>
  <!-- Floor -->
  <rect x="0" y="555" width="1200" height="120" fill="#040609"/>
  <line x1="0" y1="555" x2="1200" y2="555" stroke="#0c1525" stroke-width="1"/>
</svg>`,
};

for (const [slug, svg] of Object.entries(svgMap)) {
  writeFileSync(join(outDir, `${slug}.svg`), svg, "utf8");
  console.log(`Created ${slug}.svg`);
}

console.log("All placeholder images generated.");
