// ── FIREBASE IMPORTS ──────────────────────────────────────────────────────────
import { initializeApp }                 from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ── FIREBASE CONFIG ───────────────────────────────────────────────────────────
const firebaseConfig = {
  apiKey:            "AIzaSyCV2jPE3ZF6KmBthaXfNtr3zip1S3ltr7o",
  authDomain:        "familien-einkauf.firebaseapp.com",
  databaseURL:       "https://familien-einkauf-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "familien-einkauf",
  storageBucket:     "familien-einkauf.firebasestorage.app",
  messagingSenderId: "143853494764",
  appId:             "1:143853494764:web:fb8ebe3a99f57b0fa9e0c9",
  measurementId:     "G-1FQ6EX27XS",
};

const firebaseApp = initializeApp(firebaseConfig);
const db          = getDatabase(firebaseApp);

// ── DATEN: KATEGORIEN ─────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:"obst",      name:"Obst & Gemüse",   emoji:"🥦", color:"#EAF3DE", text:"#2E6B2E" },
  { id:"fleisch",   name:"Fleisch & Fisch",  emoji:"🥩", color:"#FAECE7", text:"#8B3A1A" },
  { id:"milch",     name:"Milch & Käse",     emoji:"🧀", color:"#FEF5E4", text:"#7A4A0A" },
  { id:"brot",      name:"Brot & Gebäck",    emoji:"🍞", color:"#FFF3E0", text:"#A03610" },
  { id:"getraenke", name:"Getränke",          emoji:"🥤", color:"#E6F1FB", text:"#185FA5" },
  { id:"suesses",   name:"Süßes & Snacks",   emoji:"🍫", color:"#F0EEFD", text:"#4A41A0" },
  { id:"tiefkuehl", name:"Tiefkühlkost",     emoji:"❄️", color:"#E1F5EE", text:"#0F6E56" },
  { id:"haushalt",  name:"Haushalt",          emoji:"🧹", color:"#F1EFE8", text:"#4A4A40" },
  { id:"pflege",    name:"Körperpflege",      emoji:"🧴", color:"#FDE9F1", text:"#8B2050" },
  { id:"gewuerze",  name:"Gewürze & Öle",    emoji:"🫙", color:"#EDF5E1", text:"#2A5A0A" },
  { id:"konserven", name:"Konserven & Pasta", emoji:"🥫", color:"#E8EAF6", text:"#3F51B5" },
  { id:"sonstiges", name:"Sonstiges",         emoji:"📦", color:"#F1EFE8", text:"#5F5E5A" },
];

