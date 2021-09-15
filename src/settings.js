import config from "../config.json";

/**
 * Check if the Module Settings Collection exists
 * @param {API} api Directus API
 * @param {Function} callback Callback function(exists)
 */
function collectionExists(api, callback) {
    console.log("--> COLLECTION EXISTS");
    api.get(`/collections/${config.collection.collection}`).then(function(res) {
        return callback(res.data && res.data.data);
    });
}

/**
 * Create the Module Settings Collection and Fields
 * @param {API} api Directus API
 * @param {Function} callback Callback function(success)
 */
function createCollection(api, callback) {
    console.log("--> CREATE COLLECTION");
    api.post('/collections', config.collection).then(function(res) {
        if ( res.status !== 200 ) {
            return callback(false)
        }
        return callback(true);
    });
}

export { collectionExists, createCollection };