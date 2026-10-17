// Render functions for dynamic content
function renderExperience() {
  const tabsContainer = document.querySelector('.experience-tabs');
  const panelsContainer = document.querySelector('.experience-panels');
  
  if (!tabsContainer || !panelsContainer || !portfolioData) return;
  
  // Clear existing content
  tabsContainer.innerHTML = '';
  panelsContainer.innerHTML = '';
  
  portfolioData.experience.forEach((job, index) => {
    // Create tab button
    const tab = document.createElement('button');
    tab.className = `experience-tab ${index === 0 ? 'active' : ''}`;
    tab.setAttribute('data-job', index);
    
    // Set tab label
    if (job.position.includes('Systems Administrator')) {
      tab.textContent = 'UTA (SysAdmin)';
    } else if (job.position.includes('Teaching Assistant')) {
      tab.textContent = 'UTA (GTA)';
    } else if (job.company === 'Fasi Health') {
      tab.textContent = 'Fasi Health';
    } else if (job.company === 'Fameve') {
      tab.textContent = 'Fameve';
    } else if (job.company === 'jambopay') {
      tab.textContent = 'jambopay';
    } else {
      tab.textContent = job.company.split(' ')[0];
    }
    
    tabsContainer.appendChild(tab);
    
    // Create panel
    const panel = document.createElement('div');
    panel.className = `experience-panel ${index === 0 ? 'active' : ''}`;
    panel.setAttribute('data-panel', index);
    
    panel.innerHTML = `
      <h3 class="experience-panel__title">
        <span class="experience-panel__position">${job.position}</span>
        <span class="experience-panel__company">
          <a href="${job.url}" target="_blank">@ ${job.company}</a>
        </span>
      </h3>
      <p class="experience-panel__time">${job.time}</p>
      ${job.description ? `
        <ul class="experience-panel__description">
          ${job.description.map(item => `<li>${item}</li>`).join('')}
        </ul>
      ` : ''}
    `;
    
    panelsContainer.appendChild(panel);
  });
}

function renderProjects() {
  const projectsContainer = document.querySelector('.projects-grid');
  
  if (!projectsContainer || !portfolioData) return;
  
  // Clear existing content
  projectsContainer.innerHTML = '';
  
  portfolioData.projects.forEach(project => {
    const article = document.createElement('article');
    article.className = 'project-card';
    
    article.innerHTML = `
      <div class="project-card__header">
        <a href="${project.url}" target="_blank" class="project-card__link">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
            <polyline points="15 3 21 3 21 9"></polyline>
            <line x1="10" y1="14" x2="21" y2="3"></line>
          </svg>
        </a>
        <h3 class="project-card__title">${project.name}</h3>
      </div>
      <p class="project-card__description">${project.description}</p>
      <ul class="project-card__tags">
        ${project.used.map(item => `<li>${item}</li>`).join('')}
      </ul>
    `;
    
    projectsContainer.appendChild(article);
  });
}

// Initialize rendering when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    renderExperience();
    renderProjects();
  });
} else {
  renderExperience();
  renderProjects();
}

