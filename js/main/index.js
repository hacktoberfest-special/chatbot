initialized = false;

$(document).ready(function () {
    //Toggle fullscreen
    $(".chat-bot-icon").click(function (e) {
        $(this).children('img').toggleClass('hide');
        $(this).children('svg').toggleClass('animate');
        $('.chat-screen').toggleClass('show-chat');
        if (!initialized) {
            respond('Hi, thank you for choosing us. Please select an option from below.', ['Contact', 'Courses', 'Resources', 'Blogs'], initialize = true);
            initialized = true;
        }
    });
    $('.chat-mail button').click(function () {
        $('.chat-mail').addClass('hide');
        $('.chat-body').removeClass('hide');
        $('.chat-input').removeClass('hide');
        $('.chat-header-option').removeClass('hide');
    });
    $('.end-chat').click(function () {
        $('.chat-body').addClass('hide');
        $('.chat-input').addClass('hide');
        $('.chat-session-end').removeClass('hide');
        $('.chat-header-option').addClass('hide');
    });
    //$('.chat-body').append(createTypingEffect('you'));
    //$('.chat-body').append(createText('you', 'Yes! this is working'));
    //$('.chat-body').append(createTypingEffect('you'));
    //$('.chat-body').append(createText('me', 'Cool!'));
    // $('.chat-body').append(createChoices(['me', 'Hi', 'help', 'Bye']));
});