<template>
  <div id="dpkit">
    <!-- <Breadcrumb>
      <BreadcrumbItem>算法</BreadcrumbItem>
      <BreadcrumbItem>DeePMD-kit
        <Icon type="ios-help-circle" @click="showModal = true"/>
      </BreadcrumbItem>
    </Breadcrumb> -->
    <Modal title="CloudServer：DeepMD-Kit使用文档"
        v-model="showModal" :footer-hide="true">
      <div style="margin: 10px">
        <ol>
          <li>选择：算法 --> DeePMD-kit</li>
          <li>机器选择，推荐使用默认值即可</li>
          <li>填写model参数部分，以H2O为例</li>
          <li>填写learning_rate和loss部分，推荐选择默认值即可</li>
          <li>填写training部分，
            注意，上传的训练初始数据压缩包需要包含data目录，
            并把system放在里边，已经默认勾选了multi_system，无需改动systems，然后填写stop_batch;</li>

          <li>检查生成的json是否正确</li>
          <li>点击确定，向下滑动页面，点击Upload Files上传zip格式的数据压缩包，等待读条完成后点击提交，查看任务状态</li>
        </ol>
      </div>

    </Modal>

    <Card class="card-panel">
      <Machine type="dpkit" @set="setMachine"></Machine>

    </Card>

    <Card class="card-panel">
      <h2>model</h2>
      <Form ref="form1" :model="model" :rules="modelRules" :label-width="100">
        <FormItem label="type_map" prop="type_map">
          <Input v-model="model.type_map" placeholder="H,O"
                 style="width:200px" @on-blur="mapChange"/>
        </FormItem>
        <h3>descriptor</h3>
        <Row>
          <Col span="8">
            <FormItem label="sel" prop="sel">
              <Input v-model="model.sel" placeholder="[10,20,50]" style="width:200px" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="rcut" prop="rcut">
              <InputNumber :max="10" :min="0" :step="0.1"
                           v-model="model.descriptor.rcut"></InputNumber>
            </FormItem>
          </Col>
          <Col span="7">
            <FormItem label="rcut_smth" prop="rcut_smth">
              <InputNumber :max="10" :min="0" :step="0.1"
                           v-model="model.rcut_smth"></InputNumber>
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span="8">
            <FormItem label="resnet_dt" prop="resnet_dt">
              <Checkbox v-model="model.descriptor.resnet_dt" number></Checkbox>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="neuron" prop="neuron">
              <Input v-model="model.descriptor.neuron"
                     placeholder="[10,20,50]" style="width:200px" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="seed" prop="seed">
              <Input v-model="model.descriptor.seed"
                     placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="type" prop="type">
              <Select v-model="model.descriptor.type" style="width:200px">
                <Option value="se_a">se_a</Option>
                <Option value="se_r">se_r</Option>
                <Option value="local_frame">local_frame</Option>
              </Select>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="axis_neuron" prop="axis_neuron">
              <InputNumber :max="20" :min="0"
                           v-model="model.descriptor.axis_neuron"></InputNumber>
            </FormItem>

          </Col>

        </Row>

        <h3>fitting_net</h3>
        <Row>
          <Col span="8">
            <FormItem label="resnet_dt" prop="resnet_dt">
              <Checkbox v-model="model.fitting_net.resnet_dt"></Checkbox>
            </FormItem>

          </Col>
          <Col span="8">
            <FormItem label="neuron" prop="neuron">
              <Input v-model="model.fitting_net.neuron"
                     placeholder="[10,20,50]" style="width:200px" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="seed" prop="seed">
              <Input v-model="model.fitting_net.seed"
                     placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Card>

    <Card class="card-panel">
      <h2>learning_rate</h2>
      <Form ref="form2" :model="learning_rate" :label-width="100">

        <Row>
          <Col span="8">
            <FormItem label="type" prop="type">
              <Select v-model="learning_rate.type" style="width:200px">
                <Option value="exp">exp</Option>
                <Option value="se_r">se_r</Option>
                <Option value="local_frame">local_frame</Option>
              </Select>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="decay_steps" prop="decay_steps">
              <Input v-model="learning_rate.decay_steps"
                     placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="start_lr" prop="start_lr">
              <Input v-model="learning_rate.start_lr"
                     placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="stop_lr" prop="stop_lr">
              <Input v-model="learning_rate.stop_lr"
                     placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Card>

    <Card class="card-panel">
      <h2>loss</h2>

      <Form ref="form3" :model="loss" :label-width="100">
        <Row>
          <Col span="12">
            <FormItem label="start_pref_e" prop="decay_steps">
              <Input v-model="loss.start_pref_e" placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="limit_pref_e" prop="limit_pref_e">
              <Input v-model="loss.limit_pref_e" placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="start_pref_f" prop="start_pref_f">
              <Input v-model="loss.start_pref_f" placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="limit_pref_f" prop="limit_pref_f">
              <Input v-model="loss.limit_pref_f" placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="start_pref_v" prop="start_pref_v">
              <Input v-model="loss.start_pref_v" placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="12">
            <FormItem label="limit_pref_v" prop="limit_pref_v">
              <Input v-model="loss.limit_pref_v" placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Card>

    <Card class="card-panel" >
      <h2>training</h2>
      <Form ref="form4" :model="training" :rules="trainingRules" :label-width="100">
        <Row>
          <Col span="8">
            <FormItem label="multi_system" prop="multi_system">
              <Checkbox v-model="training.multi_system" @on-change="changeMulti"></Checkbox>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="systems" prop="systems">
              <Input v-model="training.systems" placeholder="200"
                     :disabled="training.multi_system" style="width:200px" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="set_prefix" prop="set_prefix">
              <Input v-model="training.set_prefix"
                     placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>

        </Row>

        <Row>
          <Col span="8">
            <FormItem label="stop_batch" prop="stop_batch">
              <Input v-model.number="training.stop_batch"
                     placeholder="1000" style="width:200px"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="batch_size" prop="batch_size">
              <Input v-model="training.batch_size" placeholder="" style="width:200px"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="seed" prop="seed">
              <Input v-model="training.seed" placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>

        </Row>
        <Row>
          <Col span="8">
            <FormItem label="disp_file" prop="disp_file">
              <Input v-model="training.disp_file" placeholder="200" style="width:200px" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="disp_freq" prop="disp_freq">
              <Input v-model="training.disp_freq" placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="numb_test" prop="numb_test">
              <Input v-model="training.numb_test" placeholder="200" style="width:200px" number/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="save_freq" prop="save_freq">
              <Input v-model="training.save_freq" placeholder="200" style="width:200px"/>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="save_ckpt" prop="save_ckpt">
              <Input v-model="training.save_ckpt" placeholder="200" style="width:200px" />
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="disp_training" prop="disp_training">
              <Checkbox v-model="training.disp_training"></Checkbox>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="time_training" prop="time_training">
              <Checkbox v-model="training.time_training"></Checkbox>
            </FormItem>
          </Col>
          <Col span="8">
            <FormItem label="profiling" prop="profiling">
              <Checkbox v-model="training.profiling"></Checkbox>
            </FormItem>
          </Col>

          <Col span="8">
            <FormItem label="profiling_file" prop="profiling_file">
              <Input v-model="training.profiling_file" placeholder="200" style="width:200px" />
            </FormItem>
          </Col>
        </Row>

      </Form>
    </Card>
    <div style="margin: 10px 0;text-align: center;width:100%">
      <Button type="primary" @click="parseJson" long style="width:200px;height:40px;background:#13227A;border-radius: 20px;display:inline-block;">确定</Button>
    </div>

    <Card class="card-panel" v-if="showJson">
      <Form ref="form4" :label-width="100" :rules="submitRules" :model="submitConfig">
        <FormItem label="任务名" prop="name">
          <Input v-model="submitConfig.name" style="width:200px"/>
        </FormItem>
        <FormItem label="json参数" prop="json">
          <Input v-model="submitConfig.inputJsonString" :rows="6"
                 type="textarea" placeholder="Enter something..." />
        </FormItem>
        <FormItem  label="训练数据" prop="file">
          <Upload action="/" :before-upload="handleUpload">
            <Button icon="ios-cloud-upload-outline">Upload Files</Button>
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
import uuid from '@/utils/uuid';
import moment from 'moment';
import {
  getStsToken, insertJob,
} from '@/api/jobs';
import Machine from '../components/Machine.vue';

