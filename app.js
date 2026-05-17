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
  { id:"getraenke", name:"Getränke",                   emoji:"🥤", color:"#E6F0FB", text:"#184FA0" },
  { id:"haushalt",  name:"Haushalt",                   emoji:"🧹", color:"#F1EFE8", text:"#4A4A40" },
  { id:"pflege",    name:"Pflege & Gesundheit",        emoji:"🧴", color:"#FDE9F1", text:"#8B2050" },
  { id:"tier",      name:"Tierbedarf",                 emoji:"🐾", color:"#FDF2E9", text:"#784212" },
  { id:"baumarkt",  name:"Baumarkt & Garten",          emoji:"🌱", color:"#E9F7EF", text:"#1E6B3A" },
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
  {name:"Süßkartoffel",emoji:"🍠",cat:"obst"},{name:"Rote Bete",emoji:"🟣",cat:"obst"},
  {name:"Kohlrabi",emoji:"🥬",cat:"obst"},{name:"Lauch",emoji:"🌿",cat:"obst"},
  {name:"Sellerie",emoji:"🌿",cat:"obst"},{name:"Fenchel",emoji:"🌿",cat:"obst"},
  {name:"Spargel",emoji:"🌿",cat:"obst"},{name:"Rosenkohl",emoji:"🥦",cat:"obst"},
  {name:"Rotkohl",emoji:"🥬",cat:"obst"},{name:"Kürbis",emoji:"🎃",cat:"obst"},
  {name:"Rucola",emoji:"🥬",cat:"obst"},{name:"Grüne Bohnen",emoji:"🫛",cat:"obst"},
  {name:"Erbsen",emoji:"🫛",cat:"obst"},{name:"Grapefruit",emoji:"🍊",cat:"obst"},
  {name:"Limette",emoji:"🍋",cat:"obst"},{name:"Petersilie",emoji:"🌿",cat:"obst"},
  {name:"Basilikum",emoji:"🌿",cat:"obst"},{name:"Ingwer",emoji:"🫚",cat:"obst"},
  {name:"Blumenkohl",emoji:"🥦",cat:"obst"},{name:"Mangold",emoji:"🥬",cat:"obst"},
  {name:"Pak Choi",emoji:"🥬",cat:"obst"},{name:"Rhabarber",emoji:"🌿",cat:"obst"},
  {name:"Maiskölbchen",emoji:"🌽",cat:"obst"},{name:"Artischocke",emoji:"🌿",cat:"obst"},
  {name:"Frühlingszwiebeln",emoji:"🧅",cat:"obst"},{name:"Staudensellerie",emoji:"🌿",cat:"obst"},
  {name:"Minze",emoji:"🌿",cat:"obst"},{name:"Schnittlauch",emoji:"🌿",cat:"obst"},
  {name:"Koriander",emoji:"🌿",cat:"obst"},{name:"Dill",emoji:"🌿",cat:"obst"},
  {name:"Thymian",emoji:"🌿",cat:"obst"},{name:"Rosmarin",emoji:"🌿",cat:"obst"},
  // Brot & Gebäck
  {name:"Toastbrot",emoji:"🍞",cat:"brot"},{name:"Brötchen",emoji:"🥐",cat:"brot"},
  {name:"Vollkornbrot",emoji:"🍞",cat:"brot"},{name:"Croissant",emoji:"🥐",cat:"brot"},
  {name:"Brezel",emoji:"🥨",cat:"brot"},{name:"Baguette",emoji:"🥖",cat:"brot"},
  {name:"Laugenbrezel",emoji:"🥨",cat:"brot"},{name:"Roggenbrot",emoji:"🍞",cat:"brot"},
  {name:"Knäckebrot",emoji:"🍞",cat:"brot"},{name:"Tortillas",emoji:"🫓",cat:"brot"},
  {name:"Fladenbrot",emoji:"🫓",cat:"brot"},{name:"Ciabatta",emoji:"🍞",cat:"brot"},
  {name:"Graubrot",emoji:"🍞",cat:"brot"},{name:"Mehrkornbrot",emoji:"🍞",cat:"brot"},
  {name:"Sauerteigbrot",emoji:"🍞",cat:"brot"},{name:"Dinkelbrötchen",emoji:"🥐",cat:"brot"},
  {name:"Zwiebelkuchen",emoji:"🥧",cat:"brot"},{name:"Blechkuchen",emoji:"🍰",cat:"brot"},
  {name:"Muffins",emoji:"🧁",cat:"brot"},{name:"Pumpernickel",emoji:"🍞",cat:"brot"},
  // Fleisch & Fisch
  {name:"Hähnchen",emoji:"🍗",cat:"fleisch"},{name:"Hähnchenbrust",emoji:"🍗",cat:"fleisch"},
  {name:"Hackfleisch",emoji:"🥩",cat:"fleisch"},{name:"Lachs",emoji:"🐟",cat:"fleisch"},
  {name:"Thunfisch",emoji:"🐠",cat:"fleisch"},{name:"Schweinefilet",emoji:"🥩",cat:"fleisch"},
  {name:"Bratwurst",emoji:"🌭",cat:"fleisch"},{name:"Schinken",emoji:"🍖",cat:"fleisch"},
  {name:"Garnelen",emoji:"🦐",cat:"fleisch"},{name:"Rindfleisch",emoji:"🥩",cat:"fleisch"},
  {name:"Salami",emoji:"🍖",cat:"fleisch"},{name:"Fischfilet",emoji:"🐟",cat:"fleisch"},
  {name:"Putenbrust",emoji:"🍗",cat:"fleisch"},{name:"Speck",emoji:"🥓",cat:"fleisch"},
  {name:"Kabeljau",emoji:"🐟",cat:"fleisch"},{name:"Lachsfilet",emoji:"🐟",cat:"fleisch"},
  {name:"Schweinebauch",emoji:"🥓",cat:"fleisch"},{name:"Gulasch",emoji:"🥩",cat:"fleisch"},
  {name:"Leberwurst",emoji:"🥫",cat:"fleisch"},{name:"Kochschinken",emoji:"🍖",cat:"fleisch"},
  {name:"Dosenthunfisch",emoji:"🥫",cat:"fleisch"},{name:"Shrimps",emoji:"🦐",cat:"fleisch"},
  {name:"Chorizo",emoji:"🌭",cat:"fleisch"},{name:"Mortadella",emoji:"🍖",cat:"fleisch"},
  {name:"Lammkeule",emoji:"🥩",cat:"fleisch"},{name:"Ente",emoji:"🍗",cat:"fleisch"},
  {name:"Forelle",emoji:"🐟",cat:"fleisch"},{name:"Hering",emoji:"🐟",cat:"fleisch"},
  {name:"Makrele",emoji:"🐟",cat:"fleisch"},{name:"Miesmuscheln",emoji:"🐚",cat:"fleisch"},
  // Fertig- & Tiefkühlprodukte
  {name:"TK-Pizza",emoji:"🍕",cat:"fertig"},{name:"Pommes",emoji:"🍟",cat:"fertig"},
  {name:"Fischstäbchen",emoji:"🐟",cat:"fertig"},{name:"TK-Erbsen",emoji:"🫛",cat:"fertig"},
  {name:"TK-Spinat",emoji:"🥬",cat:"fertig"},{name:"TK-Beeren",emoji:"🍓",cat:"fertig"},
  {name:"TK-Lasagne",emoji:"🍝",cat:"fertig"},{name:"TK-Nuggets",emoji:"🍗",cat:"fertig"},
  {name:"TK-Gemüse",emoji:"🥦",cat:"fertig"},{name:"TK-Brokkoli",emoji:"🥦",cat:"fertig"},
  {name:"TK-Baguette",emoji:"🥖",cat:"fertig"},{name:"TK-Garnelen",emoji:"🦐",cat:"fertig"},
  {name:"TK-Schnitzel",emoji:"🥩",cat:"fertig"},{name:"TK-Mais",emoji:"🌽",cat:"fertig"},
  {name:"TK-Kartoffeln",emoji:"🥔",cat:"fertig"},{name:"TK-Waffeln",emoji:"🧇",cat:"fertig"},
  {name:"TK-Früchte",emoji:"🍓",cat:"fertig"},{name:"TK-Rote Bete",emoji:"🟣",cat:"fertig"},
  {name:"TK-Suppe",emoji:"🍲",cat:"fertig"},{name:"Fertigsuppe",emoji:"🍲",cat:"fertig"},
  {name:"Instantnudeln",emoji:"🍜",cat:"fertig"},{name:"Dosenravioli",emoji:"🥫",cat:"fertig"},
  // Milch & Käse
  {name:"Milch",emoji:"🥛",cat:"milch"},{name:"Käse",emoji:"🧀",cat:"milch"},
  {name:"Butter",emoji:"🧈",cat:"milch"},{name:"Joghurt",emoji:"🥛",cat:"milch"},
  {name:"Sahne",emoji:"🍶",cat:"milch"},{name:"Eier",emoji:"🥚",cat:"milch"},
  {name:"Quark",emoji:"🥛",cat:"milch"},{name:"Mozzarella",emoji:"🧀",cat:"milch"},
  {name:"Frischkäse",emoji:"🧀",cat:"milch"},{name:"Creme fraîche",emoji:"🍶",cat:"milch"},
  {name:"Parmesan",emoji:"🧀",cat:"milch"},{name:"Schmand",emoji:"🥛",cat:"milch"},
  {name:"Skyr",emoji:"🥛",cat:"milch"},{name:"Gouda",emoji:"🧀",cat:"milch"},
  {name:"Feta",emoji:"🧀",cat:"milch"},{name:"Schlagsahne",emoji:"🍶",cat:"milch"},
  {name:"Mascarpone",emoji:"🧀",cat:"milch"},{name:"Ricotta",emoji:"🧀",cat:"milch"},
  {name:"Hafermilch",emoji:"🥛",cat:"milch"},{name:"Sojamilch",emoji:"🥛",cat:"milch"},
  {name:"Naturjoghurt",emoji:"🥛",cat:"milch"},{name:"Griechischer Joghurt",emoji:"🥛",cat:"milch"},
  {name:"Mandelmilch",emoji:"🥛",cat:"milch"},{name:"Kefir",emoji:"🥛",cat:"milch"},
  {name:"Saure Sahne",emoji:"🍶",cat:"milch"},{name:"Emmentaler",emoji:"🧀",cat:"milch"},
  {name:"Camembert",emoji:"🧀",cat:"milch"},{name:"Brie",emoji:"🧀",cat:"milch"},
  // Zutaten & Gewürze & Soßen
  {name:"Salz",emoji:"🧂",cat:"gewuerze"},{name:"Pfeffer",emoji:"🌶️",cat:"gewuerze"},
  {name:"Olivenöl",emoji:"🫒",cat:"gewuerze"},{name:"Essig",emoji:"🍶",cat:"gewuerze"},
  {name:"Ketchup",emoji:"🍅",cat:"gewuerze"},{name:"Senf",emoji:"🟡",cat:"gewuerze"},
  {name:"Mayonnaise",emoji:"🫙",cat:"gewuerze"},{name:"Sojasoße",emoji:"🫙",cat:"gewuerze"},
  {name:"Tomatenmark",emoji:"🍅",cat:"gewuerze"},{name:"Honig",emoji:"🍯",cat:"gewuerze"},
  {name:"Marmelade",emoji:"🍓",cat:"gewuerze"},{name:"Nutella",emoji:"🍫",cat:"gewuerze"},
  {name:"Curry",emoji:"🌶️",cat:"gewuerze"},{name:"Paprikapulver",emoji:"🌶️",cat:"gewuerze"},
  {name:"Oregano",emoji:"🌿",cat:"gewuerze"},{name:"Zimt",emoji:"🌿",cat:"gewuerze"},
  {name:"Agavensirup",emoji:"🍯",cat:"gewuerze"},{name:"Erdnussbutter",emoji:"🥜",cat:"gewuerze"},
  {name:"Thymian (getrocknet)",emoji:"🌿",cat:"gewuerze"},{name:"Rosmarin (getrocknet)",emoji:"🌿",cat:"gewuerze"},
  {name:"Zucker",emoji:"🍬",cat:"gewuerze"},{name:"Backpulver",emoji:"🧁",cat:"gewuerze"},
  {name:"Kokosmilch",emoji:"🥥",cat:"gewuerze"},{name:"Gemüsebrühe",emoji:"🍲",cat:"gewuerze"},
  {name:"Hühnerbrühe",emoji:"🍲",cat:"gewuerze"},{name:"Pizzasoße",emoji:"🍅",cat:"gewuerze"},
  {name:"Balsamico",emoji:"🍶",cat:"gewuerze"},{name:"Pflanzenöl",emoji:"🫒",cat:"gewuerze"},
  {name:"Süß-sauer-Soße",emoji:"🍯",cat:"gewuerze"},{name:"BBQ-Soße",emoji:"🍖",cat:"gewuerze"},
  {name:"Hollandaise",emoji:"🥚",cat:"gewuerze"},{name:"Rahm-Soße",emoji:"🍶",cat:"gewuerze"},
  {name:"Tomatensoße",emoji:"🍅",cat:"gewuerze"},{name:"Pestosoße",emoji:"🌿",cat:"gewuerze"},
  {name:"Carbonara-Soße",emoji:"🍝",cat:"gewuerze"},{name:"Remoulade",emoji:"🫙",cat:"gewuerze"},
  {name:"Aioli",emoji:"🫙",cat:"gewuerze"},{name:"Sriracha",emoji:"🌶️",cat:"gewuerze"},
  {name:"Worcestershire",emoji:"🫙",cat:"gewuerze"},{name:"Teriyaki-Soße",emoji:"🫙",cat:"gewuerze"},
  {name:"Pesto",emoji:"🌿",cat:"gewuerze"},{name:"Tahini",emoji:"🥜",cat:"gewuerze"},
  {name:"Ahornsirup",emoji:"🍯",cat:"gewuerze"},{name:"Vanillezucker",emoji:"🍬",cat:"gewuerze"},
  {name:"Natron",emoji:"🧁",cat:"gewuerze"},{name:"Hefe",emoji:"🌾",cat:"gewuerze"},
  {name:"Kurkuma",emoji:"🌶️",cat:"gewuerze"},{name:"Kreuzkümmel",emoji:"🌶️",cat:"gewuerze"},
  {name:"Muskatnuss",emoji:"🌰",cat:"gewuerze"},{name:"Chilipulver",emoji:"🌶️",cat:"gewuerze"},
  {name:"Meersalz",emoji:"🧂",cat:"gewuerze"},{name:"Rapsöl",emoji:"🫒",cat:"gewuerze"},
  {name:"Kokosöl",emoji:"🥥",cat:"gewuerze"},{name:"Lorbeerblätter",emoji:"🌿",cat:"gewuerze"},
  {name:"Brühwürfel",emoji:"🍲",cat:"gewuerze"},{name:"Dosentomaten",emoji:"🍅",cat:"gewuerze"},
  // Getreideprodukte
  {name:"Spaghetti",emoji:"🍝",cat:"getreide"},{name:"Penne",emoji:"🍝",cat:"getreide"},
  {name:"Reis",emoji:"🍚",cat:"getreide"},{name:"Mehl",emoji:"🌾",cat:"getreide"},
  {name:"Haferflocken",emoji:"🌾",cat:"getreide"},{name:"Müsli",emoji:"🥣",cat:"getreide"},
  {name:"Quinoa",emoji:"🌾",cat:"getreide"},{name:"Couscous",emoji:"🌾",cat:"getreide"},
  {name:"Cornflakes",emoji:"🥣",cat:"getreide"},{name:"Lasagneplatten",emoji:"🍝",cat:"getreide"},
  {name:"Fusilli",emoji:"🍝",cat:"getreide"},{name:"Basmati-Reis",emoji:"🍚",cat:"getreide"},
  {name:"Bulgur",emoji:"🌾",cat:"getreide"},{name:"Kichererbsen",emoji:"🌰",cat:"getreide"},
  {name:"Linsen",emoji:"🌰",cat:"getreide"},{name:"Paniermehl",emoji:"🌾",cat:"getreide"},
  {name:"Pizzateig",emoji:"🍕",cat:"getreide"},{name:"Hirse",emoji:"🌾",cat:"getreide"},
  {name:"Rigatoni",emoji:"🍝",cat:"getreide"},{name:"Tagliatelle",emoji:"🍝",cat:"getreide"},
  {name:"Jasminreis",emoji:"🍚",cat:"getreide"},{name:"Vollkornmehl",emoji:"🌾",cat:"getreide"},
  {name:"Dinkelmehl",emoji:"🌾",cat:"getreide"},{name:"Reisnudeln",emoji:"🍜",cat:"getreide"},
  {name:"Glasnudeln",emoji:"🍜",cat:"getreide"},{name:"Gnocchi",emoji:"🥔",cat:"getreide"},
  {name:"Tortellini",emoji:"🍝",cat:"getreide"},{name:"Buchweizen",emoji:"🌾",cat:"getreide"},
  {name:"Polenta",emoji:"🌽",cat:"getreide"},{name:"Blätterteig",emoji:"🥐",cat:"getreide"},
  // Snacks & Süßwaren
  {name:"Schokolade",emoji:"🍫",cat:"snacks"},{name:"Chips",emoji:"🥔",cat:"snacks"},
  {name:"Kekse",emoji:"🍪",cat:"snacks"},{name:"Gummibärchen",emoji:"🐻",cat:"snacks"},
  {name:"Nüsse",emoji:"🥜",cat:"snacks"},{name:"Popcorn",emoji:"🍿",cat:"snacks"},
  {name:"Eis",emoji:"🍦",cat:"snacks"},{name:"Bonbons",emoji:"🍬",cat:"snacks"},
  {name:"Riegel",emoji:"🍫",cat:"snacks"},{name:"Salzstangen",emoji:"🥨",cat:"snacks"},
  {name:"Cashews",emoji:"🥜",cat:"snacks"},{name:"Mandeln",emoji:"🥜",cat:"snacks"},
  {name:"Erdnüsse",emoji:"🥜",cat:"snacks"},{name:"Cracker",emoji:"🫙",cat:"snacks"},
  {name:"Müsliriegel",emoji:"🍫",cat:"snacks"},{name:"Lakritz",emoji:"🍬",cat:"snacks"},
  {name:"Weingummi",emoji:"🐻",cat:"snacks"},{name:"Marzipan",emoji:"🍬",cat:"snacks"},
  {name:"Kakao",emoji:"🍫",cat:"snacks"},{name:"Trinkschokolade",emoji:"☕",cat:"snacks"},
  {name:"Proteinriegel",emoji:"💪",cat:"snacks"},{name:"Walnüsse",emoji:"🥜",cat:"snacks"},
  {name:"Pistazien",emoji:"🥜",cat:"snacks"},{name:"Studentenfutter",emoji:"🥜",cat:"snacks"},
  {name:"Reiswaffeln",emoji:"🍘",cat:"snacks"},{name:"Nachos",emoji:"🌽",cat:"snacks"},
  {name:"Pringles",emoji:"🥔",cat:"snacks"},{name:"Tortilla Chips",emoji:"🌮",cat:"snacks"},
  // Getränke
  {name:"Mineralwasser",emoji:"💧",cat:"getraenke"},{name:"Sprudelwasser",emoji:"💧",cat:"getraenke"},
  {name:"Orangensaft",emoji:"🍊",cat:"getraenke"},{name:"Apfelsaft",emoji:"🍎",cat:"getraenke"},
  {name:"Apfelschorle",emoji:"🍎",cat:"getraenke"},{name:"Multivitaminsaft",emoji:"🧃",cat:"getraenke"},
  {name:"Tomatensaft",emoji:"🍅",cat:"getraenke"},{name:"Smoothie",emoji:"🥤",cat:"getraenke"},
  {name:"Kaffee",emoji:"☕",cat:"getraenke"},{name:"Tee",emoji:"🍵",cat:"getraenke"},
  {name:"Eistee",emoji:"🧊",cat:"getraenke"},{name:"Cola",emoji:"🥤",cat:"getraenke"},
  {name:"Limonade",emoji:"🥤",cat:"getraenke"},{name:"Energydrink",emoji:"⚡",cat:"getraenke"},
  {name:"Bier",emoji:"🍺",cat:"getraenke"},{name:"Wein",emoji:"🍷",cat:"getraenke"},
  {name:"Sekt",emoji:"🥂",cat:"getraenke"},{name:"Prosecco",emoji:"🥂",cat:"getraenke"},
  {name:"Kokoswasser",emoji:"🥥",cat:"getraenke"},{name:"Latte Macchiato",emoji:"☕",cat:"getraenke"},
  {name:"Malzkaffee",emoji:"☕",cat:"getraenke"},{name:"Traubensaft",emoji:"🍇",cat:"getraenke"},
  {name:"Kirschsaft",emoji:"🍒",cat:"getraenke"},{name:"Kakaodrink",emoji:"🍫",cat:"getraenke"},
  {name:"Spezi",emoji:"🥤",cat:"getraenke"},{name:"Rotwein",emoji:"🍷",cat:"getraenke"},
  {name:"Weißwein",emoji:"🥂",cat:"getraenke"},{name:"Whisky",emoji:"🥃",cat:"getraenke"},
  {name:"Gin",emoji:"🍸",cat:"getraenke"},{name:"Saftschorle",emoji:"🧃",cat:"getraenke"},
  // Haushalt
  {name:"Toilettenpapier",emoji:"🧻",cat:"haushalt"},{name:"Spülmittel",emoji:"🫧",cat:"haushalt"},
  {name:"Müllbeutel",emoji:"🗑️",cat:"haushalt"},{name:"Waschmittel",emoji:"🧺",cat:"haushalt"},
  {name:"Putzmittel",emoji:"🧹",cat:"haushalt"},{name:"Küchentücher",emoji:"🧻",cat:"haushalt"},
  {name:"Schwämme",emoji:"🧽",cat:"haushalt"},{name:"Backpapier",emoji:"📄",cat:"haushalt"},
  {name:"Frischhaltefolie",emoji:"🌀",cat:"haushalt"},{name:"Geschirrspültabs",emoji:"🫧",cat:"haushalt"},
  {name:"Weichspüler",emoji:"🧺",cat:"haushalt"},{name:"Batterien",emoji:"🔋",cat:"haushalt"},
  {name:"Aluminiumfolie",emoji:"✨",cat:"haushalt"},{name:"Kerzen",emoji:"🕯️",cat:"haushalt"},
  {name:"Reinigungstücher",emoji:"🧻",cat:"haushalt"},{name:"WC-Reiniger",emoji:"🚽",cat:"haushalt"},
  {name:"Klarspüler",emoji:"✨",cat:"haushalt"},{name:"Rohreiniger",emoji:"🪠",cat:"haushalt"},
  {name:"Abflussreiniger",emoji:"🪠",cat:"haushalt"},{name:"Fensterreiniger",emoji:"🪟",cat:"haushalt"},
  {name:"Badreiniger",emoji:"🚿",cat:"haushalt"},{name:"Küchenreiniger",emoji:"🍳",cat:"haushalt"},
  {name:"Entkalker",emoji:"⚗️",cat:"haushalt"},{name:"Schimmelentferner",emoji:"🧪",cat:"haushalt"},
  {name:"Wäschebleiche",emoji:"🧺",cat:"haushalt"},{name:"Fleckenentferner",emoji:"🧺",cat:"haushalt"},
  {name:"Mikrofasertücher",emoji:"🧻",cat:"haushalt"},{name:"Staubsaugerbeutel",emoji:"🌀",cat:"haushalt"},
  {name:"Spülbürste",emoji:"🧽",cat:"haushalt"},{name:"Gefrierbeutel",emoji:"🧊",cat:"haushalt"},
  {name:"Haushaltshandschuhe",emoji:"🧤",cat:"haushalt"},{name:"Teelichter",emoji:"🕯️",cat:"haushalt"},
  {name:"Streichhölzer",emoji:"🔥",cat:"haushalt"},{name:"Lufterfrischer",emoji:"🌸",cat:"haushalt"},
  {name:"Allzweckreiniger",emoji:"🧹",cat:"haushalt"},{name:"Desinfektionsspray",emoji:"💧",cat:"haushalt"},
  // Pflege & Gesundheit
  {name:"Shampoo",emoji:"🧴",cat:"pflege"},{name:"Zahnpasta",emoji:"🦷",cat:"pflege"},
  {name:"Seife",emoji:"🧼",cat:"pflege"},{name:"Deo",emoji:"🌸",cat:"pflege"},
  {name:"Rasierer",emoji:"🪒",cat:"pflege"},{name:"Duschgel",emoji:"🚿",cat:"pflege"},
  {name:"Pflaster",emoji:"🩹",cat:"pflege"},{name:"Creme",emoji:"🧴",cat:"pflege"},
  {name:"Paracetamol",emoji:"💊",cat:"pflege"},{name:"Ibuprofen",emoji:"💊",cat:"pflege"},
  {name:"Zahnbürste",emoji:"🪥",cat:"pflege"},{name:"Wattepads",emoji:"🌸",cat:"pflege"},
  {name:"Sonnencreme",emoji:"☀️",cat:"pflege"},{name:"Mundwasser",emoji:"🦷",cat:"pflege"},
  {name:"Vitamintabletten",emoji:"💊",cat:"pflege"},{name:"Desinfektionsmittel",emoji:"🧼",cat:"pflege"},
  {name:"Tampons",emoji:"🌸",cat:"pflege"},{name:"Windeln",emoji:"👶",cat:"pflege"},
  {name:"Haarspülung",emoji:"🧴",cat:"pflege"},{name:"Haargel",emoji:"🧴",cat:"pflege"},
  {name:"Haarspray",emoji:"💨",cat:"pflege"},{name:"Wattestäbchen",emoji:"🌸",cat:"pflege"},
  {name:"Taschentücher",emoji:"🤧",cat:"pflege"},{name:"Nasenspray",emoji:"💊",cat:"pflege"},
  {name:"Magnesium",emoji:"💊",cat:"pflege"},{name:"Handcreme",emoji:"🧴",cat:"pflege"},
  {name:"Lippenbalsam",emoji:"💋",cat:"pflege"},{name:"Rasierschaum",emoji:"🪒",cat:"pflege"},
  {name:"Damenbinden",emoji:"🌸",cat:"pflege"},{name:"Rasierklinge",emoji:"🪒",cat:"pflege"},
  // Tierbedarf
  {name:"Hundefutter",emoji:"🐕",cat:"tier"},{name:"Katzenfutter",emoji:"🐈",cat:"tier"},
  {name:"Katzenstreu",emoji:"🐱",cat:"tier"},{name:"Hundeleckerli",emoji:"🦴",cat:"tier"},
  {name:"Vogelkörner",emoji:"🐦",cat:"tier"},{name:"Aquariumfutter",emoji:"🐠",cat:"tier"},
  {name:"Kaninchenfutter",emoji:"🐰",cat:"tier"},{name:"Hundeshampoo",emoji:"🐕",cat:"tier"},
  {name:"Katzenmilch",emoji:"🐈",cat:"tier"},{name:"Hamsterfutter",emoji:"🐹",cat:"tier"},
  {name:"Hundekotbeutel",emoji:"🐾",cat:"tier"},{name:"Tierarzt-Tropfen",emoji:"💊",cat:"tier"},
  // Baumarkt & Garten
  {name:"Blumenerde",emoji:"🌱",cat:"baumarkt"},{name:"Blumendünger",emoji:"🌿",cat:"baumarkt"},
  {name:"Blumen",emoji:"🌸",cat:"baumarkt"},{name:"Glühbirnen",emoji:"💡",cat:"baumarkt"},
  {name:"Schrauben",emoji:"🔩",cat:"baumarkt"},{name:"Saatgut",emoji:"🌱",cat:"baumarkt"},
  {name:"Klebeband",emoji:"🎗️",cat:"baumarkt"},{name:"Gartenhandschuhe",emoji:"🧤",cat:"baumarkt"},
  {name:"Gießkanne",emoji:"🪣",cat:"baumarkt"},{name:"Blumentopf",emoji:"🪴",cat:"baumarkt"},
  {name:"Rasendünger",emoji:"🌿",cat:"baumarkt"},{name:"Unkrautmittel",emoji:"🌿",cat:"baumarkt"},
  {name:"Farbe",emoji:"🎨",cat:"baumarkt"},{name:"Pinsel",emoji:"🖌️",cat:"baumarkt"},
  {name:"Silikon",emoji:"🔧",cat:"baumarkt"},{name:"Dübel",emoji:"🔩",cat:"baumarkt"},
];

