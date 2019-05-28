const config = require('../helpers/config-helper')

const postModel = require('../models/posts-model')

//POST - CREATE
/**
 * INCOMPLETE
 * POST - CREATE
 * Collection - 201 (Created)
 * Specific Document - 404 (Not Found), 409 (Conflict)
 */
exports.post = async (req, res) => {
    const post = await postModel.findOne({
        $or: [
            {name: req.body.name},
            {id: req.body.id}
        ]
    }).exec()
    if (post) {
        res.sendStatus(config.http.status.conflict)
    }
    else {
        const post = new postModel()

        //post.name = req.body.name
        // ...

        await post.save()

        res.location(config.app.baseUrl + '/posts/id/' + post._id)

        res.status(config.http.status.created).json(post)
    }
}

/**
 * WORKS
 * GET - READ
 * Collection - 200 (OK)
 * Specific Document - 200 (OK), 404 (Not Found)
 */
exports.getById = async (req, res) => {
    const posts = await postModel.findOne({_id: req.params.id}).exec()
    if (posts)
        res.status(config.http.status.ok).json(posts)
    else
        res.sendStatus(config.http.status.no_content)
}

/**
 * WORKS
 * GET - READ
 * Collection - 200 (OK)
 * Specific Document - 200 (OK), 404 (Not Found)
 */
exports.getByTitle = async (req, res) => {
    const posts = await postModel.find({title: req.params.title},{title: 1, content: 1})
        .sort({date_created:-1})
        .limit(req.query.ipp ? parseInt(req.query.ipp) : 10)
        .skip(req.query.page ? parseInt(req.query.page) * parseInt(req.query.ipp) - parseInt(req.query.ipp) : 0)
        .exec()
    if (posts && posts.length)
        res.status(config.http.status.ok).json(posts)
    else
        res.sendStatus(config.http.status.no_content)
}

/**
 * WORKS
 * GET - READ
 * Collection - 200 (OK)
 * Specific Document - 200 (OK), 404 (Not Found)
 */
exports.getRecent = async (req, res) => {
    const posts = await postModel.find({},{title: 1, content: 1})
        .sort({date_created:-1})
        .limit(req.query.ipp ? parseInt(req.query.ipp) : 10)
        .skip(req.query.page ? parseInt(req.query.page) * parseInt(req.query.ipp) - parseInt(req.query.ipp) : 0)
        .exec()
    if (posts && posts.length)
        res.status(config.http.status.ok).json(posts)
    else
        res.sendStatus(config.http.status.no_content)
}

/**
 * INCOMPLETE
 * PATCH - UPDATE/MODIFY
 * Collection - 405 (Method Not Allowed)
 * Specific Document - 200 (OK), 204 (No Content), 404 (Not Found)
 */
exports.patch = async (req, res) => {
    const posts = await postModel.findOne({_id: req.params.id}).exec()

    posts.title
    posts.date_update = new Date.toISOString()
    // ...OTHER UPDATABLE FIELDS

    if (posts)
        res.status(config.http.status.ok).json(posts)
    else
        res.sendStatus(config.http.status.no_content)
}

/**
 * WORKS
 * DELETE
 * Collection - 405 (Method Not Allowed)
 * Specific Document - 200 (OK), 404 (Not Found)
 */
exports.delete = async (req, res) => {
    const posts = await postModel.findOneAndDelete({_id: req.params.id}).exec()
    if(posts)
        res.status(config.http.status.ok).json(posts)
    else
        res.sendStatus(config.http.status.not_found)
}