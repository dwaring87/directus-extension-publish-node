<template>
    <v-drawer v-model="show" v-on:cancel="this.$emit('close');" persistent
              title="Adding New Site" subtitle="Settings" icon="add">
        <div>
            <div class="input-row">
                <div class="type-label">
                    Site Name
                    <v-icon tooltip="Required" class="required" name="star" sup />
                </div>
                <v-input v-model="name" placeholder="Production" autofocus></v-input>
            </div>

            <div class="input-row">
                <div class="type-label">
                    Gridsome Path
                    <v-icon tooltip="Required" class="required" name="star" sup />    
                </div>
                <v-input v-model="path" placeholder="/gridsome"></v-input>
            </div>

            <div class="input-row">
                <div class="type-label">
                    Build Command
                    <v-icon tooltip="Required" class="required" name="star" sup />
                </div>
                <v-input v-model="command" placeholder="npx gridsome build"></v-input>
            </div>

            <div class="input-row">
                <div class="type-label">
                    Public URL
                    <v-icon tooltip="Required" class="required" name="star" sup />
                </div>
                <v-input v-model="url" placeholder="https://www.example.com"></v-input>
            </div>
            
            <br /><br />

            <div style="max-width: 250px; margin: 0 auto">
                <v-button v-on:click="startSaveSite" full-width>Save</v-button>
            </div>
        </div>
    </v-drawer>
</template>

<script>
    import { saveSite } from '../settings.js';

    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            }
        },

        data: function() {
            return {
                show: false,
                name: undefined,
                path: undefined,
                command: undefined,
                url: undefined,
                saving: false
            }
        },

        inject: ['api'],

        methods: {
            
            /**
            * Process user input to create a new Site
            */
            startSaveSite: function() {
                let vm = this;
                
                if ( !vm.name || vm.name === "" ) {
                    return vm.$emit("error", "Site Name is required");
                }
                if ( !vm.path || vm.path === "" ) {
                    return vm.$emit("error", "Local path to Gridsome site is required");
                }
                if ( !vm.command || vm.command === "" ) {
                    return vm.$emit("error", "Gridsome build command is required");
                }
                if ( !vm.url || vm.url === "" ) {
                    return vm.$emit("error", "URL of Gridsome site is required");
                }

                vm.saving = true;
                saveSite(vm.api, vm.name, vm.path, vm.command, vm.url, function(success) {
                    vm.saving = false;
                    if ( !success ) {
                        vm.$emit("error", "Could not add Site to Settings");
                    }
                    else {
                        vm.name = undefined;
                        vm.path = undefined;
                        vm.command = undefined;
                        vm.url = undefined;
                        vm.$emit('close');
                        vm.$emit('done');
                    }
                });
            }

        }
    }
</script>


<style scoped>
    div.input-row {
        padding: 10px 32px
    }
    div.type-label {
        padding-bottom: 5px;
    }
</style>