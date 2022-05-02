<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<!-- Header Background Image -->
		<div class="profile-nav-bg" style="background-image: url('images/bg-profile.jpg')"></div>
		<!-- / Header Background Image -->

		<!-- User Profile Card -->
		<a-card :bordered="false" class="card-profile-head" :bodyStyle="{padding: 0,}">
			<template #title>
				<a-row type="flex" align="middle">
					<a-col :span="24" :md="12" class="col-info">
						<a-avatar :size="74" shape="square" :src="walletImageSrc" />
						<div class="avatar-info">
							<h4 class="font-semibold m-0">Crypto Wallet</h4>
							<p>{{walletName}}</p>
						</div>
					</a-col>
					<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
						<a-button type="primary">
								CONNECT TO WALLET
							</a-button>
					</a-col>
				</a-row>
			</template>
		</a-card>
		</div>

</template>

<script>

	export default ({
		data() {
			return {
				walletName: "Not connected",
				isWalletConnected: false,
				walletImageSrc: "images/face-1.jpg",
			}
		},
	})

</script>

<style lang="scss">
</style>