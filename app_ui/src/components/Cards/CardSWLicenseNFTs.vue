<template>

	<!-- Software License NFTs Table Column -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">My NFTs Table</h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<a-radio-group v-model="projectHeaderBtns" size="small">
						<a-radio-button value="all">ALL</a-radio-button>
						<a-radio-button value="online">THIS MONTH</a-radio-button>
						<a-radio-button value="stores">PREVIOUS MONTHS</a-radio-button>
					</a-radio-group>
				</a-col>
			</a-row>
		</template>
		<a-table :columns="columns" :data-source="data" :pagination="false">

			<template slot="nft" slot-scope="nft">
				<div class="table-nft-info">
					<a-avatar shape="square" :src="nft.image_url" />
					<div class="avatar-info">
						<h6>{{ nft.title }}</h6>
					</div>
				</div>
			</template>

			<template slot="tokenId" slot-scope="tokenId">
				<a>{{tokenId}}</a>
			</template>

			<template slot="ownerAddress" slot-scope="ownerAddress">
				<a>{{ownerAddress}}</a>
			</template>

			<template slot="description" slot-scope="description">
				<p>{{description}}</p>
			</template>

			<template slot="created_at" slot-scope="created_at">
				<p>{{created_at}}</p>
			</template>

		</a-table>

		<div class="table-upload-btn">
			<a-button type="dashed" @click="mintNewNFT" icon="thunderbolt" block>
				MINT NEW NFT
			</a-button>
		</div>
	</a-card>
	<!-- Software License NFTs Table Column -->

</template>

<script>

	export default ({
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			columns: {
				type: Array,
				default: () => [],
			},
			mintBtnHandler: {
				type: Function,
				default: () => {
					console.error("Bind a function for mintBtnHandler property");
				}
			}
		},
		data() {
			return {
				// Active button for the "Projects" table's card header radio button group.
				projectHeaderBtns: 'all',
			}
		},
		methods: {
			mintNewNFT() {
				this.mintBtnHandler();
			}
		}
	})

</script>