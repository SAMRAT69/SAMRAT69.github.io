document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('executor-search');
    const filterTags = document.querySelectorAll('.filter-tag');
    const sections = document.querySelectorAll('.glass-card');
    const executorCards = document.querySelectorAll('.executor-card');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
            }
        });
    }, { threshold: 0.1 });

    sections.forEach(section => observer.observe(section));

    function filterExecutors() {
        const searchTerm = searchInput.value.toLowerCase();
        const activeFilter = document.querySelector('.filter-tag.active')?.getAttribute('data-filter') || 'all';

        executorCards.forEach(card => {
            const sectionId = card.closest('section').id;
            const executorName = card.querySelector('h3').textContent.toLowerCase();
            const matchesSearch = !searchTerm || executorName.includes(searchTerm);
            const matchesFilter = activeFilter === 'all' || sectionId === activeFilter;

            card.classList.toggle('hidden', !(matchesSearch && matchesFilter));
        });

        sections.forEach(section => {
            const hasVisibleCards = section.querySelectorAll('.executor-card:not(.hidden)').length > 0;
            section.classList.toggle('hidden', !hasVisibleCards);
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', filterExecutors);
    }

    filterTags.forEach(tag => {
        tag.addEventListener('click', () => {
            filterTags.forEach(t => t.classList.remove('active'));
            tag.classList.add('active');
            filterExecutors();
        });
    });

    window.addEventListener('mousemove', (e) => {
        const moveX = (e.clientX - window.innerWidth / 2) * 0.01;
        const moveY = (e.clientY - window.innerHeight / 2) * 0.01;

        document.querySelectorAll('.blob').forEach(blob => {
            const speed = parseInt(blob.classList[0].replace('blob', '')) * 0.5;
            blob.style.transform = `translate(${moveX * speed}px, ${moveY * speed}px)`;
        });
    });

    filterExecutors();
});
