/* ========== PAGE DETECTION ========== */
const isIndexPage = !!document.getElementById("heartsContainer");
const isCelebrationPage = !!document.getElementById("confettiCanvas");

if (isCelebrationPage) {
    document.body.classList.add("celebration-page");
} else if (isIndexPage) {
    document.body.classList.add("index-page");
}

/* ========== INDEX PAGE: Floating items & particles ========== */
function createFloatingItems() {
    const container = document.getElementById("heartsContainer");
    if (!container) return;
    const items = ["💕", "💖", "💗", "💓", "💝", "💘", "❤️", "🌸", "🌺", "✨", "💫", "🦋"];
    for (let i = 0; i < 25; i++) {
        const item = document.createElement("div");
        item.className = "floating-item";
        item.innerHTML = items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 100 + "vw";
        item.style.animationDuration = Math.random() * 12 + 12 + "s";
        item.style.animationDelay = Math.random() * 10 + "s";
        item.style.fontSize = Math.random() * 15 + 12 + "px";
        container.appendChild(item);
    }
}

function createParticles() {
    const container = document.getElementById("heartsContainer");
    if (!container) return;
    const style = getComputedStyle(document.documentElement);
    const primary = style.getPropertyValue("--color-primary").trim() || "#ff69b4";
    const secondary = style.getPropertyValue("--color-secondary").trim() || "#a855f7";
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        particle.style.left = Math.random() * 100 + "vw";
        particle.style.top = Math.random() * 100 + "vh";
        particle.style.animationDelay = Math.random() * 2 + "s";
        particle.style.background = Math.random() > 0.5 ? primary : secondary;
        container.appendChild(particle);
    }
}

/* ========== INDEX PAGE: No button & Yes ========== */
let runAwayCount = 0;
let messageTimeout = null;

const funnyMessages = [
    "Haha! Nice try, Lalabs! 😜💕",
    "Nope! That button is scared of you! 😏",
    "The No button says: 'I don't think so!' 💖",
    "Aww, just say Yes already! 😘",
    "That button is playing hard to get! 🙈",
    "You can't catch it, Lalabs! 😄",
    "It's running away from you! 💕",
    "The No button has left the chat! 😝",
    "Wrong button! ➡️ Yes is waiting!",
    "Lalabs, resistance is futile! 💘",
    "That button is too shy! 🙊",
    "Keep trying... or just click Yes! 😉",
    "🧸 The teddy wants you to say Yes!",
    "The teddy is judging you! 🧸😂",
    "Make the teddy happy, Lalabs! 🧸💖",
];

function runAway() {
    const noBtn = document.getElementById("noBtn");
    const yesBtn = document.getElementById("yesBtn");
    const hoverMessage = document.getElementById("hoverMessage");
    if (!noBtn || !yesBtn || !hoverMessage) return;

    const yesBtnRect = yesBtn.getBoundingClientRect();
    const yesCenterX = yesBtnRect.left + yesBtnRect.width / 2;
    const yesCenterY = yesBtnRect.top + yesBtnRect.height / 2;
    const minRadius = 100;
    const maxRadius = 180;
    const angle = Math.random() * Math.PI * 2;
    const distance = minRadius + Math.random() * (maxRadius - minRadius);
    let newX = yesCenterX + Math.cos(angle) * distance;
    let newY = yesCenterY + Math.sin(angle) * distance;
    const noBtnRect = noBtn.getBoundingClientRect();
    const btnWidth = noBtnRect.width;
    const btnHeight = noBtnRect.height;
    const padding = 15;
    newX = Math.max(padding, Math.min(newX - btnWidth / 2, window.innerWidth - btnWidth - padding));
    newY = Math.max(padding, Math.min(newY - btnHeight / 2, window.innerHeight - btnHeight - padding));

    noBtn.style.position = "fixed";
    noBtn.style.left = newX + "px";
    noBtn.style.top = newY + "px";
    noBtn.style.transform = `rotate(${Math.random() * 16 - 8}deg)`;
    noBtn.style.zIndex = "999";

    runAwayCount++;
    if (messageTimeout) clearTimeout(messageTimeout);
    hoverMessage.textContent = funnyMessages[runAwayCount % funnyMessages.length];
    hoverMessage.classList.add("show");
    messageTimeout = setTimeout(() => hoverMessage.classList.remove("show"), 4000);

    const scale = Math.min(1.25, 1 + runAwayCount * 0.025);
    yesBtn.style.transform = `scale(${scale})`;
    if (runAwayCount > 3) {
        yesBtn.style.boxShadow = `0 10px 30px rgba(var(--glow-primary), 0.6), 0 0 ${
            15 + runAwayCount * 4
        }px rgba(var(--glow-primary), 0.5)`;
    }
    if (runAwayCount > 5) {
        noBtn.style.fontSize = Math.max(0.85, 1 - runAwayCount * 0.02) + "rem";
    }
    if (runAwayCount > 10) {
        noBtn.style.opacity = Math.max(0.4, 1 - (runAwayCount - 10) * 0.1);
    }
    if (runAwayCount === 15) noBtn.textContent = "Fine! 😅";
    if (runAwayCount === 20) noBtn.textContent = "Ok ok! 🏳️";
}