const OSS = require('ali-oss');
const JSZip = require('jszip');

export default {
  name: 'Dpkit',
  components: { Machine },
  data() {
    const validateTypeMap = (rule, value, callback) => {
      console.log(value);
      const reg = /^[a-zA-Z]+(,[a-zA-Z]+)*$/;
      if (reg.test(value)) {
        callback();
      } else {
        callback(new Error('格式不正确'));
      }
    };
    const validateSel = (rule, value, callback) => {
      console.log(value);
      if (value === '') {
        callback(new Error('sel不能为空'));
      } else {
        const len = JSON.parse(value).length;
        const typeLen = this.model.type_map.split(',').length;
        console.log(typeLen);
        if (len !== typeLen) {
          callback(new Error('请保证长度与type_map元素数量一致'));
        } else {
          callback();
        }
      }
    };
    const validateCutSmth = (rule, value, callback) => {
      console.log(value);
      if (value > this.model.rcut || value < 0) {
        callback(new Error('保证0<rcut_smth < rcut '));
      } else {
        callback();
      }
    };
    return {
      showModal: false,
      oss_path: '',
      progress: 0,
      file: null,
      loadingStatus: false,
      inputJson: {},

      submitConfig: {
        name: '',
        inputJsonString: '',
        data: '',
        fileString: '',
        fileReference:
`data/init/00.liq/state.0400.1.00e04.00/vasp/data/
     --- dipole.raw
     --- box.raw
     --- coord.raw
     --- dipole.raw
     --- energy.raw
     --- force.raw
     --- virial.raw
data/init/00.liq/state.0400.1.00e04.00/vasp/data/set.000/
     --- box.npy
     --- coord.npy
     --- dipole.npy
     --- energy.npy
     --- force.npy
     --- virial.npy`,
      },
      showJson: false,
      machine: {
        platform: 'ali',
        resources: {
          gpu_type: 'T4*1',
          cpu_num: 16,
          mem_limit: 32,
          time_limit: '23:00:00',
          docker_name: 'deepmd-kit',
          type: '',
          region: '',
          zone: '',
          image_name: '',
          version: '1.2',
        },
      },
      model: {
        type_map: '',
        rcut_smth: 0.5,
        sel: '',
        descriptor: {
          type: 'se_a',
          rcut: 6,
          neuron: JSON.stringify([25, 50, 100]),
          resnet_dt: false,
          axis_neuron: 16,
          seed: 1,
        },
        fitting_net: {
          neuron: JSON.stringify([25, 50, 100]),
          resnet_dt: true,
          seed: 1,
        },
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
      modelRules: {
        type_map: [
          {
            required: true, message: 'The type_map cannot be empty', trigger: 'blur',
          },
          {
            validator: validateTypeMap, trigger: 'blur',
          },

        ],
        sel: [
          { validator: validateSel, trigger: 'change' },
        ],
        rcut_smth: [
          { validator: validateCutSmth, trigger: 'blur' },
        ],
      },
      learning_rate: {
        type: 'exp',
        decay_steps: 5000,
        start_lr: 0.001,
        stop_lr: 3.51e-8,
      },
      loss: {
        start_pref_e: 0.02,
        limit_pref_e: 1,
        start_pref_f: 1000,
        limit_pref_f: 1,
        start_pref_v: 0,
        limit_pref_v: 0,
      },
      training: {
        multi_system: true,
        systems: '../',
        set_prefix: 'set',
        stop_batch: '',
        batch_size: 'auto',
        seed: 1,
        disp_file: 'lcurve.out',
        disp_freq: 100,
        numb_test: 10,
        save_freq: 1000,
        save_ckpt: 'model.ckpt',
        disp_training: true,
        time_training: true,
        profiling: false,
        profiling_file: 'timeline.json',
      },
      trainingRules: {
        systems: [
          { required: true, message: 'The systems cannot be empty', trigger: 'blur' },
        ],
        stop_batch: [
          {
            required: true, type: 'number', message: 'The stop_batch should be number', trigger: 'blur',
          },
          {
            type: 'number', max: 20000000, message: 'The stop_batch should <= 20000000', trigger: 'blur',
          },
        ],
      },

      form1: {
        parm1: '',
        parm2: '',
        parm3: '',
        parm4: '',
        textarea: '',
      },
      form2: {
        parm1: '',
        parm2: '',
        parm3: '',
        parm4: '',
        textarea: '',
      },
    };
  },
  created() {
  },
  methods: {
    setMachine(machine) {
      this.machine = machine;
    },
    handleSubmit() {
      if (this.oss_path) {
        const inputJson = JSON.parse(this.submitConfig.inputJsonString);
        inputJson.job_name = this.submitConfig.name;
        const data = {
          job_type: 'kit',
          input_data: inputJson,
          oss_path: this.oss_path,
        };
        insertJob(data).then((res) => {
          console.log(res);
          if (res.status === 200) {
            alert('任务提交成功');
            // eslint-disable-next-line no-restricted-globals
            this.$router.push(`/user/userinfo/${this.$store.state.user.name}`);
          }
        }).catch((err) => {
          console.log(err);
        });
      } else {
        alert('请务必上传下zip格式的训练数据');
      }
    },
    handleReset() {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
    toTask(data) {
      console.log(data);
      this.$router.push(`/task/${data.id}`);
    },
    mapChange() {
      const typeList = this.model.type_map.split(',');
      const len = typeList.length;
      const sel = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < len; i++) {
        sel.push(100);
      }
      this.$set(this.model, 'sel', JSON.stringify(sel));
      console.log(this.model.sel);
    },
    // eslint-disable-next-line consistent-return
    parseJson() {
      let valid1 = false;
      let valid4 = false;
      this.inputJson.machine = this.machine;
      this.$refs.form1.validate((valid) => {
        valid1 = valid;
        console.log(typeof this.model.descriptor.neuron);
        if (valid) {
          this.inputJson.model = {};
          console.log(this.inputJson);
          console.log(this.model.type_map);
          this.inputJson.model.type_map = this.model.type_map.split(',');
          this.inputJson.model.descriptor = JSON.parse(JSON.stringify(this.model.descriptor));
          this.inputJson.model.fitting_net = JSON.parse(JSON.stringify(this.model.fitting_net));
          this.inputJson.model.descriptor.sel = JSON.parse(this.model.sel);
          this.inputJson.model.descriptor.neuron = JSON.parse(this.model.descriptor.neuron);
          this.inputJson.model.descriptor.rcut_smth = this.model.rcut_smth;
          this.inputJson.model.fitting_net.neuron = JSON.parse(this.model.fitting_net.neuron);
        } else {
          console.log('error submit!!');
        }
      });
      this.$refs.form4.validate((valid) => {
        valid4 = valid;
        if (valid) {
          this.inputJson.learning_rate = this.learning_rate;
          this.inputJson.loss = this.loss;
          this.inputJson.training = JSON.parse(JSON.stringify(this.training));
          this.inputJson.training.systems = JSON.parse(this.training.systems);
          this.inputJson.training.stop_batch = parseInt(this.training.stop_batch, 10);
        } else {
          console.log('error submit!!');
        }
      });
      if (valid1 && valid4) {
        this.submitConfig.inputJsonString = JSON.stringify(this.inputJson, null, 2);
        const myDate = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
        this.submitConfig.name = `${this.model.type_map} ${myDate}`;
        this.showJson = true;
        this.$nextTick(() => {
          window.scrollTo(0, document.body.clientHeight);
        });
      } else {
        console.log('error submit!!');
        alert('请补充参数');
        return false;
      }
    },
    changeMulti() {
      if (this.training.multi_system) {
        this.training.systems = '../';
      } else {
        this.training.systems = JSON.stringify(['../data']);
      }
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

          if (1) {
            alert(`训练数据${(file.size / 1024 / 1024).toFixed(2)}M，开始上传到服务器`);

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
              /*  const options = {
                callback: {
                  // 您的回调服务器地址
                  url: 'http://39.98.150.188:5003/test_post',
                  // 设置回调请求消息头中Host的值，如oss-cn-hangzhou.aliyuncs.com。
                  host: 'oss-cn-shenzhen.aliyuncs.com',
                  // 设置发起回调请求的Content-Type。
                  body: 'bucket=1',
                  contentType: 'application/x-www-form-urlencoded',
                  // 设置发起回调请求的自定义参数。
                  customValue: {
                    var1: 'value1',
                    var2: 'value2',
                  },
                },
              }; */

              const uuid0 = uuid();
              const storeAs = `dpcloudserver/dpkit/${uuid0}/${uuid0}.zip`;

              // 分片上传
              async function multipartUpload() {
                try {
                  // object-key可以自定义为文件名（例如file.txt）或目录
                  // （例如abc/test/file.txt）的形式，实现将文件上传至当前Bucket或Bucket下的指定目录。
                  const resMulti = await client.multipartUpload(storeAs, file, {
                    /*                      parallel: 10, // 分片个数
                                          partSize: 1024 * 1024 * 10, // 分片至少为大小 */
                    progress(p, checkpoint) {
                      // 断点记录点。浏览器重启后无法直接继续上传，您需要手动触发继续上传。
                      console.log(checkpoint);
                      // p 展示是小数， 表示上传的进度 如 0 0.1 0.5 0.9 1
                      console.log(p);
                      // that[ref]=parseInt(p*100)
                      that.progress = parseInt(p * 100, 10);
                    },
                  });

                  const url = `http://dpcloudserver.oss-cn-shenzhen.aliyuncs.com/${resMulti.name}`;

                  alert('上传成功');
                  that.oss_path = url;
                  that.submitConfig.file = file;
                } catch (e) {
                  console.log(e);
                }
              }
              multipartUpload();

              /*              client.put(storeAs, file, options).then(function (result) {
                console.log(result);
                let url = result.url;

                that.$Message.success("上传成功");
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
  #dpkit{
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
