// ==================== GLOBAL VARIABLES & DATA ====================
let cart = [];
let currentUser = null;
let appliedDiscount = 0; // percentage e.g. 0.10 for 10%
let activeCategory = 'all';
let searchQuery = '';

// Sample Electronics & Power Module Catalog
const PRODUCTS_DATA = [
    {
        id: 'p1',
        name: 'DC/DC Isolated Converter (MORNSUN B0505S)',
        category: 'dcdc',
        price: 45.00,
        icon: '🔌',
        badge: 'Best Seller',
        rating: 4.9,
        reviewsCount: 128,
        description: '5V to 5V 1W Isolated DC-DC converter module with 1.5kVDC isolation voltage. Ideal for industrial communication interfaces and noise isolation.',
        specs: {
            'Input Voltage': '4.5 - 5.5 VDC',
            'Output Voltage': '5 VDC',
            'Max Power': '1W',
            'Efficiency': '82%',
            'Isolation': '1500 VDC',
            'Operating Temp': '-40°C to +85°C'
        }
    },
    {
        id: 'p2',
        name: 'Non-Isolated Buck Converter (K7805-1000R3)',
        category: 'dcdc',
        price: 25.00,
        icon: '⚡',
        badge: 'High Efficiency',
        rating: 4.8,
        reviewsCount: 94,
        description: 'High efficiency pin-compatible replacement of LM78xx linear regulators. Delivers up to 96% efficiency with ultra-low thermal dissipation.',
        specs: {
            'Input Voltage': '6.5 - 36 VDC',
            'Output Voltage': '5 VDC @ 1A',
            'Max Power': '5W',
            'Efficiency': '96%',
            'Isolation': 'Non-Isolated',
            'Package': 'SIP-3 Standard'
        }
    },
    {
        id: 'p3',
        name: 'AC/DC Enclosed Power Supply (LM50-10B12)',
        category: 'acdc',
        price: 65.00,
        icon: '🔋',
        badge: 'Industrial Grade',
        rating: 4.9,
        reviewsCount: 76,
        description: '50W 12V 4.2A Industrial AC/DC power supply featuring universal AC input range, short circuit and overvoltage protections.',
        specs: {
            'Input Voltage': '85 - 264 VAC / 120 - 370 VDC',
            'Output Voltage': '12 VDC @ 4.17A',
            'Rated Power': '50W',
            'Efficiency': '86%',
            'Safety Rating': 'UL/EN62368-1 Certified',
            'Dimensions': '99 x 82 x 30 mm'
        }
    },
    {
        id: 'p4',
        name: 'Analog I/O Signal Module (ISOL-420MA)',
        category: 'io',
        price: 35.00,
        icon: '📊',
        badge: 'Precision',
        rating: 4.7,
        reviewsCount: 52,
        description: 'Precision 4-20mA current loop signal isolator and transmitter module for PLC and SCADA industrial automation systems.',
        specs: {
            'Input Signal': '4-20mA / 0-10V',
            'Output Signal': '4-20mA Isolated',
            'Accuracy': '±0.1% F.S.',
            'Response Time': '< 2ms',
            'Power Supply': '24V DC',
            'Mounting': 'DIN Rail / PCB'
        }
    },
    {
        id: 'p5',
        name: 'Signal Conditioning Module (SCM-RTD100)',
        category: 'signal',
        price: 40.00,
        icon: '🎛️',
        badge: 'New',
        rating: 4.9,
        reviewsCount: 31,
        description: 'Pt100 RTD temperature sensor signal conditioner converting RTD resistance into linear 0-5V / 4-20mA output.',
        specs: {
            'Sensor Type': 'Pt100 / Pt1000 3-Wire',
            'Temp Range': '-50°C to +200°C',
            'Linearity Error': '0.05%',
            'Isolation Voltage': '2000 VAC',
            'Enclosure': 'IP20 Shielded'
        }
    },
    {
        id: 'p6',
        name: 'Heavy Duty DIN Rail Power Unit (LI120-20B24)',
        category: 'industrial',
        price: 95.00,
        icon: '🛡️',
        badge: 'Heavy Duty',
        rating: 5.0,
        reviewsCount: 68,
        description: '120W 24V 5A DIN-rail industrial power supply with active PFC, ultra-slim metal casing, and 150% peak load capacity.',
        specs: {
            'Input Voltage': '90 - 264 VAC',
            'Output Voltage': '24 VDC @ 5A',
            'Power Output': '120W Peak 180W',
            'Efficiency': '89%',
            'MTBF': '> 300,000 Hours',
            'PFC Factor': '> 0.95'
        }
    },
    {
        id: 'p7',
        name: 'High Voltage DC-DC Converter (HVD-1000V)',
        category: 'dcdc',
        price: 110.00,
        icon: '⚡',
        badge: 'Specialized',
        rating: 4.8,
        reviewsCount: 19,
        description: 'Ultra-wide 4:1 input high voltage DC-DC module providing up to 1000V DC low ripple output for photomultipliers and sensors.',
        specs: {
            'Input Voltage': '18 - 36 VDC',
            'Output Voltage': '0 - 1000 VDC Adjustable',
            'Ripple': '< 10mV p-p',
            'Power': '3W',
            'Stability': '0.01% / hour'
        }
    },
    {
        id: 'p8',
        name: 'Dual Output Isolated Module (A0512D-1W)',
        category: 'dcdc',
        price: 32.00,
        icon: '🔌',
        badge: 'Dual Output',
        rating: 4.7,
        reviewsCount: 44,
        description: '5V Input to ±12V Dual Output isolated DC-DC converter module for op-amp dual rail power generation.',
        specs: {
            'Input': '5 VDC',
            'Output': '±12 VDC @ 42mA',
            'Isolation': '3000 VDC',
            'Efficiency': '80%'
        }
    },
    {
        id: 'p9',
        name: 'MORNSUN Power Module (URB2412D-60WHR3)',
        category: 'industrial',
        price: 85.00,
        icon: '⚙️',
        badge: 'Featured',
        rating: 4.9,
        reviewsCount: 156,
        image: '/altrotech/images/products/photo_png_1.jpeg',
        description: 'MORNSUN URB2412LD-60WHR3 industrial power module with a rugged heatsink design for dependable power conversion in demanding equipment.',
        specs: {
            'Model': 'URB2412LD-60WHR3',
            'Product Type': 'Industrial DC/DC power module',
            'Certifications': 'CE / UKCA'
        }
    },
    {
        id: 'p10',
        name: 'MORNSUN Converter Module',
        category: 'dcdc',
        price: 72.00,
        icon: '⚡',
        badge: 'Premium',
        rating: 4.8,
        reviewsCount: 89,
        image: '/altrotech/images/products/photo_png_2.jpeg',
        description: 'MORNSUN converter module photographed from the side to show its compact, finned housing and through-hole connection pins.',
        specs: {
            'Product Type': 'DC/DC converter module',
            'Construction': 'Finned thermal housing',
            'Certifications': 'CE / UKCA'
        }
    },
    {
        id: 'p11',
        name: 'MORNSUN Isolated Unit',
        category: 'industrial',
        price: 78.00,
        icon: '🔧',
        badge: 'Industrial',
        rating: 4.9,
        reviewsCount: 142,
        image: '/altrotech/images/products/photo_png_3.jpeg',
        description: 'MORNSUN isolated unit with a low-profile enclosure and accessible pins for integration into industrial control and power systems.',
        specs: {
            'Product Type': 'Isolated DC/DC unit',
            'Design': 'Low-profile enclosed module',
            'Application': 'Industrial control and power systems'
        }
    }
];