function sayYes() {
    createHeartBurst();
    document.body.style.transition = "all 0.5s ease";
    const style = getComputedStyle(document.documentElement);
    const secondary = style.getPropertyValue("--color-secondary").trim() || "#a855f7";
    const bgStart = style.getPropertyValue("--bg-body-start").trim() || "#0f0c29";
    document.body.style.background = `radial-gradient(circle, ${secondary} 0%, ${bgStart} 100%)`;
    setTimeout(() => {
        window.location.href = "celebration.html";
    }, 800);
}

function createHeartBurst() {
    const items = ["💕", "💖", "💗", "💓", "💝", "💘", "❤️", "🧸", "✨"];
    const yesBtn = document.getElementById("yesBtn");
    if (!yesBtn) return;
    const rect = yesBtn.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    for (let i = 0; i < 40; i++) {
        const item = document.createElement("div");
        item.innerHTML = items[Math.floor(Math.random() * items.length)];
        item.style.position = "fixed";
        item.style.left = centerX + "px";
        item.style.top = centerY + "px";
        item.style.fontSize = Math.random() * 25 + 15 + "px";
        item.style.pointerEvents = "none";
        item.style.zIndex = "1000";
        item.style.transition = "all 0.7s ease-out";
        document.body.appendChild(item);
        setTimeout(() => {
            const angle = (Math.PI * 2 * i) / 40;
            const distance = 80 + Math.random() * 150;
            item.style.transform = `translate(${Math.cos(angle) * distance}px, ${
                Math.sin(angle) * distance
            }px) scale(0)`;
            item.style.opacity = "0";
        }, 10);
        setTimeout(() => item.remove(), 800);
    }
}

/* ========== CELEBRATION PAGE: Confetti ========== */
const confettiColors = [
    "#ff69b4",
    "#ff1493",
    "#a855f7",
    "#ffb6c1",
    "#ff85a2",
    "#ffd700",
    "#ffffff",
    "#ee82ee",
    "#da70d6",
];
const confettiShapes = ["circle", "square", "heart", "star"];
let confettiParticles = [];

class Confetti {
    constructor(fromCenter = false) {
        this.reset(fromCenter);
    }

    reset(fromCenter = false) {
        const canvas = document.getElementById("confettiCanvas");
        if (!canvas) return;
        if (fromCenter) {
            this.x = canvas.width / 2 + (Math.random() - 0.5) * 100;
            this.y = canvas.height / 2;
            this.speedY = Math.random() * 15 - 12;
            this.speedX = Math.random() * 20 - 10;
        } else {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * -canvas.height;
            this.speedY = Math.random() * 0.5 + 0.2;
            this.speedX = Math.random() * 0.8 - 0.3;
        }
        this.size = Math.random() * 10 + 5;
        this.color = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        this.shape = confettiShapes[Math.floor(Math.random() * confettiShapes.length)];
        this.rotation = Math.random() * 360;
        this.rotationSpeed = Math.random() * 10 - 5;
        this.wobble = Math.random() * 10;
        this.wobbleSpeed = Math.random() * 0.1;
    }

