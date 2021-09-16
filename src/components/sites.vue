<template>
    <v-card class="site-card" v-for='site in sites' v-bind:key='site.site-id'>
        <v-card-title>{{ site[config.keys.name] }}</v-card-title>
        <v-card-subtitle>{{ site[config.keys.url] }}</v-card-subtitle>
        <v-card-text>
            <p v-if="settings"><strong>Path:</strong> <code>{{ site[config.keys.path] }}</code></p>
            <p v-if="settings"><strong>Build Command:</strong> <code>{{ site[config.keys.command] }}</code></p>
            <p><strong>Last Updated:</strong> {{ site[config.keys.timestamp] ? site[config.keys.timestamp] : 'Never' }}</p>
        </v-card-text>
        <v-card-actions>
            <v-button v-bind:href="site[config.keys.url]"><v-icon name="launch"></v-icon>&nbsp;View</v-button>
            <v-button v-if="settings" class="danger"><v-icon name="delete"></v-icon>&nbsp;Delete</v-button>
            <v-button v-if="build"><v-icon name="build"></v-icon>&nbsp;Build</v-button>
        </v-card-actions>
    </v-card>
</template>

<script>
    import config from "../../config.json";

    export default {
        props: {
            sites: {
                type: Array,
                required: true
            },
            page: String
        },

        data: function() {
            return {
                config: config
            }
        },
        
        computed: {
            build: function() {
                return this.page === 'build';
            },
            settings: function() {
                return this.page === 'settings';
            }
        }
    }
</script>

<style scoped>
    .site-card {
        margin: 25px auto;
        box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        max-width: 500px !important;
    }
    .site-card:hover {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
    }
    .site-card code {
        font-family: Monaco, monospace;
        line-height: 100%;
        background-color: #eee;
        padding: 0.2em;
    }
    .site-card .v-button.danger {
		--v-button-color: var(--red);
		--v-button-background-color: var(--red-50);
		--v-button-color-hover: var(--white);
		--v-button-background-color-hover: var(--red);
	}
</style>