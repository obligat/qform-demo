<template>
    <div>
        <el-tabs type="border-card">
            <el-tab-pane label="表单提交及校验">
                <!-- base -->
                <q-form
                    :ref-obj.sync="formInfo.ref"
                    :data="formInfo.data"
                    :field-list="formInfo.fieldList"
                    :label-width="formInfo.labelWidth"
                    @submit="onSubmit"
                    @reset="onReset('formInfo')"
                    className="form-wrap"
                />
            </el-tab-pane>
            <el-tab-pane label="表单搜索">
                <div class="m100">
                    <q-form
                        :ref-obj.sync="formGrid.ref"
                        :data="formGrid.data"
                        :field-list="formGrid.fieldList"
                        :label-width="formGrid.labelWidth"
                        @handle-event="onFormSearch"
                        className="grid"
                    />
                </div>
            </el-tab-pane>
            <el-tab-pane label="表单搜索-行内表单">
                <div class="m100">
                    <q-form
                        :ref-obj.sync="formInline.ref"
                        :data="formInline.data"
                        :field-list="formInline.fieldList"
                        :label-width="formInline.labelWidth"
                        @handle-event="onFormSearch"
                        inline
                    />
                </div>
            </el-tab-pane>
        </el-tabs>
    </div>
</template>

<script>
import QForm from "../../common/QForm/index";
import { formField, formGridField, formInlineField } from "./config";

export default {
    name: "QFormTest",
    components: {
        QForm,
    },

    data() {
        return {
            formInfo: {
                ref: null,
                data: {
                    text: "test",
                    select_test: "",
                    input_normal_test: "",
                    input_numlimit_test: "",
                    number_test: "",
                    date_test: "",
                    textarea_test: "",
                },
                fieldList: formField,
                labelWidth: "120px",
            },
            formGrid: {
                ref: null,
                data: {
                    order_no: "",
                    status: "",
                    departure_city: "",
                    contactUser: "",
                    contactMobile: "",
                    sale_name: "",
                    shop_name: "",
                },
                fieldList: formGridField,
                labelWidth: "100px",
            },
            formInline: {
                ref: null,
                data: {
                    order_no: "",
                    status: "",
                    departure_city: "",
                },
                fieldList: formInlineField,
                labelWidth: "100px",
            },
        };
    },

    methods: {
        // 表单提交
        onFormInfoEvent(event) {
            switch (event) {
                case "submit":
                    this.onSubmit();
                    break;
                case "reset":
                    this.formInfo.ref.resetFields();
                    break;
            }
        },

        onReset(form) {
            this[form].ref.resetFields();
        },

        onSubmit() {
            this.formInfo.ref.validate((valid) => {
                if (valid) {
                    alert("校验通过");
                } else {
                    alert("校验失败");
                }
            });
        },

        // 表单搜索
        onFormSearch(event) {
            switch (event) {
                case "search":
                    alert("searching...");
                    break;
            }
        },
    },
};
</script>

<style>
.form-wrap {
    margin: 20px auto;
    max-width: 800px;
    padding: 40px;
    border: 1px dashed #eee;
}

.m100 {
    margin: 100px 0;
}

.grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, 350px);
}

.inline-block {
    display: inline-block;
    margin-right: 10px;
}
</style>