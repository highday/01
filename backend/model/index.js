const dynamoose = require('dynamoose')

if (process.env.IS_OFFLINE) {

  dynamoose.local('http://localhost:3939')

} else {

  // dynamoose.AWS.config.update({
  //   accessKeyId    : '',
  //   secretAccessKey: '',
  //   region         : ''
  // })

}

const User = dynamoose.model('users', {
  id        : String,
  name      : String,
  email     : {
    type : String,
    index: {
      global : true,
      name   : 'email-index',
      project: true,
    },
  },
  uid       : {
    type : Number,
    index: {
      global : true,
      name   : 'uid-index',
      project: true,
    },
  },
  image     : String,
  created_at: Date,
  updated_at: Date
})

module.exports = {User}