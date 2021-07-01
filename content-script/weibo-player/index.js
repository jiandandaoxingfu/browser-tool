(function setPlay() {
	if( window.location.href.indexOf('weibo.') < 0 ) return
    if( !document.getElementsByClassName('video-player')[0] ) {
    	setTimeout( setPlay, 500 );
    	return
    }
   	let display = document.getElementsByClassName('video-player')[0].style.display;
   	document.getElementsByClassName('video-player')[0].style = `display: ${display}; position: fixed !important;    top: 30% !important;    left: 10px !important;    width: 28% !important;    height: 40% !important`;	
})()