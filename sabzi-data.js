// Comprehensive Indian & Regional Vegetable Database
// Includes Hindi (Devanagari), English, Hinglish, and Regional Names (Gondl, Patal, Bhata, Kochai, Munga, Barbatti, Traditional Bhajis, etc.)

const VEGETABLES_DATA = [
  // ============================================================
  // 1. DAILY ESSENTIALS & AROMATICS (रोजाना सब्जियां व मसाले)
  // ============================================================
  {
    id: "potato",
    english: "Potato",
    hindi: "आलू",
    hinglish: "Aloo / Aalu",
    category: "daily",
    emoji: "🥔",
    defaultUnit: "2 kg",
    units: ["1 kg", "2 kg", "3 kg", "5 kg", "500 g"],
    popular: true
  },
  {
    id: "onion",
    english: "Onion",
    hindi: "प्याज़ / गोंदल",
    hinglish: "Pyaz / Pyaaz / Gondl / Kanda",
    category: "daily",
    emoji: "🧅",
    defaultUnit: "1 kg",
    units: ["1 kg", "2 kg", "3 kg", "5 kg", "500 g"],
    popular: true
  },
  {
    id: "tomato",
    english: "Tomato",
    hindi: "टमाटर / पाताल",
    hinglish: "Tamatar / Patal",
    category: "daily",
    emoji: "🍅",
    defaultUnit: "1 kg",
    units: ["500 g", "1 kg", "1.5 kg", "2 kg"],
    popular: true
  },
  {
    id: "green-chilli",
    english: "Green Chili",
    hindi: "हरी मिर्च",
    hinglish: "Hari Mirch / Green Chilli",
    category: "daily",
    emoji: "🌶️",
    defaultUnit: "100 g",
    units: ["50 g", "100 g", "250 g", "500 g"],
    popular: true
  },
  {
    id: "ginger",
    english: "Ginger",
    hindi: "अदरक",
    hinglish: "Adrak",
    category: "daily",
    emoji: "🫚",
    defaultUnit: "250 g",
    units: ["100 g", "250 g", "500 g"],
    popular: true
  },
  {
    id: "garlic",
    english: "Garlic",
    hindi: "लहसुन",
    hinglish: "Lehsun / Lahsun",
    category: "daily",
    emoji: "🧄",
    defaultUnit: "250 g",
    units: ["100 g", "250 g", "500 g"],
    popular: true
  },
  {
    id: "coriander",
    english: "Coriander Leaves",
    hindi: "धनिया पत्ता",
    hinglish: "Dhaniya Patta / Hara Dhaniya / Kothmir",
    category: "daily",
    emoji: "🌿",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "100 g", "250 g"],
    popular: true
  },
  {
    id: "curry-leaves",
    english: "Curry Leaves",
    hindi: "करी पत्ता / मीठा नीम",
    hinglish: "Curry Leaves / Meetha Neem / Kadi Patta",
    category: "daily",
    emoji: "🍃",
    defaultUnit: "1 मुट्ठी (Handful)",
    units: ["1 मुट्ठी", "2 मुट्ठी", "50 g"],
    popular: true
  },
  {
    id: "lemon",
    english: "Lemon",
    hindi: "नींबू",
    hinglish: "Nimbu / Lemon",
    category: "daily",
    emoji: "🍋",
    defaultUnit: "4 पीस (Pieces)",
    units: ["2 पीस", "4 पीस", "6 पीस", "10 पीस", "250 g"],
    popular: true
  },
  {
    id: "mint",
    english: "Mint Leaves",
    hindi: "पुदीना",
    hinglish: "Pudina / Mint",
    category: "daily",
    emoji: "🌱",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "100 g"],
    popular: true
  },

  // ============================================================
  // 2. EVERYDAY VEGETABLES (रोजमर्रा की खास सब्जियां)
  // ============================================================
  {
    id: "baingan-round",
    english: "Brinjal (Purple Round / Bhata)",
    hindi: "बैंगन / भाटा (गोल भरता)",
    hinglish: "Baingan / Bhata / Eggplant / Purple Round",
    category: "everyday",
    emoji: "🍆",
    defaultUnit: "1 kg",
    units: ["500 g", "1 kg", "2 पीस (बड़ा)"],
    popular: true
  },
  {
    id: "baingan-long",
    english: "Brinjal (Long Purple)",
    hindi: "लम्बा बैंगन / लम्बा भाटा",
    hinglish: "Lamba Baingan / Lamba Bhata / Long Purple Brinjal",
    category: "everyday",
    emoji: "🍆",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg", "250 g"],
    popular: true
  },
  {
    id: "baingan-green",
    english: "Brinjal (Green Variety)",
    hindi: "हरा बैंगन / हरा भाटा",
    hinglish: "Hara Baingan / Green Brinjal / Green Bhata",
    category: "everyday",
    emoji: "🍆",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg", "250 g"]
  },
  {
    id: "baingan-small",
    english: "Brinjal (Small Variety / Bharwa)",
    hindi: "छोटा बैंगन / छोटा भाटा",
    hinglish: "Chhota Baingan / Chhota Bhata / Small Brinjal",
    category: "everyday",
    emoji: "🍆",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"]
  },
  {
    id: "bhindi",
    english: "Okra / Lady Finger",
    hindi: "भिंडी",
    hinglish: "Bhindi / Okra / Lady Finger",
    category: "everyday",
    emoji: "🥗",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "cauliflower",
    english: "Cauliflower",
    hindi: "फूलगोभी",
    hinglish: "Phool Gobhi / Cauliflower",
    category: "everyday",
    emoji: "🥦",
    defaultUnit: "1 फूल (Piece)",
    units: ["1 फूल", "2 फूल", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "cabbage",
    english: "Cabbage",
    hindi: "पत्ता गोभी",
    hinglish: "Patta Gobhi / Bandh Gobhi / Cabbage",
    category: "everyday",
    emoji: "🥬",
    defaultUnit: "1 पीस (Piece)",
    units: ["1 पीस", "2 पीस", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "capsicum",
    english: "Capsicum / Bell Pepper",
    hindi: "शिमला मिर्च",
    hinglish: "Shimla Mirch / Capsicum / Bell Pepper",
    category: "everyday",
    emoji: "🫑",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "drumstick",
    english: "Drumstick",
    hindi: "मुंगा / सहजन",
    hinglish: "Munga / Sahjan / Singhi / Drumstick / Moringa",
    category: "everyday",
    emoji: "🥢",
    defaultUnit: "250 g (4-5 पीस)",
    units: ["250 g", "500 g", "4-5 पीस"],
    popular: true
  },
  {
    id: "jackfruit",
    english: "Jackfruit (Raw)",
    hindi: "कटहल (कच्चा)",
    hinglish: "Kathal / Raw Jackfruit",
    category: "everyday",
    emoji: "🍈",
    defaultUnit: "500 g (कटा हुआ)",
    units: ["500 g (कटा हुआ)", "1 kg", "1 पूरा"]
  },
  {
    id: "raw-banana",
    english: "Raw Banana",
    hindi: "कच्चा केला",
    hinglish: "Kachcha Kela / Kachha Kela / Green Banana",
    category: "everyday",
    emoji: "🍌",
    defaultUnit: "4 पीस (Pieces)",
    units: ["2 पीस", "4 पीस", "6 पीस", "1 kg"]
  },
  {
    id: "raw-papaya",
    english: "Raw Papaya",
    hindi: "कच्चा पपीता",
    hinglish: "Kachcha Papita / Kachha Papita / Raw Papaya",
    category: "everyday",
    emoji: "🍈",
    defaultUnit: "1 पीस (Piece)",
    units: ["1 पीस", "500 g", "1 kg"]
  },
  {
    id: "kochai-arbi",
    english: "Kochai / Taro Root (Arbi)",
    hindi: "कोचई / अरबी",
    hinglish: "Kochai / Arbi / Taro Root / Ghuiya",
    category: "everyday",
    emoji: "🥔",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg"],
    popular: true
  },
  {
    id: "jimikand",
    english: "Jimikand / Elephant Foot Yam",
    hindi: "जिमीकंद / सूरन",
    hinglish: "Jimikand / Suran / Elephant Foot Yam",
    category: "everyday",
    emoji: "🥔",
    defaultUnit: "500 g टुकड़ा",
    units: ["500 g", "1 kg"]
  },

  // ============================================================
  // 3. GOURDS & SQUASHES (लौकी, कद्दू, तोरी वर्ग)
  // ============================================================
  {
    id: "bottle-gourd",
    english: "Bottle Gourd",
    hindi: "लौकी",
    hinglish: "Lauki / Kaddu / Ghiya / Doodhi / Bottle Gourd",
    category: "gourds",
    emoji: "🥒",
    defaultUnit: "1 पीस (Piece)",
    units: ["1 पीस (लम्बी)", "1 पीस (गोल)", "2 पीस", "1 kg"],
    popular: true
  },
  {
    id: "bitter-gourd",
    english: "Bitter Gourd",
    hindi: "करेला",
    hinglish: "Karela / Bitter Gourd",
    category: "gourds",
    emoji: "🥒",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "ridge-gourd",
    english: "Ridge Gourd",
    hindi: "तोरई / तोरी",
    hinglish: "Turai / Tori / Ridge Gourd",
    category: "gourds",
    emoji: "🥒",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg", "1.5 kg"],
    popular: true
  },
  {
    id: "sponge-gourd",
    english: "Sponge Gourd",
    hindi: "नेनुआ / गिल्की",
    hinglish: "Nenua / Gilki / Sponge Gourd",
    category: "gourds",
    emoji: "🥒",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg"]
  },
  {
    id: "pointed-gourd",
    english: "Pointed Gourd",
    hindi: "परवल",
    hinglish: "Parwal / Parval / Pointed Gourd",
    category: "gourds",
    emoji: "🥬",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"]
  },
  {
    id: "ivy-gourd",
    english: "Ivy Gourd",
    hindi: "कुंदरू",
    hinglish: "Kundru / Tindora / Tendli / Ivy Gourd",
    category: "gourds",
    emoji: "🥒",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"]
  },
  {
    id: "ash-gourd",
    english: "Ash Gourd",
    hindi: "रखिया / पेठा / भूरा कद्दू",
    hinglish: "Rakhia / Rakhiya / Petha / Bhura Kaddu / Ash Gourd / Safed Kaddu",
    category: "gourds",
    emoji: "🍈",
    defaultUnit: "500 g टुकड़ा",
    units: ["500 g", "1 kg", "1 पूरा"]
  },
  {
    id: "pumpkin",
    english: "Pumpkin",
    hindi: "कद्दू / मखाना",
    hinglish: "Kaddu / Makhana / Sitaphal / Pumpkin",
    category: "gourds",
    emoji: "🎃",
    defaultUnit: "500 g टुकड़ा",
    units: ["500 g", "1 kg", "1 पूरा कद्दू"],
    popular: true
  },
  {
    id: "snake-gourd",
    english: "Snake Gourd",
    hindi: "चिचिंडा",
    hinglish: "Chichinda / Padwal / Snake Gourd",
    category: "gourds",
    emoji: "🥒",
    defaultUnit: "1 पीस",
    units: ["1 पीस", "2 पीस", "500 g"]
  },
  {
    id: "tinda",
    english: "Tinda / Apple Gourd",
    hindi: "टिंडा",
    hinglish: "Tinda / Apple Gourd / Dhemse",
    category: "gourds",
    emoji: "🍈",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg"]
  },

  // ============================================================
  // 4. BEANS & PEAS (फलियां और मटर)
  // ============================================================
  {
    id: "green-peas",
    english: "Green Peas",
    hindi: "मटर",
    hinglish: "Matar / Green Peas / Hari Matar",
    category: "beans",
    emoji: "🫛",
    defaultUnit: "1 kg",
    units: ["500 g", "1 kg", "2 kg"],
    popular: true
  },
  {
    id: "sem-phalli",
    english: "Broad Beans / Flat Beans",
    hindi: "सेम / सेम फली",
    hinglish: "Sem Phalli / Sem Phali / Sem / Flat Beans / Broad Beans",
    category: "beans",
    emoji: "🫛",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "gawar-phalli",
    english: "Cluster Beans",
    hindi: "ग्वार फली",
    hinglish: "Gawar Phalli / Gwar Phali / Cluster Beans",
    category: "beans",
    emoji: "🫛",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"]
  },
  {
    id: "french-beans",
    english: "French Beans",
    hindi: "बीन्स / फ्रेंच बीन्स",
    hinglish: "French Beans / Beans / Phali",
    category: "beans",
    emoji: "🫛",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "barbatti-lobia",
    english: "Cowpea / Yardlong Beans",
    hindi: "बरबट्टी / लोबिया",
    hinglish: "Barbatti / Barbati / Lobia / Chawli / Yardlong Beans / Cowpea",
    category: "beans",
    emoji: "🫛",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"],
    popular: true
  },

  // ============================================================
  // 5. ROOT & SALAD VEGETABLES (जड़ व सलाद सब्जियां)
  // ============================================================
  {
    id: "carrot",
    english: "Carrot",
    hindi: "गाजर",
    hinglish: "Gajar / Carrot",
    category: "roots",
    emoji: "🥕",
    defaultUnit: "1 kg",
    units: ["500 g", "1 kg", "2 kg"],
    popular: true
  },
  {
    id: "radish",
    english: "Radish",
    hindi: "मूली",
    hinglish: "Mooli / Radish",
    category: "roots",
    emoji: "🥢",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg", "2 गड्डी"],
    popular: true
  },
  {
    id: "beetroot",
    english: "Beetroot",
    hindi: "चुकंदर",
    hinglish: "Chukandar / Beetroot",
    category: "roots",
    emoji: "🫐",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"]
  },
  {
    id: "cucumber",
    english: "Cucumber",
    hindi: "खीरा / ककड़ी",
    hinglish: "Kheera / Kakdi / Cucumber",
    category: "roots",
    emoji: "🥒",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg", "2 kg"],
    popular: true
  },
  {
    id: "sweet-potato",
    english: "Sweet Potato",
    hindi: "शकरकंद / कांदा",
    hinglish: "Shakarkand / Kanda / Sweet Potato",
    category: "roots",
    emoji: "🍠",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg"]
  },
  {
    id: "turnip",
    english: "Turnip",
    hindi: "शलजम",
    hinglish: "Shalgam / Turnip",
    category: "roots",
    emoji: "🥔",
    defaultUnit: "500 g",
    units: ["500 g", "1 kg"]
  },

  // ============================================================
  // 6. LEAFY GREENS / BHAJI (हरी पत्तेदार भाजी व साग)
  // ============================================================
  {
    id: "spinach-bhaji",
    english: "Spinach",
    hindi: "पालक भाजी / पालक",
    hinglish: "Palak Bhaji / Palak / Spinach / Saag",
    category: "bhaji",
    emoji: "🥬",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "methi-bhaji",
    english: "Fenugreek Leaves",
    hindi: "मेथी भाजी / मेथी",
    hinglish: "Methi Bhaji / Methi / Fenugreek",
    category: "bhaji",
    emoji: "🌿",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "lal-chaulai-bhaji",
    english: "Amaranth Leaves (Lal & Chaulai)",
    hindi: "लाल और चौलाई भाजी",
    hinglish: "Lal Bhaji / Chaulai Bhaji / Lal Saag / Amaranth Leaves",
    category: "bhaji",
    emoji: "🌿",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "500 g"],
    popular: true
  },
  {
    id: "sarson-bhaji",
    english: "Mustard Greens",
    hindi: "सरसों भाजी / सरसों",
    hinglish: "Sarson Bhaji / Sarson Ka Saag / Mustard Greens",
    category: "bhaji",
    emoji: "🥗",
    defaultUnit: "1 kg",
    units: ["500 g", "1 kg", "2 kg"]
  },
  {
    id: "bathua-bhaji",
    english: "Bathua",
    hindi: "बथुआ भाजी / बथुआ",
    hinglish: "Bathua Bhaji / Bathua / Chenopodium",
    category: "bhaji",
    emoji: "🌱",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "500 g"]
  },
  {
    id: "munga-bhaji",
    english: "Moringa / Drumstick Leaves",
    hindi: "मुंगा भाजी",
    hinglish: "Munga Bhaji / Sahjan Patte / Drumstick Leaves / Moringa Bhaji",
    category: "bhaji",
    emoji: "🌿",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "250 g"],
    popular: true
  },
  {
    id: "kanda-bhaji",
    english: "Sweet Potato Leaves",
    hindi: "कांदा भाजी",
    hinglish: "Kanda Bhaji / Sweet Potato Leaves / Shakarkand Patte",
    category: "bhaji",
    emoji: "🍃",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी"]
  },
  {
    id: "khatta-amari-bhaji",
    english: "Sorrel / Roselle Leaves",
    hindi: "खट्टा भाजी / अंमारी भाजी",
    hinglish: "Khatta Bhaji / Amari Bhaji / Ambadi / Gongura / Sorrel / Roselle",
    category: "bhaji",
    emoji: "🌿",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "500 g"],
    popular: true
  },
  {
    id: "chana-bhaji",
    english: "Chickpea Leaves / Chana Saag",
    hindi: "चना भाजी",
    hinglish: "Chana Bhaji / Chana Saag / Chickpea Leaves",
    category: "bhaji",
    emoji: "🌱",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "500 g"],
    popular: true
  },
  {
    id: "chech-bhaji",
    english: "Chech Bhaji",
    hindi: "चेच भाजी",
    hinglish: "Chech Bhaji / Chech Saag",
    category: "bhaji",
    emoji: "🥬",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी"]
  },
  {
    id: "bohaar-bhaji",
    english: "Bohaar Bhaji",
    hindi: "बोहार भाजी",
    hinglish: "Bohaar Bhaji / Bohar Bhaji / Cordia Leaves",
    category: "bhaji",
    emoji: "🌿",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी"]
  },
  {
    id: "karmatta-bhaji",
    english: "Karmatta Bhaji (Water Spinach)",
    hindi: "करमत्ता भाजी",
    hinglish: "Karmatta Bhaji / Kalmi Saag / Nari Saag / Water Spinach",
    category: "bhaji",
    emoji: "🌱",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी"]
  },
  {
    id: "tinpania-bhaji",
    english: "Tinpania Bhaji",
    hindi: "तिनपनिया भाजी",
    hinglish: "Tinpania Bhaji / Tinpatia / Oxalis",
    category: "bhaji",
    emoji: "☘️",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी"]
  },

  // ============================================================
  // 7. OTHER COMMON ADDITIONS & EXTRAS (अन्य खास सब्जियां)
  // ============================================================
  {
    id: "mushroom",
    english: "Mushroom",
    hindi: "खुखड़ी / मशरूम",
    hinglish: "Khukhdi / Khukhri / Mushroom",
    category: "other",
    emoji: "🍄",
    defaultUnit: "1 पैकेट (200 g)",
    units: ["1 पैकेट", "2 पैकेट", "3 पैकेट"],
    popular: true
  },
  {
    id: "sweet-corn",
    english: "Sweet Corn",
    hindi: "भुट्टा / मक्का",
    hinglish: "Bhutta / Makka / Sweet Corn / Makai",
    category: "other",
    emoji: "🌽",
    defaultUnit: "2 पीस (Pieces)",
    units: ["2 पीस", "4 पीस", "1 पैकेट दाने"]
  },
  {
    id: "spring-onion",
    english: "Spring Onion",
    hindi: "हरा प्याज़",
    hinglish: "Hara Pyaz / Hara Pyaaz / Spring Onion",
    category: "other",
    emoji: "🧅",
    defaultUnit: "1 गड्डी (Bunch)",
    units: ["1 गड्डी", "2 गड्डी", "250 g", "500 g"]
  },
  {
    id: "paneer",
    english: "Fresh Paneer",
    hindi: "ताजा पनीर",
    hinglish: "Fresh Paneer / Cottage Cheese",
    category: "other",
    emoji: "🧀",
    defaultUnit: "250 g",
    units: ["200 g", "250 g", "500 g", "1 kg"],
    popular: true
  },
  {
    id: "raw-mango",
    english: "Raw Mango / Kairi",
    hindi: "कच्चा आम / कैरी",
    hinglish: "Kaccha Aam / Kairi / Raw Mango",
    category: "other",
    emoji: "🥭",
    defaultUnit: "500 g",
    units: ["250 g", "500 g", "1 kg"]
  }
];

const CATEGORIES = [
  { id: "all", english: "All Vegetables", hindi: "सभी सब्जियां", icon: "🧺" },
  { id: "popular", english: "Most Frequent", hindi: "खास / रोजाना", icon: "⭐" },
  { id: "daily", english: "Daily Essentials", hindi: "रोजाना (आलू-प्याज़-टमाटर)", icon: "🥔" },
  { id: "everyday", english: "Everyday Veggies", hindi: "बैंगन, गोभी, भिंडी, मुंगा", icon: "🍆" },
  { id: "bhaji", english: "Leafy Greens (Bhaji)", hindi: "भाजी (पालक, मेथी, मुंगा, लाल भाजी)", icon: "🥬" },
  { id: "gourds", english: "Gourds & Squashes", hindi: "लौकी, कद्दू, रखिया, तोरई", icon: "🥒" },
  { id: "beans", english: "Beans & Peas", hindi: "मटर, सेम, बरबट्टी, बीन्स", icon: "🫛" },
  { id: "roots", english: "Roots & Salad", hindi: "गाजर, मूली, खीरा, कोचई", icon: "🥕" },
  { id: "other", english: "Other Additions", hindi: "खुखड़ी (Mushroom), भुट्टा, पनीर", icon: "🍄" }
];
