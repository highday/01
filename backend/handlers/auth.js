const {User} = require('../model')
  , AWS      = require('aws-sdk')
  , cognito  = new AWS.CognitoIdentityServiceProvider()
  , md5      = require('md5')

const
  getCognitoUser   = username => {
    return new Promise((resolve, reject) => {
      cognito.adminGetUser({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username  : username,
      }, function (err, cognito_user) {
        if (err) reject(err)
        else resolve(cognito_user)
      })
    })
  }

  , getUserUID     = cognito_user => {
    const IdentitiesAttribute = JSON.parse(cognito_user.UserAttributes.find(attr => attr.Name === 'identities').Value)
    let uid = IdentitiesAttribute ? IdentitiesAttribute.find(identity => identity['providerType'] === 'Facebook').userId : null
    return parseInt(uid)
  }

  , getUserName    = cognito_user => {
    return cognito_user.UserAttributes.find(attr => attr.Name === 'name').Value
  }

  , getUserPicture = cognito_user => {
  console.log(cognito_user)
    return '' // cognito_user.UserAttributes.find(attr => attr.Name === 'picture').Value
  }

  , getUserEmail   = cognito_user => {
    return cognito_user.UserAttributes.find(attr => attr.Name === 'email').Value
  }

module.exports = {

  /**
   *
   * @param req
   * @param res
   * @param next
   */
  me: async (req, res, next) => {

    try {
      const authorizer = req.context.authorizer

      const sub    = authorizer.claims ? authorizer.claims.sub : null
        , username = authorizer.claims ? authorizer.claims.username : null

      if (!sub) return res.status(401).json({message: 'Unauthorized'})

      const cognito_user = await getCognitoUser(username)

      if (!cognito_user) return res.status(401).json({message: 'Unauthorized'})

      const uid = getUserUID(cognito_user)

      let user

      const date = (new Date()).getTime()

      if (uid) {
        user = await User.queryOne({uid: {eq: uid}}).exec()
      }

      if (!user) {
        user = new User()
        user.id = md5((new Date()).getTime())
        user.created_at = date
      }

      user.uid = uid
      user.email = getUserEmail(cognito_user)
      user.name = getUserName(cognito_user)
      user.image = getUserPicture(cognito_user)
      user.updated_at = date

      await user.save()

      res.json(user)

    } catch (e) {
      console.error(e)
      next(e)
    }
  }
}