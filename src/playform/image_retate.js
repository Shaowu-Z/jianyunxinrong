/**
 * 图片角度校正
 * auth panzhenfei
 * 2018.6.11
 */


import EXIF from 'exif-js' 
var image_retate={
    //定义变量
    fileBase64:"",
    width:"",
    height:"",


    //定义方法
     selectFileImage:function (fileObj){

        var zrimg;
        var file = fileObj.files['0'];
        //图片方向角 added by lzk
        var Orientation = null;
    
        if(file) {
            //		      console.log("正在上传,请稍后...");
            var rFilter = /^(image\/jpeg|image\/png)$/i; // 检查图片格式
            if(!rFilter.test(file.type)) {
                return;
            }
            //获取照片方向角属性，用户旋转控制
            EXIF.getData(file, function() {
                EXIF.getAllTags(this);
                Orientation = EXIF.getTag(this, 'Orientation');
            });
    
            var oReader = new FileReader();
            oReader.onload = function(e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function() {
                    image_retate.width = image.width;
                    image_retate.height = image.height;
                    var expectWidth = this.naturalWidth;
                    var expectHeight = this.naturalHeight;
    
                    if(this.naturalWidth > this.naturalHeight && this.naturalWidth > 800) {
                        expectWidth = 800;
                        expectHeight = expectWidth * this.naturalHeight / this.naturalWidth;
                    } else if(this.naturalHeight > this.naturalWidth && this.naturalHeight > 1200) {
                        expectHeight = 1200;
                        expectWidth = expectHeight * this.naturalWidth / this.naturalHeight;
                    }
                    var canvas = document.createElement("canvas");
                    var ctx = canvas.getContext("2d");
                    canvas.width = expectWidth;
                    canvas.height = expectHeight;
                    ctx.drawImage(this, 0, 0, expectWidth, expectHeight);
                    var base64 = null;
                    //修复ios
                    if(navigator.userAgent.match(/iphone/i) || navigator.userAgent.match(/ipad/i)) {
                        //如果方向角不为1，都需要进行旋转
                        if(Orientation != "" && Orientation != 6) {
                            switch(Orientation) {
                                //右边拍摄
                                case 3: //
                                    rotateImg(this, 'mid', canvas);
                                    //                                      rotateImg(this, 'right', canvas);
                                    //                                      rotateImg(this, 'right', canvas);
                                    break;
                                case 1: //左边拍摄
                                    //                                      rotateImg(this, 'right', canvas);
                                    break;
                                case 8: //上边拍摄
                                    rotateImg(this, 'right', canvas); //转两次
                                    //                                      rotateImg(this, 'right', canvas);
                                    break;
                            }
                        } else {
                            switch(Orientation) {
                                case 6: //正常竖着拍摄
                                    rotateImg(this, 'left', canvas); //转两次
                                    //                                      rotateImg(this, 'right', canvas);
                                    break;
                            }
                        }
                        var img = new Image();
                        img.onload = function() {
    
                            var canvas_w = Number(ctx.canvas.width);
                            var canvas_h = Number(ctx.canvas.height);
    
                            // 执行Canvas的drawImage语句
                            ctx.drawImage(img, x, y, w, h);
                        }
                        base64 = canvas.toDataURL("image/jpeg", 0.2);
    
                    } else if(navigator.userAgent.match(/Android/i)) { // 修复android
                        base64=e.target.result;
                        // var encoder = new JPEGEncoder();
                        // base64 = encoder.encode(ctx.getImageData(0, 0, expectWidth, expectHeight), 80);
                    } else {
                        if(Orientation != "" && Orientation != 1) {
                            switch(Orientation) {
                                case 6: //需要顺时针（向左）90度旋转
                                    //                              alert('需要顺时针（向左）90度旋转');
                                    rotateImg(this, 'right', canvas);
                                    break;
                                case 8: //需要逆时针（向右）90度旋转
                                    //                              alert('需要顺时针（向w右 ）90度旋转');
                                    rotateImg(this, 'right', canvas);
                                    break;
                                case 3: //需要180度旋转
                                    //                              alert('需要180度旋转');
                                    rotateImg(this, 'right', canvas); //转两次
                                    rotateImg(this, 'right', canvas);
                                    break;
                            }
                        }
                        base64 = canvas.toDataURL("image/jpeg", 0.8);
                       
                    }
                    
                    image_retate.fileBase64 = base64; //赋值给全局变量
                   
                };
              
    
            };
            oReader.readAsDataURL(file);
            return oReader;
        }
    },

     rotateImg:function(img, direction, canvas) {
     
        //最小与最大旋转方向，图片旋转4次后回到原方向
        var min_step = 0;
        var max_step = 3;
        //var img = document.getElementById(pid);
        if(img == null) return;
        //img的高度和宽度不能在img元素隐藏后获取，否则会出错
        var height = img.height;
        var width = img.width;
        //var step = img.getAttribute('step');
        var step = 2;
        if(step == null) {
            step = min_step;
        }
        if(direction == 'right') {
            step++;
            //旋转到原位置，即超过最大值
            step > max_step && (step = min_step);
        }
        if(direction == 'left') {
            step--;
            step < min_step && (step = max_step);
        }
        if(step=='mid'){
            step=2
        }
        //旋转角度以弧度值为参数
        var degree = step * 90 * Math.PI / 180;
        var ctx = canvas.getContext('2d');
        switch(step) {
            case 0:
                canvas.width = width;
                canvas.height = height;
                ctx.drawImage(img, 0, 0);
                break;
            case 1:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, 0, -height);
                break;
            case 2:
                canvas.width = width;
                canvas.height = height;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, -height);
                break;
            case 3:
                canvas.width = height;
                canvas.height = width;
                ctx.rotate(degree);
                ctx.drawImage(img, -width, 0);
                break;
        }
   }

}

export default image_retate