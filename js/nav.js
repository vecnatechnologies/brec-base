;(function() {
  // Accessibility "skip navigation" links
  $('a.skip-link').click(function() {
    var $target = $($(this).attr('href'));
    $target
      .attr('tabindex', -1)
      .on('blur focusout', function() {
        $target.removeAttr('tabindex');
      })
      .focus();

    $('body').scrollTo($target, 100);
    return false;
  });

  // Nav touch improvements
  $(document).on('tap', 'html.touch .nav-item > .icon-caret-down', function(e) {
    $(this).parent().toggleClass('active');
  });

  // Nav menu keyboard accessibility
  $('.nav-link').keydown(function(e) {
    var $this = $(this);

    // On up arrow, focus on previous link
    if (e.keyCode == 38 && $this.parent().parent().hasClass('nav-dropdown') && $this.parent().is(':first-child')) {
      $this.parent().parent().siblings('.nav-link').focus();
    } else if (e.keyCode == 38 && $this.parent().parent().hasClass('nav-dropdown')) {
      $this.parent().prev().children('.nav-link').focus();
    }

    // On down arrow, focus on next link
    if (e.keyCode == 40 && $this.hasClass('nav-dropdown-toggle')) {
      $this.siblings('.nav-dropdown').find('.nav-link').first().focus();
      return false;
    } else if (e.keyCode == 40 && $this.parent().parent().hasClass('nav-dropdown')) {
      $this.parent().next().children('.nav-link').focus();
      return false;
    }

    // On right arrow, focus next nav link
    if (e.keyCode == 39 && $this.parent().parent().hasClass('nav-dropdown') && $this.parent().parent().parent().is(':last-child')) {
      // Inside a dropdown menu and relative parent is last in .nav-list
      $this.closest('.nav-list').next().children('.nav-item').last().children('.nav-link').first().focus();
    } else if (e.keyCode == 39 && $this.parent().parent().hasClass('nav-dropdown')) {
      // Inside a dropdown menu
      $this.parent().parent().parent().next().find('.nav-link').first().focus();
    } else if (e.keyCode == 39 && $this.parent().is(':last-child')) {
      // On last child of .nav-list
      $this.closest('.nav-list').next().children('.nav-item').last().children('.nav-link').first().focus();
    } else if (e.keyCode == 39) {
      $this.parent().next().children('.nav-link').focus();
    }

    // On left arrow, focus previous nav link
    if (e.keyCode == 37 && $this.parent().is(':first-child')) {
      // On first child of .nav-list
      $this.parent().parent().prev().children('.nav-item').last().children('.nav-link').first().focus();
    } else if (e.keyCode == 37 && $this.parent().parent().hasClass('nav-dropdown')) {
      // Inside a dropdown menu
      $this.parent().parent().parent().prev().find('.nav-link').first().focus();
    } else if (e.keyCode == 37) {
      $this.parent().prev().children('.nav-link').focus();
      return false;
    }
  });

  $('.nav-item').focusin(function(e) {
    var $this = $(this);
    $this.addClass('active');
    console.log(e)
  });

  $('.nav-item').focusout(function(e) {
    var $this = $(this);
    setTimeout(function() {
      if ($this.find(':focus').length == 0) {
        $this.removeClass('active');
      }
    }, 10);
  });
})();