// ==================== AUTH (localStorage-based) ====================
function getUsers() {
    try {
        return JSON.parse(localStorage.getItem('altrotech_users')) || [];
    } catch (e) {
        return [];
    }
}

function saveUsers(users) {
    localStorage.setItem('altrotech_users', JSON.stringify(users));
}

function openAuthModal() {
    document.getElementById('authModal').style.display = 'block';
    document.getElementById('userDropdown').classList.remove('open');
}

function closeAuthModal() {
    document.getElementById('authModal').style.display = 'none';
}

function switchAuthTab(tab) {
    const tabs = document.querySelectorAll('.auth-tab');
    const forms = document.querySelectorAll('.auth-form');
    tabs.forEach(t => t.classList.remove('active'));
    forms.forEach(f => f.classList.remove('active'));
    if (tab === 'login') {
        if (tabs[0]) tabs[0].classList.add('active');
        const loginForm = document.getElementById('loginForm');
        if (loginForm) loginForm.classList.add('active');
    } else {
        if (tabs[1]) tabs[1].classList.add('active');
        const signupForm = document.getElementById('signupForm');
        if (signupForm) signupForm.classList.add('active');
    }
}

function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('loginEmail').value.trim();
    const password = document.getElementById('loginPassword').value;

    const users = getUsers();
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase());

    if (!user) {
        showNotification('No account found with this email. Please sign up.', 'error');
        return;
    }
    if (user.password !== password) {
        showNotification('Incorrect password. Please try again.', 'error');
        return;
    }

    currentUser = user;
    localStorage.setItem('altrotech_user', JSON.stringify(user));
    updateUserUI();
    closeAuthModal();
    showNotification('Welcome back, ' + user.name + '!', 'success');
}

function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById('signupName').value.trim();
    const email = document.getElementById('signupEmail').value.trim();
    const phone = document.getElementById('signupPhone').value.trim();
    const password = document.getElementById('signupPassword').value;
    const confirmPassword = document.getElementById('signupConfirmPassword').value;

    if (password !== confirmPassword) {
        showNotification('Passwords do not match.', 'error');
        return;
    }

    const users = getUsers();
    if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
        showNotification('An account with this email already exists.', 'error');
        return;
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        phone: phone || 'Not provided',
        password,
        joinDate: new Date().toLocaleDateString()
    };

    users.push(newUser);
    saveUsers(users);
    currentUser = newUser;
    localStorage.setItem('altrotech_user', JSON.stringify(newUser));
    updateUserUI();
    closeAuthModal();
    showNotification('Account created successfully! Welcome, ' + name + '!', 'success');
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        currentUser = null;
        localStorage.removeItem('altrotech_user');
        updateUserUI();
        showNotification('You have been logged out');
    }
}

function updateUserUI() {
    const userProfileInfo = document.getElementById('userProfileInfo');
    const authOptions = document.getElementById('authOptions');
    const userOptions = document.getElementById('userOptions');

    if (currentUser) {
        if (document.getElementById('userName')) document.getElementById('userName').textContent = currentUser.name;
        if (document.getElementById('userEmail')) document.getElementById('userEmail').textContent = currentUser.email;
        if (userProfileInfo) userProfileInfo.style.display = 'block';
        if (authOptions) authOptions.style.display = 'none';
        if (userOptions) userOptions.style.display = 'block';
    } else {
        if (userProfileInfo) userProfileInfo.style.display = 'none';
        if (authOptions) authOptions.style.display = 'block';
        if (userOptions) userOptions.style.display = 'none';
    }
}

function toggleUserDropdown() {
    const dropdown = document.getElementById('userDropdown');
    if (dropdown) dropdown.classList.toggle('open');
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) cartSidebar.classList.remove('open');
}

function goToAccount() {
    if (currentUser) {
        alert('👤 Account Profile:\n\nName: ' + currentUser.name + '\nEmail: ' + currentUser.email + '\nPhone: ' + currentUser.phone + '\nMember Since: ' + currentUser.joinDate);
    }
}

function goToOrders() {
    if (!currentUser) {
        showNotification('Please sign in to view your orders', 'error');
        openAuthModal();
        return;
    }
    showOrdersModal();
}

// ==================== THEME (Light/Dark) ====================
function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('altrotech_theme', newTheme);
    updateThemeIcon();
}

function initTheme() {
    const savedTheme = localStorage.getItem('altrotech_theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
        const theme = document.documentElement.getAttribute('data-theme');
        toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
    }
}

