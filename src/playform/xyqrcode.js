export default function xyqrcode(options) {
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
    function isEqual(a,b){
        //如果a和b本来就全等
        if(a===b){
          //判断是否为0和-0
          return a !== 0 || 1/a ===1/b;
        }
        //判断是否为null和undefined
        if(a==null||b==null){
          return a===b;
        }
        //接下来判断a和b的数据类型
        var classNameA=toString.call(a),
          classNameB=toString.call(b);
        //如果数据类型不相等，则返回false
        if(classNameA !== classNameB){
          return false;
        }
        //如果数据类型相等，再根据不同数据类型分别判断
        switch(classNameA){
          case '[object RegExp]':
          case '[object String]':
          //进行字符串转换比较
          return '' + a ==='' + b;
          case '[object Number]':
          //进行数字转换比较,判断是否为NaN
          if(+a !== +a){
            return +b !== +b;
          }
          //判断是否为0或-0
          return +a === 0?1/ +a === 1/b : +a === +b;
          case '[object Date]':
          case '[object Boolean]':
          return +a === +b;
        }
        //如果是对象类型
        if(classNameA == '[object Object]'){
          //获取a和b的属性长度
          var propsA = Object.getOwnPropertyNames(a),
            propsB = Object.getOwnPropertyNames(b);
          if(propsA.length != propsB.length){
            return false;
          }
        //   for(var i=0;i<propsB.length;i++){
        //     console.log("???????"+propsB[i])
        //   }
          for(var i=0;i<propsA.length;i++){
            var propName=propsA[i];
            
            //如果对应属性对应值不相等，则返回false
            if(a[propName] !== b[propName]){
                // a[propName] = b[propName]
              return false;
            }
          }
          return true;
        }
        //如果是数组类型
        if(classNameA == '[object Array]'){
          if(a.toString() == b.toString()){
            return true;
          }
          return false;
        }
      }
      isEqual(settings,options)
        // if (options) {
        //     $.extend(settings, options);//options对象跟settings比较，相同的就替换，没有的就添加
        // }
      console.log(settings)
        if(settings.dom.length==0){
            window.console.log("Error: dom empty!");
            return;
        }
        if(settings.url.length==0){
            window.console.log("Error: url empty!");
            return;
        }
    settings.text=settings.url; //在qrcode生成二维码的地址是text。这里就把url赋值给text
        $(settings.dom).qrcode(settings);
      
}
