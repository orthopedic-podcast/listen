// Hamburger Menu Toggle
const hamburgerMenu = document.querySelector('.hamburger-menu');
const mobileNav = document.querySelector('.mobile-nav');

hamburgerMenu.addEventListener('click', () => {
    hamburgerMenu.classList.toggle('active');
    mobileNav.classList.toggle('show');
});

// Tab Navigation
const desktopTabs = document.querySelectorAll('.desktop-nav .tab-btn');
const mobileTabs = document.querySelectorAll('.mobile-nav .tab-btn');
const allTabs = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.content-panel');

function handleTabClick(targetTab) {
    // Update all tab states
    allTabs.forEach(t => {
        if (t.dataset.tab === targetTab) {
            t.classList.add('active');
        } else {
            t.classList.remove('active');
        }
    });
    
    // Show corresponding panel
    panels.forEach(panel => {
        panel.classList.remove('active');
        if (panel.id === targetTab) {
            panel.classList.add('active');
        }
    });
    
    // Scroll to top when switching tabs
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
    
    // Close mobile menu after selecting a tab
    if (mobileNav.classList.contains('show')) {
        mobileNav.classList.remove('show');
        hamburgerMenu.classList.remove('active');
    }
}

// Add event listeners to all tabs
allTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        handleTabClick(tab.dataset.tab);
    });
});

// Episode Player Functionality
class PodcastPlayer {
    constructor() {
        this.currentEpisode = null;
        this.isPlaying = false;
        this.currentTime = 0;
        this.duration = 2142; // Default duration in seconds (35:42)
        
        this.initializePlayer();
    }
    
    initializePlayer() {
        // Initialize all play buttons
        const playButtons = document.querySelectorAll('.play-btn, .play-btn-small');
        playButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                const episodeId = btn.dataset.episode;
                this.togglePlay(episodeId, btn);
            });
        });
        
        // Initialize progress bar click
        const progressBar = document.querySelector('.progress-bar');
        if (progressBar) {
            progressBar.addEventListener('click', (e) => {
                const rect = progressBar.getBoundingClientRect();
                const percent = (e.clientX - rect.left) / rect.width;
                this.seek(percent);
            });
        }
    }
    
    togglePlay(episodeId, button) {
        // Toggle play state
        if (this.currentEpisode === episodeId && this.isPlaying) {
            this.pause(button);
        } else {
            this.play(episodeId, button);
        }
    }
    
    play(episodeId, button) {
        // Update all buttons to show correct state
        document.querySelectorAll('.play-btn, .play-btn-small').forEach(btn => {
            const playIcon = btn.querySelector('.play-icon');
            const pauseIcon = btn.querySelector('.pause-icon');
            if (playIcon && pauseIcon) {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            } else if (btn.classList.contains('play-btn-small')) {
                btn.textContent = '再生';
            }
        });
        
        // Update clicked button
        if (button.classList.contains('play-btn')) {
            const playIcon = button.querySelector('.play-icon');
            const pauseIcon = button.querySelector('.pause-icon');
            if (playIcon && pauseIcon) {
                playIcon.style.display = 'none';
                pauseIcon.style.display = 'block';
            }
        } else {
            button.textContent = '一時停止';
        }
        
        this.currentEpisode = episodeId;
        this.isPlaying = true;
        
        // Start progress animation
        this.startProgress();
    }
    
    pause(button) {
        // Update button
        if (button.classList.contains('play-btn')) {
            const playIcon = button.querySelector('.play-icon');
            const pauseIcon = button.querySelector('.pause-icon');
            if (playIcon && pauseIcon) {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            }
        } else {
            button.textContent = '再生';
        }
        
        this.isPlaying = false;
        this.stopProgress();
    }
    
    seek(percent) {
        this.currentTime = this.duration * percent;
        this.updateProgress();
    }
    
    startProgress() {
        this.stopProgress(); // Clear any existing interval
        
        this.progressInterval = setInterval(() => {
            if (this.currentTime >= this.duration) {
                this.currentTime = 0;
                this.isPlaying = false;
                this.stopProgress();
                this.resetButtons();
                return;
            }
            
            this.currentTime += 1;
            this.updateProgress();
        }, 1000);
    }
    
    stopProgress() {
        if (this.progressInterval) {
            clearInterval(this.progressInterval);
        }
    }
    
    updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const timeDisplay = document.querySelector('.time');
        
        if (progressFill) {
            const percent = (this.currentTime / this.duration) * 100;
            progressFill.style.width = `${percent}%`;
        }
        
        if (timeDisplay) {
            const currentMinutes = Math.floor(this.currentTime / 60);
            const currentSeconds = Math.floor(this.currentTime % 60);
            const durationMinutes = Math.floor(this.duration / 60);
            const durationSeconds = Math.floor(this.duration % 60);
            
            timeDisplay.textContent = `${String(currentMinutes).padStart(2, '0')}:${String(currentSeconds).padStart(2, '0')} / ${String(durationMinutes).padStart(2, '0')}:${String(durationSeconds).padStart(2, '0')}`;
        }
    }
    
    resetButtons() {
        document.querySelectorAll('.play-btn, .play-btn-small').forEach(btn => {
            const playIcon = btn.querySelector('.play-icon');
            const pauseIcon = btn.querySelector('.pause-icon');
            if (playIcon && pauseIcon) {
                playIcon.style.display = 'block';
                pauseIcon.style.display = 'none';
            } else if (btn.classList.contains('play-btn-small')) {
                btn.textContent = '再生';
            }
        });
    }
}

