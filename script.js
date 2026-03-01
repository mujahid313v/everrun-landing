/* ============================================
   EVERRUN - JavaScript
   3D Animations & Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    initThreeJS();
    initGSAP();
    initSmoothScroll();
    initNavScroll();
    initDiagramModal();
});


// ============================================
// THREE.JS 3D BACKGROUND - EVERRUN ATTRACTIVE
// ============================================

function initThreeJS() {
    const container = document.getElementById('canvas-container');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // EverRun Brand Colors - More vibrant
    const colors = {
        primary: 0x00ff88,
        secondary: 0x0066ff,
        accent: 0xff0066,
        purple: 0x8b5cf6,
        orange: 0xff9500,
        cyan: 0x00ffff,
        magenta: 0xff00ff
    };

    // Create particle field
    const particleCount = 600;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);
    
    for(let i = 0; i < particleCount; i++) {
        particlePositions[i * 3] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 20;
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 15;
        particleSizes[i] = Math.random() * 3;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particleGeometry.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particleMaterial = new THREE.PointsMaterial({
        size: 0.08,
        color: colors.primary,
        transparent: true,
        opacity: 0.9,
        sizeAttenuation: true,
        blending: THREE.AdditiveBlending
    });

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particleSystem);

    // Create connection lines between nearby particles
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(particleCount * 6);
    lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
    
    const lineMaterial = new THREE.LineBasicMaterial({
        color: colors.primary,
        transparent: true,
        opacity: 0.15,
        blending: THREE.AdditiveBlending
    });
    
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // Floating 3D Shapes - Enhanced
    const shapes = [];
    
    // 1. Torus (Donuts) - representing continuous deployment
    for (let i = 0; i < 5; i++) {
        const geometry = new THREE.TorusGeometry(0.3 + Math.random() * 0.3, 0.08, 16, 50);
        const material = new THREE.MeshBasicMaterial({
            color: [colors.primary, colors.secondary, colors.purple, colors.cyan, colors.orange][i],
            wireframe: true,
            transparent: true,
            opacity: 0.7
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 12;
        mesh.position.y = (Math.random() - 0.5) * 10;
        mesh.position.z = (Math.random() - 0.5) * 8 - 2;
        
        mesh.userData = {
            rotSpeed: { x: 0.008 + Math.random() * 0.01, y: 0.012 + Math.random() * 0.01 },
            floatSpeed: 0.001 + Math.random() * 0.002,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y,
            originalX: mesh.position.x,
            orbitSpeed: 0.0005 + Math.random() * 0.001,
            orbitRadius: 0.5 + Math.random() * 1
        };
        
        scene.add(mesh);
        shapes.push(mesh);
    }

    // 2. Icosahedrons - representing GitHub
    for (let i = 0; i < 4; i++) {
        const geometry = new THREE.IcosahedronGeometry(0.35, 0);
        const material = new THREE.MeshBasicMaterial({
            color: colors.secondary,
            wireframe: true,
            transparent: true,
            opacity: 0.8
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random() - 0.5) * 8;
        mesh.position.z = (Math.random() - 0.5) * 6 - 2;
        
        mesh.userData = {
            rotSpeed: { x: 0.01, y: 0.015 },
            floatSpeed: 0.002,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y
        };
        
        scene.add(mesh);
        shapes.push(mesh);
    }

    // 3. Octahedrons - representing Docker
    for (let i = 0; i < 4; i++) {
        const geometry = new THREE.OctahedronGeometry(0.4, 0);
        const material = new THREE.MeshBasicMaterial({
            color: colors.orange,
            wireframe: true,
            transparent: true,
            opacity: 0.75
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random() - 0.5) * 8;
        mesh.position.z = (Math.random() - 0.5) * 6 - 2;
        
        mesh.userData = {
            rotSpeed: { x: 0.012, y: 0.018 },
            floatSpeed: 0.0015,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y,
            pulse: true
        };
        
        scene.add(mesh);
        shapes.push(mesh);
    }

    // 4. Tetrahedrons - representing Deployment
    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.TetrahedronGeometry(0.5, 0);
        const material = new THREE.MeshBasicMaterial({
            color: colors.accent,
            wireframe: true,
            transparent: true,
            opacity: 0.65
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 8;
        mesh.position.y = (Math.random() - 0.5) * 6;
        mesh.position.z = (Math.random() - 0.5) * 5 - 3;
        
        mesh.userData = {
            rotSpeed: { x: 0.015, y: 0.02 },
            floatSpeed: 0.0025,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y,
            float: true
        };
        
        scene.add(mesh);
        shapes.push(mesh);
    }

    // 5. Dodecahedrons - representing Cloud
    for (let i = 0; i < 3; i++) {
        const geometry = new THREE.DodecahedronGeometry(0.35, 0);
        const material = new THREE.MeshBasicMaterial({
            color: colors.purple,
            wireframe: true,
            transparent: true,
            opacity: 0.6
        });
        const mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.x = (Math.random() - 0.5) * 10;
        mesh.position.y = (Math.random() - 0.5) * 8;
        mesh.position.z = (Math.random() - 0.5) * 6 - 2;
        
        mesh.userData = {
            rotSpeed: { x: 0.006, y: 0.009 },
            floatSpeed: 0.0018,
            floatOffset: Math.random() * Math.PI * 2,
            originalY: mesh.position.y
        };
        
        scene.add(mesh);
        shapes.push(mesh);
    }

    camera.position.z = 6;

    // Mouse tracking
    let mouseX = 0, mouseY = 0;
    let targetX = 0, targetY = 0;

    document.addEventListener('mousemove', (event) => {
        mouseX = event.clientX / window.innerWidth - 0.5;
        mouseY = event.clientY / window.innerHeight - 0.5;
    });

    // Animation loop
    function animate() {
        requestAnimationFrame(animate);

        const time = Date.now() * 0.001;

        // Smooth mouse follow
        targetX += (mouseX * 2.5 - targetX) * 0.02;
        targetY += (-mouseY * 2.5 - targetY) * 0.02;

        // Rotate particle system slowly
        particleSystem.rotation.y += 0.0003;
        particleSystem.rotation.x += 0.0001;

        // Animate shapes
        shapes.forEach((shape, index) => {
            // Rotation
            shape.rotation.x += shape.userData.rotSpeed.x;
            shape.rotation.y += shape.userData.rotSpeed.y;

            // Floating motion
            const floatY = Math.sin(time * shape.userData.floatSpeed * 2 + shape.userData.floatOffset) * 0.5;
            shape.position.y = shape.userData.originalY + floatY;

            // Orbital motion for some shapes
            if (shape.userData.orbitSpeed) {
                const orbitX = Math.cos(time * shape.userData.orbitSpeed) * shape.userData.orbitRadius;
                const orbitZ = Math.sin(time * shape.userData.orbitSpeed) * shape.userData.orbitRadius;
                shape.position.x = shape.userData.originalX + orbitX;
                shape.position.z += orbitZ * 0.01;
            }

            // Pulsing scale for some shapes
            if (shape.userData.pulse) {
                const scale = 1 + Math.sin(time * 2 + index) * 0.15;
                shape.scale.set(scale, scale, scale);
            }
        });

        // Update connection lines
        const positions = particleGeometry.attributes.position.array;
        const linePos = lineGeometry.attributes.position.array;
        let lineIndex = 0;
        
        for (let i = 0; i < particleCount; i++) {
            for (let j = i + 1; j < particleCount; j++) {
                const x1 = positions[i * 3], y1 = positions[i * 3 + 1], z1 = positions[i * 3 + 2];
                const x2 = positions[j * 3], y2 = positions[j * 3 + 1], z2 = positions[j * 3 + 2];
                
                const dist = Math.sqrt((x2-x1)**2 + (y2-y1)**2 + (z2-z1)**2);
                
                if (dist < 2.5 && lineIndex < linePos.length - 6) {
                    linePos[lineIndex++] = x1;
                    linePos[lineIndex++] = y1;
                    linePos[lineIndex++] = z1;
                    linePos[lineIndex++] = x2;
                    linePos[lineIndex++] = y2;
                    linePos[lineIndex++] = z2;
                }
            }
        }
        
        for (let i = lineIndex; i < linePos.length; i++) {
            linePos[i] = 0;
        }
        lineGeometry.attributes.position.needsUpdate = true;

        // Camera movement
        camera.position.x += (targetX * 3 - camera.position.x) * 0.02;
        camera.position.y += (targetY * 3 - camera.position.y) * 0.02;
        camera.lookAt(scene.position);

        renderer.render(scene, camera);
    }

    animate();

    window.addEventListener('resize', () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}


// ============================================
// GSAP ANIMATIONS
// ============================================

function initGSAP() {
    gsap.registerPlugin(ScrollTrigger);

    // Hero animations
    const heroTl = gsap.timeline();
    heroTl.to('.title-slide h1', { opacity: 1, duration: 1, ease: 'power3.out' })
          .to('.title-slide h2', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.5')
          .to('.hero-subtitle', { opacity: 1, duration: 1 }, '-=0.5');

    // Floating cards animation
    gsap.to('.floating-card', {
        y: -25,
        rotation: 5,
        duration: 3,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        stagger: 0.3
    });

    // Scroll reveal
    document.querySelectorAll('.section').forEach((section) => {
        const reveals = section.querySelectorAll('.reveal');
        reveals.forEach((el) => {
            gsap.fromTo(el, 
                { opacity: 0, y: 60 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: el,
                        start: 'top 85%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        });
    });

    // Stagger animations
    gsap.utils.toArray('.toc-item').forEach((item, i) => {
        gsap.fromTo(item, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.5, delay: i * 0.05,
            scrollTrigger: { trigger: item, start: 'top 90%' }
        });
    });

    gsap.utils.toArray('.challenge-card, .objective-card, .user-card, .sprint-card').forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, y: 40 }, {
            opacity: 1, y: 0, duration: 0.8, delay: i * 0.1,
            scrollTrigger: { trigger: card, start: 'top 85%' }
        });
    });

    gsap.utils.toArray('.diagram-card').forEach((card, i) => {
        gsap.fromTo(card, { opacity: 0, scale: 0.9 }, {
            opacity: 1, scale: 1, duration: 0.6, delay: i * 0.08,
            scrollTrigger: { trigger: card, start: 'top 90%' }
        });
    });

    gsap.utils.toArray('.intro-point').forEach((point, i) => {
        gsap.fromTo(point, { opacity: 0, x: -30 }, {
            opacity: 1, x: 0, duration: 0.6, delay: i * 0.08,
            scrollTrigger: { trigger: point, start: 'top 85%' }
        });
    });

    gsap.utils.toArray('.tech-items span').forEach((span, i) => {
        gsap.fromTo(span, { opacity: 0, scale: 0.8 }, {
            opacity: 1, scale: 1, duration: 0.5, delay: i * 0.05,
            scrollTrigger: { trigger: span, start: 'top 90%' }
        });
    });

    // Section titles
    gsap.utils.toArray('.section-title').forEach(title => {
        gsap.fromTo(title, { opacity: 0, scale: 0.95 }, {
            opacity: 1, scale: 1, duration: 1,
            scrollTrigger: { trigger: title, start: 'top 80%' }
        });
    });

    // Hover effects
    document.querySelectorAll('.challenge-card, .objective-card, .user-card, .sprint-card, .screenshot-card, .toc-item, .diagram-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, { scale: 1.03, duration: 0.3, ease: 'power2.out' });
        });
        card.addEventListener('mouseleave', () => {
            gsap.to(card, { scale: 1, duration: 0.3, ease: 'power2.out' });
        });
    });
}


// ============================================
// DIAGRAM MODAL
// ============================================

const diagramFiles = [
    'diagrams/usecase.png',
    'diagrams/class-diagram.png',
    'diagrams/activity-1.png',
    'diagrams/activity-2.png',
    'diagrams/activity-3.png',
    'diagrams/sequence-1.png',
    'diagrams/sequence-2.png',
    'diagrams/sequence-3.png',
];

let currentDiagramIndex = 0;

function initDiagramModal() {
    const modal = document.getElementById('diagramModal');
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeDiagram();
        }
    });

    document.addEventListener('keydown', function(e) {
        if (!modal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeDiagram();
        } else if (e.key === 'ArrowLeft') {
            changeDiagram(-1);
        } else if (e.key === 'ArrowRight') {
            changeDiagram(1);
        }
    });
}

function openDiagram(diagramPath) {
    const modal = document.getElementById('diagramModal');
    const img = document.getElementById('diagramImage');
    const counter = document.getElementById('diagramCounter');
    
    currentDiagramIndex = diagramFiles.indexOf(diagramPath);
    if (currentDiagramIndex === -1) currentDiagramIndex = 0;
    
    img.src = diagramPath;
    counter.textContent = `${currentDiagramIndex + 1} / ${diagramFiles.length}`;
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeDiagram() {
    const modal = document.getElementById('diagramModal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

function changeDiagram(direction) {
    currentDiagramIndex += direction;
    
    if (currentDiagramIndex < 0) {
        currentDiagramIndex = diagramFiles.length - 1;
    } else if (currentDiagramIndex >= diagramFiles.length) {
        currentDiagramIndex = 0;
    }
    
    const img = document.getElementById('diagramImage');
    const counter = document.getElementById('diagramCounter');
    
    img.src = diagramFiles[currentDiagramIndex];
    counter.textContent = `${currentDiagramIndex + 1} / ${diagramFiles.length}`;
    
    img.style.opacity = '0';
    setTimeout(() => {
        img.style.transition = 'opacity 0.3s ease';
        img.style.opacity = '1';
    }, 50);
}


// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
}


// ============================================
// NAV SCROLL
// ============================================

function initNavScroll() {
    const nav = document.querySelector('nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.style.background = 'rgba(10, 10, 10, 0.95)';
            nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.5)';
        } else {
            nav.style.background = 'rgba(10, 10, 10, 0.85)';
            nav.style.boxShadow = 'none';
        }
    });

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.style.color = '';
            if (link.getAttribute('href') === `#${current}`) {
                link.style.color = 'var(--primary)';
            }
        });
    });
}
