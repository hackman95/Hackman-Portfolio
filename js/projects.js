const projects = [
    {
        id: 1,
        title: "Semantic HTML Architecture",
        category: "CSS",
        description: "Conversion of a complex layout into high-accessibility semantic HTML5 for VWC Module 4.",
        image: "images/project-semantic.png",
        link: "https://github.com/hackman95/Semantic-HTML",
        tags: ["HTML5", "Accessibility"]
    },
    {
        id: 2,
        title: "Flexbox Grid System",
        category: "CSS",
        description: "Mobile-first landing page layout built with modern CSS Flexbox grid systems.",
        image: "images/project-flexbox.png",
        link: "https://github.com/hackman95/Flexbox-Layout",
        tags: ["Flexbox", "Responsive"]
    },
    {
        id: 3,
        title: "JavaScript Logic Challenges",
        category: "JavaScript",
        description: "Collection of logic puzzles including reverseStrings, palindromes, and array manipulation.",
        image: "images/project-js.png",
        link: "https://github.com/hackman95/JS-Challenges",
        tags: ["JavaScript", "Logic"]
    },
    {
        id: 4,
        title: "Clean Design Portfolio",
        category: "CSS",
        description: "Replicating a minimalist professional design for the VWC Capstone.",
        image: "images/project-minimal.png", 
        link: "https://github.com/hackman95/Hackman-Portfolio",
        tags: ["UI/UX", "Minimalism"]
    }
];

function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return;

    grid.innerHTML = '';

    projectsToRender.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card shadow-minimal';
        card.setAttribute('data-id', project.id);
        
        card.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/600x400?text=${project.title}'">
            </div>
            <div class="project-content">
                <span class="category-badge">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p>${project.description}</p>
                <div class="tag-group">
                    ${project.tags.map(tag => `<span class="tag">#${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link" target="_blank" rel="noopener">
                    Repository &rarr;
                </a>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentActive = document.querySelector('.filter-btn.active');
            if (currentActive) currentActive.classList.remove('active');
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            
            if (filterValue === 'all') {
                renderProjects(projects);
            } else {
                const filtered = projects.filter(p => p.category === filterValue);
                renderProjects(filtered);
            }
        });
    });
}

// Initial setup from script.js logic if DOM ready
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('projects-grid')) {
        renderProjects(projects);
        initFilters();
    }
});
