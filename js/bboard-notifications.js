// Notifications
$(function () {

    // Consts
    const _dataUrl = "data/notifications.json";

    // Vars
    var _someUnreadNotifications = true;
    var _unreadNotificationsCounter = 0;
    var _notificationsList = new Array();
    var _template;

    // IDs
    var NotificationsIndicator = "#NotificationsIndicator";
    var NotificationsUnreadCounter = "#NotificationsUnreadCounter";
    var NotificationsLoader = "#NotificationsLoader";
    var NotificationsContainer = "#NotificationsContainer";
    var NotificationTemplate = "#NotificationTemplate";
    var NotificationsEmpty = "#NotificationsEmpty";

    // Object
    bboardNotifications = {

        Init: function () {

            // Init loaders
            bboardNotifications.LoadingMask_NotificationsIndicator(true);
            bboardNotifications.LoadingMask_NotificationsLoader(true);

            // Load some data
            bboardNotifications.GetData();
        },

        GetData: function () {

            $.ajax({
                url: _dataUrl
            }).done(function (data) {
                _notificationsList = data;

                // Data are ready, generate view
                bboardNotifications.GenerateView();
            });

            // TODO : manage errors

        },

        GenerateView: function () {

            // Get the template once
            _template = $(NotificationTemplate).html();

            // For each notification, generate HTML
            _notificationsList.forEach(notification => {

                var notificationHtml = _template;
                notificationHtml = notificationHtml.replace("{{icon}}", notification.icon);
                notificationHtml = notificationHtml.replace("{{status}}", notification.status);
                notificationHtml = notificationHtml.replace("{{title}}", notification.title);
                notificationHtml = notificationHtml.replace("{{message}}", notification.message);
                notificationHtml = notificationHtml.replace("{{time}}", notification.time);
                notificationHtml = notificationHtml.replace("{{date}}", notification.date);

                if (notification.read) {
                    notificationHtml = notificationHtml.replace("{{unread}}", "");
                } else {
                    notificationHtml = notificationHtml.replace("{{unread}}", "unread");
                    _unreadNotificationsCounter++;
                }

                // Append to the container
                $(NotificationsContainer).append(notificationHtml);
            });

            // HTML is ready, update the view
            setTimeout(() => {

                // Timeout is juste for the demo
                bboardNotifications.UpdateView();

            }, 3000);

        },

        UpdateView: function () {

            // Check unread notifications
            if (_unreadNotificationsCounter === 0) {
                _someUnreadNotifications = false;
            }

            // Change the number of unread notifications
            $(NotificationsUnreadCounter).html(_unreadNotificationsCounter);

            // Change unread notifications indicators visibility
            if (_someUnreadNotifications) {
                bboardNotifications.HidingMask_NotificationsIndicator(false);
                bboardNotifications.HidingMask_NotificationsUnreadCounter(false);
            } else {
                bboardNotifications.HidingMask_NotificationsIndicator(true);
                bboardNotifications.HidingMask_NotificationsUnreadCounter(true);
            }

            // Tooltip initialization
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })

            // Stop loaders
            bboardNotifications.LoadingMask_NotificationsIndicator(false);
            bboardNotifications.LoadingMask_NotificationsLoader(false);

            // Bind events
            bboardNotifications.BindMarkAsRead();

            // Show notifications
            if (_notificationsList.length > 0)
                $(NotificationsContainer).show();
            else
                $(NotificationsEmpty).show();

            // Update scrollbar
            AppNotificationsScrollbar.update();
        },

        BindMarkAsRead: function () {
            $(".notification-link.unread").click(function () {
                bboardNotifications.MarkAsRead($(this));
            });
        },

        MarkAsRead: function (e) {
            e.unbind();
            e.removeClass("unread");

            // Update counter
            _unreadNotificationsCounter--;

            // Update view
            bboardNotifications.UpdateView();
        },

        LoadingMask_NotificationsIndicator: function (isLoading) {
            if (isLoading) {
                $(NotificationsIndicator).removeClass("fa-circle");
                $(NotificationsIndicator).addClass("fa-circle-notch fa-spin");
            } else {
                $(NotificationsIndicator).removeClass("fa-circle-notch fa-spin");
                $(NotificationsIndicator).addClass("fa-circle");
            }
        },

        LoadingMask_NotificationsLoader: function (isLoading) {
            if (isLoading) {
                $(NotificationsLoader).show();
            } else {
                $(NotificationsLoader).hide();
            }
        },

        HidingMask_NotificationsIndicator: function (hide) {
            if (hide) {
                $(NotificationsIndicator).hide();
            } else {
                $(NotificationsIndicator).show();
            }
        },

        HidingMask_NotificationsUnreadCounter: function (hide) {
            if (hide) {
                $(NotificationsUnreadCounter).hide();
            } else {
                $(NotificationsUnreadCounter).show();
            }
        }

    };

    bboardNotifications.Init();

});