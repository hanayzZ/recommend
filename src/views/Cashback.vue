<template>
  <div id="page-cashback">
  <div class="dateSelect-popup" v-if="showDatePicker">
    <div class="dateSelect-wrap">
      <p class="dateSelect-title">选择日期</p>
      <p class="dateSelect-svalue">{{ SelectDateMessage }}</p>
      <div class="dateSelect-body">
        <mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
      </div>
      <div class="dateSelect-sub">
        <button class="dateSelect-sub-cancel" v-on:click="showDatePicker = false">取消</button>
        <button class="dateSelect-sub-confirm" v-on:click="confirmDatePick()">确认</button>
      </div>
    </div>
  </div>
  <div class="select-wrap">
    <span>日期</span>
    <input name="startDate" v-model="startDate" placeholder="开始日期" readonly="readonly" v-on:click="showDatePicker = true; nowSelectDateType = 'start'"/>
    <div class="dataMiddleLine"></div>
    <input class="endDate" v-model="endDate" placeholder="结束日期" readonly="readonly" v-on:click="showDatePicker = true; nowSelectDateType = 'end'"/>
    <button class="btn-search" v-on:click="searchByDate()">查询</button>
    <button class="btn-searchAll">全部</button>
  </div>
  <div class="cashback-title-wrap">
    <span>共计金额</span>
    <span class="allCashback">0.00元</span>
  </div>
  <div class="mint-loadmore">
   
  </div>
  </div>
</template>
<script>
/* import { mapGetters } from 'vuex' */
import { Picker } from 'mint-ui'
export default {
  data () {
    return {
      webTitle: '历史返现',
      showDatePicker: false,
      SelectDateMessage: '',
      selectDate: '',
      startDate: '',
      endDate: '',
      nowSelectDateType: '',
      slots: [
        {
          flex: 1,
          values: ['2014年', '2015年', '2016年'],
          defaultIndex: 0,
          className: 'slot1',
          textAlign: 'right'
        }, {
          flex: 1,
          values: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
          defaultIndex: 0,
          className: 'slot2',
          textAlign: 'center'
        }, {
          flex: 1,
          values: ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日'],
          defaultIndex: 0,
          className: 'slot3',
          textAlign: 'left'
        }
      ],
      weeks: [
        '周日',
        '周一',
        '周二',
        '周三',
        '周四',
        '周五',
        '周六'
      ]
    }
  },
  created () {
    this.initPicker()
  },
  components: {
    'mt-picker': Picker
  },
  methods: {
    initPicker () {
      let nowDate = new Date()
      let nowYear = nowDate.getFullYear()
      let nowMonth = nowDate.getMonth() + 1
      let nowDay = nowDate.getDate()
      let yearValues = []
      let defaultYearIndex = -1
      for (let i = 2014; i <= nowYear; i++) {
        let yearItem = i + '年'
        yearValues.push(yearItem)
        defaultYearIndex++
      }
      this.slots[0].values = yearValues
      this.slots[0].defaultIndex = defaultYearIndex
      this.slots[1].defaultIndex = nowMonth - 1
      this.getDaysByMon(nowYear, nowMonth)
      this.slots[2].defaultIndex = nowDay - 1
      this.SelectDateMessage = nowYear + '年' + nowMonth + '月' + nowDay + '日' + '  ' + this.weeks[nowDate.getDay()]
      this.selectDate = nowYear + '-' + nowMonth + '-' + nowDay
      /* console.log(this.slots[0]['values'][defaultYearIndex]) */
    },
    onValuesChange (picker, values) {
      if (values[0] !== undefined && values[1] !== undefined && values[2] !== undefined) {
        var yyyy = values[0].substring(0, values[0].length - 1)
        console.log(yyyy)
        var mth = values[1].substring(0, values[1].length - 1)
        var dd = values[2].substring(0, values[2].length - 1)
        let d = new Date(yyyy, (mth - 1), dd)
        this.SelectDateMessage = values[0] + values[1] + values[2] + '  ' + this.weeks[d.getDay()]
        this.selectDate = yyyy + '-' + mth + '-' + dd
        this.getDaysByMon(yyyy, mth)
        let defaultYearIndex = 0
        for (let i = 0; i < this.slots[0]['values'].length; i++) {
          if (this.slots[0]['values'][i] === values[0]) {
            defaultYearIndex = i
          }
        }
        this.slots[0].defaultIndex = defaultYearIndex
        this.slots[1].defaultIndex = mth - 1
        this.slots[2].defaultIndex = dd - 1
      }
    },
    confirmDatePick () {
      if (this.nowSelectDateType === 'start') {
        this.startDate = this.selectDate
      } else {
        this.endDate = this.selectDate
      }
      this.showDatePicker = false
    },
    getDaysByMon (year, mon) {
      year = year * 1
      mon = mon * 1
      let nowDays = []
      let days = 31
      if (mon === 1 || mon === 3 || mon === 5 || mon === 7 || mon === 8 || mon === 10 || mon === 12) {
        days = 31
      } else if (mon === 4 || mon === 6 || mon === 9 || mon === 11) {
        days = 30
      } else if (mon === 2) {
        days = 28
        if (year % 4 === 0 && year % 100 !== 0 || year % 400 === 0) {
          days = 29
        }
      }
      nowDays = []
      for (let i = 1; i <= days; i++) {
        let daysItem = i + '日'
        nowDays.push(daysItem)
      }
      this.slots[2].values = nowDays
    },
    searchByDate () {

    }
  }
 /* computed: {
    ...mapGetters({
      items: 'getCenterItems'
    })
  } */
}
</script>
