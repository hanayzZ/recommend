import * as getters from './getters'
import * as actions from './actions'
import mutations from './mutations'

const state = {
  balanceItems: [
    {title: '可提现余额（元）', className: 'cc', itemLinkName: 'Tixian', itemValue: '0'},
    {title: '历史返现（元）', className: 'hbc', itemLinkName: 'Cashback', itemValue: '0'},
    {title: '历史提现（元）', className: 'hsc', itemLinkName: 'Withdraw', itemValue: '0'}
  ]
}

export default {
  state,
  getters,
  actions,
  mutations
}
