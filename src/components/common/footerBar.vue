

<template>
  <div id="active">
      <div class="footer-bar">
        <div class="footer-tab" v-for="(item,index) in footerTab" :key="index" @click="changTab(index)">
            <img src="../../assets/logo.png"/>
            <span>{{ item.tabText }}</span>
        </div>
      </div>
  </div>
</template>
 
<script>

export default {
  props:{
    title:Object
  },
  data () {
    return {
      footerTab: [
        {
          tabText: '消息',
          tabName: '/news',
          routerPath: '/news',
          index: 0
        },
        {
          tabText: '联系人',
          tabName: '/static/webstatic/contacts/address_list.html',
          routerPath: '/static/webstatic/contacts/address_list.html',
          index: 0
        },
        {
          tabText: '我的',
          tabName: '/static/webstatic/mycenter/mycenter.html',
          routerPath: '/static/webstatic/mycenter/mycenter.html',
          index: 0
        }
      ]
    }
  },
  methods: {
    changTab (index) {
      console.log(index)
      switch (index) {
        case 0:
        console.log(this.title)
          window.webactivity.openMessagePage()
          break
        case 1:
          this.$router.push(this.footerTab[1].routerPath)
          break
        case 2:
          this.$router.push(this.footerTab[2].routerPath)
          break
        // case 3:
        //   this.$router.push(this.footerTab[3].routerPath)
        //   break
        // case 4:
        //   this.$router.push(this.footerTab[4].routerPath)
        //   break
        default:
          this.$router.push(this.footerTab[0].routerPath)
      }
    }
  }
}
</script>

<style  scoped>
    @import '../../assets/css/common/footerBar.less';
</style>
