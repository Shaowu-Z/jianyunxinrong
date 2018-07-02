<template>
  <div>
      <ul>
          <li @click="show">广告位1</li>
          <li>广告位2</li>
          <li>广告位3</li>
          <li>广告位4</li>
      </ul>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
  methods: {
    show () {
      this.$router.push('./cli')
    }
  }
}
</script>

<style type="text/css" scoped>

</style>
