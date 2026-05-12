import { initializeApp }                  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, onValue, set }  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

// ── FIREBASE ──────────────────────────────────────────────────────────────────
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

// ── KATEGORIEN ────────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id:"obst",      name:"Obst & Gemüse",              emoji:"🥦", color:"#EAF3DE", text:"#2E6B2E" },
  { id:"brot",      name:"Brot & Gebäck",              emoji:"🍞", color:"#FFF3E0", text:"#A03610" },
  { id:"fleisch",   name:"Fleisch & Fisch",            emoji:"🥩", color:"#FAECE7", text:"#8B3A1A" },
  { id:"fertig",    name:"Fertig- & Tiefkühlprodukte", emoji:"🍕", color:"#E1F5EE", text:"#0F6E56" },
  { id:"milch",     name:"Milch & Käse",               emoji:"🧀", color:"#FEF5E4", text:"#7A4A0A" },
  { id:"gewuerze",  name:"Zutaten & Gewürze",          emoji:"🫙", color:"#EDF5E1", text:"#2A5A0A" },
  { id:"getreide",  name:"Getreideprodukte",           emoji:"🌾", color:"#FEF9E7", text:"#7D6608" },
  { id:"snacks",    name:"Snacks & Süßwaren",          emoji:"🍫", color:"#F0EEFD", text:"#4A41A0" },
  { id:"haushalt",  name:"Haushalt",                   emoji:"🧹", color:"#F1EFE8", text:"#4A4A40" },
  { id:"pflege",    name:"Pflege & Gesundheit",        emoji:"🧴", color:"#FDE9F1", text:"#8B2050" },
  { id:"tier",      name:"Tierbedarf",                 emoji:"🐾", color:"#FDF2E9", text:"#784212" },
  { id:"baumarkt",  name:"Baumarkt & Garten",         emoji:"🌱", color:"#E9F7EF", text:"#1E6B3A" },
];

