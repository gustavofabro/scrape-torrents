const magnet_extract = require('./magnet_extract')
const path = require('path')

module.exports = function (app) {
    app.get('/api/magnets_query/:query', (req, res, next) => {
        magnet_extract.extract_torrents([], req.params.query, urls => {
            res.send(JSON.stringify(urls))
        })
    })

    app.get('/api/magnets_urls/:urls', (req, res, next) => {
        magnet_extract.extract_torrents([req.params.urls], '', urls => {
            res.send(JSON.stringify(urls))
        })
    })

    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, '../view', 'index.html'));
    })
}