    update() {
        const canvas = document.getElementById("confettiCanvas");
        if (!canvas) return;
        this.y += this.speedY;
        this.x += this.speedX + Math.sin(this.wobble) * 0.3;
        this.rotation += this.rotationSpeed;
        this.wobble += this.wobbleSpeed;
        this.speedY += 0.005;
        if (this.y > canvas.height + 50) this.reset(false);
    }

    draw() {
        const canvas = document.getElementById("confettiCanvas");
        const ctx = canvas && canvas.getContext("2d");
        if (!ctx) return;
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate((this.rotation * Math.PI) / 180);
        ctx.fillStyle = this.color;
        switch (this.shape) {
            case "circle":
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
                break;
            case "square":
                ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
                break;
            case "heart":
                ctx.beginPath();
                ctx.moveTo(0, this.size / 4);
                ctx.bezierCurveTo(
                    this.size / 2,
                    -this.size / 4,
                    this.size / 2,
                    -this.size / 2,
                    0,
                    -this.size / 4
                );
                ctx.bezierCurveTo(
                    -this.size / 2,
                    -this.size / 2,
                    -this.size / 2,
                    -this.size / 4,
                    0,
                    this.size / 4
                );
                ctx.fill();
                break;
            case "star":
                const spikes = 5;
                const outerRadius = this.size / 2;
                const innerRadius = this.size / 4;
                ctx.beginPath();
                for (let i = 0; i < spikes * 2; i++) {
                    const radius = i % 2 === 0 ? outerRadius : innerRadius;
                    const angle = (i * Math.PI) / spikes - Math.PI / 2;
                    const x = Math.cos(angle) * radius;
                    const y = Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();
                break;
        }
        ctx.restore();
    }
}

function createConfetti(count = 120) {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;
    for (let i = 0; i < count; i++) {
        const particle = new Confetti(false);
        particle.y = Math.random() * canvas.height;
        confettiParticles.push(particle);
    }
}

function animateConfetti() {
    const canvas = document.getElementById("confettiCanvas");
    const ctx = canvas && canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    confettiParticles.forEach((p) => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateConfetti);
}

function burstConfetti() {
    for (let i = 0; i < 80; i++) {
        confettiParticles.push(new Confetti(true));
    }
    playPopSound();
    if (confettiParticles.length > 350) {
        confettiParticles = confettiParticles.slice(-350);
    }
}

/* ========== CELEBRATION: Floating background ========== */
function createFloatingBg() {
    const container = document.getElementById("floatingBg");
    if (!container) return;
    const items = ["💕", "💖", "💗", "✨", "💫", "🦋", "🌸", "💜"];
    for (let i = 0; i < 20; i++) {
        const item = document.createElement("div");
        item.className = "floating-item";
        item.innerHTML = items[Math.floor(Math.random() * items.length)];
        item.style.left = Math.random() * 100 + "vw";
        item.style.top = Math.random() * 100 + "vh";
        item.style.fontSize = Math.random() * 30 + 20 + "px";
        item.style.animationDelay = Math.random() * 5 + "s";
        item.style.animationDuration = Math.random() * 10 + 10 + "s";
        container.appendChild(item);
    }
}

/* ========== CELEBRATION: Emoji rain ========== */
function startEmojiRain() {
    const emojis = ["💕", "💖", "🌸", "✨", "💫", "🦋", "💗", "🌺"];
    setInterval(() => {
        const emoji = document.createElement("div");
        emoji.className = "emoji-rain";
        emoji.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        emoji.style.left = Math.random() * 100 + "vw";
        emoji.style.animationDuration = Math.random() * 4 + 4 + "s";
        document.body.appendChild(emoji);
        setTimeout(() => emoji.remove(), 8000);
    }, 700);
}

/* ========== CELEBRATION: Love jar ========== */
const loveReasons = [
    { emoji: "😊", text: "I love your beautiful smile" },
    { emoji: "💭", text: "I love how you always ask my day!" },
    { emoji: "🎵", text: "I love your laugh, it's my favorite sound in the universe." },
    { emoji: "🤗", text: "I love how safe and warm I feel when I'm with you." },
    { emoji: "✨", text: "I love how you make ordinary moments feel special." },
    { emoji: "💪", text: "I love how you support me and believe in me always." },
    { emoji: "💕", text: "I love that you chose me, and I'd choose you in every lifetime." },
    { emoji: "🦋", text: "I love the butterflies I still get when I see you." },
    { emoji: "🌈", text: "I love how you bring color and joy into my life." },
    { emoji: "🌟", text: "I love how you inspire me to be a better person every day." },
    { emoji: "🤝", text: "I love that you're my best friend." },
    { emoji: "🥰", text: "I love the way you look at me, like I'm your whole world." },
    { emoji: "💖", text: "I love you simply because you're YOU, Lalabs." },
    { emoji: "🏠", text: "I love how anywhere feels like home when I'm with you." },
    { emoji: "💫", text: "I love every little thing about you, the list is endless." },
];
let currentReasonIndex = 0;

function openLoveNote() {
    const popup = document.getElementById("loveNotePopup");
    const overlay = document.getElementById("overlay");
    if (!popup || !overlay) return;
    const reason = loveReasons[currentReasonIndex];
    document.getElementById("noteEmoji").textContent = reason.emoji;
    document.getElementById("noteText").textContent = reason.text;
    document.getElementById("noteNumber").textContent = `Reason #${currentReasonIndex + 1} of ${
        loveReasons.length
    }`;
    overlay.classList.add("show");
    popup.classList.add("show");
    currentReasonIndex = (currentReasonIndex + 1) % loveReasons.length;
    for (let i = 0; i < 20; i++) confettiParticles.push(new Confetti(true));
}

function closeLoveNote() {
    const popup = document.getElementById("loveNotePopup");
    const overlay = document.getElementById("overlay");
    if (popup) popup.classList.remove("show");
    if (overlay) overlay.classList.remove("show");
}

/* ========== CELEBRATION: Virtual hug ========== */
function sendVirtualHug() {
    const hugAnimation = document.getElementById("hugAnimation");
    const hugMessage = document.getElementById("hugMessage");
    if (hugAnimation) hugAnimation.classList.add("show");
    if (hugMessage) hugMessage.classList.add("show");
    burstConfetti();
    for (let i = 0; i < 30; i++) {
        setTimeout(() => createFloatingHeart(), i * 80);
    }
    setTimeout(() => {
        if (hugAnimation) hugAnimation.classList.remove("show");
        if (hugMessage) hugMessage.classList.remove("show");
    }, 3500);
}

function createFloatingHeart() {
    const hearts = ["💕", "💖", "💗", "💓", "💝", "🤗"];
    const heart = document.createElement("div");
    heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
    heart.style.position = "fixed";
    heart.style.left = Math.random() * 80 + 10 + "vw";
    heart.style.top = Math.random() * 80 + 10 + "vh";
    heart.style.fontSize = Math.random() * 30 + 20 + "px";
    heart.style.pointerEvents = "none";
    heart.style.zIndex = "2999";
    heart.style.animation = "pop-heart 1.5s ease-out forwards";
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 1500);
}