// ── ARTIKEL-DATENBANK ─────────────────────────────────────────────────────────
const ITEMS_DB = [
  // Obst & Gemüse
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
  {name:"Ananas",emoji:"🍍",cat:"obst"},{name:"Mango",emoji:"🥭",cat:"obst"},
  {name:"Wassermelone",emoji:"🍉",cat:"obst"},{name:"Kiwi",emoji:"🥝",cat:"obst"},
  {name:"Blaubeeren",emoji:"🫐",cat:"obst"},{name:"Himbeeren",emoji:"🍓",cat:"obst"},
  {name:"Zucchini",emoji:"🥒",cat:"obst"},{name:"Aubergine",emoji:"🍆",cat:"obst"},
  // Brot & Gebäck
  {name:"Toastbrot",emoji:"🍞",cat:"brot"},{name:"Brötchen",emoji:"🥐",cat:"brot"},
  {name:"Vollkornbrot",emoji:"🍞",cat:"brot"},{name:"Croissant",emoji:"🥐",cat:"brot"},
  {name:"Brezel",emoji:"🥨",cat:"brot"},{name:"Baguette",emoji:"🥖",cat:"brot"},
  {name:"Laugenbrezel",emoji:"🥨",cat:"brot"},{name:"Roggenbrot",emoji:"🍞",cat:"brot"},
  // Fleisch & Fisch
  {name:"Hähnchen",emoji:"🍗",cat:"fleisch"},{name:"Hackfleisch",emoji:"🥩",cat:"fleisch"},
  {name:"Lachs",emoji:"🐟",cat:"fleisch"},{name:"Thunfisch",emoji:"🐠",cat:"fleisch"},
  {name:"Schweinefilet",emoji:"🥩",cat:"fleisch"},{name:"Bratwurst",emoji:"🌭",cat:"fleisch"},
  {name:"Schinken",emoji:"🍖",cat:"fleisch"},{name:"Garnelen",emoji:"🦐",cat:"fleisch"},
  {name:"Rindfleisch",emoji:"🥩",cat:"fleisch"},{name:"Salami",emoji:"🍕",cat:"fleisch"},
  {name:"Fischfilet",emoji:"🐟",cat:"fleisch"},{name:"Putenbraten",emoji:"🍗",cat:"fleisch"},
  {name:"Speck",emoji:"🥓",cat:"fleisch"},{name:"Kabeljau",emoji:"🐟",cat:"fleisch"},
  // Fertig- & Tiefkühlprodukte
  {name:"TK-Pizza",emoji:"🍕",cat:"fertig"},{name:"Pommes",emoji:"🍟",cat:"fertig"},
  {name:"Fischstäbchen",emoji:"🐟",cat:"fertig"},{name:"TK-Erbsen",emoji:"🫛",cat:"fertig"},
  {name:"TK-Spinat",emoji:"🥬",cat:"fertig"},{name:"TK-Beeren",emoji:"🍓",cat:"fertig"},
  {name:"TK-Lasagne",emoji:"🍝",cat:"fertig"},{name:"TK-Nuggets",emoji:"🍗",cat:"fertig"},
  {name:"TK-Gemüse",emoji:"🥦",cat:"fertig"},{name:"Fertigsalat",emoji:"🥗",cat:"fertig"},
  // Milch & Käse
  {name:"Milch",emoji:"🥛",cat:"milch"},{name:"Käse",emoji:"🧀",cat:"milch"},
  {name:"Butter",emoji:"🧈",cat:"milch"},{name:"Joghurt",emoji:"🥛",cat:"milch"},
  {name:"Sahne",emoji:"🍶",cat:"milch"},{name:"Eier",emoji:"🥚",cat:"milch"},
  {name:"Quark",emoji:"🥛",cat:"milch"},{name:"Mozzarella",emoji:"🧀",cat:"milch"},
  {name:"Frischkäse",emoji:"🧀",cat:"milch"},{name:"Creme fraîche",emoji:"🥛",cat:"milch"},
  {name:"Kefir",emoji:"🥛",cat:"milch"},{name:"Parmesan",emoji:"🧀",cat:"milch"},
  // Zutaten & Gewürze
  {name:"Salz",emoji:"🧂",cat:"gewuerze"},{name:"Pfeffer",emoji:"🌶️",cat:"gewuerze"},
  {name:"Olivenöl",emoji:"🫒",cat:"gewuerze"},{name:"Essig",emoji:"🍶",cat:"gewuerze"},
  {name:"Ketchup",emoji:"🍅",cat:"gewuerze"},{name:"Senf",emoji:"🌿",cat:"gewuerze"},
  {name:"Mayonnaise",emoji:"🥄",cat:"gewuerze"},{name:"Sojasoße",emoji:"🫙",cat:"gewuerze"},
  {name:"Tomatenmark",emoji:"🍅",cat:"gewuerze"},{name:"Honig",emoji:"🍯",cat:"gewuerze"},
  {name:"Marmelade",emoji:"🍓",cat:"gewuerze"},{name:"Nutella",emoji:"🍫",cat:"gewuerze"},
  {name:"Curry",emoji:"🌶️",cat:"gewuerze"},{name:"Paprikapulver",emoji:"🌶️",cat:"gewuerze"},
  {name:"Oregano",emoji:"🌿",cat:"gewuerze"},{name:"Zimt",emoji:"🌿",cat:"gewuerze"},
  // Getreideprodukte
  {name:"Spaghetti",emoji:"🍝",cat:"getreide"},{name:"Penne",emoji:"🍝",cat:"getreide"},
  {name:"Reis",emoji:"🍚",cat:"getreide"},{name:"Mehl",emoji:"🌾",cat:"getreide"},
  {name:"Haferflocken",emoji:"🌾",cat:"getreide"},{name:"Müsli",emoji:"🌾",cat:"getreide"},
  {name:"Quinoa",emoji:"🌾",cat:"getreide"},{name:"Couscous",emoji:"🌾",cat:"getreide"},
  {name:"Cornflakes",emoji:"🌽",cat:"getreide"},{name:"Lasagneplatten",emoji:"🍝",cat:"getreide"},
  // Snacks & Süßwaren
  {name:"Schokolade",emoji:"🍫",cat:"snacks"},{name:"Chips",emoji:"🍟",cat:"snacks"},
  {name:"Kekse",emoji:"🍪",cat:"snacks"},{name:"Gummibärchen",emoji:"🐻",cat:"snacks"},
  {name:"Nüsse",emoji:"🥜",cat:"snacks"},{name:"Popcorn",emoji:"🍿",cat:"snacks"},
  {name:"Eis",emoji:"🍦",cat:"snacks"},{name:"Bonbons",emoji:"🍬",cat:"snacks"},
  {name:"Riegel",emoji:"🍫",cat:"snacks"},{name:"Salzstangen",emoji:"🥨",cat:"snacks"},
  {name:"Mineralwasser",emoji:"💧",cat:"snacks"},{name:"Orangensaft",emoji:"🍊",cat:"snacks"},
  {name:"Kaffee",emoji:"☕",cat:"snacks"},{name:"Tee",emoji:"🍵",cat:"snacks"},
  {name:"Cola",emoji:"🥤",cat:"snacks"},{name:"Bier",emoji:"🍺",cat:"snacks"},
  {name:"Wein",emoji:"🍷",cat:"snacks"},{name:"Apfelsaft",emoji:"🍎",cat:"snacks"},
  {name:"Limonade",emoji:"🥤",cat:"snacks"},{name:"Energydrink",emoji:"⚡",cat:"snacks"},
  // Haushalt
  {name:"Toilettenpapier",emoji:"🧻",cat:"haushalt"},{name:"Spülmittel",emoji:"🫧",cat:"haushalt"},
  {name:"Müllbeutel",emoji:"🗑️",cat:"haushalt"},{name:"Waschmittel",emoji:"👕",cat:"haushalt"},
  {name:"Putzmittel",emoji:"🧹",cat:"haushalt"},{name:"Küchentücher",emoji:"🧻",cat:"haushalt"},
  {name:"Schwämme",emoji:"🧽",cat:"haushalt"},{name:"Backpapier",emoji:"📄",cat:"haushalt"},
  {name:"Frischhaltefolie",emoji:"📦",cat:"haushalt"},{name:"Geschirrspültabs",emoji:"🫧",cat:"haushalt"},
  {name:"Weichspüler",emoji:"👕",cat:"haushalt"},{name:"Batterien",emoji:"🔋",cat:"haushalt"},
  // Pflege & Gesundheit
  {name:"Shampoo",emoji:"🧴",cat:"pflege"},{name:"Zahnpasta",emoji:"🦷",cat:"pflege"},
  {name:"Seife",emoji:"🧼",cat:"pflege"},{name:"Deo",emoji:"🧴",cat:"pflege"},
  {name:"Rasierer",emoji:"🪒",cat:"pflege"},{name:"Duschgel",emoji:"🚿",cat:"pflege"},
  {name:"Pflaster",emoji:"🩹",cat:"pflege"},{name:"Creme",emoji:"🧴",cat:"pflege"},
  {name:"Paracetamol",emoji:"💊",cat:"pflege"},{name:"Ibuprofen",emoji:"💊",cat:"pflege"},
  {name:"Zahnbürste",emoji:"🪥",cat:"pflege"},{name:"Wattepads",emoji:"🌸",cat:"pflege"},
  // Tierbedarf
  {name:"Hundefutter",emoji:"🐕",cat:"tier"},{name:"Katzenfutter",emoji:"🐈",cat:"tier"},
  {name:"Katzenstreu",emoji:"🐱",cat:"tier"},{name:"Hundeleckerli",emoji:"🦴",cat:"tier"},
  {name:"Vogelkörner",emoji:"🐦",cat:"tier"},{name:"Aquariumfutter",emoji:"🐠",cat:"tier"},
  // Baumarkt & Garten
  {name:"Blumenerde",emoji:"🌱",cat:"baumarkt"},{name:"Blumendünger",emoji:"🌿",cat:"baumarkt"},
  {name:"Blumen",emoji:"🌸",cat:"baumarkt"},{name:"Glühbirnen",emoji:"💡",cat:"baumarkt"},
  {name:"Schrauben",emoji:"🔩",cat:"baumarkt"},{name:"Klebeband",emoji:"🎗️",cat:"baumarkt"},
  {name:"Saatgut",emoji:"🌱",cat:"baumarkt"},{name:"Gartenhandschuhe",emoji:"🧤",cat:"baumarkt"},
];

