(function() {
    if( window.location.href.indexOf('sci-hub.') < 0 ) return
    document.getElementById('article').style += "position: absolute; left: 20%; width: 60%;";
    document.getElementById('menu').style.display = "none";
})();