// ==================== PAGE NAVIGATION ====================
function showPage(pageId) {
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));

    const selectedPage = document.getElementById(pageId);
    if (selectedPage) {
        selectedPage.classList.add('active');
    }

    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    if (window.event && window.event.target && window.event.target.classList.contains('nav-link')) {
        window.event.target.classList.add('active');
    }

    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) cartSidebar.classList.remove('open');
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) userDropdown.classList.remove('open');

    window.scrollTo(0, 0);
}

// ==================== CART FUNCTIONS ====================
function loadCart() {
    try {
        cart = JSON.parse(localStorage.getItem('altrotech_cart')) || [];
    } catch (e) {
        cart = [];
    }
}

function saveCart() {
    localStorage.setItem('altrotech_cart', JSON.stringify(cart));
}

function toggleCart() {
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) cartSidebar.classList.toggle('open');
    const userDropdown = document.getElementById('userDropdown');
    if (userDropdown) userDropdown.classList.remove('open');
}

function addToCart(productId, name, price, icon) {
    // Check if productId string vs legacy arguments
    let targetProduct = PRODUCTS_DATA.find(p => p.id === productId || p.name === productId);
    
    const itemPrice = targetProduct ? targetProduct.price : parseFloat(price || 0);
    const itemName = targetProduct ? targetProduct.name : productId;
    const itemIcon = targetProduct ? targetProduct.icon : (icon || '⚡');
    const pId = targetProduct ? targetProduct.id : 'custom_' + Date.now();

    const existingIndex = cart.findIndex(item => item.productId === pId);
    if (existingIndex > -1) {
        cart[existingIndex].quantity += 1;
    } else {
        cart.push({
            id: Date.now(),
            productId: pId,
            name: itemName,
            price: itemPrice,
            icon: itemIcon,
            quantity: 1
        });
    }

    saveCart();
    updateCartUI();
    showNotification(`Added ${itemName} to cart!`, 'success');
    const cartSidebar = document.getElementById('cartSidebar');
    if (cartSidebar) cartSidebar.classList.add('open');
}

function updateCartQuantity(cartItemId, delta) {
    const itemIndex = cart.findIndex(item => item.id === cartItemId);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += delta;
        if (cart[itemIndex].quantity <= 0) {
            cart.splice(itemIndex, 1);
        }
        saveCart();
        updateCartUI();
    }
}

function removeFromCart(cartItemId) {
    cart = cart.filter(item => item.id !== cartItemId);
    saveCart();
    updateCartUI();
}

function applyPromoCode() {
    const codeInput = document.getElementById('promoCodeInput');
    if (!codeInput) return;
    const code = codeInput.value.trim().toUpperCase();

    if (code === 'ALTRO10') {
        appliedDiscount = 0.10;
        showNotification('🎉 Promo code ALTRO10 applied: 10% discount!', 'success');
    } else if (code === 'WELCOME20') {
        appliedDiscount = 0.20;
        showNotification('🎉 Promo code WELCOME20 applied: 20% discount!', 'success');
    } else if (code === '') {
        showNotification('Please enter a promo code', 'info');
    } else {
        showNotification('Invalid promo code. Try ALTRO10 or WELCOME20', 'error');
    }
    updateCartUI();
}

function calculateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const discountAmount = subtotal * appliedDiscount;
    const taxableAmount = subtotal - discountAmount;
    const tax = taxableAmount * 0.18; // 18% GST / Sales Tax
    const total = taxableAmount + tax;

    return {
        subtotal: parseFloat(subtotal.toFixed(2)),
        discountAmount: parseFloat(discountAmount.toFixed(2)),
        tax: parseFloat(tax.toFixed(2)),
        total: parseFloat(total.toFixed(2)),
        itemCount: cart.reduce((sum, item) => sum + item.quantity, 0)
    };
}

function updateCartUI() {
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const cartFooter = document.getElementById('cartFooter');
    const totalPriceEl = document.getElementById('cartTotalPrice');

    if (!cartItemsContainer) return;

    const totals = calculateCartTotals();

    if (!cart || cart.length === 0) {
        cartItemsContainer.innerHTML = '<div class="cart-empty">Your cart is empty</div>';
        if (cartCount) cartCount.style.display = 'none';
        if (cartFooter) cartFooter.style.display = 'none';
    } else {
        cartItemsContainer.innerHTML = cart.map((item) => `
            <div class="cart-item">
                <div style="font-size: 24px; margin-right: 12px;">${item.icon || '⚡'}</div>
                <div class="cart-item-info" style="flex: 1;">
                    <h4>${item.name}</h4>
                    <div class="cart-item-price">$${parseFloat(item.price).toFixed(2)}</div>
                    <div class="cart-item-qty">
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, -1)">-</button>
                        <span class="qty-num">${item.quantity}</span>
                        <button class="qty-btn" onclick="updateCartQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="cart-item-remove" onclick="removeFromCart(${item.id})" title="Remove item">&times;</button>
            </div>
        `).join('') + `
            <div class="promo-box">
                <input type="text" id="promoCodeInput" placeholder="Promo Code (ALTRO10)" value="${appliedDiscount > 0 ? (appliedDiscount === 0.1 ? 'ALTRO10' : 'WELCOME20') : ''}">
                <button onclick="applyPromoCode()">Apply</button>
            </div>
            ${appliedDiscount > 0 ? `<div class="promo-discount-tag"><span>Discount (${appliedDiscount * 100}%):</span> <span>-$${totals.discountAmount.toFixed(2)}</span></div>` : ''}
            <div style="font-size: 13px; color: var(--text-light); margin-top: 10px; display: flex; justify-content: space-between;">
                <span>Est. Tax (18%):</span> <span>+$${totals.tax.toFixed(2)}</span>
            </div>
        `;

        if (totalPriceEl) totalPriceEl.textContent = '$' + totals.total.toFixed(2);
        if (cartCount) {
            cartCount.textContent = totals.itemCount;
            cartCount.style.display = 'flex';
        }
        if (cartFooter) cartFooter.style.display = 'block';
    }
}

