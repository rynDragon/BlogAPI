let config = {}

config.db = {}
config.app = {}
config.errmsg = {}
config.errmsg.db = {}
config.errmsg.app = {}
config.http = {}
config.http.status = {}
config.models = {}
config.return = {}
config.return.object = {}
config.return.status = {}

// Application config
config.app.baseUrl = "http://localhost:3000"

// Database
config.db.connection = 'mongodb://127.0.0.1:27017/test'
config.db.minimum_document = {
    'dateCreated': Date.now(),
    'dateModified': Date.now()
}

// Error statuses
config.return.status.error = 0
config.return.status.success = 1

config.return.object =
    {
        status: ""
    }

// Error messages
config.errmsg.nomessage = ""
config.errmsg.reqfieldnotfound = "a required field was left empty"
config.errmsg.db.creation = "There was a problem creating the document in the database: "
config.errmsg.db.notfound = "The requested document was not found in the database."
config.errmsg.db.update = "There was a problem updating the document in the database: "
config.errmsg.app.username_exists = "The specified username already exists. Please select a new username"
config.errmsg.app.username_notfound = "The specified username was not found in the database."
config.errmsg.app.id_notfound = "The specified id was not found in the database."
config.errmsg.app.id_notvalid = "The specified id is not in a valid format."
config.errmsg.app.params_empty = "The request was made with no parameters to narrow the search."
config.errmsg.app.missing_body = "The required body of the request is missing. Please send a valid message body."
config.errmsg.app.patcherr = "Failed to patch the existing record."
config.errmsg.app.missingbody = "Body was empty or missing."
config.errmsg.app.unauthorized = "supplied apikey was not recognized."


// Models
config.models.apikeys = 'ApiKeys'
config.models.posts = 'test'

// HTTP
config.http.status.ok = 200
config.http.status.created = 201
config.http.status.no_content = 204
config.http.status.unauthorized = 401
config.http.status.forbidden = 403
config.http.status.not_found = 404
config.http.status.bad_request = 400
config.http.status.conflict = 409
config.http.status.internal_server_error = 500

module.exports = config