// ── EMOJI-ERKENNUNG für eigene Artikel ────────────────────────────────────────
const EMOJI_MAP = [
  // Obst & Gemüse
  [["apfel","äpfel"],       "🍎"], [["birne"],                 "🍐"],
  [["banane"],              "🍌"], [["orange","mandarine"],    "🍊"],
  [["zitrone","limette"],   "🍋"], [["erdbeere"],              "🍓"],
  [["weintraube","traube"], "🍇"], [["kirsche"],               "🍒"],
  [["pfirsich"],            "🍑"], [["avocado"],               "🥑"],
  [["melone"],              "🍉"], [["ananas"],                "🍍"],
  [["mango"],               "🥭"], [["kiwi"],                  "🥝"],
  [["blaubeere"],           "🫐"], [["tomate"],                "🍅"],
  [["paprika"],             "🫑"], [["gurke"],                 "🥒"],
  [["karotte","möhre"],     "🥕"], [["kartoffel"],             "🥔"],
  [["mais"],                "🌽"], [["zwiebel"],               "🧅"],
  [["knoblauch"],           "🧄"], [["brokkoli"],              "🥦"],
  [["salat"],               "🥬"], [["spinat"],                "🥬"],
  [["pilz"],                "🍄"], [["aubergine"],             "🍆"],
  [["zucchini"],            "🥒"], [["erbse"],                 "🫛"],
  [["sellerie","lauch"],    "🌿"],
  // Fleisch & Fisch
  [["hähnchen","hühner","chicken","geflügel"],"🍗"],
  [["hack","faschiert"],    "🥩"], [["rind","steak","beef"],  "🥩"],
  [["schwein","kotelett"],  "🥩"], [["lamm"],                  "🥩"],
  [["wurst","bratwurst"],   "🌭"], [["schinken"],              "🍖"],
  [["salami"],              "🍕"], [["speck","bacon"],         "🥓"],
  [["lachs"],               "🐟"], [["thunfisch"],             "🐠"],
  [["fisch"],               "🐟"], [["garnele","shrimp"],      "🦐"],
  [["hummer","krebs"],      "🦞"],
  // Brot & Gebäck
  [["brot"],                "🍞"], [["brötchen","semmel"],    "🥐"],
  [["croissant"],           "🥐"], [["baguette"],              "🥖"],
  [["brezel"],              "🥨"], [["toast"],                 "🍞"],
  [["kuchen","torte"],      "🎂"], [["muffin"],                "🧁"],
  // Milch & Käse
  [["milch"],               "🥛"], [["käse"],                  "🧀"],
  [["butter"],              "🧈"], [["joghurt"],               "🥛"],
  [["sahne","creme fraiche"],"🍶"],[["ei","eier"],             "🥚"],
  [["quark"],               "🥛"], [["mozzarella","parmesan","gouda"],"🧀"],
  // Getränke
  [["wasser"],              "💧"], [["saft"],                  "🧃"],
  [["kaffee"],              "☕"], [["tee"],                   "🍵"],
  [["cola","fanta","sprite"],"🥤"],[["bier"],                 "🍺"],
  [["wein","sekt"],         "🍷"], [["limonade"],              "🥤"],
  [["energy","monster"],    "⚡"], [["whisky","rum","vodka"],  "🥃"],
  [["smoothie"],            "🥤"],
  // Zutaten & Gewürze
  [["salz"],                "🧂"], [["pfeffer"],               "🌶️"],
  [["öl","olivenöl"],       "🫒"], [["essig"],                 "🍶"],
  [["ketchup"],             "🍅"], [["senf","mustard"],        "🌿"],
  [["mayo","mayonnaise"],   "🥄"], [["sojasoße","sauce"],      "🫙"],
  [["tomatenmark","tomatensoße"],"🍅"],
  [["honig"],               "🍯"], [["marmelade","konfitüre"], "🍓"],
  [["nutella","aufstrich"],  "🍫"], [["curry"],                "🌶️"],
  [["zimt","vanille"],      "🌿"], [["zucker"],                "🍬"],
  [["mehl"],                "🌾"], [["hefe"],                  "🌾"],
  [["backpulver","natron"], "🌾"],
  // Getreide & Pasta
  [["nudel","pasta","spaghetti","penne","tagliatelle","lasagne"],"🍝"],
  [["reis"],                "🍚"], [["haferflocken","hafer"],  "🌾"],
  [["müsli","granola"],     "🌾"], [["quinoa","couscous"],     "🌾"],
  [["cornflakes","cerealien"],"🌽"],
  // Snacks & Süßes
  [["schokolade","schoki"], "🍫"], [["chips"],                 "🍟"],
  [["keks","plätzchen"],    "🍪"], [["gummibär","gummi"],      "🐻"],
  [["nuss","mandel","haselnuss","cashew"],"🥜"],
  [["popcorn"],             "🍿"], [["eis","eiscreme"],        "🍦"],
  [["bonbon","süßigkeit"],  "🍬"], [["riegel"],                "🍫"],
  [["salzstange","cracker"],"🥨"],
  // Haushalt
  [["toilettenpapier","klopapier","wc-papier"],"🧻"],
  [["spülmittel"],          "🫧"], [["waschmittel","wäsche"],  "👕"],
  [["putzmittel","reiniger"],"🧹"],[["müllbeutel","müllsack"], "🗑️"],
  [["schwamm"],             "🧽"], [["küchenpapier","küchentuch"],"🧻"],
  [["backpapier"],          "📄"], [["folie","alufolie"],      "📦"],
  [["geschirrspül"],        "🫧"], [["weichspüler"],           "👕"],
  [["batterie"],            "🔋"], [["glühbirne","lampe"],     "💡"],
  // Pflege & Gesundheit
  [["shampoo","haarshampoo"],"🧴"],[["zahnpasta","zahncreme"], "🦷"],
  [["seife","handseife"],   "🧼"], [["deo","deodorant"],       "🧴"],
  [["rasierer","rasier"],   "🪒"], [["duschgel","duschbad"],   "🚿"],
  [["pflaster"],            "🩹"], [["creme","lotion"],        "🧴"],
  [["tablette","pille","medikament"],"💊"],
  [["zahnbürste"],          "🪥"], [["watte","wattestäbchen"], "🌸"],
  [["windel"],              "👶"],
  // Tierbedarf
  [["hundefutter","hundenap"],"🐕"],[["katzenfutter","katzensnack"],"🐈"],
  [["katzenstreu","streu"], "🐱"], [["leckerli","hundeleckerli"],"🦴"],
  [["vogelkörner","vogelfutter"],"🐦"],
  [["aquarium"],            "🐠"],
  // Baumarkt & Garten
  [["blumenerde","kompost","erde"],"🌱"],
  [["dünger"],              "🌿"], [["blume","pflanze"],        "🌸"],
  [["schraube","nagel"],    "🔩"], [["klebeband","tape"],       "🎗️"],
  [["saatgut","samen"],     "🌱"], [["handschuh"],              "🧤"],
  [["farbe","lack"],        "🎨"],
];

