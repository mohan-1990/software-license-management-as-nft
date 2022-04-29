<!-- 
	This is the sign up page, it uses the dashboard layout in: 
	"./layouts/Default.vue" .
 -->

<template>
	<div>

		<!-- Sign Up Image And Headings -->
		<div class="sign-up-header" style="background-image: url('images/bg-signup.jpg')">
			<div class="content">
				<h1 class="mb-5">Sign Up</h1>
				<p class="text-lg">Enter below details to register a new user in the platform</p>
			</div>
		</div>
		<!-- / Sign Up Image And Headings -->
		
		<!-- Sign Up Form -->
		<a-card :bordered="false" class="card-signup header-solid h-full" :bodyStyle="{paddingTop: 0}">
			<template #title>
				<h5 class="font-semibold text-center">Registration form</h5>
			</template>
			<a-form
				id="components-form-demo-normal-login"
				:form="form"
				class="login-form"
				@submit="handleSubmit"
			>
				<a-form-item class="mb-10">
					<a-input
						v-decorator="[
						'firstname',
						{ rules: [{ required: true, message: 'Please input your first name!' }] },
						]"
						placeholder="FirstName"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-10">
					<a-input
						v-decorator="[
						'lastname',
						{ rules: [{ required: true, message: 'Please input your last name!' }] },
						]"
						placeholder="LastName"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-10">
					<a-input
						v-decorator="[
						'email',
						{ rules: [{ required: true, message: 'Please input your email!' }] },
						]"
						placeholder="Email"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-10">
					<a-input
						v-decorator="[
						'phone',
						{ rules: [{ required: true, message: 'Please input your phone number!' }] },
						]"
						placeholder="phone"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-5">
					<a-input
						v-decorator="[
						'password',
						{ rules: [{ required: true, message: 'Please input your Password!' }] },
						]"
						type="password"
						placeholder="Password"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-5">
					<a-input
						v-decorator="[
						'confirmpassword',
						{ rules: [{ required: true, message: 'Please input your Password again!' }] },
						]"
						type="password"
						placeholder="ConfirmPassword"
					>
					</a-input>
				</a-form-item>
				<a-form-item class="mb-10">
					<a-checkbox
						v-decorator="[
						'agreeterms',
						{
							valuePropName: 'checked',
							initialValue: true,
						},
						]"
					>
						I agree the <a href="#" class="font-bold text-dark">Terms and Conditions</a>
					</a-checkbox>
				</a-form-item>
				<a-form-item class="mb-10">
					<a-alert v-if="successMsgVisible" :message="successMsg" type="success" 
					closable:after-close="successMsgHandleClose" />
				</a-form-item>
				<a-form-item class="mb-10">
					<a-alert v-if="errorMsgVisible" :message="errorMsg" type="error" 
					closable:after-close="errorMsgHandleClose" />
				</a-form-item>
				<a-form-item>
					<a-button type="primary" block html-type="submit" class="login-form-button">
						SIGN UP
					</a-button>
				</a-form-item>
			</a-form>
			<p class="font-semibold text-muted text-center">Already have an account? <router-link to="/sign-in" class="font-bold text-dark">Sign In</router-link></p>
		</a-card>
		<!-- / Sign Up Form -->

	</div>
</template>

<script>

	import singnUpController from '../controllers/SignUpController';

	export default ({
		data() {
			return {
				successMsgVisible: false,
				errorMsgVisible: false,
				successMsg: 'Registration successful.You are being redirected to sign into the platform.',
				errorMsg: ''
			};
		},
		beforeCreate() {
			// Creates the form and adds to it component's "form" property.
			this.form = this.$form.createForm(this, { name: 'normal_login' });
		},
		methods: {
			// Handles input validation after submission.
			handleSubmit(e) {
				singnUpController.submit(e, this.form, this.$router, this);
			},
			successMsgHandleClose() {
      			singnUpController.successMsgHandleClose(this);
    		},
			errorMsgHandleClose() {
      			singnUpController.errorMsgHandleClose(this);
    		},
		},
	})

</script>

<style lang="scss">
</style>