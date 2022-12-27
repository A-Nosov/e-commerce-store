const tokenService = require('../services/token.service')

module.exports = function (isAdmin) {
    return function (req, res, next) {
        if (req.method === 'OPTIONS') {
            return next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(401).json({ message: 'Unauthorized' })
            }

            const data = tokenService.validateAccess(token)

            if (data.isAdmin !== isAdmin) {
                return res.status(403).json({ message: 'Forbidden' })
            }

            req.user = data

            next()
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
}
