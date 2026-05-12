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
  // ── Obst & Gemüse ─────────────────────────────────────────
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
  {name:"Süßkartoffel",emoji:"🍠",cat:"obst"},{name:"Rote Bete",emoji:"🥕",cat:"obst"},
  {name:"Kohlrabi",emoji:"🥬",cat:"obst"},{name:"Lauch",emoji:"🌿",cat:"obst"},
  {name:"Sellerie",emoji:"🌿",cat:"obst"},{name:"Fenchel",emoji:"🌿",cat:"obst"},
  {name:"Spargel",emoji:"🌿",cat:"obst"},{name:"Rosenkohl",emoji:"🥦",cat:"obst"},
  {name:"Rotkohl",emoji:"🥬",cat:"obst"},{name:"Weißkohl",emoji:"🥬",cat:"obst"},
  {name:"Wirsing",emoji:"🥬",cat:"obst"},{name:"Kürbis",emoji:"🎃",cat:"obst"},
  {name:"Rucola",emoji:"🥬",cat:"obst"},{name:"Babyspinat",emoji:"🥬",cat:"obst"},
  {name:"Grüne Bohnen",emoji:"🫛",cat:"obst"},{name:"Erbsen",emoji:"🫛",cat:"obst"},
  {name:"Zuckerschoten",emoji:"🫛",cat:"obst"},{name:"Grapefruit",emoji:"🍊",cat:"obst"},
  {name:"Limette",emoji:"🍋",cat:"obst"},{name:"Petersilie",emoji:"🌿",cat:"obst"},
  {name:"Basilikum",emoji:"🌿",cat:"obst"},{name:"Koriander",emoji:"🌿",cat:"obst"},
  {name:"Schnittlauch",emoji:"🌿",cat:"obst"},{name:"Dill",emoji:"🌿",cat:"obst"},
  {name:"Minze",emoji:"🌿",cat:"obst"},{name:"Ingwer",emoji:"🫚",cat:"obst"},
  {name:"Mangold",emoji:"🥬",cat:"obst"},{name:"Pak Choi",emoji:"🥬",cat:"obst"},
  {name:"Artischocke",emoji:"🌿",cat:"obst"},{name:"Physalis",emoji:"🍊",cat:"obst"},
  {name:"Blumenkohl",emoji:"🥦",cat:"obst"},{name:"Stangensellerie",emoji:"🌿",cat:"obst"},
  {name:"Pastinake",emoji:"🥕",cat:"obst"},{name:"Maronenkürbis",emoji:"🎃",cat:"obst"},
  // ── Brot & Gebäck ──────────────────────────────────────────
  {name:"Toastbrot",emoji:"🍞",cat:"brot"},{name:"Brötchen",emoji:"🥐",cat:"brot"},
  {name:"Vollkornbrot",emoji:"🍞",cat:"brot"},{name:"Croissant",emoji:"🥐",cat:"brot"},
  {name:"Brezel",emoji:"🥨",cat:"brot"},{name:"Baguette",emoji:"🥖",cat:"brot"},
  {name:"Laugenbrezel",emoji:"🥨",cat:"brot"},{name:"Roggenbrot",emoji:"🍞",cat:"brot"},
  {name:"Knäckebrot",emoji:"🍞",cat:"brot"},{name:"Zwieback",emoji:"🍞",cat:"brot"},
  {name:"Pumpernickel",emoji:"🍞",cat:"brot"},{name:"Dinkelbrötchen",emoji:"🥐",cat:"brot"},
  {name:"Sonnenblumenbrot",emoji:"🍞",cat:"brot"},{name:"Tortillas",emoji:"🫓",cat:"brot"},
  {name:"Fladenbrot",emoji:"🫓",cat:"brot"},{name:"Graubrot",emoji:"🍞",cat:"brot"},
  {name:"Ciabatta",emoji:"🍞",cat:"brot"},{name:"Kaisersemmel",emoji:"🥐",cat:"brot"},
  {name:"Mehrkornbrot",emoji:"🍞",cat:"brot"},{name:"Leinsamenbrot",emoji:"🍞",cat:"brot"},
  // ── Fleisch & Fisch ────────────────────────────────────────
  {name:"Hähnchen",emoji:"🍗",cat:"fleisch"},{name:"Hähnchenbrust",emoji:"🍗",cat:"fleisch"},
  {name:"Hähnchenfilet",emoji:"🍗",cat:"fleisch"},{name:"Hackfleisch",emoji:"🥩",cat:"fleisch"},
  {name:"Lachs",emoji:"🐟",cat:"fleisch"},{name:"Thunfisch",emoji:"🐠",cat:"fleisch"},
  {name:"Schweinefilet",emoji:"🥩",cat:"fleisch"},{name:"Bratwurst",emoji:"🌭",cat:"fleisch"},
  {name:"Schinken",emoji:"🍖",cat:"fleisch"},{name:"Garnelen",emoji:"🦐",cat:"fleisch"},
  {name:"Rindfleisch",emoji:"🥩",cat:"fleisch"},{name:"Salami",emoji:"🍕",cat:"fleisch"},
  {name:"Fischfilet",emoji:"🐟",cat:"fleisch"},{name:"Putenbraten",emoji:"🍗",cat:"fleisch"},
  {name:"Speck",emoji:"🥓",cat:"fleisch"},{name:"Kabeljau",emoji:"🐟",cat:"fleisch"},
  {name:"Putenbrust",emoji:"🍗",cat:"fleisch"},{name:"Putenstreifen",emoji:"🍗",cat:"fleisch"},
  {name:"Schweineschnitzel",emoji:"🥩",cat:"fleisch"},{name:"Rindersteak",emoji:"🥩",cat:"fleisch"},
  {name:"Lammkotelett",emoji:"🥩",cat:"fleisch"},{name:"Forelle",emoji:"🐟",cat:"fleisch"},
  {name:"Hering",emoji:"🐟",cat:"fleisch"},{name:"Makrele",emoji:"🐟",cat:"fleisch"},
  {name:"Leberwurst",emoji:"🍖",cat:"fleisch"},{name:"Chorizo",emoji:"🌭",cat:"fleisch"},
  {name:"Kochschinken",emoji:"🍖",cat:"fleisch"},{name:"Truthahn",emoji:"🍗",cat:"fleisch"},
  {name:"Ente",emoji:"🍗",cat:"fleisch"},{name:"Lachsfilet",emoji:"🐟",cat:"fleisch"},
  {name:"Shrimps",emoji:"🦐",cat:"fleisch"},{name:"Dosenthunfisch",emoji:"🐠",cat:"fleisch"},
  {name:"Pangasius",emoji:"🐟",cat:"fleisch"},{name:"Hühnchen",emoji:"🍗",cat:"fleisch"},
  {name:"Schweinebauch",emoji:"🥓",cat:"fleisch"},{name:"Gulasch",emoji:"🥩",cat:"fleisch"},
  {name:"Rinderhackfleisch",emoji:"🥩",cat:"fleisch"},{name:"Gemischtes Hackfleisch",emoji:"🥩",cat:"fleisch"},
  // ── Fertig- & Tiefkühlprodukte ─────────────────────────────
  {name:"TK-Pizza",emoji:"🍕",cat:"fertig"},{name:"Pommes",emoji:"🍟",cat:"fertig"},
  {name:"Fischstäbchen",emoji:"🐟",cat:"fertig"},{name:"TK-Erbsen",emoji:"🫛",cat:"fertig"},
  {name:"TK-Spinat",emoji:"🥬",cat:"fertig"},{name:"TK-Beeren",emoji:"🍓",cat:"fertig"},
  {name:"TK-Lasagne",emoji:"🍝",cat:"fertig"},{name:"TK-Nuggets",emoji:"🍗",cat:"fertig"},
  {name:"TK-Gemüse",emoji:"🥦",cat:"fertig"},{name:"Fertigsalat",emoji:"🥗",cat:"fertig"},
  {name:"TK-Brokkoli",emoji:"🥦",cat:"fertig"},{name:"TK-Blumenkohl",emoji:"🥦",cat:"fertig"},
  {name:"TK-Baguette",emoji:"🥖",cat:"fertig"},{name:"TK-Garnelen",emoji:"🦐",cat:"fertig"},
  {name:"TK-Schnitzel",emoji:"🥩",cat:"fertig"},{name:"TK-Burger",emoji:"🍔",cat:"fertig"},
  {name:"TK-Edamame",emoji:"🫛",cat:"fertig"},{name:"TK-Fischfilet",emoji:"🐟",cat:"fertig"},
  {name:"TK-Pommes curly",emoji:"🍟",cat:"fertig"},{name:"TK-Suppe",emoji:"🍲",cat:"fertig"},
  {name:"TK-Hähnchenbrust",emoji:"🍗",cat:"fertig"},{name:"TK-Kartoffeln",emoji:"🥔",cat:"fertig"},
  {name:"TK-Erbsen & Möhren",emoji:"🥕",cat:"fertig"},{name:"TK-Mais",emoji:"🌽",cat:"fertig"},
  {name:"TK-Rote Bete",emoji:"🥕",cat:"fertig"},{name:"Convenience-Wrap",emoji:"🌯",cat:"fertig"},
  // ── Milch & Käse ───────────────────────────────────────────
  {name:"Milch",emoji:"🥛",cat:"milch"},{name:"Käse",emoji:"🧀",cat:"milch"},
  {name:"Butter",emoji:"🧈",cat:"milch"},{name:"Joghurt",emoji:"🥛",cat:"milch"},
  {name:"Sahne",emoji:"🍶",cat:"milch"},{name:"Eier",emoji:"🥚",cat:"milch"},
  {name:"Quark",emoji:"🥛",cat:"milch"},{name:"Mozzarella",emoji:"🧀",cat:"milch"},
  {name:"Frischkäse",emoji:"🧀",cat:"milch"},{name:"Creme fraîche",emoji:"🥛",cat:"milch"},
  {name:"Kefir",emoji:"🥛",cat:"milch"},{name:"Parmesan",emoji:"🧀",cat:"milch"},
  {name:"Schmand",emoji:"🥛",cat:"milch"},{name:"Buttermilch",emoji:"🥛",cat:"milch"},
  {name:"Skyr",emoji:"🥛",cat:"milch"},{name:"Emmentaler",emoji:"🧀",cat:"milch"},
  {name:"Gouda",emoji:"🧀",cat:"milch"},{name:"Brie",emoji:"🧀",cat:"milch"},
  {name:"Feta",emoji:"🧀",cat:"milch"},{name:"Schlagsahne",emoji:"🍶",cat:"milch"},
  {name:"Hüttenkäse",emoji:"🧀",cat:"milch"},{name:"Kondensmilch",emoji:"🥛",cat:"milch"},
  {name:"Hafermilch",emoji:"🥛",cat:"milch"},{name:"Mandelmilch",emoji:"🥛",cat:"milch"},
  {name:"Sojamilch",emoji:"🥛",cat:"milch"},{name:"Doppelrahmfrischkäse",emoji:"🧀",cat:"milch"},
  {name:"Mascarpone",emoji:"🧀",cat:"milch"},{name:"Ricotta",emoji:"🧀",cat:"milch"},
  {name:"Camembert",emoji:"🧀",cat:"milch"},{name:"Tilsiter",emoji:"🧀",cat:"milch"},
  {name:"Griechischer Joghurt",emoji:"🥛",cat:"milch"},{name:"Naturjoghurt",emoji:"🥛",cat:"milch"},
  // ── Zutaten & Gewürze ──────────────────────────────────────
  {name:"Salz",emoji:"🧂",cat:"gewuerze"},{name:"Pfeffer",emoji:"🌶️",cat:"gewuerze"},
  {name:"Olivenöl",emoji:"🫒",cat:"gewuerze"},{name:"Essig",emoji:"🍶",cat:"gewuerze"},
  {name:"Ketchup",emoji:"🍅",cat:"gewuerze"},{name:"Senf",emoji:"🌿",cat:"gewuerze"},
  {name:"Mayonnaise",emoji:"🥄",cat:"gewuerze"},{name:"Sojasoße",emoji:"🫙",cat:"gewuerze"},
  {name:"Tomatenmark",emoji:"🍅",cat:"gewuerze"},{name:"Honig",emoji:"🍯",cat:"gewuerze"},
  {name:"Marmelade",emoji:"🍓",cat:"gewuerze"},{name:"Nutella",emoji:"🍫",cat:"gewuerze"},
  {name:"Curry",emoji:"🌶️",cat:"gewuerze"},{name:"Paprikapulver",emoji:"🌶️",cat:"gewuerze"},
  {name:"Oregano",emoji:"🌿",cat:"gewuerze"},{name:"Zimt",emoji:"🌿",cat:"gewuerze"},
  {name:"Balsamico",emoji:"🍶",cat:"gewuerze"},{name:"Chilisoße",emoji:"🌶️",cat:"gewuerze"},
  {name:"Sriracha",emoji:"🌶️",cat:"gewuerze"},{name:"Agavensirup",emoji:"🍯",cat:"gewuerze"},
  {name:"Ahornsirup",emoji:"🍁",cat:"gewuerze"},{name:"Erdnussbutter",emoji:"🥜",cat:"gewuerze"},
  {name:"Mandelmus",emoji:"🥜",cat:"gewuerze"},{name:"Tahini",emoji:"🫙",cat:"gewuerze"},
  {name:"Thymian",emoji:"🌿",cat:"gewuerze"},{name:"Rosmarin",emoji:"🌿",cat:"gewuerze"},
  {name:"Muskat",emoji:"🌿",cat:"gewuerze"},{name:"Kreuzkümmel",emoji:"🌿",cat:"gewuerze"},
  {name:"Knoblauchgranulat",emoji:"🧄",cat:"gewuerze"},{name:"Vanillezucker",emoji:"🍬",cat:"gewuerze"},
  {name:"Zucker",emoji:"🍬",cat:"gewuerze"},{name:"Backpulver",emoji:"🌾",cat:"gewuerze"},
  {name:"Speisestärke",emoji:"🌾",cat:"gewuerze"},{name:"Worcestershiresoße",emoji:"🫙",cat:"gewuerze"},
  {name:"Teriyakisoße",emoji:"🫙",cat:"gewuerze"},{name:"Pflanzenöl",emoji:"🫒",cat:"gewuerze"},
  {name:"Rapsöl",emoji:"🫒",cat:"gewuerze"},{name:"Kokosnussöl",emoji:"🥥",cat:"gewuerze"},
  {name:"Rotweinessig",emoji:"🍶",cat:"gewuerze"},{name:"Weißweinessig",emoji:"🍶",cat:"gewuerze"},
  {name:"Kondensmilch gesüßt",emoji:"🥛",cat:"gewuerze"},{name:"Kokosmilch",emoji:"🥥",cat:"gewuerze"},
  {name:"Hühnerbrühe",emoji:"🍲",cat:"gewuerze"},{name:"Gemüsebrühe",emoji:"🍲",cat:"gewuerze"},
  {name:"Lorbeerblätter",emoji:"🌿",cat:"gewuerze"},{name:"Kümmel",emoji:"🌿",cat:"gewuerze"},
  {name:"Nelken",emoji:"🌿",cat:"gewuerze"},{name:"Kardamom",emoji:"🌿",cat:"gewuerze"},
  {name:"Kurkuma",emoji:"🌿",cat:"gewuerze"},{name:"Ingwerpulver",emoji:"🌿",cat:"gewuerze"},
  {name:"Chilipulver",emoji:"🌶️",cat:"gewuerze"},{name:"Meersalz",emoji:"🧂",cat:"gewuerze"},
  {name:"Suppenwürze",emoji:"🫙",cat:"gewuerze"},{name:"Pizzasoße",emoji:"🍅",cat:"gewuerze"},
  // ── Getreideprodukte ───────────────────────────────────────
  {name:"Spaghetti",emoji:"🍝",cat:"getreide"},{name:"Penne",emoji:"🍝",cat:"getreide"},
  {name:"Reis",emoji:"🍚",cat:"getreide"},{name:"Mehl",emoji:"🌾",cat:"getreide"},
  {name:"Haferflocken",emoji:"🌾",cat:"getreide"},{name:"Müsli",emoji:"🌾",cat:"getreide"},
  {name:"Quinoa",emoji:"🌾",cat:"getreide"},{name:"Couscous",emoji:"🌾",cat:"getreide"},
  {name:"Cornflakes",emoji:"🌽",cat:"getreide"},{name:"Lasagneplatten",emoji:"🍝",cat:"getreide"},
  {name:"Tagliatelle",emoji:"🍝",cat:"getreide"},{name:"Fusilli",emoji:"🍝",cat:"getreide"},
  {name:"Rigatoni",emoji:"🍝",cat:"getreide"},{name:"Basmati-Reis",emoji:"🍚",cat:"getreide"},
  {name:"Risotto-Reis",emoji:"🍚",cat:"getreide"},{name:"Polenta",emoji:"🌾",cat:"getreide"},
  {name:"Bulgur",emoji:"🌾",cat:"getreide"},{name:"Rote Linsen",emoji:"🌾",cat:"getreide"},
  {name:"Grüne Linsen",emoji:"🌾",cat:"getreide"},{name:"Kichererbsen",emoji:"🌾",cat:"getreide"},
  {name:"Kidneybohnen",emoji:"🌾",cat:"getreide"},{name:"Paniermehl",emoji:"🌾",cat:"getreide"},
  {name:"Glasnudeln",emoji:"🍝",cat:"getreide"},{name:"Reisnudeln",emoji:"🍝",cat:"getreide"},
  {name:"Granola",emoji:"🌾",cat:"getreide"},{name:"Pizzateig",emoji:"🍕",cat:"getreide"},
  {name:"Blätterteig",emoji:"🥐",cat:"getreide"},{name:"Dinkelmehl",emoji:"🌾",cat:"getreide"},
  {name:"Vollkornmehl",emoji:"🌾",cat:"getreide"},{name:"Hartweizengries",emoji:"🌾",cat:"getreide"},
  {name:"Schwarze Bohnen",emoji:"🌾",cat:"getreide"},{name:"Weiße Bohnen",emoji:"🌾",cat:"getreide"},
  {name:"Udon-Nudeln",emoji:"🍝",cat:"getreide"},{name:"Spätzle",emoji:"🍝",cat:"getreide"},
  {name:"Tortellini",emoji:"🍝",cat:"getreide"},{name:"Jasmin-Reis",emoji:"🍚",cat:"getreide"},
  {name:"Hirse",emoji:"🌾",cat:"getreide"},{name:"Buchweizen",emoji:"🌾",cat:"getreide"},
  // ── Snacks & Süßwaren & Getränke ───────────────────────────
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
  {name:"Tortilla Chips",emoji:"🍟",cat:"snacks"},{name:"Cashews",emoji:"🥜",cat:"snacks"},
  {name:"Mandeln",emoji:"🥜",cat:"snacks"},{name:"Erdnüsse",emoji:"🥜",cat:"snacks"},
  {name:"Walnüsse",emoji:"🥜",cat:"snacks"},{name:"Pistazien",emoji:"🥜",cat:"snacks"},
  {name:"Studentenfutter",emoji:"🥜",cat:"snacks"},{name:"Cracker",emoji:"🥨",cat:"snacks"},
  {name:"Reiswaffeln",emoji:"🥨",cat:"snacks"},{name:"Müsliriegel",emoji:"🍫",cat:"snacks"},
  {name:"Dunkle Schokolade",emoji:"🍫",cat:"snacks"},{name:"Milchschokolade",emoji:"🍫",cat:"snacks"},
  {name:"Weiße Schokolade",emoji:"🍫",cat:"snacks"},{name:"Lakritz",emoji:"🍬",cat:"snacks"},
  {name:"Weingummi",emoji:"🐻",cat:"snacks"},{name:"Fruchtgummi",emoji:"🐻",cat:"snacks"},
  {name:"Marzipan",emoji:"🍬",cat:"snacks"},{name:"Kakao",emoji:"☕",cat:"snacks"},
  {name:"Trinkschokolade",emoji:"☕",cat:"snacks"},{name:"Sekt",emoji:"🥂",cat:"snacks"},
  {name:"Sprudelwasser",emoji:"💧",cat:"snacks"},{name:"Smoothie",emoji:"🥤",cat:"snacks"},
  {name:"Kokoswasser",emoji:"🥥",cat:"snacks"},{name:"Multivitaminsaft",emoji:"🧃",cat:"snacks"},
  {name:"Tomatensaft",emoji:"🍅",cat:"snacks"},{name:"Apfelschorle",emoji:"🍎",cat:"snacks"},
  {name:"Malzkaffee",emoji:"☕",cat:"snacks"},{name:"Proteinriegel",emoji:"🍫",cat:"snacks"},
  {name:"Pringles",emoji:"🍟",cat:"snacks"},{name:"Haselnüsse",emoji:"🥜",cat:"snacks"},
  {name:"Macadamia",emoji:"🥜",cat:"snacks"},{name:"Nuss-Mix",emoji:"🥜",cat:"snacks"},
  {name:"Latte Macchiato",emoji:"☕",cat:"snacks"},{name:"Eistee",emoji:"🍵",cat:"snacks"},
  {name:"Säfte-Mix",emoji:"🧃",cat:"snacks"},{name:"Prosecco",emoji:"🥂",cat:"snacks"},
  // ── Haushalt ───────────────────────────────────────────────
  {name:"Toilettenpapier",emoji:"🧻",cat:"haushalt"},{name:"Spülmittel",emoji:"🫧",cat:"haushalt"},
  {name:"Müllbeutel",emoji:"🗑️",cat:"haushalt"},{name:"Waschmittel",emoji:"👕",cat:"haushalt"},
  {name:"Putzmittel",emoji:"🧹",cat:"haushalt"},{name:"Küchentücher",emoji:"🧻",cat:"haushalt"},
  {name:"Schwämme",emoji:"🧽",cat:"haushalt"},{name:"Backpapier",emoji:"📄",cat:"haushalt"},
  {name:"Frischhaltefolie",emoji:"📦",cat:"haushalt"},{name:"Geschirrspültabs",emoji:"🫧",cat:"haushalt"},
  {name:"Weichspüler",emoji:"👕",cat:"haushalt"},{name:"Batterien",emoji:"🔋",cat:"haushalt"},
  {name:"Aluminiumfolie",emoji:"📦",cat:"haushalt"},{name:"Gefrierbeutel",emoji:"📦",cat:"haushalt"},
  {name:"WC-Reiniger",emoji:"🧹",cat:"haushalt"},{name:"Glasreiniger",emoji:"🫧",cat:"haushalt"},
  {name:"Abflussreiniger",emoji:"🧹",cat:"haushalt"},{name:"Reinigungstücher",emoji:"🧻",cat:"haushalt"},
  {name:"Scheuerschwamm",emoji:"🧽",cat:"haushalt"},{name:"Kerzen",emoji:"🕯️",cat:"haushalt"},
  {name:"Teelichter",emoji:"🕯️",cat:"haushalt"},{name:"Streichhölzer",emoji:"🔥",cat:"haushalt"},
  {name:"Lufterfrischer",emoji:"🌸",cat:"haushalt"},{name:"Papiertüten",emoji:"📦",cat:"haushalt"},
  {name:"Einweghandschuhe",emoji:"🧤",cat:"haushalt"},{name:"Küchenrolle groß",emoji:"🧻",cat:"haushalt"},
  {name:"Mülltüten groß",emoji:"🗑️",cat:"haushalt"},{name:"Scheuermilch",emoji:"🧹",cat:"haushalt"},
  {name:"Spülbürste",emoji:"🫧",cat:"haushalt"},{name:"Wäscheklammern",emoji:"👕",cat:"haushalt"},
  // ── Pflege & Gesundheit ────────────────────────────────────
  {name:"Shampoo",emoji:"🧴",cat:"pflege"},{name:"Zahnpasta",emoji:"🦷",cat:"pflege"},
  {name:"Seife",emoji:"🧼",cat:"pflege"},{name:"Deo",emoji:"🧴",cat:"pflege"},
  {name:"Rasierer",emoji:"🪒",cat:"pflege"},{name:"Duschgel",emoji:"🚿",cat:"pflege"},
  {name:"Pflaster",emoji:"🩹",cat:"pflege"},{name:"Creme",emoji:"🧴",cat:"pflege"},
  {name:"Paracetamol",emoji:"💊",cat:"pflege"},{name:"Ibuprofen",emoji:"💊",cat:"pflege"},
  {name:"Zahnbürste",emoji:"🪥",cat:"pflege"},{name:"Wattepads",emoji:"🌸",cat:"pflege"},
  {name:"Sonnencreme",emoji:"🧴",cat:"pflege"},{name:"Körperlotion",emoji:"🧴",cat:"pflege"},
  {name:"Haarspülung",emoji:"🧴",cat:"pflege"},{name:"Rasierschaum",emoji:"🪒",cat:"pflege"},
  {name:"Mundwasser",emoji:"🦷",cat:"pflege"},{name:"Zahnseide",emoji:"🪥",cat:"pflege"},
  {name:"Wattestäbchen",emoji:"🌸",cat:"pflege"},{name:"Handcreme",emoji:"🧴",cat:"pflege"},
  {name:"Vitamintabletten",emoji:"💊",cat:"pflege"},{name:"Vitamin C",emoji:"💊",cat:"pflege"},
  {name:"Magnesium",emoji:"💊",cat:"pflege"},{name:"Nasenspray",emoji:"💊",cat:"pflege"},
  {name:"Desinfektionsmittel",emoji:"🧼",cat:"pflege"},{name:"Tampons",emoji:"🌸",cat:"pflege"},
  {name:"Haargel",emoji:"🧴",cat:"pflege"},{name:"Augentropfen",emoji:"💊",cat:"pflege"},
  {name:"Fußcreme",emoji:"🧴",cat:"pflege"},{name:"Lippenbalsam",emoji:"🧴",cat:"pflege"},
  {name:"Haarmaske",emoji:"🧴",cat:"pflege"},{name:"Abführmittel",emoji:"💊",cat:"pflege"},
  // ── Tierbedarf ─────────────────────────────────────────────
  {name:"Hundefutter",emoji:"🐕",cat:"tier"},{name:"Katzenfutter",emoji:"🐈",cat:"tier"},
  {name:"Katzenstreu",emoji:"🐱",cat:"tier"},{name:"Hundeleckerli",emoji:"🦴",cat:"tier"},
  {name:"Vogelkörner",emoji:"🐦",cat:"tier"},{name:"Aquariumfutter",emoji:"🐠",cat:"tier"},
  {name:"Hamsterfutter",emoji:"🐹",cat:"tier"},{name:"Kaninchenfutter",emoji:"🐰",cat:"tier"},
  {name:"Hundeshampoo",emoji:"🐕",cat:"tier"},{name:"Katzenspielzeug",emoji:"🐈",cat:"tier"},
  {name:"Hundespielzeug",emoji:"🐕",cat:"tier"},{name:"Katzenmilch",emoji:"🐈",cat:"tier"},
  {name:"Nasskatzenfutter",emoji:"🐱",cat:"tier"},{name:"Trockenhundefutter",emoji:"🐕",cat:"tier"},
  // ── Baumarkt & Garten ──────────────────────────────────────
  {name:"Blumenerde",emoji:"🌱",cat:"baumarkt"},{name:"Blumendünger",emoji:"🌿",cat:"baumarkt"},
  {name:"Blumen",emoji:"🌸",cat:"baumarkt"},{name:"Glühbirnen",emoji:"💡",cat:"baumarkt"},
  {name:"Schrauben",emoji:"🔩",cat:"baumarkt"},{name:"Klebeband",emoji:"🎗️",cat:"baumarkt"},
  {name:"Saatgut",emoji:"🌱",cat:"baumarkt"},{name:"Gartenhandschuhe",emoji:"🧤",cat:"baumarkt"},
  {name:"Gießkanne",emoji:"🪣",cat:"baumarkt"},{name:"Blumentopf",emoji:"🪴",cat:"baumarkt"},
  {name:"Rasendünger",emoji:"🌿",cat:"baumarkt"},{name:"Insektenschutz",emoji:"🌿",cat:"baumarkt"},
  {name:"Pflanzenstäbe",emoji:"🌱",cat:"baumarkt"},{name:"Pflanzerde",emoji:"🌱",cat:"baumarkt"},
  {name:"Torf",emoji:"🌱",cat:"baumarkt"},{name:"Kies",emoji:"🪨",cat:"baumarkt"},
];

