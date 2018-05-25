<template>
  <div>
      <img src="../../assets/images/左箭头.jpg" @click="goBack">
      <p>设置</p>
      <span></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
    goBack () {
      this.$router.back(-1)
    }
  }
}
</script>

<style lang="less" scoped>
    div{
        background:#f7f7f7;
        position: relative;
        top:0;
        line-height: 44px;
        width:100%;
        height:44px;
        display: flex;
        justify-content: space-around;
        margin-bottom: 10px;
        align-items: center;
        border-bottom: 1px solid #ccc;
        img{
        	display: inline-block;
        	width: 10px;
        	height: 15px;
        }
        p{
            flex:0.8;
            display: inline-block;
        }
    }
</style>
