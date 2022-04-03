import qs from 'querystring'
import crypto from 'crypto'

export interface VueQuery {
    vue?: boolean
    src?: boolean
    type?: 'script' | 'template' | 'style' | string
    index?: number
    lang?: string
    raw?: boolean
}

export function parseVueRequest(id: string): {
    filename: string
    query: VueQuery
} {
    const [filename, rawQuery] = id.split(`?`, 2)
    const query = qs.parse(rawQuery) as VueQuery
    if (query.vue !== null) {
        query.vue = true
    }
    if (query.src !== null) {
        query.src = true
    }
    if (query.index !== null) {
        query.index = Number(query.index)
    }
    if (query.raw !== null) {
        query.raw = true
    }
    return {
        filename,
        query
    }
}

export function createFileHash() {
    return crypto.createHash('sha256').digest('hex').substr(0, 8)
}
