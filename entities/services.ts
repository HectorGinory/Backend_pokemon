import _ from 'lodash'

export const tryCatch = (cb, params: any[]) => async (req, res, next) => {
    try {
        const args = params.map(param => _.get(req, param))
        res.json(await cb(...args))
    } catch (e) {
        next(e)
    }
}