/* ========== CELEBRATION: Love meter ========== */
let loveLevel = 0;
let isInfinityMode = false;
let infinityTimeout = null;
const loveMeterMessages = [
    "Keep tapping! 💕",
    "Love is growing! 💖",
    "So much love! 💗",
    "Almost there! 💓",
    "Overflowing! 💝",
];

function fillLoveMeter(amount = 10, sourceX = null, sourceY = null) {
    if (sourceX !== null && sourceY !== null) showMeterFillIndicator(sourceX, sourceY);
    if (isInfinityMode) return;
    loveLevel = Math.min(100, loveLevel + amount);
    const fill = document.getElementById("loveMeterFill");
    const text = document.getElementById("loveMeterText");
    if (fill) fill.style.width = loveLevel + "%";
    if (text) {
        if (loveLevel < 20) text.textContent = loveMeterMessages[0];
        else if (loveLevel < 40) text.textContent = loveMeterMessages[1];
        else if (loveLevel < 60) text.textContent = loveMeterMessages[2];
        else if (loveLevel < 80) text.textContent = loveMeterMessages[3];
        else if (loveLevel < 100) text.textContent = loveMeterMessages[4];
    }
    if (loveLevel >= 100) morphToInfinity();
}

function morphToInfinity() {
    isInfinityMode = true;
    const meterContainer = document.getElementById("loveMeterContainer");
    const infinityContainer = document.getElementById("infinityContainer");
    const text = document.getElementById("loveMeterText");
    if (meterContainer) meterContainer.classList.add("morphing");
    setTimeout(() => {
        if (infinityContainer) infinityContainer.classList.add("show");
        if (text) {
            text.textContent = "∞ Infinite Love for Lalabs ∞";
            text.classList.add("infinity-text");
        }
        burstConfetti();
    }, 300);
    infinityTimeout = setTimeout(morphBackToBar, 2500);
}