// ── SVG ICONS ─────────────────────────────────────────────────────────────────
const NOTE_ICON = `<svg width="15" height="15" viewBox="0 0 24 24" fill="none"
  stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
</svg>`;

// ── AUTO-KATEGORIE Erkennung ──────────────────────────────────────────────────
// Reihenfolge wichtig: spezifischste Keywords zuerst

const CAT_RULES = [
  // Getränke — zuerst, vor snacks!
  { cat:"getraenke", words:[
    "wasser","mineralwasser","sprudel","saft","orangensaft","apfelsaft","apfelschorle",
    "tomatensaft","multivitamin","smoothie","kaffee","espresso","cappuccino","latte",
    "tee","eistee","cola","fanta","sprite","limonade","limo","energydrink","energy drink",
    "bier","weizen","pils","wein","rotwein","weißwein","sekt","prosecco","champagner",
    "kokoswasser","malzkaffee","trinkflasche","getränk","drink",
  ]},
  // Fertig-/Tiefkühl — vor fleisch/obst
  { cat:"fertig", words:[
    "tk-","tk ","tiefkühl","tiefkuhl","fertiggericht","fertig-","pizza","pommes",
    "nugget","fischstäbchen","fischstaebchen","convenience","edamame","wrap fertig",
  ]},
  // Fleisch & Fisch
  { cat:"fleisch", words:[
    "fleisch","hack","hackfleisch","faschiert","hähnchen","huhn","hühnchen","chicken",
    "geflügel","rind","beef","steak","schwein","kotelett","schnitzel","lamm","wurst",
    "bratwurst","chorizo","salami","leberwurst","schinken","speck","bacon","lachs",
    "thunfisch","fisch","forelle","hering","makrele","kabeljau","pangasius","garnele",
    "shrimp","hummer","muschel","put","putenb","gulasch","lachsfilet",
  ]},
  // Obst & Gemüse
  { cat:"obst", words:[
    "apfel","birne","banane","orange","mandarine","zitrone","limette","erdbeere",
    "himbeere","johannisbeer","blaubeere","kirsche","pfirsich","pflaume","mango",
    "avocado","kiwi","melone","wassermelone","ananas","physalis","tomate","gurke",
    "paprika","karotte","möhre","kartoffel","zwiebel","knoblauch","brokkoli","salat",
    "rucola","spinat","mangold","pak choi","pilz","mais","zucchini","aubergine",
    "erbse","bohne","kohlrabi","lauch","sellerie","fenchel","spargel","kohl","kürbis",
    "rosenkohl","rote bete","süßkartoffel","pastinake","ingwer","petersilie",
    "basilikum","koriander","schnittlauch","dill","minze","thymian als kraut",
    "gemüse","obst","frucht",
  ]},
  // Brot & Gebäck
  { cat:"brot", words:[
    "brot","brötchen","semmel","toast","croissant","baguette","brezel","laugen",
    "kuchen","torte","muffin","waffel","pfannkuchen","tortilla","fladenbrot",
    "knäckebrot","zwieback","pumpernickel","ciabatta","gebäck","backware","wrap",
  ]},
  // Milch & Käse
  { cat:"milch", words:[
    "milch","käse","butter","joghurt","sahne","quark","mozzarella","parmesan",
    "frischkäse","kefir","schmand","skyr","feta","gouda","brie","emmentaler",
    "camembert","cheddar","hüttenkäse","schlagsahne","mascarpone","ricotta",
    "creme fraiche","kondensmilch","hafermilch","mandelmilch","sojamilch","eiweißdrink",
    "ei ","eier","eiern",
  ]},
  // Getreideprodukte
  { cat:"getreide", words:[
    "nudel","pasta","spaghetti","penne","fusilli","rigatoni","tagliatelle","lasagne",
    "tortellini","gnocchi","spätzle","reisnudel","glasnudel","udon","reis","basmati",
    "jasmin-reis","risotto","polenta","couscous","quinoa","bulgur","haferflocken",
    "hafer","müsli","granola","cornflake","cerealien","linse","kichererbse",
    "kidneybohne","schwarze bohne","weiße bohne","mehl","vollkornmehl","dinkelmehl",
    "paniermehl","stärke","hefe","hirse","buchweizen","pizzateig","blätterteig",
  ]},
  // Zutaten & Gewürze — SOSSEN explizit
  { cat:"gewuerze", words:[
    "salz","pfeffer","gewürz","würze","olivenöl","rapsöl","sonnenblumenöl","pflanzenöl",
    "kokosnussöl","kokosöl","essig","balsamico","ketchup","senf","mayo","mayonnaise",
    "sojasoße","worcester","teriyaki","sriracha","chilisoß","chilisauce",
    "süß-sauer","süßsauer","bbq","barbecue","hollandaise","rahm-soß","rahmsoß",
    "carbonara-soß","carbonarasoß","remoulade","aioli","pestosoß","tomatensoß","tomatensoße",
    "tomatenmark","pizzasoße","honig","marmelade","konfitüre","nutella","erdnussbutter",
    "mandelmus","tahini","agavensirup","ahornsirup","zucker","vanillezucker","backpulver",
    "natron","speisestärke","brühe","suppenwürze","brühwürfel","dosentomaten",
    "kokosmilch","curry","paprikapulver","oregano","zimt","rosmarin","thymian",
    "muskat","kreuzkümmel","kümmel","kardamom","kurkuma","nelken","chilipulver",
    "ingwerpulver","lorbeer","meersalz","aufstrich","pesto","hefe","soße","sauce",
  ]},
  // Snacks & Süßwaren
  { cat:"snacks", words:[
    "schokolade","schoki","chips","keks","plätzchen","gummibär","gummi","lakritz",
    "weingummi","fruchtgummi","marzipan","bonbon","lutsch","nuss","cashew","mandel",
    "erdnuss","walnuss","pistazie","macadamia","studentenfutter","nuss-mix",
    "popcorn","eis","eiscreme","riegel","müsliriegel","proteinriegel","cracker",
    "salzstange","reiswaffel","pringles","nachos","tortilla chip",
    "kakao","trinkschokolade","malz",
  ]},
  // Haushalt
  { cat:"haushalt", words:[
    "toilettenpapier","klopapier","wc-papier","spülmittel","waschmittel","waschpulver",
    "spülpulver","putzmittel","reiniger","allzweckreiniger","glasreiniger","wc-reiniger",
    "klarspüler","rohreiniger","abflussreiniger","fensterreiniger","badreiniger",
    "küchenreiniger","entkalker","schimmelentferner","wäschebleiche","fleckenentferner",
    "müllbeutel","müllsack","mülltüte","schwamm","scheuerschwamm","spülbürste",
    "küchenpapier","küchentuch","mikrofasertuch","reinigungstuch","backpapier",
    "alufolie","aluminiumfolie","frischhaltefolie","gefrierbeutel","staubsaugerbeutel",
    "batterie","glühbirne","leuchtmittel","weichspüler","kerze","teelicht","streichholz",
    "lufterfrischer","einweghandschuh","haushaltshandschuh","scheuermilch",
    "desinfektionsspray","wäscheklammer","haushalt",
  ]},
  // Pflege & Gesundheit
  { cat:"pflege", words:[
    "shampoo","haarshampoo","zahnpasta","zahncreme","zahnbürste","zahnseide",
    "mundwasser","seife","handseife","deo","deodorant","antitranspirant","rasierer",
    "rasierschaum","rasierklinge","duschgel","duschbad","badeschaum","pflaster",
    "verband","creme","lotion","körperlotion","sonnencreme","hautcreme","handcreme",
    "fußcreme","lippenbalsam","paracetamol","ibuprofen","aspirin","tablette","kapsel",
    "pille","medikament","arznei","vitamin","magnesium","zink","eisen","nasenspray",
    "augentropfen","desinfektionsmittel","watte","wattestäbchen","wattepads","tampon",
    "binde","windel","babynahrung","haargel","haarspray","haarspülung","haarmaske",
    "parfüm","duftstoff","pflege","gesundheit",
  ]},
  // Tierbedarf
  { cat:"tier", words:[
    "hundefutter","katzenfutter","tierfutter","katzenstreu","streu","leckerli",
    "hundesnack","katzenmilch","vogelkörner","vogelfutter","aquariumfutter",
    "hamsterfutter","kaninchenfutter","meerschwein","hundeshampoo","katzenspielzeug",
    "hundespielzeug","halsband","leine","tierbedarf",
  ]},
  // Baumarkt & Garten
  { cat:"baumarkt", words:[
    "blumenerde","kompost","erde","dünger","rasendünger","pflanzendünger","blume",
    "pflanze","saatgut","samen","schraube","nagel","dübel","klebeband","tape",
    "isolierband","gießkanne","blumentopf","pflanzenstab","handschuh","gartenhandschuh",
    "rasenmäh","unkraut","garten","baumarkt","farbe","lack","pinsel","kies","torf",
  ]},
];

