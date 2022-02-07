import "./style.scss";
import Vue from "vue";
import EleApp from "./ele/app.vue";
import AntApp from "./antd/app.vue";
import ElementUI from "element-ui";
import Antd from "ant-design-vue";

import "element-ui/lib/theme-chalk/index.css";
import "ant-design-vue/dist/antd.css";

Vue.use(ElementUI);
Vue.use(Antd);

new Vue({
  render: (h) => h(EleApp),
}).$mount("#ele>div");

new Vue({
  render: (h) => h(AntApp),
}).$mount("#antd>div");