function proceedToCheckout() {
    if (!currentUser) {
        showNotification('Please sign in first to proceed to checkout', 'error');
        openAuthModal();
        return;
    }
    if (!cart || cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }
    openPaymentCheckoutModal();
}

// ==================== CHECKOUT & PAYMENT MODAL ====================
function openPaymentCheckoutModal() {
    const totals = calculateCartTotals();
    
    let existingModal = document.getElementById('checkoutModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'checkoutModal';
    modal.style.display = 'block';

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <span class="close-btn" onclick="document.getElementById('checkoutModal').remove()">&times;</span>
            <h2 style="text-align: center; color: var(--royal-gold); margin-bottom: 20px;">⚡ Checkout & Payment</h2>
            
            <div style="background: var(--widget-bg); padding: 15px; border-radius: 8px; margin-bottom: 20px; border: 1px solid var(--border-color);">
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; font-weight: 600;">
                    <span>Order Subtotal (${totals.itemCount} items):</span>
                    <span>$${totals.subtotal.toFixed(2)}</span>
                </div>
                ${totals.discountAmount > 0 ? `
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: var(--success-color);">
                    <span>Discount:</span>
                    <span>-$${totals.discountAmount.toFixed(2)}</span>
                </div>` : ''}
                <div style="display: flex; justify-content: space-between; margin-bottom: 6px; color: var(--text-light); font-size: 14px;">
                    <span>Tax (18% GST):</span>
                    <span>+$${totals.tax.toFixed(2)}</span>
                </div>
                <div style="display: flex; justify-content: space-between; margin-top: 10px; padding-top: 10px; border-top: 1px solid var(--border-color); font-size: 18px; font-weight: bold; color: var(--royal-gold);">
                    <span>Total Amount Payable:</span>
                    <span>$${totals.total.toFixed(2)}</span>
                </div>
            </div>

            <div style="margin-bottom: 20px;">
                <h3 style="font-size: 16px; margin-bottom: 12px; color: var(--text-dark);">1. Delivery Shipping Address</h3>
                <div class="form-group">
                    <label>Full Name</label>
                    <input type="text" id="coShippingName" value="${currentUser ? currentUser.name : ''}" required>
                </div>
                <div class="form-group">
                    <label>Shipping Address</label>
                    <input type="text" id="coShippingAddress" placeholder="123 Tech Avenue, Suite 400, Industrial Park" required>
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" id="coShippingCity" placeholder="Jaipur" required>
                    </div>
                    <div class="form-group">
                        <label>Postal Code</label>
                        <input type="text" id="coShippingZip" placeholder="302022" required>
                    </div>
                </div>
            </div>

            <div style="margin-bottom: 25px;">
                <h3 style="font-size: 16px; margin-bottom: 12px; color: var(--text-dark);">2. Select Payment Method</h3>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); gap: 10px; margin-bottom: 15px;">
                    <button class="cat-btn active" id="payTabCard" onclick="switchCheckoutPayTab('card')">💳 Credit Card</button>
                    <button class="cat-btn" id="payTabUPI" onclick="switchCheckoutPayTab('upi')">📱 UPI / QR Code</button>
                    <button class="cat-btn" id="payTabBank" onclick="switchCheckoutPayTab('bank')">🏦 Net Banking</button>
                    <button class="cat-btn" id="payTabCOD" onclick="switchCheckoutPayTab('cod')">💵 Pay on Delivery</button>
                </div>

                <div id="checkoutPayFormContainer">
                    <!-- Card Form Default -->
                    <div id="checkoutCardForm">
                        <div class="form-group">
                            <label>Name on Card</label>
                            <input type="text" id="coCardName" value="${currentUser ? currentUser.name : ''}">
                        </div>
                        <div class="form-group">
                            <label>Card Number</label>
                            <input type="text" id="coCardNumber" placeholder="4111 2222 3333 4444" maxlength="19">
                        </div>
                        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px;">
                            <div class="form-group">
                                <label>Expiry Date</label>
                                <input type="text" id="coCardExpiry" placeholder="MM/YY" maxlength="5">
                            </div>
                            <div class="form-group">
                                <label>CVV</label>
                                <input type="password" id="coCardCVV" placeholder="123" maxlength="3">
                            </div>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="processFinalCheckout('Credit Card')">Pay $${totals.total.toFixed(2)} Securely</button>
                    </div>

                    <div id="checkoutUPIForm" style="display: none; text-align: center;">
                        <p style="color: var(--text-light); margin-bottom: 10px;">Scan QR Code using Google Pay, PhonePe, Paytm or BHIM UPI</p>
                        <div class="qr-placeholder">
                            <svg viewBox="0 0 100 100" width="120" height="120">
                                <path d="M0,0 h30 v30 h-30 z M40,0 h20 v20 h-20 z M70,0 h30 v30 h-30 z M10,10 h10 v10 h-10 z M80,10 h10 v10 h-10 z M0,40 h20 v20 h-20 z M30,40 h40 v10 h-40 z M0,70 h30 v30 h-30 z M40,70 h30 v10 h-30 z M80,70 h20 v30 h-20 z M10,80 h10 v10 h-10 z" fill="var(--royal-gold)"/>
                            </svg>
                        </div>
                        <div class="form-group" style="margin-top: 15px;">
                            <label>Or enter UPI ID</label>
                            <input type="text" id="coUPIId" placeholder="yourname@upi" style="text-align: center;">
                        </div>
                        <button class="btn btn-primary" style="width: 100%;" onclick="processFinalCheckout('UPI / QR Code')">Verify & Pay $${totals.total.toFixed(2)}</button>
                    </div>

                    <div id="checkoutBankForm" style="display: none;">
                        <div class="form-group">
                            <label>Select Your Bank</label>
                            <select id="coBankSelect" style="width: 100%; padding: 12px; border-radius: 8px; border: 1px solid var(--border-color); background: var(--input-bg); color: var(--text-dark);">
                                <option>HDFC Bank</option>
                                <option>State Bank of India (SBI)</option>
                                <option>ICICI Bank</option>
                                <option>Axis Bank</option>
                                <option>Kotak Mahindra Bank</option>
                            </select>
                        </div>
                        <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="processFinalCheckout('Net Banking')">Proceed to Bank Gateway</button>
                    </div>

                    <div id="checkoutCODForm" style="display: none; text-align: center;">
                        <p style="color: var(--text-light); margin-bottom: 15px;">Pay with cash or card upon product delivery to your doorstep.</p>
                        <button class="btn btn-primary" style="width: 100%;" onclick="processFinalCheckout('Cash on Delivery')">Confirm Order with COD</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Card formatting input listeners
    const cardNum = document.getElementById('coCardNumber');
    if (cardNum) {
        cardNum.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            e.target.value = val.replace(/(\d{4})/g, '$1 ').trim();
        });
    }
    const cardExp = document.getElementById('coCardExpiry');
    if (cardExp) {
        cardExp.addEventListener('input', (e) => {
            let val = e.target.value.replace(/\D/g, '');
            if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
            e.target.value = val;
        });
    }
}