function guessEmoji(name) {
  // 1. Exakter Match in Artikeldatenbank
  const exact = ITEMS_DB.find(it => it.name.toLowerCase() === name.toLowerCase());
  if (exact) return exact.emoji;
  // 2. Keyword-Matching
  const n = name.toLowerCase();
  for (const [keywords, emoji] of EMOJI_MAP) {
    if (keywords.some(k => n.includes(k))) return emoji;
  }
  // 3. Kategorie-Fallback
  return "📦";
}

// ── STATE ─────────────────────────────────────────────────────────────────────
let lists       = [];
let activeId    = null;
let filterCat   = null;
let dlgCallback = null;
let currentView = "loading";
let customQty   = 1;

// ── UTILS ─────────────────────────────────────────────────────────────────────
const genId = () => Math.random().toString(36).slice(2,9) + Date.now().toString(36);

function getMonday(d = new Date()) {
  const date = new Date(d);
  const day  = date.getDay();
  date.setDate(date.getDate() - day + (day === 0 ? -6 : 1));
  return date;
}

function toDateStr(date) {
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
}

function getKW(date) {
  const d    = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day  = d.getUTCDay() || 7;
  d.setUTCDate(d.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
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

function escHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;").replace(/</g, "&lt;")
    .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}
function escAttr(str) {
  return String(str).replace(/\\/g, "\\\\").replace(/'/g, "\\'");
}

// ── TOAST ─────────────────────────────────────────────────────────────────────
let toastTimer = null;
function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), 2600);
}