// Initialize player
const player = new PodcastPlayer();

// 3D Medical Visualization
const canvas = document.getElementById('medical-canvas');
if (canvas) {
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // DNA Helix Structure
    class DNAHelix {
        constructor(x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
            this.rotation = 0;
            this.points = [];
            this.generateHelix();
        }
        
        generateHelix() {
            const segments = 60;
            const height = 600;
            const radius = 120;
            
            for (let i = 0; i < segments; i++) {
                const angle = (i / segments) * Math.PI * 4;
                const y = (i / segments) * height - height / 2;
                
                // First strand
                this.points.push({
                    x: Math.cos(angle) * radius,
                    y: y,
                    z: Math.sin(angle) * radius,
                    strand: 1
                });
                
                // Second strand (180 degrees offset)
                this.points.push({
                    x: Math.cos(angle + Math.PI) * radius,
                    y: y,
                    z: Math.sin(angle + Math.PI) * radius,
                    strand: 2
                });
            }
        }
        
        update() {
            this.rotation += 0.01;
        }
        
        project(point) {
            const perspective = 1000;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            // Apply rotation
            const cos = Math.cos(this.rotation);
            const sin = Math.sin(this.rotation);
            const x = point.x * cos - point.z * sin;
            const z = point.x * sin + point.z * cos;
            
            // Add position
            const finalX = x + this.x;
            const finalY = point.y + this.y;
            const finalZ = z + this.z;
            
            // Perspective projection
            const scale = perspective / (perspective + finalZ);
            const projX = finalX * scale + centerX;
            const projY = finalY * scale + centerY;
            
            return { x: projX, y: projY, scale, z: finalZ };
        }
        
        draw() {
            // Draw connections between strands
            for (let i = 0; i < this.points.length - 2; i += 2) {
                const p1 = this.project(this.points[i]);
                const p2 = this.project(this.points[i + 1]);
                
                // Base pair connection
                ctx.strokeStyle = `rgba(0, 168, 255, ${0.2 * p1.scale})`;
                ctx.lineWidth = 2 * p1.scale;
                ctx.beginPath();
                ctx.moveTo(p1.x, p1.y);
                ctx.lineTo(p2.x, p2.y);
                ctx.stroke();
            }
            
            // Draw strands
            for (let strand = 1; strand <= 2; strand++) {
                const strandPoints = this.points.filter(p => p.strand === strand);
                ctx.strokeStyle = strand === 1 
                    ? `rgba(0, 168, 255, 0.6)`
                    : `rgba(94, 96, 206, 0.6)`;
                
                for (let i = 1; i < strandPoints.length; i++) {
                    const p1 = this.project(strandPoints[i - 1]);
                    const p2 = this.project(strandPoints[i]);
                    
                    ctx.lineWidth = 3 * p1.scale;
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
            
            // Draw nodes
            this.points.forEach(point => {
                const p = this.project(point);
                
                // Glow effect
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, 8 * p.scale);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${0.8 * p.scale})`);
                gradient.addColorStop(0.5, point.strand === 1 
                    ? `rgba(0, 168, 255, ${0.4 * p.scale})`
                    : `rgba(94, 96, 206, ${0.4 * p.scale})`);
                gradient.addColorStop(1, 'transparent');
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 8 * p.scale, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }
    
    // Neuron Network
    class NeuronNetwork {
        constructor() {
            this.neurons = [];
            this.connections = [];
            this.generateNetwork();
        }
        
        generateNetwork() {
            // Create neurons in 3D space
            for (let i = 0; i < 25; i++) {
                this.neurons.push({
                    x: (Math.random() - 0.5) * 600,
                    y: (Math.random() - 0.5) * 600,
                    z: (Math.random() - 0.5) * 400,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.5,
                    vz: (Math.random() - 0.5) * 0.5,
                    pulse: Math.random() * Math.PI * 2
                });
            }
            
            // Create connections
            for (let i = 0; i < this.neurons.length; i++) {
                for (let j = i + 1; j < this.neurons.length; j++) {
                    const dist = this.distance(this.neurons[i], this.neurons[j]);
                    if (dist < 250 && Math.random() > 0.5) {
                        this.connections.push({
                            from: i,
                            to: j,
                            strength: Math.random()
                        });
                    }
                }
            }
        }
        
        distance(n1, n2) {
            const dx = n1.x - n2.x;
            const dy = n1.y - n2.y;
            const dz = n1.z - n2.z;
            return Math.sqrt(dx * dx + dy * dy + dz * dz);
        }
        
        update() {
            this.neurons.forEach(neuron => {
                neuron.x += neuron.vx;
                neuron.y += neuron.vy;
                neuron.z += neuron.vz;
                neuron.pulse += 0.05;
                
                // Boundary check
                if (Math.abs(neuron.x) > 300) neuron.vx *= -1;
                if (Math.abs(neuron.y) > 300) neuron.vy *= -1;
                if (Math.abs(neuron.z) > 200) neuron.vz *= -1;
            });
        }
        
        project(point) {
            const perspective = 1000;
            const centerX = canvas.width / 2;
            const centerY = canvas.height / 2;
            
            const scale = perspective / (perspective + point.z);
            const projX = point.x * scale + centerX;
            const projY = point.y * scale + centerY;
            
            return { x: projX, y: projY, scale, z: point.z };
        }
        
        draw() {
            // Draw connections
            this.connections.forEach(conn => {
                const n1 = this.project(this.neurons[conn.from]);
                const n2 = this.project(this.neurons[conn.to]);
                
                // Signal animation
                const signal = (Math.sin(this.neurons[conn.from].pulse) + 1) / 2;
                
                ctx.strokeStyle = `rgba(0, 168, 255, ${0.1 + signal * 0.2})`;
                ctx.lineWidth = (1 + signal) * ((n1.scale + n2.scale) / 2);
                ctx.beginPath();
                ctx.moveTo(n1.x, n1.y);
                ctx.lineTo(n2.x, n2.y);
                ctx.stroke();
            });
            
            // Draw neurons
            const sortedNeurons = [...this.neurons].sort((a, b) => b.z - a.z);
            sortedNeurons.forEach(neuron => {
                const p = this.project(neuron);
                const pulse = (Math.sin(neuron.pulse) + 1) / 2;
                
                // Neuron body
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, (15 + pulse * 8) * p.scale);
                gradient.addColorStop(0, `rgba(255, 255, 255, ${0.9})`);
                gradient.addColorStop(0.3, `rgba(0, 168, 255, ${0.6})`);
                gradient.addColorStop(1, `rgba(0, 168, 255, ${0.1})`);
                
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, (15 + pulse * 8) * p.scale, 0, Math.PI * 2);
                ctx.fill();
                
                // Core
                ctx.fillStyle = `rgba(255, 255, 255, ${0.8 + pulse * 0.2})`;
                ctx.beginPath();
                ctx.arc(p.x, p.y, 5 * p.scale, 0, Math.PI * 2);
                ctx.fill();
            });
        }
    }
    
    // Floating Particles
    class Particle {
        constructor() {
            this.reset();
        }
        
        reset() {
            this.x = (Math.random() - 0.5) * canvas.width;
            this.y = (Math.random() - 0.5) * canvas.height;
            this.z = Math.random() * 500 - 250;
            this.vx = (Math.random() - 0.5) * 0.5;
            this.vy = (Math.random() - 0.5) * 0.5;
            this.vz = (Math.random() - 0.5) * 0.5;
            this.size = Math.random() * 2 + 1;
            this.opacity = Math.random() * 0.5 + 0.1;
        }
        
        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.z += this.vz;
            
            // Wrap around
            if (Math.abs(this.x) > canvas.width / 2) this.reset();
            if (Math.abs(this.y) > canvas.height / 2) this.reset();
            if (Math.abs(this.z) > 300) this.reset();
        }
        
        draw() {
            const perspective = 1000;
            const scale = perspective / (perspective + this.z);
            const projX = this.x * scale + canvas.width / 2;
            const projY = this.y * scale + canvas.height / 2;
            
            ctx.fillStyle = `rgba(0, 168, 255, ${this.opacity * scale})`;
            ctx.beginPath();
            ctx.arc(projX, projY, this.size * scale, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    // Create visualization elements
    const dnaHelix = new DNAHelix(0, 0, 0);
    const neuronNetwork = new NeuronNetwork();
    const particles = [];
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle());
    }
    
    // Animation loop
    let animationMode = 0;
    let transitionProgress = 0;
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw particles in background
        particles.forEach(particle => {
            particle.update();
            particle.draw();
        });
        
        // Alternate between DNA and Neuron visualization
        const cycleTime = 8000; // 8 seconds per visualization
        const time = Date.now() % (cycleTime * 2);
        
        if (time < cycleTime) {
            // Show DNA Helix
            dnaHelix.update();
            dnaHelix.draw();
        } else {
            // Show Neuron Network
            neuronNetwork.update();
            neuronNetwork.draw();
        }
        
        requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
}

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    const emailInput = newsletterForm.querySelector('.email-input');
    const submitBtn = newsletterForm.querySelector('.submit-btn');
    
    submitBtn.addEventListener('click', (e) => {
        e.preventDefault();
        const email = emailInput.value.trim();
        
        if (email && email.includes('@')) {
            // Show success message
            const originalText = submitBtn.textContent;
            submitBtn.textContent = '登録完了！';
            submitBtn.style.background = 'linear-gradient(135deg, #00d896, #00a86b)';
            
            // Reset after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalText;
                submitBtn.style.background = '';
                emailInput.value = '';
            }, 3000);
        } else {
            // Show error state
            emailInput.style.borderColor = '#ff4444';
            setTimeout(() => {
                emailInput.style.borderColor = '';
            }, 2000);
        }
    });
}

// Load more episodes functionality
const loadMoreBtn = document.querySelector('.load-more-btn');
if (loadMoreBtn) {
    loadMoreBtn.addEventListener('click', () => {
        // Simulate loading more episodes
        loadMoreBtn.textContent = '読み込み中...';
        loadMoreBtn.disabled = true;
        
        setTimeout(() => {
            loadMoreBtn.textContent = 'すべて表示済み';
            loadMoreBtn.style.opacity = '0.5';
            loadMoreBtn.style.cursor = 'not-allowed';
        }, 1500);
    });
}

// Subscribe button animations
document.querySelectorAll('.subscribe-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        // Add click animation
        btn.style.transform = 'scale(0.95)';
        setTimeout(() => {
            btn.style.transform = '';
        }, 200);
    });
});