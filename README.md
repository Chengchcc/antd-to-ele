# element-ui 迁移 antd 工具
利用template->ast->template的思路，将vue文件中的template的el组件转换成antd的，或者打上相应的comment。

## 使用方式
将input目录下的.vue文件转换后输出到output下

```bash
npm run start -- -input INPUT_FOLDER -output OUTPUT_FOLDER
```