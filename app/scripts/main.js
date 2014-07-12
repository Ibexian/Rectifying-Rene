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
            var tempText = nameArray[Math.floor(Math.random() * (nameArray.length))];
            console.log(randImage + " " + tempText);
            if (tempText == randImage) {
                console.log('true');
                tempText = nameArray[Math.floor(Math.random() * (nameArray.length))];
            }
            var split = 'a ' + tempText.replace(/\-/g, ' ');
            $.ajax({
                url: "http://api.microsofttranslator.com/V2/Ajax.svc/Translate?",
                data: {
                    appId: "Bearer+http%3a%2f%2fschemas.xmlsoap.org%2fws%2f2005%2f05%2fidentity%2fclaims%2fnameidentifier=wjkamovitch&http%3a%2f%2fschemas.microsoft.com%2faccesscontrolservice%2f2010%2f07%2fclaims%2fidentityprovider=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&Audience=http%3a%2f%2fapi.microsofttranslator.com&ExpiresOn=1405200149&Issuer=https%3a%2f%2fdatamarket.accesscontrol.windows.net%2f&HMACSHA256=uzSXCTCokzLVt%2bQve6wxDm1627Z696f5U9XLFk88hHE%3d",
                    text: encodeURIComponent(split),
                    from: 'en',
                    to: 'fr'

                },
                cache: true
            }).done(function(data) {
                if (data.slice(-1) == "1") {
                    return data.slice(0, -1);
                }
                return data;
            })
        }

        $('#correctImage').html('<i class=icon-' + randImage + '></i>');
        $('#correctText').html("Ceci n'est pas <br>" + randText());
    });

}
$(document).ready(rectifyThis());
$('#rectButton').click(function() {
    rectifyThis();
});