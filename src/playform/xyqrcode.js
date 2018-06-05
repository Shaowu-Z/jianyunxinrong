import './jquery-qrcode-0.14.0'
function xyqrcode(options) {
  console.log("????????????"+options)
  var settings = {
      dom:'',
      render: 'canvas',   //生成二维码的格式还有image、div
      ecLevel:"H",
      text:"",
      background:"#ffffff", 
      fill:"#333333", //二维码纹路的颜色
      fontcolor:"#ff9818",
      fontname:"Ubuntu",
      image:{},
      label:"",
      mPosX:0.5,   //图片在X轴的位置
      mPosY:0.5,    //图片在X轴的位置
      mSize:0.17,   //图片大小
      minVersion:10,
      mode:4,
      quiet:1,
      radius:1,
      size:250   
  };
      if (options) {
          $.extend(settings, options);//options对象跟settings比较，相同的就替换，没有的就添加

      }
      if(settings.dom.length==0){
          window.console.log("Error: dom empty!");
          return;
      }
      if(settings.url.length==0){
          window.console.log("Error: url empty!");
          return;
      }
      console.log(settings)
  settings.text=settings.url; //在qrcode生成二维码的地址是text。这里就把url赋值给text
    //   document.getElementById(settings.dom).qrcode(settings);
      document.getElementById(settings.dom).qrcode(settings);
      
    
}
export default xyqrcode