// ── DATEN: ARTIKEL ────────────────────────────────────────────────────────────
const ITEMS_DB = [
  {name:"Äpfel",emoji:"🍎",cat:"obst"},{name:"Bananen",emoji:"🍌",cat:"obst"},
  {name:"Orangen",emoji:"🍊",cat:"obst"},{name:"Tomaten",emoji:"🍅",cat:"obst"},
  {name:"Karotten",emoji:"🥕",cat:"obst"},{name:"Kartoffeln",emoji:"🥔",cat:"obst"},
  {name:"Zwiebeln",emoji:"🧅",cat:"obst"},{name:"Knoblauch",emoji:"🧄",cat:"obst"},
  {name:"Salat",emoji:"🥬",cat:"obst"},{name:"Gurken",emoji:"🥒",cat:"obst"},
  {name:"Paprika",emoji:"🫑",cat:"obst"},{name:"Brokkoli",emoji:"🥦",cat:"obst"},
  {name:"Zitrone",emoji:"🍋",cat:"obst"},{name:"Erdbeeren",emoji:"🍓",cat:"obst"},
  {name:"Weintrauben",emoji:"🍇",cat:"obst"},{name:"Avocado",emoji:"🥑",cat:"obst"},
  {name:"Mais",emoji:"🌽",cat:"obst"},{name:"Pilze",emoji:"🍄",cat:"obst"},
  {name:"Pfirsich",emoji:"🍑",cat:"obst"},{name:"Birne",emoji:"🍐",cat:"obst"},
  {name:"Spinat",emoji:"🥬",cat:"obst"},{name:"Kirschen",emoji:"🍒",cat:"obst"},
  {name:"Hähnchen",emoji:"🍗",cat:"fleisch"},{name:"Hackfleisch",emoji:"🥩",cat:"fleisch"},
  {name:"Lachs",emoji:"🐟",cat:"fleisch"},{name:"Thunfisch",emoji:"🐠",cat:"fleisch"},
  {name:"Schweinefilet",emoji:"🥩",cat:"fleisch"},{name:"Bratwurst",emoji:"🌭",cat:"fleisch"},
  {name:"Schinken",emoji:"🍖",cat:"fleisch"},{name:"Garnelen",emoji:"🦐",cat:"fleisch"},
  {name:"Rindfleisch",emoji:"🥩",cat:"fleisch"},{name:"Salami",emoji:"🍕",cat:"fleisch"},
  {name:"Milch",emoji:"🥛",cat:"milch"},{name:"Käse",emoji:"🧀",cat:"milch"},
  {name:"Butter",emoji:"🧈",cat:"milch"},{name:"Joghurt",emoji:"🥛",cat:"milch"},
  {name:"Sahne",emoji:"🍶",cat:"milch"},{name:"Eier",emoji:"🥚",cat:"milch"},
  {name:"Quark",emoji:"🥛",cat:"milch"},{name:"Mozzarella",emoji:"🧀",cat:"milch"},
  {name:"Frischkäse",emoji:"🧀",cat:"milch"},
  {name:"Toastbrot",emoji:"🍞",cat:"brot"},{name:"Brötchen",emoji:"🥐",cat:"brot"},
  {name:"Vollkornbrot",emoji:"🍞",cat:"brot"},{name:"Croissant",emoji:"🥐",cat:"brot"},
  {name:"Brezel",emoji:"🥨",cat:"brot"},{name:"Baguette",emoji:"🥖",cat:"brot"},
  {name:"Mineralwasser",emoji:"💧",cat:"getraenke"},{name:"Orangensaft",emoji:"🍊",cat:"getraenke"},
  {name:"Kaffee",emoji:"☕",cat:"getraenke"},{name:"Tee",emoji:"🍵",cat:"getraenke"},
  {name:"Cola",emoji:"🥤",cat:"getraenke"},{name:"Bier",emoji:"🍺",cat:"getraenke"},
  {name:"Wein",emoji:"🍷",cat:"getraenke"},{name:"Apfelsaft",emoji:"🍎",cat:"getraenke"},
  {name:"Limonade",emoji:"🥤",cat:"getraenke"},
  {name:"Schokolade",emoji:"🍫",cat:"suesses"},{name:"Chips",emoji:"🍟",cat:"suesses"},
  {name:"Kekse",emoji:"🍪",cat:"suesses"},{name:"Gummibärchen",emoji:"🐻",cat:"suesses"},
  {name:"Nüsse",emoji:"🥜",cat:"suesses"},{name:"Popcorn",emoji:"🍿",cat:"suesses"},
  {name:"Eis",emoji:"🍦",cat:"suesses"},
  {name:"TK-Pizza",emoji:"🍕",cat:"tiefkuehl"},{name:"Pommes",emoji:"🍟",cat:"tiefkuehl"},
  {name:"Fischstäbchen",emoji:"🐟",cat:"tiefkuehl"},{name:"TK-Erbsen",emoji:"🫛",cat:"tiefkuehl"},
  {name:"TK-Spinat",emoji:"🥬",cat:"tiefkuehl"},{name:"TK-Beeren",emoji:"🍓",cat:"tiefkuehl"},
  {name:"Toilettenpapier",emoji:"🧻",cat:"haushalt"},{name:"Spülmittel",emoji:"🫧",cat:"haushalt"},
  {name:"Müllbeutel",emoji:"🗑️",cat:"haushalt"},{name:"Waschmittel",emoji:"👕",cat:"haushalt"},
  {name:"Putzmittel",emoji:"🧹",cat:"haushalt"},{name:"Küchentücher",emoji:"🧻",cat:"haushalt"},
  {name:"Schwämme",emoji:"🧽",cat:"haushalt"},
  {name:"Shampoo",emoji:"🧴",cat:"pflege"},{name:"Zahnpasta",emoji:"🦷",cat:"pflege"},
  {name:"Seife",emoji:"🧼",cat:"pflege"},{name:"Deo",emoji:"🧴",cat:"pflege"},
  {name:"Rasierer",emoji:"🪒",cat:"pflege"},{name:"Duschgel",emoji:"🚿",cat:"pflege"},
  {name:"Salz",emoji:"🧂",cat:"gewuerze"},{name:"Pfeffer",emoji:"🌶️",cat:"gewuerze"},
  {name:"Olivenöl",emoji:"🫒",cat:"gewuerze"},{name:"Essig",emoji:"🍶",cat:"gewuerze"},
  {name:"Ketchup",emoji:"🍅",cat:"gewuerze"},{name:"Senf",emoji:"🌿",cat:"gewuerze"},
  {name:"Mayonnaise",emoji:"🥄",cat:"gewuerze"},
  {name:"Dosentomaten",emoji:"🥫",cat:"konserven"},{name:"Dosenbohnen",emoji:"🥫",cat:"konserven"},
  {name:"Spaghetti",emoji:"🍝",cat:"konserven"},{name:"Penne",emoji:"🍝",cat:"konserven"},
  {name:"Reis",emoji:"🍚",cat:"konserven"},{name:"Linsen",emoji:"🫘",cat:"konserven"},
  {name:"Kichererbsen",emoji:"🫘",cat:"konserven"},{name:"Mehl",emoji:"🌾",cat:"konserven"},
  {name:"Zucker",emoji:"🍬",cat:"konserven"},
];

