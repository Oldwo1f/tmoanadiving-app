<template>
  <div class="contentInside">
      <BlockPass :date="$dayjs( $calculateDateExpi($auth.user,$dayjs)).format('DD MMMM YYYY')" :credit="$calculateCredit($auth.user,$dayjs)"/>
      <BlockQrcode :qrcodeurl="$auth.user.qrcode"/>
      <BlockIdClient :idclient="$auth.user.idclient" />

  </div>
</template>

<script setup>
  const { $store } = useNuxtApp()
  const { state } = $store



 
</script>

<style scoped lang="less">

@import '~static/less/variable.less';
.contentInside{
      top: 0;
      bottom: 0;
      
        padding:40px 0px 50px 0px;
            background: url('assets/images/bg2.png') no-repeat;
            background-size: cover;
}


</style>