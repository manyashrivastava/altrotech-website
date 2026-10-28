🌐 Live Demo

Live Website: https://manyashrivastava.github.io/altrotech-website/-here

⚡ ALTROTECH — Power Conversion & Electronics Website
A responsive corporate and product showcase website for ALTROTECH, designed to present power-conversion solutions and provide a simple e-commerce-style browsing experience. The interface includes company information, product listings, a shopping cart, account screens, payment options, and a contact section.
Project note: This is a frontend demonstration. Account details and cart information are handled in the browser using localStorage, and checkout/payment flows are simulated. It is not connected to a production authentication service, database, or payment gateway.

✨ Features
- Multi-section website: Home, About, Products, Payment, and Contact
- Product showcase: Product cards and images for browsing available items
- Shopping cart: Add items, review the cart, and view the total
- Sign in / Sign up UI: Demo account flow with browser-side storage
- Dark and light themes: Toggle themes with the preference saved locally
- Responsive layout: Styling intended for desktop, tablet, and mobile screens
- Interactive UI: Navigation, forms, notifications, and transitions powered by JavaScript
- No build step required: The main website can be opened directly in a modern browser
🧰 Technologies
- HTML5
- CSS3
- Vanilla JavaScript
- Browser localStorage
The repository also contains a Node.js/Express server folder and a package.json. The static website can be viewed without running the server; the server is not required for the documented frontend demo flow.
📁 Project Structure
altrotech-website_3/
├── index.html
├── altrotech/
│   ├── altrotech-website.css
│   ├── altrotech-website.js
│   ├── altrotech-website.html
│   └── images/
│       └── products/
├── server/
│   ├── server.js
│   ├── auth.js
│   └── db.js
├── package.json
└── README.md
🚀 Run Locally
Option 1: Open the website directly
1. Download or clone this repository.
2. Open the project folder in Visual Studio Code.
3. Open index.html in your browser, or use the Live Server extension in VS Code.
4. Keep the altrotech folder and its files in place so the CSS, JavaScript, and images load correctly.
Option 2: Clone with Git
git clone <your-repository-url>
cd altrotech-website_3
Then open index.html in a browser.

🔒 Demo Limitations & Security
- Login and sign-up are demonstration features and use browser-side storage; they are not secure production authentication.
- Payment options and checkout are simulated; no real payment is processed.
- Contact form interactions may display a local success message without sending data to a server.
- Do not enter real passwords, payment details, or sensitive personal information into the demo.
- For production use, connect secure server-side authentication, validated APIs, a database, and a payment provider.
🛠️ Customization
- Page content and layout: index.html and altrotech/altrotech-website.html
- Styles, themes, and responsiveness: altrotech/altrotech-website.css
- Interactions and browser-side behavior: altrotech/altrotech-website.js
- Product images: altrotech/images/products/
📌 Future Improvements
- Connect the UI to a secure backend and database
- Integrate a real payment provider in test mode before production use
- Add product search, filtering, and improved cart management
- Add accessibility checks and automated tests
- Deploy the site and add the live demo link above
👩‍💻 Author
Created as a frontend web development project for the ALTROTECH brand concept.