// ── STATE ──────────────────────────────────────────────────────────────────────
let lists       = [];
let activeId    = null;
let filterCat   = null;
let dlgCallback = null;
let currentView = "loading";

// ── HILFSFUNKTIONEN ───────────────────────────────────────────────────────────
const genId = () => Math.random().toString(36).slice(2,9) + Date.now().toString(36);

function getMonday(d = new Date()) {
  const date = new Date(d);
  const day  = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  date.setDate(diff);
  return date;
}

function toDateStr(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function formatWeek(mondayStr) {
  if (!mondayStr) return "";
  const monday = new Date(mondayStr + "T00:00:00");
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const o = { day:"2-digit", month:"2-digit" };
  return `${monday.toLocaleDateString("de-DE",o)} – ${sunday.toLocaleDateString("de-DE",o)}`;
}

function getCat(id) {
  return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1];
}

// ── TOAST ──────────────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

// ── FIREBASE: LISTENER ────────────────────────────────────────────────────────
const dbRef = ref(db, "lists");

onValue(dbRef, (snap) => {
  const data = snap.val();
  lists = data
    ? Object.values(data).sort((a, b) => b.createdAt - a.createdAt)
    : [];
  // First load: switch away from loading screen
  if (currentView === "loading") {
    showView("lists");
  } else {
    renderCurrentView();
  }
}, (error) => {
  console.error("Firebase error:", error);
  showToast("⚠️ Verbindungsfehler – Regeln prüfen");
  if (currentView === "loading") showView("lists");
});

// ── FIREBASE: SCHREIBEN ───────────────────────────────────────────────────────
async function saveList(list) {
  try {
    await set(ref(db, `lists/${list.id}`), list);
  } catch (err) {
    console.error("Save error:", err);
    showToast("⚠️ Speichern fehlgeschlagen – Datenbankregeln prüfen");
    throw err;
  }
}

async function deleteListDb(id) {
  try {
    await set(ref(db, `lists/${id}`), null);
  } catch (err) {
    console.error("Delete error:", err);
    showToast("⚠️ Löschen fehlgeschlagen");
    throw err;
  }
}

