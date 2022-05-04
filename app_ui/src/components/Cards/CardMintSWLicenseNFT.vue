<template>

	<a-card :bordered="false" class="card-info">
		<a-row type="flex">
			<a-col class="col-content" :span="24" :xl="12">
				<div class="card-content">
					<!-- Sign In Form -->
				<a-form
					id="components-form-demo-normal-login"
					:form="form"
					class="login-form"
					:hideRequiredMark="true"
				>
					<a-form-item class="mb-10" label="To Address" :colon="false">
						<a-input v-model="toAddress"
						v-decorator="[
						'toAddress',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]" placeholder="ToAddress" disabled />
					</a-form-item>
					<a-form-item class="mb-5" label="Title" :colon="false">
						<a-input v-model="title"
						v-decorator="[
						'title',
						{ rules: [{ required: true, message: 'Please input the title of the software license NFT token!' }] },
						]" placeholder="title" />
					</a-form-item>
					<a-form-item class="mb-5" label="Description" :colon="false">
						<a-textarea v-model="description"
						v-decorator="[
						'description',
						{ rules: [{ required: true, message: 'Please input the description of the software license NFT token!' }] },
						]" placeholder="description" />
					</a-form-item>
					<a-form-item class="mb-10">
						<a-upload-dragger
							name="nft_image"
    						:multiple="false"
    						:action="storageAPI"
							accept=".png,.jpeg,.jpg"
    						@change="handleNFTImageChange"
  						>
							<p class="ant-upload-drag-icon">
								<a-icon type="inbox" />
							</p>
							<p class="ant-upload-text">
								Click or drag file to this area to upload
							</p>
							<p class="ant-upload-hint">
								Support for a single image file upload. File size limit 5MB.
							</p>
  						</a-upload-dragger>
					</a-form-item>
					<a-form-item class="mb-10">
						<a-alert v-if="msgToUserVisible" :message="msgToUser" :type="msgType" 
						closable:after-close="msgToUserHandleClose" />
					</a-form-item>
				</a-form>
				</div>
				<div class="card-footer">
					<a-button type="primary" @click="handleMintBtnClick">
					<svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M3 3C2.44772 3 2 3.44772 2 4C2 4.55228 2.44772 5 3 5H14C14.5523 5 15 4.55228 15 4C15 3.44772 14.5523 3 14 3H3Z" fill="#111827"/>
						<path d="M3 7C2.44772 7 2 7.44772 2 8C2 8.55228 2.44772 9 3 9H10C10.5523 9 11 8.55228 11 8C11 7.44772 10.5523 7 10 7H3Z" fill="#111827"/>
						<path d="M3 11C2.44772 11 2 11.4477 2 12C2 12.5523 2.44772 13 3 13H7C7.55228 13 8 12.5523 8 12C8 11.4477 7.55228 11 7 11H3Z" fill="#111827"/>
						<path d="M15 8C15 7.44772 14.5523 7 14 7C13.4477 7 13 7.44771 13 8L13 13.5858L11.7071 12.2929C11.3166 11.9024 10.6834 11.9024 10.2929 12.2929C9.90237 12.6834 9.90237 13.3166 10.2929 13.7071L13.2929 16.7071C13.4804 16.8946 13.7348 17 14 17C14.2652 17 14.5196 16.8946 14.7071 16.7071L17.7071 13.7071C18.0976 13.3166 18.0976 12.6834 17.7071 12.2929C17.3166 11.9024 16.6834 11.9024 16.2929 12.2929L15 13.5858L15 8Z" fill="#111827"/>
					</svg>
						MINT
					</a-button>
				</div>
			</a-col>
			<a-col class="col-img" :span="24" :xl="12">
				<div class="card-img-bg">
					<img :src="imagePreviewSrc" alt="">
				</div>
			</a-col>
		</a-row>
	</a-card>

</template>

<script>

	export default ({
		props: {
			toAddress: {
				type: String,
				default: () => {
					return '0x0000000000000000000000000000000000000000'; 
				},
			},
			onMintBtnClick: {
				type: Function,
				default: () => {
					console.error("CardMintSWLicenseNFT -> Bind a function for onMintBtnClick property");
				}
			},
		},
		data() {
			return {
				storageAPI: process.env.VUE_APP_STORAGE_API,
				msgToUser: '',
				msgType: 'success',
				msgToUserVisible: false,
				imagePreviewSrc: 'images/info-card-2.jpg'
			}
		},
		methods: {
			handleNFTImageChange(info) {
				this.msgToUserVisible = false;
				const status = info.file.status;

				if (status !== 'uploading') {
					console.log("Uploading file " + info.file);
				}
				if (status === 'done') {
					this.imagePreviewSrc = process.env.VUE_APP_STORAGE_API + "?id=" + 
					info.file.response.fileId;

					this.msgToUser = info.file.name + "file uploaded successfully.";
					this.msgType = "success";
					this.msgToUserVisible = true;
				} else if (status === 'error') {
					this.msgToUser = info.file.name + "file upload failed.";
					this.msgType = "error";
					this.msgToUserVisible = true;
				}
			},
			handleMintBtnClick() {

				this.msgToUserVisible = false;

				if(this.imagePreviewSrc === "" || this.imagePreviewSrc === null || this.imagePreviewSrc === undefined ||
				this.imagePreviewSrc === 'images/info-card-2.jpg') {
					this.msgToUser = "Please upload the NFT image file and try again.";
					this.msgType = "error";
					this.msgToUserVisible = true;
					return;
				}

				let params = {
					toAddress: this.toAddress,
					title: this.title,
					description: this.description,
					nftImageSrc: this.imagePreviewSrc
				};

				this.onMintBtnClick(params);
			},
		}
	})

</script>