// ── FIREBASE ──────────────────────────────────────────────────────────────────
onValue(ref(db, "lists"), (snap) => {
  const data = snap.val();
  lists = data
    ? Object.values(data).sort((a, b) => b.createdAt - a.createdAt)
    : [];
  if (currentView === "loading") {
    showView("lists");
  } else {
    renderCurrentView();
  }
}, (err) => {
  console.error("Firebase:", err);
  showToast("⚠️ Verbindungsfehler – Firebase-Regeln prüfen");
  if (currentView === "loading") showView("lists");
});

async function saveList(list) {
  try {
    await set(ref(db, `lists/${list.id}`), list);
  } catch (err) {
    console.error("Save error:", err);
    showToast("⚠️ Speichern fehlgeschlagen");
    throw err;
  }
}

async function deleteListFromDb(id) {
  // Firebase: set to null = löschen
  await set(ref(db, `lists/${id}`), null);
}

// ── VIEWS ─────────────────────────────────────────────────────────────────────
function showView(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const target = document.getElementById(`view-${id}`);
  if (!target) return;
  target.classList.add("active");
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
    wrap.innerHTML = "";
    empty.style.display = "block";
    return;
  }
  empty.style.display = "none";
  wrap.innerHTML = lists.map(list => {
    const items  = list.items || [];
    const done   = items.filter(i => i.done).length;
    const total  = items.length;
    const pct    = total ? Math.round(done / total * 100) : 0;
    const emojis = [...new Set(items.map(i => getCat(i.cat).emoji))].slice(0, 6);
    const emojiHtml = emojis.map(e => `<span>${e}</span>`).join("") +
      (total > 6 ? `<span class="emoji-more">+${total - 6}</span>` : "");
    const progressHtml = total ? `
      <div class="progress-track">
        <div class="progress-fill${pct===100?" complete":""}" style="width:${pct}%"></div>
      </div>` : "";
    return `
    <button class="list-card" onclick="openList('${list.id}')">
      <div class="list-card-top">
        <div>
          <div class="list-card-name">${escHtml(list.name)}</div>
          <div class="list-card-week">📅 ${formatWeek(list.weekStart)}</div>
        </div>
        <div class="list-card-meta">
          <div class="list-card-creator">von ${escHtml(list.creator || "?")}</div>
          <div class="list-card-count${pct===100?" all-done":""}">${done}/${total}${pct===100?" ✓":""}</div>
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

// ── NEUE LISTE ────────────────────────────────────────────────────────────────
document.getElementById("new-week").value = toDateStr(new Date());
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
  const nameInput  = document.getElementById("new-name");
  const creator    = document.getElementById("new-creator").value.trim();
  const weekVal    = document.getElementById("new-week").value;
  const errorEl    = document.getElementById("create-error");
  const createBtn  = document.getElementById("btn-create");

  errorEl.style.display = "none";

  if (!creator) {
    errorEl.textContent   = "⚠️ Bitte deinen Namen eingeben.";
    errorEl.style.display = "block";
    document.getElementById("new-creator").focus();
    return;
  }

  // Name ist optional – automatisch KW generieren
  const monday  = weekVal ? getMonday(new Date(weekVal + "T12:00:00")) : getMonday();
  const kw      = getKW(monday);
  const name    = nameInput.value.trim() || `Einkauf KW ${kw}`;

  createBtn.disabled    = true;
  createBtn.textContent = "Erstelle…";

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
    nameInput.value = "";
    document.getElementById("new-creator").value = "";
    showToast("✨ Liste erstellt!");
    showView("detail");
  } catch {
    errorEl.textContent   = "⚠️ Speichern fehlgeschlagen. Firebase-Regeln prüfen!";
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
  document.getElementById("detail-creator").textContent = list.creator || "Unbekannt";

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
    sectEl.innerHTML      = "";
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
        ${catItems.map(it => {
          const qty = it.qty || 1;
          return `
          <div class="item-row${it.done ? " done-row" : ""}">
            <span class="item-emoji">${it.emoji}</span>
            <span class="item-name">${escHtml(it.name)}</span>
            <div class="qty-stepper">
              <button class="qty-step" onclick="changeQty('${it.id}',-1)" aria-label="Weniger">−</button>
              <span class="qty-num">${qty}</span>
              <button class="qty-step" onclick="changeQty('${it.id}',1)" aria-label="Mehr">+</button>
            </div>
            <button class="check-btn${it.done ? " checked" : ""}"
                    onclick="toggleItem('${it.id}')"
                    aria-label="${it.done ? "Abhaken rückgängig" : "Abhaken"}">
              ${it.done ? "✓" : ""}
            </button>
            <button class="del-btn" onclick="removeItem('${it.id}')" aria-label="Entfernen">✕</button>
          </div>`;
        }).join("")}
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

window.changeQty = async function(itemId, delta) {
  const list = lists.find(l => l.id === activeId);
  if (!list) return;
  const updated = {
    ...list,
    items: list.items.map(it => {
      if (it.id !== itemId) return it;
      const newQty = Math.max(1, (it.qty || 1) + delta);
      return { ...it, qty: newQty };
    }),
  };
  await saveList(updated);
};

window.removeItem = async function(itemId) {
  const list = lists.find(l => l.id === activeId);
  if (!list) return;
  const updated = { ...list, items: list.items.filter(it => it.id !== itemId) };
  await saveList(updated);
};

// ── LISTE LÖSCHEN ─────────────────────────────────────────────────────────────
window.confirmDeleteList = function() {
  const list = lists.find(l => l.id === activeId);
  openDialog(
    "Liste löschen?",
    `„${list?.name || "Diese Liste"}" und alle Artikel werden dauerhaft gelöscht.`,
    async () => {
      try {
        await deleteListFromDb(activeId);
        activeId = null;
        showToast("🗑 Liste gelöscht");
        showView("lists");
      } catch {
        showToast("⚠️ Löschen fehlgeschlagen");
      }
    }
  );
};