// ── EMOJI-ERKENNUNG für eigene Artikel ────────────────────────────────────────
const EMOJI_MAP = [
  // Obst & Gemüse
  [["apfel","äpfel"],         "🍎"], [["birne"],                 "🍐"],
  [["banane"],                "🍌"], [["orange","mandarine"],    "🍊"],
  [["zitrone","limette"],     "🍋"], [["erdbeere"],              "🍓"],
  [["weintraube","traube"],   "🍇"], [["kirsche"],               "🍒"],
  [["pfirsich"],              "🍑"], [["avocado"],               "🥑"],
  [["melone"],                "🍉"], [["ananas"],                "🍍"],
  [["mango"],                 "🥭"], [["kiwi"],                  "🥝"],
  [["blaubeere"],             "🫐"], [["tomate"],                "🍅"],
  [["paprika"],               "🫑"], [["gurke"],                 "🥒"],
  [["karotte","möhre"],       "🥕"], [["kartoffel"],             "🥔"],
  [["mais"],                  "🌽"], [["zwiebel"],               "🧅"],
  [["knoblauch"],             "🧄"], [["brokkoli"],              "🥦"],
  [["salat"],                 "🥬"], [["spinat"],                "🥬"],
  [["pilz"],                  "🍄"], [["aubergine"],             "🍆"],
  [["zucchini"],              "🥒"], [["erbse"],                 "🫛"],
  [["sellerie","lauch"],      "🌿"], [["süßkartoffel"],          "🍠"],
  [["rote bete","randen"],    "🥕"], [["kohlrabi"],              "🥬"],
  [["fenchel"],               "🌿"], [["spargel"],               "🌿"],
  [["rosenkohl"],             "🥦"], [["rotkohl","weißkohl","wirsing"],"🥬"],
  [["kürbis"],                "🎃"], [["rucola"],                "🥬"],
  [["bohne"],                 "🫛"], [["zuckerschote"],          "🫛"],
  [["grapefruit"],            "🍊"], [["ingwer"],                "🫚"],
  [["mangold","pak choi"],    "🥬"], [["petersilie","basilikum","koriander","dill","minze","schnittlauch"],"🌿"],
  [["artischocke","stangensellerie","pastinake"],"🌿"],
  // Fleisch & Fisch
  [["hähnchen","hühnchen","chicken","geflügel","putenbrust","putenstreifen","truthahn","ente"],"🍗"],
  [["hack","faschiert"],      "🥩"], [["rind","steak","beef","gulasch","rinderhack"],"🥩"],
  [["schwein","kotelett","schnitzel"],"🥩"], [["lamm"],            "🥩"],
  [["wurst","bratwurst","chorizo"],"🌭"], [["schinken","kochschinken"],"🍖"],
  [["salami"],                "🍕"], [["speck","bacon"],          "🥓"],
  [["lachs","lachsfilet"],    "🐟"], [["thunfisch","dosenth"],   "🐠"],
  [["fisch","forelle","hering","makrele","pangasius","kabeljau"],"🐟"],
  [["garnele","shrimp"],      "🦐"], [["hummer","krebs"],        "🦞"],
  [["leberwurst"],            "🍖"],
  // Brot & Gebäck
  [["brot"],                  "🍞"], [["brötchen","semmel","kaiser"],"🥐"],
  [["croissant"],             "🥐"], [["baguette"],              "🥖"],
  [["brezel","laugen"],       "🥨"], [["toast"],                 "🍞"],
  [["kuchen","torte"],        "🎂"], [["muffin"],                "🧁"],
  [["tortilla","fladenbrot","ciabatta","wrap"],"🫓"],
  [["knäckebrot","zwieback","pumpernickel"],"🍞"],
  // Milch & Käse
  [["milch"],                 "🥛"], [["käse","mozzarella","parmesan","gouda","brie","feta","emmentaler","tilsiter","camembert","mascarpone","ricotta"],"🧀"],
  [["butter"],                "🧈"], [["joghurt","skyr"],        "🥛"],
  [["sahne","schlagsahne"],   "🍶"], [["ei","eier"],             "🥚"],
  [["quark","hüttenkäse"],    "🥛"], [["frischkäse","doppelrahmfrischkäse"],"🧀"],
  [["creme fraiche","schmand"],"🥛"],[["kefir","buttermilch"],  "🥛"],
  [["hafermilch","mandelmilch","sojamilch","pflanzenmilch"],"🥛"],
  // Getränke
  [["wasser","sprudel"],      "💧"], [["saft","nektar"],         "🧃"],
  [["kaffee","latte","espresso"],"☕"],[["tee"],                "🍵"],
  [["cola","fanta","sprite","limo"],"🥤"],[["bier"],            "🍺"],
  [["wein","sekt","prosecco"],"🍷"], [["limonade"],             "🥤"],
  [["energy","monster"],      "⚡"], [["whisky","rum","vodka"],  "🥃"],
  [["smoothie","kokoswasser"], "🥤"],
  // Zutaten & Gewürze
  [["salz","meersalz"],       "🧂"], [["pfeffer"],              "🌶️"],
  [["olivenöl","rapsöl","pflanzenöl","kokosnussöl"],"🫒"],
  [["essig","balsamico","weißwein","rotwein"], "🍶"],
  [["ketchup"],               "🍅"], [["senf","mustard"],       "🌿"],
  [["mayo","mayonnaise","remoulade"],"🥄"],
  [["sojasoße","teriyaki","worcestershire","sauce"],"🫙"],
  [["tomatenmark","tomatensoße","pizzasoße"],"🍅"],
  [["honig","agavensirup"],   "🍯"], [["ahornsirup"],           "🍁"],
  [["marmelade","konfitüre"], "🍓"], [["nutella","aufstrich"],  "🍫"],
  [["erdnussbutter","mandelmus"],"🥜"],[["tahini"],             "🫙"],
  [["curry"],                 "🌶️"], [["zimt","vanille"],      "🌿"],
  [["zucker","vanillezucker","puderzucker"],"🍬"],
  [["mehl","backpulver","natron","speisestärke","paniermehl","hartweizen"],"🌾"],
  [["chili","sriracha","chilipulver","paprikapulver"],"🌶️"],
  [["thymian","rosmarin","oregano","muskat","kreuzkümmel","kümmel","lorbeer","nelken","kardamom","kurkuma","ingwerpulver"],"🌿"],
  [["brühe","suppenwürze"],   "🍲"], [["kokosmilch"],           "🥥"],
  // Getreide & Pasta
  [["nudel","pasta","spaghetti","penne","tagliatelle","lasagne","fusilli","rigatoni","tortellini","spätzle","udon","glasnudel","reisnudel"],"🍝"],
  [["reis","basmati","jasmin","risotto"],"🍚"],
  [["haferflocken","hafer"],  "🌾"], [["müsli","granola"],      "🌾"],
  [["quinoa","couscous","bulgur","polenta","hirse","buchweizen"],"🌾"],
  [["cornflakes","cerealien"],"🌽"],
  [["linse","kichererbse","kidneybohne","schwarze bohne","weiße bohne"],"🌾"],
  [["pizzateig"],             "🍕"], [["blätterteig"],          "🥐"],
  // Snacks & Süßes
  [["schokolade","schoki","kakao","trinkschokolade"],"🍫"],
  [["chips","pringles"],      "🍟"], [["keks","plätzchen"],     "🍪"],
  [["gummibär","weingummi","fruchtgummi"],"🐻"],
  [["nuss","mandel","haselnuss","cashew","erdnuss","walnuss","pistazie","macadamia","nuss-mix"],"🥜"],
  [["popcorn"],               "🍿"], [["eis","eiscreme"],       "🍦"],
  [["bonbon","lakritz","marzipan"],"🍬"],
  [["riegel","müsliriegel","proteinriegel"],"🍫"],
  [["salzstange","cracker","reiswaffel"],"🥨"],
  // Haushalt
  [["toilettenpapier","klopapier","küchenrolle","küchenpapier","küchenrolle groß"],"🧻"],
  [["spülmittel"],            "🫧"], [["waschmittel","weichspüler"],"👕"],
  [["putzmittel","reiniger","scheuermilch"],"🧹"],
  [["müllbeutel","müllsack","mülltüten"],"🗑️"],
  [["schwamm","scheuerschwamm"],"🧽"],
  [["backpapier"],            "📄"], [["folie","alufolie","gefrierbeutel"],"📦"],
  [["geschirrspül","spülbürste"],"🫧"], [["batterie"],          "🔋"],
  [["glühbirne","lampe"],     "💡"], [["kerze","teelicht"],     "🕯️"],
  [["einweghandschuh","wäscheklammer"],"🧤"],
  // Pflege & Gesundheit
  [["shampoo","haarspülung","haargel","haarmaske"],"🧴"],
  [["zahnpasta","mundwasser"],"🦷"], [["seife","desinfektions"],"🧼"],
  [["deo","deodorant"],       "🧴"], [["rasierer","rasierschaum"],"🪒"],
  [["duschgel"],              "🚿"], [["pflaster"],             "🩹"],
  [["creme","lotion","körperlotion","handcreme","fußcreme","sonnencreme","lippenbalsam"],"🧴"],
  [["tablette","pille","medikament","paracetamol","ibuprofen","vitamin","magnesium","nasenspray","augentropfen","abführmittel"],"💊"],
  [["zahnbürste","zahnseide"],"🪥"], [["watte","wattepads","wattestäbchen","tampons"],"🌸"],
  // Tierbedarf
  [["hundefutter","hundenap","trockenhunde"],"🐕"],
  [["katzenfutter","nasska","katzenmilch"],"🐈"],
  [["katzenstreu","streu"],   "🐱"], [["leckerli","hundeleckerli"],"🦴"],
  [["vogelkörner","vogelfutter"],"🐦"], [["aquarium"],          "🐠"],
  [["hamsterfutter"],         "🐹"], [["kaninchenfutter"],      "🐰"],
  // Baumarkt & Garten
  [["blumenerde","kompost","erde","pflanzerde","torf"],"🌱"],
  [["dünger","rasendünger"],  "🌿"], [["blume","pflanze"],      "🌸"],
  [["schraube","nagel"],      "🔩"], [["klebeband","tape"],     "🎗️"],
  [["saatgut","samen"],       "🌱"], [["handschuh","gartenhandschuh"],"🧤"],
  [["farbe","lack"],          "🎨"], [["gießkanne"],            "🪣"],
  [["blumentopf"],            "🪴"], [["pflanzenstab"],         "🌱"],
  [["insektenschutz"],        "🌿"], [["kies"],                 "🪨"],
];

