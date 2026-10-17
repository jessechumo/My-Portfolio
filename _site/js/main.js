$(function() {
  // Experience Tabs functionality - using event delegation for dynamically created tabs
  $(document).on('click', '.experience-tab', function() {
    const jobIndex = $(this).data('job');
    
    // Remove active class from all tabs and panels
    $('.experience-tab').removeClass('active');
    $('.experience-panel').removeClass('active');
    
    // Add active class to clicked tab and corresponding panel
    $(this).addClass('active');
    $('.experience-panel[data-panel="' + jobIndex + '"]').addClass('active');
  });

  // ScrollReveal animations
  if (typeof ScrollReveal !== 'undefined') {
    window.sr = ScrollReveal({
      reset: false,
      duration: 600,
      easing: 'cubic-bezier(.694,0,.335,1)',
      scale: 1,
      viewFactor: 0.3,
    });

    sr.reveal('.about-section', { viewFactor: 0.2 });
    sr.reveal('.experience-section', { viewFactor: 0.2 });
    sr.reveal('.projects-section', { viewFactor: 0.1 });
    sr.reveal('.contact-section', { viewFactor: 0.1 });
  }
});
