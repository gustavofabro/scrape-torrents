const request = require('request')
const cheerio = require('cheerio')

let options = {
    url: '',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:58.0) Gecko/20100101 Firefox/58.0'
    }
}

let getSeeds = (query, cbResult) => {
    options.url = `https://www.google.com.br/search?q=${query.replace(/ /g, '+')}`

    request(options, (err, resp, body) => {
        if (err) {
            console.log('Erro: ' + err);
        }

        let urls = []
        const $ = cheerio.load(body)

        $('div.rc h3.r a').each((i, elem) => {
            urls.push(elem.attribs['href'])
        })

        extract_magnet(urls, cbResult)
    })
}

let extract_magnet = (urls, cbResult) => {
    urls.forEach((url) => {
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

            cbResult(links)
        })
    })
}

module.exports = {
    extract_magnet: (urls, query, callback) => {
        if (!urls.length) {
            getSeeds(query, callback)
        } else {
            extract_magnet(urls, callback)
        }
    }
}