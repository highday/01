const aws = {
  Region        : 'ap-northeast-1',
  UserPoolId    : 'ap-northeast-1_xxxxxx',
  ClientId      : 'xxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  AppWebDomain  : 'xxxxx.auth.ap-northeast-1.amazoncognito.com',
  SignInUri     : 'http://localhost:4545/signin/callback',
  SignOutUri    : 'http://localhost:4545/',
  Scopes        : ['profile', 'email', 'openid', 'aws.cognito.signin.user.admin', 'phone']
}

const gateway = {
  InvokeUrl        : 'http://localhost:5757',
  Region           : 'localhost',
  Stage            : '',
  systemClockOffset: 0,
  retries          : 0
}

export {aws, gateway}

