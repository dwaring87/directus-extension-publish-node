<template>
    <v-list large>
        <v-list-item v-for="item in navItems" :key="item.to" :to="item.to">
            <v-list-item-icon><v-icon :name="item.icon" /></v-list-item-icon>
            <v-list-item-content>
                <v-text-overflow :text="item.name" />
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>


<script>
export default {
    data: function() {
        return {
            navItems: [
                {
                    to: '/dwaring87-publish-gridsome/build',
                    icon: 'build',
                    name: 'Build Sites'
                },
                {
                    to: '/dwaring87-publish-gridsome/settings',
                    icon: 'settings',
                    name: 'Settings'
                }
            ]
        }
    }
}
</script>