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
							<a-tag class="tag-status" :class="isWalletConnected ? 'ant-tag-primary' : 'ant-tag-muted'">
								{{ isWalletConnected ? "CONNECTED" : "NOT CONNECTED" }}
							</a-tag>
						</div>
					</a-col>
					<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
						<a-button type="primary" @click="initiateWalletConnection" :disabled="isWalletConnected">
								CONNECT TO WALLET
							</a-button>
					</a-col>
				</a-row>
				<a-row type="flex" align="middle">
					<a-descriptions :column="1" :style="{visibility: isWalletConnected ? 'visible' : 'hidden'}">
						<a-descriptions-item label="Wallet Name">
							{{walletName}}
						</a-descriptions-item>
						<a-descriptions-item label="Network Id">
							{{networkId}}
						</a-descriptions-item>
						<a-descriptions-item label="Account">
							{{account}}
						</a-descriptions-item>
					</a-descriptions>
				</a-row>
			</template>
		</a-card>
		</div>

</template>

<script>

	import myNFTsController from "../controllers/MyNFTsController";
	export default ({
		data() {
			return {
				walletName: "",
				isWalletConnected: false,
				walletImageSrc: "images/face-1.jpg",
				networkId: '',
				account: '',
			}
		},
		methods: {
			async initiateWalletConnection() {
				await myNFTsController.initiateWalletConnection(this);
			}
		}
	})

</script>

<style lang="scss">
</style>