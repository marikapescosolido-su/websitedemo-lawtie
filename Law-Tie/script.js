$(document).ready(function(){

    // Sticky navbar on scroll
    $(window).scroll(function(){
        if($(this).scrollTop() > 20){
            $('.navbar').addClass("sticky");
        } else{
            $('.navbar').removeClass("sticky");
        }
    });

    // Toggle mobile menu
    $('.menu-btn').click(function(){
        $('.navbar .menu').toggleClass("active");
        $('.menu-btn i').toggleClass("active");
    });

    // Close mobile menu on link click
    $('.navbar .menu li a').click(function(){
        $('.navbar .menu').removeClass("active");
        $('.menu-btn i').removeClass("active");
    });

    // Number scroll animation
    function animateCount(el) {
        const target = parseFloat(el.dataset.target);
        const suffix = el.dataset.suffix || '';
        const duration = 1800;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        let step = 0;

        const timer = setInterval(() => {
            step++;
            current = Math.min(increment * step, target);
            // For whole numbers show integer, otherwise one decimal
            const display = Number.isInteger(target) ? Math.round(current) : current.toFixed(1);
            el.textContent = display + suffix;
            if (step >= steps) clearInterval(timer);
        }, duration / steps);
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.animated) {
                entry.target.dataset.animated = 'true';
                animateCount(entry.target);
            }
        });
    }, { threshold: 0.4 });

    document.querySelectorAll('.stat-tile-num[data-target]').forEach(el => {
        observer.observe(el);
    });

    // Staggered scroll-reveal for cards, pillars, stat tiles
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting && !entry.target.dataset.revealed) {
                entry.target.dataset.revealed = 'true';
                const delay = (entry.target.dataset.revealDelay || 0);
                setTimeout(() => entry.target.classList.add('revealed'), delay);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.step-card, .pillar, .stat-tile, .mission-statement').forEach((el, i) => {
        el.dataset.revealDelay = (i % 4) * 110;
        revealObserver.observe(el);
    });

});