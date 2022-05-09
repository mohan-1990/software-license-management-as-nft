<template>

	<a-card :bordered="false" class="card-info">
		<a-row type="flex">
			<a-col class="col-img" :span="24" :xl="12">
				<div class="card-img-bg" style="width: 200px; height: 200px;">
					<img :src="data[0].image_url" alt="">
				</div>
			</a-col>
			<a-col class="col-content" :span="24" :xl="12" style="margin-left: 20px; margin-right: 0">
				<div class="card-content">
					<a-list item-layout="vertical" 
					:split="false" 
					:data-source="data">
						<a-list-item slot="renderItem" slot-scope="item">
							<a-list-item-meta>
								<template #title>
									<h6 class="font-semibold" style="color: #141414">{{ item.title }}</h6>
								</template>
								<template #description>
									<h6 class="text-sm">{{ item.description }}</h6>
								</template>
							</a-list-item-meta>
							<div clas="ant-table-wrapper">
								<div class="ant-table ant-table-scroll-position-left ant-table-default">
									<div class="ant-table-content">
										<div class="ant-table-body">
											<table class="">
												<tbody class="ant-table-tbody">
													<tr class="ant-table-row ant-table-row-level-0">
														<td class="ant-table-row-cell-break-word" style="padding: 5px; width: 25%;">
															<h6 class="font-semibold" style="color: #141414;">
																Owner
															</h6>
														</td>
														<td class="ant-table-row-cell-break-word" style="padding: 5px">
															{{item.ownerAddress}}
														</td>
													</tr>
													<tr class="ant-table-row ant-table-row-level-0">
														<td class="ant-table-row-cell-break-word" style="padding: 5px; width: 25%;">
															<h6 class="font-semibold" style="color: #141414;">
																Minted At
															</h6>
														</td>
														<td class="ant-table-row-cell-break-word" style="padding: 5px">
															{{item.created_at}}
														</td>
													</tr>
													<tr class="ant-table-row ant-table-row-level-0">
														<td class="ant-table-row-cell-break-word" style="padding: 5px; width: 25%;">
															<h6 class="font-semibold" style="color: #141414;">
																Price
															</h6>
														</td>
														<td class="ant-table-row-cell-break-word" style="padding: 5px">
															{{item.currency}}&nbsp;{{item.price}}
														</td>
													</tr>
												</tbody>
											</table>
										</div>
									</div>
								</div>
							</div>
						</a-list-item>
					</a-list>
				</div>
			</a-col>
		</a-row>
		<a-row type="flex">
			<a-col class="col-content" :span="12" :xl="6" style="margin-top: 20px; margin-right: 15px">
				<a-button type="primary" 
				:loading="isOwnershipHistoryLoading"
				@click="onOwnershipHistoryBtnClick">
					Ownership History
				</a-button>
				<a-drawer
					title="Ownership history"
					:width="480"
					:visible="isDrawerVisible"
					:body-style="{ padding: '80px' }"
					@close="onDrawerClose"
				>
					<a-timeline>
							<a-timeline-item v-for="item in ownershipHistory" :key="item.index" 
							color="green">
							{{ item.to }}
							<p>{{ item.dateTime }}</p>
						</a-timeline-item>
						</a-timeline>
				</a-drawer>
			</a-col>
			<a-col class="col-content" :span="12" :xl="6" style="margin-top: 20px; margin-right: 0">
				<a-button type="primary" style="background-color: #52C41A; border-color: #52C41A">
					Request Token Transfer
				</a-button>
			</a-col>
		</a-row>
	</a-card>

</template>

<script>

	import discoverController from '../../controllers/DiscoverController';

	export default ({
		props: {
			data: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
				isDrawerVisible: false,
				isOwnershipHistoryLoading: false,
				tokenId: -1,
				ownershipHistory: [],
			}
		},
		methods: {
			onDrawerClose() {
				this.isDrawerVisible = false;
			},
			onOwnershipHistoryBtnClick() {
				if(this.tokenId !== -1) {
					this.isOwnershipHistoryLoading = true;
					discoverController.retrieveTokenOwnershipHistory(this.tokenId)
					.then((response) => {
						this.ownershipHistory = response;
						this.isOwnershipHistoryLoading = false;
						this.isDrawerVisible = true;
					}).catch((error) => {
						this.isOwnershipHistoryLoading = false;
						console.error(error);
					});
				}
			}
		},
		mounted() {
			this.tokenId = (this.data.length > 0) ? this.data[0].tokenId : -1;
		}
	})

</script>