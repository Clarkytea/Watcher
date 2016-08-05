$(function() {

    Watcher = function(sites) {

        this.sites = sites.map(this.prepareFrame);
        this.block = $('<div>')
                .attr('id', 'preventius')
                .css({'width' : '100%',
                     'height' : $(window).height(),
                     'z-index' : '1', 
                     'position' : 'fixed', 
                     'top' : '0', 
                     'left' : '0'})
                .appendTo('body')
                .click(function(e) {
                    Watcher.prototype.maximise(e);
                });
    }
    Watcher.prototype.prepareFrame = function(site) {

        var w = $(window).width() / 2 - 14;
        var h = $(window).height() / 2;

        var frame = $('<iframe>')
            .attr({'src' : site, 
                'width' : w, 'height' : h, 
                'scrolling' : 'no'})
            .appendTo('body');
    };

    Watcher.prototype.getQuadrant = function(e) {
        var quadrant;
        var w = $(window).width();
        var h = $(window).height();

        //Finding out where the user has clicked on the page
        if (e.pageX <= w / 2) {
            if (e.pageY <= h / 2) {
                quadrant = 1;
            }
            else {
                quadrant = 3;
            }
        }
        else {
            if (e.pageY <= h / 2) {
                quadrant = 2;
            }
            else {
                quadrant = 4;
            }
        }
        return quadrant;
    };

    Watcher.prototype.maximise = function(site) {
        var quadrant = Watcher.prototype.getQuadrant(site);
        $('iframe').hide()
        $('#preventius').css('z-index', '-1');
        $('iframe:nth-of-type(' + quadrant + ')')
            .show()
            .width($(window).width())
            .height($(window).height())     

    };
    
    //TODO gather the URL's from form data

    
    var quadrantOne = document.getElementById('quad1').value;
    var quadrantTwo = 'http://ithelp.port.ac.uk'; 
    
    var x = new Watcher([quadrantOne, quadrantTwo, 
                    'http://is-ssddg-app-01.uni.ds.port.ac.uk/DSIGN/oaa/oaa.php', 
                    'https://css-tricks.com/jquery-coffeescript/'])

    //Goes back to the main page after hitting space bar
    // As the back-button does not work
    document.body.onkeyup = function(e){
    if(e.keyCode == 32){
        location.reload();
    }
    }
})