// ── VIEW MANAGEMENT ───────────────────────────────────────────────────────────
function showView(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const target = document.getElementById(`view-${id}`);
  if (!target) return;
  target.classList.add("active");
  // Scroll to top
  window.scrollTo({ top: 0, behavior: "instant" });
  currentView = id;

  if (id === "lists")  renderLists();
  if (id === "detail") renderDetail();
  if (id === "add") {
    document.getElementById("search-input").value = "";
    filterCat = null;
    renderCatFilters();
    renderItemGrid();
  }
}
window.showView = showView;

function renderCurrentView() {
  if (currentView === "lists")  renderLists();
  if (currentView === "detail") renderDetail();
  if (currentView === "add")    renderItemGrid();
}

// ── LISTEN-ÜBERSICHT ──────────────────────────────────────────────────────────
function renderLists() {
  const wrap  = document.getElementById("list-cards");
  const empty = document.getElementById("lists-empty");

  if (!lists.length) {
    wrap.innerHTML     = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";

  wrap.innerHTML = lists.map(list => {
    const items = list.items || [];
    const done  = items.filter(i => i.done).length;
    const total = items.length;
    const pct   = total ? Math.round(done / total * 100) : 0;
    const emojis = [...new Set(items.map(i => getCat(i.cat).emoji))].slice(0, 6);

    const emojiHtml = emojis.map(e => `<span>${e}</span>`).join("") +
      (total > 6 ? `<span class="emoji-more">+${total - 6}</span>` : "");

    const progressHtml = total ? `
      <div class="progress-track">
        <div class="progress-fill ${pct === 100 ? 'complete' : ''}" style="width:${pct}%"></div>
      </div>` : "";

    return `
    <button class="list-card" onclick="openList('${list.id}')">
      <div class="list-card-top">
        <div>
          <div class="list-card-name">${escHtml(list.name)}</div>
          <div class="list-card-week">📅 ${formatWeek(list.weekStart)}</div>
        </div>
        <div class="list-card-meta">
          <div class="list-card-creator">von ${escHtml(list.creator)}</div>
          <div class="list-card-count ${pct === 100 ? 'all-done' : ''}">
            ${done}/${total} ${pct === 100 ? '✓' : ''}
          </div>
        </div>
      </div>
      ${emojis.length ? `<div class="emoji-row">${emojiHtml}</div>` : ""}
      ${progressHtml}
    </button>`;
  }).join("");
}

window.openList = function(id) {
  activeId = id;
  showView("detail");
};

// ── NEUE LISTE ─────────────────────────────────────────────────────────────────
// Standardmäßig heutige Woche setzen
const weekEl = document.getElementById("new-week");
weekEl.value = toDateStr(new Date());
updateWeekPreview();

window.updateWeekPreview = updateWeekPreview;
function updateWeekPreview() {
  const val  = document.getElementById("new-week").value;
  const prev = document.getElementById("week-preview");
  const txt  = document.getElementById("week-preview-text");
  if (val) {
    const mon = getMonday(new Date(val + "T12:00:00"));
    txt.textContent = formatWeek(toDateStr(mon));
    prev.classList.add("visible");
  } else {
    prev.classList.remove("visible");
  }
}

window.createList = async function() {
  const name     = document.getElementById("new-name").value.trim();
  const creator  = document.getElementById("new-creator").value.trim();
  const weekVal  = document.getElementById("new-week").value;
  const errorEl  = document.getElementById("create-error");
  const createBtn = document.getElementById("btn-create");

  // Validierung
  errorEl.style.display = "none";
  if (!name) {
    errorEl.textContent    = "⚠️ Bitte einen Listennamen eingeben.";
    errorEl.style.display  = "block";
    document.getElementById("new-name").focus();
    return;
  }
  if (!creator) {
    errorEl.textContent    = "⚠️ Bitte deinen Namen eingeben.";
    errorEl.style.display  = "block";
    document.getElementById("new-creator").focus();
    return;
  }

  createBtn.disabled    = true;
  createBtn.textContent = "Erstelle…";

  const monday = weekVal
    ? getMonday(new Date(weekVal + "T12:00:00"))
    : getMonday();

  const list = {
    id:        genId(),
    name,
    creator,
    weekStart: toDateStr(monday),
    items:     [],
    createdAt: Date.now(),
  };

  try {
    await saveList(list);
    activeId = list.id;
    document.getElementById("new-name").value    = "";
    document.getElementById("new-creator").value = "";
    showToast("✨ Liste erstellt!");
    showView("detail");
  } catch {
    errorEl.textContent   = "⚠️ Fehler beim Speichern. Firebase-Regeln prüfen!";
    errorEl.style.display = "block";
  } finally {
    createBtn.disabled    = false;
    createBtn.textContent = "✨ Liste erstellen";
  }
};

// ── LISTENDETAIL ──────────────────────────────────────────────────────────────
function renderDetail() {
  const list = lists.find(l => l.id === activeId);
  if (!list) { showView("lists"); return; }

  const items = list.items || [];
  const done  = items.filter(i => i.done).length;
  const total = items.length;
  const pct   = total ? Math.round(done / total * 100) : 0;

  document.getElementById("detail-name").textContent    = list.name;
  document.getElementById("detail-week").textContent    = formatWeek(list.weekStart);
  document.getElementById("detail-creator").textContent = list.creator;

  const progWrap = document.getElementById("detail-progress-wrap");
  if (total > 0) {
    progWrap.style.display = "block";
    document.getElementById("progress-text").textContent = `${done} von ${total} erledigt`;
    const pctEl = document.getElementById("pct-text");
    pctEl.textContent = pct === 100 ? "✓ Fertig!" : `${pct}%`;
    pctEl.className   = pct === 100 ? "done-pct" : "";
    const fill = document.getElementById("progress-fill");
    fill.style.width = `${pct}%`;
    fill.className   = `progress-fill${pct === 100 ? " complete" : ""}`;
  } else {
    progWrap.style.display = "none";
  }

  const sectEl  = document.getElementById("cat-sections");
  const emptyEl = document.getElementById("detail-empty");

  if (!items.length) {
    sectEl.innerHTML    = "";
    emptyEl.style.display = "block";
    return;
  }
  emptyEl.style.display = "none";

  let html = "";
  CATEGORIES.forEach(cat => {
    const catItems = items.filter(i => i.cat === cat.id);
    if (!catItems.length) return;
    html += `
    <div class="cat-section">
      <span class="cat-label" style="background:${cat.color};color:${cat.text}">
        ${cat.emoji} ${cat.name}
      </span>
      <div>
        ${catItems.map(it => `
        <div class="item-row${it.done ? " done-row" : ""}">
          <span class="item-emoji">${it.emoji}</span>
          <span class="item-name">${escHtml(it.name)}</span>
          <button class="check-btn${it.done ? " checked" : ""}"
                  onclick="toggleItem('${it.id}')"
                  aria-label="${it.done ? 'Abhaken rückgängig' : 'Abhaken'}">
            ${it.done ? "✓" : ""}
          </button>
          <button class="del-btn" onclick="removeItem('${it.id}')" aria-label="Entfernen">✕</button>
        </div>`).join("")}
      </div>
    </div>`;
  });
  sectEl.innerHTML = html;
}

window.toggleItem = async function(itemId) {
  const list = lists.find(l => l.id === activeId);
  if (!list) return;
  const updated = {
    ...list,
    items: list.items.map(it => it.id === itemId ? { ...it, done: !it.done } : it),
  };
  await saveList(updated);
};

window.removeItem = async function(itemId) {
  const list = lists.find(l => l.id === activeId);
  if (!list) return;
  const updated = { ...list, items: list.items.filter(it => it.id !== itemId) };
  await saveList(updated);
};

window.confirmDeleteList = function() {
  openDialog(
    "Liste löschen?",
    `„${lists.find(l => l.id === activeId)?.name}" und alle Artikel werden dauerhaft gelöscht.`,
    async () => {
      await deleteListDb(activeId);
      activeId = null;
      showToast("🗑 Liste gelöscht");
      showView("lists");
    }
  );
};

// ── ARTIKEL HINZUFÜGEN ────────────────────────────────────────────────────────

// Kategorie-Select befüllen
const customCatEl = document.getElementById("custom-cat");
CATEGORIES.forEach(c => {
  const o    = document.createElement("option");
  o.value    = c.id;
  o.textContent = `${c.emoji} ${c.name}`;
  customCatEl.appendChild(o);
});

function renderCatFilters() {
  const wrap = document.getElementById("cat-filters");
  const allActive = !filterCat;
  wrap.innerHTML =
    `<button class="cat-filter-btn${allActive ? " active" : ""}"
      style="${allActive ? "background:var(--ink);color:#fff;border-color:var(--ink)" : ""}"
      onclick="setCatFilter(null)">Alle</button>` +
    CATEGORIES.map(c => {
      const active = filterCat === c.id;
      return `<button class="cat-filter-btn${active ? " active" : ""}"
        style="${active ? `background:${c.color};color:${c.text};border-color:${c.text}` : ""}"
        onclick="setCatFilter('${c.id}')">${c.emoji} ${c.name}</button>`;
    }).join("");
}

window.setCatFilter = function(id) {
  filterCat = id;
  renderCatFilters();
  renderItemGrid();
};

window.renderItemGrid = function() {
  const q    = (document.getElementById("search-input").value || "").toLowerCase().trim();
  const list = lists.find(l => l.id === activeId);
  const existing = new Set((list?.items || []).map(i => i.name));

  const filtered = ITEMS_DB.filter(it =>
    (!q || it.name.toLowerCase().includes(q)) &&
    (!filterCat || it.cat === filterCat)
  );

  const grid = document.getElementById("items-grid");
  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:30px 0;color:var(--ink3);font-size:15px">
      Kein Artikel gefunden
    </div>`;
    return;
  }

  grid.innerHTML = filtered.map(item => {
    const inList = existing.has(item.name);
    return `
    <button class="item-tile${inList ? " in-list" : ""}"
            onclick="addItemFromGrid('${escAttr(item.name)}','${item.emoji}','${item.cat}')"
            ${inList ? "disabled" : ""}>
      <span class="tile-emoji">${item.emoji}</span>
      <span class="tile-name">${escHtml(item.name)}</span>
      ${inList ? '<span class="tile-check">✓</span>' : ''}
    </button>`;
  }).join("");
};

window.addItemFromGrid = async function(name, emoji, cat) {
  await addItemToList(name, emoji, cat);
};

async function addItemToList(name, emoji, cat) {
  const list = lists.find(l => l.id === activeId);
  if (!list) return;
  if ((list.items || []).find(i => i.name === name)) return;
  const item    = { id: genId(), name, emoji, cat, done: false };
  const updated = { ...list, items: [...(list.items || []), item] };
  await saveList(updated);
  showToast(`✅ ${name} hinzugefügt`);
}

window.addCustomItem = async function() {
  const name = document.getElementById("custom-name").value.trim();
  const cat  = document.getElementById("custom-cat").value;
  if (!name) { showToast("⚠️ Namen eingeben!"); return; }
  const catInfo = getCat(cat);
  await addItemToList(name, catInfo.emoji, cat);
  document.getElementById("custom-name").value = "";
};

// ── DIALOG ────────────────────────────────────────────────────────────────────
function openDialog(title, body, onConfirm) {
  document.getElementById("dlg-title").textContent = title;
  document.getElementById("dlg-body").textContent  = body;
  document.getElementById("confirm-overlay").classList.add("visible");
  dlgCallback = onConfirm;
}

window.closeDialog = function() {
  document.getElementById("confirm-overlay").classList.remove("visible");
  dlgCallback = null;
};

document.getElementById("dlg-confirm").addEventListener("click", () => {
  closeDialog();
  dlgCallback?.();
});
document.getElementById("confirm-overlay").addEventListener("click", e => {
  if (e.target === e.currentTarget) closeDialog();
});

// ── SICHERHEIT: HTML-ESCAPING ─────────────────────────────────────────────────
function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
function escAttr(str) {
  return String(str).replace(/'/g, "\\'");
}
