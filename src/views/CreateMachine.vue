<template>
  <div id="machine">
    <Breadcrumb>
      <BreadcrumbItem>算法</BreadcrumbItem>
      <BreadcrumbItem>开机</BreadcrumbItem>
    </Breadcrumb>
    <Card class="card-panel">
      <Machine type="create_machine" @set="setMachine"></Machine>

    </Card>

    <div style="margin: 10px 0">
      <Button type="primary" @click="parseJson" long>确定</Button>
    </div>

    <Card class="card-panel" v-if="showJson">
      <Form ref="form4" :label-width="100" :rules="submitRules" :model="submitConfig">
        <FormItem label="机器数" prop="number" >
          <InputNumber :max="10" :min="1" v-model="submitConfig.number"></InputNumber>
        </FormItem>
        <FormItem label="json参数" prop="json">
          <Input v-model="submitConfig.inputJsonString"
                 :rows="6" type="textarea" placeholder="Enter something..." />
        </FormItem>
      </Form>
      <div style="text-align: center;">
        <Button type="primary" @click="handleSubmit">提交</Button>
        <Button @click="handleReset" style="margin-left: 8px">取消</Button>
      </div>
    </Card>

  </div>
</template>

<script>
import { insertJob } from '@/api/jobs';
import Machine from '../components/Machine.vue';

export default {
  name: 'CreateMachine',
  components: {
    Machine,
  },
  data() {
    return {
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
      submitRules: {
        name: [
          {
            required: true,
            message: 'The name cannot be empty',
            trigger: 'blur',
          },
        ],
      },
      submitConfig: {
        inputJsonString: '',
        data: '',
        number: 1,
      },
      inputJson: {},
      inputJsonString: '',
    };
  },
  created() {
  },
  methods: {
    setMachine(machine) {
      this.machine = machine;
    },
    parseJson() {
      this.inputJson = this.machine;
      this.submitConfig.inputJsonString = JSON.stringify(this.inputJson, null, 2);
      this.showJson = true;
      this.$nextTick(() => {
        window.scrollTo(0, document.body.clientHeight);
      });
    },
    handleSubmit() {
      const machine = JSON.parse(this.submitConfig.inputJsonString);
      const data = {
        job_type: 'create_machine',
        input_data: {
          create_num: this.submitConfig.number,
        },
        machine,
      };
      console.log(data);
      insertJob(data)
        .then((res) => {
          if (res) {
            alert('任务提交成功');
            // eslint-disable-next-line no-restricted-globals
            this.$router.push(`/user/userinfo/${this.$store.state.user.name}`);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    handleReset() {
      // eslint-disable-next-line no-restricted-globals
      location.reload();
    },
    toTask(data) {
      console.log(data);
      this.$router.push(`/task/${data.id}`);
    },
  },
};
</script>

<style scoped lang="scss">
#machine{
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
