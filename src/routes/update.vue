<template>
    <private-view title="Update Sites">
        <template #headline>Publish</template>

        <template #title-outer:prepend>
            <v-button class="header-icon" rounded disabled icon secondary>
                <v-icon name="cloud_upload" />
            </v-button>
        </template>

        <template #navigation>
            <Navigation />
        </template>

        <!-- Loading -->
        <div style="margin: 25px auto; max-width: 50px" v-if="loading">
            <v-progress-circular indeterminate />
        </div>

        <!-- Setup Message -->
        <div v-if="setupMessage && !loading" style="margin: 25px 50px; text-align: center">
            <v-info icon="settings" title="Setup Required" type="warning">{{ setupMessage }}</v-info>
            <br />
            <v-notice type="info">Go to the Settings page to configure the missing settings.</v-notice>
        </div>

        <!-- Build Tools -->
        <div v-if="!setupMessage && !loading" style="margin: 25px 50px">
            <p>Publish Tools go here</p>
        </div>
    </private-view>
</template>

<script>
import Navigation from '../components/navigation.vue';
import { collectionExists } from '../settings.js';

/**
 * Perform the Setup steps
 * - Check if the Settings Collection exists
 */
function setup(api, callback) {
    
    // Check if the Settings Collection exists
    collectionExists(api, function(exists) {
        if ( !exists ) {
            return callback("Publish Settings Missing");
        }
        return callback();
    });

}

export default {
    data: function() {
        return {
            loading: true,
            setupMessage: undefined
        }
    },
    components: {
        Navigation
    },
    inject: ['api'],
    mounted: function() {
        let vm = this;
        let api = this.api;
        
        setup(api, function(err) {
            vm.setupMessage = err;
            vm.loading = false;
        });
    }
};
</script>