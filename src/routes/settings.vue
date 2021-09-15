<template>
    <private-view title="Settings">
        <template #headline>Publish</template>

        <template #title-outer:prepend>
            <v-button class="header-icon" @click="showAddSiteModal = true" rounded disabled icon secondary>
                <v-icon name="settings" />
            </v-button>
        </template>

        <template #actions>
            <v-button tooltip.bottom="Add Gridsome Site" rounded icon>
                <v-icon name="add" />
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
            <v-info icon="error" title="Setup Failed" type="danger">{{ setupMessage }}</v-info>
            <br />
        </div>

        <!-- No Sites -->
        <div v-if="!setupMessage && !loading && (!sites || sites.length === 0)" style="margin: 25px 50px; text-align: center">
            <v-info icon="add" title="Add Gridsome Site" type="warning">No Sites Configured</v-info>
            <br />
            <v-notice type="info">Click the <strong>&nbsp;&nbsp;<v-icon name="add_circle"></v-icon>&nbsp;&nbsp;</strong> button above to add a site.</v-notice>
        </div>

        <!-- Settings -->
        <div v-if="!setupMessage && !loading && sites && sites.length > 0" style="margin: 25px 50px">
            <p>Publish Settings go here</p>
        </div>

        <v-dialog v-model="displayAddSiteModal">
            <v-sheet>
                <h2>Are you sure you want to delete this item?</h2>
                <v-button>No</v-button>
                <v-button>Yes</v-button>
            </v-sheet>
        </v-dialog>
    </private-view>
</template>

<script>
import Navigation from '../components/navigation.vue';
import { collectionExists, createCollection, getSites } from '../settings.js';


/**
 * Perform the Setup steps
 * - Check if the Settings Collection exists
 * - Create the Collection, if it does not exist
 * @param {API} api Directus API
 * @param {Function} callback Callback function(err, sites)
 */
function setup(api, callback) {
    collectionExists(api, function(exists) {
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
            setupMessage: undefined,
            sites: undefined,
            showAddSiteModal: false
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
            getSites(api, function(sites) {
                vm.sites = sites;
                vm.loading = false;

                console.log("SITES: ");
                console.log(sites);
            });
        });
    }
};
</script>