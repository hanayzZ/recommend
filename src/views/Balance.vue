<template>
  <ul id="balance-list">
    <li v-for="(item,index) in items">
    <router-link v-bind:class="[item.className]" :to="{ name: item.itemLinkName}">
    <i class="ic"></i>
    <span class="balanceTitle">{{ item.title }}</span>
    <span class="balanceValue">{{ (item.itemValue * 1).toFixed(2) }}</span>
    <i class="row"></i>
    </router-link>
    </li>  
  </ul>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  data () {
    return {
      webTitle: '推荐返现'
    }
  },
  computed: {
    ...mapGetters({
      items: 'getBalanceItems'
    })
  }
}
</script>
