<template>
    <private-view title="Settings">
        <template #headline>Publish</template>

        <template #title-outer:prepend>
            <v-button class="header-icon" rounded disabled icon secondary>
                <v-icon name="settings" />
            </v-button>
        </template>

        <template #actions>
            <v-button  @click="addSite_showModal = true" tooltip.bottom="Add Gridsome Site" rounded icon>
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
        <div v-if="!loading && setupMessage" style="margin: 25px 50px; text-align: center">
            <v-info icon="error" title="Setup Failed" type="danger">{{ setupMessage }}</v-info>
            <br />
        </div>

        <!-- No Sites -->
        <div v-if="!loading && !setupMessage && (!sites || sites.length === 0)" style="margin: 25px 50px; text-align: center">
            <v-info icon="add" title="Add Gridsome Site" type="warning">No Sites Configured</v-info>
            <br />
            <v-notice type="info">Click the <strong>&nbsp;&nbsp;<v-icon class="btn-color" name="add_circle"></v-icon>&nbsp;</strong> Add button above to add a site.</v-notice>
        </div>

        <!-- Settings -->
        <div v-if="!loading && !setupMessage && sites && sites.length > 0" style="margin: 25px 50px">
            <p>Publish Settings go here</p>
        </div>

        <!-- Add Site Drawer -->
        <v-drawer v-model="addSite_showModal" v-on:cancel="addSite_showModal = false" title="Adding New Site" subtitle="Settings" icon="add">
            <div>
                <div style="padding: 10px 32px">
                    <div class="type-label" style="padding-bottom: 5px">
                        Site Name
                        <v-icon tooltip="Required" class="required" name="star" sup />
                    </div>
                    <v-input v-model="addSite_name" autofocus="true" placeholder="Production"></v-input>
                </div>

                <div style="padding: 10px 32px">
                    <div class="type-label" style="padding-bottom: 5px">
                        Gridsome Path
                        <v-icon tooltip="Required" class="required" name="star" sup />    
                    </div>
                    <v-input v-model="addSite_path" placeholder="/gridsome"></v-input>
                </div>

                <div style="padding: 10px 32px">
                    <div class="type-label" style="padding-bottom: 5px">
                        Build Command
                        <v-icon tooltip="Required" class="required" name="star" sup />
                    </div>
                    <v-input v-model="addSite_command" placeholder="npx gridsome build"></v-input>
                </div>

                <div style="padding: 10px 32px">
                    <div class="type-label" style="padding-bottom: 5px">
                        Public URL
                        <v-icon tooltip="Required" class="required" name="star" sup />
                    </div>
                    <v-input v-model="addSite_url" placeholder="https://www.example.com"></v-input>
                </div>
                
                <br /><br />

                <div style="max-width: 250px; margin: 0 auto">
                    <v-button full-width="true" v-on:click="startSaveSite">Save</v-button>
                </div>
            </div>
        </v-drawer>

        <v-dialog v-model="addSite_errorMessage" persistent="true">
            <v-card>
                <v-card-title>Error</v-card-title>
                <v-card-text>{{ addSite_errorMessage }}</v-card-text>
                <v-card-actions>
                    <v-button v-on:click="addSite_errorMessage = undefined">OK</v-button>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </private-view>
</template>

<script>
import Navigation from '../components/navigation.vue';
import { collectionExists, createCollection, getSites, saveSite } from '../settings.js';


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
            addSite_showModal: false,
            addSite_errorMessage: undefined,
            addSite_name: undefined,
            addSite_path: undefined,
            addSite_command: undefined,
            addSite_url: undefined,
            addSite_saving: false
        }
    },
    components: {
        Navigation
    },
    inject: ['api'],
    methods: {

        /**
         * Process user input to create a new Site
         */
        startSaveSite: function() {
            if ( !this.addSite_name || this.addSite_name === "" ) {
                this.addSite_errorMessage = "Site Name is required";
                return;
            }
            if ( !this.addSite_path || this.addSite_path === "" ) {
                this.addSite_errorMessage = "Local path to Gridsome site is required";
                return;
            }
            if ( !this.addSite_command || this.addSite_command === "" ) {
                this.addSite_errorMessage = "Gridsome build command is required";
                return;
            }
            if ( !this.addSite_url || this.addSite_url === "" ) {
                this.addSite_errorMessage = "URL of Gridsome site is required";
                return;
            }
            this.addSite_saving = true;
            saveSite(this.api, this.addSite_name, this.addSite_path, this.addSite_url, function(success) {
                console.log("DONE: " + success);
                this.addSite_saving = false;
            });
        }
    },
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

<style scoped>
    .btn-color {
        color: var(--v-button-background-color);
    }
</style>