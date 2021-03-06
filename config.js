const extension_name = "dwaring87-publish-node";
const collection_name = "dwaring87_publish_node";

module.exports = {
    "extension": extension_name,
    "collection": {
        "collection": collection_name,
        "meta": {
            "collection": collection_name,
            "icon": "cloud_upload",
            "note": "Configuration settings for the " + extension_name + " extension",
            "hidden": true
        },
        "schema": {}
    },
    "fields": [
        {
            "field": "site",
            "type": "integer"
        },
        {
            "field": "key",
            "type": "string"
        },
        {
            "field": "value",
            "type": "string"
        }
    ],
    "keys": {
        "id": "site-id",
        "name": "site-name",
        "path": "site-path",
        "command": "site-command",
        "url": "site-url",
        "env": "site-env",
        "status": "build-status",
        "log": "build-log",
        "timestamp": "build-timestamp",
        "activity": "build-activity"
    },
    "statuses": {
        "created": "Created - Not Published",
        "started": "Building...",
        "failed": "Build Failed - See Log for details",
        "completed": "Published"
    },
    "activityFilter": {
        "action": {
            "_neq": "login"
        },
        "collection": {
            "_nin": [collection_name, "directus_dashboards", "directus_folders", "directus_migrations", "directus_panels", "directus_sessions", "directus_settings", "directus_webhooks"]
        }
    },
    "allow_concurrent_builds": false,
    "extension_path_env_var": "DIRECTUS_EXTENSIONS_PATH"
}