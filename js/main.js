$.fn.set_font_size = function(){
    if ($(window).width() > 992) {
        $('h1').css('font-size',
            72
        );
        $('h3').css('font-size',
            30
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
            23
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
    $('#main').css('height', $(this).height());
    $('#content').css('top',
        ($(this).height() - $('#content').height()) / 2
    );
    $('#title').align_left();
    $('#links').align_right();
    $('.projects').hide();
    $(window).set_font_size();
    document.getElementById("misc_actions_text").textContent="link to github";
};

$.fn.view_content = function(){
    $('#main').css('height', $(this).height());
    $('#content').css('top',
        ($(this).height() - $('#content').height()) / 2
    );
    $('#title').hide();
    $('#links').align_right();
    $(window).set_font_size();
    document.getElementById("misc_actions_text").textContent="< return";
}

$(document).ready(function(){
    window.current_view = "home";
    $(window).home();
    $('.materialboxed').materialbox();
});

$(window).resize(function(){
    $(window).set_font_size();
    if (window.current_view == "home") {
        $(window).home();
    } else {
        $(window).view_content();
        if (window.current_view == "scripts") {
            $('#scripts_content').align_left();
        } else if (window.current_view == "complete") {
            $('#complete_content').align_left();
        } else if (window.current_view == "current") {
            $('#current_content').align_left();
        }
        if ($(window).width() <= 600) {
            $('#links').hide();
        } else {
            $('#links').align_right();
        }
    }
});

$('#scripts').click(function() {
    window.current_view = "scripts";
    $(window).view_content();
    $('#scripts_content').align_left();
    $('#complete_content').hide();
    $('#current_content').hide();
    if ($(window).width() <= 600) {
        $('#links').hide();
    } else {
        $('#links').align_right();
    }
})

$('#complete').click(function() {
    window.current_view = "complete";
    $(window).view_content();
    $('#scripts_content').hide();
    $('#complete_content').align_left();
    $('#current_content').hide();
    if ($(window).width() <= 600) {
        $('#links').hide();
    } else {
        $('#links').align_right();
    }
})

$('#current').click(function() {
    window.current_view = "current";
    $(window).view_content();
    $('#scripts_content').hide();
    $('#complete_content').hide();
    $('#current_content').align_left();
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