'use strict'

const serverless = require('serverless-http')
  , bodyParser   = require('body-parser')
  , express      = require('express')
  , app          = express()

// settings
app.use(bodyParser.urlencoded({
  extended: true
}))
app.use(bodyParser.json())

// middle wares
/*
const authMiddleWare = async (req, res, next) => {

  const authorizer = req.context.authorizer
  const username = authorizer.claims ? authorizer.claims.username : null

  const SignedInUser = await GetSignedInUser(username)
  if (!SignedInUser) {
    return res.status(401).json({message: 'Unauthorized'})
  }

  req.SignedInUser = SignedInUser

  next()
}
*/

// routing
const test = require('./handlers/test')

app.get('/articles', test.index)

// error handling
app.use(function (err, req, res, next) {
  const status = err.status ? err.status : 500
    , message  = err.message ? err.message : 'Something wa wrong'
  res.status(status).send(message)
})

app.use((req, res) => {
  res.status(404).json('404', {message: "not found"})
})

// export
app.listen(5757)
module.exports.main = serverless(app, {
  request: (req, event, context) => {
    req.context = event.requestContext;
    req.awsRequestId = context.awsRequestId;
    req.eventAws = event;
    req.contextAws = context;
  }
})