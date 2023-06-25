# NyaaRssToJson

Convert Nyaa rss xml to json.

## Usage

### From url

``` typescript
import nyaaRssToJson, {TNyaaJsonData} from "nyaa-rss-to-json";

nyaaRssToJson.fromUrl("https://nyaa.si/?page=rss").then((data: TNyaaJsonData) => {
    // ...
}).catch(e => console.error(e))

```

### From content

``` typescript
const s = "..." // nyaa rss xml content

nyaaRssToJson.fromContent(s).then((data: TNyaaJsonData) => {
    // ...
}).catch(e => console.error(e))
```

### Magnet link

```typescript
// nyaaRssToJson.utils.buildMagnetLink
export declare const buildMagnetLink: (item: TNyaaJsonDataItem, trList?: string[]) => string;
```

## Types

### TNyaaJsonData

```typescript
type TNyaaJsonData = {
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
```

### TNyaaJsonDataItem

```typescript
type TNyaaJsonDataItem = {
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
```
