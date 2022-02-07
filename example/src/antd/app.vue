<template>
  <!--迁移TODO: 请检查ref相关方法-->
  <a-form-model
    ref="form"
    :model="form"
    v-bind="{
      labelCol: { style: { width: '80px', float: 'left' } },
      wrapperCol: {
        style: { width: 'calc(100% - 80px)', float: 'left' },
      },
    }"
  >
    <a-form-model-item label="活动名称">
      <a-input v-model="form.name" />
    </a-form-model-item>
    <a-form-model-item label="活动区域">
      <!--迁移TODO: 请手动重构el-select-->
      <el-select v-model="form.region" placeholder="请选择活动区域">
        <el-option label="区域一" value="shanghai" />
        <el-option label="区域二" value="beijing" />
      </el-select>
    </a-form-model-item>
    <a-form-model-item label="活动时间">
      <a-col :span="11">
        <!--迁移TODO: 请手动重构el-date-picker-->
        <el-date-picker
          v-model="form.date1"
          type="date"
          placeholder="选择日期"
          style="width: 100%"
        />
      </a-col>
      <a-col class="line" :span="2">-</a-col>
      <a-col :span="11">
        <el-time-picker
          v-model="form.date2"
          placeholder="选择时间"
          style="width: 100%"
        />
      </a-col>
    </a-form-model-item>
    <a-form-model-item label="即时配送">
      <a-switch v-model="form.delivery" />
    </a-form-model-item>
    <a-form-model-item label="活动性质">
      <a-checkbox-group v-model="form.type">
        <a-checkbox value="美食/餐厅线上活动" name="type">
          美食/餐厅线上活动
        </a-checkbox>
        <a-checkbox value="地推活动" name="type">地推活动</a-checkbox>
        <a-checkbox value="线下主题活动" name="type">线下主题活动</a-checkbox>
        <a-checkbox :value="label" name="type">{{ label }}</a-checkbox>
      </a-checkbox-group>
    </a-form-model-item>
    <a-form-model-item label="特殊资源">
      <a-radio-group v-model="form.resource">
        <a-radio value="线上品牌商赞助">线上品牌商赞助</a-radio>
        <a-radio value="线下场地免费">线下场地免费</a-radio>
      </a-radio-group>
    </a-form-model-item>
    <a-form-model-item label="活动形式">
      <a-textarea v-model="form.desc" type="textarea" />
    </a-form-model-item>
    <a-form-model-item>
      <a-button type="primary" @click="onSubmit">立即创建</a-button>
      <a-button>取消</a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      label: "单纯品牌曝光",
      form: {
        name: "",
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: "",
      },
    };
  },
  methods: {
    onSubmit() {
      console.log("submit!");
    },
  },
};
</script>
