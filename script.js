import { animate, stagger } from "https://cdn.jsdelivr.net/npm/motion@11.11.13/+esm";

document.addEventListener("DOMContentLoaded", () => {
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Text Reveal Animation for Hero Title
    const heroTitle = document.querySelector('.hero-title');
    
    // Safely split text nodes into characters
    function splitTextNodes(element) {
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT, null, false);
        const textNodes = [];
        let node;
        while (node = walker.nextNode()) {
            if (node.nodeValue.trim() !== '') {
                textNodes.push(node);
            }
        }
        
        textNodes.forEach(textNode => {
            const fragment = document.createDocumentFragment();
            const chars = textNode.nodeValue.split('');
            chars.forEach(char => {
                if (char === ' ') {
                    fragment.appendChild(document.createTextNode(' '));
                } else {
                    const span = document.createElement('span');
                    span.className = 'char';
                    span.style.display = 'inline-block';
                    span.textContent = char;
                    fragment.appendChild(span);
                }
            });
            textNode.parentNode.replaceChild(fragment, textNode);
        });
    }

    if (heroTitle) {
        splitTextNodes(heroTitle);
        
        const chars = heroTitle.querySelectorAll('.char');
        
        // Animation function
        const playAnimation = () => {
            animate(
                chars,
                { 
                    y: [40, 0],
                    opacity: [0, 1],
                    filter: ['blur(10px)', 'blur(0px)']
                },
                { 
                    duration: 0.8,
                    delay: stagger(0.015),
                    easing: [0.2, 0.65, 0.3, 0.9]
                }
            );
        };

        // Play on initial load
        playAnimation();

        // Play on hover
        heroTitle.addEventListener('mouseenter', () => {
            playAnimation();
        });

        // Play when scrolled back to top
        let lastScrollTop = window.scrollY;
        window.addEventListener('scroll', () => {
            const currentScrollTop = window.scrollY;
            // Only play if we reached the absolute top and we were previously scrolled down
            if (currentScrollTop === 0 && lastScrollTop > 0) {
                playAnimation();
            }
            lastScrollTop = currentScrollTop;
        });
    }
});