function guessCategory(name) {
  const n = name.toLowerCase().trim();

  // 1. Exakter Treffer in der Datenbank
  const exact = ITEMS_DB.find(it => it.name.toLowerCase() === n);
  if (exact) return exact.cat;

  // 2. Partieller Treffer (DB-Name enthält Input oder umgekehrt)
  const partial = ITEMS_DB.find(it => {
    const itn = it.name.toLowerCase();
    return itn.includes(n) || n.includes(itn);
  });
  if (partial) return partial.cat;

  // 3. Keyword-Regeln (Reihenfolge in CAT_RULES ist entscheidend)
  for (const rule of CAT_RULES) {
    if (rule.words.some(w => n.includes(w))) return rule.cat;
  }

  // 4. Nichts gefunden → null, damit der Nutzer manuell wählen muss
  return null;
}

// ── EMOJI-ERKENNUNG ───────────────────────────────────────────────────────────
const EMOJI_MAP = [
  // Obst
  [["apfel","äpfel"],            "🍎"], [["birne"],               "🍐"],
  [["banane"],                   "🍌"], [["orange","mandarine"],  "🍊"],
  [["zitrone"],                  "🍋"], [["limette"],             "🍋"],
  [["grapefruit"],               "🍊"], [["erdbeere"],            "🍓"],
  [["himbeere"],                 "🍓"], [["blaubeere","heidelbeer"],"🫐"],
  [["kirsche"],                  "🍒"], [["weintraube","traube"], "🍇"],
  [["pfirsich"],                 "🍑"], [["pflaume"],             "🍑"],
  [["avocado"],                  "🥑"], [["mango"],               "🥭"],
  [["wassermelone"],             "🍉"], [["melone"],              "🍈"],
  [["ananas"],                   "🍍"], [["kiwi"],                "🥝"],
  [["kokosnuss","kokos"],        "🥥"], [["physalis"],            "🍊"],
  // Gemüse
  [["tomate"],                   "🍅"], [["paprika"],             "🫑"],
  [["gurke"],                    "🥒"], [["zucchini"],            "🥒"],
  [["karotte","möhre"],          "🥕"], [["kartoffel"],           "🥔"],
  [["süßkartoffel"],             "🍠"], [["mais"],                "🌽"],
  [["zwiebel"],                  "🧅"], [["frühlingszwiebel"],    "🧅"],
  [["knoblauch"],                "🧄"], [["brokkoli"],            "🥦"],
  [["blumenkohl"],               "🥦"], [["rosenkohl"],           "🥦"],
  [["salat","rucola","spinat","mangold","pak choi","rotkohl","kohlrabi"],"🥬"],
  [["pilz","champignon"],        "🍄"], [["aubergine"],           "🍆"],
  [["erbse"],                    "🫛"], [["bohne","grüne bohnen"],"🫛"],
  [["kürbis"],                   "🎃"], [["ingwer"],              "🫚"],
  [["rote bete"],                "🟣"], [["spargel"],             "🌿"],
  [["lauch","sellerie","fenchel","artischocke"],"🌿"],
  [["petersilie","basilikum","koriander","dill","schnittlauch","minze","rosmarin","thymian"],"🌿"],
  // Fleisch & Fisch
  [["hähnchen","hühnchen","chicken","geflügel","pute","ente"],"🍗"],
  [["hack","faschiert"],         "🥩"], [["rind","steak","beef","gulasch"],"🥩"],
  [["schwein","kotelett","schnitzel","schweinebauch","schweinefilet"],"🥩"],
  [["lamm"],                     "🥩"], [["wurst","bratwurst","chorizo"],"🌭"],
  [["schinken","kochschinken","mortadella"],"🍖"],
  [["leberwurst"],               "🥫"], [["salami"],              "🍖"],
  [["speck","bacon"],            "🥓"], [["lachs","lachsfilet"],  "🐟"],
  [["thunfisch","tuna"],         "🐠"], [["kabeljau","forelle","hering","makrele","fischfilet","pangasius"],"🐟"],
  [["fisch"],                    "🐟"], [["garnele","shrimp"],    "🦐"],
  [["muschel"],                  "🐚"], [["dosenthunfisch"],      "🥫"],
  // Brot & Gebäck
  [["brot","vollkornbrot","roggenbrot","graubrot","mehrkornbrot","sauerteig","pumpernickel","knäckebrot","ciabatta"],"🍞"],
  [["brötchen","semmel","dinkelbrötchen"],"🥐"],
  [["croissant"],                "🥐"], [["baguette"],            "🥖"],
  [["brezel","laugenbrezel"],    "🥨"], [["toast"],               "🍞"],
  [["kuchen","torte"],           "🎂"], [["muffin"],              "🧁"],
  [["waffel"],                   "🧇"], [["tortilla","wrap","fladenbrot"],"🫓"],
  [["blätterteig"],              "🥐"],
  // Milch & Käse
  [["milch","hafermilch","sojamilch","mandelmilch","kefir"],"🥛"],
  [["käse","mozzarella","parmesan","gouda","feta","emmentaler","brie","camembert","cheddar","hüttenkäse","mascarpone","ricotta"],"🧀"],
  [["butter"],                   "🧈"], [["joghurt","skyr"],      "🥛"],
  [["sahne","schlagsahne","creme fraiche","saure sahne"],"🍶"],
  [["quark","schmand"],          "🥛"], [["ei","eier"],           "🥚"],
  // Getränke
  [["wasser","sprudel","mineralwasser"],"💧"],
  [["saft","juice"],             "🧃"], [["orangensaft"],         "🍊"],
  [["apfelsaft","apfelschorle"], "🍎"], [["tomatensaft"],         "🍅"],
  [["kaffee","espresso","cappuccino","latte","macchiato","malzkaffee"],"☕"],
  [["tee"],                      "🍵"], [["eistee"],              "🧊"],
  [["cola","fanta","sprite","spezi"],"🥤"],
  [["limonade","limo","schorle"],"🥤"], [["smoothie"],            "🥤"],
  [["energydrink","energy"],     "⚡"], [["bier","pils","weizen"],"🍺"],
  [["rotwein"],                  "🍷"], [["wein","weißwein"],     "🍷"],
  [["sekt","prosecco","champagner"],"🥂"],
  [["whisky","whiskey"],         "🥃"], [["gin","vodka","rum"],   "🍸"],
  [["kokoswasser"],              "🥥"], [["kakaodrink"],          "🍫"],
  // Soßen & Würzmittel
  [["salz","meersalz"],          "🧂"], [["pfeffer"],             "🌶️"],
  [["olivenöl","rapsöl","pflanzenöl","kokosöl"],"🫒"],
  [["essig","balsamico"],        "🍶"], [["ketchup"],             "🍅"],
  [["senf"],                     "🟡"], [["mayo","mayonnaise","remoulade","aioli"],"🫙"],
  [["sojasoße","worcester","teriyaki"],"🫙"],
  [["tomatenmark","dosentomaten","pizzasoße","tomatensoße"],"🍅"],
  [["süß-sauer","süßsauer"],     "🍯"], [["bbq","barbecue"],      "🍖"],
  [["hollandaise"],              "🥚"], [["rahm-soße","rahmsoße","carbonara"],"🍶"],
  [["pestosoße","pesto"],        "🌿"], [["sriracha","chilisauce","chilisoß"],"🌶️"],
  [["honig"],                    "🍯"], [["marmelade","konfitüre"],"🍓"],
  [["nutella"],                  "🍫"], [["erdnussbutter","mandelmus","tahini"],"🥜"],
  [["agavensirup","ahornsirup"], "🍯"], [["zucker","vanillezucker"],"🍬"],
  [["curry","kurkuma","paprikapulver","chilipulver","kreuzkümmel","muskat","zimt","kardamom"],"🌶️"],
  [["oregano","lorbeer"],        "🌿"],
  [["brühe","gemüsebrühe","hühnerbrühe","brühwürfel","suppenwürze"],"🍲"],
  [["kokosmilch"],               "🥥"], [["backpulver","natron"], "🧁"],
  [["hefe"],                     "🌾"], [["mehl","vollkornmehl","dinkelmehl"],"🌾"],
  // Getreide & Hülsenfrüchte
  [["nudel","pasta","spaghetti","penne","fusilli","rigatoni","tagliatelle","tortellini","lasagne"],"🍝"],
  [["reisnudel","glasnudel","udon","instantnudel"],"🍜"],
  [["reis","basmati","jasmin"],  "🍚"], [["gnocchi"],             "🥔"],
  [["haferflocken","hafer"],     "🌾"], [["müsli","granola"],     "🥣"],
  [["cornflake","cerealien"],    "🥣"], [["quinoa","bulgur","couscous","hirse","buchweizen"],"🌾"],
  [["linse","kichererbse","kidneybohne"],"🌰"],
  [["paniermehl","semmelbrösel"],"🌾"], [["polenta"],             "🌽"],
  [["pizzateig"],                "🍕"],
  // Snacks
  [["schokolade","schoki"],      "🍫"], [["chips","pringles"],    "🥔"],
  [["keks","plätzchen"],         "🍪"], [["gummibär","gummi","weingummi","fruchtgummi"],"🐻"],
  [["nuss","cashew","mandel","erdnuss","pistazie","walnuss","macadamia"],"🥜"],
  [["studentenfutter"],          "🥜"], [["popcorn"],             "🍿"],
  [["eis","eiscreme"],           "🍦"], [["bonbon","lutsch"],     "🍬"],
  [["lakritz"],                  "🍬"], [["marzipan"],            "🍬"],
  [["riegel","müsliriegel"],     "🍫"], [["proteinriegel"],       "💪"],
  [["salzstange"],               "🥨"], [["cracker"],             "🫙"],
  [["reiswaffel"],               "🍘"], [["nachos","tortilla chip"],"🌮"],
  [["kakao","trinkschokolade"],  "🍫"],
  // Haushalt
  [["toilettenpapier","klopapier","wc-papier"],"🧻"],
  [["spülmittel","geschirrspültabs"],"🫧"],
  [["klarspüler"],               "✨"],
  [["rohreiniger","abflussreiniger"],"🪠"],
  [["fensterreiniger"],          "🪟"],
  [["badreiniger","wc-reiniger"],"🚽"],
  [["küchenreiniger"],           "🍳"],
  [["entkalker"],                "⚗️"],
  [["schimmelentferner"],        "🧪"],
  [["waschmittel","waschpulver","wäschebleiche","fleckenentferner","weichspüler"],"🧺"],
  [["putzmittel","allzweckreiniger","reiniger"],"🧹"],
  [["müllbeutel","müllsack","mülltüte"],"🗑️"],
  [["schwamm","spülbürste"],     "🧽"],
  [["küchenpapier","küchentuch","reinigungstuch","mikrofasertuch"],"🧻"],
  [["backpapier"],               "📄"],
  [["frischhaltefolie","staubsaugerbeutel"],"🌀"],
  [["aluminiumfolie"],           "✨"],
  [["gefrierbeutel"],            "🧊"],
  [["batterie"],                 "🔋"], [["glühbirne","lampe","leuchtmittel"],"💡"],
  [["kerze","teelicht"],         "🕯️"],
  [["streichholz"],              "🔥"], [["lufterfrischer"],      "🌸"],
  [["haushaltshandschuh"],       "🧤"], [["desinfektionsspray"],  "💧"],
  // Pflege
  [["shampoo","haarspülung","haarmaske"],"🧴"],
  [["zahnpasta","zahnbürste","mundwasser","zahnseide"],"🦷"],
  [["seife","handseife"],        "🧼"],
  [["deo","deodorant"],          "🌸"],
  [["rasierer","rasierklinge","rasierschaum"],"🪒"],
  [["duschgel","duschbad","badeschaum"],"🚿"],
  [["pflaster"],                 "🩹"],
  [["creme","lotion","handcreme","körperlotion","fußcreme"],"🧴"],
  [["sonnencreme"],              "☀️"],
  [["tablette","kapsel","pille","paracetamol","ibuprofen","aspirin","medikament","arznei"],"💊"],
  [["vitamin","magnesium","zink"],"💊"],
  [["wattestäbchen","wattepads","watte"],"🌸"],
  [["tampon","binde","damenbinden"],"🌸"],
  [["windel"],                   "👶"],
  [["haargel","haarspray"],      "💨"],
  [["lippenbalsam"],             "💋"],
  [["taschentuch"],              "🤧"], [["nasenspray"],          "💊"],
  // Tier
  [["hundefutter"],              "🐕"], [["katzenfutter","katzenmilch"],"🐈"],
  [["katzenstreu"],              "🐱"], [["hundeleckerli","hundesnack"],"🦴"],
  [["vogelfutter","vogelkörner"],"🐦"], [["hamsterfutter"],       "🐹"],
  [["kaninchenfutter"],          "🐰"], [["aquariumfutter"],      "🐠"],
  [["hundekotbeutel"],           "🐾"],
  // Baumarkt
  [["blumenerde","kompost","erde","torf"],"🌱"],
  [["dünger","rasendünger"],     "🌿"],
  [["blume","pflanze"],          "🌸"], [["blumentopf"],          "🪴"],
  [["saatgut","samen"],          "🌱"], [["gießkanne"],           "🪣"],
  [["schraube","nagel","dübel"], "🔩"], [["klebeband","tape"],    "🎗️"],
  [["gartenhandschuh","handschuh"],"🧤"],
  [["farbe","lack"],             "🎨"], [["pinsel"],              "🖌️"],
  [["silikon"],                  "🔧"],
];

