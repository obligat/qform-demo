<template>
    <el-form ref="form" :model="data" :class="className" v-bind="$attrs">
        <el-form-item
            v-for="(item, index) in getConfigList()"
            :key="index"
            :prop="item.value"
            :label="item.label"
            :rules="item.rules"
            :class="getItemClass(item)"
        >
            <!-- solt -->
            <template v-if="item.type === 'slot'">
                <slot :name="'form-' + item.value" />
            </template>

            <!-- 纯文本 -->
            <span v-if="item.type === 'text'" class="pure-txt">
                {{ data[item.value] }}
            </span>

            <!-- 普通输入框 -->
            <div class="flex-wrap" v-if="item.type === 'input'">
                <el-input
                    v-model="data[item.value]"
                    :type="item.type"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder || getPlaceholder(item)"
                    clearable
                    @focus="handleEvent(item.event)"
                />
                <span class="txt">{{ item.suffix }}</span>
            </div>

            <!-- 数值输入框 -->
            <div class="flex-wrap" v-if="item.type === 'number'">
                <el-input
                    v-model="data[item.value]"
                    :type="item.type"
                    :disabled="item.disabled"
                    :placeholder="item.placeholder || getPlaceholder(item)"
                    clearable
                    @focus="handleEvent(item.event)"
                />
                <span class="txt">{{ item.suffix }}</span>
            </div>

            <!-- 文本输入框 -->
            <el-input
                v-if="item.type === 'textarea'"
                v-model.trim="data[item.value]"
                :type="item.type"
                :disabled="item.disabled"
                :placeholder="item.placeholder || getPlaceholder(item)"
                :autosize="item.autosize || { minRows: 2, maxRows: 10 }"
                clearable
                @focus="handleEvent(item.event)"
            />

            <!-- 选择框 -->
            <el-select
                v-if="item.type === 'select'"
                v-model="data[item.value]"
                :disabled="item.disabled"
                :filterable="item.filterable"
                :placeholder="getPlaceholder(item)"
                clearable
                @change="handleEvent(item.event, data[item.value])"
            >
                <el-option
                    v-for="(v, k) in item.options"
                    :key="k"
                    :label="v.label"
                    :value="v.value"
                />
            </el-select>

            <!-- 日期选择框 -->
            <el-date-picker
                v-if="item.type === 'date'"
                v-model="data[item.value]"
                :value-format="item.valueFormat"
                :type="item.dateType"
                :picker-options="item.pickerOptions"
                :disabled="item.disabled"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :placeholder="getPlaceholder(item)"
                @focus="handleEvent(item.event)"
                clearable
            />

            <!-- 提交、重置 -->
            <el-button
                v-if="item.type === 'button'"
                :type="item.styleType || 'primary'"
                @click="handleEvent(item.event)"
            >
                {{ item.text }}
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    name: "QForm",
    props: {
        // 表单样式
        className: {
            type: String,
            default: "",
        },
        // 表单数据
        data: {
            type: Object,
            default: () => {},
        },
        // 相关字段
        fieldList: {
            type: Array,
            default: () => [],
        },
        refObj: {
            type: Object,
            default: () => {},
        },
    },
    data() {
        return {
            btnClass: "btn",
        };
    },
    watch: {
        data: {
            handler: function () {
                // 将form实例返回到父级
                this.$emit("update:refObj", this.$refs.form);
            },
            deep: true, // 深度监听
        },
    },
    mounted() {
        // 将form实例返回到父级
        this.$emit("update:refObj", this.$refs.form);
    },
    methods: {
        // 获取字段列表
        getConfigList() {
            return this.fieldList.filter((v) => !v.hidden);
        },

        // 获取 el-form-item class，默认给 button 添加样式
        getItemClass(item) {
            if (item.className) {
                return item.className;
            } else if (item.type === "button") {
                return this.btnClass;
            }
        },

        // 得到placeholder的显示
        getPlaceholder(row) {
            let placeholder;
            if (row.type === "input" || row.type === "textarea") {
                placeholder = "请输入";
            } else if (
                row.type === "select" ||
                row.type === "time" ||
                row.type === "date"
            ) {
                placeholder = "请选择";
            } else {
                placeholder = "";
            }
            return placeholder;
        },

        // 绑定的相关事件
        handleEvent(event, data) {
            switch (event) {
                case "submit":
                case "search":
                case "reset":
                    this.$emit(event, data);
                    this.$emit("handle-event", event, data);
                    break;
                default:
                    this.$emit("handle-event", event, data);
            }
        },
    },
};
</script>

<style lang="scss" scoped>
.flex-wrap {
    display: flex;
}

.btn {
    display: inline-block;
    margin-right: 10px;
}

.txt {
    display: inline-block;
    margin: auto 10px;
    white-space: nowrap;
}

.pure-txt {
    font-weight: bold;
}
</style>