// ── KATEGORIE-ERKENNUNG für eigene Artikel ────────────────────────────────────
function guessCat(name) {
  // 1. Exakter Match in Artikeldatenbank
  const exact = ITEMS_DB.find(it => it.name.toLowerCase() === name.toLowerCase());
  if (exact) return exact.cat;

  // 2. Partieller Match
  const n = name.toLowerCase();
  const partial = ITEMS_DB.find(it =>
    n.includes(it.name.toLowerCase()) || it.name.toLowerCase().includes(n)
  );
  if (partial) return partial.cat;

  // 3. Keyword-Matching nach Kategorie
  const catKeywords = {
    obst:      ["apfel","birne","banane","orange","zitrone","erdbeere","tomate","gurke","karotte","kartoffel","zwiebel","knoblauch","brokkoli","paprika","salat","spinat","pilz","mais","avocado","kiwi","mango","melone","blaubeere","himbeere","zucchini","aubergine","erbse","bohne","kohlrabi","lauch","sellerie","fenchel","spargel","kohl","kürbis","rucola","grapefruit","limette","ingwer","mangold","pak choi","süßkartoffel","rote bete","artischocke"],
    brot:      ["brot","brötchen","toast","croissant","baguette","brezel","kuchen","muffin","semmel","tortilla","fladenbrot","knäckebrot","zwieback","pumpernickel","ciabatta","wrap"],
    fleisch:   ["fleisch","hähnchen","hühnchen","chicken","rind","steak","schwein","lamm","wurst","schinken","speck","lachs","thunfisch","fisch","garnele","shrimp","putenbrust","putenstreifen","hackfleisch","chorizo","bratwurst","forelle","hering","makrele","salami","leberwurst","gulasch"],
    fertig:    ["tiefkühl","tk-","pizza","pommes","nugget","fertig","fischstäbchen","edamame","convenience"],
    milch:     ["milch","käse","butter","joghurt","sahne","ei","quark","mozzarella","parmesan","frischkäse","kefir","creme","schmand","skyr","feta","gouda","brie","emmentaler","hüttenkäse","schlagsahne","mascarpone","ricotta"],
    gewuerze:  ["salz","pfeffer","olivenöl","essig","ketchup","senf","mayo","sojasoße","tomatenmark","honig","marmelade","nutella","curry","paprikapulver","oregano","zimt","balsamico","chili","sriracha","agavensirup","ahornsirup","erdnussbutter","tahini","thymian","rosmarin","muskat","kreuzkümmel","zucker","backpulver","stärke","gewürz","öl","brühe","suppenwürze"],
    getreide:  ["nudel","pasta","spaghetti","penne","tagliatelle","fusilli","rigatoni","lasagne","reis","haferflocken","hafer","müsli","quinoa","couscous","cornflake","cerealien","linse","kichererbse","kidneybohne","polenta","bulgur","mehl","paniermehl","glasnudeln","reisnudeln","granola","pizzateig","blätterteig","hirse","buchweizen"],
    snacks:    ["schokolade","schoki","chips","keks","gummibär","nuss","popcorn","eis","bonbon","riegel","salzstange","wasser","saft","kaffee","tee","cola","bier","wein","limonade","energy","smoothie","kakao","cracker","reiswaffel","lakritz","weingummi","marzipan","sekt","pringles"],
    haushalt:  ["toilettenpapier","klopapier","spülmittel","waschmittel","putzmittel","müllbeutel","schwamm","küchenpapier","backpapier","folie","batterie","glühbirne","weichspüler","reiniger","kerze","teelicht","streichholz","lufterfrischer","spülbürste","scheuermilch"],
    pflege:    ["shampoo","zahnpasta","seife","deo","rasierer","duschgel","pflaster","creme","tablette","zahnbürste","watte","lotion","sonnencreme","mundwasser","zahnseide","vitamin","magnesium","desinfektions","lippenbalsam","haarspülung","haargel"],
    tier:      ["hundefutter","katzenfutter","katzenstreu","leckerli","vogelkörner","aquarium","hamster","kaninchen","katzenmilch"],
    baumarkt:  ["blumenerde","dünger","blume","pflanze","schraube","klebeband","saatgut","handschuh","gießkanne","blumentopf","rasendünger","pflanzenstab","kies","torf"],
  };

  for (const [catId, keywords] of Object.entries(catKeywords)) {
    if (keywords.some(k => n.includes(k))) return catId;
  }

  return "obst"; // Fallback
}

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
let lists            = [];
let activeId         = null;
let filterCat        = null;
let dlgCallback      = null;
let currentView      = "loading";
let customQty        = 1;
let pendingGridItem  = null;   // { name, emoji, cat }
let pendingAddQty    = 1;
let currentNoteItemId = null;

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
  const weekVal    = document.getElementById("new-week").value;
  const errorEl    = document.getElementById("create-error");
  const createBtn  = document.getElementById("btn-create");

  errorEl.style.display = "none";

  const monday  = weekVal ? getMonday(new Date(weekVal + "T12:00:00")) : getMonday();
  const kw      = getKW(monday);
  const name    = nameInput.value.trim() || `Einkauf KW ${kw}`;

  createBtn.disabled    = true;
  createBtn.textContent = "Erstelle…";

  const list = {
    id:        genId(),
    name,
    creator:   "Familie",
    weekStart: toDateStr(monday),
    items:     [],
    createdAt: Date.now(),
  };

  try {
    await saveList(list);
    activeId = list.id;
    nameInput.value = "";
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
  document.getElementById("detail-creator").textContent = list.creator || "Familie";

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
            <div class="item-name-wrap">
              <span class="item-name">${escHtml(it.name)}</span>
              ${it.note ? `<span class="item-note-preview">${escHtml(it.note)}</span>` : ""}
            </div>
            <button class="note-btn${it.note ? " has-note" : ""}"
                    onclick="openNoteDialog('${it.id}')"
                    aria-label="${it.note ? "Notiz anzeigen" : "Notiz hinzufügen"}">📝</button>
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

// Auto-Icon & Kategorie bei manueller Eingabe
document.getElementById("custom-name").addEventListener("input", function() {
  const name = this.value.trim();
  if (name.length >= 2) {
    const cat = guessCat(name);
    document.getElementById("custom-cat").value = cat;
  }
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

// Artikel aus Raster → öffnet Dialog mit Mengen-/Notiz-Eingabe
window.addItemFromGrid = function(name, emoji, cat) {
  openAddItemDialog(name, emoji, cat);
};

// ── ADD-ITEM-DIALOG (Menge + Notiz beim Hinzufügen aus Raster) ─────────────────
window.openAddItemDialog = function(name, emoji, cat) {
  pendingGridItem = { name, emoji, cat };
  pendingAddQty   = 1;
  document.getElementById("add-item-emoji-disp").textContent = emoji;
  document.getElementById("add-item-name-disp").textContent  = name;
  document.getElementById("add-qty-display").textContent     = "1";
  document.getElementById("add-item-note").value             = "";
  document.getElementById("add-item-overlay").classList.add("visible");
};

window.adjustAddQty = function(delta) {
  pendingAddQty = Math.max(1, pendingAddQty + delta);
  document.getElementById("add-qty-display").textContent = pendingAddQty;
};

window.closeAddItemDialog = function() {
  document.getElementById("add-item-overlay").classList.remove("visible");
  pendingGridItem = null;
};

window.confirmAddFromGrid = async function() {
  if (!pendingGridItem) return;
  const note = document.getElementById("add-item-note").value.trim();
  await addItemToList(pendingGridItem.name, pendingGridItem.emoji, pendingGridItem.cat, pendingAddQty, note);
  closeAddItemDialog();
  renderItemGrid();
};

document.getElementById("add-item-overlay").addEventListener("click", e => {
  if (e.target === e.currentTarget) closeAddItemDialog();
});

// ── NOTIZ-DIALOG ─────────────────────────────────────────────────────────────
window.openNoteDialog = function(itemId) {
  const list = lists.find(l => l.id === activeId);
  if (!list) return;
  const item = (list.items || []).find(i => i.id === itemId);
  if (!item) return;
  currentNoteItemId = itemId;
  document.getElementById("note-textarea").value  = item.note || "";
  document.getElementById("note-dlg-title").textContent =
    item.note ? `📝 Notiz: ${item.name}` : `📝 Notiz hinzufügen`;
  document.getElementById("note-overlay").classList.add("visible");
  // Fokus auf Textarea
  setTimeout(() => document.getElementById("note-textarea").focus(), 120);
};

window.closeNoteDialog = function() {
  document.getElementById("note-overlay").classList.remove("visible");
  currentNoteItemId = null;
};

window.saveNote = async function() {
  const list = lists.find(l => l.id === activeId);
  if (!list || !currentNoteItemId) return;
  const note = document.getElementById("note-textarea").value.trim();
  const updated = {
    ...list,
    items: list.items.map(it => {
      if (it.id !== currentNoteItemId) return it;
      const newIt = { ...it };
      if (note) newIt.note = note;
      else      delete newIt.note;
      return newIt;
    }),
  };
  await saveList(updated);
  closeNoteDialog();
  showToast("📝 Notiz gespeichert");
};

document.getElementById("note-overlay").addEventListener("click", e => {
  if (e.target === e.currentTarget) closeNoteDialog();
});

// ── EIGENE ARTIKEL HINZUFÜGEN ─────────────────────────────────────────────────
async function addItemToList(name, emoji, cat, qty = 1, note = "") {
  const list = lists.find(l => l.id === activeId);
  if (!list) return;
  if ((list.items || []).find(i => i.name === name)) return;
  const item = { id: genId(), name, emoji, cat, done: false, qty };
  if (note) item.note = note;
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
  const note = document.getElementById("custom-note").value.trim();
  if (!name) { showToast("⚠️ Namen eingeben!"); return; }
  const emoji = guessEmoji(name);
  await addItemToList(name, emoji, cat, customQty, note);
  document.getElementById("custom-name").value = "";
  document.getElementById("custom-note").value = "";
  customQty = 1;
  document.getElementById("custom-qty-display").textContent = "1";
};

// ── DIALOG (Löschen-Bestätigung) ──────────────────────────────────────────────
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
  const cb = dlgCallback;
  closeDialog();
  cb?.();
});
document.getElementById("confirm-overlay").addEventListener("click", e => {
  if (e.target === e.currentTarget) closeDialog();
});
