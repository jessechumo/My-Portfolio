$(function() {
  // Experience Tabs functionality
  $('.experience-tab').on('click', function() {
    const jobIndex = $(this).data('job');
    
    // Remove active class from all tabs and panels
    $('.experience-tab').removeClass('active');
    $('.experience-panel').removeClass('active');
    
    // Add active class to clicked tab and corresponding panel
    $(this).addClass('active');
    $('.experience-panel[data-panel="' + jobIndex + '"]').addClass('active');
  });

  // Smooth scroll for navigation links
  $('a[href*="#"]').not('[href="#"]').not('[href="#0"]').click(function(event) {
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top - $('nav').outerHeight()
        }, 1000, function() {
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) {
            return false;
          } else {
            $target.attr('tabindex','-1');
            $target.focus();
          };
        });
      }
    }
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
