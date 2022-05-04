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
			<a-button type="dashed" @click="mintNewNFT" block>
				<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path fill-rule="evenodd" clip-rule="evenodd" d="M3 17C3 16.4477 3.44772 16 4 16H16C16.5523 16 17 16.4477 17 17C17 17.5523 16.5523 18 16 18H4C3.44772 18 3 17.5523 3 17ZM6.29289 6.70711C5.90237 6.31658 5.90237 5.68342 6.29289 5.29289L9.29289 2.29289C9.48043 2.10536 9.73478 2 10 2C10.2652 2 10.5196 2.10536 10.7071 2.29289L13.7071 5.29289C14.0976 5.68342 14.0976 6.31658 13.7071 6.70711C13.3166 7.09763 12.6834 7.09763 12.2929 6.70711L11 5.41421L11 13C11 13.5523 10.5523 14 10 14C9.44771 14 9 13.5523 9 13L9 5.41421L7.70711 6.70711C7.31658 7.09763 6.68342 7.09763 6.29289 6.70711Z" fill="#111827"/>
				</svg>
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