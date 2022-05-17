import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let routes = [
	{
		// will match everything
		path: '*',
		component: () => import('../views/404.vue'),
	},
	{
		path: '/',
		name: 'Home',
		redirect: '/sign-in',
	},
	{
		path: '/sign-in',
		name: 'Sign-In',
		layout: "default-no-header-footer",
		meta: {
			layoutClass: 'layout-default'
		},
		component: () => import('../views/Sign-In.vue'),
	},
	{
		path: '/sign-up',
		name: 'Sign-Up',
		layout: 'default-no-header-footer',
		meta: {
			layoutClass: 'layout-default',
		},
		component: () => import('../views/Sign-Up.vue'),
	},
	{
		path: '/discover',
		name: 'Discover',
		layout: "dashboard",
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import(/* webpackChunkName: "dashboard" */ '../views/Discover.vue'),
	},
	{
		path: '/mynfts',
		name: 'My Software License NFTs',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-mynft',
		},
		component: () => import('../views/MyNFTs.vue'),
	},
	{
		path: '/transferrequests',
		name: 'Transfer Requests',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-transferreqs',
		},
		component: () => import('../views/TransferRequests.vue'),
	},
	{
		path: '/billing',
		name: 'Billing',
		layout: "dashboard",
		component: () => import('../views/Billing.vue'),
	},
	{
		path: '/Profile',
		name: 'Profile',
		layout: "dashboard",
		meta: {
			layoutClass: 'layout-profile',
		},
		component: () => import('../views/Profile.vue'),
	}
]

// Adding layout property from each route to the meta
// object so it can be accessed later.
function addLayoutToRoute( route, parentLayout = "default" )
{
	route.meta = route.meta || {} ;
	route.meta.layout = route.layout || parentLayout ;
	
	if( route.children )
	{
		route.children = route.children.map( ( childRoute ) => addLayoutToRoute( childRoute, route.meta.layout ) ) ;
	}
	return route ;
}

routes = routes.map( ( route ) => addLayoutToRoute( route ) ) ;

const router = new VueRouter({
	mode: 'hash',
	base: process.env.BASE_URL,
	routes,
	scrollBehavior (to, from, savedPosition) {
		if ( to.hash ) {
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
		return {
			x: 0,
			y: 0,
			behavior: 'smooth',
		}
	}
})

export default router
