'use strict'

const {User} = require('../model')
  , AWS      = require('aws-sdk')
  , cognito  = new AWS.CognitoIdentityServiceProvider()

const
  getCognitoUser = (username) => {
    return new Promise((resolve, reject) => {
      cognito.adminGetUser({
        UserPoolId: process.env.COGNITO_USER_POOL_ID,
        Username  : username,
      }, function (err, cognito_user) {
        if (err) reject(err)
        else resolve(cognito_user)
      })
    })
  },
  getUserUID     = (cognito_user) => {
    const IdentitiesAttribute = JSON.parse(cognito_user.UserAttributes.find(attr => attr.Name === 'identities').Value)
    let uid = IdentitiesAttribute ? IdentitiesAttribute.find(identity => identity['providerType'] === 'Facebook').userId : null
    return parseInt(uid)
  }

const getMe = async (username) => {
  const cognito_user = await getCognitoUser(username)

  if (!cognito_user) return null

  const uid = getUserUID(cognito_user)

  if (!uid) return null

  return await User.queryOne({uid: {eq: uid}}).exec()
}


module.exports = getMe