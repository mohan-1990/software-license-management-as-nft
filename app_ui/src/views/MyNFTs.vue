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

		<!-- My SW License NFTs Table -->
		<a-row :gutter="24" type="flex">

			<!-- My SW License NFTs Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- My SW License NFTs Table Column -->
				<MySWLicenseNFTs
					:data="mySWLicenseNFTs.data"
					:columns="mySWLicenseNFTs.columns"
					:mintBtnHandler="mintBtnHandler"
				></MySWLicenseNFTs>
				<!-- / My SW License NFTs Table Column -->

			</a-col>
			<!-- / My SW License NFTs Table Column -->

		</a-row>
		<!-- / My SW License NFTs Table -->

		<!-- Mint New Software License NFT modal window -->
		<a-row :gutter="24" type="flex">

			<!-- Mint New Software License NFT modal window Column -->
			<a-col :span="24" class="mb-24">
				<a-modal v-model="displayMintModal" 
				title="New Software License NFT Mint Form"
				okText="Mint"
				cancelText="Close"
				:confirmLoading="confirmMinting"
				@ok="handleMintModalOkBtnClick"
				@cancel="handleMintModalCancelBtnClick"
				:destroyOnClose="mintModalDestroyOnClose"
				width="75vw"
				wrapClassName="vertical-center-modal">
					<CardMintSWLicenseNFTVue
						:toAddress="account"
						:bus="bus"
					></CardMintSWLicenseNFTVue>
				</a-modal>

			</a-col>
			<!-- / Mint New Software License NFT modal window Column -->

		</a-row>
		<!-- / Mint New Software License NFT modal window -->

	</div>
</template>

<script>
	import Vue from 'vue';
	import myNFTsController from "../controllers/MyNFTsController";
	// "My SW License NFTs" table component.
	import MySWLicenseNFTs from '../components/Cards/CardSWLicenseNFTs';
	import CardMintSWLicenseNFTVue from "../components/Cards/CardMintSWLicenseNFT.vue";

	// "My SW License NFTs" table list of columns and their properties.
	const mySWLicenseNFTsColumns = [
		{
			title: 'NFT',
			dataIndex: 'nft',
			scopedSlots: { customRender: 'nft' },
		},
		{
			title: 'TOKEN ID',
			dataIndex: 'tokenId',
			class: 'font-semibold text-muted',
		},
		{
			title: 'OWNER ADDRESS',
			dataIndex: 'ownerAddress',
			class: 'font-semibold text-muted',
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'description',
			class: 'font-semibold text-muted',
		},
		{
			title: 'PRICE',
			dataIndex: 'price',
			class: 'font-semibold text-muted',
		},
		{
			title: 'CREATED AT',
			scopedSlots: { customRender: 'created_at' },
			dataIndex: 'created_at',
		},
	];

	export default ({
		components: {
			MySWLicenseNFTs,
			CardMintSWLicenseNFTVue,
		},
		data() {
			return {
				walletName: "",
				isWalletConnected: false,
				walletImageSrc: "images/crypto-wallet.png",
				networkId: '',
				account: '',
				mySWLicenseNFTs: {
					columns: mySWLicenseNFTsColumns,
					data: []
				},
				displayMintModal: false,
				bus: new Vue(),
				confirmMinting: false,
				mintModalDestroyOnClose: true,
			}
		},
		methods: {
			async initiateWalletConnection() {
				await myNFTsController.initiateWalletConnection(this);
			},
			mintNewSoftwareLicenseNFT(params) {
				myNFTsController.mint(params, this);
			},
			mintBtnHandler() {
				this.displayMintModal = true;
			},
			handleMintModalOkBtnClick() {
				console.log("Mint modal ok button clicked.");
				this.bus.$emit("emitMintParams");
			},
			handleMintModalCancelBtnClick() {
				console.log("Mint modal close button clicked.");
				this.loadNFTs(this.account);
			},
			loadNFTs(owner) {
				myNFTsController.retrieveTokenOf(owner).then((nfts) => {
					console.log("Nfts: ", JSON.stringify(nfts));
					this.mySWLicenseNFTs.data = nfts;
				}).catch((error) => {
					console.log(error);
				});
			},
		},
		mounted() {
			this.bus.$on("mintParams", (args) => {
				this.mintNewSoftwareLicenseNFT(args);
			});
			this.bus.$on("newNFTMintSuccess", () => {
				this.loadNFTs(this.account);
			});
			this.bus.$on("walletConnected", (args) => {
				this.loadNFTs(args['account']);
			});
		},
	})

</script>

<style lang="scss">
/* use css to set position of modal */
.vertical-center-modal {
  text-align: center;
  white-space: nowrap;
}

.vertical-center-modal:before {
  content: '';
  display: inline-block;
  height: 100%;
  vertical-align: middle;
  width: 0;
}

.vertical-center-modal .ant-modal {
  display: inline-block;
  vertical-align: middle;
  top: 0;
  text-align: left;
}
</style>