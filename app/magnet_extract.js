const request = require('request')
const cheerio = require('cheerio')
const async = require('async')
const url_parser = require('url')

let options = {
    url: '',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0'
    }
}

function getSeeds(query, cbResult) {
    options.url = `https://www.google.com.br/search?q=${query.replace(/ /g, '+')}+download+torrent`

    request(options, (err, resp, body) => {
        if (err) {
            console.log('Erro: ' + err);
        }

        let urls = []
        const $ = cheerio.load(body)

        $('div.rc h3.r a').each((i, elem) => {
            urls.push(elem.attribs['href'])
        })
        console.log('Google ok')

        extract_magnet(urls, cbResult)
    })
}

function extract_magnet(urls, cbResult) {
    function httpGet(url, callback) {
        options.url = url

        request(options, (err, resp, body) => {
            if (err) {
                console.log('Erro: ' + err);
            }

            let links = []
            const $ = cheerio.load(body)

            $('a[href^="magnet:"]').each((i, elem) => {
                links.push(elem.attribs['href'])
            })

            callback(null, links)
        })
    }

    async.map(urls, httpGet, function (err, res) {
        if (err) {
            console.log(err)
        }
        
        function getTorrentName(link) {
            let name = new url_parser.URL(link).searchParams.get('dn')

            if (!name) {
                let dnF = link.substring(link.indexOf('dn='))

                name = decodeURI(dnF.substring(3, dnF.indexOf('&amp')))
            }

            return name;
        }

        let magnet_links = res.reduce((accum, curr) => {
            return accum.concat(curr);
        }).map((link, i) => {          
            

            return {
                id: i + 1,
                uri: link,
                name: getTorrentName(link)
            }
        })

        cbResult({ urls: magnet_links})
    })
}

module.exports = {
    extract_torrents: (urls, query, callback) => {
        if (!urls.length) {
            getSeeds(query, callback)
        } else {
            extract_magnet(urls, callback)
        }
    }
}