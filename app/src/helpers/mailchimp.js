
$(document).ready( function () {

    $('#mc-embedded-subscribe-form').validator().on('submit', function (e) {
        //$('#mc-embedded-subscribe-form').submit(function(e) {

        if (e.isDefaultPrevented()) {
            var inputs = $(e.delegateTarget).children().find('input');
            var valid = true;
            $.each(inputs, function(key, val){
                if(!val.validity.valid){
                    valid = false;
                    return;
                }
            });
            if(valid){
                // everything looks good!
                var $this = $(this);
                $.ajax({
                    type: "GET", // GET & url for json slightly different
                    url: "http://getgameface.us13.list-manage2.com/subscribe/post-json?c=?",
                    data: $this.serialize(),
                    dataType: 'json',
                    contentType: "application/json; charset=utf-8",
                    error: function (err) {
                        alert("Could not connect to the registration server.");
                    },
                    success: function (data) {
                        if (data.result != "success") {
                            // Something went wrong, do something to notify the user. maybe alert(data.msg);
                            $('.form-msg').css( "color", "#ff0000" ); //red
                            $('.form-msg').html(data.msg);
                        } else {
                            // It worked, carry on...
                            $('.form-msg').css( "color", "#24c507" ); //green
                            $('.form-msg').html(data.msg);
                            $('#mc-embedded-subscribe-form').css("display", "none");
                            if($( window ).width() < 544) {
                                // Do it if mobile view
                                $('.feature-content').css("margin-top", "200px");
                            } else {
                                // Do it if not mobile view
                                $('header .container .row').css("bottom", "200px");
                                $('header .head-content .slogan').css("margin-top", "0px");
                            }

                        }
                    }
                });
            }
        }
        return false;
    });
});
