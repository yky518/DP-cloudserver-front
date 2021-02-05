<template>
  <div id="cp2k">
    <!-- <Breadcrumb>
      <BreadcrumbItem>算法</BreadcrumbItem>
      <BreadcrumbItem>Cp2k</BreadcrumbItem>
    </Breadcrumb> -->

    <Card class="card-panel">
      <Machine type="cp2k" @set="setMachine"></Machine>
    </Card>

    <div style="margin: 10px 0;width:100%;text-align: center;">
      <Button type="primary" @click="parseJson" style="width:200px;height:40px;background:#13227A;border-radius: 20px;display: inline-block;">确定</Button>
    </div>

    <Card class="card-panel" v-if="showJson">
      <Form ref="form4" :label-width="100">
        <FormItem label="任务名" prop="name">
          <Input v-model="name" style="width:200px"/>
        </FormItem>
        <FormItem label="json参数" prop="json">
          <Input v-model="inputJsonString" :rows="6"
                 type="textarea" placeholder="Enter something..." />
        </FormItem>
        <FormItem  label="训练数据" prop="data">
          <Upload action="/" :before-upload="handleUpload">
            <Button icon="ios-cloud-upload-outline">Upload files</Button>
          </Upload>
          <div v-if="file !== null">
            Upload file: {{ file.name }}
            <Progress :percent="progress" />
          </div>
        </FormItem>
        <FormItem label="文件目录" prop="fileJson" v-if="file !== null">
          <Input v-model="fileString" :rows="6"
                 type="textarea" placeholder="Enter something..." />
        </FormItem>
      </Form>
      <div style="text-align: center;">
        <Button type="primary" :disabled="progress<100" @click="handleSubmit">提交</Button>
        <Button @click="handleReset" style="margin-left: 8px">取消</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import moment from 'moment';
import uuid from '@/utils/uuid';
import { getStsToken, insertJob } from '@/api/jobs';
import Machine from '../components/Machine.vue';

const OSS = require('ali-oss');
const JSZip = require('jszip');

export default {
  name: 'Cp2k',
  components: { Machine },
  data() {
    return {
      machine: {
        platform: 'ali',
        resources: {
          gpu_type: '',
          cpu_num: 16,
          mem_limit: 32,
          time_limit: '23:00:00',
          docker_name: 'deepmd-kit',
          type: '',
          region: '',
          zone: '',
          image_name: 'fep-beta-v8',
          version: '1.2',
        },
      },
      progress: 0,
      oss_path: '',
      file: null,
      loadingStatus: false,
      inputJson: {},
      inputJsonString: '',
      fileString: '',
      name: '',
      showJson: false,
    };
  },
  created() {

  },
  mounted() {
    let task = {
      task_id:'2234',
      task_name:'DPtech_test_indicate',
      task_type:'indicate',
      GPU:'T4*1',
      CPU:'16',
      Memory:'62GB',
      subtask:'30'
    }
    // this.$parent.changeState(true,task)
  },
  methods: {
    setMachine(machine) {
      this.machine = machine;
    },
    handleSubmit() {
      console.log(this.oss_path);
      if (this.oss_path) {
        const inputJson = JSON.parse(this.inputJsonString);
        inputJson.job_name = this.name;
        const data = {
          job_type: 'cp2k',
          // name: this.name,
          input_data: inputJson,
          oss_path: this.oss_path,
        };
        insertJob(data).then((data) => {
          console.log(data);
          alert('任务提交成功');
          // this.$router.push(`/job/${data.data.job_id}`);
          this.$router.push(`/user/userinfo/${this.$store.state.user.name}`);
        }).catch((err) => {
          console.log(err);
        });
      } else {
        alert('请务必上传下zip格式的训练数据');
      }
    },
    handleReset() {
      window.location.reload();
    },
    parseJson() {
      this.inputJson.machine = this.machine;
      this.inputJsonString = JSON.stringify(this.inputJson, null, 2);
      // let myDate=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const myDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      this.name = `Cp2k ${myDate}`;
      this.showJson = true;
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    handleUpload(file) {
      const reg = /.zip$/;
      if (reg.test(file.name)) {
        this.file = file;
        const that = this;
        const entryList = [];

        // eslint-disable-next-line camelcase
        const new_zip = new JSZip();
        new_zip.loadAsync(file).then((zip) => {
          zip.forEach((relativePath, zipEntry) => { // 2) print entries
            entryList.push(zipEntry.name);
            console.log(zipEntry.name);
          });
          // entryList.indexOf('bin/vasp_std') >= 0 && entryList.indexOf('data/INCAR') >= 0
          // && entryList.indexOf('data/POSCAR') >= 0 && entryList.indexOf('data/POTCAR') >= 0

          if (entryList.indexOf('data/input.json')) {
            alert('训练数据格式正确');

            let fileString = '';
            for (const entry of entryList) {
              fileString += `${entry}\n`;
            }

            that.fileString = fileString;

            getStsToken().then((data) => {
              console.log(data);
              const result = data;
              const client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-shenzhen.aliyuncs.com',
                bucket: 'dpcloudserver',

              });

              const uuid0 = uuid();
              const storeAs = `dpcloudserver/cp2k/${uuid0}/${uuid0}.zip`;
              that.progress = 0;

              // 分片上传
              async function multipartUpload() {
                try {
                  // eslint-disable-next-line max-len
                  // object-key可以自定义为文件名（例如file.txt）或目录（例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
                  // eslint-disable-next-line no-shadow
                  const result = await client.multipartUpload(storeAs, file, {
                    /*                      parallel: 10, // 分片个数
                                          partSize: 1024 * 1024 * 10, // 分片至少为大小 */
                    progress(p, checkpoint) {
                      // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发继续上传。
                      console.log(checkpoint);
                      // p 展示是小数， 表示上传的进度 如 0 0.1 0.5 0.9 1
                      console.log(p);
                      // eslint-disable-next-line radix
                      that.progress = parseInt(p * 100);
                    },
                  });

                  console.log(result);
                  const url = `http://dpcloudserver.oss-cn-shenzhen.aliyuncs.com/${result.name}`;

                  alert('上传成功');
                  that.oss_path = url;
                } catch (e) {
                  console.log(e);
                }
              }
              multipartUpload();

              /*           client.put(storeAs, file, options).then(function (result) {
                console.log(result);
                let url = result.url;

                // that.$Message.success("上传成功");
                that.oss_path = url;

              }).catch(err=>{
                console.log(err);
              }) */
            }).catch((err) => {
              console.log(err);
            });
          } else {
            that.file = null;
            alert('训练数据缺少文件');
          }
        }, (e) => {
          console.log(e);
        });
      } else {
        this.file = null;
        alert('请上传zip格式文件');
      }
    },
    upload() {
      this.loadingStatus = true;
      setTimeout(() => {
        this.file = null;
        this.loadingStatus = false;
        this.$Message.success('Success');
      }, 1500);
    },
  },
};
</script>

<style scoped lang="scss">

  #cp2k{
    /deep/ .ivu-breadcrumb{
      color: #333333;
      font-size: 20px;
      span:last-child{
        color: #2E5BFF;
        font-weight: 700;
      }
    }

    .card-panel {
      margin: 10px 0;
      background-color: #ffffff;
      border: 0;

      h2, h3 {
        color: #333333;
      }

      /deep/ .ivu-form .ivu-form-item-label {
        color: #333333;
      }

    }

  }
</style>
