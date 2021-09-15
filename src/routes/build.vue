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

        <!-- Setup Message -->
        <div v-if="setupMessage && !loading" style="margin: 25px 50px; text-align: center">
            <v-info icon="settings" title="Setup Required" type="warning">{{ setupMessage }}</v-info>
            <br />
            <v-notice type="info">Go to the Settings page to configure the missing settings.</v-notice>
        </div>

        <!-- No Sites -->
        <div v-if="!setupMessage && !loading && (!sites || sites.length === 0)" style="margin: 25px 50px; text-align: center">
            <v-info icon="settings" title="Setup Required" type="warning">No Sites Configured</v-info>
            <br />
            <v-notice type="info">Go to the Settings page to add a Gridsome site.</v-notice>
        </div>

        <!-- Build Tools -->
        <div v-if="!setupMessage && !loading && sites && sites.length > 0" style="margin: 25px 50px">
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
 * @param {Function} callback Callback function(err, sites)
 */
function setup(api, callback) {
    collectionExists(api, function(exists) {
        if ( !exists ) {
            return callback("Publish Settings Missing");
        }
        getSites(api, function(sites) {
            return callback(undefined, sites);
        });
    });
}

export default {
    data: function() {
        return {
            loading: true,
            setupMessage: undefined,
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
        
        setup(api, function(err, sites) {
            vm.setupMessage = err;
            vm.sites = sites;
            vm.loading = false;
        });
    }
};
</script>