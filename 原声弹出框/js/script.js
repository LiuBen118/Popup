;(function(win){
function Pop(opt){
	var opts = {
		title : "",
		contemt : ""
	}
	for( var key in opt  ){
		opts[key] = opt[key];
	}
	this.opts = opts;
	this.init();
}
Pop.prototype = {
	init : function(){
		this.Render();
		this.BtnClick();
		this.Move();
	},
	Render : function(){
		var win_W = window.innerWidth,
			win_H = window.innerHeight,
			body_H = document.body.offsetHeight;

		var mark = document.createElement( 'div' );
			mark.className = 'mark';
			if( body_H>win_H ){
				mark.style.height = body_H+"px";
			}else{
				mark.style.height = win_H+"px";
			}
		var oBox = document.createElement( 'div' );
			oBox.className = 'oBox';
			mark.appendChild( oBox );
		var str = "<h2 class='h2'>"+this.opts.title+"</h2>"
					+"<p>"+this.opts.contemt+"</p>";
					
			if( this.opts.btn.length == 1 ){
				str+="<div><a href='#' class='ok'>"+this.opts.btn[0]+"</a></div>";
			}else{
				str+="<div><a href='#' class='ok'>"+this.opts.btn[0]+"</a><span></span>"
					+"<a href='#' class='file'>"+this.opts.btn[1]+"</a></div>";
			}
			oBox.innerHTML = str;
			document.body.appendChild( mark );
	},
	BtnClick : function(){
		var _this = this;
		document.body.onclick = function(ev){
			var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if( target.className == 'ok' ){
            	_this.opts.yes()
            	target.parentNode.parentNode.parentNode.className = 'del mark';
            	setTimeout( function(){
            		document.body.removeChild( target.parentNode.parentNode.parentNode )
            	}, 400)
            }else if( target.className == 'file' ){
            	_this.opts.file();
            	target.parentNode.parentNode.parentNode.className = 'del mark';
            	setTimeout( function(){
            		document.body.removeChild( target.parentNode.parentNode.parentNode )
            	}, 400)
            	
            }
		}
	},
	Move : function(){
		if( !this.opts.move ){ return false }
		document.body.onmousedown = function(ev){
			var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if( target.nodeName == 'H2' ){
            	var oBox = target.parentNode;
            	var L = ev.clientX-oBox.offsetLeft;
            	var T = ev.clientY-oBox.offsetTop;
            	document.onmousemove = function(eve){
					var eve = eve || window.event;
					var left = eve.clientX-L;
					var top = eve.clientY-T;

					var maxW = window.innerWidth-oBox.offsetWidth;
					var maxH = window.innerHeight-oBox.offsetHeight;

					left<0?left=0:left;
					left>maxW?left=maxW:left;
					top<0?top=0:top;
					top>maxH?top=maxH:top;

					oBox.style.left = left+"px";
					oBox.style.top = top+"px";
					oBox.style.margin = 0;
					
				}
            }
		}
		document.body.onmouseup = function(){
			document.onmousemove = null;
		}
	}

}

win.pop = {
	pop (opts){
		new Pop(opts);
	}
}

})( window )

$.fn.Pop = function( obj ){
	pop.pop( obj );
}





