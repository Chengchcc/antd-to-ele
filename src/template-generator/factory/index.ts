import { TraversalHandler } from "@vuedx/template-ast-types";

export const FACTORY = {
  "el-table": require("./ELTable").default,
  "el-col": require("./ElCol").default,
  "el-row": require("./ElRow").default,
  "el-form": require("./ElForm").default,
  "el-form-item": require("./ElFormItem").default,
  "el-button": require("./ElButton").default,
  "el-drawer": require("./ElDrawer").default,
  "el-tabs": require("./ElTabs").default,
  "el-tab-pane": require("./ElTabPane").default,
  "el-tag": require("./ElTag").default,
  "el-radio": require("./ElRadio").default,
  "el-radio-group": require("./ElRadioGroup").default,
  "el-radio-button": require("./ElRadioButton").default,
  "el-input": require("./ElInput").default,
  "el-tooltip": require("./ElTooltip").default,
  "el-select": require("./ElSelect").default,
  "el-popover": require("./ElPopover").default,
  "el-date-picker": require("./ElDatePicker").default,
  "el-dropdown": require("./ElDropDown").default,
  "el-calendar": require("./ElCalendar").default,
  "el-popconfirm": require("./ElPopConfirm").default,
  "el-card": require("./ElCard").default,
  "el-divider": require("./ElDivider").default,
  "el-tree": require("./ElTree").default,
  "el-progress": require("./ElProgress").default,
  "el-checkbox": require("./ElCheckbox").default,
  "el-switch": require("./ElSwitch").default,
  "el-upload": require("./ElUpload").default,
  "el-slider": require("./ElSlider").default,
  "el-timeline": require("./ElTimeline").default,
  "el-dialog": require("./ElDialog").default,
  "el-link": require("./ElLink").default,
  "el-button-group": require("./ElButtonGroup").default,
  "el-checkbox-group": require("./ElCheckboxGroup").default,
  i: require("./icon").default,
} as unknown as Record<string, TraversalHandler<any>>;
