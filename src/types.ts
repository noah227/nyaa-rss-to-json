/**
 * nyaa JSON Object parsed from rss using [fast-xml-parser@npm](https://www.npmjs.com/package/fast-xml-parser)
 */
export type TParsedData = {
    rss: {
        channel: {
            title: string
            description: string
            link: string
            "atom:link": string
            item: TParsedDataItem[]
        }
    }
}

type TParsedDataItem = {
    "title": string
    "link": string
    "guid": string
    "pubDate": string
    "nyaa:seeders": number
    "nyaa:leechers": number
    "nyaa:downloads": number
    "nyaa:infoHash": string
    "nyaa:categoryId": string
    "nyaa:category": string
    "nyaa:size": string
    "nyaa:comments": number
    "nyaa:trusted": string
    "nyaa:remake": string
    "description": string
}

/**
 * A formatted nyaa json data
 */
export type TNyaaJsonData = {
    rss: {
        channel: {
            title: string
            description: string
            link: string
            atomLink: string
            items: TNyaaJsonDataItem[]
        }
    }
}

export type TNyaaJsonDataItem = {
    title: string
    link: string
    guid: string
    pubDate: string
    seeders: number
    leechers: number
    downloads: number
    infoHash: string
    categoryId: string
    category: string
    size: string
    comments: number
    trusted: string
    remake: string
    description: string
}

export type TCommonObject = { [index: string]: any }