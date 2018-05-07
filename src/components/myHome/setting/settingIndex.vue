<template>
  <div id="app">
	<header class="mui-bar mui-bar-nav">
		<h1 class="mui-title">设置</h1>
		<button class="mui-btn mui-btn-link mui-pull-left" @click="goBack"><span class="mui-icon iconfont icon-back"></span>返回</button>
	</header>
	
	<section id="mycenter" class="mui-content mycenter-content">
		<div class="address-list my-list">
			<ul class="mui-table-view mui-table-view-striped" style="margin-top: 10px">
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="#">
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<span class="my-list-icon label-denglu"></span>
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name">重新登录</h4>
							</div>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="#">
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<span class="my-list-icon label-reset"></span>
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name">修改密码</h4>
							</div>
						</div>
					</a>
				</li>
				<li class="mui-table-view-cell">
					<a class="mui-navigate-right" href="#">
						<div class="oa-contact-cell mui-table">
							<div class="oa-contact-avatar mui-table-cell">
								<span class="my-list-icon label-exit"></span>
							</div>
							<div class="oa-contact-content mui-table-cell">
								<h4 class="oa-contact-name">退出程序</h4>
							</div>
						</div>
					</a>
				</li>
			</ul>
			<div class="singlebox"  @click="share">
				<a class="mui-navigate-right">
					<span class="my-list-icon label-share"></span>
					推荐给好友
				</a>
			</div>
			<div class="singlebox">
				<a class="mui-navigate-right" href="#">
					<span class="my-list-icon label-service"></span>
					联系客服
				</a>
				<span class="mui-badge mui-badge-red" id="unreadNum"></span>
			</div>
			<div class="singlebox">
				<a class="mui-navigate-right">
					<span class="my-list-icon label-guanyu"></span>
					关于我们
				</a>
			</div>
		</div>	
	</section>
  </div>
</template>

<script>
import shareBar from './share.vue'
export default {
	components:{
		shareBar
	},
	data(){
		return{
			sharetrue: false
		}
	},
	methods:{
		goBack(){
			this.$router.go(-1);
		},
		share(){
			this.$router.push({path:'/share'});
		}
	}
}
</script>

<style>

</style>
