const nyaaRssToJson = require("../dist/index.cjs")
const fs = require("fs")
const path = require("path")

const testFromUrl = () => {
    const argv = require("minimist")(process.argv.slice(2))
    // 允许命令行传入指定url地址
    const {u} = argv
    const port = 9000
    const rssUrl = u || `http://127.0.0.1:${port}/nyaa.rss`
    const server = require("http").createServer((req, res) => {
        fs.readFile(path.resolve(__dirname, `.${req.url}`), (err, data) => {
            res.end(err || data)
        })
    })
    server.listen(port, "127.0.0.1", () => {
        nyaaRssToJson.fromUrl(rssUrl).then(testLogResult).catch(e => console.error(e)).finally(() => {
            server.close()
        })
    })
}

const testFromContent = () => {
    fs.readFile(path.resolve(__dirname, "nyaa.rss"), {encoding: "utf8"}, (err, data) => {
        if (err) return console.error(err)
        if (data) {
            nyaaRssToJson.fromContent(data).then(testLogResult)
        }
    })
}

const testLogResult = (data) => {
    console.log(data)
    // test file is static, so length is ensured!
    console.log(data.rss.channel.items[0])
    // fs.writeFile(path.resolve(__dirname, "nyaa.json"), JSON.stringify(data, null, 4), () =>{})
}

const test = () => {
    const argv = require("minimist")(process.argv.slice(2))
    const {t} = argv
    switch (t) {
        case "url":
            testFromUrl()
            break
        case "content":
            testFromContent()
            break
        default:
        // ..
    }
}
test()
// testFromContent()
// testFromUrl()
