class EmojiCursor {
    constructor() {
        this.emojis = ["😊", "🎮", "💻", "🏀", "📚", "🎵", "✨", "💡", "🚀", "🎯"];
        this.container = document.createElement('div');
        this.container.style.position = 'fixed';
        this.container.style.pointerEvents = 'none';
        this.container.style.zIndex = '9999';
        document.body.appendChild(this.container);

        // Control parameters
        this.lastTime = 0;
        this.throttleDelay = 200;  // Reduce delay to make generation smoother
        this.emojiCount = 1;      // Generate only 1 emoji at a time, but frequently

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            const currentTime = Date.now();
            if (currentTime - this.lastTime >= this.throttleDelay) {
                // Generate around the mouse position
                const offsetX = (Math.random() - 0.5) * 20; // Reduce random offset
                const offsetY = (Math.random() - 0.5) * 20;
                this.createEmoji(e.clientX + offsetX, e.clientY + offsetY);
                this.lastTime = currentTime;
            }
        });
    }

    createEmoji(x, y) {
        const emoji = document.createElement('span');
        emoji.textContent = this.emojis[Math.floor(Math.random() * this.emojis.length)];
        emoji.style.position = 'fixed';
        emoji.style.left = (x - 10) + 'px';
        emoji.style.top = (y - 10) + 'px';
        emoji.style.fontSize = '20px';
        emoji.style.pointerEvents = 'none';

        // Add random rotation to each emoji
        const rotation = (Math.random() - 0.5) * 30; // Reduce rotation angle

        emoji.animate([
            {
                transform: `translate(-50%, -50%) rotate(${rotation}deg) scale(1)`,
                opacity: 1
            },
            {
                transform: `translate(-50%, -80px) rotate(${rotation}deg) scale(1.2)`, // 减小上升高度和缩放
                opacity: 0
            }
        ], {
            duration: 1000, // Reduce animation time
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
        });

        this.container.appendChild(emoji);

        setTimeout(() => {
            emoji.remove();
        }, 1000);
    }
}

// Initialize immediately
document.addEventListener('DOMContentLoaded', () => {
    new EmojiCursor();
}); 