function morphBackToBar() {
    const meterContainer = document.getElementById("loveMeterContainer");
    const infinityContainer = document.getElementById("infinityContainer");
    const fill = document.getElementById("loveMeterFill");
    const text = document.getElementById("loveMeterText");
    if (infinityContainer) infinityContainer.classList.remove("show");
    setTimeout(() => {
        if (fill) {
            fill.style.transition = "none";
            fill.style.width = "0%";
            fill.offsetHeight;
            fill.style.transition = "width 0.3s ease";
        }
        if (meterContainer) meterContainer.classList.remove("morphing");
        if (text) {
            text.textContent = "Let's fill it again! 💕";
            text.classList.remove("infinity-text");
        }
        loveLevel = 0;
        isInfinityMode = false;
    }, 300);
}

function showMeterFillIndicator(x, y) {
    const indicators = ["💕", "💖", "+10", "💗", "+5"];
    const indicator = document.createElement("div");
    indicator.className = "meter-fill-indicator";
    indicator.innerHTML = indicators[Math.floor(Math.random() * indicators.length)];
    indicator.style.left = x + "px";
    indicator.style.top = y + "px";
    const style = getComputedStyle(document.documentElement);
    const accent = style.getPropertyValue("--color-accent").trim() || "#ffd700";
    if (indicator.innerHTML.includes("+")) {
        indicator.style.color = accent;
        indicator.style.fontWeight = "bold";
        indicator.style.fontSize = "20px";
        indicator.style.textShadow = `0 0 10px ${accent}80`;
    }
    document.body.appendChild(indicator);
    setTimeout(() => indicator.remove(), 800);
}

/* ========== CELEBRATION: Unified interaction ========== */
function handleInteraction(event, type) {
    const x = event.clientX ?? event.touches?.[0]?.clientX ?? window.innerWidth / 2;
    const y = event.clientY ?? event.touches?.[0]?.clientY ?? window.innerHeight / 2;
    fillLoveMeter(10, x, y);
    createClickHeart(event);
    switch (type) {
        case "confetti":
            burstConfetti();
            break;
        case "hug":
            sendVirtualHug();
            break;
        case "jar":
            openLoveNote();
            break;
        case "heart":
            burstConfetti();
            break;
    }
}

function createClickHeart(e) {
    const hearts = ["💕", "💖", "💗", "💓", "💝"];
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? window.innerWidth / 2;
    const y = e.clientY ?? e.touches?.[0]?.clientY ?? window.innerHeight / 2;
    for (let i = 0; i < 3; i++) {
        setTimeout(() => {
            const heart = document.createElement("div");
            heart.className = "click-heart";
            heart.innerHTML = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = x - 15 + (Math.random() - 0.5) * 40 + "px";
            heart.style.top = y - 15 + (Math.random() - 0.5) * 40 + "px";
            heart.style.fontSize = Math.random() * 20 + 20 + "px";
            document.body.appendChild(heart);
            setTimeout(() => heart.remove(), 1000);
        }, i * 80);
    }
}

/* ========== CELEBRATION: Countdown ========== */
// function updateCountdown() {
//   const section = document.getElementById("countdownSection");
//   if (!section) return;
//   const valentinesDay = new Date("February 14, 2025 00:00:00").getTime();
//   const now = new Date().getTime();
//   const distance = valentinesDay - now;
//   if (distance < 0) {
//     section.innerHTML = `
//       <p class="countdown-title" style="color: var(--color-primary); font-size: 1.5rem;">🎉 Happy Valentine's Day, Lalabs! 🎉</p>
//       <p style="color: #e0e0e0; font-size: 1.2rem; margin-top: 10px;">Today is OUR special day! 💕</p>
//     `;
//     return;
//   }
//   const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((distance % (1000 * 60)) / 1000);
//   const pad = (n) => String(n).padStart(2, "0");
//   const el = (id) => document.getElementById(id);
//   if (el("days")) el("days").textContent = pad(days);
//   if (el("hours")) el("hours").textContent = pad(hours);
//   if (el("minutes")) el("minutes").textContent = pad(minutes);
//   if (el("seconds")) el("seconds").textContent = pad(seconds);
// }

