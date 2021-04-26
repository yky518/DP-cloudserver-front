<template>
  <div id="machine">
    <h2>machine</h2>
    <Form ref="machine" :model="machine" :label-width="100">
      <FormItem :label="this.i18n.平台" prop="platform">
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
        <!--              <Col span="8">
                        <FormItem label="docker_name" prop="docker_name">
                          <Select v-model="machine.resources.docker_name" style="width:200px">
                            <Option value="deepmd-kit">deepmd-kit</Option>
                            <Option value="vasp">vasp</Option>
                          </Select>
                        </FormItem>
                      </Col>-->
        <!--              <Col span="8">
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
                      </Col>-->
        <!--              <Col span="8">
                        <FormItem label="image_name" prop="image_name">
                          <Select v-model="machine.resources.image_name" style="width:200px">
                            <Option value="fep-beta-v8">fep-beta-v8</Option>
                            <Option value="fep-beta-v8">fep-beta-v8</Option>
                          </Select>
                        </FormItem>
                      </Col>-->
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
        <Col span="8">
          <FormItem label="image_name" prop="image_name">
            <Select v-model="machine.resources.image_name" style="width:200px"
                     clearable>
              <Option v-for="image in image_list" :key="image" :value="image">{{image}}</Option>
            </Select>
          </FormItem>
        </Col>
      </Row>

    </Form>
  </div>
</template>

<script>
import { getDefaultMachine, getBestPrice, getInstanceType } from '@/api/jobs';

export default {
  name: 'Machine',
  props: ['type'],
  data: () => ({
    price: 0,
    gpu_list: [],
    cpu_list: [],
    image_list: [],
    memory_list: [],
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
        image_name: '',
        version: '1.2',
      },
    },
  }),
  watch: {
    machine: {
      handler() {
        this.$emit('set', this.machine);
      },
      deep: true,
    },
  },
  computed:{
    i18n(){
      return this.$t("index.Machine");
    }
  },
  created() {
    getInstanceType().then((res) => {
      this.gpu_list = res.data.gpu;
      this.gpu_list[2] = "1 * NVIDIA P100"
      this.cpu_list = res.data.v_cpu;
      this.memory_list = res.data.memory;
      this.image_list = res.data.image_name;
    }).catch((err) => {
      console.log(err);
    });
/*    const resources = null;
    const params = {
      job_type: 'lammps',
    };*/
    /*    getDefaultMachine(params).then((res) => {
      console.log(res.resources);
      resources = res.resources;
      this.$set(this.machine, 'platform', res.platform);
      this.$set(this.machine.resources, 'cpu_num', resources.cpu_num);
      this.$set(this.machine.resources, 'gpu_type', resources.gpu_type);
      this.$set(this.machine.resources, 'mem_limit', resources.mem_limit);
      this.$set(this.machine.resources, 'image_name', resources.image_name);
    }).catch((err) => {
      console.log(err);
    }); */
    this.getBestPrice();
    this.$emit('set', this.machine);
  },
  methods: {
    getBestPrice() {
      const params = {
        platform: this.machine.platform,
        cpu_num: this.machine.resources.cpu_num,
        gpu_type: this.machine.resources.gpu_type,
        mem_limit: this.machine.resources.mem_limit,
      };
      getBestPrice(params).then((res) => {
        if (res.length) {
          const data = res[0];
          this.$set(this.machine.resources, 'type', data.instance_type);
          this.$set(this.machine.resources, 'region', data.region);
          this.$set(this.machine.resources, 'zone', data.zone);
          this.price = data.price;
        } else {
          this.$set(this.machine.resources, 'type', 'null');
          this.$set(this.machine.resources, 'region', 'null');
          this.$set(this.machine.resources, 'zone', 'null');
          this.price = 0;
        }
      });
    },
  },
};
</script>
