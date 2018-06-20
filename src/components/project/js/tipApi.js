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
        insertDiv.style.cssText='position: absolute;top: 50%;margin-top: -50px;left: 50%;margin-left: -30%;z-index: 99;width:60%;height:100px;line-height:100px;overflow:hidden;background: rgb(0,0,0,0.6) url('+'"../../../../static/images/ico-warning.png"'+') no-repeat center 15px;;color:#fff;background-size:24px 24px;padding-top:54px';
        document.body.appendChild(insertDiv);
        insertDiv.appendChild(insertText);
        document.body.appendChild(dom);   

    },
    /**
     * 加载图标
     * content：加载提示文本
     * loadmask_zr：遮罩层id
     * load_zr：中间区域盒子div
     * load_text_zr：文本div
    */
    load:function(content){
        tipApi.newDom("loadmask_zr","load_zr","load_text_zr")
        document.getElementById("load_text_zr").innerHTML=content
    },
    /**
     * 成功图标
     * 其余看第一个说明
    */
    success:function(content){
        tipApi.newDom("successmask_zr","success_zr","success_text_zr")
        document.getElementById("success_text_zr").innerHTML=content
    },
    /**
     * 失败图标
     * 其余看第一个说明
    */
    failure:function(content){
        tipApi.newDom("successmask_zr","success_zr","success_text_zr")
        document.getElementById("success_text_zr").innerHTML=content
    },
    /**
     * 警告图标
     * 其余看第一个说明
    */
    waring:function(content,time){
        tipApi.newDom("waringmask_zr","waring_zr","waring_text_zr")
        document.getElementById("waring_text_zr").innerHTML=content
        if(time!=undefined){
            setTimeout(function(){
                tipApi.close("waring")
            },time*1000)
        }
    },
    /**
     * 关闭对应的弹窗
    */
    close:function(name,){
        var id=''+name //转字符串
        if(document.getElementById(id+"mask_zr")!=null){
            document.body.removeChild(document.getElementById(id+"mask_zr"))
            document.body.removeChild(document.getElementById(id+"_zr"))
         }
    }


}
export default tipApi