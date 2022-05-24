const express = require('express')
const router = express.Router({ mergeParams: true })

router.use('/', require('./content.routes'))
router.use('/auth', require('./auth.routes'))

module.exports = router