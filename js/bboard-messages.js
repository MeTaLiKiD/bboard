// Messages
$(function () {

    // Consts
    const _dataUrl = "data/messages.json";

    // Vars
    var _someUnreadMessages = true;
    var _unreadMessagesCounter = 0;
    var _messagesList = new Array();
    var _template;

    // IDs
    var MessagesIndicator = "#MessagesIndicator";
    var MessagesUnreadCounter = "#MessagesUnreadCounter";
    var MessagesLoader = "#MessagesLoader";
    var MessagesContainer = "#MessagesContainer";
    var MessageTemplate = "#MessageTemplate";
    var MessagesEmpty = "#MessagesEmpty";

    // Object
    bboardMessages = {

        Init: function () {

            // Init loaders
            bboardMessages.LoadingMask_MessagesIndicator(true);
            bboardMessages.LoadingMask_MessagesLoader(true);

            // Load some data
            bboardMessages.GetData();
        },

        GetData: function () {

            $.ajax({
                url: _dataUrl
            }).done(function (data) {
                _messagesList = data;

                // Data are ready, generate view
                bboardMessages.GenerateView();
            });

            // TODO : manage errors

        },

        GenerateView: function () {

            // Get the template once
            _template = $(MessageTemplate).html();

            // For each Message, generate HTML
            _messagesList.forEach(message => {

                var messageHtml = _template;
                messageHtml = messageHtml.replace("{{image}}", message.image);
                messageHtml = messageHtml.replace("{{name}}", message.name);
                messageHtml = messageHtml.replace("{{message}}", message.message);
                messageHtml = messageHtml.replace("{{time}}", message.time);
                messageHtml = messageHtml.replace("{{date}}", message.date);

                if (message.read) {
                    messageHtml = messageHtml.replace("{{unread}}", "");
                } else {
                    messageHtml = messageHtml.replace("{{unread}}", "unread");
                    _unreadMessagesCounter++;
                }

                // Append to the container
                $(MessagesContainer).append(messageHtml);
            });

            // HTML is ready, update the view
            setTimeout(() => {

                // Timeout is juste for the demo
                bboardMessages.UpdateView();

            }, 3000);

        },

        UpdateView: function () {

            // Check unread Messages
            if (_unreadMessagesCounter === 0) {
                _someUnreadMessages = false;
            }

            // Change the number of unread Messages
            $(MessagesUnreadCounter).html(_unreadMessagesCounter);

            // Change unread Messages indicators visibility
            if (_someUnreadMessages) {
                bboardMessages.HidingMask_MessagesIndicator(false);
                bboardMessages.HidingMask_MessagesUnreadCounter(false);
            } else {
                bboardMessages.HidingMask_MessagesIndicator(true);
                bboardMessages.HidingMask_MessagesUnreadCounter(true);
            }

            // Tooltip initialization
            $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })

            // Stop loaders
            bboardMessages.LoadingMask_MessagesIndicator(false);
            bboardMessages.LoadingMask_MessagesLoader(false);

            // Bind events
            bboardMessages.BindMarkAsRead();

            // Show Messages
            if (_messagesList.length > 0)
                $(MessagesContainer).show();
            else
                $(MessagesEmpty).show();

            // Update scrollbar
            AppMessagesScrollbar.update();
        },

        BindMarkAsRead: function () {
            $(".message-link.unread").click(function () {
                bboardMessages.MarkAsRead($(this));
            });
        },

        MarkAsRead: function (e) {
            e.unbind();
            e.removeClass("unread");

            // Update counter
            _unreadMessagesCounter--;

            // Update view
            bboardMessages.UpdateView();
        },

        LoadingMask_MessagesIndicator: function (isLoading) {
            if (isLoading) {
                $(MessagesIndicator).removeClass("fa-circle");
                $(MessagesIndicator).addClass("fa-circle-notch fa-spin");
            } else {
                $(MessagesIndicator).removeClass("fa-circle-notch fa-spin");
                $(MessagesIndicator).addClass("fa-circle");
            }
        },

        LoadingMask_MessagesLoader: function (isLoading) {
            if (isLoading) {
                $(MessagesLoader).show();
            } else {
                $(MessagesLoader).hide();
            }
        },

        HidingMask_MessagesIndicator: function (hide) {
            if (hide) {
                $(MessagesIndicator).hide();
            } else {
                $(MessagesIndicator).show();
            }
        },

        HidingMask_MessagesUnreadCounter: function (hide) {
            if (hide) {
                $(MessagesUnreadCounter).hide();
            } else {
                $(MessagesUnreadCounter).show();
            }
        }

    };

    bboardMessages.Init();

});