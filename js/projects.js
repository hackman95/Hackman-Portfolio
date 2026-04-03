/* 
   ============================================================
   VWC PREWORK CAPSTONE — DYNAMIC PROJECT RENDERING
   Feature 3: Custom Project Rendering from Script Objects
   Feature 4: Project Filtering (Academic Categories)
   ============================================================
*/

/**
 * Project Data Array
 * Rationale: Storing data in a separate array follows the Clean Code principle 
 * of separating data from presentation (logic vs template).
 * This allows us to scale the portfolio without touching the HTML shell.
 */
const projects = [
    {
        id: 1,
        title: "Semantic HTML Practice",
        category: "CSS",
        description: "A conversion of a generic layout into high-accessibility semantic HTML5 for VWC Module 4.",
        image: "images/project-semantic.png", // Corrected naming
        link: "https://github.com/hackman95/Semantic-HTML", // Consistent profile
        tags: ["HTML5", "Accessibility"]
    },
    {
        id: 2,
        title: "Flexbox Landing Page",
        category: "CSS",
        description: "Mobile-first landing page layout built strictly with modern CSS Flexbox grid systems.",
        image: "images/project-flexbox.png",
        link: "https://github.com/hackman95/Flexbox-Layout",
        tags: ["Flexbox", "Responsive"]
    },
    {
        id: 3,
        title: "JS Challenge Suite",
        category: "JavaScript",
        description: "Collection of logic puzzles including reverseStrings, palindromes, and array manipulation.",
        image: "images/project-js.png",
        link: "https://github.com/hackman95/JS-Challenges",
        tags: ["JavaScript", "Logic"]
    },
    {
        id: 4,
        title: "Orion UI Clone",
        category: "CSS",
        description: "Replicating the 'Classic Academic' theme of the Orion coding application.",
        image: "images/project-orion.png",
        link: "https://github.com/hackman95/Orion-Clone",
        tags: ["UI/UX", "Theming"]
    }
];

/**
 * renderProjects Function
 * @param {Array} projectsToRender - The subset of project objects to display 
 * 
 * Logic:
 * 1. Clear the target container to prevent duplicate elements.
 * 2. Loop through the array using 'forEach' (Module 6 array method).
 * 3. Create DOM elements via 'template strings' for readability.
 * 4. Append to the layout.
 */
function renderProjects(projectsToRender) {
    const grid = document.getElementById('projects-grid');
    if (!grid) return; // Guard clause if on the wrong page

    grid.innerHTML = ''; // Clear container

    projectsToRender.forEach(project => {
        const card = document.createElement('article');
        card.className = 'project-card shadow';
        card.setAttribute('data-id', project.id);
        
        // Note: Using Template Literals from ES6 (taught in Module 6)
        card.innerHTML = `
            <div class="project-img-wrapper">
                <img src="${project.image}" alt="${project.title}" onerror="this.src='https://placehold.co/600x400?text=${project.title}'">
            </div>
            <div class="project-content">
                <span class="category-tag">${project.category}</span>
                <h3 class="project-title">${project.title}</h3>
                <p>${project.description}</p>
                <div class="tag-group">
                    ${project.tags.map(tag => `<span>#${tag}</span>`).join('')}
                </div>
                <a href="${project.link}" class="project-link" target="_blank" rel="noopener">
                    View Repository &rarr;
                </a>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

/**
 * Feature 4: Filter Interaction
 * Logic:
 * 1. Attach event listeners to filter buttons.
 * 2. Use 'filter' method (Module 6) to select specific categories.
 * 3. Re-render the grid based on the selection.
 */
function initFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    if (!filterButtons) return;

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // UI Feedback: Toggle active class
            document.querySelector('.filter-btn.active').classList.remove('active');
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

// Global scope check so render call happens when script loads on projects.html
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('projects-grid')) {
        renderProjects(projects);
        initFilters();
    }
});
