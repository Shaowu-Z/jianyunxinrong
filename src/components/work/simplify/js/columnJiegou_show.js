/**
 * Created by Administrator on 2017-10-24.
 * v2
 * 控制页面的显示状态
 */
import {$param,$group,$onclick,$label,$tiaojian,$data,$date} from "./columnTools"
import {$id} from "./columnJiegou_create"
import {removeClass,addClass} from '../../../../playform/common'

var $date_show={
    sel_date_main:function (isShow) {
        $date_show.sel_dateStart_main(isShow);
        $date_show.sel_dateEnd_main(isShow);
    },
    sel_dateStart_main:function (isShow) {
        if(isShow==true){
            if(document.getElementById("sel_dateStart")){
                document.getElementById("sel_dateStart").innerHTML=$date.sel_dateStart;
            }
            document.getElementById("sel_dateStart").style.display="block";
            document.getElementById("val_del_dateStart").style.display="none";
            document.getElementById("btn_del_dateStart").style.display="block";
        }else{
            document.getElementById("sel_dateStart").style.display="none"
            document.getElementById("val_del_dateStart").style.display="block"
            document.getElementById("btn_del_dateStart").style.display="none";
        }
    },
    sel_dateEnd_main:function (isShow) {
        if(isShow==true) {
            if (document.getElementById("sel_dateEnd")) {
                document.getElementById("sel_dateEnd").innerHTML = $date.sel_dateEnd;
            }
            document.getElementById("sel_dateEnd").style.display = "block"
            document.getElementById("val_del_dateEnd").style.display = "none";
            document.getElementById("btn_del_dateEnd").style.display="block";
        }else{
            document.getElementById("sel_dateEnd").style.display = "none"
            document.getElementById("val_del_dateEnd").style.display = "block";
            document.getElementById("btn_del_dateEnd").style.display="none";
        }
    }
}
var $id_show={
    information:true,
    no_data:false,
    mini_top:false,
    group_top:true,
    tiaojian:false,
    list:false,
    recorder_list:false,
    group_list:false,

    get_isShow:function (where) {
        $id_show.information = document.getElementById($id.information).style.display=="none"?false:true;
        $id_show.no_data = document.getElementById($id.no_data).style.display=="none"?false:true;
        $id_show.mini_top = document.getElementById($id.mini_top).style.display=="none"?false:true;
        $id_show.group_top = document.getElementById($id.group_top).style.display=="none"?false:true;
        $id_show.tiaojian = document.getElementById($id.tiaojian).style.display=="none"?false:true;
        $id_show.list = document.getElementById($id.list).style.display=="none"?false:true;
        $id_show.recorder_list = document.getElementById($id.recorder_list).style.display=="none"?false:true;
        $id_show.group_list = document.getElementById($id.group_list).style.display=="none"?false:true;

        $id_show.view_show_status(where);
    },
    view_show_status:function (where) {
        // console.info(where+"显示状态=================================================$id_show.view_show")
        // console.info("information="+ $id_show.information);
        // console.info("no_data="+ $id_show.no_data);
        // console.info("tiaojian="+ $id_show.tiaojian);
        // console.info("group_top="+ $id_show.group_top);
        // console.info("mini_top="+ $id_show.mini_top);
        // console.info("list="+ $id_show.list);
        // console.info("recorder_list="+ $id_show.recorder_list);
        // console.info("group_list="+ $id_show.group_list);
    },
    // 记录上一次有数据的时候，显示状态；
    lastTime:{

        information:true,
        no_data:false,
        mini_top:false,
        group_top:true,
        tiaojian:false,
        list:false,
        recorder_list:false,
        group_list:false,

        had_recorded:false,//是否记录了无数据前的状态，false 没有记录，true 已记录；

        get_isShow:function (where) {
            if($data.first_read != true){
                $tiaojian_change.show($tiaojian_change.isShow($tiaojian.name_long));
                $id_show.lastTime.group_top = document.getElementById($id.group_top).style.display=="none"?false:true;
                $id_show.lastTime.mini_top = document.getElementById($id.mini_top).style.display=="none"?false:true;
                $id_show.lastTime.list = document.getElementById($id.list).style.display=="none"?false:true;
                $id_show.lastTime.recorder_list = document.getElementById($id.recorder_list).style.display=="none"?false:true;
                $id_show.lastTime.group_list = document.getElementById($id.group_list).style.display=="none"?false:true;
                $id_show.lastTime.view_show_status(where);
                $id_show.lastTime.is_first = false;
            }
        },
        view_show_status:function (where) {
            // console.info(where+"上一次有数据时候的显示状态======================================$id_show.lastTime.view_show")
            // console.info("had_recorded="+$id_show.lastTime.had_recorded);
            // console.info("tiaojian="+ $id_show.lastTime.tiaojian);
            // console.info("group_top="+ $id_show.lastTime.group_top);
            // console.info("mini_top="+ $id_show.lastTime.mini_top);
            // console.info("list="+ $id_show.lastTime.list);
            // console.info("recorder_list="+ $id_show.lastTime.recorder_list);
            // console.info("group_list="+ $id_show.lastTime.group_list);
        }
    }
}
var $top_changed ={
    mini_top_show :function (where) {

        $label.btn_zhankaisouqi="查看汇总";
        document.getElementById($id.group_top).style.display="none";
        document.getElementById($id.mini_top).style.display="block";
        document.getElementById($id.list).style.display = "block";
        $list.show();
        document.getElementById("div_fenzu").className=document.getElementById("div_fenzu").className.replace(' disabled','');
        document.getElementById("div_orderby").className=document.getElementById("div_orderby").className.replace(' disabled','');
        $zhankaiShouqi.jiantoufangxiang("id_zhankaisouqi_icon","down");
        $id_show.get_isShow("mini_top_show");
        $id_show.view_show_status(where);
        $list.marginTop();
    },
    group_top_show:function (where) {

        $label.btn_zhankaisouqi = "查看明细";
        document.getElementById($id.group_top).style.display="block";
        document.getElementById($id.mini_top).style.display="none";
        document.getElementById($id.list).style.display = "none"
        $list.show();

        document.getElementById("div_fenzu").className=document.getElementById("div_fenzu").className+' disabled';
        document.getElementById("div_orderby").className=document.getElementById("div_orderby").className+' disabled';
        $zhankaiShouqi.jiantoufangxiang("id_zhankaisouqi_icon","up");
        $id_show.get_isShow("group_top_show");
        $id_show.view_show_status(where);
        $list.marginTop();
    }
}
var $list ={
    marginTop:function () {
        var o= document.getElementById($id.top);
        var h=o.offsetHeight;
        document.getElementById($id.list).style.marginTop= h+90+"px";
    },
    show:function(where){

        if(document.getElementById($id.list).style.display!="none"){

            if($group.No=="无分组"){
                document.getElementById($id.recorder_list).style.display="block";
                document.getElementById($id.group_list).style.display="none";
            }else {
                document.getElementById($id.recorder_list).style.display="none";
                document.getElementById($id.group_list).style.display="block";
            }
            $list.marginTop();
        }else {
            document.getElementById($id.list).style.display="none"
            document.getElementById($id.recorder_list).style.display="none";
            document.getElementById($id.group_list).style.display="none";
        }
        $id_show.get_isShow("$list.show");
    }
};
var $tiaojian_change={
    show:function (isTrue) {
        if(isTrue==true)
            $tiaojian_change.open();
        else
            $tiaojian_change.close();
        $list.marginTop();
    },
    isShow:function(val) {
        for (var i=0;i<val.length;i++){
            if(val[i]!= "" && val[i] != undefined) return true;
        }
        return false;
    },
    open:function () {
        document.getElementById($id.tiaojian).style.display="";
    },
    close:function () {
        document.getElementById($id.tiaojian).style.display="none";
    }
}
var $information ={
    no_data_show:function (where) {
        // if(document.getElementById($id.group_top))
        // alert(document.getElementById($id.group_top))
        document.getElementById($id.group_top).style.display="none";
        // if(document.getElementById($id.mini_top))
        document.getElementById($id.mini_top).style.display="none";
        // if(document.getElementById($id.zhankaishouqi))
        document.getElementById($id.zhankaishouqi).style.display="none";
        document.getElementById($id.list).style.display="none";
        document.getElementById($id.recorder_list).style.display="none";
        document.getElementById($id.group_list).style.display="none";
        document.getElementById($id.no_data).style.display="block";
        $id_show.get_isShow("$information.no_data_show");
        $id_show.lastTime.view_show_status(where);
    },
    // 上次有数据时候的显示状态
    have_data_lastTime_show:function (where) {
        console.info("have_data_lastTime_show")
        // document.getElementById($id.tiaojian).style.display= $id_show.lastTime.tiaojian==true?"block":"none";
        $tiaojian_change.show($tiaojian_change.isShow($tiaojian.name_long))
        document.getElementById($id.group_top).style.display= $id_show.lastTime.group_top==true?"block":"none";
        document.getElementById($id.mini_top).style.display=$id_show.lastTime.mini_top==true?"block":"none";
        document.getElementById($id.zhankaishouqi).style.display="block"
        document.getElementById($id.list).style.display=$id_show.lastTime.list==true?"block":"none";
        document.getElementById($id.recorder_list).style.display=$id_show.lastTime.recorder_list==true?"block":"none";
        document.getElementById($id.group_list).style.display=$id_show.lastTime.group_list==true?"block":"none";
        document.getElementById($id.no_data).style.display="none";
        $list.show();
        $id_show.get_isShow("$information.have_data_lastTime_show");
        $id_show.lastTime.view_show_status(where);
    }
}
var $show_status = {
    //功能显示状态，可修改*********
    gongneng:{
        inputUrl_show:true,//新建按钮
        search_always:true,// 是否项目内外都需要查询按钮,
        search_btn:true,// 查询按钮显示状态
        fenzu:true,//分组显示状态
        date_saixuan:true,//日期筛选显示状态
        orderby:true,//排序显示状态
        top_show:true,// 顶部大汇总
        mini_top_show:true,//顶部小汇总
        need_group_list:true, // 是否需要group_list
        need_top_show:true,// top 功能是否需要

        //筛选查询页面
        sel_date:true,// 筛选条件里的日期选择器的显示状态
        ul_search_combox:true,
        fuzzy_query:true,
        select_qunjian_number:true,


        get_show:function () {
            // 新建按钮

            $show_status.gongneng.inputUrl_show=$param.inputUrl==""||$param.inputUrl==undefined ?false:true;
            if(document.getElementById($id.btn_inputUrl_show)){
                document.getElementById($id.btn_inputUrl_show).style.display= $show_status.gongneng.inputUrl_show==true?"block":"none";
            }

        },

    },
    isShow:function (id,isShow) {
        if(document.getElementById(id)){
            if(isShow==true)
                document.getElementById(id).style.display = "block";
            else
                document.getElementById(id).style.display = "none";
        }
    },
    // 分组选项显示状态,需要修改*********************************************************************
    fenzuxiang:function (){
        // var b
        // if($tiaojian.name_long.length==0){
        //     b=$param.inProject == 1?false:true;
        //     $show_status.isShow("li_group"+[0],b);
        // }else {
        //     for (var i=0;i<$tiaojian.name_long.length;i++){
        //         b= $tiaojian.name_long[i]=="" || $tiaojian.name_long[i] ==undefined ?true:false;
        //         if(i==0){
        //             if($param.inProject == 1 )
        //                 b=false;
        //             else
        //                 b=$tiaojian.name_long[i]=="" || $tiaojian.name_long[i] ==undefined ?true:false;
        //         }
        //         $show_status.isShow("li_group"+[i],b);
        //     }
        // }
        var b;
        if($param.inProject == 1 ){
            for (var i=0;i<$tiaojian.name_long.length;i++){
                if($label.group[i]!=undefined ){
                    if($label.group[i].indexOf("项目")==-1)
                        b= $tiaojian.name_long[i]=="" || $tiaojian.name_long[i] ==undefined ?true:false;
                    else
                        b=false;
                    $show_status.isShow("li_group"+[i],b);
                }
            }
        }else{
            for (var i=0;i<$tiaojian.name_long.length;i++){
                b= $tiaojian.name_long[i]=="" || $tiaojian.name_long[i] ==undefined ?true:false;
                $show_status.isShow("li_group"+[i],b);
            }
        }
    },
    /**
     * 查询总的查询按钮显示状态：
     *
     */
    search_show:function (show_always) {
        if(show_always==true)
            return true;
        else{
            var b=$param.inProject==1?false:true;
            return b;
        }
    },
}
var $zhankaiShouqi={
    zhankai:function (id) {
        var o = document.getElementById(id);
        if(o!=null && o!=undefined) {
            if (o.style.display == "none") {
                o.style.display = "block";
            }
        }
    },
    shouqi:function (id) {
        var o = document.getElementById(id);
        var s = "id_"+id.replace("li","icon");

        var className=document.getElementById(s).className;

        if(o!=null && o!=undefined){
            //if(o.style.display == "block"){
            o.style.display = "none";
            removeClass(document.body,"cus-backdrop-con");
            if(id !="order_li")
                $zhankaiShouqi.jiantoufangxiang(s,"down");
            //}
        }
    },
    zhankaiShouqi:function (id,sqid) {
        var o = document.getElementById(id);
        var s = "id_"+id.replace("li","icon")
        if(o.style.display == "none"){//如果是收起状态
            //条件栏收起
            // $zhankaiShouqi.tiaojianlan(false);
            $tiaojian_change.show(false);
            $(o).slideToggle(100);
            addClass(document.body,"cus-backdrop-con");
            document.getElementById("cus-backdrop").setAttribute("click","$onclick.fenzhu_zhankai('"+id+"')");
            if(s!="id_order_icon")
                $zhankaiShouqi.jiantoufangxiang(s,"up");
        }else{ //已打开状态，
            o.style.display = "none";
            //如果条件栏有内容展开
            // try{$zhankaiShouqi.tiaojianlan(tiaojianlan_isShow());}
            // catch (e){$zhankaiShouqi.tiaojianlan($show_status.tiaojianlan($tiaojian.name_long))};
            $tiaojian_change.show($tiaojian_change.isShow($tiaojian.name_long))

            removeClass(document.body,"cus-backdrop-con");
            document.getElementById("cus-backdrop").removeAttribute("click");
            if(s!="id_order_icon")
                $zhankaiShouqi.jiantoufangxiang(s,"down");
        }
    },
    /**
     * 箭头方向
     * @param id
     * @param fangxiang
     */
    jiantoufangxiang:function (id,fangxiang) {
        // alert(id)
        // alert(document.getElementById(id).className)
        if(fangxiang=="down"){
            document.getElementById(id).className = document.getElementById(id).className.replace("up","down");
        }else{
            document.getElementById(id).className = document.getElementById(id).className.replace("down","up");
        }
    }
}
var $search_list_show ={
    isShow:function (val) {
        if(val==true){
            document.getElementById("div_search_list").style.display="block";
            document.getElementById("search_list_noNumber").style.display="none";
        }else{
            document.getElementById("div_search_list").style.display="none";
            document.getElementById("search_list_noNumber").style.display="block";
        }
    },
    btn_clear:function () {
        var s = document.getElementById("search_list_input").value;
        if(s.length>0)
            document.getElementById("search_list_input_clear").style.display="block"
        else
            document.getElementById("search_list_input_clear").style.display="none"
    },
    // 是否需要模糊查询
    fuzzy:function (isTrue) {
        if(isTrue==true){
            document.getElementById("select_list_fuzzy").style.display="block"
            document.getElementById("select_list").style.top="98px"
        }else{
            document.getElementById("select_list_fuzzy").style.display="none"
            document.getElementById("select_list").style.top="44px"
        }
    }
}

export {$top_changed,$list,$tiaojian_change,$information,$show_status,$zhankaiShouqi,$search_list_show,$date_show,$id_show}



