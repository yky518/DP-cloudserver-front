<template>
  <div id="invoice">
    <div class="invoice_tip">如有开票需求，请与您的销售人员联系。</div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
#invoice {
    text-align: center;
  .invoice_tip {
    position: absolute;
    top: 50%;
    transform: translateX(-50%);
    display: inline-block;
    color: #999999;
    font-size: 20px;
  }
}
</style>