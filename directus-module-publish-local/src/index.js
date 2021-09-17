import Build from './routes/build.vue';
import Settings from './routes/settings.vue';

export default {
    id: 'dwaring87-publish-local',
    name: 'Publish',
    icon: 'cloud_upload',
    routes: [
        {
            path: '',
            redirect: '/dwaring87-publish-local/build'
        },
        {
            path: 'build',
            component: Build
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