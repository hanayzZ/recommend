
import vue from 'vue'
const _post = ({ commit }, params) => {
  let _url = 'http://192.168.40.231/2.2.3/WebPortalProj/dist/action/api.php'
  vue.http.options.emulateJSON = true
  return vue.http.post(_url, params, {headers: {
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }})
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        let resData = res.data
        if (typeof (resData) === 'string') {
          resData = JSON.parse(res.data)
        }
        return resData
      }
      return Promise.reject(new Error(res.status))
    })
}
/*
* 修改页面title
*/
export const setPageTitle = ({commit}, title) => {
  setTimeout(function () {
    // 利用iframe的onload事件刷新页面
    document.title = title
    let iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    iframe.style.width = '1px'
    iframe.style.height = '1px'
    iframe.src = 'https://m.24tidy.com/favicon.ico'
    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe)
      }, 10)
    }
    document.body.appendChild(iframe)
  }, 10)
}
/**
*  获取账号信息
*/
export const getAccountInfoAction = ({commit}) => {
  let params = {
    action: 'RcAccount'
  }
  return _post({ commit }, params)
    .then((json) => {
      if (json.code === '1') {
        let data = json.data
        commit('SET_ACCOUNT_INFO', data)
      }
      return json
    })
}
/**
* 绑定支付宝账号
*/
export const bindThirdPartyPay = ({commit}, {realName, paymentAccount}) => {
  let params = {
    action: 'bindThirdPartyPay',
    thirdParty: 'alipay',
    realName: realName,
    paymentAccount: paymentAccount
  }
  return _post({ commit }, params)
    .then((json) => {
      return json
    })
}
/**
* 余额提现
*/
export const tixianAction = ({commit}, amount) => {
  let params = {
    action: 'RCWithdraw',
    amount: amount
  }
  return _post({ commit }, params)
    .then((json) => {
      if (json.code === '1') {
        commit('CHANGE_ACCOUNT_INFO_WITHDRAW', amount)
      }
      return json
    })
}
