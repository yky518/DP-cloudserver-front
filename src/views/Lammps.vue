<template>
  <div id="lammps">
    <!-- <Breadcrumb>
      <BreadcrumbItem>算法</BreadcrumbItem>
      <BreadcrumbItem>Lammps
        <Icon type="ios-help-circle" @click="showModal = true"/>
      </BreadcrumbItem>
    </Breadcrumb> -->

    <Modal title="CloudServer：lammps使用文档"
           v-model="showModal" :footer-hide="true">
      <div style="margin: 10px">
        <ol>
          <li>选择算法-lammps
          <li> 选择**机型**后点击确定
          <li>点击Upload Files上传zip压缩包，势函数文件graph*非必选
            <p>注意，input.lammps的命名是唯一的，其中指定的pari_style需和截图保持一致，放在同级目录中，out_file需指定为model_devi.out</p>
          </li>
          <li>提交任务</li>
        </ol>
      </div>

    </Modal>

    <Card class="card-panel">
      <Machine type="lammps" @set="setMachine"></Machine>
<!--      <h2>machine</h2>
      <Form ref="form1" :model="machine" :label-width="100">
        <FormItem label="平台" prop="platform">
          <Select v-model="machine.platform" style="width:200px"
                  @on-change="getBestPrice">
            <Option value="ali">ali</Option>
            <Option value="baiduyun">baiduyun</Option>
          </Select>
        </FormItem>
        <h3>resources</h3>
        <Row>
          <Col span="8">
            <FormItem label="gpu_type" prop="gpu_type">
              <Select v-model="machine.resources.gpu_type" style="width:200px"
                      @on-change="getBestPrice" clearable>
                <Option v-for="gpu in gpu_list" :key="gpu" :value="gpu">{{gpu}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="cpu_num" prop="cpu_num">
              <Select v-model="machine.resources.cpu_num" style="width:200px"
                      @on-change="getBestPrice">
                <Option v-for="cpu in cpu_list" :key="cpu" :value="cpu">{{cpu}}</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="mem_limit" prop="mem_limit">
              <Select v-model="machine.resources.mem_limit" style="width:200px"
                      @on-change="getBestPrice">
                <Option v-for="memory in memory_list" :key="memory"
                        :value="memory">{{memory}}</Option>
              </Select>
            </FormItem>
          </Col>

        </Row>
        <Row>
          &lt;!&ndash;              <Col span="8">
                          <FormItem label="docker_name" prop="docker_name">
                            <Select v-model="machine.resources.docker_name" style="width:200px">
                              <Option value="deepmd-kit">deepmd-kit</Option>
                              <Option value="vasp">vasp</Option>
                            </Select>
                          </FormItem>
                        </Col>&ndash;&gt;
          <div style="display: none;">
            <Col span="8">
              <FormItem label="type" prop="type">
                <p style="color: #2b85e4">{{machine.resources.type}}</p>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="region" prop="region">
                <p style="color: #2b85e4">{{machine.resources.region}}</p>
              </FormItem>
            </Col>
            <Col span="8">
              <FormItem label="zone" prop="zone">
                <p style="color: #2b85e4">{{machine.resources.zone}}</p>
              </FormItem>
            </Col>
          </div>

          &lt;!&ndash;              <Col span="8">
                          <FormItem label="image_name" prop="image_name">
                            <Select v-model="machine.resources.image_name" style="width:200px">
                              <Option value="fep-beta-v8">fep-beta-v8</Option>
                              <Option value="fep-beta-v8">fep-beta-v8</Option>
                            </Select>
                          </FormItem>
                        </Col>&ndash;&gt;
          <Col span="8">
            <FormItem label="time_limit" prop="time_limit">
              <Input v-model="machine.resources.time_limit"
                     placeholder="23:00：00" style="width:200px" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="version" prop="version">
              <Select v-model="machine.resources.version" style="width:200px">
                <Option value="0.12">0.12</Option>
                <Option value="1.2">1.2</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="price" prop="price">
              <p style="color:#681752">{{price}} ¥</p>
            </FormItem>
          </Col>
        </Row>

      </Form>-->
    </Card>

    <div style="margin: 10px 0;width:100%;text-align:center;">
      <Button type="primary" @click="parseJson" long style="width:200px;height:40px;background:#13227A;border-radius: 20px;display:inline-block;">确定</Button>
    </div>

    <Card class="card-panel" v-if="showJson">
      <Form ref="form4" :label-width="100" :rules="submitRules" :model="submitConfig">
        <FormItem label="任务名" prop="name" >
          <Input v-model="submitConfig.name" style="width:200px"/>
        </FormItem>
        <FormItem label="json参数" prop="json">
          <Input v-model="submitConfig.inputJsonString"
                 :rows="6" type="textarea" placeholder="Enter something..." />
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

        <Row :gutter="16">
          <Col span="12">
            <FormItem label="文件目录" prop="fileJson">
              <Input v-model="submitConfig.fileString" :rows="6" type="textarea"
                     placeholder="Click the button to upload file..." />
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="参考文件" prop="fileReference">
              <Input v-model="submitConfig.fileReference" :rows="6" type="textarea"
                     placeholder="Enter something..." disabled/>
            </FormItem>
          </Col>
        </Row>
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
import { getStsToken, insertJob,
} from '@/api/jobs';
import Machine from '../components/Machine.vue';

const OSS = require('ali-oss');
const JSZip = require('jszip');

export default {
  name: 'Lammps',
  components: {
    Machine,
  },
  data() {
    return {
      showModal: false,
      submitConfig: {
        name: '',
        inputJsonString: '',
        data: '',
        fileString: '',
        fileReference:
          `conf.lmp
input.lammps
graph.000.pb
graph.001.pb
graph.002.pb
graph.003.pb`,
      },
      submitRules: {
        name: [
          {
            required: true, message: 'The name cannot be empty', trigger: 'blur',
          },
        ],
        file: [
          {
            required: true, message: 'The file cannot be empty', trigger: 'blur',
          },
        ],
      },
      progress: 0,
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
  methods: {
    setMachine(machine) {
      this.machine = machine;
    },
    handleSubmit() {
      console.log(this.oss_path);
      if (this.oss_path) {
        const inputJson = JSON.parse(this.submitConfig.inputJsonString);
        inputJson.job_name = this.submitConfig.name;
        const data = {
          job_type: 'lammps',
          // name: this.name,
          input_data: inputJson,
          oss_path: this.oss_path,
        };
        insertJob(data).then((res) => {
          console.log(res);
          alert('任务提交成功');
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
      this.submitConfig.inputJsonString = JSON.stringify(this.inputJson, null, 2);
      // let myDate=moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      const myDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
      this.submitConfig.name = `Lammps ${myDate}`;
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

          if (1) {
            // alert('训练数据格式正确');

            let fileString = '';
            for (const entry of entryList) {
              fileString += `${entry}\n`;
            }

            that.submitConfig.fileString = fileString;

            getStsToken().then((res) => {
              console.log(res);
              const result = res;
              const client = new OSS({
                accessKeyId: result.AccessKeyId,
                accessKeySecret: result.AccessKeySecret,
                stsToken: result.SecurityToken,
                endpoint: 'oss-cn-shenzhen.aliyuncs.com',
                bucket: 'dpcloudserver',

              });

              const uuid0 = uuid();
              const storeAs = `dpcloudserver/lammps/${uuid0}/${uuid0}.zip`;
              that.progress = 0;

              // 分片上传
              async function multipartUpload() {
                try {
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
                  that.submitConfig.file = file;
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

  #lammps{

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
