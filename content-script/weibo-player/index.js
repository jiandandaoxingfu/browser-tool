(function setPlay() {
	if( window.location.href.indexOf('weibo.') < 0 ) return
    if( !document.getElementsByClassName('video-player')[0] ) {
    	setTimeout( setPlay, 500 );
    	return
    }
    let player = document.getElementsByClassName('video-player')[0];
    player.setAttribute("draggable", "true");
    player.style = `
        position: fixed !important;
        top: 30% !important;
        left: 10px !important;
        width: 28%;   
        height: 40%;
        display: none;
    `;

    let mouseX, mouseY;
    
    player.addEventListener('drag', e => {
      player.style.width = `calc(28% + ${e.clientX - mouseX}px)`;
      player.style.height = `calc(40% + ${e.clientY - mouseY}px)`;
    })

    player.addEventListener('dragstart', e => {
      console.log('dragstart');
      mouseX = e.clientX;
      mouseY = e.clientY;
    })

    player.addEventListener('dragend', e => {
      player.style.width = `calc(28% + ${e.clientX - mouseX}px)`;
      player.style.height = `calc(40% + ${e.clientY - mouseY}px)`;
    })

    document.querySelector('button[title="关闭"]')
      .addEventListener('click', e => {
        player.style.width = '28%';
        player.style.height = '40%';
      })

})()