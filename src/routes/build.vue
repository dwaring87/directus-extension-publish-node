<template>
    <private-view title="Build Sites">
        <template #headline>Publish</template>

        <template #title-outer:prepend>
            <v-button class="header-icon" rounded disabled icon secondary>
                <v-icon name="build" />
            </v-button>
        </template>

        <template #navigation>
            <Navigation />
        </template>

        <!-- Loading -->
        <div v-if="loading" style="margin: 25px auto; max-width: 50px">
            <v-progress-circular indeterminate />
        </div>

        <!-- Setup Required -->
        <Message v-if="!loading && setupMessage" 
                icon="settings" title="Setup Required" v-bind:subtitle="setupMessage">
            Go to the <strong>&nbsp;&nbsp;<v-icon name="settings"></v-icon>&nbsp;</strong> Settings page to configure the sites to build.
        </Message>

        <!-- No Sites -->
        <Message v-if="!loading && !setupMessage && sites && sites.length === 0" 
                icon="settings" title="Setup Required" subtitle="No Sites Configured">
            Go to the <strong>&nbsp;&nbsp;<v-icon name="settings"></v-icon>&nbsp;</strong> Settings page to add a Gridsome site.
        </Message>

        <!-- List of Sites -->
        <Sites v-if="!loading && !setupMessage && sites && sites.length > 0"
                v-bind:sites="sites" page='build' />
    </private-view>
</template>

<script>
    import Navigation from '../components/navigation.vue';
    import Message from '../components/message.vue';
    import Sites from '../components/sites.vue';
    import { collectionExists, getSites } from '../settings.js';

    export default {
        data: function() {
            return {
                loading: true,
                setupMessage: undefined,
                sites: undefined
            }
        },

        components: { Navigation, Message, Sites },

        inject: ['api'],

        methods: {
            
            /**
            * Perform the Setup steps
            * - Check if the Settings Collection exists
            * - Get the Sites and their properties
            * @param {Function} callback Callback function(setupMessage, sites)
            */
            setup: function(callback) {
                let vm = this;

                collectionExists(vm.api, function(exists) {
                    if ( !exists ) {
                        return callback("Build Settings Missing");
                    }
                    getSites(vm.api, function(sites) {
                        return callback(!sites ? "Could not get Sites from Settings" : undefined, sites);
                    });
                });
            }

        },

        mounted: function() {
            let vm = this;
            let api = this.api;
            
            vm.setup(function(setupMessage, sites) {
                vm.setupMessage = setupMessage;
                vm.sites = sites;
                vm.loading = false;
            });
        }
    };
</script>