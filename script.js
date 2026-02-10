document.addEventListener('DOMContentLoaded', () => {
    initTiltEffect();
    initTypewriterEffect();
});

function initTiltEffect() {
    const cards = document.querySelectorAll('.glass-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
    });

    function handleMouseMove(e) {
        const card = this;
        const cardRect = card.getBoundingClientRect();

        // Calculate mouse position relative to the center of the card
        const x = e.clientX - cardRect.left - cardRect.width / 2;
        const y = e.clientY - cardRect.top - cardRect.height / 2;

        // Calculate rotation (max 10 degrees)
        const rotateX = (y / (cardRect.height / 2)) * -5;
        const rotateY = (x / (cardRect.width / 2)) * 5;

        // Apply transform
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        card.style.transition = 'transform 0.1s ease';

        // Add a subtle shine effect
        const shine = `radial-gradient(circle at ${e.clientX - cardRect.left}px ${e.clientY - cardRect.top}px, rgba(255,255,255,0.1), transparent 40%)`;
        card.style.backgroundImage = `linear-gradient(rgba(22, 27, 34, 0.7), rgba(22, 27, 34, 0.7)), ${shine}`;
    }

    function handleMouseLeave() {
        this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        this.style.transition = 'transform 0.5s ease';
        this.style.backgroundImage = ''; // Reset background
    }
}

function initTypewriterEffect() {
    const codeElement = document.querySelector('.code-block-decoration code');
    if (!codeElement) return;

    const fullText = `const developer = {
  name: "Haoyang Lu",
  role: "Fullstack Developer",
  location: "Oslo/Bamble",
  skills: [
    "C#", "React", "Python", 
    "TypeScript", "Elixir"
  ]
};`;

    codeElement.textContent = ''; // Clear initial content
    codeElement.style.whiteSpace = 'pre'; // Preserve formatting

    let i = 0;
    const speed = 30; // Typing speed in ms

    function typeWriter() {
        if (i < fullText.length) {
            codeElement.textContent += fullText.charAt(i);
            i++;
            setTimeout(typeWriter, speed + (Math.random() * 20)); // Add slight randomness for realism
        } else {
            // Add a blinking cursor at the end
            const cursor = document.createElement('span');
            cursor.className = 'cursor';
            cursor.textContent = '|';
            codeElement.appendChild(cursor);
        }
    }

    // Start typing after a small delay
    setTimeout(typeWriter, 1000);
}
