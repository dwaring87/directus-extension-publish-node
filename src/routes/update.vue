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

        <div style="margin: 10px 25px">
            <p>Publish changes to sites</p>
        </div>
    </private-view>
</template>

<script>
import Navigation from '../components/navigation.vue';

export default {
    data: function() {
        return {}
    },

    components: {
        Navigation
    },

    inject: ['api'],

    mounted: function() {
        console.log("MOUNTED UPDATE");
        console.log(this.api);
    }
};
</script>