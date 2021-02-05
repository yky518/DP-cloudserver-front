<template>
    <div id="export">
        <div class="export_title">您导出的文件生成后暂存在平台上，七天后会自动删除。</div>
        <Table :columns="exportRecord" :data="exportList" :height="(500/1080)*screenHeight+'px'">
            <template slot="action">
                <img style="width:16px;" src="../../../assets/img/xiazaiIcon.png" alt="">
            </template>
        </Table>
        <Page style="text-align:center;margin-top:20px;"></Page>
    </div>
</template>

<script>
    export default {
        data() {
            return {
      screenHeight: document.documentElement.clientHeight,
      screenWidth: document.documentElement.clientWidth,
                exportRecord:[
                    {
                        title:'文件名',
                        key:'fileName',
                        minWidth:240,
                    },
                    {
                        title:'类型',
                        key:'type',
                    },
                    {
                        title:'格式',
                        key:'format',
                    },
                    {
                        title:'状态',
                        key:'state',
                    },
                    {
                        title:'创建时间',
                        key:'create_time',
                        minWidth:60,
                    },
                    {
                        title:'操作',
                        slot:'action',
                        align:"center",
                        width:70
                    },
                ],
                exportList:[
                    {
                        fileName:'1761286239356625-20201109134900_res_consume_detail',
                        type:'计费项消费明细',
                        format:'CSV',
                        state:'已过期',
                        create_time:'2020-11-09 13:49:00',
                    },
                    {
                        fileName:'1761286239356625-20201109134900_res_consume_detail',
                        type:'计费项消费明细',
                        format:'CSV',
                        state:'已过期',
                        create_time:'2020-11-09 13:49:00',
                    },
                    {
                        fileName:'1761286239356625-20201109134900_res_consume_detail',
                        type:'计费项消费明细',
                        format:'CSV',
                        state:'已过期',
                        create_time:'2020-11-09 13:49:00',
                    },
                    {
                        fileName:'1761286239356625-20201109134900_res_consume_detail',
                        type:'计费项消费明细',
                        format:'CSV',
                        state:'已过期',
                        create_time:'2020-11-09 13:49:00',
                    },
                    {
                        fileName:'1761286239356625-20201109134900_res_consume_detail',
                        type:'计费项消费明细',
                        format:'CSV',
                        state:'已过期',
                        create_time:'2020-11-09 13:49:00',
                    },
                ]
            }
        },
        created() {
            window.onresize = () => {
      return (() => {
        window.fullHeight = document.documentElement.clientHeight;
        window.fullWidth = document.documentElement.clientWidth;
        this.screenHeight = window.fullHeight; // 高
        this.screenWidth = window.fullWidth; // 宽
      })();
    };
        },
    }
</script>

<style lang="scss" scoped>
#export{
    .export_title{
        font-size: 12px;
        color: #13227A;
        margin-bottom: 20px;
    }
    /deep/ .ivu-table-body{
        font-size: 12px;
    }
}
</style>