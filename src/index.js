import Update from './routes/update.vue';
import Settings from './routes/settings.vue';

export default {
    id: 'dwaring87-publish-gridsome',
    name: 'Publish',
    icon: 'published_with_changes',
    routes: [
        {
            path: '',
            redirect: '/dwaring87-publish-gridsome/update'
        },
        {
            path: 'update',
            component: Update
        },
        {
            path: 'settings',
            component: Settings
        }
    ],
    preRegisterCheck: function(user) {
        return user.role.admin_access === true;
    }
};