<template>
    <private-view title="Settings">
        <template #headline>Publish</template>

        <template #title-outer:prepend>
            <v-button class="header-icon" rounded disabled icon secondary>
                <v-icon name="settings" />
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
            <v-info icon="error" title="Setup Failed" type="error">{{ setupMessage }}</v-info>
            <br />
        </div>

        <!-- Settings -->
        <div v-if="!setupMessage && !loading" style="margin: 25px 50px">
            <p>Publish Settings go here</p>
        </div>
    </private-view>
</template>

<script>
import Navigation from '../components/navigation.vue';
import { collectionExists, createCollection } from '../settings.js';


/**
 * Perform the Setup steps
 * - Check if the Settings Collection exists
 * - Create the Collection, if it does not exist
 */
function setup(api, callback) {

    // Check if the Settings Collection exists
    collectionExists(api, function(exists) {

        // Create the Collection, if it does not exist
        if ( !exists ) {
            createCollection(api, function(success) {
                return callback(success ? undefined : 'Could not create Settings Collection');
            });
        }
        else {
            return callback();
        }

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
            vm.loading = false;
            vm.setupMessage = err;
        });
    }
};
</script>