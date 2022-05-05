<template>

	<a-card :bordered="false" class="card-info">
		<a-form
			id="components-form-demo-normal-login"
			:form="form"
			class="login-form"
			:hideRequiredMark="true">
			<a-row type="flex">
				<a-col class="col-content" :span="12" :xl="12">
					<div class="card-content">
						<!-- Sign In Form -->
						<a-form-item class="mb-10" label="To Address" :colon="false">
							<a-input
							v-decorator="[
							'toAddress',
							{ rules: [{ required: true, message: 'Please input your email!' }] },
							]" placeholder="ToAddress" disabled />
						</a-form-item>
						<a-form-item class="mb-5" label="Title" :colon="false">
							<a-input
							v-decorator="[
							'title',
							{ rules: [{ required: true, message: 'Please input the title of the software license NFT token!' }] },
							]" placeholder="title" />
						</a-form-item>
						<a-form-item class="mb-5" label="Description" :colon="false">
							<a-textarea
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
									Click or drag an image file to this area that represents the software license NFT.
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
					</div>
				</a-col>
				<a-col class="col-img" :span="12" :xl="12">
					<span style="display:inline-block;margin-bottom: 15px;margin-top: 15px;">
						Image To Represent NFT
						</span>
					<div class="card-img-bg">
						<img :src="imagePreviewSrc" alt="">
					</div>
				</a-col>
			</a-row>
		</a-form>
	</a-card>

</template>

<script>

	export default ({
		emits: ['mintParams'],
		props: {
			toAddress: {
				type: String,
				default: () => {
					return '0x0000000000000000000000000000000000000000'; 
				},
			},
			bus: {
				type: Object,
				default: () => {
					return new Object();
				}
			}
		},
		data() {
			return {
				storageAPI: process.env.VUE_APP_STORAGE_API,
				msgToUser: '',
				msgType: 'success',
				msgToUserVisible: false,
				imagePreviewSrc: 'images/info-card-2.jpg',
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

					this.msgToUser = info.file.name + " file uploaded successfully.";
					this.msgType = "success";
					this.msgToUserVisible = true;
				} else if (status === 'error') {
					this.msgToUser = info.file.name + " file upload failed.";
					this.msgType = "error";
					this.msgToUserVisible = true;
				}
			},
		},
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'new_software_license_nft' });
			
		},
		created() {
    		this.bus.$on('emitMintParams', () => {
				console.log("CardMintSWLicenseNFT :- Received message on bus to emit mint params");
				this.form.validateFields((err, values) => {
					if ( !err ) {

						if(this.imagePreviewSrc === "images/info-card-2.jpg") {
							this.msgToUser = "Please select an image file that represents the software license NFT";
							this.msgType = "error";
							this.msgToUserVisible = true;
							return;
						}

						let params = {
							toAddress: this.toAddress,
							title: values['title'],
							description: values['description'],
							image_url: this.imagePreviewSrc
						};
						this.bus.$emit('mintParams', params);
					}
				});
    		});

			this.bus.$on('msgToUser', (args) => {
        		this.msgToUser = args.msg;
				this.msgType = args.type;
				this.msgToUserVisible = true;
    		});
		},
		mounted() {
			this.form.setFieldsValue({
				toAddress: this.toAddress
			});
		},
	})

</script>