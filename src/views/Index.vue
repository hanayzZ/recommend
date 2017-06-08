<template>
  <div id="home">
    <div class="mainBody">
      <p class="title">{{webTitle}}</p>
      <div class="title-line"></div>
      <p class="title_2">可获得8元现金返现</p>
      <img class="img-mainBody" src="../assets/images/home.png">
      <span class="btn-rule" v-on:click="showRuleFun()">活动规则</span>
    </div>
    <div class="button-wrap">
      <button v-on:click="showQrCodeFun()">二维码分享</button>
      <button>邀请好友</button>
    </div>
    <p class="btn-balance">
      推荐返现，   <router-link :to="{ name: 'Balance'}" class="to-balance">查看余额</router-link>
    </p>
    <div v-if="showRule" class="rule-popup index-popup">
      <div class="rule-wrap">
        <img class="rule-title" src="../assets/images/rule_title.png">
        <div class="btn-rule-close" v-on:click="showRule = false"></div>
        <div class="rule-content">
          <p>1.推荐鲜花新用户下单，您可获得元返现；您推荐的用户再推荐鲜花新用户下单，您可获元返现。</p>
          <p>2.该活动仅限泰笛鲜花商品推荐返现；</p>
          <p>3.被推荐用户订单签收，该单的返现金额将转入推荐人的可提现金额；</p>
          <p>4.被推荐的新用户可获得元新手代金券，推广不停，优惠不止！</p>
        </div>
      </div>
    </div>
    <div v-if="showQrCode" class="qrCode-popup index-popup">
      <div class="showQrCode-wrap">
        <img src="../assets/images/\index_qrcode_pop.png">
        <div class="btn-qrCode-close" v-on:click="showQrCode = false"></div>
        <div class="qrCode-wrap">
          <div>
           <canvas />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      webTitle: '推荐鲜花新用户下单',
      showRule: false,
      showQrCode: false
    }
  },
  methods: {
    itmeClick (itemName) {
      let vm = this
      switch (itemName) {
        case 'rule':
          vm.showRuleFun()
          break
        default:
          break
      }
    },
    showRuleFun () {
      this.showRule = true
    },
    showQrCodeFun () {
      this.showQrCode = true
    },
    GetQueryString (name) {
      let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
      let r = window.location.search.substr(1).match(reg)
      if (r !== null) {
        return decodeURI(r[2])
      } else {
        return null
      }
    }
  }
}
</script>
