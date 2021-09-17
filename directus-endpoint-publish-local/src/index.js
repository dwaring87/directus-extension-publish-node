module.exports = function registerEndpoint(router, context) {
	
    /**
     * Build
     */
    router.get('/build/:site', function(req, res, next) {
        let site = req.params.site;
        res.send('Testing: ' + site);
    });

};