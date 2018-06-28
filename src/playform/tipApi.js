/**
 * 自定义的弹窗
 * 张冉
 * 2018-06-11
 * */ 
var tipApi={
   
    newDom:function(id,boxid,textid){
        var dom=document.createElement("div");  
        var insertDiv=document.createElement("div");  
        var insertText=document.createElement("div"); 
        dom.id =id;
        insertDiv.id =boxid;
        insertText.id =textid;
        dom.style.cssText='position:fixed;width:100%;height:100%;z-index:9999;background:#fff;top:0;opacity:0;display:block'; 
        insertText.style.cssText='width: auto;font-size: 16px;line-height: 23px;text-align: center';
        insertDiv.style.cssText='position: fixed;top: 50%;margin-top: -50px;left: 50%;margin-left: -30%;z-index: 999;width:60%;height:100px;line-height:100px;overflow:hidden;background: rgb(0,0,0,0.6) url('+'"../../../../static/images/ico-warning.png"'+') no-repeat center 15px;;color:#fff;background-size:24px 24px;padding-top:54px';
        document.body.appendChild(insertDiv);
        insertDiv.appendChild(insertText);
        document.body.appendChild(dom);   
    },
    //带确认 取消按钮确认框
    newDom2:function(content,btntxt1,btntxt2){
        var dom=document.createElement("div");  
        var insertDiv=document.createElement("div");  
        var insertText=document.createElement("div"); 
        var btn1=document.createElement("button");
        var btn2=document.createElement("button");
        dom.style.cssText='position:fixed;width:100%;height:100%;z-index:998;background:#666;top:0;opacity:0.6;display:block'; 
        insertText.style.cssText='width: auto;font-size: 16px;line-height: 23px;text-align: center;margin:6px auto;width:80%';
        insertDiv.style.cssText='background:#fff;position: fixed;top: 50%;margin-top: -50px;left: 50%;margin-left: -40%;z-index: 999;width:80%;padding-bottom:46px;line-height:100px;overflow:hidden;padding-top:10px';
        btn1.style.cssText="padding:0 0 0 20px;right:32%;border:0;height:36px;position:absolute;bottom:0;color:#ccc"
        btn2.style.cssText="padding:0 0 0 20px;right:9%;border:0;height:36px;position:absolute;bottom:0;color:#4ba9e9"
        insertText.innerHTML=content
        btn1.innerHTML=btntxt1
        btn2.innerHTML=btntxt2
        btn1.id="makeno"
        btn2.id="makeok"
        insertDiv.id="makesureBox"
        dom.id="makesureMask"
        document.body.appendChild(insertDiv);
        insertDiv.appendChild(insertText);
        insertDiv.appendChild(btn1);
        insertDiv.appendChild(btn2);
        document.body.appendChild(dom);  

    },
    //修改信息弹窗
    newDom3:function(title,tanslate,inputval,btnNo,btnOk){
        var dom=document.createElement("div");  
        var insertDiv=document.createElement("div");  
        var insertText=document.createElement("div");
        var insertnews=document.createElement("div"); 
        var insertinput=document.createElement("input"); 
        var btn1=document.createElement("button");
        var btn2=document.createElement("button");
        dom.style.cssText='position:fixed;width:100%;height:100%;z-index:998;background:#666;top:0;opacity:0.6;display:block'; 
        insertText.style.cssText='width: auto;font-size: 16px;line-height: 23px;text-align: center;margin:6px auto;width:80%;border-bottom:1px solid #4ba9e9;padding-bottom:6px;color:#4ba9e9';
        insertnews.style.cssText='width: auto;font-size: 16px;line-height: 23px;text-align: center;margin:6px auto;width:80%;padding-bottom:6px;font-size:14px'
        insertinput.style.cssText='width: auto;font-size: 16px;line-height: 23px;text-align: left;margin:6px auto;width:80%;padding-bottom:6px;font-size:14px;border:0.5px solid #ccc;display:block;padding:0 5px;'
        insertDiv.style.cssText='border-radius:5px;background:#fff;position: fixed;top: 50%;margin-top: -50px;left: 50%;margin-left: -40%;z-index: 999;width:80%;padding-bottom:46px;line-height:100px;overflow:hidden;padding-top:10px';
        btn1.style.cssText="font-size:16px;width:50%;left:0;border-top:0.1px solid #ccc;height:36px;border-radius:0;position:absolute;bottom:0;color:#4ba9e9"
        btn2.style.cssText="font-size:16px;width:50%;right:0;border-top:0.1px solid #ccc;border-left:0.1px solid #ccc;border-radius:0;height:36px;position:absolute;bottom:0;color:#4ba9e9"
        insertText.innerHTML=title
        insertnews.innerHTML=tanslate
        if(inputval==null|| inputval==undefined){
            inputval=''
        }
        insertinput.value=inputval
        btn1.innerHTML=btnNo
        btn2.innerHTML=btnOk
        btn1.id="changeboxno"
        btn2.id="changeboxok"
        insertDiv.id="changebox"
        dom.id="changeboxmask"
        insertinput.id="changeboxInput"
        document.body.appendChild(insertDiv);
        insertDiv.appendChild(insertText);
        insertDiv.appendChild(insertnews);
        insertDiv.appendChild(insertinput);
        insertDiv.appendChild(btn1);
        insertDiv.appendChild(btn2);
        document.body.appendChild(dom);
    },
    /**
     * 确认框
     * 用法 tipApi("文本","左按钮的值"，"右按钮的值"，function(){ 取消后执行 },function(){ 确认后执行 }}
     * content 必填（可为' '）
     * btn1,btn2,左边按钮 右边按钮的值,不填默认为 取消，确认
     * objFali:确认的后执行的方法
     * objok：取消后执行的方法
     * */ 
    makesure:function(content,btn1,btn2,objOk,objFali){
        var btntext1,btntext2,noFn,okFn
        if(btn1==undefined){
            btntext1="取消"
            noFn=function(){}
        }else if(typeof btn1=="function"){
            btntext1="取消"
            noFn=btn1
        }else if(btn1=="" && objOk==undefined){
            btntext1="取消"
            noFn=function(){}
        }else if(typeof objOk=="function" && btn1==""){
            btntext1="取消"
            noFn=objOk
        }else{
            tipApi.waring("参数错误",2)
        }

        if(btn2==undefined){
            btntext2="确认"
            okFn=function(){}
        }else if(typeof btn2=="function"){
            btntext2="确认"
            okFn=btn2
        }else if(btn2=="" && objOk==undefined){
            btntext2="确认"
            okFn=function(){}
        }else if(typeof objOk=="function" && btn2==""){
            btntext2="确认"
            okFn=objFali
        }else{
            tipApi.waring("参数错误",2)
        }

        tipApi.newDom2(content,btntext1,btntext2)
        //取消
        document.getElementById("makeno").onclick=function(){
            document.body.removeChild(document.getElementById("makesureBox"))
            document.body.removeChild(document.getElementById("makesureMask"))
            noFn()
        }
        //确认
        document.getElementById("makeok").onclick=function(){
            document.body.removeChild(document.getElementById("makesureBox"))
            document.body.removeChild(document.getElementById("makesureMask"))
            okFn()
        }
    },


    /**
     * 加载图标
     * content：加载提示文本
     * loadmask_zr：遮罩层id
     * load_zr：中间区域盒子div
     * load_text_zr：文本div
    */
    load:function(content,time){
        tipApi.newDom("loadmask_zr","load_zr","load_text_zr")
        document.getElementById("load_text_zr").innerHTML=content
        if(time!=undefined && time!=''){
            setTimeout(function(){
                tipApi.close("load")
            },time*1000)
        }
    },
    /**
     * 成功图标
     * 其余看第一个说明
    */
    success:function(content,time){
        tipApi.newDom("successmask_zr","success_zr","success_text_zr")
        document.getElementById("success_text_zr").innerHTML=content
        if(time!=undefined && time!=''){
            setTimeout(function(){
                tipApi.close("success")
            },time*1000)
        }
    },
    /**
     * 失败图标
     * 其余看第一个说明
    */
    failure:function(content,time){
        tipApi.newDom("successmask_zr","success_zr","success_text_zr")
        document.getElementById("success_text_zr").innerHTML=content
        if(time!=undefined && time!=''){
            setTimeout(function(){
                tipApi.close("failure")
            },time*1000)
        }
    },
    /**
     * 警告图标
     * 其余看第一个说明
    */
    waring:function(content,time,objOk,objFail){
        tipApi.newDom("waringmask_zr","waring_zr","waring_text_zr")
        document.getElementById("waring_text_zr").innerHTML=content
        console.log(objOk)
        if(time!=undefined && time!=''){
            setTimeout(function(){
                tipApi.close("waring")
            },time*1000)
        }

    },

    /**
     * 关闭对应的弹窗
    */
    close:function(name){
        var id=''+name //转字符串
        if(document.getElementById(id+"mask_zr")!=null){
            document.body.removeChild(document.getElementById(id+"mask_zr"))
            document.body.removeChild(document.getElementById(id+"_zr"))
         }
    },
    /**
     * 修改信息弹窗
     * title :头部标题
     * tanslate：提示信息
     * inputval：输入框初始值
     * btnOk：确定按钮字段
     * btnNo：取消按钮字段
     * objok：确认事件
     * objno：取消事件
    */
   openChange:function(title,tanslate,inputval,btnOk,btnNo,objok,objno){
        tipApi.newDom3(title,tanslate,inputval,btnOk,btnNo)
        //移除创建的弹窗
        function remove(){
            document.body.removeChild(document.getElementById('changebox'))
            document.body.removeChild(document.getElementById('changeboxmask'))
        }
        //监听取消事件
        document.getElementById('changeboxno').addEventListener("click",function(){
            if(typeof objno=="function"){
                objno()
                remove()
            }else{
                remove()
            }
        })
        //监听确认事件
        document.getElementById('changeboxok').addEventListener("click",function(){
            if(typeof objok=="function"){
                objok(value)
                remove()
            }else{
                remove()
            }
        })
        //监听输入框
        var value
        document.getElementById('changeboxInput').addEventListener("change",function(){ 
            value=this.value
        })
   }    


}
export default tipApi