<template>
  <div id="app">
      <header class="mui-bar mui-bar-nav">
	<button id="btn-referrer" class="mui-btn mui-btn-link mui-btn-nav mui-pull-left hide">
		<span class="mui-icon mui-icon-back"></span>联系人
	</button>
	<h1 class="mui-title">手机通讯录</h1>
</header>


<section class="mui-content" id="phone_list">
	<div id='list' class="mui-indexed-list address-list hide">
		<div class="mui-indexed-list-search mui-input-row mui-search">
			<input type="search" class="mui-input-clear mui-indexed-list-search-input" placeholder="搜索">
		</div>
		<div class="mui-indexed-list-bar">
			<div class="align-middle">
				<div v-for="(items,index1) in phones" :key="index1">
					<div v-for="(item,index2) in items" :key='index2'>
						<div v-if="item.name && item.isp == 1">
							<a v-text="item.first"></a>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="mui-indexed-list-alert"></div>
		<div class="mui-indexed-list-inner">
			<div id="empty-view" class="mui-indexed-list-empty-alert">没有数据</div>
			<ul class="mui-table-view">
				<div v-for="(items,index1) in phones" :key="index1">
					<div v-for="(item,index2) in items" :key="index2">
						<div v-if="item.name">
							<div v-if="item.isp == 1">
							<li :data-group="item.first" class="mui-table-view-divider mui-indexed-list-group">
									{{item.first}}
								</li>
							</div>
							<li :data-value="item.first" class="mui-table-view-cell mui-indexed-list-item">
								<a :href="['javascript:appApi.openNewWindow(pagepath+\'/contacts/eg_details.html?phone='+item.phone+'&name='+item.name+'\')']">
								<div class="mui-slider-cell">
										<div class="oa-contact-cell mui-table">
											<div class="oa-contact-avatar mui-table-cell">
												<span class="oa-pic-default bgr2" v-text="item.name"></span>
											</div>
											<div class="oa-contact-content mui-table-cell">
												<h4 class="oa-contact-name" v-text="item.name"></h4>
												<p class="oa-contact-email" v-text="item.phone"></p>
											</div>
										</div>
									</div>
								</a>
								<button v-show="item.is_add" @click="addFriends(index1, index2)" class="mui-btn">添加</button>
								<button v-show="!item.is_add" class="mui-btn mui-btn-link mui-badge mui-badge-inverted">已添加</button>
							</li>
						</div>
					</div>
				</div>
			</ul>
		</div>

	</div>
</section>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>
