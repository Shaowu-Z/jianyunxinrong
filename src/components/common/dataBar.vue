<template>
    <div>
    
        <ul>
    
            <li class="mui-table-view-cell mui-input-row" >
    
                <a class="mui-navigate-right" href="#">
    
                    <label>日期</label>
    
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
            title: ""
        },
        data(){
            return{
                pickerVisible: new Date(),
                form:{MissionStartDate:''}
            }
        },
        created(){
            
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
		// this.form.MissionStartDate = value.toString();
		var localtime = value.toLocaleDateString().replace(/[/]/g, "-");

		_self.form.MissionStartDate = localtime;
		_self.show = true;
		Toast({
			message: "已选择 " + localtime,
			// message: '已选择 ' + value.toString(),
			position: "bottom"
		});
	},
        }
    };
</script>
<style>
    
</style>
