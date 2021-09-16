import config from "../config.json";

/**
 * Check if the Module Settings Collection exists
 * @param {API} api Directus API
 * @param {Function} callback Callback function(exists)
 */
function collectionExists(api, callback) {
    api.get(`/collections/${config.collection.collection}`).then(function(res) {
        return callback(res.data && res.data.data);
    }).catch(function(err) {
        console.log(err);
        return callback(false);
    });
}

/**
 * Create the Module Settings Collection and Fields
 * @param {API} api Directus API
 * @param {Function} callback Callback function(success)
 */
function createCollection(api, callback) {
    api.post('/collections', config.collection).then(async function(res) {
        if ( res.status === 200 ) {
            let requests = [];
            for ( let i = 0; i < config.fields.length; i++ ) {
                requests.push(api.post(`/fields/${config.collection.collection}`, config.fields[i]));
            }
            const responses = await Promise.all(requests);
            for ( let i = 0; i < responses.length; i++ ) {
                if ( responses[i].status !== 200 ) {
                    return callback(false);
                }
            }
            return callback(true);
        }
        else {
            return callback(false);
        }
    }).catch(function(err) {
        console.log(err);
        return callback(false);
    });
}

/**
 * Get the Sites and their properties
 * @param {API} api Directus API
 * @param {Function} callback Callback function(sites)
 */
function getSites(api, callback) {
    api.get(`/items/${config.collection.collection}`).then(function(res) {
        return callback(res.data.data);
    }).catch(function(err) {
        console.log(err);
        return callback();
    });
}

function saveSite(api, name, path, command, url, callback) {
    // TODO
} 

export { collectionExists, createCollection, getSites, saveSite };