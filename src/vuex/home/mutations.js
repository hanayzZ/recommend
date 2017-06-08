
import {
  SET_ACCOUNT_INFO,
  CHANGE_ACCOUNT_INFO_WITHDRAW}
  from './mutation-type'
const mutations = {
  // 获取账户信息
  [SET_ACCOUNT_INFO] (state, data) {
    state.balanceItems[0]['itemValue'] = data.totalCount
    state.balanceItems[1]['itemValue'] = data.returnCount
    state.balanceItems[2]['itemValue'] = data.withdrawCount
  },
  // 修改提现金额
  [CHANGE_ACCOUNT_INFO_WITHDRAW] (state, data) {
    state.balanceItems[2]['itemValue'] = state.balanceItems[2]['itemValue'] - data
  }
}
export default mutations
