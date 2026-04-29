<div align="center">

# 🎹 Pian Psaltic

**Instrument virtual interactiv pentru studiul muzicii psaltice bizantine**

*[English below](#-english)*

<br>

<p>
  <a href="https://pian-psaltic.vercel.app" target="_blank">
    <img src="https://img.shields.io/badge/🔗%20Demo%20Live%20→-8A2BE2?style=for-the-badge&logo=vercel&logoColor=white" alt="Demo" />
  </a>
</p>

<p>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/React-20232A?style=flat-square&logo=react&logoColor=61DAFB" alt="React" />
  <img src="https://img.shields.io/badge/Vite-B73BFE?style=flat-square&logo=vite&logoColor=FFD62E" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Web%20Audio%20API-FF6F00?style=flat-square&logo=google-chrome&logoColor=white" alt="Web Audio" />
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg?style=flat-square" alt="License" />
</p>

</div>

---

## 📋 Cuprins

- [Despre](#-despre)
- [Demo](#-demo)
- [Funcționalități](#-funcționalități)
- [Glasurile Bizantine](#-glasurile-bizantine)
- [Notele Psaltice](#-notele-psaltice)
- [Stack Tehnic](#%EF%B8%8F-stack-tehnic)
- [Instalare](#-instalare)
- [Structura Proiectului](#-structura-proiectului)
- [Roadmap](#-roadmap)
- [Referințe](#-referințe)
- [Contribuții](#-contribuții)
- [Licență](#-licență)

---

## 📖 Despre

**Pian Psaltic** este o aplicație web educațională care permite explorarea interactivă a **celor 8 glasuri (ehuri) bizantine** direct în browser.

Spre deosebire de un pian standard (temperament egal), muzica psaltică folosește **intervale naturale** măsurate în **morii** (1/72 din octavă). Această aplicație redă frecvențele reale ale fiecărui glas, nu aproximări temperate.

**Public-țintă:** studenți teologi, psalți, profesori de muzică bizantină și pasionați ai tradiției psaltice.

### Puncte cheie

- 🎯 Intervale autentice — frecvențe calculate după scara naturală bizantină
- 🎼 Font **Neanes** pentru redarea corectă a simbolurilor Unicode din blocul U+1D000
- 📱 Responsive — funcționează pe desktop și tabletă
- ⚡ Zero latență — sinteză audio nativă via Web Audio API

---

## 🚀 Demo

🔗 **https://pian-psaltic.vercel.app**

> 💡 *Deschide aplicația și selectează un glas pentru a auzi diferențele de intonație față de scara temperată.*

---

## ✨ Funcționalități

### 🎹 Pian Virtual

| Funcție | Descriere |
|---------|-----------|
| **8 Glasuri** | Comutare instantă între cele 8 ehuri bizantine |
| **Octavă reglabilă** | Transpunere ±2 octave pentru fiecare glas |
| **Diapazon reglabil** | Setarea frecvenței de bază (Ni/Pa/Vu etc.) |
| **Volum & Envelope** | Control fin al intensității și al atacului/decay-ului |
| **Taste vizuale** | Claviatură colorată indicând notele fiecărui glas |

### 📖 Teorie Psaltică

O bibliotecă completă a semnelor muzicale bizantine:

- **Semne vocale** — Ison, Oligon, Petaste, Kentemata, Apoderma și combinații
- **Semne temporale** — Klasma, Apli, Dipli, Tripli, Gorgon, Digorgon, Trigorgon, Argon, Diargon
- **Semne de tempo** — de la *Poli Argos* (foarte lent) la *Poli Gorgos* (foarte rapid)
- **Reguli de combinație** — Kentima, Clasma + Gorgon (regula de aur), efecte ritmice

Fiecare semn include: glyph Unicode · denumire · descriere · formula ritmică · neume afectate.

### 🧠 Quiz Interactiv (3 Moduri)

| Mod | Dificultate | Descriere |
|-----|-------------|-----------|
| **Test de Semne** | Medie | Direcție (urcare/coborâre/menținere) → trepte → nota rezultată |
| **Test de Note** | Ușoară | Recunoașterea notelor bizantine după glifă |
| **Test de Durată** | Avansată | 15 tipuri de întrebări despre efecte, bătăi, formule și reguli de combinație |

---

## 🎼 Glasurile Bizantine

| # | Glas | Notă de bază | Caracter |
|---|------|-------------|----------|
| 1 | **Glasul I** | Pa | Diatonic |
| 2 | **Glasul II** | Vu | Cromatic moale |
| 3 | **Glasul III** | Ga | Enarmonic |
| 4 | **Glasul IV** | Di | Diatonic |
| 5 | **Glasul V Plagal** | Pa | Diatonic |
| 6 | **Glasul VI Plagal** | Vu | Cromatic moale |
| 7 | **Glasul VII (Grave)** | Ga | Enarmonic |
| 8 | **Glasul VIII Plagal** | Ni | Diatonic |

---

## 🔤 Notele Psaltice

| Simbol | Nume | Echivalent vestic (aproximativ) |
|--------|------|--------------------------------|
| **Ni** | Νη | Do |
| **Pa** | Πα | Re |
| **Vu** | Βου | Mi |
| **Ga** | Γα | Fa |
| **Di** | Δι | Sol |
| **Ke** | Κε | La |
| **Zo** | Ζω | Si |

---

## 🛠️ Stack Tehnic

| Tehnologie | Versiune | Rol |
|------------|----------|-----|
| **React** | 19 | UI declarativ cu Hooks |
| **TypeScript** | 5.8 | Tipizare strictă pentru modelul muzical |
| **Vite** | 6 | Build tool și dev server (HMR instant) |
| **Tailwind CSS** | 4 | Stilizare utilitară cu dark theme |
| **Web Audio API** | — | Sinteză audio cu oscilatoare și envelope |
| **Neanes OTF** | — | Font cu ligaturi pentru simboluri bizantine |
| **Lucide React** | — | Iconițe vectoriale consistente |

---

## 📦 Instalare

### Cerințe preliminare

- **Node.js** ≥ 18
- **npm** ≥ 9

### Pași de instalare

```bash
# 1. Clonează repository-ul
git clone https://github.com/petreleon/Pian-Psaltic.git
cd Pian-Psaltic

# 2. Instalează dependențele
npm install

# 3. Pornește serverul de dezvoltare
npm run dev

# 4. Deschide în browser
open http://localhost:5173
```

### Build pentru producție

```bash
npm run build     # generează directorul dist/
npm run preview   # previzualizează build-ul local
```

> **Notă:** Motorul audio utilizează Web Audio API. Asigură-te că rulezi aplicația în context secure (localhost sau HTTPS) pentru ca audio context-ul să se inițializeze corect.

---

## 🗂️ Structura Proiectului

<details>
<summary><b>Click pentru a vedea structura completă</b></summary>

```text
Pian-Psaltic/
├── App.tsx                    # Componenta rădăcină + routing tab-uri
├── index.tsx                  # Punct de intrare React
├── index.html                 # HTML + import maps + font loading
├── types.ts                   # Tipuri globale (NoteName etc.)
├── vite.config.ts             # Configurare Vite
├── tsconfig.json              # Configurare TypeScript
│
├── components/
│   ├── ControlPanel.tsx       # Selector glas, octavă, volum, frecvență
│   ├── PianoBoard.tsx         # Claviatura virtuală cu taste colorate
│   ├── Key.tsx                # O tastă individuală (albă/neagră)
│   ├── TermsModal.tsx         # Modal de acceptare termeni
│   ├── QuizSection.tsx        # Quiz interactiv (semne + note + durată)
│   ├── TheorySection.tsx      # Secțiunea teoretică (toate semnele)
│   ├── quiz/                  # Sub-componente quiz (planificate)
│   └── theory/                # Sub-componente teorie (planificate)
│
├── constants/
│   ├── music.ts               # Frecvențe bază, NOTE_NAMES, intervale
│   ├── glasuri.ts             # Cele 8 glasuri + generateKeyboardMap
│   ├── index.ts               # Barrel exports
│   └── psaltic/
│       ├── types.ts           # Tipuri: PsalticSign, TemporalSign, TempoSign
│       ├── psalticSigns.ts    # Semne vocale (26 de semne)
│       ├── temporalSigns.ts   # Semne temporale (Klasma, Gorgon etc.)
│       ├── tempoSigns.ts      # Semne de tempo (8 semne)
│       ├── noteDefinitions.ts # Definițiile notelor bizantine
│       └── index.ts           # Barrel exports
│
├── services/
│   └── audioEngine.ts         # Motor audio (Web Audio API)
│
└── public/
    └── fonts/
        └── Neanes.otf         # Font pentru simboluri muzicale bizantine
```

</details>

---

## 🗺️ Roadmap

- [x] Pian virtual cu cele 8 glasuri autentice
- [x] Secțiune teoretică completă cu semne psaltice
- [x] Quiz interactiv (semne, note, durate)
- [x] Refactorizare constante (split monolit)
- [ ] Refactorizare componente `QuizSection` și `TheorySection`
- [ ] Export partituri / secvențe cântate
- [ ] Mod analiză melodică automată
- [ ] Suport mobil îmbunătățit (touch gesture-uri)

---

## 📚 Referințe

Această aplicație se bazează pe lucrarea:

> **„Teoria Muzicii Psaltice pentru Seminariile Teologice și Școlile de Cântăreți”**  
> — Pr. Lect. Dr. Stelian Ionascu, Editura Sophia, București 2006

PDF disponibil în rețeaua de referință academică.

---

## 🤝 Contribuții

Contribuțiile sunt binevenite! Te rugăm să deschizi un **Issue** pentru bug-uri sau sugestii și un **Pull Request** pentru modificări.

### Înainte de a trimite un PR

1. Verifică tipurile TypeScript:
   ```bash
   npx tsc --noEmit
   ```
2. Verifică build-ul complet:
   ```bash
   npx vite build
   ```
3. Asigură-te că modificările respectă structura existentă (vezi `AGENTS.md` pentru convenții).

---

## 🌍 English

**Pian Psaltic** is an interactive web application for exploring the **8 Byzantine chant modes (glasuri)** directly in the browser.

Unlike a standard equal-temperament piano, Byzantine chant uses **natural intervals** measured in **morii** (1/72 of an octave). This application renders the authentic frequencies of each mode, not western approximations.

**Key features:** virtual piano with authentic intervals, complete psaltic notation theory section, and interactive quizzes.

---

## 📄 Licență

Distribuit sub licența MIT. Vezi [LICENSE.md](./LICENSE.md) pentru detalii.

---

<div align="center">

**[⬆ Sus](#-pian-psaltic)**

<sub>Construit cu ❤️ pentru tradiția muzicală bizantină</sub>

</div>
