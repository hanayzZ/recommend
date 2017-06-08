<template>
  <div class="loginBgWrap">
    <div class="loginPoneWrap">
      <div class="loginMainContent">
         <input type="tel" name="loginPhoneNumber" placeholder="请输入您的手机号"
         v-model="loginPhone" :value="loginPhone" />
         <button class="button-getCode" v-on:click="getCode(0)" v-bind:class="{disabled:getCodeBtnStatus[0].disabled}">{{getCodeBtnStatus[0].title}}
         </button>
      </div>
    </div>
    <div class="loginCodeWrap">
      <div class="loginMainContent">
        <input type="tel" name="loginCodeMainNumber" placeholder="请输入验证码" v-model="loginCode" :value="loginCode">
      </div>
    </div>
    <p class="voiceVertification">收不到验证码？<span v-on:click="getCode(1)"
    v-bind:class="{disabled: getCodeBtnStatus[1].disabled}">{{ getCOdeBtnStatus[1].title }}</span>
    </p>
    <button class="button-login" @click="logonSub()">登录</button>
  </div>
</template>
<script>
  export default{
    
  }
</script>