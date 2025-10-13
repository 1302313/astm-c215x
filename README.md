# ASTM C215 Dynamic Modulus Calculator & Visualization Tool

[![Status](https://img.shields.io/badge/status-active-success.svg)]() 
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![HTML5](https://img.shields.io/badge/Built%20with-HTML5-orange.svg)]()
[![CSS3](https://img.shields.io/badge/Styled%20with-CSS%2FSASS-lightgrey.svg)]()
[![JavaScript](https://img.shields.io/badge/Code-JavaScript-yellow.svg)]()
[![Chart.js](https://img.shields.io/badge/Charts-Chart.js-green.svg)]()

A professional, minimal, and interactive web-based tool designed to calculate and visualize **transverse, longitudinal, and torsional dynamic modulus of elasticity** according to **ASTM C215 standards**.  
Developed for engineers, researchers, and students in the **construction and concrete materials industry**, this calculator provides accurate results, real-time charting, and elegant export options — all within a fully responsive interface.

---

## 🚀 Features

- **Unified Sample Profile**  
  Input geometry, density, and mass once — automatically applied across all vibration modes.

- **Multi-Mode Dynamic Modulus**  
  Supports **transverse**, **longitudinal**, and **torsional** frequency input and computation.

- **Real-Time Visualization**  
  Dynamic **Chart.js** multi-line graph of modulus vs. frequency, with **linear/logarithmic** toggle.

- **Professional PDF Export**  
  Generate a clean, engineering-style report containing results and the combined chart.

- **Inline Tooltips & Theory Popups**  
  Displays ASTM C215 explanations directly beside key inputs and results.

- **Responsive & Mobile-First Design**  
  Designed for clarity and usability across all devices, with a **professional grayscale palette**.

---

## 🧮 Calculation Overview

The **ASTM C215** standard provides methods for determining the **dynamic modulus of elasticity** using the *resonant frequency* of concrete specimens.  
This tool automates the process using:

- Specimen **geometry** (beam or cylinder)  
- **Density** and **mass**  
- **Measured resonance frequencies** for each vibration mode  

All results are computed instantly, displayed numerically and graphically, and can be exported for recordkeeping or analysis.

---

## 📁 Project Structure

```bash
├── index.html          # Main calculator interface
├── /css
│   └── style.css       # Compiled grayscale minimal design
├── /js
│   └── app.js          # Core logic: inputs, calculations, charts, exports
├── /assets
│   └── icons, fonts, etc.
└── README.md           # Project documentation (this file)

## 📊 How to Use

1. Enter specimen **dimensions**, **density**, and **mass**.  
2. Input measured **resonance frequencies** for **transverse**, **longitudinal**, and **torsional** modes.  
3. Click **“Calculate Modulus”** to generate results.  
4. Switch between **linear** and **logarithmic** chart scales using the toggle.  
5. Click **“Export PDF”** to download a full report containing all results and the combined modulus–frequency chart.

---

## 🧠 ASTM C215 Reference

> **ASTM C215 – Standard Test Method for Fundamental Transverse, Longitudinal, and Torsional Frequencies of Concrete Specimens**

This calculator serves as a digital interpretation of the ASTM C215 procedure, enabling engineers, researchers, and students to **evaluate the dynamic elastic properties** of concrete specimens with precision and ease.  
It is intended for **educational and research** use only — not as a certified testing device.

---

## 🔒 Compliance & Best Practices

- All formulas and computations follow **ASTM C215** guidelines.  
- No user or specimen data is stored or transmitted.  
- Code adheres to **HTML/CSS/JS security and performance best practices**.  
- Designed for **clarity, accessibility, and maintainability**, supporting future lab integrations.

---

## 🧩 Future Enhancements

- Repeatability and multi-specimen comparison mode  
- Saved specimen profiles for re-use  
- Batch analysis and multi-sample PDF exports  
- Cloud-based data visualization dashboard  
- Integration of ASTM C215 reference database for auto-validation

## Project info

**URL**: https://lovable.dev/projects/3e8f3759-4be7-46c5-bcfc-949a32627f3b

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in your AI coding website.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone https://github.com/1302313/astm-c215x.git

# Step 2: Navigate to the project directory.
cd astm-c215x

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/3e8f3759-4be7-46c5-bcfc-949a32627f3b) and click on Share -> Publish.

## Custom domain AI project

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
