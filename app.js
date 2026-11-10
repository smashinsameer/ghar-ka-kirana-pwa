// ============================================================
// घर का किराना (Ghar Ka Kirana) - DMart Grocery PWA Logic
// 3 Language Modes (Bilingual / Hindi Only / English Only)
// ============================================================

(function () {
  'use strict';

  // --- STORAGE KEYS ---
  const STORAGE_KEY_CART = 'kirana_pwa_cart';
  const STORAGE_KEY_SETTINGS = 'kirana_pwa_settings';
  const STORAGE_KEY_LANG = 'kirana_pwa_lang';
  const STORAGE_KEY_PROFILE = 'kirana_pwa_profile';

  // --- STATE ---
  let cart = [];
  let settings = {
    recipientPhone: '',
    senderName: 'मम्मी'
  };
  let langMode = 'both'; // 'both' | 'hi' | 'en'
  let currentProfile = 'all'; // 'all' | 'sabzi_fruits' | 'grocery'
  let currentCategory = 'all';
  let currentSubCategory = 'all';
  let searchQuery = '';
  let activeModalItem = null;
  let activeModalUnit = '';
  let activeModalNote = '';
  let deferredInstallPrompt = null;

  const sabziItems = typeof VEGETABLES_DATA === 'undefined' ? [] : VEGETABLES_DATA.map((vegetable) => ({
    id: `sabzi-${vegetable.id}`,
    en: vegetable.english,
    hi: vegetable.hindi,
    hinglish: vegetable.hinglish,
    category: 'vegetables',
    subCategory: vegetable.category,
    profile: 'sabzi_fruits',
    emoji: vegetable.emoji,
    defaultUnit: vegetable.defaultUnit,
    units: vegetable.units,
    popular: vegetable.popular
  }));

  // --- DOM ELEMENTS ---
  const headerTitle = document.getElementById('headerTitle');
  const headerSubtitle = document.getElementById('headerSubtitle');
  const langBtns = document.querySelectorAll('.lang-btn');

  const tabCatalogBtn = document.getElementById('tabCatalogBtn');
  const tabBasketBtn = document.getElementById('tabBasketBtn');
  const tabCatalogText = document.getElementById('tabCatalogText');
  const tabBasketText = document.getElementById('tabBasketText');
  const tabBasketBadge = document.getElementById('tabBasketBadge');

  const catalogView = document.getElementById('catalogView');
  const basketView = document.getElementById('basketView');
  const basketContent = document.getElementById('basketContent');

  const searchInput = document.getElementById('searchInput');
  const clearSearchBtn = document.getElementById('clearSearchBtn');
  const voiceSearchBtn = document.getElementById('voiceSearchBtn');

  const categoryChipsContainer = document.getElementById('categoryChipsContainer');
  const currentCategoryIcon = document.getElementById('currentCategoryIcon');
  const currentCategoryTitle = document.getElementById('currentCategoryTitle');
  const vegSubCategoryBar = document.getElementById('vegSubCategoryBar');
  const vegSubChipsContainer = document.getElementById('vegSubChipsContainer');
  const itemCountText = document.getElementById('itemCountText');
  const groceryGrid = document.getElementById('groceryGrid');
  const customBannerText = document.getElementById('customBannerText');
  const openCustomItemBtn = document.getElementById('openCustomItemBtn');

  // Floating Bottom Bar
  const floatingBottomBar = document.getElementById('floatingBottomBar');
  const floatingBasketClick = document.getElementById('floatingBasketClick');
  const floatingItemCountBadge = document.getElementById('floatingItemCountBadge');
  const floatingTitleText = document.getElementById('floatingTitleText');
  const floatingSubtitleText = document.getElementById('floatingSubtitleText');
  const floatingShareWhatsAppBtn = document.getElementById('floatingShareWhatsAppBtn');

  // Quantity Modal
  const qtyModal = document.getElementById('qtyModal');
  const modalItemEmoji = document.getElementById('modalItemEmoji');
  const modalItemPriTitle = document.getElementById('modalItemPriTitle');
  const modalItemSecTitle = document.getElementById('modalItemSecTitle');
  const modalUnitsLabel = document.getElementById('modalUnitsLabel');
  const modalUnitsGrid = document.getElementById('modalUnitsGrid');
  const modalStepperLabel = document.getElementById('modalStepperLabel');
  const stepperMinusBtn = document.getElementById('stepperMinusBtn');
  const stepperPlusBtn = document.getElementById('stepperPlusBtn');
  const stepperDisplay = document.getElementById('stepperDisplay');
  const modalNoteLabel = document.getElementById('modalNoteLabel');
  const modalNoteInput = document.getElementById('modalNoteInput');
  const modalAddConfirmBtn = document.getElementById('modalAddConfirmBtn');
  const modalAddConfirmBtnText = document.getElementById('modalAddConfirmBtnText');
  const modalCloseBtn = document.getElementById('modalCloseBtn');

  // Custom Item Modal
  const customItemModal = document.getElementById('customItemModal');
  const customItemName = document.getElementById('customItemName');
  const customItemQty = document.getElementById('customItemQty');
  const customItemNote = document.getElementById('customItemNote');
  const customItemAddBtn = document.getElementById('customItemAddBtn');
  const customItemCloseBtn = document.getElementById('customItemCloseBtn');

  // Settings Modal
  const settingsModal = document.getElementById('settingsModal');
  const settingsBtn = document.getElementById('settingsBtn');
  const recipientPhoneInput = document.getElementById('recipientPhoneInput');
  const senderNameInput = document.getElementById('senderNameInput');
  const saveSettingsBtn = document.getElementById('saveSettingsBtn');
  const closeSettingsBtn = document.getElementById('closeSettingsBtn');

  // Help Modal
  const helpModal = document.getElementById('helpModal');
  const helpBtn = document.getElementById('helpBtn');
  const closeHelpBtn = document.getElementById('closeHelpBtn');

  // Toast
  const toastMsg = document.getElementById('toastMsg');
  const toastText = document.getElementById('toastText');
  const toastIcon = document.getElementById('toastIcon');

  // --- INIT APPLICATION ---
  function init() {
    loadStateFromStorage();
    registerServiceWorker();
    applyLanguageMode(langMode);
    applyProfileMode(currentProfile, false);
    updateCartUI();
    bindEvents();
  }

  // --- STATE STORAGE ---
  function loadStateFromStorage() {
    try {
      const savedLang = localStorage.getItem(STORAGE_KEY_LANG);
      if (savedLang && (savedLang === 'both' || savedLang === 'hi' || savedLang === 'en')) {
        langMode = savedLang;
      }
    } catch (e) {
      console.error('Error loading lang:', e);
    }

    try {
      const savedProfile = localStorage.getItem(STORAGE_KEY_PROFILE);
      if (savedProfile && (savedProfile === 'all' || savedProfile === 'sabzi_fruits' || savedProfile === 'grocery')) {
        currentProfile = savedProfile;
      }
    } catch (e) {
      console.error('Error loading profile:', e);
    }

    try {
      const savedCart = localStorage.getItem(STORAGE_KEY_CART);
      if (savedCart) {
        cart = JSON.parse(savedCart);
      }
    } catch (e) {
      console.error('Error loading cart:', e);
      cart = [];
    }

    try {
      const savedSettings = localStorage.getItem(STORAGE_KEY_SETTINGS);
      if (savedSettings) {
        settings = Object.assign(settings, JSON.parse(savedSettings));
      }
      recipientPhoneInput.value = settings.recipientPhone || '';
      senderNameInput.value = settings.senderName || 'मम्मी';
    } catch (e) {
      console.error('Error loading settings:', e);
    }
  }

  function saveCartToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_CART, JSON.stringify(cart));
    } catch (e) {
      console.error('Error saving cart:', e);
    }
  }

  function saveSettingsToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_SETTINGS, JSON.stringify(settings));
    } catch (e) {
      console.error('Error saving settings:', e);
    }
  }

  function saveLangToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_LANG, langMode);
    } catch (e) {
      console.error('Error saving lang:', e);
    }
  }

  function saveProfileToStorage() {
    try {
      localStorage.setItem(STORAGE_KEY_PROFILE, currentProfile);
    } catch (e) {
      console.error('Error saving profile:', e);
    }
  }

  // --- SHOPPING PROFILES / MODES ---
  function applyProfileMode(profileId, showToastNotification = true) {
    currentProfile = profileId;
    saveProfileToStorage();

    // Update active class on profile buttons
    const profileBtns = document.querySelectorAll('.profile-tab-btn');
    profileBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-profile') === profileId);
    });

    // Reset current category to 'all' or appropriate default for the profile
    currentCategory = 'all';
    currentSubCategory = 'all';

    updateHeaderSubtitle();
    renderCategories();
    renderVegSubCategoryBar();
    renderGroceryGrid();

    if (showToastNotification) {
      const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;
      let toastName = '';
      if (profileId === 'sabzi_fruits') toastName = t.profileSabzi;
      else if (profileId === 'grocery') toastName = t.profileGrocery;
      else toastName = t.profileAll;
      showToast(`${toastName} चालू किया`);
    }
  }

  function updateHeaderSubtitle() {
    const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;
    if (currentProfile === 'sabzi_fruits') {
      headerSubtitle.textContent = langMode === 'hi' ? 'मम्मी की ताज़ा सब्जी व फल लिस्ट' : (langMode === 'en' ? "Mom's Fresh Veggies & Fruits List" : 'मम्मी की सब्जी व फल लिस्ट (Sabzi & Fruits)');
    } else if (currentProfile === 'grocery') {
      headerSubtitle.textContent = langMode === 'hi' ? 'मम्मी की किराना व राशन लिस्ट (DMart)' : (langMode === 'en' ? "Mom's DMart Grocery Shopping List" : 'मम्मी की किराना व राशन लिस्ट (DMart Grocery)');
    } else {
      headerSubtitle.textContent = t.appSubtitle;
    }
  }

  // --- LANGUAGE SWITCHER ---
  function applyLanguageMode(mode) {
    langMode = mode;
    saveLangToStorage();

    // Update active button in header
    langBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-lang') === mode);
    });

    const t = UI_TRANSLATIONS[mode] || UI_TRANSLATIONS.both;

    // Header & Tabs
    headerTitle.textContent = t.appTitle;
    tabCatalogText.textContent = t.tabCatalog;
    tabBasketText.textContent = t.tabBasket;
    searchInput.placeholder = t.searchPlaceholder;
    customBannerText.textContent = t.addCustomBanner;
    openCustomItemBtn.textContent = t.addCustomBtn;

    // Profile buttons text
    const profileTextAll = document.getElementById('profileTextAll');
    const profileTextSabzi = document.getElementById('profileTextSabzi');
    const profileTextGrocery = document.getElementById('profileTextGrocery');
    if (profileTextAll) profileTextAll.textContent = t.profileAll;
    if (profileTextSabzi) profileTextSabzi.textContent = t.profileSabzi;
    if (profileTextGrocery) profileTextGrocery.textContent = t.profileGrocery;

    updateHeaderSubtitle();

    // Modals
    modalUnitsLabel.textContent = t.qtyModalTitle;
    modalStepperLabel.textContent = t.qtyStepperTitle;
    modalNoteLabel.textContent = t.noteLabel;
    modalNoteInput.placeholder = t.notePlaceholder;
    modalCloseBtn.textContent = t.cancelBtn;

    // Re-render categories & catalog with new language
    renderCategories();
    renderVegSubCategoryBar();
    renderGroceryGrid();

    if (basketView.style.display !== 'none') {
      renderBasketView();
    } else {
      updateFloatingBar();
    }
  }

  // --- CATEGORIES RENDERING ---
  function renderCategories() {
    categoryChipsContainer.innerHTML = '';
    const visibleCategories = GROCERY_CATEGORIES.filter(cat => {
      if (currentProfile === 'all') return true;
      if (cat.profile === 'all') return true;
      return cat.profile === currentProfile;
    });

    visibleCategories.forEach(cat => {
      const btn = document.createElement('button');
      btn.className = `chip-btn ${cat.id === currentCategory ? 'active' : ''}`;
      
      let title = '';
      if (langMode === 'hi') {
        title = cat.hi;
      } else if (langMode === 'en') {
        title = cat.en;
      } else {
        title = `${cat.hi} (${cat.en})`;
      }

      if (cat.id === 'all') {
        if (currentProfile === 'sabzi_fruits') {
          title = langMode === 'hi' ? 'सभी सब्जी-फल' : (langMode === 'en' ? 'All Veggies & Fruits' : 'सभी सब्जी-फल (All)');
        } else if (currentProfile === 'grocery') {
          title = langMode === 'hi' ? 'सभी किराना सामान' : (langMode === 'en' ? 'All Groceries' : 'सभी किराना (All Grocery)');
        }
      }

      btn.innerHTML = `<span>${cat.icon}</span> <span>${title}</span>`;
      btn.addEventListener('click', () => {
        currentCategory = cat.id;
        currentSubCategory = 'all';
        document.querySelectorAll('.chip-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Update section title
        currentCategoryIcon.textContent = cat.icon;
        currentCategoryTitle.textContent = title;
        renderVegSubCategoryBar();
        renderGroceryGrid();
      });
      categoryChipsContainer.appendChild(btn);
    });
  }

  // --- VEGETABLE SUB-CATEGORY CHIPS ---
  const VEG_SUBCATS = [
    { id: "all", hi: "सभी सब्जियां", en: "All Veggies", icon: "🧺" },
    { id: "daily", hi: "रोजाना (Daily)", en: "Daily Staples", icon: "🥔" },
    { id: "bhaji", hi: "पारंपरिक भाजी (13 Bhajis)", en: "Traditional Bhajis", icon: "🥬" },
    { id: "everyday", hi: "बैंगन-गोभी-भिंडी-मुंगा", en: "Everyday Veggies", icon: "🍆" },
    { id: "gourds", hi: "लौकी-कद्दू-रखिया-तोरई", en: "Gourds & Squashes", icon: "🥒" },
    { id: "beans", hi: "मटर-सेम-बरबट्टी", en: "Beans & Peas", icon: "🫛" },
    { id: "roots", hi: "गाजर-मूली-कोचई", en: "Roots & Salad", icon: "🥕" },
    { id: "other", hi: "अन्य सब्जियां", en: "Other Vegetables", icon: "🍄" }
  ];

  function renderVegSubCategoryBar() {
    if (currentCategory !== 'vegetables') {
      vegSubCategoryBar.style.display = 'none';
      return;
    }

    vegSubCategoryBar.style.display = 'block';
    vegSubChipsContainer.innerHTML = '';

    VEG_SUBCATS.forEach(sc => {
      const btn = document.createElement('button');
      const active = sc.id === currentSubCategory;
      btn.className = `chip-btn ${active ? 'active' : ''}`;
      const label = langMode === 'en' ? sc.en : sc.hi;
      btn.innerHTML = `<span>${sc.icon}</span> <span>${label}</span>`;
      btn.addEventListener('click', () => {
        currentSubCategory = sc.id;
        renderVegSubCategoryBar();
        renderGroceryGrid();
      });
      vegSubChipsContainer.appendChild(btn);
    });
  }

  // --- GROCERY GRID RENDERING ---
  function renderGroceryGrid() {
    const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;

    // Update section title & icon
    if (currentCategory === 'all') {
      if (currentProfile === 'sabzi_fruits') {
        currentCategoryIcon.textContent = '🥦🍎';
        currentCategoryTitle.textContent = langMode === 'hi' ? 'सभी ताज़ा सब्जियां व फल' : (langMode === 'en' ? 'All Fresh Veggies & Fruits' : 'सभी ताज़ा सब्जियां व फल (Fresh Sabzi & Fruits)');
      } else if (currentProfile === 'grocery') {
        currentCategoryIcon.textContent = '🏬';
        currentCategoryTitle.textContent = langMode === 'hi' ? 'सभी किराना व राशन' : (langMode === 'en' ? 'All DMart Groceries' : 'सभी किराना व राशन (DMart Groceries)');
      } else {
        currentCategoryIcon.textContent = '🛒';
        currentCategoryTitle.textContent = t.allSectionTitle;
      }
    } else if (currentCategory === 'popular') {
      currentCategoryIcon.textContent = '⭐';
      currentCategoryTitle.textContent = langMode === 'hi' ? 'रोजाना जरूरत का सामान' : (langMode === 'en' ? 'Daily Staples' : 'रोजाना जरूरत (Daily Staples)');
    } else {
      const cat = GROCERY_CATEGORIES.find(c => c.id === currentCategory);
      if (cat) {
        currentCategoryIcon.textContent = cat.icon;
        let title = '';
        if (langMode === 'hi') title = cat.hi;
        else if (langMode === 'en') title = cat.en;
        else title = `${cat.hi} (${cat.en})`;
        currentCategoryTitle.textContent = title;
      }
    }

    let filtered = [...GROCERIES_DATA, ...sabziItems].filter(item => {
      // Profile filter
      if (currentProfile !== 'all') {
        if (item.profile !== currentProfile) return false;
      }

      // Category filter
      if (currentCategory === 'popular' && !item.popular) return false;
      if (currentCategory !== 'all' && currentCategory !== 'popular' && item.category !== currentCategory) return false;

      // Sub-category filter for vegetables
      if (currentCategory === 'vegetables' && currentSubCategory !== 'all') {
        if (item.subCategory !== currentSubCategory) return false;
      }

      // Search filter
      if (searchQuery) {
        const matchesEn = (item.en || '').toLowerCase().includes(searchQuery);
        const matchesHi = (item.hi || '').toLowerCase().includes(searchQuery);
        const matchesHinglish = (item.hinglish || '').toLowerCase().includes(searchQuery);
        return matchesEn || matchesHi || matchesHinglish;
      }
      return true;
    });

    itemCountText.textContent = `${filtered.length} ${langMode === 'en' ? 'Items' : 'सामान'}`;
    groceryGrid.innerHTML = '';

    if (filtered.length === 0) {
      groceryGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px 10px; background: white; border-radius: 16px; border: 1.5px dashed #cbd5e1;">
          <div style="font-size: 3rem; margin-bottom: 8px;">🔍</div>
          <h3 style="font-size: 1.2rem; font-weight: 800; color: #1e293b;">${t.searchNotFound}</h3>
          <p style="font-size: 0.9rem; color: #64748b; margin-top: 4px;">
            "<strong>${escapeHtml(searchQuery)}</strong>"
          </p>
          <button id="addCustomFromSearchBtn" style="margin-top: 14px; background: var(--primary); color: white; border: none; padding: 10px 18px; border-radius: 9999px; font-weight: 700; cursor: pointer;">
            ${t.addCustomBtn}
          </button>
        </div>
      `;
      const addCustomFromSearchBtn = document.getElementById('addCustomFromSearchBtn');
      if (addCustomFromSearchBtn) {
        addCustomFromSearchBtn.addEventListener('click', () => {
          customItemName.value = searchQuery;
          customItemQty.value = '1 पैकेट';
          customItemNote.value = '';
          customItemModal.classList.add('active');
        });
      }
      return;
    }

    filtered.forEach(item => {
      const inCartItem = cart.find(ci => ci.id === item.id);
      const isAdded = Boolean(inCartItem);

      const card = document.createElement('div');
      card.className = `grocery-card ${isAdded ? 'in-cart' : ''}`;
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');

      let priName = '';
      let secName = '';

      if (langMode === 'hi') {
        priName = item.hi;
      } else if (langMode === 'en') {
        priName = item.en;
      } else {
        // Both
        priName = item.hi;
        secName = item.en;
      }

      card.innerHTML = `
        ${isAdded ? `<span class="grocery-badge-added">✓ ${escapeHtml(inCartItem.quantity)}</span>` : ''}
        <div class="grocery-emoji">${item.emoji}</div>
        <div class="grocery-names">
          <div class="primary-name">${escapeHtml(priName)}</div>
          ${secName ? `<div class="secondary-name">${escapeHtml(secName)}</div>` : ''}
          ${langMode === 'both' ? `<div class="hinglish-alias">${escapeHtml(item.hinglish.split('/')[0])}</div>` : ''}
        </div>
        <button class="grocery-card-btn">
          ${isAdded ? `<span>${t.inCartBtn}</span>` : `<span>${t.addBtn}</span>`}
        </button>
      `;

      card.addEventListener('click', () => openQuantityModal(item));
      groceryGrid.appendChild(card);
    });
  }

  // --- QUANTITY MODAL ---
  function openQuantityModal(item) {
    activeModalItem = item;
    const existing = cart.find(ci => ci.id === item.id);
    const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;

    modalItemEmoji.textContent = item.emoji;

    if (langMode === 'hi') {
      modalItemPriTitle.textContent = item.hi;
      modalItemSecTitle.textContent = '';
      modalItemSecTitle.style.display = 'none';
    } else if (langMode === 'en') {
      modalItemPriTitle.textContent = item.en;
      modalItemSecTitle.textContent = '';
      modalItemSecTitle.style.display = 'none';
    } else {
      modalItemPriTitle.textContent = item.hi;
      modalItemSecTitle.textContent = item.en;
      modalItemSecTitle.style.display = 'block';
    }

    activeModalUnit = existing ? existing.quantity : item.defaultUnit;
    activeModalNote = existing ? (existing.note || '') : '';
    modalNoteInput.value = activeModalNote;
    stepperDisplay.textContent = activeModalUnit;

    // Render quick unit chips
    modalUnitsGrid.innerHTML = '';
    const suggestedUnits = item.units && item.units.length > 0 ? item.units : ["500 g", "1 kg", "2 kg"];

    suggestedUnits.forEach(u => {
      const chip = document.createElement('button');
      chip.className = `unit-chip ${u === activeModalUnit ? 'selected' : ''}`;
      chip.textContent = u;
      chip.addEventListener('click', () => {
        activeModalUnit = u;
        stepperDisplay.textContent = u;
        document.querySelectorAll('.unit-chip').forEach(c => c.classList.remove('selected'));
        chip.classList.add('selected');
        updateModalConfirmBtnText();
      });
      modalUnitsGrid.appendChild(chip);
    });

    updateModalConfirmBtnText();
    qtyModal.classList.add('active');
  }

  function updateModalConfirmBtnText() {
    const existing = cart.find(ci => ci.id === activeModalItem.id);
    const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;
    if (existing) {
      modalAddConfirmBtnText.textContent = `${t.confirmUpdateBtn} (${activeModalUnit})`;
    } else {
      modalAddConfirmBtnText.textContent = `${t.confirmAddBtn} (${activeModalUnit})`;
    }
  }

  function adjustStepper(direction) {
    const current = stepperDisplay.textContent;

    // Weight kg / g
    if (current.includes('g') || current.includes('kg')) {
      const matchKg = current.match(/([\d\.]+)\s*kg/i);
      const matchG = current.match(/(\d+)\s*g/i);
      let grams = 500;

      if (matchKg) grams = parseFloat(matchKg[1]) * 1000;
      else if (matchG) grams = parseInt(matchG[1], 10);

      if (direction > 0) {
        if (grams < 1000) grams += 250;
        else if (grams < 5000) grams += 500;
        else grams += 1000;
      } else {
        if (grams > 5000) grams -= 1000;
        else if (grams > 1000) grams -= 500;
        else if (grams > 250) grams -= 250;
        else if (grams > 100) grams -= 50;
      }

      let newUnit = '';
      if (grams >= 1000) {
        const kgVal = grams / 1000;
        newUnit = `${Number.isInteger(kgVal) ? kgVal : kgVal.toFixed(1)} kg`;
      } else {
        newUnit = `${grams} g`;
      }
      activeModalUnit = newUnit;
      stepperDisplay.textContent = newUnit;
    }
    // Litre / ml
    else if (current.includes('L') || current.includes('ml') || current.includes('Litre')) {
      const matchL = current.match(/([\d\.]+)\s*(?:L|Litre)/i);
      const matchMl = current.match(/(\d+)\s*ml/i);
      let ml = 1000;

      if (matchL) ml = parseFloat(matchL[1]) * 1000;
      else if (matchMl) ml = parseInt(matchMl[1], 10);

      if (direction > 0) {
        if (ml < 1000) ml += 250;
        else ml += 1000;
      } else {
        if (ml > 1000) ml -= 1000;
        else if (ml > 500) ml -= 250;
        else if (ml > 200) ml -= 100;
      }

      let newUnit = '';
      if (ml >= 1000) {
        const lVal = ml / 1000;
        newUnit = `${Number.isInteger(lVal) ? lVal : lVal.toFixed(1)} Litre`;
      } else {
        newUnit = `${ml} ml`;
      }
      activeModalUnit = newUnit;
      stepperDisplay.textContent = newUnit;
    }
    // Packets / Bars / Pieces / Bunches
    else {
      const matchNum = current.match(/\d+/);
      let count = matchNum ? parseInt(matchNum[0], 10) : 1;
      count += direction;
      if (count < 1) count = 1;

      let suffix = 'पैकेट';
      if (current.includes('टिकिया') || current.includes('bar')) suffix = 'टिकिया';
      else if (current.includes('बोतल') || current.includes('bottle')) suffix = 'बोतल';
      else if (current.includes('पीस') || current.includes('pc')) suffix = 'पीस';
      else if (current.includes('दर्जन') || current.includes('dozen')) suffix = 'दर्जन';
      else if (current.includes('रोल') || current.includes('roll')) suffix = 'रोल';
      else if (current.includes('गड्डी')) suffix = 'गड्डी';

      activeModalUnit = `${count} ${suffix}`;
      stepperDisplay.textContent = activeModalUnit;
    }

    document.querySelectorAll('.unit-chip').forEach(c => {
      c.classList.toggle('selected', c.textContent.trim() === activeModalUnit.trim());
    });
    updateModalConfirmBtnText();
  }

  function confirmAddOrUpdateFromModal() {
    if (!activeModalItem) return;

    const note = modalNoteInput.value.trim();
    const existingIndex = cart.findIndex(ci => ci.id === activeModalItem.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity = activeModalUnit;
      cart[existingIndex].note = note;
      showToast(`✓ ${activeModalItem.hi} अपडेट हुआ!`);
    } else {
      cart.push({
        id: activeModalItem.id,
        hi: activeModalItem.hi,
        en: activeModalItem.en,
        hinglish: activeModalItem.hinglish,
        category: activeModalItem.category,
        emoji: activeModalItem.emoji,
        quantity: activeModalUnit,
        note: note,
        timestamp: Date.now()
      });
      showToast(`🧺 ${activeModalItem.hi} थैली में जोड़ा गया!`);
    }

    saveCartToStorage();
    updateCartUI();
    closeAllModals();
    renderGroceryGrid();

    if ('vibrate' in navigator) {
      navigator.vibrate(35);
    }
  }

  // --- CUSTOM ITEM ADDER ---
  function handleAddCustomItem() {
    const name = customItemName.value.trim();
    const qty = customItemQty.value.trim() || '1 पैकेट';
    const note = customItemNote.value.trim();

    if (!name) {
      alert('कृपया सामान का नाम लिखें (Please enter item name)');
      return;
    }

    const customId = 'custom-' + Date.now();
    cart.push({
      id: customId,
      hi: name,
      en: name,
      hinglish: name,
      category: 'other',
      emoji: '🛒',
      quantity: qty,
      note: note,
      timestamp: Date.now()
    });

    saveCartToStorage();
    updateCartUI();
    closeAllModals();
    showToast(`✓ "${name}" थैली में जोड़ा गया!`);

    if (catalogView.style.display !== 'none') {
      renderGroceryGrid();
    } else {
      renderBasketView();
    }
  }

  // --- BASKET VIEW RENDERING ---
  function renderBasketView() {
    const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;

    if (cart.length === 0) {
      basketContent.innerHTML = `
        <div class="basket-empty">
          <div class="basket-empty-icon">🧺</div>
          <h3>${t.emptyBasketTitle}</h3>
          <p>${t.emptyBasketDesc}</p>
          <button id="browseGroceryBtn" style="background: var(--primary); color: white; border: none; padding: 14px 28px; border-radius: 9999px; font-size: 1.05rem; font-weight: 800; cursor: pointer; box-shadow: var(--shadow-md);">
            ${t.browseBtn}
          </button>
        </div>
      `;
      const browseGroceryBtn = document.getElementById('browseGroceryBtn');
      if (browseGroceryBtn) {
        browseGroceryBtn.addEventListener('click', () => switchTab('catalog'));
      }
      return;
    }

    let itemsHtml = '';
    cart.forEach((item, index) => {
      let titlePri = '';
      let titleSec = '';

      if (langMode === 'hi') {
        titlePri = item.hi;
      } else if (langMode === 'en') {
        titlePri = item.en;
      } else {
        titlePri = item.hi;
        titleSec = item.en;
      }

      itemsHtml += `
        <div class="basket-item-card" data-id="${item.id}">
          <div class="basket-item-emoji">${item.emoji}</div>
          <div class="basket-item-info">
            <div class="basket-item-title-pri">${index + 1}. ${escapeHtml(titlePri)}</div>
            ${titleSec ? `<div class="basket-item-title-sec">${escapeHtml(titleSec)}</div>` : ''}
            <div class="basket-item-qty-tag">मात्रा: <strong>${escapeHtml(item.quantity)}</strong></div>
            ${item.note ? `<div class="basket-item-note">📝 ${escapeHtml(item.note)}</div>` : ''}
          </div>
          <div class="basket-item-actions">
            <button class="qty-pill-btn item-minus-btn" title="कम करें" data-id="${item.id}">−</button>
            <button class="qty-pill-btn item-plus-btn" title="बढ़ाएं" data-id="${item.id}">+</button>
            <button class="item-delete-btn item-remove-btn" title="हटाएं" data-id="${item.id}">🗑️</button>
          </div>
        </div>
      `;
    });

    const formattedMessage = generateWhatsAppMessage();

    basketContent.innerHTML = `
      <div class="basket-summary-card">
        <div class="summary-left">
          <h2>${t.basketTitle} (${cart.length} ${langMode === 'en' ? 'Items' : 'सामान'})</h2>
          <p>${t.basketSubtitle}</p>
        </div>
        <button id="clearAllCartBtn" class="clear-basket-btn">
          <span>${t.clearAllBtn}</span>
        </button>
      </div>

      <div class="basket-items-list">
        ${itemsHtml}
      </div>

      <!-- Add more items quick button -->
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <button id="addMoreGroceryBtn" style="flex: 1; background: white; border: 2px solid var(--primary-light); color: var(--primary-dark); padding: 12px; border-radius: 9999px; font-weight: 800; font-size: 0.95rem; cursor: pointer;">
          + ${langMode === 'en' ? 'Add More Items' : 'और सामान जोड़ें'}
        </button>
        <button id="addMoreCustomBtn" style="flex: 1; background: white; border: 2px solid #cbd5e1; color: #475569; padding: 12px; border-radius: 9999px; font-weight: 700; font-size: 0.95rem; cursor: pointer;">
          + ${langMode === 'en' ? 'Custom Item' : 'अलग सामान'}
        </button>
      </div>

      <!-- Big WhatsApp Sharing Action -->
      <div class="basket-share-action-box">
        <div class="share-action-title">📲 ${langMode === 'en' ? 'Send to WhatsApp' : 'सीधे WhatsApp पर भेजें'}</div>
        <div class="share-action-subtitle">
          ${settings.recipientPhone ? `Number: <strong>${settings.recipientPhone}</strong>` : (langMode === 'en' ? 'One click opens WhatsApp with formatted list' : 'एक क्लिक में पूरी लिस्ट WhatsApp चैट में खुल जाएगी')}
        </div>
        
        <button id="sendWhatsAppMainBtn" class="share-whatsapp-btn">
          <span style="font-size: 1.4rem;">💬</span>
          <span>${t.sendWhatsAppBtn}</span>
        </button>

        <div class="secondary-share-actions">
          <button id="copyListBtn" class="secondary-share-btn">
            <span>${t.copyListBtn}</span>
          </button>
          <button id="changeRecipientBtn" class="secondary-share-btn">
            <span>${t.changeRecipientBtn}</span>
          </button>
        </div>

        <!-- WhatsApp Message Preview -->
        <div style="margin-top: 16px; background: rgba(0, 0, 0, 0.22); border-radius: 12px; padding: 12px; text-align: left;">
          <p style="font-size: 0.75rem; text-transform: uppercase; letter-spacing: 1px; color: #a7f3d0; font-weight: 800; margin-bottom: 6px;">
            ${t.previewTitle}
          </p>
          <pre class="selectable-text" style="white-space: pre-wrap; font-family: inherit; font-size: 0.85rem; line-height: 1.4; color: #f0fdf4;">${escapeHtml(formattedMessage)}</pre>
        </div>
      </div>
    `;

    // Bindings
    document.getElementById('clearAllCartBtn').addEventListener('click', handleClearAllCart);
    document.getElementById('addMoreGroceryBtn').addEventListener('click', () => switchTab('catalog'));
    document.getElementById('addMoreCustomBtn').addEventListener('click', () => {
      customItemName.value = '';
      customItemQty.value = '1 पैकेट';
      customItemNote.value = '';
      customItemModal.classList.add('active');
    });
    document.getElementById('sendWhatsAppMainBtn').addEventListener('click', shareToWhatsApp);
    document.getElementById('copyListBtn').addEventListener('click', copyListToClipboard);
    document.getElementById('changeRecipientBtn').addEventListener('click', () => {
      recipientPhoneInput.value = settings.recipientPhone || '';
      senderNameInput.value = settings.senderName || 'मम्मी';
      settingsModal.classList.add('active');
    });

    // Steppers
    document.querySelectorAll('.item-plus-btn').forEach(btn => {
      btn.addEventListener('click', () => modifyItemQuantity(btn.getAttribute('data-id'), 1));
    });
    document.querySelectorAll('.item-minus-btn').forEach(btn => {
      btn.addEventListener('click', () => modifyItemQuantity(btn.getAttribute('data-id'), -1));
    });
    document.querySelectorAll('.item-remove-btn').forEach(btn => {
      btn.addEventListener('click', () => removeItemFromCart(btn.getAttribute('data-id')));
    });
  }

  function modifyItemQuantity(id, delta) {
    const item = cart.find(i => i.id === id);
    if (!item) return;

    const current = item.quantity;
    if (current.includes('g') || current.includes('kg')) {
      const matchKg = current.match(/([\d\.]+)\s*kg/i);
      const matchG = current.match(/(\d+)\s*g/i);
      let grams = 500;

      if (matchKg) grams = parseFloat(matchKg[1]) * 1000;
      else if (matchG) grams = parseInt(matchG[1], 10);

      if (delta > 0) {
        if (grams < 1000) grams += 250;
        else if (grams < 5000) grams += 500;
        else grams += 1000;
      } else {
        if (grams > 5000) grams -= 1000;
        else if (grams > 1000) grams -= 500;
        else if (grams > 250) grams -= 250;
        else if (grams > 100) grams -= 50;
      }

      if (grams >= 1000) {
        const kgVal = grams / 1000;
        item.quantity = `${Number.isInteger(kgVal) ? kgVal : kgVal.toFixed(1)} kg`;
      } else {
        item.quantity = `${grams} g`;
      }
    } else {
      const matchNum = current.match(/\d+/);
      let count = matchNum ? parseInt(matchNum[0], 10) : 1;
      count += delta;
      if (count < 1) count = 1;

      let suffix = 'पैकेट';
      if (current.includes('टिकिया')) suffix = 'टिकिया';
      else if (current.includes('बोतल')) suffix = 'बोतल';
      else if (current.includes('पीस')) suffix = 'पीस';
      else if (current.includes('दर्जन')) suffix = 'दर्जन';
      else if (current.includes('Litre') || current.includes('L')) suffix = 'Litre';

      item.quantity = `${count} ${suffix}`;
    }

    saveCartToStorage();
    updateCartUI();
    renderBasketView();
  }

  function removeItemFromCart(id) {
    const item = cart.find(i => i.id === id);
    cart = cart.filter(i => i.id !== id);
    saveCartToStorage();
    updateCartUI();
    renderBasketView();
    showToast(`🗑️ ${item ? item.hi : 'सामान'} हटा दिया गया`);
  }

  function handleClearAllCart() {
    const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;
    if (confirm(t.clearAllConfirm)) {
      cart = [];
      saveCartToStorage();
      updateCartUI();
      renderBasketView();
      showToast('थैली खाली कर दी गई');
    }
  }

  // --- WHATSAPP MESSAGE FORMATTING ---
  function generateWhatsAppMessage() {
    const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;
    const now = new Date();
    const dateStr = now.toLocaleDateString(langMode === 'en' ? 'en-IN' : 'hi-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    const timeStr = now.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit'
    });

    const sender = settings.senderName ? settings.senderName : (langMode === 'en' ? 'Mom' : 'मम्मी');

    let msgHeader = t.msgHeader;
    if (currentProfile === 'sabzi_fruits') {
      msgHeader = langMode === 'hi' ? '🥦🍎 *मम्मी की ताज़ा सब्जी व फल लिस्ट*' : (langMode === 'en' ? '🥦🍎 *Fresh Veggies & Fruits Shopping List*' : '🥦🍎 *घर की सब्जी व फल लिस्ट (Sabzi & Fruits List)*');
    } else if (currentProfile === 'grocery') {
      msgHeader = langMode === 'hi' ? '🏬 *मम्मी की किराना व राशन लिस्ट (DMart / Kirana)*' : (langMode === 'en' ? '🏬 *DMart Grocery & Ration List*' : '🏬 *किराना व राशन लिस्ट (DMart / Grocery List)*');
    } else {
      msgHeader = t.msgHeader;
    }

    let msg = `${msgHeader}\n`;
    msg += `${t.msgDate} ${dateStr}, ${timeStr}\n`;
    msg += `${t.msgSender} *${sender}*\n`;
    msg += `────────────────────\n`;

    cart.forEach((item, index) => {
      const num = index + 1;
      const emoji = item.emoji || '🛒';
      let displayName = '';

      if (langMode === 'hi') {
        displayName = item.hi;
      } else if (langMode === 'en') {
        displayName = item.en;
      } else {
        displayName = item.hi === item.en ? item.hi : `${item.hi} / ${item.en}`;
      }

      msg += `${num}. ${emoji} *${displayName}* — ${item.quantity}\n`;
      if (item.note) {
        msg += `    ↳ _(${langMode === 'en' ? 'Note' : 'नोट'}: ${item.note})_\n`;
      }
    });

    msg += `────────────────────\n`;
    msg += `${t.msgTotal} ${cart.length}*\n\n`;
    msg += `${t.msgFooter}`;

    return msg;
  }

  function shareToWhatsApp() {
    if (cart.length === 0) {
      alert('कृपया पहले थैली में सामान जोड़ें! (Please add items first)');
      return;
    }

    const message = generateWhatsAppMessage();
    let phone = (settings.recipientPhone || '').trim();

    let cleanPhone = phone.replace(/[^\d+]/g, '');
    if (cleanPhone.startsWith('+')) cleanPhone = cleanPhone.substring(1);
    if (cleanPhone.length === 10) cleanPhone = '91' + cleanPhone;

    let whatsappUrl = cleanPhone
      ? `https://api.whatsapp.com/send?phone=${cleanPhone}&text=${encodeURIComponent(message)}`
      : `https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`;

    if (!cleanPhone && navigator.share && /Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
      navigator.share({
        title: 'घर का किराना लिस्ट',
        text: message
      }).catch(() => {
        window.open(whatsappUrl, '_blank');
      });
    } else {
      window.open(whatsappUrl, '_blank');
    }

    showToast('📲 WhatsApp खुल रहा है...');
  }

  function copyListToClipboard() {
    if (cart.length === 0) return;
    const message = generateWhatsAppMessage();
    navigator.clipboard.writeText(message)
      .then(() => showToast('📋 पूरी लिस्ट कॉपी हो गई!'))
      .catch(() => alert('कॉपी नहीं हो सका, कृपया मैन्युअली कॉपी करें।'));
  }

  // --- SETTINGS ---
  function handleSaveSettings() {
    const phone = recipientPhoneInput.value.trim();
    const name = senderNameInput.value.trim() || 'मम्मी';

    settings.recipientPhone = phone;
    settings.senderName = name;
    saveSettingsToStorage();
    closeAllModals();
    showToast('💾 नंबर व सेटिंग्स सुरक्षित हो गईं!');

    if (basketView.style.display !== 'none') {
      renderBasketView();
    }
  }

  // --- VOICE SEARCH ---
  function handleVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert('आपके डिवाइस में Voice Search उपलब्ध नहीं है। कृपया टाइप करके खोजें।');
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = langMode === 'en' ? 'en-IN' : 'hi-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      voiceSearchBtn.classList.add('listening');
      const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;
      showToast(t.voiceListening);

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        searchInput.value = transcript;
        searchQuery = transcript.trim().toLowerCase();
        clearSearchBtn.style.display = 'flex';
        renderGroceryGrid();
        showToast(`🔍: "${transcript}"`);
      };

      recognition.onerror = (event) => {
        console.warn('Voice error:', event.error);
        voiceSearchBtn.classList.remove('listening');
        if (event.error !== 'no-speech') {
          showToast(t.voiceNotFound);
        }
      };

      recognition.onend = () => voiceSearchBtn.classList.remove('listening');
      recognition.start();
    } catch (e) {
      console.error('Voice search failed:', e);
      voiceSearchBtn.classList.remove('listening');
    }
  }

  // --- TABS & UI HELPERS ---
  function switchTab(target) {
    if (target === 'catalog') {
      tabCatalogBtn.classList.add('active');
      tabCatalogBtn.setAttribute('aria-selected', 'true');
      tabBasketBtn.classList.remove('active');
      tabBasketBtn.setAttribute('aria-selected', 'false');
      catalogView.style.display = 'block';
      basketView.style.display = 'none';
      renderGroceryGrid();
      updateFloatingBar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      tabBasketBtn.classList.add('active');
      tabBasketBtn.setAttribute('aria-selected', 'true');
      tabCatalogBtn.classList.remove('active');
      tabCatalogBtn.setAttribute('aria-selected', 'false');
      catalogView.style.display = 'none';
      basketView.style.display = 'block';
      floatingBottomBar.style.display = 'none';
      renderBasketView();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  function updateCartUI() {
    const count = cart.length;
    if (count > 0) {
      tabBasketBadge.textContent = count;
      tabBasketBadge.style.display = 'inline-block';
    } else {
      tabBasketBadge.style.display = 'none';
    }
    updateFloatingBar();
  }

  function updateFloatingBar() {
    const count = cart.length;
    const t = UI_TRANSLATIONS[langMode] || UI_TRANSLATIONS.both;

    if (count > 0 && catalogView.style.display !== 'none') {
      floatingBottomBar.style.display = 'flex';
      floatingItemCountBadge.textContent = count;
      floatingTitleText.textContent = t.floatingTitle.replace('{count}', count);
      floatingSubtitleText.textContent = t.floatingSub;
    } else {
      floatingBottomBar.style.display = 'none';
    }
  }

  function closeAllModals() {
    qtyModal.classList.remove('active');
    customItemModal.classList.remove('active');
    settingsModal.classList.remove('active');
    helpModal.classList.remove('active');
  }

  function showToast(text, icon = '✅') {
    toastText.textContent = text;
    toastIcon.textContent = icon;
    toastMsg.classList.add('show');
    setTimeout(() => toastMsg.classList.remove('show'), 2400);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --- EVENTS ---
  function bindEvents() {
    // 3-way Language switcher
    langBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const mode = btn.getAttribute('data-lang');
        applyLanguageMode(mode);
      });
    });

    // Profile Switcher (All vs Sabzi-Fruits vs Grocery)
    const profileBtns = document.querySelectorAll('.profile-tab-btn');
    profileBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const profile = btn.getAttribute('data-profile');
        applyProfileMode(profile, true);
      });
    });

    // Navigation Tabs
    tabCatalogBtn.addEventListener('click', () => switchTab('catalog'));
    tabBasketBtn.addEventListener('click', () => switchTab('basket'));
    floatingBasketClick.addEventListener('click', () => switchTab('basket'));

    // Search
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim().toLowerCase();
      clearSearchBtn.style.display = searchQuery ? 'flex' : 'none';
      renderGroceryGrid();
    });

    clearSearchBtn.addEventListener('click', () => {
      searchInput.value = '';
      searchQuery = '';
      clearSearchBtn.style.display = 'none';
      renderGroceryGrid();
      searchInput.focus();
    });

    // Voice search
    voiceSearchBtn.addEventListener('click', handleVoiceSearch);

    // Quantity Modal
    modalCloseBtn.addEventListener('click', closeAllModals);
    qtyModal.addEventListener('click', (e) => {
      if (e.target === qtyModal) closeAllModals();
    });
    stepperMinusBtn.addEventListener('click', () => adjustStepper(-1));
    stepperPlusBtn.addEventListener('click', () => adjustStepper(1));
    modalAddConfirmBtn.addEventListener('click', confirmAddOrUpdateFromModal);

    // Custom Item Modal
    openCustomItemBtn.addEventListener('click', () => {
      customItemName.value = '';
      customItemQty.value = '1 पैकेट';
      customItemNote.value = '';
      customItemModal.classList.add('active');
      setTimeout(() => customItemName.focus(), 200);
    });
    customItemCloseBtn.addEventListener('click', closeAllModals);
    customItemModal.addEventListener('click', (e) => {
      if (e.target === customItemModal) closeAllModals();
    });
    customItemAddBtn.addEventListener('click', handleAddCustomItem);

    // Settings Modal
    settingsBtn.addEventListener('click', () => {
      recipientPhoneInput.value = settings.recipientPhone || '';
      senderNameInput.value = settings.senderName || 'मम्मी';
      settingsModal.classList.add('active');
    });
    closeSettingsBtn.addEventListener('click', closeAllModals);
    settingsModal.addEventListener('click', (e) => {
      if (e.target === settingsModal) closeAllModals();
    });
    saveSettingsBtn.addEventListener('click', handleSaveSettings);

    // Help Modal
    helpBtn.addEventListener('click', () => helpModal.classList.add('active'));
    closeHelpBtn.addEventListener('click', closeAllModals);
    helpModal.addEventListener('click', (e) => {
      if (e.target === helpModal) closeAllModals();
    });

    // Floating WhatsApp Share
    floatingShareWhatsAppBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      shareToWhatsApp();
    });
  }

  // --- SERVICE WORKER ---
  function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
          .then(reg => console.log('ServiceWorker registered:', reg.scope))
          .catch(err => console.log('ServiceWorker not registered:', err));
      });
    }
  }

  document.addEventListener('DOMContentLoaded', init);
})();
