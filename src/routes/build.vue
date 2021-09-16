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

        <!-- Settings Missing -->
        <div v-if="!loading && !setup" style="margin: 25px 50px; text-align: center">
            <v-info icon="settings" title="Setup Required" type="warning">Build Settings Missing</v-info>
            <br />
            <v-notice type="info">Go to the <strong>&nbsp;&nbsp;<v-icon name="settings"></v-icon>&nbsp;</strong> Settings page to configure the sites to build.</v-notice>
        </div>

        <!-- No Sites -->
        <div v-if="!loading && setup && (!sites || sites.length === 0)" style="margin: 25px 50px; text-align: center">
            <v-info icon="settings" title="Setup Required" type="warning">No Sites Configured</v-info>
            <br />
            <v-notice type="info">Go to the Settings page to add a Gridsome site.</v-notice>
        </div>

        <!-- Build Tools -->
        <div v-if="!loading && setup && sites && sites.length > 0" style="margin: 25px 50px">
            <p>Build Tools go here</p>
        </div>
    </private-view>
</template>

<script>
import Navigation from '../components/navigation.vue';
import { collectionExists, getSites } from '../settings.js';

/**
 * Perform the Setup steps
 * - Check if the Settings Collection exists
 * - Get the Sites and their properties
 * @param {API} api Directus API
 * @param {Function} callback Callback function(setup, sites)
 */
function setup(api, callback) {
    collectionExists(api, function(exists) {
        if ( !exists ) {
            return callback(false);
        }
        getSites(api, function(sites) {
            return callback(true, sites);
        });
    });
}

export default {
    data: function() {
        return {
            loading: true,
            setup: false,
            sites: undefined
        }
    },
    components: {
        Navigation
    },
    inject: ['api'],
    mounted: function() {
        let vm = this;
        let api = this.api;
        
        setup(api, function(setup, sites) {
            vm.setup = setup;
            vm.sites = sites;
            vm.loading = false;
        });
    }
};
</script>