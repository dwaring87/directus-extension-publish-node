import ModuleComponent from './module.vue';

export default {
	id: '@dwaring87/directus-gridsome-module',
	name: 'Publish',
	icon: 'published_with_changes',
	routes: [
		{
			path: '',
			component: ModuleComponent,
		},
	],
};