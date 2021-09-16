<template>
    <v-dialog v-model="show" persistent>
        <v-card>
            <v-card-title>{{ title }}</v-card-title>
            <v-card-text>{{ message }}</v-card-text>
            <v-card-actions>
                <v-button outlined v-on:click="this.$emit('close')">{{ dismissLabel }}</v-button>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>


<script>
    export default {
        props: {
            show: {
                type: Boolean,
                default: false
            },
            title: String,
            message: String,
            dismissLabel: {
                type: String,
                default: "Dismiss"
            }
        }
    }
</script>
