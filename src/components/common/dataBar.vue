<template>
    <div id="databox">
    
        <ul>
    
            <li class="mui-table-view-cell mui-input-row" >
    
                <a class="mui-navigate-right" href="#">
    
                    <label v-text="title">日期</label>
    
                    <!-- <input type="text" v-model="form.MissionStartDate" @click="app.selectDate('s')" readonly="readonly" placeholder="请选择" /> -->
                    <input type="text" name="start" id="start" v-model="form.MissionStartDate" readonly="readonly" placeholder="请选择" @click="openPicker">

                    <mt-datetime-picker  ref="picker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="handleConfirm">
                    </mt-datetime-picker>
    
                </a>
    
            </li>
    
        </ul>
    
    </div>
</template>
<script>
import { DatetimePicker } from "mint-ui";
import { Toast } from "mint-ui";
    export default {
        name: "dataBar",
        // components: {
        //     "mt-picker": Picker
        // },
        props: {
            title: "",
            datanow:""
        },
        data(){
            return{
                // datanow:'',
                pickerVisible: new Date(),
                form:{MissionStartDate:''}
            }
        },
        created:function(){
            this.form.MissionStartDate=this.datanow
        },
        methods:{
            openPicker() {
                var _self=this
                _self.$refs.picker.open();
            },
            /**
	 * 确认日期
	 * */
	handleConfirm(value) {
        var _self=this
        var localtime = value.toLocaleDateString().replace(/[/]/g, "-");
        //向父组件传值
        // this.$emit('upup',localtime);
        this.$emit('datatoParent',localtime)
        _self.form.MissionStartDate = localtime;
		_self.show = true;
		// Toast({
		// 	message: "已选择 " + localtime,
		// 	// message: '已选择 ' + value.toString(),
		// 	position: "bottom"
		// });
	},
        }
    };
</script>
<style scoped>
    #databox{
        float: left
    }
.mint-datetime-confirm{
        width: auto;
    height: auto;
    padding: 0 10px;
    margin: 3px 0;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-right: 6px;
    background: #26a2ff;
    color: #fff;
}
.mint-datetime-cancel{
        width: auto;
    height: auto;
    color: #aaa;
    padding: 0 10px;
    margin: 3px 0;
    line-height: 30px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-left: 6px;
}
#databox {
    width: 100%
}
</style>
