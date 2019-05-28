const router = require('express').Router()

const postsController = require('../controlers/posts-controller')

const catchErrors = (fn) => {
  return function(req, res, next) {
    return fn(req, res, next).catch(next)
  }
}

/**
 * This middleware function is a placeholder for proper authorization
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const checkToken = (req, res, next) => {
  if(!req.headers['authorization']) {
    return res.sendStatus(401)
  }

  if(req.headers['authorization'] == 'true') {
    res.locals.authorization = true
    next()
  }
  else {
    res.locals.authorization = false
    res.sendStatus(401)
  }
}

router.post('/', checkToken, catchErrors(postsController.post))
router.get('/', catchErrors(postsController.getRecent))
router.get('/id/:id', catchErrors(postsController.getById))
router.get('/title/:title', catchErrors(postsController.getByTitle))
router.patch('/', checkToken, catchErrors(postsController.patch))
router.delete('/id/:id', catchErrors(postsController.delete))

module.exports = router