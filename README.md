# 🎮 Game Portal - Premium Browser Games Collection

A collection of 9 premium browser-based games with stunning visuals, smooth animations, and immersive background music.

## 🕹️ Games Included

1. **Balloon Popper** - Pop balloons matching the target color in a relaxing sky setting
2. **Math Balancer** - Educational math game with visual learning and test modes
3. **Rain Protector** - Draw barriers to protect objects from falling rain
4. **Moon Rocks** - Stack rocks on the moon to reach 15 meters
5. **Floor is Lava** - Gravity-flipping platformer with animated lava
6. **Space Cleanup** - Collect space debris while avoiding red hunters
7. **Neon Galaxy** - Classic space shooter with neon aesthetics
8. **Rubik's Companion** - Interactive Rubik's cube solver with voice guidance
9. **Find the Light** - Memory game - track the glowing orb under shuffling speakers

## ✨ Features

- 🎵 **Background Music** - Every game has custom ambient music
- 📱 **Mobile Friendly** - Touch controls and responsive design
- 🎨 **Premium Visuals** - Modern UI with smooth animations
- 🚀 **No Dependencies** - Pure HTML/CSS/JavaScript (except where noted)
- 🎯 **Educational** - Math Balancer helps kids learn math
- 🌐 **Offline Ready** - Play without internet after first load

## 🚀 Quick Start

### Play Locally

1. Open `index.html` in your browser
2. Click on any game to start playing!

### Deploy to AWS Amplify

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for complete instructions.

Quick version:
```bash
# Initialize git
git init
git add .
git commit -m "Initial commit"

# Push to GitHub (create repo first on github.com)
git remote add origin https://github.com/YOUR_USERNAME/game-portal.git
git push -u origin main

# Then deploy via AWS Amplify Console
```

## 🎮 Game Controls

- **Mouse/Touch** - All games support both mouse and touch controls
- **Keyboard** - Some games support keyboard shortcuts (Space, Arrow keys)
- **Audio** - Music starts automatically or on first interaction

## 🛠️ Tech Stack

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Graphics:** Canvas API, CSS Animations
- **Audio:** Web Audio API
- **Physics:** Matter.js (Moon Rocks, Rain Protector)
- **3D:** Three.js (Rubik's Companion)
- **UI Framework:** React (Math Balancer only)

## 📂 Project Structure

```
/
├── index.html              # Main game portal
├── styles.css              # Portal styles
├── balloon_popper/         # Balloon Popper game
├── math_balancer/          # Math Balancer game
├── rain_protector/         # Rain Protector game
├── moon_rocks/             # Moon Rocks game
├── gravity_flip/           # Floor is Lava game
├── space_cleanup/          # Space Cleanup game
├── neon_galaxy/            # Neon Galaxy game
├── rubiks_companion/       # Rubik's Companion
└── find_the_light/         # Find the Light game
```

## 🎨 Customization

Each game is self-contained and can be customized independently:

- **Colors:** Edit CSS variables in each game's style section
- **Difficulty:** Adjust game constants (speed, spawn rates, etc.)
- **Music:** Modify the music patterns in each game's audio section

## 📱 Browser Support

- ✅ Chrome/Edge (Recommended)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

Feel free to:
- Add new games
- Improve existing games
- Fix bugs
- Enhance music/sound effects

## 📄 License

This project is open source and available for personal and educational use.

## 🎉 Credits

Created with ❤️ for fun and learning!

---

**Enjoy the games!** 🎮✨
