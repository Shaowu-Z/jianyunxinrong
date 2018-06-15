<template>
    <div>
    
        <ul>
    
            <li class="mui-table-view-cell mui-input-row">
    
                <a class="mui-navigate-right" href="#">
    
                    <label>日期</label>
    
                    <!-- <input type="text" v-model="form.MissionStartDate" @click="app.selectDate('s')" readonly="readonly" placeholder="请选择" /> -->
    
                    <input type="text" name="start" id="start" v-model="form.MissionStartDate" readonly="readonly" placeholder="请选择" @click="danjuApi.openPicker">
    
                    <mt-datetime-picker ref="picker" v-model="pickerVisible" type="date" year-format="{value} 年" month-format="{value} 月" date-format="{value} 日" @confirm="danjuApi.handleConfirm">
                    </mt-datetime-picker>
    
                </a>
    
            </li>
    
        </ul>
    
    </div>
</template>
<script>
    export default {};
</script>
<style>
    
</style>
