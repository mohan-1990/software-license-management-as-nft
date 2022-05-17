<template>

	<!-- NFT Transfer Requests Table Column -->
	<a-card :bordered="false" class="header-solid h-full" :bodyStyle="{padding: 0,}">
		<template #title>
			<a-row type="flex" align="middle">
				<a-col :span="24" :md="12">
					<h5 class="font-semibold m-0">My NFTs Table</h5>
				</a-col>
				<a-col :span="24" :md="12" style="display: flex; align-items: center; justify-content: flex-end">
					<a-radio-group v-model="projectHeaderBtns" size="small">
						<a-radio-button value="all">ALL</a-radio-button>
						<a-radio-button value="online">PENDING MY TRANSFER</a-radio-button>
						<a-radio-button value="stores">REQUESTED BY ME</a-radio-button>
					</a-radio-group>
				</a-col>
			</a-row>
		</template>
		<a-table 
		:columns="columns" 
		:data-source="data"
		:pagination="false">

			<template slot="nft" slot-scope="nft">
				<div class="table-nft-info">
					<a-avatar shape="square" :src="nft.image_url" />
					<div class="avatar-info">
						<h6>{{ nft.title }}</h6>
					</div>
				</div>
			</template>

			<template slot="action_or_message" slot-scope="action_or_message">
				<a-button 
					v-if="action_or_message.account == action_or_message.owner"
					type="primary"
					:disabled="isTransferRequestSuccessful"
					:loading="isTransferRequestInProgress">
						Transfer
				</a-button>
				<p v-else>{{action_or_message.message}}</p>
			</template>

		</a-table>
	</a-card>
	<!-- NFT Transfer Requests Table Column -->

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
			}
		},
		data() {
			return {
				// Active button for the "Projects" table's card header radio button group.
				projectHeaderBtns: 'all',
				isTransferRequestSuccessful: false,
				isTransferRequestInProgress: false,
				account: localStorage.account,
				scrollProp: {
					x: 'max-content'
				},
			}
		},
		methods: {
			handleTransferConfirm(tokenId) {
				console.log("Handle transfer request for token id: " + tokenId);
			}
		}
	})

</script>