function switchCheckoutPayTab(type) {
    const tabs = ['Card', 'UPI', 'Bank', 'COD'];
    tabs.forEach(t => {
        const btn = document.getElementById('payTab' + t);
        const form = document.getElementById('checkout' + t + 'Form');
        if (btn) btn.classList.remove('active');
        if (form) form.style.display = 'none';
    });

    const activeBtn = document.getElementById('payTab' + (type === 'card' ? 'Card' : type === 'upi' ? 'UPI' : type === 'bank' ? 'Bank' : 'COD'));
    const activeForm = document.getElementById('checkout' + (type === 'card' ? 'Card' : type === 'upi' ? 'UPI' : type === 'bank' ? 'Bank' : 'COD') + 'Form');
    
    if (activeBtn) activeBtn.classList.add('active');
    if (activeForm) activeForm.style.display = 'block';
}

function processFinalCheckout(methodName) {
    const totals = calculateCartTotals();
    const address = document.getElementById('coShippingAddress')?.value.trim();
    const city = document.getElementById('coShippingCity')?.value.trim();
    const zip = document.getElementById('coShippingZip')?.value.trim();

    if (!address || !city) {
        showNotification('Please fill in your shipping address details', 'error');
        return;
    }

    const checkoutModal = document.getElementById('checkoutModal');
    if (checkoutModal) checkoutModal.remove();

    showNotification('Processing payment... Please wait ⏳', 'info');

    setTimeout(() => {
        const orderId = 'ALT-' + Math.floor(100000 + Math.random() * 900000);
        const txnId = 'TXN-' + Date.now();

        const orderObj = {
            id: orderId,
            transactionId: txnId,
            date: new Date().toLocaleString(),
            userEmail: currentUser.email,
            userName: currentUser.name,
            items: [...cart],
            totals: totals,
            paymentMethod: methodName,
            shippingAddress: `${address}, ${city} ${zip}`,
            status: 'Completed'
        };

        // Save to orders array in localStorage
        try {
            const existingOrders = JSON.parse(localStorage.getItem('altrotech_orders')) || [];
            existingOrders.unshift(orderObj);
            localStorage.setItem('altrotech_orders', JSON.stringify(existingOrders));
        } catch (e) {
            console.error('Failed to save order history', e);
        }

        // Clear cart
        cart = [];
        appliedDiscount = 0;
        saveCart();
        updateCartUI();

        // Show Invoice Receipt Modal
        showInvoiceModal(orderObj);
        showNotification(`✅ Order ${orderId} placed successfully!`, 'success');
    }, 1500);
}

