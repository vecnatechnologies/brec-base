;(function() {
  /**
 * Copyright (c) 2007-2013 Ariel Flesler - aflesler<a>gmail<d>com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.6
 */

;(function($){var h=$.scrollTo=function(a,b,c){$(window).scrollTo(a,b,c)};h.defaults={axis:'xy',duration:parseFloat($.fn.jquery)>=1.3?0:1,limit:true};h.window=function(a){return $(window)._scrollable()};$.fn._scrollable=function(){return this.map(function(){var a=this,isWin=!a.nodeName||$.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!isWin)return a;var b=(a.contentWindow||a).document||a.ownerDocument||a;return/webkit/i.test(navigator.userAgent)||b.compatMode=='BackCompat'?b.body:b.documentElement})};$.fn.scrollTo=function(e,f,g){if(typeof f=='object'){g=f;f=0}if(typeof g=='function')g={onAfter:g};if(e=='max')e=9e9;g=$.extend({},h.defaults,g);f=f||g.duration;g.queue=g.queue&&g.axis.length>1;if(g.queue)f/=2;g.offset=both(g.offset);g.over=both(g.over);return this._scrollable().each(function(){if(e==null)return;var d=this,$elem=$(d),targ=e,toff,attr={},win=$elem.is('html,body');switch(typeof targ){case'number':case'string':if(/^([+-]=?)?\d+(\.\d+)?(px|%)?$/.test(targ)){targ=both(targ);break}targ=$(targ,this);if(!targ.length)return;case'object':if(targ.is||targ.style)toff=(targ=$(targ)).offset()}$.each(g.axis.split(''),function(i,a){var b=a=='x'?'Left':'Top',pos=b.toLowerCase(),key='scroll'+b,old=d[key],max=h.max(d,a);if(toff){attr[key]=toff[pos]+(win?0:old-$elem.offset()[pos]);if(g.margin){attr[key]-=parseInt(targ.css('margin'+b))||0;attr[key]-=parseInt(targ.css('border'+b+'Width'))||0}attr[key]+=g.offset[pos]||0;if(g.over[pos])attr[key]+=targ[a=='x'?'width':'height']()*g.over[pos]}else{var c=targ[pos];attr[key]=c.slice&&c.slice(-1)=='%'?parseFloat(c)/100*max:c}if(g.limit&&/^\d+$/.test(attr[key]))attr[key]=attr[key]<=0?0:Math.min(attr[key],max);if(!i&&g.queue){if(old!=attr[key])animate(g.onAfterFirst);delete attr[key]}});animate(g.onAfter);function animate(a){$elem.animate(attr,f,g.easing,a&&function(){a.call(this,targ,g)})}}).end()};h.max=function(a,b){var c=b=='x'?'Width':'Height',scroll='scroll'+c;if(!$(a).is('html,body'))return a[scroll]-$(a)[c.toLowerCase()]();var d='client'+c,html=a.ownerDocument.documentElement,body=a.ownerDocument.body;return Math.max(html[scroll],body[scroll])-Math.min(html[d],body[d])};function both(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);

  // Accessibility "skip navigation" links
  jQuery(function($) {
  $('a.skip-link').click(function() {
    var $target = $($(this).attr('href'));
    $target
      .attr('tabindex', -1)
      .on('blur focusout', function() {
        $target.removeAttr('tabindex');
      })
      .focus();

    $('#app').scrollTo($target, 100);
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

  $('.nav-toggle').click(function() {
    $('#app').toggleClass('focus-nav');
    $("html").toggleClass('disable-scroll');
    return false;
  });

  $('header, main, footer, .page-content').click(function() {
    if ($('#app').hasClass('focus-nav')) {
      $('#app').removeClass('focus-nav');
      return false;
    }
  });

/////////////////
// Responsive Nav
/////////////////

//Controls the behavior of the navigation bar when it is on the side in smaller windows
function sideNav(event){
  if ($('.nav-toggle').is(':visible') ){ //This is how it knows it is a small screen or not
      var $thisItem = $(this);

      if ($thisItem.hasClass("level-0")){
        //If active element is on level-0, hide all the other level-0 elements
        $( ".level-0" ).each(function() {
          if (! $thisItem.is(this)){
            $(this).addClass("hidden");
          }
      });

      //If element clicked is not a back button, add class "active"
      if (! $thisItem.hasClass('back')){
          $thisItem.addClass("active");
      }

      //Make any level-2 elements under this element disappear
      $thisItem.children('ul').children().children('ul').children().addClass("hidden");
      //Make any active level-1's not active anymore
      $thisItem.children('ul').children().removeClass("active");
        //Make it's level-1 elements appear, remove 'hidden' class on each of them
      $thisItem.children('ul').children().removeClass("hidden");

      }else if ($thisItem.hasClass("level-1")){

        //If active element is on level-1, hide all the other level-1 elements
        $( ".level-1" ).each(function() {
          if (! $thisItem.is(this)){
            $(this).addClass("hidden");
          }
      });

        //If element clicked is a back button
      if ($thisItem.hasClass('back')){
        //Make the level-0 elements visible again and hide everything else
        $('.level-0').removeClass('hidden');
        $('.level-1').addClass("hidden");
          $thisItem.parent().parent().removeClass('active');
      }else{
        //If not a back button, add class "active"
          $thisItem.addClass("active");
      }
        //Make it's level-2 elements appear, remove 'hidden' class on each of them
      $thisItem.children('ul').children().removeClass("hidden");

      }else if ($thisItem.hasClass("level-2")){

        //If element clicked is a back button
        if ($thisItem.hasClass('back')){
          //Make all the level-1 elements before it appear while making everything else disappear
          $thisItem.parent().parent().parent().children().removeClass("hidden");
          $thisItem.parent().parent().removeClass('active'); //will remove the level-2 elements
          $thisItem.parent().parent().parent().parent().addClass('active');
        }else{
          //If not a back button, add class "active"
          $thisItem.addClass("active");
        }
      }
    event.stopPropagation();
  }else{
    $(".nav-item").removeClass("hidden");
  }
}

function makeActive(e) {
  if (!$('.nav-toggle').is(':visible') ){
    var $this = $(this);
    $this.addClass('active');
  }
}

function removeActive(e) {
  if (!$('.nav-toggle').is(':visible') ){
    var $this = $(this);
    setTimeout(function() {
      if ($this.find(':focus').length == 0) {
        $this.removeClass('active'); //Prevents side nav from working properly //Uncomment in production
      }
    }, 10);
  }
}

function addStylingClasses(){
  var backHTML = '<li class="nav-item back"><a class="nav-link" href="#"><span>Back</span></a></li>';
  $("ul.nav-dropdown").append(backHTML);
  
  $("li.nav-item").each(function(){
    //if there is a ul.nav-dropdown under it, it should take on the class "nav-dropdown-toggle"
    if ($(this).children("ul.nav-dropdown").length > 0){
      $(this).children("a.nav-link").eq(0).addClass("nav-dropdown-toggle");
    }
  });

  $(".nav-list").children("li.nav-item").each(function(){
    $(this).addClass("level-0");
    $(this).children("ul.nav-dropdown").each(function(){
      $(this).children("li.nav-item").each(function(){
        $(this).addClass("level-1");
        $(this).children("ul.nav-dropdown").each(function(){
          $(this).children("li.nav-item").each(function(){
            $(this).addClass("level-2");
          });
        });
      });
    });
  });
  $(".nav-list.secondary").addClass("level-0");
}

function checkForNavBarResponsiveness(){
  $(".nav-item").removeClass("active");

  if ($('.nav-toggle').is(':visible') ){
    $(".level-1").addClass("hidden");
    $(".level-2").addClass("hidden");

    $(".level-0").removeClass("hidden");
    $(".level-0").removeClass("active");
  }else{
    $(".nav-item").removeClass("hidden");
  }
}

$(window).on("load",function(){
  addStylingClasses();

  $(".nav-item").on({
    focusin: makeActive,
    focusout: removeActive
  });
  $(".nav-item").on("click", sideNav);
});

$(window).on("load resize",function(){
  checkForNavBarResponsiveness();
});
/////////////////
// End Responsive Nav
/////////////////
});
})();