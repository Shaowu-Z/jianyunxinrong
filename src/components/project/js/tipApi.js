/**
 * 自定义的弹窗
 * 张冉
 * 2018-06-11
 * */ 
var tipApi={
    /*******  loading  *********/ 
    newDom:function(id,boxid,textid,type){
        var dom=document.createElement("div");  
        var insertDiv=document.createElement("div");  
        var insertText=document.createElement("div"); 
        dom.id =id;
        insertDiv.id =boxid;
        insertText.id =textid;
        // dom.style.cssText='position:fixed;width:100%;height:100%;z-index:98;background:#fff;top:0;opacity:0;display:block'; 
        // insertText.style.cssText='width: auto;font-size: 16px;line-height: 23px;text-align: center';
        // insertDiv.style.cssText='position: absolute;top: 50%;margin-top: -50px;left: 50%;margin-left: -30%;z-index: 99;width:60%;height:100px;line-height:100px;overflow:hidden;background: rgb(0,0,0,0.6) url('+'"../../../../static/images/ico-warning.png"'+') no-repeat center 15px;;color:#fff;background-size:24px 24px;padding-top:54px';
        document.body.appendChild(insertDiv);
        insertDiv.appendChild(insertText);
        document.body.appendChild(dom);   
        if(type==1){
            dom.style.cssText='position:fixed;width:100%;height:100%;z-index:98;background:#fff;top:0;opacity:0;display:block';
            insertText.style.cssText='width: auto;font-size: 16px;line-height: 23px;text-align: center';
            insertDiv.style.cssText='position: absolute;top: 50%;margin-top: -50px;left: 50%;margin-left: -30%;z-index: 99;width:60%;height:100px;line-height:100px;overflow:hidden;background: rgb(0,0,0,0.6) url('+'"../../../../static/images/ico-warning.png"'+') no-repeat center 15px;;color:#fff;background-size:24px 24px;padding-top:54px';
        }else if(type==2){
            var btnDiv=document.createElement("div");
            var btn1=document.createElement("button");
            var btn2=document.createElement("button");
            btnDiv.id="makesure"
            btn1.id="makebtn1"
            btn2.id="makebtn2"
            btnDiv.appendChild(btn2)
            btnDiv.appendChild(btn1)
            insertDiv.appendChild(btnDiv)
            dom.style.cssText='position:fixed;width:100%;height:100%;z-index:98;background:#666;top:0;opacity:0.6;display:block';
            btnDiv.style.cssText="height:46px;width:100%;"
            btn1.style.cssText="line-height:46px;text-align:center;padding:0 26px;border:0;float:right"
            btn2.style.cssText="line-height:46px;text-align:center;padding:0 26px;color:#4ba9e9;border:0;float:right"
            // btn1.innerText="取消"
            // btn2.innerText="确定"
            insertDiv.style.cssText='border-radius:3px;background:#fff;position: absolute;top: 50%;margin-top: -50px;left: 50%;margin-left: -40%;z-index: 99;width:80%;height:auto;line-height:100px;overflow:hidden;';
            insertText.style.cssText='width: 100%;font-size: 16px;line-height: 23px;text-align: center;margin:26px auto 10px;padding:0 16px';
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
        tipApi.newDom("loadmask_zr","load_zr","load_text_zr",1)
        document.getElementById("load_text_zr").innerHTML=content
        if(time!=undefined){
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
        tipApi.newDom("successmask_zr","success_zr","success_text_zr",1)
        document.getElementById("success_text_zr").innerHTML=content
        if(time!=undefined){
            setTimeout(function(){
                tipApi.close("load")
            },time*1000)
        }
    },
    /**
     * 失败图标
     * 其余看第一个说明
    */
    failure:function(content,time){
        tipApi.newDom("successmask_zr","success_zr","success_text_zr",1)
        document.getElementById("success_text_zr").innerHTML=content
        if(time!=undefined){
            setTimeout(function(){
                tipApi.close("load")
            },time*1000)
        }
    },
    /**
     * 警告图标
     * 其余看第一个说明
    */
    waring:function(content,time){
        tipApi.newDom("waringmask_zr","waring_zr","waring_text_zr",1)
        document.getElementById("waring_text_zr").innerHTML=content
        if(time!=undefined){
            setTimeout(function(){
                tipApi.close("load")
            },time*1000)
        }
    },
    /**
     * 确认，取消
     * 其余看第一个说明
    */
   makeSure:function(content,btn1,btn2,obj1,obj2){
    tipApi.newDom("suremask_zr","sure_zr","sure_text_zr",2)
    document.getElementById("sure_text_zr").innerHTML=content
    if(btn1==undefined){
        document.getElementById("makebtn1").innerHTML="取消"
    }else{
        document.getElementById("makebtn1").innerHTML=btn1
    }
    if(btn2==undefined){
        document.getElementById("makebtn2").innerHTML="确认"
    }else{
        document.getElementById("makebtn2").innerHTML=btn2
    }
    document.getElementById("makebtn2").addEventListener("click",function(){
        tipApi.close("sure")
    })
    document.getElementById("makebtn2").addEventListener("click",obj1)
    document.getElementById("makebtn1").addEventListener("click",function(){
        tipApi.close("sure")
    })
    document.getElementById("makebtn1").addEventListener("click",obj2)

    // document.getElementById("makebtn1").onclick=obj2
    
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
    }


}
export default tipApi