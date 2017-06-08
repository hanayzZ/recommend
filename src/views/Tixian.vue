<template>
  <div id="page-tixian">
    <div class="page-tixian-content">
      <div class="account-wrap">
        <div class="account-item">
          <span class="account-item-title">姓名</span>
          <input type="text" name="accountName" placeholder="需要和您的支付宝账号姓名一致" v-model="alipayInfo['realName']"> v-bind:readonly="accountInputReadonly"
          <span class="account-item-tag"><i>*</i>必填</span>
        </div>
        <div class="account-item">
          <span class="account-item-title">支付宝账号</span>
          <input type="text" name="accountNum" placeholder="无需密码，请放心填写" v-model="alipayInfo['paymentAccount']" v-bind:readonly="accountInputReadonly">
          <span class="account-item-tag"><i>*</i>必填</span>
        </div>
      </div>  
      <div class="cash-wrap">
        <p>提现金额</p>
        <div class="cash-input-wrap">
          <span>¥</span>
          <input type="number" name="cashNum" placeholder="0" v-model="cashNum">
        </div>
      </div>
      <div class="canCash-show">
        <span>可提现金额$nbsp;$nbsp;{{ items[0]['itemValue'] }}</span>
      </div>
      <div class="cash-split-line">
      </div>
      <div class="backCash-rule-wrap">
        <div class="backCash-rule-title">
        <i>*</i>
        <span>提现规则</span>
        </div>
        <div class="backCash-rule-content">
          <p>1.仅支持支付宝提现；</p> 
          <p>2.提现时间为每周周二，每天限提现1次，每次提现单位为1元，不支持小数；</p> 
          <p>3.提现请求会在3个工作日完成审核并提交打款机构；</p> 
          <p>4.姓名必须与支付宝账户绑定的姓名相同；</p> 
          <p>5.提现账户姓名有误、外籍人士提现等相关问题，请联系客服4008-123-923。</p>
        </div>
      </div>      
    </div>
    <button class="btn-tixian" v-on:click="subApplication()">保存</button>  
  </div>
</template>
<script>
import { mapGetters, mapActions } from 'vuex'
import { Toast } from 'mint-ui'
export default {
  data () {
    return {
      webTitle: '余额提现',
      accountName: '',
      accountNum: '',
      cashNum: '',
      alipayInfo: {
        realName: '',
        paymentAccount: ''
      },
      accountInputReadonly: true
    }
  },
  computed: {
    ...mapGetters({
      items: 'getBalanceItems'
    })
  },
  created () {
    let vm = this
    this.setPageTitle(this.webTitle)
    this.getAccountInfoAction().then(function (res) {
      if (res.code === 1) {
        if (res.data.alipay !== '' && res.data.alipay.realName !== '' && res.data.alipay.paymentAccount !== '') {
          vm.alipayInfo = res.data.alipay
          vm.accountInputReadonly = true
        } else {
          vm.accountInputReadonly = false
        }
      } else {
        vm.accountInputReadonly = false
      }
    }, function () {
      vm.accountInputReadonly = false
    })
  },
  components: {

  },
  methods: {
    subApplication () {
      let date = new Date()
      if (date.getDay() !== 2) {
        Toast('每周二才能提现')
        return false
      }
      if (this.accountInputReadonly === false) {
        if (this.alipayInfo['realName'] === '') {
          Toast('账户姓名不可为空')
          return false
        }
        if (this.alipayInfo['paymentAccount'] === '') {
          Toast('支付宝账号不可为空')
          return false
        }
        let vm = this
        this.bindThirdPartyPay(this.alipayInfo).then(function (res) {
          if (res.code === '1') {
            vm.goTixian()
          } else {
            Toast(res.message)
          }
        }, function (error) {
          console.log('出错了', error)
        })
      } else {
        this.goTixian()
      }
    },
    goTixian () {
      if (this.cashNum !== '' && !isNaN(this.cashNum)) {
        let validNum = this.items[0]['itemValue'] * 1
        if (this.cashNum > validNum) {
          Toast('申请提现金额不可超过您的可提现金额')
          return false
        } else if (this.cashNum < 1) {
          Toast('提现金额不可小于1元')
        } else if (!(this.cashNum + '').match('^\\d*?$')) {
          Toast('只能输入数字，不支持小数')
          return false
        }
      } else {
        Toast('提现金额输入有误，请重新输入')
        return false
      }
      this.tixianAction(this.cashNum).then(function (res) {
        Toast(res.message)
      }, function (error) {
        console.error('出错了', error)
      })
    },
    ...mapActions([
      'setPageTitle',
      'getAccountInfoAction',
      'tixianAction',
      'bindThirdPartyPay'
    ])
  }
}
</script>
