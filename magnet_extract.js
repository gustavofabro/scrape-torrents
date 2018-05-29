const seed_spider = require('./seed_spider')

let urls = []
let query = 'Thor download torrent'

seed_spider.extract_magnet(urls, query, links => {
    console.log(links)
})