// Particles Background
class Particle {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.5 - 0.25;
        this.speedY = Math.random() * 0.5 - 0.25;
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        if (this.x > this.canvas.width || this.x < 0) this.speedX *= -1;
        if (this.y > this.canvas.height || this.y < 0) this.speedY *= -1;
    }
    
    draw() {
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        this.ctx.fill();
    }
}

function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    for (let i = 0; i < 100; i++) {
        particles.push(new Particle(canvas));
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }
    animate();
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Form Handling
document.getElementById('userForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = document.getElementById('submitBtn');
    const form = this;
    
    btn.classList.add('submitting');
    
    // Simulate form submission
    setTimeout(() => {
        // Here you would normally send AJAX request
        const formData = new FormData(form);
        
        fetch('/', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text())
        .then(html => {
            // Reload page or update dynamically
            window.location.reload();
        })
        .catch(err => {
            showToast('Error adding user!', 'error');
        })
        .finally(() => {
            btn.classList.remove('submitting');
        });
    }, 1500);
});

// Toast Notifications
function showToast(message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-message');
    
    toastMsg.textContent = message;
    toast.className = `toast show ${type}`;
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

function hideToast() {
    document.getElementById('toast').classList.remove('show');
}

// Copy User
function copyUser(btn) {
    const card = btn.closest('.user-card');
    const text = `${card.querySelector('h3').textContent} - ${card.querySelector('p').textContent}`;
    
    navigator.clipboard.writeText(text).then(() => {
        showToast('User copied to clipboard!');
    });
}

// Delete User (Frontend simulation)
function deleteUser(btn) {
    if (confirm('Delete this user?')) {
        btn.closest('.user-card').style.animation = 'fadeOut 0.5s ease';
        setTimeout(() => {
            btn.closest('.user-card').remove();
            updateCounters();
            showToast('User deleted!');
        }, 500);
    }
}

// Update Counters
function updateCounters() {
    const total = document.getElementById('userList').children.length;
    document.getElementById('total-count').textContent = total;
    document.getElementById('live-count').textContent = total;
}

// Typing Effect for Inputs
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('focus', function() {
        this.parentElement.style.transform = 'scale(1.02)';
    });
    
    input.addEventListener('blur', function() {
        this.parentElement.style.transform = 'scale(1)';
    });
});

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initParticles();
    updateCounters();
    
    // Animate user cards on load
    document.querySelectorAll('.user-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
        card.classList.add('animate-in');
    });
});