// ==================== INVOICE & ORDERS HISTORY ====================
function showInvoiceModal(order) {
    let existingModal = document.getElementById('invoiceModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'invoiceModal';
    modal.style.display = 'block';

    const itemsRows = order.items.map(i => `
        <tr>
            <td>${i.icon || '⚡'} <strong>${i.name}</strong></td>
            <td>${i.quantity}</td>
            <td>$${parseFloat(i.price).toFixed(2)}</td>
            <td>$${(i.price * i.quantity).toFixed(2)}</td>
        </tr>
    `).join('');

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 650px;">
            <span class="close-btn" onclick="document.getElementById('invoiceModal').remove()">&times;</span>
            <div class="invoice-box" id="printableInvoice">
                <div class="invoice-header">
                    <div>
                        <h2 style="color: var(--royal-gold); margin: 0; font-size: 24px;">⚡ ALTRÖ TECH</h2>
                        <p style="font-size: 12px; color: var(--text-light); margin: 2px 0;">Power Conversion Excellence</p>
                    </div>
                    <div style="text-align: right;">
                        <h3 style="margin: 0; color: var(--text-dark);">INVOICE</h3>
                        <p style="font-size: 13px; color: var(--text-light); margin: 2px 0;">Order #: <strong>${order.id}</strong></p>
                        <p style="font-size: 12px; color: var(--text-light); margin: 0;">Date: ${order.date}</p>
                    </div>
                </div>

                <div style="display: flex; justify-content: space-between; margin-bottom: 20px; font-size: 13px; color: var(--text-light);">
                    <div>
                        <strong style="color: var(--text-dark);">Billed To:</strong><br>
                        ${order.userName}<br>
                        ${order.userEmail}<br>
                        ${order.shippingAddress}
                    </div>
                    <div style="text-align: right;">
                        <strong style="color: var(--text-dark);">Payment Details:</strong><br>
                        Method: ${order.paymentMethod}<br>
                        Txn Ref: ${order.transactionId}<br>
                        Status: <span style="color: var(--success-color); font-weight: bold;">PAID ✅</span>
                    </div>
                </div>

                <table class="invoice-table">
                    <thead>
                        <tr>
                            <th>Item</th>
                            <th>Qty</th>
                            <th>Price</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${itemsRows}
                    </tbody>
                </table>

                <div style="display: flex; justify-content: flex-end; margin-top: 15px;">
                    <div style="width: 220px; font-size: 14px;">
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px;">
                            <span>Subtotal:</span> <span>$${order.totals.subtotal.toFixed(2)}</span>
                        </div>
                        ${order.totals.discountAmount > 0 ? `
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: var(--success-color);">
                            <span>Discount:</span> <span>-$${order.totals.discountAmount.toFixed(2)}</span>
                        </div>` : ''}
                        <div style="display: flex; justify-content: space-between; margin-bottom: 4px; color: var(--text-light);">
                            <span>GST Tax (18%):</span> <span>+$${order.totals.tax.toFixed(2)}</span>
                        </div>
                        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 16px; border-top: 2px solid var(--royal-gold); padding-top: 6px; margin-top: 6px; color: var(--royal-gold);">
                            <span>Grand Total:</span> <span>$${order.totals.total.toFixed(2)}</span>
                        </div>
                    </div>
                </div>

                <div style="margin-top: 30px; text-align: center; border-top: 1px dashed var(--border-color); padding-top: 15px; font-size: 12px; color: var(--text-light);">
                    <p>Thank you for choosing AltroTech Solutions! For support, contact support@altrotech.com</p>
                </div>
            </div>

            <div style="display: flex; gap: 15px; margin-top: 20px;">
                <button class="btn btn-primary" style="flex: 1;" onclick="window.print()">🖨️ Print / Save Receipt</button>
                <button class="btn btn-secondary" style="flex: 1;" onclick="document.getElementById('invoiceModal').remove()">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function showOrdersModal() {
    let existingModal = document.getElementById('userOrdersModal');
    if (existingModal) existingModal.remove();

    const allOrders = JSON.parse(localStorage.getItem('altrotech_orders')) || [];
    const userOrders = allOrders.filter(o => o.userEmail === currentUser.email);

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'userOrdersModal';
    modal.style.display = 'block';

    const ordersHTML = userOrders.length === 0 ? 
        '<div style="text-align: center; padding: 40px; color: var(--text-light);">No previous orders found. Start shopping to place your first order!</div>' :
        userOrders.map(o => `
            <div class="order-card">
                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px;">
                    <div>
                        <strong style="color: var(--royal-gold); font-size: 16px;">Order #${o.id}</strong>
                        <div style="font-size: 12px; color: var(--text-light);">${o.date}</div>
                    </div>
                    <span style="background: var(--success-color); color: white; font-size: 12px; padding: 4px 10px; border-radius: 12px; font-weight: bold;">${o.status}</span>
                </div>
                <div style="font-size: 14px; margin-bottom: 10px;">
                    <strong>Items:</strong> ${o.items.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 10px; margin-top: 10px;">
                    <span style="font-weight: bold; font-size: 16px;">Total Paid: $${o.totals.total.toFixed(2)}</span>
                    <button class="btn btn-secondary" style="padding: 6px 14px; font-size: 13px;" onclick='viewOrderFromHistory(${JSON.stringify(o.id)})'>View Invoice 📄</button>
                </div>
            </div>
        `).join('');

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 650px;">
            <span class="close-btn" onclick="document.getElementById('userOrdersModal').remove()">&times;</span>
            <h2 style="color: var(--royal-gold); margin-bottom: 20px; text-align: center;">📦 My Order History</h2>
            <div style="max-height: 450px; overflow-y: auto; padding-right: 5px;">
                ${ordersHTML}
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

function viewOrderFromHistory(orderId) {
    const allOrders = JSON.parse(localStorage.getItem('altrotech_orders')) || [];
    const targetOrder = allOrders.find(o => o.id === orderId);
    if (targetOrder) {
        const userOrdersModal = document.getElementById('userOrdersModal');
        if (userOrdersModal) userOrdersModal.remove();
        showInvoiceModal(targetOrder);
    }
}

// ==================== PRODUCT CATALOG & FILTERING ====================
function renderProducts() {
    const container = document.getElementById('productsGrid');
    if (!container) return;

    let filtered = PRODUCTS_DATA.filter(p => {
        const matchCategory = activeCategory === 'all' || p.category === activeCategory;
        const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchCategory && matchSearch;
    });

    if (filtered.length === 0) {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-light); font-size: 18px;">No products match your filter criteria.</div>';
        return;
    }

    container.innerHTML = filtered.map(p => `
        <div class="product-item scroll-animate" style="position: relative;">
            <div class="product-badge">${p.badge}</div>
            <div class="product-image" onclick="openProductDetails('${p.id}')" style="cursor: pointer; ${p.image ? 'padding: 10px; display: flex; align-items: center; justify-content: center; background: var(--bg-light);' : ''}" title="Click for specs">
                ${p.image ? `<img src="${p.image}" alt="${p.name}" loading="lazy" style="max-width: 100%; max-height: 100%; object-fit: contain;">` : p.icon}
            </div>
            <div class="product-details">
                <h3 onclick="openProductDetails('${p.id}')" style="cursor: pointer;">${p.name}</h3>
                <div class="product-rating">
                    ${'★'.repeat(Math.floor(p.rating))}${'☆'.repeat(5 - Math.floor(p.rating))}
                    <span class="rating-count">(${p.rating} / ${p.reviewsCount} reviews)</span>
                </div>
                <p>${p.description}</p>
                <div style="display: flex; gap: 10px; margin-top: 15px;">
                    <button class="btn btn-primary" style="flex: 1;" onclick="addToCart('${p.id}')">Add to Cart 🛒</button>
                    <button class="btn btn-secondary" style="padding: 10px 14px;" onclick="openProductDetails('${p.id}')" title="Specs">ℹ️</button>
                </div>
            </div>
        </div>
    `).join('');
}

function filterCategory(cat, btnElement) {
    activeCategory = cat;
    const catBtns = document.querySelectorAll('.cat-btn');
    catBtns.forEach(b => b.classList.remove('active'));
    if (btnElement) btnElement.classList.add('active');
    renderProducts();
}

function handleProductSearch(event) {
    searchQuery = event.target.value.trim();
    renderProducts();
}

function openProductDetails(productId) {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    let existingModal = document.getElementById('productDetailModal');
    if (existingModal) existingModal.remove();

    const specsRows = Object.entries(product.specs || {}).map(([key, val]) => `
        <tr style="border-bottom: 1px solid var(--border-color);">
            <td style="padding: 8px; font-weight: 600; color: var(--text-dark);">${key}</td>
            <td style="padding: 8px; color: var(--text-light);">${val}</td>
        </tr>
    `).join('');

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'productDetailModal';
    modal.style.display = 'block';

    modal.innerHTML = `
        <div class="modal-content" style="max-width: 600px;">
            <span class="close-btn" onclick="document.getElementById('productDetailModal').remove()">&times;</span>
            <div style="display: flex; gap: 20px; align-items: center; margin-bottom: 20px;">
                <div style="width: 150px; height: 150px; display: flex; align-items: center; justify-content: center; background: var(--widget-bg); padding: 12px; border-radius: 12px; border: 1px solid var(--border-color); flex: 0 0 150px;">
                    ${product.image ? `<img src="${product.image}" alt="${product.name}" style="max-width: 100%; max-height: 100%; object-fit: contain; border-radius: 8px;">` : `<span style="font-size: 60px;">${product.icon}</span>`}
                </div>
                <div>
                    <span class="product-badge" style="position: static;">${product.badge}</span>
                    <h2 style="margin: 8px 0 4px; color: var(--royal-gold);">${product.name}</h2>
                    <div style="font-size: 22px; font-weight: bold;">$${product.price.toFixed(2)}</div>
                </div>
            </div>
            
            <p style="color: var(--text-light); margin-bottom: 20px;">${product.description}</p>

            <h3 style="font-size: 16px; margin-bottom: 10px; color: var(--text-dark);">Technical Specifications</h3>
            <table style="width: 100%; border-collapse: collapse; margin-bottom: 25px; background: var(--widget-bg); border-radius: 8px; overflow: hidden; border: 1px solid var(--border-color);">
                <tbody>
                    ${specsRows}
                </tbody>
            </table>

            <div style="display: flex; gap: 15px;">
                <button class="btn btn-primary" style="flex: 1;" onclick="addToCart('${product.id}'); document.getElementById('productDetailModal').remove();">Add to Cart 🛒</button>
                <button class="btn btn-secondary" style="flex: 1;" onclick="document.getElementById('productDetailModal').remove()">Close</button>
            </div>
        </div>
    `;

    document.body.appendChild(modal);
}

// Payment Options Modal (for Payment page cards)
function openPaymentOptionModal(method) {
    if (!currentUser) {
        showNotification('Please sign in first to proceed with payment', 'error');
        openAuthModal();
        return;
    }

    let paymentDetails = '';

    switch (method) {
        case 'stripe':
            paymentDetails = `
                <h2 style="margin-bottom: 20px; color: var(--royal-gold);">Credit & Debit Card Payment</h2>
                <p style="color: var(--text-light); margin-bottom: 20px;">Secure payment via Stripe - Accepts Visa, Mastercard, AMEX</p>
                <div class="form-group">
                    <label for="stripeCardName">Full Name</label>
                    <input type="text" id="stripeCardName" value="${currentUser ? currentUser.name : ''}">
                </div>
                <div class="form-group">
                    <label for="stripeCardNumber">Card Number</label>
                    <input type="text" id="stripeCardNumber" placeholder="4111 1111 1111 1111" maxlength="19">
                </div>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 15px;">
                    <div class="form-group">
                        <label for="stripeExpiry">Expiry Date</label>
                        <input type="text" id="stripeExpiry" placeholder="MM/YY" maxlength="5">
                    </div>
                    <div class="form-group">
                        <label for="stripeCvv">CVV</label>
                        <input type="password" id="stripeCvv" placeholder="123" maxlength="3">
                    </div>
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="processPaymentMethod('stripe')">Pay Securely with Card</button>
            `;
            break;
        case 'razorpay':
            paymentDetails = `
                <h2 style="margin-bottom: 20px; color: var(--royal-gold);">UPI & Bank Transfer</h2>
                <p style="color: var(--text-light); margin-bottom: 20px;">Indian payment methods via Razorpay - UPI, Net Banking, Wallets</p>
                <div class="form-group">
                    <label for="razorpayName">Full Name</label>
                    <input type="text" id="razorpayName" value="${currentUser ? currentUser.name : ''}">
                </div>
                <div class="form-group">
                    <label for="razorpayEmail">Email</label>
                    <input type="email" id="razorpayEmail" value="${currentUser ? currentUser.email : ''}">
                </div>
                <div class="form-group">
                    <label for="razorpayPhone">Phone</label>
                    <input type="tel" id="razorpayPhone" value="${currentUser ? currentUser.phone : ''}">
                </div>
                <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="processPaymentMethod('razorpay')">Proceed to Razorpay</button>
            `;
            break;
        default:
            paymentDetails = `
                <h2 style="margin-bottom: 20px; color: var(--royal-gold);">${method.toUpperCase()} Payment Gateway</h2>
                <p style="color: var(--text-light); margin-bottom: 20px;">Direct simulation for ${method} payment method.</p>
                <button class="btn btn-primary" style="width: 100%; margin-top: 15px;" onclick="processPaymentMethod('${method}')">Simulate ${method.toUpperCase()} Payment</button>
            `;
            break;
    }

    let existingModal = document.getElementById('paymentOptionModal');
    if (existingModal) existingModal.remove();

    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.id = 'paymentOptionModal';
    modal.style.display = 'block';
    modal.innerHTML = `
        <div class="modal-content" style="max-width: 500px;">
            <span class="close-btn" onclick="document.getElementById('paymentOptionModal').remove()">&times;</span>
            ${paymentDetails}
        </div>
    `;
    document.body.appendChild(modal);
}

function processPaymentMethod(method) {
    showNotification('Processing ' + method.toUpperCase() + ' transaction...', 'info');

    setTimeout(() => {
        const transactionID = 'TXN-' + Date.now();
        const modal = document.getElementById('paymentOptionModal');
        if (modal) modal.remove();
        showNotification('✅ Payment authorization successful! Ref: ' + transactionID, 'success');
    }, 1500);
}

// ==================== TOAST NOTIFICATIONS ====================
function showNotification(message, type = 'success') {
    let container = document.getElementById('toastContainer');
    if (!container) {
        container = document.createElement('div');
        container.className = 'toast-container';
        container.id = 'toastContainer';
        document.body.appendChild(container);
    }
    
    const toast = document.createElement('div');
    toast.className = 'toast toast-' + type;

    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };

    toast.innerHTML = `
        <span class="toast-icon">${icons[type] || 'ℹ️'}</span>
        <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-hiding');
        setTimeout(() => toast.remove(), 300);
    }, 3500);
}

// ==================== CONTACT FORM ====================
const GOOGLE_SHEET_URL = 'https://script.google.com/macros/s/AKfycbyYQ8m_1q5LP-kz1T7a4tcjVRUYRaIKWcTSEp0s3m5a-PfJgvIpk-LZZsXVHCjLSzpZ/exec';

function submitContact(event) {
    event.preventDefault();

    const successMsg = document.getElementById('successMessage');

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const company = document.getElementById('company').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    const payload = {
        userId: currentUser ? currentUser.id || currentUser.email : 'guest',
        name: name,
        email: email,
        contact: phone,
        company: company,
        subject: subject,
        message: message
    };

    fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
            'Content-Type': 'text/plain;charset=utf-8'
        },
        body: JSON.stringify(payload)
    })
    .then(() => {
        if (successMsg) successMsg.classList.add('show');
        event.target.reset();
        setTimeout(() => {
            if (successMsg) successMsg.classList.remove('show');
        }, 5000);
    })
    .catch((error) => {
        console.error('Failed to submit form:', error);
        if (successMsg) successMsg.classList.add('show');
        event.target.reset();
        setTimeout(() => {
            if (successMsg) successMsg.classList.remove('show');
        }, 5000);
    });
}

// ==================== MOBILE MENU ====================
function toggleMobileMenu() {
    const nav = document.getElementById('mainNav');
    const hamburger = document.getElementById('hamburger');
    if (nav) nav.classList.toggle('mobile-open');
    if (hamburger) hamburger.classList.toggle('active');
}

// ==================== HEADER SCROLL ====================
function initHeaderScroll() {
    const header = document.querySelector('header');
    if (!header) return;
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }, { passive: true });
}

// ==================== TYPEWRITER EFFECT ====================
function initTypewriter() {
    const tagline = document.getElementById('heroTagline');
    if (!tagline) return;

    const text = tagline.textContent.trim();
    const cursor = tagline.querySelector('.typewriter-cursor');
    let index = 0;

    tagline.textContent = '';
    tagline.appendChild(document.createTextNode(''));
    if (cursor) tagline.appendChild(cursor);

    function type() {
        if (index < text.length) {
            const char = text.charAt(index);
            if (cursor) {
                tagline.insertBefore(document.createTextNode(char), cursor);
            } else {
                tagline.textContent += char;
            }
            index++;
            setTimeout(type, Math.random() * 40 + 20);
        }
    }

    setTimeout(type, 300);
}

// ==================== PARTICLES ====================
function initParticles() {
    const container = document.getElementById('particles-container');
    if (!container) return;

    const colors = ['rgba(212,175,55,0.2)', 'rgba(212,175,55,0.15)', 'rgba(212,175,55,0.25)'];
    const sizes = [4, 6, 8, 10, 12, 15, 20];

    for (let i = 0; i < 25; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';

        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const left = Math.random() * 100;
        const duration = Math.random() * 15 + 10;
        const delay = Math.random() * 10;

        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.background = color;
        particle.style.left = left + '%';
        particle.style.animationDuration = duration + 's';
        particle.style.animationDelay = delay + 's';
        particle.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';

        container.appendChild(particle);
    }
}

// ==================== COUNTER ANIMATION ====================
function animateCounter(element, target, suffix = '') {
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const currentValue = Math.floor(eased * target);

        element.textContent = currentValue + (progress >= 1 ? suffix : '');

        if (progress < 1) {
            requestAnimationFrame(update);
        } else {
            element.textContent = target + suffix;
        }
    }

    requestAnimationFrame(update);
}

// ==================== SCROLL ANIMATIONS ====================
function initScrollAnimations() {
    const animateElements = document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');

                const statNumber = entry.target.querySelector('.stat-number[data-target]');
                if (statNumber && !statNumber.dataset.animated) {
                    const target = parseFloat(statNumber.dataset.target);
                    const suffix = statNumber.dataset.target.includes('.') ? '%' : '+';
                    statNumber.dataset.animated = 'true';
                    animateCounter(statNumber, target, suffix);
                }

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateElements.forEach(el => observer.observe(el));
}

// ==================== INITIALIZATION ====================
function initializeApp() {
    initTheme();

    const savedUser = localStorage.getItem('altrotech_user');
    if (savedUser) {
        try {
            currentUser = JSON.parse(savedUser);
        } catch (e) {
            currentUser = null;
        }
    }
    updateUserUI();

    loadCart();
    updateCartUI();

    renderProducts();
}

// ==================== DOM READY ====================
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    initHeaderScroll();
    initParticles();
    initScrollAnimations();
    setTimeout(initTypewriter, 500);
});

// Close dropdowns when clicking outside
document.addEventListener('click', function(event) {
    const cartSidebar = document.getElementById('cartSidebar');
    const userDropdown = document.getElementById('userDropdown');
    const cartIcon = document.querySelector('.cart-icon');
    const userAvatar = document.querySelector('.user-avatar');

    if (cartIcon && !cartIcon.contains(event.target) && cartSidebar && !cartSidebar.contains(event.target)) {
        cartSidebar.classList.remove('open');
    }

    if (userAvatar && !userAvatar.contains(event.target) && userDropdown && !userDropdown.contains(event.target)) {
        userDropdown.classList.remove('open');
    }
});
