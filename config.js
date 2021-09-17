const collection_name = "dwaring87_publish_gridsome";

export default {
    "collection": {
        "collection": collection_name,
        "meta": {
            "hidden": true,
            "note": "Configuration settings for the dwaring87-publish-gridsome module"
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
        "name": "site-name",
        "path": "site-path",
        "command": "site-command",
        "url": "site-url",
        "timestamp": "last-published-timestamp",
        "activity": "last-published-activity"
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