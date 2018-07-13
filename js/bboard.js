// Initialize each custom scrollbars
$(function () {

  // One var for each scrollbar
  var PsWrapperScrollbar;
  var PsNotificationsScrollbar;

  // One object for each scrollbar
  AppWrapperScrollbar = {
    init: function () {
      PsWrapperScrollbar = new PerfectScrollbar('#Wrapper');
    },
    update: function () {
      PsWrapperScrollbar.update();
    }
  };

  AppNotificationsScrollbar = {
    init: function () {
      PsNotificationsScrollbar = new PerfectScrollbar('#NotificationsWrapper');
    },
    update: function () {
      PsNotificationsScrollbar.update();
    }
  };

  // First init
  AppWrapperScrollbar.init();
  AppNotificationsScrollbar.init();

});

// Update scrollbars on window resize
$(function () {

  // Add a timeout to limit calls
  $(window).resize(function () {
    clearTimeout(window.resizedFinished);
    window.resizedFinished = setTimeout(function () {
      // Call each scrollbars update method
      AppWrapperScrollbar.update();
      AppNotificationsScrollbar.update();
    }, 250);
  });

});

// Update notifications scrollbar when opening list
$(function () {
  $("#NotificationsButton").on('shown.bs.dropdown', function () {
    AppNotificationsScrollbar.update();
  })
});
