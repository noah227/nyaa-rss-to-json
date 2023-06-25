import {TNyaaJsonDataItem} from "./types";

/**
 * Build magnet link from nyaa item data.
 */
export const buildMagnetLink = (item: TNyaaJsonDataItem, trList?: string[]) => {
    const magnetTpl = `magnet:?xt=@xt&dn=@dn@trs`
    const {title, infoHash} = item
    const xt = `urn:btih:${infoHash}`
    const dn = title
    trList = trList || getDefaultTrList()
    let trs = trList.reduce((trs, address) => {
        trs += `&tr=${address}`
        return trs
    }, "" as string)
    return magnetTpl.replace("@xt", xt).replace("@dn", dn).replace("@trs", trs)
}

const getDefaultTrList = () => {
    return [
        "http://nyaa.tracker.wf:7777/announce",
        "udp://open.stealth.si:80/announce",
        "udp://tracker.opentrackr.org:1337/announce",
        "udp://exodus.desync.com:6969/announce",
        "udp://tracker.torrent.eu.org:451/announce"
    ]
}