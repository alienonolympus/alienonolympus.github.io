$.fn.set_font_size = function(){
    if ($(window).width() > 992) {
        $('h1').css('font-size',
            72
        );
        $('h3').css('font-size',
            29
        );
        $('p').css('font-size',
            20
        );
        $('p').css('text-align', 'justify');
    } else if ($(window).width() > 600) {
        $('h1').css('font-size',
            64
        );
        $('h3').css('font-size',
            21
        );
        $('p').css('font-size',
            20
        );
        $('p').css('text-align', 'justify');
    } else {
        $('h1').css('font-size',
            48
        );
        $('h3').css('font-size',
            28
        );
        $('p').css('font-size',
            20
        );
        $('p').css('text-align', 'justify');
    }
    $('.projects').css('height',
        $(window).height() * 0.90
    );
};

$.fn.valign_center = function(){
    $(this).css('margin-top',
        ($(this).parent().height() - $(this).height()) / 2
    );
};

$.fn.hide = function(){
    $(this).css('display', 'none');
}

$.fn.show = function(){
    $(this).css('display', 'inline-block');
}

$.fn.align_left = function(){
    $(this).valign_center();
    $(this).css('left', '5px');
    if ($(window).width() > 600) {
        $(this).css('width', '55%');
    } else {
        $(this).css('width', '95%');
    }
    $(this).css('text-align', 'left');
    $(this).show();
};

$.fn.align_right = function(){
    $(this).valign_center();
    $(this).css('right', '5px');
    if ($(window).width() > 600) {
        $(this).css('width', '45%');
    } else {
        $(this).css('width', '90%');
    }
    $(this).css('text-align', 'right');
    $(this).show();
};

$.fn.home = function(){
    $(window).set_font_size();
    $('#main').css('height', $(this).height());
    $('#content').css('top',
        ($(this).height() - $('#content').height()) / 2
    );
    $('#title').align_left();
    $('#links').align_right();
    $('.projects').hide();
    document.getElementById("misc_actions_text").textContent="link to github";
};

$.fn.view_content = function(){
    $(window).set_font_size();
    $('#main').css('height', $(this).height());
    $('#content').css('top',
        ($(this).height() - $('#content').height()) / 2
    );
    $('#title').hide();
    $('#links').align_right();
    document.getElementById("misc_actions_text").textContent="< return";
}

$(document).ready(function(){
    window.current_view = "home";
    $(window).home();
    $('.materialboxed').materialbox();
    $(window).home();
});

$(window).resize(function(){
    if (window.current_view == "home") {
        $(window).home();
    } else {
        $(window).view_content();
        if (window.current_view == "about") {
            $('#about_content').align_left();
        } else if (window.current_view == "featured") {
            $('#featured_content').align_left();
        } else if (window.current_view == "archive") {
            $('#archive_content').align_left();
        }
        if ($(window).width() <= 600) {
            $('#links').hide();
        } else {
            $('#links').align_right();
        }
    }
});

$('#about').click(function() {
    window.current_view = "about";
    $(window).view_content();
    $('#about_content').align_left();
    $('#featured_content').hide();
    $('#archive_content').hide();
    if ($(window).width() <= 600) {
        $('#links').hide();
    } else {
        $('#links').align_right();
    }
})

$('#featured').click(function() {
    window.current_view = "featured";
    $(window).view_content();
    $('#about_content').hide();
    $('#featured_content').align_left();
    $('#archive_content').hide();
    if ($(window).width() <= 600) {
        $('#links').hide();
    } else {
        $('#links').align_right();
    }
})

$('#archive').click(function() {
    window.current_view = "archive";
    $(window).view_content();
    $('#about_content').hide();
    $('#featured_content').hide();
    $('#archive_content').align_left();
    if ($(window).width() <= 600) {
        $('#links').hide();
    } else {
        $('#links').align_right();
    }
})

$('#misc_actions').click(function() {
    if (window.current_view == "home") {
        window.open("https://github.com/alienonolympus");
    } else {
        window.current_view = "home";
        $(window).home();
    }
})

$('.return').click(function() {
    window.current_view = "home";
    $(window).home();
})