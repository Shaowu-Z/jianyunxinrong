<template>
    <div id="app">
        <header class="mui-bar mui-bar-nav">
            <h1 class="mui-title">公告详情</h1>
            <button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
            <a class="mui-action-back mui-icon iconfont icon-back"></a>
        </button>
        </header>
        <div class=" fixed-bottom">
            <div class="mui-table">
                <div class="mui-table-cell"><button id="haver" @click="haveNotice()" class="mui-btn mui-btn-primary" v-html="but_text"></button></div>
            </div>
        </div>
        <section class="mui-content about-info">
            <div class="about-content">
                <p v-html="notice.noticeContent.replace(/\n|\r\n/g,'<br/>')" class="text"></p>
                <div class="show-item">
                    <dl class="item publish-container cloud-content">
                        <dt class="label">图片</dt>
                        <dd class="con">
                            <ul class="container-average container-average-img">
                                <div v-for="(img,index) in imgs" :key="index">
                                    <li class="img-item">
                                        <div class="img-item-inner">
                                            <img v-bind:src="img.thumbnailurl" @click="appApi.imgPreview.open(index,imgUrl)">
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </dd>
                    </dl>
                    <dl class="item publish-container cloud-content">
                        <dt class="label">附件</dt>
                        <dd class="con">
                            <ul class="mui-table-view mui-table-view-striped container-average">
                                <div v-for="(pic,index) in pics" :key="index">
                                    <li class="mui-table-view-cell">
                                        <div class="oa-contact-cell mui-table" @click="open_file(pic.id)">
                                            <div class="oa-contact-avatar mui-table-cell">
                                                <span class="my-list-icon label-word"></span>
                                            </div>
                                            <div class="oa-contact-content mui-table-cell">
                                                <h4 class="oa-contact-name" v-text="pic.filename" ></h4>
                                                <p class="oa-contact-email">
                                                    <span>{{pic.filezie}}</span>
                                                </p>
                                            </div>
                                        </div>
                                    </li>
                                </div>
                            </ul>
                        </dd>
                    </dl>
                </div>
                <p class="secondary text" v-html="notice.createUserName+'&nbsp;'+formatDate(notice.createDate)"></p>
            </div>
        </section>
    </div>
</template>

<script>
import {getParam,BackCookie} from '../../../playform/common'
export default {
    data () {
        return {
            notice: {},
            imgs : [],
            imgUrl :[],
            pics : [],
            but_text: "",
            href: window.location.href,
            param_map:{},
            user_id:''
        }
    },
    created(){
        this.param_map = getParam(this.href);
        this.user_id = BackCookie.getCookie("userid");
		this.getNotice();
    },
    methods: {
        open_file(id){
            appApi.openFile('http://java.winfreeinfo.com/sass_api/file/download?id='+id);
        },
        //时间过滤
        formatDate(value) {
            var getTime = new Date();
            var nowTime = getTime.toLocaleDateString()
            var currentDateString = Date.parse(nowTime + " 23:59")
            var currentDate = new Date(currentDateString);
            var fallDate = currentDate.getTime() -
                new Date(value).getTime(); //时间差的毫秒数        
            //计算出相差天数  
            var days = Math.floor(fallDate / (24 * 3600 * 1000))
            if(days == 0) {
                return "今天";
            } else if(days == 1) {
                return "昨天";
            } else {
                return new Date(value).toLocaleDateString().replace(
                    /\//g, '-');
            }
        },
        getNotice(param_map) {
            var _self = this;
            console.log(this.param_map);
            var param = {
                getType: "4",
                id: this.param_map.id,
                userId: this.user_id,
            }
            this.$http.post("/notice_api/getNotice", param).then(
                function(response) {
                    console.log(response)
                    if(response.data.code == 200) {
                        console.log(response)
                        _self.notice = response.data.result
                        if(_self.notice.noticeStatus == 0) {
                            _self.but_text = "已&nbsp;&nbsp;&nbsp;&nbsp;阅"
                        } else {
                            _self.but_text = "我&nbsp;&nbsp;&nbsp;&nbsp;已&nbsp;&nbsp;&nbsp;&nbsp;阅"
                        }
                        if(_self.notice.attachmenIds != "" && _self.notice.attachmenIds != null) {

                            var files = _self.notice.attachmenIds.split("|");
                            var imgs = files[0].split(",")
                            var pics = files[1].split(",")
                            var fileIdStr = files[0].toString()
                            if(imgs.toString() == "" || pics.toString() == "") {
                                fileIdStr += files[1]
                            } else {
                                fileIdStr += "," + files[1]
                            }
                            // $.ajax({
                            //     type: "POST",
                            //     url: "http://java.winfreeinfo.com/sass_api/get_uploadfile_info",
                            //     data: {
                            //         "fileIdStr": fileIdStr
                            //     },
                            //     success: function(response) {
                            //         if(imgs.toString()!=""){
                            //             _self.imgs = response.result.slice(0, imgs.length)
                            //             _self.pics = response.result.slice(imgs.length, response.result.length)
                            //         }else{
                            //             _self.pics = response.result.slice(0, response.result.length)
                            //         }
                            //         _self.imgUrl =xk_util.getArrayProperty(_self.imgs,"thumbnailurl");
                            //         console.log(response)
                            //     }
                                
                            // })
                            var formparam = new FormData();
                            formparam.append("fileIdStr", fileIdStr);
                            _self.$http.post("/sass_api/get_uploadfile_info",formparam).then(function(response){
                                console.log(response,11111111111)
                                if(imgs.toString()!=""){
                                        _self.imgs = response.data.result.slice(0, imgs.length)
                                        _self.pics = response.data.result.slice(imgs.length, response.data.result.length)
                                    }else{
                                        console.log(response.data.result)
                                        _self.pics = response.data.result.slice(0, response.data.result.length)
                                    }
                                    // _self.imgUrl =xk_util.getArrayProperty(_self.imgs,"thumbnailurl");
                                    // console.log(response)
                            })
                        }

                    } else {
                        //							msg("获取云盘目录信息失败")
                    }
                })
        },
        haveNotice() {
            var _self = this;
            if(_self.notice.noticeStatus == 1) {
                return;
            }
            var param = {
                type: "1",
                userId: user_id,
                status: "1",
                noticeId: _self.notice.id,
            }
            this.$http.post("/notice_api/updateNotice", param)
                .then(function(response) {
                    console.log(response)
                    if(response.data.code == 200) {
                        console.log(response)
                        _self.but_text = "我&nbsp;&nbsp;&nbsp;&nbsp;已&nbsp;&nbsp;&nbsp;&nbsp;阅"
                        //将公告信息转到代办
                        var have_param = { //请求参数
                            docId: _self.notice.docId,
                            userid: user_id,
                        }
                        $.ajax({
                            type: "post",
                            data: have_param,
                            url: getUrl() + "/todo_api/status",
                            success: function(data) {
                                console.log(data)
                            }
                        })
                    } else {
                        //							msg("获取云盘目录信息失败")
                    }
                })
        }
    }
}   
</script>

<style scoped>
</style>
