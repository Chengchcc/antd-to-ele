<template>
    <div class="wrapper">
        <nav-title
            :title="form.project_name"
            :isShowBack="true"
            :isDetail="true">
            <div slot="detail" class="solt-detail">
                <a-tag v-if="formatStatus(form.status) === '全部'">{{
                    formatStatus(form.status)
                }}</a-tag>
                <!--迁移FIXME: type无法对应-->
                <a-tag
                    v-if="formatStatus(form.status) === '未开始'"
                    type="info"
                    >{{ formatStatus(form.status) }}</a-tag
                >
                <a-tag v-if="formatStatus(form.status) === '进行中'">{{
                    formatStatus(form.status)
                }}</a-tag>
                <!--迁移FIXME: type无法对应-->
                <a-tag
                    v-if="formatStatus(form.status) === '已完成'"
                    type="success"
                    >{{ formatStatus(form.status) }}</a-tag
                >
                <!--迁移FIXME: type无法对应-->
                <a-tag
                    v-if="formatStatus(form.status) === '延期'"
                    type="danger"
                    >{{ formatStatus(form.status) }}</a-tag
                >
                <span class="project_no">{{ project_no }}</span>
            </div>
        </nav-title>
        <div class="content-wrapper">
            <div
                v-if="
                    (user.isAssistant &&
                        form.project_assistants.includes(user.uid)) ||
                    user.isAdmin ||
                    (user.isManager && form.manager === user.uid) ||
                    user.isFinance ||
                    form.number_one === user.uid
                "
                class="operation-btn-box">
                <a-button type="primary" @click="checkHours">查看工时</a-button>
                <a-button
                    v-if="
                        (form.status === 1 ||
                            form.status === 2 ||
                            form.status === 5) &&
                        (user.isAdmin ||
                            (user.isManager && form.manager === user.uid))
                    "
                    type="primary"
                    @click="editDetail"
                    >编辑</a-button
                >
                <template
                    v-if="
                        (form.status === 2 || form.status === 5) &&
                        (user.isAdmin ||
                            (user.isManager && form.manager === user.uid))
                    ">
                    <!--迁移TODO: 请手动重构el-dropdown-->
                    <!--迁移TODO: 请手动重构el-dropdown-->
                    <el-dropdown>
                        <a-button type="plain" class="arrow-more">
                            <span class="el-dropdown-link"
                                >更多

                                <a-icon
                                    class="el-icon--right"
                                    type="down"></a-icon>
                            </span>
                        </a-button>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item>
                                <a-button type="link" @click="stopProject"
                                    >结束项目</a-button
                                >
                            </el-dropdown-item>
                            <el-dropdown-item>
                                <a-button type="link" @click="exportProject"
                                    >导出</a-button
                                >
                            </el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </template>
                <template v-else>
                    <a-button
                        v-if="
                            (form.status === 2 || form.status === 5) &&
                            (user.isAdmin ||
                                (user.isManager && form.manager === user.uid))
                        "
                        @click="stopProject"
                        >结束项目</a-button
                    >
                    <a-button @click="exportProject">导出</a-button>
                </template>
            </div>
            <a-tabs v-model="activeName" @tab-click="initcDate">
                <a-tab-pane tab="基本信息" key="first">
                    <!--迁移TODO: 请检查ref相关方法-->
                    <!--迁移FIXME: label-width无法对应-->
                    <a-form-model
                        ref="form"
                        class="formlist"
                        :model="form"
                        label-width="140px">
                        <a-row type="flex" class="rowgutter">
                            <a-col :span="8">
                                <a-form-model-item label="项目类型">
                                    <span v-if="form.is_aim_develop"
                                        >AIM研发</span
                                    >
                                    <span v-else>{{
                                        transferType(form.type)
                                    }}</span>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="产品名称">
                                    <div v-etooltip class="productsTitle">
                                        <span>
                                            {{
                                                transferProduct(form.product)
                                            }}</span
                                        >
                                    </div>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="法人组织">
                                    <div v-etooltip class="productsTitle">
                                        <span>
                                            {{
                                                transferCor(form.corporate_org)
                                            }}</span
                                        >
                                    </div>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row type="flex" class="rowgutter">
                            <a-col :span="8">
                                <a-form-model-item label="部门">
                                    <div v-etooltip class="productsTitle">
                                        <span>
                                            {{
                                                transferErp(form.erp_dept_id)
                                            }}</span
                                        >
                                    </div>
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="项目起止时间">
                                    {{ form.start_date }}至
                                    {{ form.end_date }}
                                </a-form-model-item>
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item
                                    v-if="!form.is_auto_fill_boolean"
                                    label="工时提醒周期">
                                    {{
                                        transferNotify(form.notify_type)
                                    }}</a-form-model-item
                                >
                            </a-col>
                        </a-row>
                        <a-row type="flex" class="rowgutter">
                            <a-col :span="8">
                                <a-form-model-item label="项目经理">
                                    {{
                                        transferManager(form.manager)
                                    }}</a-form-model-item
                                >
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="项目助理">
                                    <div v-etooltip class="productsTitle">
                                        <span>
                                            {{
                                                form.project_assistants.length
                                                    ? transferAssistant(
                                                          form.project_assistants
                                                      )
                                                    : "无"
                                            }}</span
                                        >
                                    </div>
                                </a-form-model-item>
                            </a-col>
                            <a-col v-if="form.type === 10" :span="8">
                                <a-form-model-item label="关联客户">
                                    {{
                                        form.customer || "无"
                                    }}</a-form-model-item
                                >
                            </a-col>
                            <a-col v-else :span="8">
                                <a-form-model-item label="项目预计总人天">
                                    {{ form.total_days }}</a-form-model-item
                                >
                            </a-col>
                        </a-row>
                        <a-row
                            v-if="!form.is_aim_develop && form.type === 10"
                            type="flex"
                            class="rowgutter">
                            <a-col :span="8">
                                <a-form-model-item label="关联合同">
                                    {{
                                        form.contract || "无"
                                    }}</a-form-model-item
                                >
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="项目预计总人天">
                                    {{ form.total_days }}</a-form-model-item
                                >
                            </a-col>
                            <a-col :span="8">
                                <a-form-model-item label="对应销售">
                                    {{
                                        transferManager(form.marketer_uid) ||
                                        "-"
                                    }}</a-form-model-item
                                >
                            </a-col>
                        </a-row>
                        <a-row
                            v-if="!form.is_aim_develop && form.type === 10"
                            type="flex"
                            class="rowgutter">
                            <a-col :span="8">
                                <a-form-model-item label="支持的产品">
                                    <div
                                        v-if="productsTitle.length"
                                        v-etooltip
                                        class="productsTitle">
                                        <span
                                            v-for="(
                                                pitem, pIndex
                                            ) in productsTitle"
                                            :key="pitem.id"
                                            >{{ pitem }}
                                            <i
                                                v-if="
                                                    pIndex !==
                                                    productsTitle.length - 1
                                                "
                                                >、</i
                                            >
                                        </span>
                                    </div>
                                    <div v-else>-</div>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row
                            v-if="form.type === 30 && !form.is_aim_develop"
                            type="flex"
                            class="rowgutter">
                            <a-col :span="8">
                                <a-form-model-item label="支持的产品">
                                    <div
                                        v-if="productsTitle.length"
                                        v-etooltip
                                        class="productsTitle">
                                        <span
                                            v-for="(
                                                pitem, pIndex
                                            ) in productsTitle"
                                            :key="pitem.id"
                                            >{{ pitem }}
                                            <i
                                                v-if="
                                                    pIndex !==
                                                    productsTitle.length - 1
                                                "
                                                >、</i
                                            >
                                        </span>
                                    </div>
                                    <div v-else>-</div>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <a-row v-if="!form.is_aim_develop" class="rowgutter">
                            <a-col :span="24">
                                <a-form-model-item label="项目描述">
                                    <div v-etooltip class="productsdesc">
                                        <span> {{ form.desc || "暂无" }}</span>
                                    </div>
                                </a-form-model-item>
                            </a-col>
                        </a-row>
                        <!-- AIM项目 -->
                        <section v-if="form.is_aim_develop">
                            <a-row type="flex" class="rowgutter">
                                <a-col :span="8">
                                    <a-form-model-item label="项目一号位">
                                        {{
                                            form.number_one === 0
                                                ? "-"
                                                : transferManager(
                                                      form.number_one
                                                  )
                                        }}</a-form-model-item
                                    >
                                </a-col>
                                <a-col :span="8">
                                    <a-form-model-item label="业务成熟度">
                                        {{
                                            form.business_mature === 0
                                                ? "-"
                                                : transferValue(
                                                      user.businessRipe,
                                                      form.business_mature
                                                  )
                                        }}</a-form-model-item
                                    >
                                </a-col>
                                <a-col :span="8">
                                    <a-form-model-item label="项目周期">
                                        {{
                                            form.cycle === 0
                                                ? "-"
                                                : transferValue(
                                                      user.project_range,
                                                      form.cycle
                                                  )
                                        }}</a-form-model-item
                                    >
                                </a-col>
                            </a-row>
                            <a-row type="flex" class="rowgutter">
                                <a-col :span="8">
                                    <a-form-model-item label="技术竞争力">
                                        {{
                                            form.competitive === 0
                                                ? "-"
                                                : transferValue(
                                                      user.tech_power,
                                                      form.competitive
                                                  )
                                        }}</a-form-model-item
                                    >
                                </a-col>
                                <a-col :span="8">
                                    <a-form-model-item label="技术成熟度">
                                        {{
                                            form.technology_mature === 0
                                                ? "-"
                                                : transferValue(
                                                      user.tech_ripe,
                                                      form.technology_mature
                                                  )
                                        }}</a-form-model-item
                                    >
                                </a-col>
                                <a-col :span="8">
                                    <a-form-model-item label="支持的产品">
                                        <div
                                            v-if="productsTitle.length"
                                            v-etooltip
                                            class="productsTitle">
                                            <span
                                                v-for="(
                                                    pitem, pIndex
                                                ) in productsTitle"
                                                :key="pitem.id"
                                                >{{ pitem }}
                                                <i
                                                    v-if="
                                                        pIndex !==
                                                        productsTitle.length - 1
                                                    "
                                                    >、</i
                                                >
                                            </span>
                                        </div>
                                        <div v-else>-</div>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row type="flex" class="rowgutter">
                                <a-col :span="8">
                                    <a-form-model-item label="市场空间">
                                        {{ form.market_space }}亿
                                    </a-form-model-item>
                                </a-col>
                                <a-col :span="8">
                                    <a-form-model-item label="立项材料">
                                        <div
                                            v-if="form.document_link"
                                            v-etooltip
                                            class="material">
                                            <a
                                                :href="form.document_link"
                                                target="view_window"
                                                >{{
                                                    form.document_name ||
                                                    form.document_link
                                                }}</a
                                            >
                                        </div>
                                        <span v-else>暂无</span>
                                    </a-form-model-item>
                                </a-col>
                                <a-col v-if="form.tree_path !== ''" :span="8">
                                    <a-form-model-item label="项目层级">
                                        <div>
                                            <span
                                                v-if="
                                                    form.project_level === '2'
                                                "
                                                >非</span
                                            >
                                            一级项目
                                        </div>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row
                                v-if="form.project_level === '2'"
                                type="flex"
                                class="rowgutter">
                                <a-col :span="8">
                                    <a-form-model-item label="母级项目">
                                        <div v-etooltip class="productsTitle">
                                            <span>
                                                {{ getLevelProjectName }}</span
                                            >
                                        </div>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row class="rowgutter">
                                <a-col :span="24">
                                    <a-form-model-item label="项目描述">
                                        <div
                                            id="productsdesc"
                                            v-etooltip
                                            class="productsdesc">
                                            <span>
                                                {{ form.desc || "暂无" }}</span
                                            >
                                        </div>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row class="rowgutter">
                                <a-col :span="24">
                                    <a-form-model-item label="项目目标">
                                        <div v-etooltip class="productsdesc">
                                            <span>
                                                {{
                                                    form.target || "暂无"
                                                }}</span
                                            >
                                        </div>
                                    </a-form-model-item>
                                </a-col>
                            </a-row>
                            <a-row
                                v-if="form.investment_item.length"
                                type="flex">
                                <a-col :span="24">
                                    <div class="require_box">
                                        <!--迁移FIXME: label-width无法对应-->
                                        <a-form-model-item
                                            label="项目人员投入"
                                            label-width="130px">
                                        </a-form-model-item>
                                    </div>
                                    <a-divider></a-divider>
                                    <!--迁移TODO: 请手动重构el-card-->
                                    <!--迁移TODO: 请手动重构el-card-->
                                    <el-card
                                        v-for="(
                                            item, index
                                        ) in form.investment_item"
                                        :key="index"
                                        class="box-card">
                                        <a-col :span="2">
                                            <!--迁移FIXME: label-width无法对应-->
                                            <a-form-model-item
                                                :label="`岗位${index + 1}`"
                                                label-width="70px">
                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :span="10">
                                            <!--迁移FIXME: label-width无法对应-->
                                            <a-form-model-item
                                                label="通道职级"
                                                label-width="110px">
                                                {{
                                                    investment_name(index)
                                                }}</a-form-model-item
                                            >
                                        </a-col>
                                        <a-col :span="12">
                                            <a-form-model-item label="人力投入">
                                                {{
                                                    form.investment_item[index]
                                                        .consume
                                                }}人天
                                            </a-form-model-item>
                                        </a-col>
                                    </el-card>
                                </a-col>
                            </a-row>
                            <a-row v-if="form.income_item.length" type="flex">
                                <a-col :span="24">
                                    <div class="require_box">
                                        <!--迁移FIXME: label-width无法对应-->
                                        <a-form-model-item
                                            label=" 预期成本与收益（按年）"
                                            label-width="200px">
                                        </a-form-model-item>
                                    </div>
                                    <a-divider></a-divider>
                                    <!--迁移TODO: 请手动重构el-card-->
                                    <!--迁移TODO: 请手动重构el-card-->
                                    <el-card
                                        v-for="(
                                            item, index
                                        ) in form.income_item"
                                        :key="index"
                                        class="box-card">
                                        <a-col :span="2">
                                            <!--迁移FIXME: label-width无法对应-->
                                            <a-form-model-item
                                                :label="`${item.year}`"
                                                label-width="70px">
                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :span="10" class="small-input">
                                            <!--迁移FIXME: label-width无法对应-->
                                            <a-form-model-item
                                                label="预期成本"
                                                label-width="110px">
                                                {{
                                                    form.income_item[index]
                                                        .expect_cost
                                                }}万
                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :span="12">
                                            <a-form-model-item label="预期收入">
                                                {{
                                                    form.income_item[index]
                                                        .expect_income
                                                }}万
                                            </a-form-model-item>
                                        </a-col>
                                    </el-card>
                                </a-col>
                            </a-row>
                            <a-row v-if="form.costList.length" type="flex">
                                <a-col :span="24">
                                    <!--迁移FIXME: label-width无法对应-->
                                    <a-form-model-item
                                        label=" 其他成本项（除人力成本外实际产生的成本项）"
                                        label-width="340px">
                                    </a-form-model-item>
                                    <a-divider></a-divider>
                                    <!--迁移TODO: 请手动重构el-card-->
                                    <!--迁移TODO: 请手动重构el-card-->
                                    <el-card
                                        v-for="(item, index) in form.costList"
                                        :key="index"
                                        class="box-card">
                                        <a-col :span="2">
                                            <!--迁移FIXME: label-width无法对应-->
                                            <a-form-model-item
                                                :label="`成本项${index + 1}`"
                                                label-width="70px">
                                            </a-form-model-item>
                                        </a-col>
                                        <a-col :span="10" class="small-input">
                                            <!--迁移FIXME: label-width无法对应-->
                                            <a-form-model-item
                                                label="成本项名称"
                                                label-width="110px">
                                                {{
                                                    form.costList[index]
                                                        .cost_item
                                                }}</a-form-model-item
                                            >
                                        </a-col>
                                        <a-col :span="12">
                                            <a-form-model-item
                                                label="成本项金额">
                                                {{
                                                    form.costList[index]
                                                        .expect_cost
                                                }}万
                                            </a-form-model-item>
                                        </a-col>
                                    </el-card>
                                </a-col>
                            </a-row>
                        </section>
                    </a-form-model>
                    <a-row>
                        <a-col v-if="form.rata_share.length" :span="12">
                            <!-- <el-form-item label="分摊比例："> -->
                            <div class="stackedLineChart-box proportionsec">
                                <div class="proportion_title">分摊比例</div>
                                <div class="proportion_box">
                                    <div id="chartDom"></div>
                                    <div class="chart_label_box">
                                        <section
                                            v-for="(
                                                label, index
                                            ) in form.rata_share"
                                            :key="index">
                                            <div
                                                v-if="label.value"
                                                class="chart_item_box">
                                                <span
                                                    class="chart_dot"
                                                    :class="`label_color${
                                                        index + 1
                                                    }`"></span>
                                                <div>
                                                    {{ label.name
                                                    }}{{ label.value }}%
                                                </div>
                                            </div>
                                        </section>
                                    </div>
                                </div>
                            </div>
                            <!-- </el-form-item> -->
                        </a-col>
                        <section
                            v-if="
                                form.can_view_operate &&
                                form.is_aim_develop &&
                                showCharts
                            ">
                            <a-col :span="12">
                                <div class="stackedLineChart-box">
                                    <div id="costIncomeLineChart"></div>
                                </div>
                            </a-col>
                            <a-col :span="12">
                                <div class="stackedLineChart-box">
                                    <div id="yieldLineChart"></div>
                                </div>
                            </a-col>
                            <a-col :span="12">
                                <div class="stackedLineChart-box">
                                    <div id="investmentBarChart"></div>
                                </div>
                            </a-col>
                        </section>
                    </a-row>
                </a-tab-pane>
                <a-tab-pane tab="项目成员" key="two">
                    <project-users
                        :data="form"
                        :pageType="pageType"
                        :groupDeptId="group_dept_id"
                        :editMilePost="editMilePost"
                        @deleteMember="deleteMember"
                        @pauseMember="pauseMember"
                        @deleteRealMember="deleteRealMember"
                        @startMember="startMember"
                        @addMember="addMember" />
                </a-tab-pane>
                <a-tab-pane v-if="form.has_child" tab="子项目" key="five">
                    <sub-projects-list
                        v-if="activeName === 'five'"
                        :projectId="form.id" />
                </a-tab-pane>
                <a-tab-pane
                    v-if="is_aim == 1 || form.is_aim_develop"
                    tab="里程碑"
                    key="three">
                    <mile-stone
                        v-if="activeName === 'three'"
                        ref="milePost"
                        :pageType="pageType"
                        :projectId="form.id"
                        :status="form.status"
                        :startDate="form.start_date"
                        :editMilePost="editMilePost"
                        :endDate="form.end_date"
                        :finishedDate="form.finished_date"
                        :projectUsers="form.project_users" />
                </a-tab-pane>
                <a-tab-pane tab="操作记录" key="four">
                    <!--迁移TODO: 请手动重构el-table-->
                    <!--迁移TODO: 请手动重构el-table-->
                    <el-table
                        width="100%"
                        :data="operateData"
                        :header-cell-style="{ background: '#fafafa' }"
                        size="medium">
                        <el-table-column
                            label="操作名称"
                            prop="operate"
                            width="150px" />
                        <el-table-column
                            label="操作人"
                            prop="user_id"
                            width="80px"
                            :formatter="formatUser" />
                        <el-table-column
                            label="操作时间"
                            prop="create_time"
                            width="160px" />
                        <el-table-column label="操作项" prop="change_content">
                            <template slot-scope="scope">
                                <div class="operate-content operate-box">
                                    {{ scope.row.change_content }}
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="change_content" type="expand">
                            <template slot-scope="scope">
                                <div class="operate-content">
                                    {{ scope.row.change_content }}
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                    <!-- <operate-record :data="operateRecordData"></operate-record> -->
                </a-tab-pane>
            </a-tabs>
        </div>
        <a-modal
            title="项目结束时间"
            :maskClosable="false"
            :visible.sync="dialogVisible"
            width="500px">
            <a-row type="flex" class="row-bg">项目日期:</a-row>
            <a-row type="flex" class="row-bg">
                <!--迁移TODO: 请手动重构el-date-picker-->
                <!--迁移TODO: 请手动重构el-date-picker-->
                <el-date-picker
                    v-model="currentDate[0]"
                    type="date"
                    readonly
                    :editable="false"
                    value-format="yyyy-MM-dd"
                    placeholder="选择日期" />
                <span class="separate">至</span>
                <!--迁移TODO: 请手动重构el-date-picker-->
                <!--迁移TODO: 请手动重构el-date-picker-->
                <el-date-picker
                    v-model="currentDate[1]"
                    type="date"
                    :editable="false"
                    :clearable="false"
                    value-format="yyyy-MM-dd"
                    :picker-options="pickerOptions()"
                    placeholder="选择日期" />
            </a-row>
            <p class="tip">
                开始日期不可选择。
                注：当项目执行到完结日期之后，项目状态则变为已完结，并且不允许继续填写工时。
            </p>
            <!-- <span class="warning"><i class="el-icon-warning"></i>项目暂停会清空当天及之后所有项目成员已经填写的工时，请谨慎操作！</span> -->
            <span slot="footer" class="dialog-footer">
                <a-button @click="dialogVisible = false">取 消</a-button>
                <a-button type="primary" @click="confirmStop">确 定</a-button>
            </span>
        </a-modal>
    </div>
</template>
<script>
import { mapGetters } from "vuex"
import navTitle from "@/components/navTitle"
import { msTimestampFormat } from "@/utils"
import projectService from "@/services/projectService"
import ProjectUsers from "./components/project-users.vue"
import subProjectsList from "./components/sub-projects-list.vue"
import MileStone from "../sub-project/components/mile-stone.vue"
import { getProductsFullPath } from "@/utils/business"
import { is_weixn } from "@/utils"
export default {
    components: {
        navTitle,
        ProjectUsers,
        MileStone,
        subProjectsList,
    },
    data() {
        return {
            activeName: "first",
            projectType: this.option["projectType"],
            projectState: this.option["projectState"],
            project_no: this.$route.query.id,
            // projectId: Number(this.$route.query.projectId) || this.form.id,
            // has_child: this.$route.query.has_child
            //     ? Number(this.$route.query.has_child) || this.form.has_child
            //     : 0,
            pageType: "detail",
            isDisabled: false,
            listVisible: false,
            container: null,
            treeData: {},
            group_dept_id: [], // 工时组Id
            managerUserList: [], // 项目经理列表
            operateData: [], // 操作记录（暂时只有创建记录，之后会优化）
            currentDate: [],
            dialogVisible: false,
            form: {
                type: 30, // 项目类型
                project_name: "", // 项目名称
                product: [], // 产品名称
                corporate_org: null, // 法人组织
                erp_dept_id: [], // 部门
                start_date: "", // 项目开始时间
                end_date: "", // 项目结束时间
                is_auto_fill: 0, // 是否自动填写工时
                is_auto_fill_boolean: false,
                notify_type: 0, // 工时提醒周期
                manager: null, // 项目经理
                project_assistants: [], // 项目助理
                total_days: null, // 天
                desc: "", // 项目描述
                customer: "", // 关联客户
                customer_eid: "", // 关联客户id
                contract: "", // 关联合同
                rata_share: [], // 分摊比例
                project_level: "1",
                id: Number(this.$route.query.projectId) || 0,
                has_child: this.$route.query.has_child
                    ? Number(this.$route.query.has_child)
                    : 0,
            },
            cost_and_income: { cost: [], income: [], year: [] },
            yield: { year: [], yield_rate: [] },
            investment_item: { salary: [], show_label: [] },
            editMilePost: false, // 编辑里程碑权限
            level_dic_options: [],
            level_project_options: [],
            max_end_date: "", //里程碑结束时间
            costIncomeLineChart: null,
            investmentBarChart: null,
            yieldLineChart: null,
            operateRecordData: [], // 操作记录
            operateChartsData: [],
            showCharts: false,
            is_aim: 0,
            link_milepost_sign: 0,
        }
    },
    computed: {
        ...mapGetters(["allUser", "user"]),
        getLevelProjectName() {
            const res = []
            let options = this.level_project_options
            this.form.level_project.forEach((key, depth) => {
                const item = options.find((row) => row.project_id === key)
                res.push(item.project_name)
                options = item.children
            })
            return res.join("/")
        },
        productsTitle() {
            if (!this.form.support_products) {
                return "-"
            }
            let products = []
            products = this.form.support_products.map((item) => {
                return this.getproductTitle(item)
            })
            return products
        },
        investment_name() {
            return function (index) {
                const res = []
                let options = this.level_dic_options
                this.form.investment_item[index].level_id.forEach(
                    (key, depth) => {
                        const item = options.find((row) => row.key === key)
                        res.push(item.value)
                        options = item.levels
                    }
                )
                return res.join("/")
            }
        },
    },
    created() {
        this.pageType = this.$route.meta.type
        this.is_aim = this.$route.query.is_aim
        this.link_milepost_sign = this.$route.query.link_milepost_sign
        this.getPassagewayLevelDic()
        this.getProjectTree()
        this.getLeader().then(() => {
            this.project_no = this.$route.query.id
            this.detail()
        })
        this.$route.query.tab ? (this.activeName = "three") : ""
    },
    mounted() {
        this.$nextTick(() => {
            window.onresize = () => {
                if (this.form.can_view_operate) {
                    if (
                        this.cost_and_income.cost.length &&
                        this.costIncomeLineChart
                    ) {
                        this.costIncomeLineChart.resize()
                        this.investmentBarChart.resize()
                        this.yieldLineChart.resize()
                    }
                }
            }
        })
    },
    beforeDestroy() {
        window.onresize = null
    },
    methods: {
        initcDate(val) {
            if (
                val.name === "first" &&
                this.form.can_view_operate &&
                this.costIncomeLineChart
            ) {
                this.$nextTick(() => {
                    this.costIncomeLineChart.resize()
                    this.investmentBarChart.resize()
                    this.yieldLineChart.resize()
                })
            }
        },
        getproductTitle(item) {
            const res = []
            let options = this.user.support_product
            item.forEach((key, depth) => {
                const item = options.find((row) => row.id === key)
                res.push(item.name)
                options = item.child
            })
            return res.join("/")
        },
        // 项目经理转换
        transferManager(manager) {
            return this.allUser[~~manager]
                ? this.allUser[~~manager].name
                : manager
        },
        // 项目类型转换
        transferType(type) {
            let item = this.projectType.find((item) => item.value === type)
            return item ? item.label : ""
        },
        // 业务成熟度转换
        transferValue(option, type) {
            let item = option.find((item) => item.value === type)
            return item ? item.label : ""
        },
        // 工时提醒周期
        transferNotify(notify_type) {
            let arr = ["天", "周", "月"]
            return arr[notify_type]
        },
        // 产品名称转换
        transferProduct(product) {
            let str = ""
            product.forEach((item, index) => {
                let _item = this.user.productName.find(
                    (_item) => _item.value === item
                )
                if (_item)
                    str =
                        str +
                        _item.label +
                        (index !== product.length - 1 ? "、" : "")
            })
            return str
        },
        // 项目助理转换
        transferAssistant(project_assistants) {
            let str = ""
            project_assistants.forEach((item, index) => {
                let _item = this.allUser[~~item]
                    ? this.allUser[~~item].name
                    : ""
                if (_item)
                    str =
                        str +
                        _item +
                        (index !== project_assistants.length - 1 ? "、" : "")
            })
            return str
        },
        // 法人组织转换
        transferCor(corporate_org) {
            let item = this.user.legalEntity.find(
                (item) => item.value === corporate_org
            )
            return item ? item.label : ""
        },
        // 部门转换
        transferErp(erp_dept_id) {
            let str = ""
            erp_dept_id.forEach((item, index) => {
                let _item = this.user.department.find(
                    (_item) => _item.value === item
                )
                if (_item)
                    str =
                        str +
                        _item.label +
                        (index !== erp_dept_id.length - 1 ? "、" : "")
            })
            return str
        },
        // 项目状态转换
        formatStatus(status) {
            let _item =
                this.projectState.find((item) => ~~item.value === ~~status) ||
                {}
            return _item.label
        },
        formatUser(row) {
            return this.allUser[~~row.user_id]
                ? this.allUser[~~row.user_id].name
                : ""
        },
        formatDate(row) {
            return this.$dayjs(row.date).format("YYYY-MM-DD")
        },
        pickerOptions() {
            return {
                disabledDate: (time) => {
                    let max_end_date = new Date(this.currentDate[0]).getTime()
                    if (
                        new Date().getTime() <
                        new Date(this.max_end_date).getTime()
                    ) {
                    } else {
                        new Date(this.currentDate[0]).getTime() <
                        new Date(this.max_end_date).getTime()
                            ? (max_end_date =
                                  new Date(this.max_end_date).getTime() -
                                  8.64e7)
                            : new Date(this.currentDate[0]).getTime()
                    }
                    return (
                        // 由于项目结束时间选取过长，调整到项目开始时间（不含）或里程碑结束时间- 当天（含）范围之内
                        time.getTime() < max_end_date ||
                        time.getTime() > Date.now()
                    )
                },
            }
        },
        // 获取项目详情
        async detail() {
            try {
                let data = await projectService.getSubDetail({
                    project_no: this.project_no,
                })
                data.product = data.product.map((item) => {
                    return ~~item
                })
                data.corporate_org = ~~data.corporate_org
                data.erp_dept_id = data.erp_dept_id.map((item) => {
                    return ~~item
                })
                data.is_auto_fill_boolean = !!data.is_auto_fill
                data.member_dept_id = data.member_dept_id || []
                if (data.project_users && data.project_users.length) {
                    // console.log(this.allUser)
                    data.project_users.forEach((item) => {
                        // console.log(this.allUser[item.user_id])
                        // let currentItem = this.allUserObject[item.user_id] || {}
                        item.name = this.allUser[item.user_id]
                            ? this.allUser[item.user_id].name
                            : item.user_id
                        item.depart_tree_path = this.allUser[item.user_id]
                            ? this.allUser[item.user_id].department_tree_name
                            : item.user_id
                        item.status_desc = this.allUser[item.user_id]
                            ? this.allUser[item.user_id].is_leave
                                ? "离职"
                                : "在职"
                            : item.user_id
                    })
                }
                data.project_users = data.project_users || []
                data.project_users.sort(
                    (a, b) =>
                        this.allUser[a.user_id].is_leave -
                        this.allUser[b.user_id].is_leave
                )
                this.operateData = data.record_item
                this.editMilePost =
                    (this.user.isAssistant &&
                        data.project_assistants.includes(this.user.uid)) ||
                    this.user.isAdmin ||
                    (this.user.isManager && data.manager === this.user.uid) ||
                    data.number_one === this.user.uid
                if (data.rata_share === "") {
                    data.rata_share = []
                } else {
                    data.rata_share = JSON.parse(data.rata_share)
                    const rata_share_sum = data.rata_share.reduce(
                        (sum, item) => {
                            return sum + item.value
                        },
                        0
                    )
                    if (rata_share_sum) {
                        this.$nextTick(() => {
                            this.shareProportionChartInit()
                        })
                    } else {
                        data.rata_share = []
                    }
                }
                this.form = data
                if (data.type !== 20) {
                    if (data.support_products.length) {
                        const productsArr = []
                        if (data.type === 10) {
                            console.log(data.support_products)
                            data.support_products.forEach((item) => {
                                productsArr.push(
                                    getProductsFullPath(
                                        item,
                                        this.user.support_product
                                    )
                                )
                            })
                        } else {
                            data.support_products.forEach((item) => {
                                productsArr.push(
                                    getProductsFullPath(
                                        item,
                                        this.devSupportProduct()
                                    )
                                )
                            })
                        }
                        this.form.support_products = productsArr
                    }
                }
                if (data.is_aim_develop === 1) {
                    this.form.investment_item = data.investment_item.map(
                        (item) => {
                            item.level_id = [item.passage_way_id, item.level_id]
                            return item
                        }
                    )
                    this.form.income_item = data.year_income_item
                    this.form.costList = data.other_income_item
                    const str1 = data.tree_path.substr(1) //删除首字符
                    const pathStr = str1.substring(0, str1.length - 1) //删除最后末字符
                    let pathArr = pathStr.split("/").map(Number)
                    pathArr.length === 1
                        ? this.$set(this.form, "project_level", "1")
                        : this.$set(this.form, "project_level", "2")
                    // 删除后端传入最后一项
                    pathArr.length > 1 ? pathArr.pop() : ""
                    this.form.level_project = pathArr
                    // this.form.tree_path = `/${pathArr.join("/")}/`
                    // let operateData = [
                    //     {
                    //         user_id: data.creator,
                    //         type: 0,
                    //         operate: "创建人",
                    //         create_time: data.create_time,
                    //         change_content: "",
                    //     },
                    // ]
                    // this.operateRecordData = operateData.concat(data.record_item)
                    if (data.can_view_operate) {
                        this.getOperateData()
                    }
                }
            } catch (error) {
                if (is_weixn()) {
                    return
                }
                this.$message.error(`获取项目详情失败！${error}`)
            }
        },
        async getPassagewayLevelDic() {
            try {
                const data = await projectService.getPassagewayLevelDic()
                this.level_dic_options = data.passage_ways
            } catch (error) {
                this.$message({
                    type: "error",
                    message: `获取渠道职级失败 ${error}`,
                })
            }
        },
        async getOperateData() {
            try {
                const data = await projectService.getOperateData({
                    project_no: this.project_no.toString(),
                })
                this.operateChartsData = data
                // cost_and_income // 收入成本数据
                // investment_item // 投入成本
                // yield //盈利率
                if (
                    !data.cost_and_income.length &&
                    !data.investment_item.length &&
                    !data.yield.length
                ) {
                    this.showCharts = false
                    return
                }
                this.showCharts = true
                this.cost_and_income.cost = data.cost_and_income.map((item) => {
                    return item.cost
                })
                this.cost_and_income.income = data.cost_and_income.map(
                    (item) => {
                        return item.income
                    }
                )
                this.cost_and_income.year = data.cost_and_income.map((item) => {
                    return item.year
                })
                this.yield.year = data.yield.map((item) => {
                    return item.year
                })
                this.yield.yield_rate = data.yield.map((item) => {
                    return item.yield_rate
                })
                this.investment_item.Salary = data.investment_item.map(
                    (item) => {
                        return item.Salary
                    }
                )
                this.investment_item.show_label = data.investment_item.map(
                    (item) => {
                        return item.show_label
                    }
                )
                this.$nextTick(() => {
                    this.initChart()
                })
            } catch (error) {
                if (error.status === 500) {
                    this.$message.error(`获取运营数据失败！`)
                } else {
                    this.$message.error(`获取运营数据失败！${error}`)
                }
            }
        },
        initChart() {
            this.operateChartsData.cost_and_income.length
                ? this.costIncomeChartInit()
                : ""
            this.operateChartsData.yield.length ? this.yieldChartInit() : ""
            this.operateChartsData.investment_item.length
                ? this.investmentChartInit()
                : ""
            this.costIncomeChartInit()
            this.yieldChartInit()
            this.investmentChartInit()
        },

        shareProportionChartInit() {
            const option = {
                tooltip: {
                    trigger: "item",
                    formatter: function (params, ticket, callback) {
                        return `${params.name}<br>占比：${params.value}%`
                    },
                },
                series: [
                    {
                        name: "",
                        type: "pie",
                        radius: ["60%", "80%"],
                        avoidLabelOverlap: false,
                        label: {
                            show: false,
                            position: "center",
                        },
                        emphasis: {
                            label: {
                                show: false,
                                fontSize: "40",
                                fontWeight: "bold",
                            },
                        },
                        labelLine: {
                            show: false,
                        },
                        data: this.form.rata_share,
                        itemStyle: {
                            normal: {
                                color: function (params) {
                                    var colorList = [
                                        "#597EF7",
                                        "#40A9FF",
                                        "#1BCDCA",
                                        "#FAAD14",
                                        "#F06E6D",
                                        "#FFD6E7",
                                        "#ADC6FF",
                                        "#95DE64",
                                        "#FF9C6E",
                                        "#F759AB",
                                        "#9254DE",
                                        "#FFEC3D",
                                    ]
                                    return colorList[params.dataIndex]
                                },
                            },
                        },
                    },
                ],
            }
            this.initChartFactory("chartDom", option)
        },
        // 成本/收入曲线
        costIncomeChartInit() {
            const option = {
                title: {
                    text: "成本/收入曲线",
                },
                tooltip: {
                    trigger: "axis",
                    formatter: function (params) {
                        let result = ""
                        const dotHtml =
                            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#f06e6d"></span>'
                        const dotHtml2 =
                            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(24, 144, 255, 1)"></span>'
                        result += `${params[0].axisValue}</br>${dotHtml}收入：${params[0].data}万</br>${dotHtml2}成本：${params[1].data}万`
                        return result
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                legend: {
                    data: ["成本", "收入"],
                },
                color: ["#f06e6d", "rgba(24, 144, 255, 1)"], //设置legend颜色
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.cost_and_income.year,
                    axisLine: {
                        lineStyle: {
                            type: "solid",
                            color: "#BFBFBF", //左边线的颜色
                            width: "1", //坐标线的宽度
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ["#d9d9d9"],
                            width: 0.5,
                            type: "solid",
                        },
                    },
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        formatter: "{value} （万）",
                    },
                    axisLine: {
                        lineStyle: {
                            type: "solid",
                            color: "#BFBFBF", //左边线的颜色
                            width: "1", //坐标线的宽度
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ["#d9d9d9"],
                            width: 0.5,
                            type: "solid",
                        },
                    },
                },
                series: [
                    {
                        name: "收入",
                        type: "line",
                        data: this.cost_and_income.income,
                    },
                    {
                        name: "成本",
                        type: "line",
                        data: this.cost_and_income.cost,
                    },
                ],
            }
            this.initChartFactory("costIncomeLineChart", option)
        },
        // 收益率曲线
        yieldChartInit() {
            const option = {
                title: {
                    text: "收益率曲线",
                },
                tooltip: {
                    trigger: "axis",
                    formatter: function (params) {
                        let result = ""
                        const dotHtml =
                            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:rgba(24, 144, 255, 1)"></span>'
                        result += `${params[0].axisValue}</br>${dotHtml}收益率：${params[0].data}%`
                        return result
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                color: ["rgba(24, 144, 255, 1)"], //设置legend颜色
                // toolbox: {
                //     feature: {
                //         saveAsImage: {},
                //     },
                // },
                xAxis: {
                    type: "category",
                    boundaryGap: false,
                    data: this.yield.year,
                    axisLine: {
                        lineStyle: {
                            type: "solid",
                            color: "#BFBFBF", //左边线的颜色
                            width: 1, //坐标线的宽度
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ["#d9d9d9"],
                            width: 0.5,
                            type: "solid",
                        },
                    },
                },
                yAxis: {
                    type: "value",
                    axisLabel: {
                        formatter: "{value} (%)",
                    },
                    axisLine: {
                        lineStyle: {
                            type: "solid",
                            color: "#BFBFBF", //左边线的颜色
                            width: 1, //坐标线的宽度
                        },
                    },
                    splitLine: {
                        show: true,
                        lineStyle: {
                            color: ["#d9d9d9"],
                            width: 0.5,
                            type: "solid",
                        },
                    },
                },
                series: [
                    {
                        name: "收益率",
                        type: "line",
                        stack: "总量",
                        data: this.yield.yield_rate,
                    },
                ],
            }
            this.initChartFactory("yieldLineChart", option)
        },
        // 项目人力投入
        investmentChartInit() {
            const option = {
                title: {
                    text: "项目人力投入",
                },
                tooltip: {
                    trigger: "axis",
                    axisPointer: {
                        // 坐标轴指示器，坐标轴触发有效
                        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
                    },
                    formatter: function (params) {
                        let result = ""
                        const dotHtml =
                            '<span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:#2769FF"></span>'
                        result += `${params[0].axisValue}</br>${dotHtml}项目人力投入：${params[0].data}元`
                        return result
                    },
                },
                grid: {
                    left: "3%",
                    right: "4%",
                    bottom: "3%",
                    containLabel: true,
                },
                xAxis: [
                    {
                        type: "category",
                        data: this.investment_item.show_label,
                        axisTick: {
                            alignWithLabel: true,
                        },
                        axisLine: {
                            lineStyle: {
                                type: "solid",
                                color: "#BFBFBF", //左边线的颜色
                                width: "1", //坐标线的宽度
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ["#d9d9d9"],
                                width: 0.5,
                                type: "solid",
                            },
                        },
                    },
                ],
                yAxis: [
                    {
                        type: "log",
                        // show: false,
                        axisLabel: {
                            formatter: "{value}（元）",
                        },
                        axisLine: {
                            lineStyle: {
                                type: "solid",
                                color: "#BFBFBF", //左边线的颜色
                                width: "1", //坐标线的宽度
                            },
                        },
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: ["#d9d9d9"],
                                width: 0.5,
                                type: "solid",
                            },
                        },
                    },
                ],
                color: ["#2769FF"], //设置legend颜色
                series: [
                    {
                        name: "项目人力投入",
                        type: "bar",
                        barWidth: "60",
                        data: this.investment_item.Salary,
                    },
                ],
            }
            this.initChartFactory("investmentBarChart", option)
        },
        // chart 工厂函数
        initChartFactory(dom, options) {
            const chartDom = document.getElementById(dom)
            this[dom] = this.$echarts.init(chartDom)
            const option = options
            option && this[dom].setOption(option)
        },
        goBack() {
            this.$router.go(-1)
        },
        async getLeader() {
            try {
                await this.$store.dispatch("user/getAllUserList")

                const data = await projectService.getLeader(this.params)
                let { manager_user_id, group_dept_id } = data
                if (manager_user_id && manager_user_id.length) {
                    manager_user_id.forEach((item) => {
                        let _item = this.allUser[~~item]
                        this.managerUserList.push({
                            label: _item.name,
                            value: _item.uid,
                            department: _item.department_name,
                            department_id: _item.department_id,
                        })
                    })
                }
                var _deptList = []
                if (group_dept_id && group_dept_id.length) {
                    group_dept_id.forEach((item) => {
                        if (item.split(",").length > 1) {
                            item.split(",").forEach((items) => {
                                _deptList.push(~~items)
                            })
                        } else {
                            _deptList.push(~~item)
                        }
                    })
                    this.group_dept_id = _deptList
                }
            } catch (error) {
                this.$message.error(`获取项目经理列表失败！${error}`)
            }
        },
        async pauseMember(row) {
            try {
                const data = await projectService.pauseMember({
                    project_no: this.project_no,
                    user_id: row.user_id,
                })
                let index = this.form.project_users.findIndex(
                    (item) => item.user_id === row.user_id
                )
                // this.$set(this.form.project_users[index], 'status', 2)
                this.form.project_users[index].status = 2
                // console.log(this.form.project_users)
                this.$message({
                    type: "success",
                    message: `已暂停${this.allUser[~~row.user_id].name}`,
                })
            } catch (error) {
                this.$message.error(`暂停成员失败！${error}`)
            }
        },
        async deleteRealMember(row) {
            try {
                const data = await projectService.deleteMember({
                    project_no: this.project_no,
                    user_id: row.user_id,
                })
                let index = this.form.project_users.findIndex(
                    (item) => item.user_id === row.user_id
                )
                this.form.project_users.splice(index, 1)
                this.$message({
                    type: "success",
                    message: `已删除${this.allUser[~~row.user_id].name}`,
                })
            } catch (error) {
                this.$message.error(`删除成员失败！${error}`)
            }
        },
        async startMember(row) {
            try {
                const data = await projectService.startMember({
                    project_no: this.project_no,
                    user_id: row.user_id,
                })
                if (data.code) {
                    this.$message({
                        message: data.message,
                        type: "error",
                    })
                    return
                }
                let index = this.form.project_users.findIndex(
                    (item) => item.user_id === row.user_id
                )
                this.form.project_users[index].status = 1
                // this.$set(this.form.project_users[index], 'status', 1)
                this.$message({
                    type: "success",
                    message: `已开启${this.allUser[~~row.user_id].name}`,
                })
            } catch (error) {
                this.$message.error(`开始成员失败！${error}`)
            }
        },
        addMember(item) {
            let { deptList, deptId } = item
            deptList.forEach((item) => {
                // let currentItem = this.allUserObject[item.id] || {}
                item.status_desc = this.allUser[item.id].is_leave
                    ? "离职"
                    : "在职"
                let alreadyItem =
                    this.form.project_users.find(
                        (_item) => _item.user_id === item.user_id
                    ) || {}
                this.$set(item, "status", alreadyItem.status || 1)
                this.$set(item, "is_fill_date", 0)
            })
            this.form.project_users = this.form.project_users.concat(deptList)
            this.form.member_dept_id = deptId
            if (this.pageType === "edit") {
                this.saveMember(deptList)
            }
        },
        async saveMember(list) {
            try {
                list.forEach((item) => {
                    item.start_date = this.form.start_date
                    item.end_date = this.form.end_date
                })
                const data = await projectService.addMember({
                    project_no: this.project_no,
                    project_users: list,
                })
                if (data.code) {
                    this.$message({
                        message: data.message,
                        type: "error",
                    })
                    return
                }
                this.$message({ type: "success", message: `项目成员编辑成功` })
            } catch (error) {
                this.$message.error(`添加成员失败！${error}`)
            }
        },
        deleteMember(row) {
            let index = this.form.project_users.findIndex(
                (item) => item.user_id === row.user_id
            )
            this.form.project_users.splice(index, 1)
        },
        // 查看工时
        checkHours() {
            this.$router.push({
                path: `/hours/hourslist`,
                query: {
                    id: this.form.id,
                },
            })
        },
        // 编辑项目
        editDetail() {
            this.$router.push(
                `/project/editproject?id=${this.project_no}&projectId=${this.form.id}`
            )
        },
        // 暂停或重启项目
        async stopProject() {
            this.currentDate = [
                this.form.start_date,
                msTimestampFormat(new Date() / 1000).split(" ")[0],
            ]
            try {
                const data = await projectService.projectStopCheck({
                    project_no: this.project_no,
                })
                if (data.can_stop) {
                    this.dialogVisible = true
                } else {
                    const that = this
                    that.max_end_date = data.max_end_date
                    this.$alert(
                        "<span>系统发现当前项目中还有尚未完成的里程碑，继续结束项目会将所有里程碑置为完成状态，是否继续？</span>",
                        "提示",
                        {
                            dangerouslyUseHTMLString: true,
                            showCancelButton: true,
                            confirmButtonText: "是的，里程碑全部完成",
                            cancelButtonText: "不，我要再看看",
                            callback(action) {
                                if (action === "confirm") {
                                    setTimeout(() => {
                                        that.dialogVisible = true
                                    }, 300)
                                }
                            },
                        }
                    )
                }
            } catch (error) {
                this.$message.error(`检查可暂停状态失败！${error}`)
            }
        },
        async confirmStop() {
            try {
                await projectService.stopProject({
                    project_no: this.project_no,
                    stop_date: this.currentDate[1],
                })
                this.$message({
                    type: "success",
                    message: `${this.form.project_name}已完成`,
                })
                this.detail()
                if (this.form.is_aim_develop) {
                    this.$refs.milePost.$emit("updata", true)
                }
                this.dialogVisible = false
            } catch (error) {
                this.$message.error(`暂停项目失败！${error}`)
            }
        },
        // 导出项目
        async exportProject() {
            try {
                projectService.exportProject({
                    project_no: this.project_no,
                })
            } catch (err) {
                this.$message.error(`导出项目失败！${err}`)
            }
        },
        // 获取项目树
        async getProjectTree() {
            try {
                const params = {
                    keyword: "",
                    type: 30,
                    self_project_id: 0,
                }
                const { list } = await projectService.getProjectTree(params)
                this.level_project_options = list
            } catch (error) {
                this.$message({
                    type: "error",
                    message: `获取项目树失败！ ${error.msg}`,
                })
            }
        },
        devSupportProduct() {
            const productArr = JSON.parse(
                JSON.stringify(this.user.support_product)
            )
            const support_product = productArr.map((item) => {
                if (item.child) {
                    item.child.map((childItem) => {
                        if (childItem.child) {
                            delete childItem.child
                        }
                    })
                }
                return item
            })
            return support_product
        },
    },
}
</script>
<style lang="scss" scoped>
.content-wrapper {
    position: relative;
    &:last-child {
        padding-top: 0;
    }
}
.title {
    font-size: 16px;
    margin-top: 0;
    font-weight: bold;
}
::v-deep .el-form {
    .el-form-item {
        margin-bottom: 2px;
        // .el-form-item__content {
        //     overflow: hidden;
        //     white-space: nowrap;
        //     text-overflow: ellipsis;
        // }
    }
}
::v-deep .el-divider {
    margin-top: 0;
}
.tree-wrapper {
    background: rgba(216, 216, 216, 0.22);
    width: 100%;
    height: 60vh;
    // padding: 20px 0;
    position: relative;
}
.button-wrapper {
    text-align: center;
}
.tools-wrapper {
    display: flex;
    position: absolute;
    width: 422px;
    height: 76px;
    background: #ffffff;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    left: 50%;
    margin-left: -211px;
    color: rgba(0, 0, 0, 0.65);
    font-size: 12px;
    // font-weight: bold;
    padding-left: 0;
    padding: 0 20px;
    cursor: pointer;
    li {
        display: flex;
        flex-direction: column;
        padding: 12px 0;
        flex: 1;
        align-items: center;
        position: relative;
        &:nth-child(3) {
            &:before {
                content: " ";
                position: absolute;
                width: 1px;
                height: 50%;
                left: 3px;
                background-color: rgba(194, 196, 199, 0.32);
                top: 19px;
            }
            &:after {
                content: " ";
                position: absolute;
                width: 1px;
                height: 50%;
                right: 3px;
                background-color: rgba(194, 196, 199, 0.32);
                top: 19px;
            }
        }
        img {
            width: 30px;
            height: 30px;
        }
    }
}
.material {
    color: #409eff;
    @include ellipsis();
}
#chartDom {
    min-width: 160px;
    max-width: 160px;
    height: 160px;
    margin-top: 16px;
}
.proportionsec {
    position: relative;
    display: flex;
    align-items: center;
}
.proportion_title {
    position: absolute;
    top: 10px;
    margin-left: 6px;
    font-size: 18px;
    font-weight: 700;
}
.proportion_box {
    margin: auto;
    min-width: 400px;
    display: flex;
    justify-content: space-between;
    .chart_label_box {
        margin-left: 10%;
        display: flex;
        flex-wrap: wrap;
        min-width: 240px;
        align-items: center;
        .chart_item_box {
            display: flex;
            width: 106px;
            font-size: 12px;
            align-items: center;
            height: 28px;
            box-sizing: border-box;
            .chart_dot {
                display: inline-block;
                min-width: 8px;
                max-width: 8px;
                height: 8px;
                border-radius: 50%;
                margin-right: 6px;
            }
        }
    }
}
$list-bg: #597ef7, #597ef7, #1bcdca, #faad14, #f06e6d, #ffd6e7, #adc6ff, #adc6ff,
    #95de64, #ff9c6e, #f759ab, #9254de, #9254de, #ffec3d;
@for $i from 1 to length($list-bg) + 1 {
    .label_color#{$i} {
        background: nth($list-bg, $i);
    }
}
.stackedLineChart-box {
    width: 94%;
    height: 300px;
    border: 1px solid #d9d9d9;
    box-sizing: border-box;
    padding: 10px;
    margin: 20px 0;
}
.barChart {
    width: 97%;
}
#costIncomeLineChart {
    width: 100%;
    height: 280px;
}
#yieldLineChart {
    width: 100%;
    height: 280px;
}
#investmentBarChart {
    width: 100%;
    height: 280px;
}
.rowgutter {
    padding: 16px 0;
}
.operation-btn-box {
    position: absolute;
    top: 16px;
    right: 30px;
    z-index: 100;
}
::v-deep .el-dialog__body {
    padding: 15px 20px;
    .separate {
        line-height: 32px;
        margin: 0 10px;
    }
    .tip {
        padding: 0 0 0 20px;
        position: relative;
        margin-bottom: 0;
        &::before {
            content: "*";
            color: #f56c6c;
            position: absolute;
            left: 10px;
            top: 3px;
        }
    }
    .el-row {
        padding-left: 15px;
        margin-bottom: 15px;
        &:first-child {
            font-size: 16px;
        }
    }
}
.solt-detail {
    display: flex;
    align-items: center;
    .project_no {
        font-size: 14px;
        color: rgba(0, 0, 0, 0.647058823529412);
        display: inline-block;
        margin-left: 14px;
        font-weight: normal;
    }
}
.require_box {
    font-size: 14px;
    color: #606266;
}
.box-card {
    width: 98%;
    margin: 20px auto;
    padding-bottom: 20px;
    .consume_box {
        display: flex;
        align-items: center;
    }
    span {
        width: 40px;
        text-align: right;
    }
}

.productsTitle {
    width: 96%;
    cursor: pointer;
    overflow: hidden; //隐藏文字
    text-overflow: ellipsis; //显示 ...
    white-space: nowrap; //不换行
}
.productsdesc {
    width: 100%;
    // overflow: hidden; //隐藏文字
    // text-overflow: ellipsis; //显示 ...
    // // white-space: nowrap; //不换行
    // display: -webkit-box;
    // -webkit-box-orient: vertical;
    // -webkit-line-clamp: 2;
}
.arrow-more {
    margin-left: 10px;
}
.operate-content {
    white-space: pre-wrap;
}
.operate-box {
    @include ellipsis;
}
</style>
