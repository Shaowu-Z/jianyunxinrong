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
        dom.style.cssText='position:fixed;width:100%;height:100%;z-index:98;background:#fff;top:0;opacity:0;display:block'; 
        insertText.style.cssText='width: auto;font-size: 16px;line-height: 23px;text-align: center';
        insertDiv.style.cssText='position: absolute;top: 50%;margin-top: -50px;left: 50%;margin-left: -30%;z-index: 999;width:60%;height:100px;line-height:100px;overflow:hidden;background: rgba(0,0,0,0.6) url('+'"../../../../static/images/ico-warning.png"'+') no-repeat center 15px;;color:#fff;background-size:24px 24px;padding-top:54px;border-radius:3px';
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
        dom.style.cssText='position:fixed;width:100%;height:100%;z-index:98;background:#666;top:0;opacity:0.6;display:block'; 
        insertText.style.cssText='width: auto;font-size: 16px;line-height: 23px;text-align: center;margin:6px auto;width:80%';
        insertDiv.style.cssText='background:#fff;position: absolute;top: 50%;margin-top: -50px;left: 50%;margin-left: -40%;z-index: 99;width:80%;padding-bottom:46px;line-height:100px;overflow:hidden;padding-top:10px;border-radius:3px';
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
    load:function(content){
        tipApi.newDom("loadmask_zr","load_zr","load_text_zr")
        document.getElementById("load_text_zr").innerHTML=content
    },
    /**
     * 成功图标
     * 其余看第一个说明
    */
    success:function(content,time,obj){
        var objpro
        if(obj==undefined){
            objpro=function(){}
        }else if(typeof obj=='function'){
            objpro=obj
        }else{
            console.log("传入类型错误")
        }
        tipApi.newDom("successmask_zr","success_zr","success_text_zr")
        document.getElementById("success_text_zr").innerHTML=content
        if(time!=undefined && time!=''){
            setTimeout(function(){
                tipApi.close("success")
                objpro()
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
    }


}
export default tipApi