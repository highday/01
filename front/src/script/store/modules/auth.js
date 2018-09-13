import {Auth}           from "aws-amplify"
import {GetCognitoAuth} from "../../lib/aws_auth"
import API              from '../../lib/api'

export default {

  namespaced: true,

  state: {
    jwtToken: null,
    isAuth  : false,
    me      : null
  },

  getters: {
    jwtToken: state => state.jwtToken,
    isAuth  : state => state.isAuth,
    setMe   : state => state.me
  },

  mutations: {
    setJwtToken(state, payload) {
      state.jwtToken = payload
      API.setJwtToke(payload)
    },
    setAuth(state, bool) {
      state.isAuth = bool
    },
    setMe(state, payload) {
      state.me = payload
    }
  },

  actions: {

    initialize({commit}) {
      commit('setJwtToken', null)
      commit('setAuth', false)
      commit('setMe', null)
    },

    signIn({dispatch, commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          await dispatch('_getSession')
          const info = await dispatch('getAuthInfo')
          commit('setJwtToken', info.currentSession.accessToken.jwtToken)
          await dispatch('_fetchMe')
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },

    signInCallback({dispatch, commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          await dispatch('_parseCognitoWebResponse')
          const info = await dispatch('getAuthInfo')
          console.log(info)
          commit('setJwtToken', info.currentSession.accessToken.jwtToken)
          await dispatch('_fetchMe')
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },

    autoSignIn({dispatch, commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          await dispatch('_getSession')
          const info = await dispatch('getAuthInfo')
          console.log(info.currentUserInfo)
          commit('setJwtToken', info.currentSession.accessToken.jwtToken)
          await dispatch('_fetchMe')
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },

    async signOut({dispatch, commit}) {
      return new Promise(async (resolve, reject) => {
        try {
          await dispatch('_signOut')
          commit('setJwtToken', null)
          resolve()
        } catch (e) {
          reject(e)
        }
      })
    },

    _getSession() {
      return new Promise((resolve, reject) => {
        const auth = GetCognitoAuth('Facebook', session => resolve(session), err => reject(err))
        auth.getSession()
      })
    },

    _parseCognitoWebResponse() {
      return new Promise((resolve, reject) => {
        const auth = GetCognitoAuth(null, session => resolve(session), err => reject(err))
        auth.parseCognitoWebResponse(window.location.href)
      })
    },

    _signOut() {
      return new Promise((resolve, reject) => {
        const auth = GetCognitoAuth(null, session => resolve(session), err => reject(err))
        auth.signOut()
      })
    },

    _fetchMe({commit}) {
      return new Promise(async (resolve, reject) => {
        const me = await API.me()
        if (me.id) {
          commit('setMe', me)
          commit('setAuth', true)
        } else {
          commit('setMe', null)
          commit('setAuth', false)
        }
        resolve()
      })
    },

    async getAuthInfo() {
      const info = {
        currentAuthenticatedUser: null,
        currentCredentials      : null,
        currentSession          : null,
        currentUserCredentials  : null,
        currentUserPoolUser     : null,
        currentUserInfo         : null
      };

      // try {
      //   info.currentUserPoolUser = await Auth.currentUserPoolUser();
      // } catch (e) {
      //   console.log(e);
      // }
      //
      // try {
      //   info.currentAuthenticatedUser = await Auth.currentAuthenticatedUser();
      // } catch (e) {
      //   console.log(e);
      // }

      try {
        info.currentSession = await Auth.currentSession();
      } catch (e) {
        console.log(e);
      }

      try {
        info.currentUserInfo = await Auth.currentUserInfo();
      } catch (e) {
        console.log(e);
      }

      return info;
    }
  }
}