const express = require('express')
const Article = require('../models/Article')
const auth = require('../middleware/auth.middleware')

const router = express.Router({mergeParams: true})

router.get('/', async (req, res) => {
    try {
        const list = await Article.find()
        res.status(200).send(list)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

router.post('/articles/create', auth, async (req, res) => {
    const {title, description, body} = req.body
    try {
        const newArticle = await Article.create({
            title, description, body
        })
        res.status(201).send(newArticle)
    } catch (e) {
        res.status(500).json({
            message: 'На сервере произошла ошибка. Попробуйте позже'
        })
    }
})

router.delete('/articles/delete/:id', auth, async (req, res) => {
    try {
        const {id} = req.params
        const removedArticle = await Article.findById(id)

        if (removedArticle._id.toString()) {
            await removedArticle.remove()
            return res.status(200).send(null)
        } else {
            res.status(401).json({message: 'Unauthorized'})
        }
    } catch (e) {
        res.status(500).json({
            message: 'Delete article failed'
        })
    }
})

module.exports = router