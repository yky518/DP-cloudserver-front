<template>
  <div id="help">
    <Card>
      <h2>CloudServer：DeepMD-Kit</h2>
      <h3>准备输入文件</h3>
      <ol>
        <li>选择：算法 --> DeePMD-kit</li>
        <li>机器选择，推荐使用默认值即可</li>
        <li>填写model参数部分，以H2O为例</li>
        <li>填写learning_rate和loss部分，推荐选择默认值即可</li>
        <li>填写training部分，
          注意，上传的训练初始数据压缩包需要包含data目录，
          并把system放在里边，已经默认勾选了multi_system，无需改动systems，然后填写stop_batch，</li>

        <li>检查生成的json是否正确</li>
        <li>点击确定，向下滑动页面，点击Upload Files上传zip格式的数据压缩包，等待读条完成后点击提交，查看任务状态</li>
      </ol>
    </Card>
    <Card>
      <h2>CloudServer：lammps使用文档</h2>
      <ol>
        <li>选择算法-lammps
        <li> 选择**机型**后点击确定
        <li>点击Upload Files上传zip压缩包，势函数文件graph*非必选
          <p>注意，input.lammps的命名是唯一的，其中指定的pari_style需和截图保持一致，放在同级目录中，out_file需指定为model_devi.out</p>
        </li>
        <li>提交任务</li>
      </ol>
    </Card>

    <!--        <Card style="margin-top: 10px">
              <h2>CloudServer：Vasp</h2>
              <h3>准备输入文件</h3>
              <ol>
                <li>任务根目录需包含data和bin两个目录</li>
                <li>在data目录下放置INCAR, POSCAR, POTCAR, KPOINTS(非必须)</li>
                <li>在bin目录下放置以vasp为前缀的vasp可执行文件</li>
                <li>将任务根目录打包为zip格式通过前端上传</li>
                <li>提交任务</li>
              </ol>
            </Card>-->
  </div>
</template>

<script>

export default {
  name: 'Help',
};
</script>

<style scoped lang="scss">
#help {
  h2{
    margin: 10px 0;
  }

  h3{
    margin: 10px 0;
  }

  ol {
    margin-left: 20px;

    li {
      margin: 5px 0;
    }
  }
}
</style>
