const extension_name = "dwaring87-publish-local";
const collection_name = "dwaring87_publish_local";

module.exports = {
    "extension": extension_name,
    "collection": {
        "collection": collection_name,
        "meta": {
            "hidden": true,
            "note": "Configuration settings for the " + extension_name + " extension"
        }
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
        "status": "build-status",
        "log": "build-log",
        "timestamp": "build-timestamp",
        "activity": "build-activity"
    },
    "activityFilter": {
        "action": {
            "_neq": "authenticate"
        },
        "collection":  {
            "_neq": collection_name
        }
    }
}