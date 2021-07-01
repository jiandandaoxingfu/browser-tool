(function() {
if( window.location.href.indexOf('zhihu') > -1 ) return
let div = document.createElement('div');
div.innerHTML =`
<style>
.CornerButtons {
    z-index: 9990 !important;
    position: fixed;
    bottom: 0;
    right: 12px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    -webkit-transition: -webkit-transform .2s ease;
    transition: -webkit-transform .2s ease;
    transition: transform .2s ease;
    transition: transform .2s ease,-webkit-transform .2s ease;
    will-change: transfrom;
    border-radius: 5px;
}
.CornerButtons * {
    text-decoration: none;
    outline: none;
    border: none;
}

.CornerAnimayedFlex {
    width: 40px;
    height: 52px;
    -webkit-transition: height .2s ease;
    transition: height .2s ease
}

.CornerAnimayedFlex--hidden {
    height: 0
}

.CornerButton {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    background: #fff;
    border-radius: 4px;
    width: 40px;
    height: 40px;
    color: #8590a6;
    -webkit-box-shadow: 0 1px 3px rgba(18,18,18,.1);
    box-shadow: 0 1px 3px rgba(18,18,18,.1)
}

html[data-theme=dark] .CornerButton {
    background: #121212;
    color: #8590a6;
    -webkit-box-shadow: 0 1px 3px rgba(0,0,0,.3);
    box-shadow: 0 1px 3px rgba(0,0,0,.3)
}

.CornerButton:hover {
    background: #d3d3d3
}

html[data-theme=dark] .CornerButton:hover {
    background: #2e2e2e
}
</style>

<div class="CornerButtons"><div class="CornerAnimayedFlex">
<button onclick="document.body.scrollTop = document.documentElement.scrollTop = 0;" type="button" class="Button CornerButton Button--plain">
<svg class="Zi Zi--BackToTop" aria-label="回到顶部" fill="currentColor" viewBox="0 0 24 24" width="24" height="24"><path d="M16.036 19.59a1 1 0 0 1-.997.995H9.032a.996.996 0 0 1-.997-.996v-7.005H5.03c-1.1 0-1.36-.633-.578-1.416L11.33 4.29a1.003 1.003 0 0 1 1.412 0l6.878 6.88c.782.78.523 1.415-.58 1.415h-3.004v7.005z"></path></svg></button></div></div>
`;
document.body.appendChild(div);
})();