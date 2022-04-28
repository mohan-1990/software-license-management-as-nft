<!-- 
	This is the default layout, used in sign-in and sign-up pages.
 -->

<template>
	<div>

		<!-- Default Layout -->
		<a-layout class="layout-default" id="layout-default-no-header-footer" :class="[layoutClass]">

			<!-- Page Content -->
			<a-layout-content>
				<router-view />
			</a-layout-content>
			<!-- / Page Content -->

		</a-layout>
		<!-- / Default Layout -->

	</div>
</template>

<script>

	export default ({
		components: {
		},
		data() {
			return {
			}
		},
		computed: {
			// Sets layout's element's class based on route's meta data.
			layoutClass() {
				return this.$route.meta.layoutClass ;
			}
		},
	})

</script>