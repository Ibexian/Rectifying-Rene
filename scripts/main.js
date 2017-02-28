/* To Do:
[] Allow for toggling rectification 'on and off'
[] Figure out the French thing - using msoft and not an ajax call - http://msdn.microsoft.com/en-us/library/ff512385.aspx
[] Allow wallpaper dl
*/
var token;
var nlp = window.nlp_compromise;
$.ajax({
    url: 'https://api.williamkamovitch.com/translator',
    dataType: 'jsonp'
}).done(function( data ) {
    token = data.access_token;
    rectifyThis();
});

var mycallback = function(response) {
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

        var randImage = nameArray[Math.floor(Math.random() * (nameArray.length))];
        var randText = function() {
            var tempText = function() {
                if ($('#normies').prop("checked")) {
                    return randImage;
                } else {
                    var tempArray = nameArray[Math.floor(Math.random() * (nameArray.length))];
                    if (tempArray == randImage) {
                        tempArray = nameArray[Math.floor(Math.random() * (nameArray.length))];
                    }
                    return tempArray;
                }
            }
            var noun = tempText().replace(/\-/g, ' ').replace(/\d/g, '');
            var verb = noun.search(/[^d]ing/) != -1 ? nlp.verb(noun).conjugate().gerund : ""; //Hack-y way to guess if the word is a verb
            var article = nlp.noun(noun).is_uncountable() || verb ? "" : nlp.noun(noun).article() + " ";
            var split = article.toLowerCase() + (verb ? verb : noun);
            console.log("This is not " + split);
            var from = "en",
                to = "fr",
                text = split;
            var s = document.createElement("script");
            s.src = "https://api.microsofttranslator.com/V2/Ajax.svc/Translate" +
                "?appId=Bearer " + encodeURIComponent(token) +
                "&from=" + encodeURIComponent(from) +
                "&to=" + encodeURIComponent(to) +
                "&text=" + encodeURIComponent(text) +
                "&oncomplete=mycallback";
            document.body.appendChild(s);
        };

        randText();
        $('#correctImage').html('<i class=icon-' + randImage + '></i>');

    });

};
$('#rectButton').click(function() {
    rectifyThis();
});
$('#normies').click(function() {
    rectifyThis();
});
