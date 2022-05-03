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
				></MySWLicenseNFTs>
				<!-- / My SW License NFTs Table Column -->

			</a-col>
			<!-- / My SW License NFTs Table Column -->

		</a-row>
		<!-- / My SW License NFTs Table -->

	</div>
</template>

<script>

	import myNFTsController from "../controllers/MyNFTsController";
	// "My SW License NFTs" table component.
	import MySWLicenseNFTs from '../components/Cards/CardSWLicenseNFTs';

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
			title: 'CREATED AT',
			scopedSlots: { customRender: 'created_at' },
			dataIndex: 'created_at',
		},
	];

	// "My SW License NFTs" table list of rows and their properties.
	const mySWLicenseNFTsData = [
    {
        "key": 5,
        "tokenId": 18,
        "description": "Test Mint Token API Endpoint",
		"ownerAddress": "0x0831242671918922AFeecbB4B1a37de6D21490d2",
		"nft": {
			"title": "Test Mint Token API Endpoint",
			"image_url": "https://cdn.britannica.com/97/1597-004-05816F4E/Flag-India.jpg",
		},
        "created_at": "2022-04-25T08:38:34.179Z",
        "updated_at": "2022-04-28T03:34:29.274Z",
        "deletedAt": null
    }
];

	export default ({
		components: {
			MySWLicenseNFTs
		},
		data() {
			return {
				walletName: "",
				isWalletConnected: false,
				walletImageSrc: "images/face-1.jpg",
				networkId: '',
				account: '',
				mySWLicenseNFTs: {
					columns: mySWLicenseNFTsColumns,
					data: mySWLicenseNFTsData
				}
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