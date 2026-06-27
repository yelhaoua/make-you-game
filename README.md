# Make Your Game 🎮

A browser-based single-player game built with **HTML**, **CSS**, and **Vanilla JavaScript** without using any frameworks or the `<canvas>` element.

## 📖 About

This project consists of developing a complete browser game while creating a simple game engine from scratch using only the DOM.

The main goal is to build a smooth and responsive game that maintains **60 FPS**, uses **`requestAnimationFrame`** correctly, and provides an enjoyable user experience.

---

## 🚀 Features

- 🎮 Single-player gameplay
- ⚡ 60 FPS animation using `requestAnimationFrame`
- ⌨️ Smooth keyboard controls
- ⏸️ Pause menu
  - Continue
  - Restart

- 📊 Scoreboard
  - Timer
  - Score (XP/Points)
  - Lives

- 🧠 Optimized rendering with minimal DOM layers
- 📱 Responsive interface
- 🚫 No Canvas
- 🚫 No JavaScript frameworks

---

## 🕹️ Game Genre

This project is based on:

> Pac-Man

Examples:

- Space Invaders
- Bomberman
- Pac-Man
- Super Mario
- Brick Breaker
- Tetris
- Duck Hunt
- Pinball
- Donkey Kong

---

## 🛠️ Technologies

- HTML5
- CSS3
- JavaScript (ES6)
- DOM API
- requestAnimationFrame

---

## 📂 Project Structure

```
make-your-game/
│
├── index.html
├── README.md
│
├── css/
│   ├── style.css
│   └── ui.css
│
├── js/
│   ├── main.js
│   ├── engine.js
│   ├── player.js
│   ├── enemy.js
│   ├── input.js
│   ├── collision.js
│   ├── ui.js
│   └── utils.js
│
├── assets/
│   ├── images/
│   ├── sounds/
│   └── fonts/
│
└── docs/
```

---

## ▶️ Running the Project

Clone the repository:

```bash
git clone https://learn.zone01oujda.ma/git/yelhaoua/make-your-game
```

Open the project:

```bash
cd make-your-game
```

Start a local server.

Python:

```bash
python -m http.server
```

or

```bash
python3 -m http.server
```

Then open:

```
http://localhost:8000
```

---

## ⚙️ Performance

The game is optimized to:

- Maintain at least **60 FPS**
- Avoid frame drops
- Reduce unnecessary DOM updates
- Use CSS `transform` for movement
- Minimize layout recalculations
- Minimize painting and compositing work

Performance is verified using browser Developer Tools.

---

## 📚 What I Learned

- Game loop architecture
- requestAnimationFrame
- DOM manipulation
- Collision detection
- Keyboard input handling
- Performance optimization
- Event Loop
- Browser rendering pipeline
- Animation timing

---

## 👨‍💻 Author

**Yaakoub Elhaouari**
**Hichame Ait Benalla**

Zone01 Oujda

Git Repository:

https://learn.zone01oujda.ma/git/yelhaoua/make-your-game

---

## 📄 License

This project was developed for educational purposes as part of the Zone01 Oujda curriculum.