/* ========== CELEBRATION: Sound ========== */
function playPopSound() {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        oscillator.frequency.value = 600;
        oscillator.type = "sine";
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.15);
    } catch (_) {}
}

/* ========== MUSIC (both pages) ========== */
function setupMusic(startTime = 11) {
    const music = document.getElementById("bgMusic");
    const musicBtn = document.getElementById("musicToggle");
    if (!music || !musicBtn) return;
    let isMusicPlaying = false;
    let hasMusicInteracted = false;

    music.volume = 0.4;

    const barsContainer = document.createElement("div");
    barsContainer.className = "music-bars";
    for (let i = 0; i < 4; i++) {
        const bar = document.createElement("div");
        bar.className = "music-bar";
        barsContainer.appendChild(bar);
    }
    musicBtn.innerHTML = "";
    musicBtn.appendChild(document.createTextNode("🎵"));

    function startMusic() {
        music.currentTime = startTime;
        music
            .play()
            .then(() => {
                isMusicPlaying = true;
                hasMusicInteracted = true;
                updateMusicButton();
            })
            .catch(() => {});
    }

    function updateMusicButton() {
        if (isMusicPlaying) {
            musicBtn.innerHTML = "";
            musicBtn.appendChild(barsContainer.cloneNode(true));
            musicBtn.classList.add("playing");
        } else {
            musicBtn.innerHTML = "🎵";
            musicBtn.classList.remove("playing");
        }
    }

    function toggleMusic(e) {
        e.stopPropagation();
        if (!hasMusicInteracted) {
            startMusic();
            return;
        }
        if (isMusicPlaying) {
            music.pause();
            isMusicPlaying = false;
        } else {
            music.currentTime = startTime;
            music.play();
            isMusicPlaying = true;
        }
        updateMusicButton();
    }

    musicBtn.addEventListener("click", toggleMusic);

    const interactionEvents = ["click", "touchstart", "mousemove", "scroll", "keydown"];
    function onFirstInteraction(e) {
        if (hasMusicInteracted) return;
        if (e.target.id === "musicToggle") return;
        startMusic();
        interactionEvents.forEach((ev) => document.removeEventListener(ev, onFirstInteraction));
    }
    function addListeners() {
        interactionEvents.forEach((ev) =>
            document.addEventListener(ev, onFirstInteraction, { passive: true })
        );
    }

    music.currentTime = startTime;
    music
        .play()
        .then(() => {
            isMusicPlaying = true;
            hasMusicInteracted = true;
            updateMusicButton();
        })
        .catch(addListeners);

    document.addEventListener("visibilitychange", () => {
        if (!hasMusicInteracted) return;
        if (document.hidden && isMusicPlaying) music.pause();
        else if (!document.hidden && isMusicPlaying) music.play();
    });

    music.addEventListener("ended", () => {
        music.currentTime = startTime;
        music.play();
    });
    music.addEventListener("timeupdate", () => {
        if (music.duration - music.currentTime < 0.5) music.currentTime = startTime;
    });
}

/* ========== INIT: Index page ========== */
function initIndex() {
    createFloatingItems();
    createParticles();
    setupMusic(11);
    console.log("%c💕 A special surprise for Lalabs! 💕", "font-size: 20px; color: #ff69b4;");
    console.log("%c🧸 The teddy is rooting for you!", "font-size: 14px; color: #a855f7;");
}

