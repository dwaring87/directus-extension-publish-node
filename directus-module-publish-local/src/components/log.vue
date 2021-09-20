<template>
    <v-dialog v-model="site" persistent>
        <v-card>
            <v-card-title>{{ name }} Log</v-card-title>
            <v-card-text>
                <p><strong>Status:</strong>&nbsp;&nbsp;{{ status }}</p>
                <p><strong>Timestamp:</strong>&nbsp;&nbsp;{{ timestamp }}</p>
                <br />
                <p><strong>Log:</strong></p>
                <div v-if="log" class="log">
                    <pre><code>{{ log }}</code></pre>
                </div>
            </v-card-text>
            <v-card-actions>
                <v-button v-on:click="this.$emit('close')">Close</v-button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
    import config from '../../../config.js';
    import { getSiteStatus } from '../settings.js';

    export default {
        inject: ['api'],

        props: {
            site: {
                type: Object,
                required: true
            }
        },

        data: function() {
            return {
                interval: undefined,
                status: "...",
                timestamp: "...",
                log: undefined
            }
        },

        computed: {
            name: function() {
                return this.site[config.keys.name]
            }
        },

        watch: {
            site: {
                handler: function(site) {
                    let vm = this;
                    vm.status = "...";
                    vm.timestamp = "...";
                    vm.log = undefined;
                    if ( site ) {
                        vm.interval = setInterval(function() { 
                            getSiteStatus(vm.api, site[config.keys.id], function(resp) {
                                vm.status = resp && resp.status ? resp.status : 'Unknown';
                                vm.timestamp = resp && resp.timestamp ? resp.timestamp : 'Unknown';
                                vm.log = resp && resp.log ? resp.log : 'Unknown'
                            })
                        }, 1000);
                    }
                    else {
                        if ( vm.interval ) clearInterval(vm.interval);
                    }
                },
                deep: true
            }
        }
    }
</script>


<style scoped>
    div.log {
        overflow-y: scroll; 
        max-height: 400px;
        font-family: monospace;
        background-color: var(--background-inverted);
        color: var(--foreground-inverted);
        padding: 5px 15px;
    }
</style>