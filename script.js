// Sample data - Replace with your actual data
const projectsData = [
    {
        title: "Project 1",
        description: "A brief description of project 1",
        technologies: ["HTML", "CSS", "JavaScript"],
        link: "#"
    },
    {
        title: "Project 2",
        description: "A brief description of project 2",
        technologies: ["React", "Node.js", "MongoDB"],
        link: "#"
    }
];

const experienceData = [
    {
        title: "Senior Developer",
        company: "Tech Corp",
        period: "2020 - Present",
        description: "Led development team in creating innovative solutions"
    },
    {
        title: "Web Developer",
        company: "Digital Agency",
        period: "2018 - 2020",
        description: "Developed responsive websites and web applications"
    }
];

const skillsData = [
    "HTML5", "CSS3", "JavaScript", "React",
    "Node.js", "Python", "Git", "AWS"
];

// Navigation
document.querySelectorAll('.nav-btn').forEach(button => {
    button.addEventListener('click', () => {
        const section = button.dataset.section;
        document.querySelectorAll('section').forEach(s => s.classList.remove('active'));
        document.getElementById(section).classList.add('active');
    });
});

// Populate projects
const projectsContainer = document.querySelector('.project-grid');
projectsData.forEach(project => {
    const projectElement = document.createElement('div');
    projectElement.className = 'project-card';
    projectElement.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <div class="technologies">
            ${project.technologies.map(tech => `<span>${tech}</span>`).join(', ')}
        </div>
        <a href="${project.link}" target="_blank">View Project</a>
    `;
    projectsContainer.appendChild(projectElement);
});

// Populate experience
const timelineContainer = document.querySelector('.timeline');
experienceData.forEach((exp, index) => {
    const expElement = document.createElement('div');
    expElement.className = 'timeline-item';
    expElement.innerHTML = `
        <div class="timeline-content ${index % 2 === 0 ? 'left' : 'right'}">
            <h3>${exp.title}</h3>
            <h4>${exp.company}</h4>
            <p class="period">${exp.period}</p>
            <p>${exp.description}</p>
        </div>
    `;
    timelineContainer.appendChild(expElement);
});

// Populate skills
const skillsContainer = document.querySelector('.skills-grid');
skillsData.forEach(skill => {
    const skillElement = document.createElement('div');
    skillElement.className = 'skill-item';
    skillElement.textContent = skill;
    skillsContainer.appendChild(skillElement);
});

// Form handling
document.getElementById('contact-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert('Message sent! (Demo only)');
});

// Add retro typing effect to headings
document.querySelectorAll('h2').forEach(heading => {
    const text = heading.textContent;
    heading.textContent = '';
    let i = 0;
    const typeText = () => {
        if (i < text.length) {
            heading.textContent += text.charAt(i);
            i++;
            setTimeout(typeText, 100);
        }
    };
    typeText();
});

// Add glitch effect randomly
setInterval(() => {
    const glitchElements = document.querySelectorAll('.glitch');
    glitchElements.forEach(element => {
        element.style.animation = 'none';
        void element.offsetWidth;
        element.style.animation = null;
    });
}, 3000);

// Neon background animation
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Neon colors
const neonColors = [
    '#ff2d95', // pink
    '#0ff0fc', // blue
    '#8a2be2', // purple
    '#fff95b'  // yellow
];

// Particle system
class NeonParticle {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        this.color = neonColors[Math.floor(Math.random() * neonColors.length)];
        this.life = 1;
        this.decay = 0.005 + Math.random() * 0.01;
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.life -= this.decay;

        if (this.life <= 0 || 
            this.x < 0 || 
            this.x > canvas.width || 
            this.y < 0 || 
            this.y > canvas.height) {
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.life;
        ctx.fill();
        
        // Add glow effect
        ctx.shadowBlur = 15;
        ctx.shadowColor = this.color;
        ctx.fill();
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;
    }
}

// Create particle system
const particles = Array(100).fill().map(() => new NeonParticle());

// Grid lines
function drawGrid() {
    ctx.strokeStyle = '#1a1a2e';
    ctx.lineWidth = 1;
    
    // Vertical lines
    for (let x = 0; x < canvas.width; x += 30) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }
    
    // Horizontal lines
    for (let y = 0; y < canvas.height; y += 30) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
}

// Drawing function
function draw() {
    ctx.fillStyle = 'rgba(10, 10, 15, 0.2)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();

    // Update and draw particles
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });

    // Draw random neon lines
    const time = Date.now() * 0.001;
    for (let i = 0; i < 3; i++) {
        const startX = Math.sin(time + i) * canvas.width/3 + canvas.width/2;
        const startY = Math.cos(time + i) * canvas.height/3 + canvas.height/2;
        const endX = Math.sin(time * 0.5 + i) * canvas.width/3 + canvas.width/2;
        const endY = Math.cos(time * 0.5 + i) * canvas.height/3 + canvas.height/2;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);
        ctx.strokeStyle = neonColors[i % neonColors.length];
        ctx.lineWidth = 2;
        ctx.stroke();

        // Add glow effect
        ctx.shadowBlur = 20;
        ctx.shadowColor = neonColors[i % neonColors.length];
        ctx.stroke();
        ctx.shadowBlur = 0;
    }
}

// Animation loop
function animate() {
    draw();
    requestAnimationFrame(animate);
}

animate();
