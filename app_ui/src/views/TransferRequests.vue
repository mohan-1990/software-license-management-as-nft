<!-- 
	This is the tables page, it uses the dashboard layout in: 
	"./layouts/Dashboard.vue" .
 -->

<template>
	<div>
		<!-- Header Background Image -->
		<div class="layout-transferreqs-nav-bg" style="background-image: url('images/bg-profile.jpg')"></div>
		<!-- / Header Background Image -->
		

		<!-- Transfer Requests Table -->
		<a-row :gutter="24" type="flex">

			<!-- Transfer Requests Table Table Column -->
			<a-col :span="24" class="mb-24">

				<!-- Transfer Requests Table Table Column -->
				<CardTransferRequests
					:data="transferRequests.data"
					:columns="transferRequests.columns"
				></CardTransferRequests>
				<!-- / Transfer Requests Table Column -->

			</a-col>
			<!-- / Transfer Requests Table Column -->

		</a-row>
	</div>
</template>

<script>
	import transferRequestsController from "../controllers/TransferRequestsController";
	import CardTransferRequests from "../components/Cards/CardTransferRequests.vue";

	// "Transfer Requests" table list of columns and their properties.
	const transferRequestsColumns = [
		{
			title: 'NFT',
			dataIndex: 'nft',
			scopedSlots: { customRender: 'nft' },
			width: '10%',
		},
		{
			title: 'OWNER ADDRESS',
			dataIndex: 'ownerAddress',
			class: 'font-semibold text-muted',
			width: '20%',
		},
		{
			title: 'REQUESTER ADDRESS',
			dataIndex: 'requesterAddress',
			class: 'font-semibold text-muted',
			width: '20%',
		},
		{
			title: 'DESCRIPTION',
			dataIndex: 'description',
			class: 'font-semibold text-muted',
			width: '20%',
		},
		{
			title: 'REQUEST DATE',
			dataIndex: 'request_date',
			class: 'font-semibold text-muted',
			width: '15%',
		},
		{
			title: 'MESSAGE/ ACTION',
			dataIndex: 'action_or_message',
			scopedSlots: { customRender: 'action_or_message' },
			width: '15%',
		},
	];

	export default ({
		components: {
			CardTransferRequests
		},
		data() {
			return {
				transferRequests: {
					columns: transferRequestsColumns,
					data: []
				},
			}
		},
		methods: {
			
		},
		async mounted() {
			this.transferRequests.data = await transferRequestsController
			.retrieveTransferRequests();
		},
	})

</script>