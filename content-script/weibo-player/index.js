(function setPlay() {
	if( window.location.href.indexOf('weibo.') < 0 ) return
    if( !document.getElementsByClassName('video-player')[0] ) {
    	setTimeout( setPlay, 500 );
    	return
    }
    let player = document.getElementsByClassName('video-player')[0];
   	let display = player.style.display;
    let style = document.createElement('style');
    style.innerHTML = `
      .video-player {
        position: fixed !important;
        top: 30% !important;
        left: 10px !important;
        width: 28% !important;   
        height: 40% !important
      }`;
    document.body.appendChild(style)
})()