/* ========== INIT: Celebration page ========== */
function initCelebration() {
    const canvas = document.getElementById("confettiCanvas");
    if (!canvas) return;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    createConfetti(120);
    animateConfetti();
    createFloatingBg();
    startEmojiRain();
    // updateCountdown();
    // setInterval(updateCountdown, 1000);
    setTimeout(() => burstConfetti(), 500);
    setupMusic(9);

    setTimeout(() => {
        const autoFill = setInterval(() => {
            if (loveLevel < 15 && !isInfinityMode) {
                loveLevel += 1;
                const fill = document.getElementById("loveMeterFill");
                if (fill) fill.style.width = loveLevel + "%";
            } else clearInterval(autoFill);
        }, 300);
    }, 2000);

    document.addEventListener("click", (e) => {
        if (
            e.target.closest(".love-jar") ||
            e.target.closest(".action-btn") ||
            e.target.closest(".close-note-btn") ||
            e.target.closest(".mega-heart") ||
            e.target.closest(".love-meter-container") ||
            e.target.closest(".love-meter-wrapper") ||
            e.target.closest(".music-btn")
        )
            return;
        createClickHeart(e);
        fillLoveMeter(5, e.clientX, e.clientY);
    });

    let lastSparkleTime = 0;
    document.addEventListener("mousemove", (e) => {
        const now = Date.now();
        if (now - lastSparkleTime > 50) {
            lastSparkleTime = now;
            const sparkle = document.createElement("div");
            sparkle.className = "sparkle";
            sparkle.style.left = e.clientX - 4 + "px";
            sparkle.style.top = e.clientY - 4 + "px";
            const style = getComputedStyle(document.documentElement);
            const primary = style.getPropertyValue("--color-primary").trim() || "#ff69b4";
            const secondary = style.getPropertyValue("--color-secondary").trim() || "#a855f7";
            sparkle.style.background =
                Math.random() > 0.5
                    ? `radial-gradient(circle, ${primary}, transparent)`
                    : `radial-gradient(circle, ${secondary}, transparent)`;
            document.body.appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 600);
        }
    });

    document.addEventListener("touchstart", (e) => {
        if (
            e.target.closest(".love-jar") ||
            e.target.closest(".action-btn") ||
            e.target.closest(".close-note-btn") ||
            e.target.closest(".mega-heart") ||
            e.target.closest(".love-meter-container") ||
            e.target.closest(".love-meter-wrapper") ||
            e.target.closest(".music-btn")
        )
            return;
        const t = e.touches[0];
        createClickHeart({ clientX: t.clientX, clientY: t.clientY });
        fillLoveMeter(5, t.clientX, t.clientY);
    });

    document.addEventListener("keydown", (e) => {
        const k = e.key.toLowerCase();
        if (k === "l") {
            burstConfetti();
            fillLoveMeter(20);
        }
        if (k === "h") {
            sendVirtualHug();
            fillLoveMeter(15);
        }
        if (k === "k") {
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const heart = document.createElement("div");
                    heart.innerHTML = "💖";
                    heart.style.cssText =
                        "position:fixed;left:" +
                        Math.random() * 100 +
                        "vw;top:" +
                        Math.random() * 100 +
                        "vh;font-size:" +
                        (Math.random() * 40 + 20) +
                        "px;pointer-events:none;z-index:999;animation:pop-heart 1.5s ease-out forwards;";
                    document.body.appendChild(heart);
                    setTimeout(() => heart.remove(), 1500);
                }, i * 50);
            }
            fillLoveMeter(50);
        }
        if (k === "i" && !isInfinityMode) {
            loveLevel = 100;
            const fill = document.getElementById("loveMeterFill");
            if (fill) fill.style.width = "100%";
            morphToInfinity();
        }
        if (k === "j") {
            openLoveNote();
            fillLoveMeter(10);
        }
        if (k === "c") {
            burstConfetti();
            fillLoveMeter(10);
        }
        if (k === "g") {
            sendVirtualHug();
            fillLoveMeter(15);
        }
    });

    console.log(
        "%c💕 Made with infinite love for Lalabs! 💕",
        "font-size: 24px; color: #ff69b4; font-weight: bold;"
    );
    console.log(
        "%c🎹 L=confetti H=hug K=special I=infinity J=jar C=confetti G=hug",
        "font-size: 12px; color: #a855f7;"
    );
}

/* ========== Run appropriate init ========== */
if (isIndexPage) {
    initIndex();
} else if (isCelebrationPage) {
    initCelebration();
}
