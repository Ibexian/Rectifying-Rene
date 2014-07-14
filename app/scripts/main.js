/* To Do:
[] Allow for toggling rectification 'on and off'
[] Figure out the French thing - using msoft and not an ajax call - http://msdn.microsoft.com/en-us/library/ff512385.aspx
[] Allow wallpaper dl
*/
var token;
$.getJSON('../../js/my.json', function(data) {
    token = data.access_token;
});
var mycallback = function(response) {
    console.log(response);
    if (response.slice(-1) == "1") {
        $('#correctText').html("Ceci n'est pas <br>" + response.slice(0, -1));
    } else {
        $('#correctText').html("Ceci n'est pas <br>" + response);
    }
};


var rectifyThis = function() {

    var randHue = Math.floor(Math.random() * (255));
    var altHue = function(number) {
        if (number > 170 || number < 70) {
            return 255 - number;
        } else return 128 - number;
    }
    $('body').css('background', 'hsl(' + randHue + ',50%, 50%)');
    $('a').css('color', 'hsl(' + altHue(randHue) + ',50%, 50%)');
    $(".btn").css({
        'background': 'hsl(' + altHue(randHue) + ',50%, 50%)',
        'border-color': 'hsl(' + altHue(randHue) + ',50%, 50%)'
    });
    $('.footer').css('color', 'hsl(' + altHue(randHue) + ',50%, 30%)');

    $.getJSON('styles/fontello/config.json', function(data) {
        var nameArray = [];
        for (i = 0; i < data.glyphs.length; i++) {
            nameArray.push(data.glyphs[i].css);
        }
        console.log();
        var randImage = nameArray[Math.floor(Math.random() * (nameArray.length))];
        var randText = function() {
            var tempText = function() {
                if ($('#normies').prop("checked")) {
                    console.log("true");
                    return randImage;
                } else {
                    var tempArray = nameArray[Math.floor(Math.random() * (nameArray.length))];
                    if (tempArray == randImage) {
                        tempArray = nameArray[Math.floor(Math.random() * (nameArray.length))];
                    }
                    return tempArray;
                }
            }
            var split = 'a ' + tempText().replace(/\-/g, ' ');
            var from = "en",
                to = "fr",
                text = split;
            var s = document.createElement("script");
            s.src = "http://api.microsofttranslator.com/V2/Ajax.svc/Translate" +
                "?appId=Bearer " + encodeURIComponent(token) +
                "&from=" + encodeURIComponent(from) +
                "&to=" + encodeURIComponent(to) +
                "&text=" + encodeURIComponent(text) +
                "&oncomplete=mycallback";
            document.body.appendChild(s);
        };
        //     $.ajax({
        //         url: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate?",
        //         data: {
        //             appId: "Bearer+" + token,
        //             text: split,
        //             from: 'en',
        //             to: 'fr'

        //         },
        //         cache: true
        //     }).done(function(data) {
        //         consol.log(data);
        //         if (data.slice(-1) == "1") {
        //             return data.slice(0, -1);
        //         }
        //         return data;
        //     })
        // }
        randText();
        $('#correctImage').html('<i class=icon-' + randImage + '></i>');

    });

};

$(document).ready(rectifyThis());
$('#rectButton').click(function() {
    rectifyThis();
});
$('#normies').click(function() {
    rectifyThis();
});