<template>

	<a-card :bordered="false" class="card-info">
		<a-row type="flex">
			<a-col class="col-img" :span="24" :xl="12">
				<div class="card-img-bg">
					<img src="images/info-card-1.jpg" alt="">
				</div>
			</a-col>
			<a-col class="col-content" :span="24" :xl="12" style="margin-left: 20px">
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
							<a-row type="flex" align="middle">
								<a-col :span="24" :md="12">
									<a-tag color="#B37FEB">{{item.owner}}</a-tag>
								</a-col>
							</a-row>
							<a-row type="flex" align="middle">
								<a-col :span="24" :md="12">
									<a-tag color="#52C41A">{{item.created_at}}</a-tag>
								</a-col>
							</a-row>
						</a-list-item>
					</a-list>
				</div>
			</a-col>
		</a-row>
		<a-row type="flex">
			<a-col class="col-content" :span="24" :xl="12" style="margin-top: 20px">
				<a-collapse expandIconPosition="right">
					<a-collapse-panel key="1">
						<template #header>
							<span>Ownership history</span>
						</template>
						<a-timeline pending="Recording...">
							<a-timeline-item color="green">
								$2,400 - Redesign store
								<p>09 JUN 7:20 PM</p>
							</a-timeline-item>
							<a-timeline-item color="green">
								New order #3654323
								<p>08 JUN 12:20 PM</p>
							</a-timeline-item>
							<a-timeline-item color="blue">
								Company server payments 
								<p>04 JUN 3:10 PM</p>
							</a-timeline-item>
							<a-timeline-item color="blue">
								New card added for order #4826321
								<p>02 JUN 2:45 PM</p>
							</a-timeline-item>
							<a-timeline-item color="blue">
								Unlock folders for development
								<p>18 MAY 1:30 PM</p>
							</a-timeline-item>
							<a-timeline-item color="gray">
								New order #46282344
								<p>14 MAY 3:30 PM</p>
							</a-timeline-item>
							<template #pendingDot> </template>
						</a-timeline>
					</a-collapse-panel>
				</a-collapse>
			</a-col>
		</a-row>
	</a-card>

</template>

<script>

	export default ({
		props: {
			data: {
				type: Array,
				default: () => [],
			},
			ownership: {
				type: Array,
				default: () => [],
			},
		},
		data() {
			return {
			}
		},
	})

</script>