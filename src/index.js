// window.$ = window.jQuery = require('jquery')
// window.Popper = require('popper.js')
// require('bootstrap');
// require('jquery-mousewheel')
// var jQueryBridget = require('jquery-bridget');
// var Flickity = require('flickity');
//
// jQueryBridget( 'flickity', Flickity, $);

import css from './style.scss';

//gallery-carousel-flickity
$(document).ready(function(){
    var $carousel = $('.gallery-slide').flickity({
        prevNextButtons: false,
        pageDots: false,
        imagesLoaded: true
    });
    $carousel.flickity('select', 0);
    setInterval(function () {
        $carousel.flickity('next', true);
    }, 1000);

//anchor tag to top
$(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
        $('.scrollup').fadeIn();
    } else {
        $('.scrollup').fadeOut();
    }
});
$('.scrollup').click(function () {
    $("html, body").animate({
        scrollTop: 0
    }, 600);
    return false;
});

//mobile toggle menu
jQuery('.menuOpen').click(function (e) {
    $('#mySidenav').css('width', '70%');
    console.log('hi test');
});
jQuery('.menuClose').click(function (e) {
    $('#mySidenav').css('width', '0px');
});
jQuery('#mySidenav li a.mob-link').click(function () {
    $('.active').removeClass('active');
    $(this).addClass('active');
    $('#mySidenav').css('width', '0px');
    $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top - 80
    }, 400);
    return false;
});
//mobile sub menu
jQuery('#feature-sub').on("click", function () {
    if ($(this).hasClass('panel-collapsed')) {
        // expand the panel
        $(this).find('.collapsein').slideDown();
        $(this).removeClass('panel-collapsed');
        $('.collapse-icon').text('-');

    }
    else {
        // collapse the panel
        $(this).find('.collapsein').slideUp();
        $(this).addClass('panel-collapsed');
        $('.collapse-icon').text('+');

    }
});

//footer website
var date = new Date();
var year = date.getFullYear();
document.getElementById("footer-yr").innerHTML = year;

//bootstrap tooltip menu
$('[data-toggle="tooltip"]').tooltip();

//scrollspy smooth about menu
$('.about-menu .nav-item a,.main-menu .nav-link').click(function () {
    $('html, body').stop().animate({
        scrollTop: $($(this).attr('href')).offset().top
    }, 400);
    return false;
});

    $("#watch-now").on('hidden.bs.modal', function (e) {
        $("#watch-now iframe").attr("src", $("#watch-now iframe").attr("src"));
    });


//subscription validation

$.validator.addMethod("customemail", function (value, element) {
    return /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(value)
}, "Please enter a valid email");
$("#frm-subscribe").validate({
    onfocusout: !1,
    onclick: !1,
    onsubmit: !1,
    rules: {
        email: {
            required: {
                depends: function () {
                    $(this).val($.trim($(this).val()));
                    return !0
                }
            },
            customemail: !0
        }
    },
    showErrors: function (errorMap, errorList) {
        $.each(this.successList, function (index, value) {
            return $(value).popover("hide")
        });
        return $.each(errorList, function (index, value) {
            var _popover;
            _popover = $(value.element).popover({
                placement: "top",
                content: value.message,
                template: "<div class=\"popover\"><div class=\"arrow\"></div><div class=\"popover-inner\"><div class=\"popover-content\"><p></p></div></div></div>"
            });
            var ret = $(value.element).popover("show");
            $(_popover.data('bs.popover').tip).find(".popover-content").html("<p>" + value.message + "</p>");
            return ret
        })
    }
});
$("#btnSubscribe").on("click", function (e) {
    e.preventDefault();
    if ($("#frm-subscribe").valid()) {
        var timezone = moment.tz.guess();
        var email = $("#email").val();
        var payload = {
            "Email 2": email,
            "EMAIL": email,
            "b_57f96c6eab4d0644afaba9d66_22ed6398fb": "",
            "MMERGE5": timezone
        };
        var url = "https://graspio.us9.list-manage.com/subscribe/post-json?u=57f96c6eab4d0644afaba9d66&amp;id=22ed6398fb&c=?";
        $.ajax({
            url: url,
            data: payload,
            dataType: 'jsonp'
        }).done(function (resp) {
            var success = (resp.result === 'success' || /already/.test(resp.msg));
            if (!success) console.info('MailChimp error: ' + resp.msg);
            $("#frm-subscribe").hide();
            $(".success-message").show()
        }).fail(function (response, textStatus, jqXHR) {
            $("#frm-subscribe").hide();
            $(".failure-message").show()
        })
    } else {
        console.log("Invalid")
    }
});
});
//buy section