function guessEmoji(name, catOverride = null) {
  const exact = ITEMS_DB.find(it => it.name.toLowerCase() === name.toLowerCase());
  if (exact) return exact.emoji;
  const n = name.toLowerCase();
  for (const [keywords, emoji] of EMOJI_MAP) {
    if (keywords.some(k => n.includes(k))) return emoji;
  }
  // Category-based fallback: use override (manual selection) if provided
  const cat = catOverride || guessCategory(name);
  const catFallbacks = {
    obst:"🥦", brot:"🍞", fleisch:"🥩", fertig:"🍽️", milch:"🥛",
    gewuerze:"🫙", getreide:"🌾", snacks:"🍿", getraenke:"🥤",
    haushalt:"🧹", pflege:"🧴", tier:"🐾", baumarkt:"🌱",
  };
  return catFallbacks[cat] || "🛒";
}

// ── STATE ─────────────────────────────────────────────────────────────────────
let lists            = [];
let activeId         = null;
let filterCat        = null;
let dlgCallback      = null;
let currentView      = "loading";
let customQty        = 1;
let pendingGridItem  = null;
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
  const yr   = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
  return Math.ceil((((d - yr) / 86400000) + 1) / 7);
}
function formatWeek(mondayStr) {
  if (!mondayStr) return "";
  const monday = new Date(mondayStr + "T00:00:00");
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const o = { day:"2-digit", month:"2-digit" };
  return `${monday.toLocaleDateString("de-DE",o)} – ${sunday.toLocaleDateString("de-DE",o)}`;
}
function getCat(id) { return CATEGORIES.find(c => c.id === id) || CATEGORIES[CATEGORIES.length - 1]; }
function escHtml(str) {
  return String(str)
    .replace(/&/g,"&amp;").replace(/</g,"&lt;")
    .replace(/>/g,"&gt;").replace(/"/g,"&quot;");
}
function escAttr(str) { return String(str).replace(/\\/g,"\\\\").replace(/'/g,"\\'"); }

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
onValue(ref(db,"lists"), snap => {
  const data = snap.val();
  lists = data ? Object.values(data).sort((a,b) => b.createdAt - a.createdAt) : [];
  if (currentView === "loading") showView("lists");
  else renderCurrentView();
}, err => {
  console.error("Firebase:",err);
  showToast("⚠️ Verbindungsfehler");
  if (currentView === "loading") showView("lists");
});

async function saveList(list) {
  try { await set(ref(db,`lists/${list.id}`), list); }
  catch(e) { console.error(e); showToast("⚠️ Speichern fehlgeschlagen"); throw e; }
}
async function deleteListFromDb(id) {
  await set(ref(db,`lists/${id}`), null);
}

// ── VIEWS ─────────────────────────────────────────────────────────────────────
function showView(id) {
  document.querySelectorAll(".view").forEach(v => v.classList.remove("active"));
  const target = document.getElementById(`view-${id}`);
  if (!target) return;
  target.classList.add("active");
  window.scrollTo({ top:0, behavior:"instant" });
  currentView = id;
  if (id === "lists")  renderLists();
  if (id === "detail") renderDetail();
  if (id === "add") {
    document.getElementById("search-input").value = "";
    document.getElementById("custom-name").value  = "";
    document.getElementById("custom-note").value  = "";
    const panel = document.getElementById("custom-add-panel");
    if (panel) panel.style.display = "none";
    // Collapse filter panel
    const catFilters = document.getElementById("cat-filters");
    const filterBtn  = document.getElementById("filter-toggle-btn");
    const chevron    = document.getElementById("filter-chevron");
    const label      = document.getElementById("filter-toggle-label");
    if (catFilters) { catFilters.classList.remove("cat-filters-open"); catFilters.classList.add("cat-filters-collapsed"); }
    if (filterBtn)  filterBtn.setAttribute("aria-expanded","false");
    if (chevron)    chevron.style.transform = "";
    if (label)      label.textContent = "Filter";
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
  if (!lists.length) { wrap.innerHTML=""; empty.style.display="block"; return; }
  empty.style.display = "none";
  wrap.innerHTML = lists.map(list => {
    const items  = list.items || [];
    const done   = items.filter(i => i.done).length;
    const total  = items.length;
    const pct    = total ? Math.round(done/total*100) : 0;
    const emojis = [...new Set(items.map(i => getCat(i.cat).emoji))].slice(0,6);
    const emojiHtml = emojis.map(e=>`<span>${e}</span>`).join("") +
      (total>6 ? `<span class="emoji-more">+${total-6}</span>` : "");
    const progressHtml = total ? `
      <div class="progress-track">
        <div class="progress-fill${pct===100?" complete":""}" style="width:${pct}%"></div>
      </div>` : "";
    const statusBadge = list.completed
      ? (done < total
          ? `<span class="completed-warning-badge">⚠️ ${total - done} nicht abgehakt</span>`
          : `<span class="completed-badge">✓ Abgeschlossen${list.completedAt ? " · " + new Date(list.completedAt).toLocaleDateString("de-DE",{day:"2-digit",month:"2-digit"}) : ""}</span>`)
      : "";
    return `
    <button class="list-card" onclick="openList('${list.id}')">
      <div class="list-card-top">
        <div>
          <div class="list-card-name">${escHtml(list.name)}</div>
          <div class="list-card-week">📅 ${formatWeek(list.weekStart)}</div>
        </div>
        <div class="list-card-meta">
          <div class="list-card-count${pct===100?" all-done":""}">${done}/${total}${pct===100?" ✓":""}</div>
          ${statusBadge}
        </div>
      </div>
      ${emojis.length ? `<div class="emoji-row">${emojiHtml}</div>` : ""}
      ${progressHtml}
    </button>`;
  }).join("");
}
window.openList = function(id) { activeId=id; showView("detail"); };

// ── NEUE LISTE ────────────────────────────────────────────────────────────────
document.getElementById("new-week").value = toDateStr(new Date());
updateWeekPreview();
window.updateWeekPreview = updateWeekPreview;
function updateWeekPreview() {
  const val  = document.getElementById("new-week").value;
  const prev = document.getElementById("week-preview");
  const txt  = document.getElementById("week-preview-text");
  if (val) {
    const mon = getMonday(new Date(val+"T12:00:00"));
    txt.textContent = formatWeek(toDateStr(mon));
    prev.classList.add("visible");
  } else { prev.classList.remove("visible"); }
}

window.createList = async function() {
  const nameInput = document.getElementById("new-name");
  const weekVal   = document.getElementById("new-week").value;
  const errorEl   = document.getElementById("create-error");
  const btn       = document.getElementById("btn-create");
  errorEl.style.display = "none";
  const monday = weekVal ? getMonday(new Date(weekVal+"T12:00:00")) : getMonday();
  const kw     = getKW(monday);
  const name   = nameInput.value.trim() || `Einkauf KW ${kw}`;
  btn.disabled=true; btn.textContent="Erstelle…";
  const list = { id:genId(), name, creator:"Familie", weekStart:toDateStr(monday), items:[], createdAt:Date.now() };
  try {
    await saveList(list);
    activeId = list.id;
    nameInput.value = "";
    showToast("✨ Liste erstellt!");
    showView("detail");
  } catch {
    errorEl.textContent   = "⚠️ Speichern fehlgeschlagen. Firebase-Regeln prüfen!";
    errorEl.style.display = "block";
  } finally { btn.disabled=false; btn.textContent="✨ Liste erstellen"; }
};

// ── LISTENDETAIL ──────────────────────────────────────────────────────────────
function renderDetail() {
  const list = lists.find(l => l.id===activeId);
  if (!list) { showView("lists"); return; }
  const items = list.items||[];
  const done  = items.filter(i=>i.done).length;
  const total = items.length;
  const pct   = total ? Math.round(done/total*100) : 0;

  document.getElementById("detail-name").textContent    = list.name;
  document.getElementById("detail-week").textContent    = formatWeek(list.weekStart);
  document.getElementById("detail-creator").textContent = list.creator||"Familie";

  const progWrap = document.getElementById("detail-progress-wrap");
  if (total>0) {
    progWrap.style.display="block";
    document.getElementById("progress-text").textContent = `${done} von ${total} erledigt`;
    const pctEl = document.getElementById("pct-text");
    pctEl.textContent = pct===100?"✓ Fertig!":`${pct}%`;
    pctEl.className   = pct===100?"done-pct":"";
    const fill = document.getElementById("progress-fill");
    fill.style.width = `${pct}%`;
    fill.className   = `progress-fill${pct===100?" complete":""}`;
  } else { progWrap.style.display="none"; }

  const sectEl  = document.getElementById("cat-sections");
  const emptyEl = document.getElementById("detail-empty");
  const completeBtnWrap = document.getElementById("complete-btn-wrap");
  const completedBanner = document.getElementById("completed-banner");
  const btnComplete     = document.getElementById("btn-complete-list");

  // Completed banner
  if (list.completed) {
    completedBanner.style.display = "flex";
    let bannerText = "✅ Einkauf abgeschlossen";
    if (list.completedAt) {
      const d = new Date(list.completedAt);
      const dateStr = d.toLocaleDateString("de-DE", {weekday:"short", day:"2-digit", month:"2-digit", year:"numeric"});
      bannerText += ` am ${dateStr}`;
    }
    completedBanner.textContent = bannerText;
  } else {
    completedBanner.style.display = "none";
  }

  // Complete / Reopen button
  if (total > 0) {
    completeBtnWrap.style.display = "block";
    if (list.completed) {
      btnComplete.textContent = "🔓 Einkauf wiederöffnen";
      btnComplete.className   = "btn-reopen";
      btnComplete.onclick     = () => reopenList();
    } else {
      btnComplete.textContent = "✅ Einkauf abschließen";
      btnComplete.className   = "btn-complete";
      btnComplete.onclick     = () => completeList();
    }
  } else {
    completeBtnWrap.style.display = "none";
  }

  if (!items.length) { sectEl.innerHTML=""; emptyEl.style.display="block"; return; }
  emptyEl.style.display="none";

  let html="";
  CATEGORIES.forEach(cat => {
    const catItems = items.filter(i=>i.cat===cat.id);
    if (!catItems.length) return;
    html+=`
    <div class="cat-section">
      <span class="cat-label" style="background:${cat.color};color:${cat.text}">
        ${cat.emoji} ${cat.name}
      </span>
      <div>
        ${catItems.map(it => {
          const qty = it.qty||1;

          // Notiz: Tag unter dem Namen (nur wenn Notiz vorhanden)
          // Notizbutton (Stift-Icon): immer sichtbar, aber nur wenn KEINE Notiz vorhanden
          const noteTag = it.note
            ? `<span class="item-note-tag" onclick="openNoteDialog('${it.id}')" title="${escAttr(it.note)}">
                 ${NOTE_ICON}<span class="item-note-tag-text">${escHtml(it.note)}</span>
               </span>`
            : "";
          const noteBtn = !it.note
            ? `<button class="note-btn" onclick="openNoteDialog('${it.id}')" aria-label="Notiz hinzufügen">
                 ${NOTE_ICON}
               </button>`
            : "";

          return `
          <div class="item-row${it.done?" done-row":""}">
            <span class="item-emoji">${it.emoji}</span>
            <div class="item-name-wrap">
              <span class="item-name">${escHtml(it.name)}</span>
              ${noteTag}
            </div>
            <div class="item-controls">
              ${noteBtn}
              <div class="qty-stepper">
                <button class="qty-step" onclick="changeQty('${it.id}',-1)">−</button>
                <span class="qty-num">${qty}</span>
                <button class="qty-step" onclick="changeQty('${it.id}',1)">+</button>
              </div>
              <button class="check-btn${it.done?" checked":""}"
                      onclick="toggleItem('${it.id}')"
                      aria-label="${it.done?"Abhaken rückgängig":"Abhaken"}">
                ${it.done?"✓":""}
              </button>
              <button class="del-btn" onclick="removeItem('${it.id}')" aria-label="Entfernen">✕</button>
            </div>
          </div>`;
        }).join("")}
      </div>
    </div>`;
  });
  sectEl.innerHTML=html;
}

window.toggleItem = async function(itemId) {
  const list=lists.find(l=>l.id===activeId); if(!list) return;
  const updated={...list, items:list.items.map(it=>it.id===itemId?{...it,done:!it.done}:it)};
  await saveList(updated);
};
window.changeQty = async function(itemId, delta) {
  const list=lists.find(l=>l.id===activeId); if(!list) return;
  const updated={...list, items:list.items.map(it=>{
    if(it.id!==itemId) return it;
    return {...it, qty:Math.max(1,(it.qty||1)+delta)};
  })};
  await saveList(updated);
};
window.removeItem = async function(itemId) {
  const list = lists.find(l => l.id === activeId); if (!list) return;
  const item = list.items.find(it => it.id === itemId);
  openDialog(
    "Artikel entfernen?",
    `„${item?.name || "Dieser Artikel"}" wird aus der Liste entfernt.`,
    async () => {
      const updated = {...list, items: list.items.filter(it => it.id !== itemId)};
      await saveList(updated);
    }
  );
};

// ── EINKAUF ABSCHLIESSEN ──────────────────────────────────────────────────────
window.completeList = async function() {
  const list = lists.find(l => l.id === activeId); if (!list) return;
  const items = list.items || [];
  const undone = items.filter(i => !i.done).length;
  const now = Date.now();
  if (undone > 0) {
    openDialog(
      "Noch nicht fertig! ⚠️",
      `Noch ${undone} Artikel ${undone === 1 ? "ist" : "sind"} nicht abgehakt. Trotzdem abschließen?`,
      async () => {
        await saveList({...list, completed: true, completedAt: now});
        showToast("🎉 Einkauf abgeschlossen!");
        showView("lists");
      },
      "Trotzdem abschließen"
    );
  } else {
    await saveList({...list, completed: true, completedAt: now});
    showToast("🎉 Einkauf abgeschlossen!");
    showView("lists");
  }
};
window.reopenList = async function() {
  const list = lists.find(l => l.id === activeId); if (!list) return;
  const updated = {...list, completed: false};
  delete updated.completedAt;
  await saveList(updated);
  showToast("🔓 Einkauf wieder geöffnet");
};
window.confirmDeleteList = function() {
  const list=lists.find(l=>l.id===activeId);
  openDialog(
    "Liste löschen?",
    `„${list?.name||"Diese Liste"}" wird dauerhaft gelöscht.`,
    async () => {
      try { await deleteListFromDb(activeId); activeId=null; showToast("🗑 Liste gelöscht"); showView("lists"); }
      catch { showToast("⚠️ Löschen fehlgeschlagen"); }
    }
  );
};

// ── ARTIKEL HINZUFÜGEN ────────────────────────────────────────────────────────
const customCatEl = document.getElementById("custom-cat");
// Blank placeholder option — shown when category can't be auto-detected
const blankOpt = document.createElement("option");
blankOpt.value = ""; blankOpt.textContent = "– Kategorie wählen –"; blankOpt.disabled = true;
customCatEl.appendChild(blankOpt);
CATEGORIES.forEach(c => {
  const o=document.createElement("option");
  o.value=c.id; o.textContent=`${c.emoji} ${c.name}`;
  customCatEl.appendChild(o);
});

// Track whether the user manually picked a category
let catManuallyChanged = false;
customCatEl.addEventListener("change", () => { catManuallyChanged = true; });

// Shared helper: apply auto-detected category to the select (only when not manually overridden)
function applyAutoCategory(name) {
  if (catManuallyChanged) return;
  const guessed = guessCategory(name.trim());
  if (guessed) {
    customCatEl.value = guessed;
  } else {
    customCatEl.value = ""; // nothing matched → leave blank, user must choose
  }
}

// Auto-assign category while typing the name, but only if not manually overridden
document.getElementById("custom-name").addEventListener("input", function() {
  applyAutoCategory(this.value);
});

function renderCatFilters() {
  const wrap=document.getElementById("cat-filters");
  wrap.innerHTML=
    `<button class="cat-filter-btn" style="${!filterCat?"background:var(--ink);color:#fff;border-color:var(--ink)":""}"
      onclick="setCatFilter(null)">Alle</button>`+
    CATEGORIES.map(c=>{
      const a=filterCat===c.id;
      return `<button class="cat-filter-btn"
        style="${a?`background:${c.color};color:${c.text};border-color:${c.text}`:""}"
        onclick="setCatFilter('${c.id}')">${c.emoji} ${c.name}</button>`;
    }).join("");
}
window.setCatFilter = function(id) {
  filterCat = id;
  renderCatFilters();
  renderItemGrid();
  // Update toggle label to show active filter
  const label = document.getElementById("filter-toggle-label");
  if (label) {
    if (id) {
      const cat = CATEGORIES.find(c => c.id === id);
      label.textContent = cat ? `${cat.emoji} ${cat.name}` : "Filter";
    } else {
      label.textContent = "Filter";
    }
  }
};
window.toggleFilters = function() {
  const panel = document.getElementById("cat-filters");
  const btn   = document.getElementById("filter-toggle-btn");
  const chevron = document.getElementById("filter-chevron");
  const open = panel.classList.toggle("cat-filters-open");
  panel.classList.toggle("cat-filters-collapsed", !open);
  btn.setAttribute("aria-expanded", open);
  chevron.style.transform = open ? "rotate(180deg)" : "";
};

window.renderItemGrid = function() {
  const q=(document.getElementById("search-input").value||"").toLowerCase().trim();
  const list=lists.find(l=>l.id===activeId);
  const existing=new Set((list?.items||[]).map(i=>i.name));
  const filtered=ITEMS_DB.filter(it=>
    (!q||it.name.toLowerCase().includes(q))&&(!filterCat||it.cat===filterCat)
  );
  const grid=document.getElementById("items-grid");
  const panel=document.getElementById("custom-add-panel");
  const nameEl=document.getElementById("custom-name");

  if(!filtered.length) {
    grid.innerHTML="";
    panel.style.display="block";
    // Pre-fill the name with whatever was typed, capitalised
    if(q && nameEl.value.toLowerCase().trim()!==q) {
      nameEl.value = q.charAt(0).toUpperCase()+q.slice(1);
      // Auto-detect category for the pre-filled name (respects manual override)
      catManuallyChanged = false;
      applyAutoCategory(nameEl.value);
    }
    return;
  }
  panel.style.display="none";
  grid.innerHTML=filtered.map(item=>{
    const inList=existing.has(item.name);
    return `
    <button class="item-tile${inList?" in-list":""}"
            onclick="addItemFromGrid('${escAttr(item.name)}','${item.emoji}','${item.cat}')"
            ${inList?"disabled":""}>
      <span class="tile-emoji">${item.emoji}</span>
      <span class="tile-name">${escHtml(item.name)}</span>
      ${inList?'<span class="tile-check">✓</span>':""}
    </button>`;
  }).join("");
};

// Artikel aus Raster → Dialog mit Menge + Notiz
window.addItemFromGrid = function(name,emoji,cat) {
  pendingGridItem={name,emoji,cat}; pendingAddQty=1;
  document.getElementById("add-item-emoji-disp").textContent=emoji;
  document.getElementById("add-item-name-disp").textContent=name;
  document.getElementById("add-qty-display").textContent="1";
  document.getElementById("add-item-note").value="";
  document.getElementById("add-item-overlay").classList.add("visible");
};
window.adjustAddQty = function(delta) {
  pendingAddQty=Math.max(1,pendingAddQty+delta);
  document.getElementById("add-qty-display").textContent=pendingAddQty;
};
window.closeAddItemDialog = function() {
  document.getElementById("add-item-overlay").classList.remove("visible");
  pendingGridItem=null;
};
window.confirmAddFromGrid = async function() {
  if(!pendingGridItem) return;
  const note=document.getElementById("add-item-note").value.trim();
  await addItemToList(pendingGridItem.name,pendingGridItem.emoji,pendingGridItem.cat,pendingAddQty,note);
  closeAddItemDialog();
  renderItemGrid();
};
document.getElementById("add-item-overlay").addEventListener("click",e=>{
  if(e.target===e.currentTarget) closeAddItemDialog();
});

// Eigener Artikel
window.adjustCustomQty = function(delta) {
  customQty=Math.max(1,customQty+delta);
  document.getElementById("custom-qty-display").textContent=customQty;
};

window.addCustomItem = async function() {
  const name =document.getElementById("custom-name").value.trim();
  const note =document.getElementById("custom-note").value.trim();
  if(!name){ showToast("⚠️ Namen eingeben!"); return; }
  const cat = document.getElementById("custom-cat").value;
  if(!cat){ showToast("⚠️ Bitte eine Kategorie wählen!"); return; }
  // Pass the selected category so the emoji fallback matches the chosen category
  const emoji = guessEmoji(name, cat);

  await addItemToList(name,emoji,cat,customQty,note);
  document.getElementById("custom-name").value="";
  document.getElementById("custom-note").value="";
  customQty=1;
  document.getElementById("custom-qty-display").textContent="1";
  // Reset manual override flag so the next item gets auto-detection again
  catManuallyChanged = false;
  customCatEl.value = "";
};

async function addItemToList(name,emoji,cat,qty=1,note="") {
  const list=lists.find(l=>l.id===activeId); if(!list) return;
  if((list.items||[]).find(i=>i.name===name)) return;
  const item={id:genId(),name,emoji,cat,done:false,qty};
  if(note) item.note=note;
  const updated={...list,items:[...(list.items||[]),item]};
  await saveList(updated);
  showToast(`✅ ${name} hinzugefügt`);
}

// ── NOTIZ-DIALOG ──────────────────────────────────────────────────────────────
window.openNoteDialog = function(itemId) {
  const list=lists.find(l=>l.id===activeId); if(!list) return;
  const item=(list.items||[]).find(i=>i.id===itemId); if(!item) return;
  currentNoteItemId=itemId;
  document.getElementById("note-textarea").value=item.note||"";
  document.getElementById("note-dlg-title").textContent=
    item.note ? `${item.name}` : `Notiz hinzufügen`;
  document.getElementById("note-overlay").classList.add("visible");
  setTimeout(()=>document.getElementById("note-textarea").focus(),120);
};
window.closeNoteDialog = function() {
  document.getElementById("note-overlay").classList.remove("visible");
  currentNoteItemId=null;
};
window.saveNote = async function() {
  const list=lists.find(l=>l.id===activeId);
  if(!list||!currentNoteItemId) return;
  const note=document.getElementById("note-textarea").value.trim();
  const updated={...list,items:list.items.map(it=>{
    if(it.id!==currentNoteItemId) return it;
    const newIt={...it};
    if(note) newIt.note=note; else delete newIt.note;
    return newIt;
  })};
  await saveList(updated);
  closeNoteDialog();
  showToast("📝 Notiz gespeichert");
};
document.getElementById("note-overlay").addEventListener("click",e=>{
  if(e.target===e.currentTarget) closeNoteDialog();
});

// ── LÖSCHEN-DIALOG ────────────────────────────────────────────────────────────
function openDialog(title, body, onConfirm, confirmText = "Löschen") {
  document.getElementById("dlg-title").textContent  = title;
  document.getElementById("dlg-body").textContent   = body;
  document.getElementById("dlg-confirm").textContent = confirmText;
  document.getElementById("confirm-overlay").classList.add("visible");
  dlgCallback = onConfirm;
}
window.closeDialog = function() {
  document.getElementById("confirm-overlay").classList.remove("visible");
  dlgCallback=null;
};
document.getElementById("dlg-confirm").addEventListener("click",()=>{
  const cb=dlgCallback; closeDialog(); cb?.();
});
document.getElementById("confirm-overlay").addEventListener("click",e=>{
  if(e.target===e.currentTarget) closeDialog();
});
