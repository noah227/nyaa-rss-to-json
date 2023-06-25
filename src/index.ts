import axios from "axios";
import {XMLParser} from "fast-xml-parser";
import {TCommonObject, TNyaaJsonData, TNyaaJsonDataItem, TParsedData} from "./types";
import * as _utils from "./utils"


/**
 * remove *: and string before it* from the key.
 * @param data
 */
const _deColon = (data: TCommonObject) => {
    return Object.entries(data).reduce((_, [k, v]) => {
        if (k.indexOf(":") >= 0) k = k.replace(/\w+:/, "")
        _[k] = v
        return _
    }, {} as TCommonObject)
}

const _parseJsonData = (data: TParsedData): TNyaaJsonData => {
    const {title, description, link, item: items, ...res} = data.rss.channel
    const atomLink = res["atom:link"]
    return {
        rss: {
            channel: {
                title, description, link,
                atomLink,
                items: items.map(item => _deColon(item) as TNyaaJsonDataItem)
            }
        }
    }
}

/**
 * Parse from url.
 * @example [https://nyaa.si/?page=rss](https://nyaa.si/?page=rss)
 * @param rssUrl
 */
const _fromUrl = (rssUrl: string): Promise<TNyaaJsonData> => new Promise((resolve, reject) => {
    axios.get(rssUrl).then(res => {
        if (res.data) {
            const parser = new XMLParser()
            const data = parser.parse(res.data)
            resolve(_parseJsonData(data))
        }
    }).catch(reject)
})

/**
 * Convert from rss xml content, raw text string.
 * @example Content like {
 *     rss: {
 *         channel: {title: "", ...}
 *     }
 * }
 * @param rssContent
 */
const _fromContent = (rssContent: string): Promise<TNyaaJsonData> => new Promise((resolve, reject) => {
    const parser = new XMLParser()
    const data = parser.parse(rssContent)
    resolve(_parseJsonData(data))
})

export * from "./types"
export default {
    utils: _utils,
    fromUrl: _fromUrl,
    fromContent: _fromContent
}

