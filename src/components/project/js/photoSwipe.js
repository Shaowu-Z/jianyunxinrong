/**
 * 基于Swiper封装的图片预览功能
 */
import {Base} from '../../../playform/common.js'
var pswipe = {
	swiper:null,
	init:function(){
		//<!-- Swiper -->
		var html = 
		'<div class="swiper-container" id="origin-img" style="display:none;position:fixed;z-index: 1000;top:0;left:0;width:100%;height:100%;background:rgba(0, 0, 0,1);">'+
		'    <div class="swiper-wrapper"></div>'+
		'    <div class="swiper-pagination" style="top:1em;bottom:auto;color:#fff;"></div>'+
		'</div>';
		var vir = document.createElement("div");
        vir.innerHTML = html;
        document.body.appendChild(vir);

        this.eventInit();
        this.swiperInit();
	},
	eventInit:function(){
		// 防止冒泡滚动
		// $("#origin-img").on("touchmove",function(event){
		//     event.preventDefault();
		// });
		var img=document.getElementById("origin-img");
        img.addEventListener('click',function(obj){
        },true);//如果未false则为事件冒泡，不填的话，默认false
	},
	swiperInit:function(){
		var _self = this;
		var m = function(){
			_self.swiper = new Swiper('.swiper-container',{
			    zoom:true,
			    width: window.innerWidth,
			    virtual: true,
				spaceBetween:20,
				pagination: {
			        el: '.swiper-pagination',
			        type: 'fraction',
			    },
			    on:{
			    	// 关闭
			        click: function(){
			            //$('#origin-img').fadeOut('fast');

                        fadeOut(document.getElementById("origin-img"),0.5)
				        this.virtual.slides.length=0;
			            this.virtual.cache=[]; 
				        swiperStatus=false;
				        appApi.showBack();
			        },
			        // 关闭
			        touchMoveOpposite(event){
				        $('#origin-img').fadeOut('fast');
				        this.virtual.slides.length=0;
			            this.virtual.cache=[]; 
				        swiperStatus=false;
				        appApi.showBack();
				    },
			   },
			});
		}
		
		if (!(typeof Swiper === "function")) {
			// function不存在
			Base.getScript("//cdn.bootcss.com/Swiper/4.2.0/js/swiper.min.js", function d() {
				m();
			});
			Base.getStyle("//cdn.bootcss.com/Swiper/4.2.0/css/swiper.min.css", function d(){
				
			})
		}else{
			m();
		}
		
	},
	openImgView:function(index,imgsData){
		var _self = this;
	
	    appApi.hideBack();
	    for(var i=0;i<imgsData.length;i++){
		    _self.swiper.virtual.appendSlide('<div class="swiper-zoom-container"><img src="'+imgsData[i]+'" style="vertical-align:middle;"/></div>');
	    }
		_self.swiper.slideTo(index);
		//$('#origin-img').fadeIn('fast');

        fadeIn(document.getElementById("origin-img"),0.5)
		swiperStatus=true;
	}
	
}
pswipe.init();



function fadeIn(elem, speed) {
    /*
     * elem, the id of the element;
     * speed, the speed for the fadeIn.(The value lower, the less time needs)
     * opacity, the target opacity will be reach, 0.0 to 1.0
     */
    elem.style.display = "block";
    setOpacity(elem, 0);

    var tempOpacity = 0;
    (function(){
        setOpacity(elem, tempOpacity);
        tempOpacity += 0.05;
        if(tempOpacity <= 1) {
            setTimeout(arguments.callee, speed);
            //tempOpacity += 0.05;
        }
    })();
}

function fadeOut(elem, speed) {
    /*
     * elem, the id of the element;
     * speed, the speed for the fadeout;
     speed, the speed for the fadein.(The value lower, the less time needs);
     */
    elem.style.display="block";
    var tempOpacity = 1;
    (function(){
        setOpacity(elem, tempOpacity);
        tempOpacity -= 0.05;
        if(tempOpacity > 0) {
            setTimeout(arguments.callee, speed);
            //console.log("why");
        } else {
            elem.style.display = "none"; //不可放在匿名函数外面会先执行。
        }
    })();
    //elem.style.display = "none";
}

function setOpacity(elem, opacity) {
    /*
     * elem : The id of the element;
     * opacity: The value of alpha, which is a decimals.
     */
    if(elem.style.filter) {   //IE
        elem.style.filter = 'alpha(opacity:' + opacity * 100 + ')';
    } else {
        elem.style.opacity = opacity;
    }
}

function fadeTo(elem, speed, opacity){
    /* elem, the id of the element;
     * speed, the speed to of the fadeTo.(The value lower, the less time needs)
     * opacity, the opacity of the final result;
     */
    var tempOpacity = 0;
    elem.style.display = "block";
    (function(){
        setOpacity(elem, tempOpacity);
        tempOpacity += 0.05;
        if(tempOpacity <= opacity) {
            setTimeout(arguments.callee, speed);
        }
    })();
}
export default pswipe