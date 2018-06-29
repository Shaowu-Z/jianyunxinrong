<template>
    <div>
        <ul>
            <li class="mui-table-view-cell mui-input-row">
                <a class="mui-navigate-right" href="#">
                    <label v-text="title"></label>
                    
                    <input type="text" v-model="area"  name="start"  id="start" class="areas"  readonly="readonly" placeholder="请选择" @click.stop="chooseCity">
                    <mt-popup
                        v-model="popupVisible"
                        position="bottom">
                    <mt-picker  v-if="type==1" :slots="myAddressSlots" ref="picker" :showToolbar="true" @change="onMyAddressChange" >
                        <mt-button size="small" @click.native="makepass">取消</mt-button>
                        <mt-button size="small" type="primary" @click.native="makesure">确认</mt-button>
                    </mt-picker>
                    <mt-picker value-key="baseName" v-if="type==2" :slots="slot" ref="picker" :showToolbar="true" @change="onMyAddressChange" >
                        <mt-button size="small" @click.native="makepass">取消</mt-button>
                        <mt-button size="small" type="primary" @click.native="makesure">确认</mt-button>
                    </mt-picker>
                    </mt-popup>
                </a>
            </li>
        </ul>
    </div>
</template>
<script>
import { Picker } from "mint-ui";
import myaddress from "../project/js/city";

export default {
  name: "areaBar",
  components: {
    "mt-picker": Picker
  },
  props: {
    title: "",
    areatype:"",
    shuju:'',
    timeType:'',
    datanow:"",
    starindex:'',
    
  },
  data() {
    return {
      type:this.areatype,
      popupVisible: false,
      showToolbar: [],
      slot:[
          {
          flex: 1,
          defaultIndex: Number(this.starindex),
          values: this.shuju, //省份数组
          className: "slot1",
          textAlign: "center"
          }
          ],
      myAddressSlots: [
        {
          flex: 1,
          defaultIndex: 1,
          values: Object.keys(myaddress), //省份数组
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        },
        {
          divider: true,
          content: "-",
          className: "slot4"
        },
        {
          flex: 1,
          values: [],
          className: "slot5",
          textAlign: "center"
        }
      ],
      myAddressProvince: "省",
      myAddressCity: "市",
      myAddresscounty: "区/县",
      makevalue: "",
      area: "",
     
    };
  },
  created() {
    var _self=this
   console.log("当前选择时间"+this.datanow)
   console.log("数据aaa",this.starindex)
   this.area=this.datanow
  },

    methods: {
    onMyAddressChange(picker, values) {
      var _self = this;
      if (myaddress[values[0]]) {
        //这个判断类似于v-if的效果（可以不加，但是vue会报错，很不爽）
        picker.setSlotValues(1, Object.keys(myaddress[values[0]])); //  Object.keys()会返回一个数组，当前省的数组
        picker.setSlotValues(2, myaddress[values[0]][values[1]]); //  区/县数据就是一个数组
        _self.myAddressProvince = values[0];
        _self.myAddressCity = values[1];
        _self.myAddresscounty = values[2];
      }
    },
    chooseCity() {
      this.popupVisible = !this.popupVisible;
    },
    makesure() {
      var _self = this;
      if(this.type==1){
      _self.area =
        this.$refs.picker.getValues()[0] +
        "-" +
        this.$refs.picker.getValues()[1] +
        "-" +
        this.$refs.picker.getValues()[2];
       this.$emit('toParent', _self.area)
      }else if(this.type==2){
         _self.area = this.$refs.picker.getValues()[0].baseName
        var rtnobj=this.$refs.picker.getValues()[0];
        rtnobj.timeType=this.timeType
        this.$emit('toParent',rtnobj)
      }
       _self.popupVisible = !_self.popupVisible;

    },
    makepass() {
      this.popupVisible = !this.popupVisible;
    },
      
  },
  mounted() {
    this.$nextTick(() => {
      //vue里面全部加载好了再执行的函数   （类似于setTimeout）
      this.myAddressSlots[0].defaultIndex = 0;
      // 这里的值需要和 data里面 defaultIndex 的值不一样才能够初始化
      //因为我没有看过源码（我猜测是因为数据没有改变，不会触发更新）
    });
  }
};
</script>
<style>
@import "../../assets/css/common/mint";
.picker {
  width: 100%;
}
.mint-popup {
  width: 100%;
}
.picker-item {
  font-size: 16px;
}
.picker-toolbar {
  background: #f8f8f8;
}
.mint-popup .mint-button .mint-button-text {
  width: 100%;
  height: 100%;
  padding: 0;
  text-align: center;
  line-height: 33px;
}
.mint-button:nth-child(1) {
  float: left;
  margin: 4px;
}
.mint-button:nth-child(2) {
  float: right;
  margin: 4px;
}
.picker-items {
  clear: both;
  background: #eee;
}
.picker-center-highlight:before,
.picker-center-highlight:after {
  background: #aaa;
}
.mui-input-row.areas {
  padding-right: 36px;
}
.mint-button:nth-child(2) .mint-button-text{
  color: #fff
}
</style>