// ── ARTIKEL HINZUFÜGEN ────────────────────────────────────────────────────────

// Kategorie-Select befüllen
const customCatEl = document.getElementById("custom-cat");
CATEGORIES.forEach(c => {
  const o       = document.createElement("option");
  o.value       = c.id;
  o.textContent = `${c.emoji} ${c.name}`;
  customCatEl.appendChild(o);
});

function renderCatFilters() {
  const wrap = document.getElementById("cat-filters");
  wrap.innerHTML =
    `<button class="cat-filter-btn" style="${!filterCat ? "background:var(--ink);color:#fff;border-color:var(--ink)" : ""}"
      onclick="setCatFilter(null)">Alle</button>` +
    CATEGORIES.map(c => {
      const a = filterCat === c.id;
      return `<button class="cat-filter-btn"
        style="${a ? `background:${c.color};color:${c.text};border-color:${c.text}` : ""}"
        onclick="setCatFilter('${c.id}')">${c.emoji} ${c.name}</button>`;
    }).join("");
}

window.setCatFilter = function(id) {
  filterCat = id;
  renderCatFilters();
  renderItemGrid();
};

window.renderItemGrid = function() {
  const q        = (document.getElementById("search-input").value || "").toLowerCase().trim();
  const list     = lists.find(l => l.id === activeId);
  const existing = new Set((list?.items || []).map(i => i.name));
  const filtered = ITEMS_DB.filter(it =>
    (!q || it.name.toLowerCase().includes(q)) &&
    (!filterCat || it.cat === filterCat)
  );
  const grid = document.getElementById("items-grid");
  if (!filtered.length) {
    grid.innerHTML = `<div style="grid-column:1/-1;text-align:center;padding:30px 0;color:var(--ink3);font-size:15px">Kein Artikel gefunden</div>`;
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
      ${inList ? '<span class="tile-check">✓</span>' : ""}
    </button>`;
  }).join("");
};

window.addItemFromGrid = async function(name, emoji, cat) {
  await addItemToList(name, emoji, cat, 1);
};

async function addItemToList(name, emoji, cat, qty = 1) {
  const list = lists.find(l => l.id === activeId);
  if (!list) return;
  if ((list.items || []).find(i => i.name === name)) return;
  const item    = { id: genId(), name, emoji, cat, done: false, qty };
  const updated = { ...list, items: [...(list.items || []), item] };
  await saveList(updated);
  showToast(`✅ ${name} hinzugefügt`);
}

// Menge für eigenen Artikel
window.adjustCustomQty = function(delta) {
  customQty = Math.max(1, customQty + delta);
  document.getElementById("custom-qty-display").textContent = customQty;
};

window.addCustomItem = async function() {
  const name = document.getElementById("custom-name").value.trim();
  const cat  = document.getElementById("custom-cat").value;
  if (!name) { showToast("⚠️ Namen eingeben!"); return; }
  const emoji = guessEmoji(name);
  await addItemToList(name, emoji, cat, customQty);
  document.getElementById("custom-name").value = "";
  customQty = 1;
  document.getElementById("custom-qty-display").textContent = "1";
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

// ✅ BUG FIX: callback VOR closeDialog() sichern, da closeDialog dlgCallback auf null setzt
document.getElementById("dlg-confirm").addEventListener("click", () => {
  const cb = dlgCallback; // erst sichern
  closeDialog();          // dann schließen (setzt dlgCallback = null)
  cb?.();                 // dann ausführen
});
document.getElementById("confirm-overlay").addEventListener("click", e => {
  if (e.target === e.currentTarget) closeDialog();
});
