import {R, getRule} from '../../common/QForm/rule';

// 类型
const selectOption = [
    {
        value: 0,
        label: '待审核'
    },
    {
        value: 1,
        label: '上线'
    },
    {
        value: 2,
        label: '下线'
    },
    {
        value: 3,
        label: '审核失败'
    },
    {
        value: 4,
        label: '撤销通过'
    },
    {
        value: 5,
        label: '已删除'
    }
];

// base
export const formField = [
    {
        label: '纯文本：',
        value: 'text',
        type: 'text'
    },
    {
        label: '普通输入框：',
        value: 'input_normal_test',
        type: 'input',
        placeholder: '不能为空',
        rules: R.inputNotEmpty({label: '订单号'})
    },
    {
        label: '字数限制：',
        value: 'input_numlimit_test',
        type: 'input',
        placeholder: '最多 5 个字',
        rules: [R.inputNotEmpty({label: '产品名称'}), getRule({rule: 'max', range: [5]})]
    },
    {
        label: '选择框：',
        value: 'select_test',
        type: 'select',
        options: selectOption
    },
    {
        type: 'slot',
        label: 'Slot 测试：',
        value: 'hahaha'
    },
    {
        label: '日期时间：',
        value: 'date_test',
        type: 'date',
        dateType: 'datetime',
        valueFormat: 'yyyy-MM-dd hh:mm:ss',
        rules: R.chooseNotEmpty(),
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() < Date.now() - 24 * 60 * 60 * 1000;
            }
        }
    },
    {
        label: '数字：',
        value: 'number_test',
        type: 'number',
        placeholder: '请输入数字',
        suffix: '小时',
        rules: [R.inputNotEmpty({label: '数字'}), R.intNumber()]
    },
    {
        label: '文本域：',
        value: 'textarea_test',
        type: 'textarea',
        rules: R.inputNotEmpty()
    },
    {
        text: '提交',
        type: 'button',
        event: 'submit'
    },
    {
        text: '重置',
        type: 'button',
        event: 'reset',
        styleType: 'defalut'
    }
];

// grid
export const formGridField = [
    {
        label: '订单号：',
        value: 'order_no',
        type: 'input'
    },
    {
        label: '订单状态：',
        value: 'status',
        type: 'select',
        options: selectOption
    },
    {
        label: '出发地：',
        value: 'departure_city',
        type: 'input'
    },
    {
        label: '联系人：',
        value: 'contactUser',
        type: 'input'
    },
    {
        label: '联系人电话：',
        value: 'contactMobile',
        type: 'input'
    },
    {
        label: '销售/运营：',
        value: 'sale_name',
        type: 'input'
    },
    {
        label: '店铺：',
        value: 'shop_name',
        type: 'input'
    },
    {
        text: '搜索',
        type: 'button',
        event: 'search'
    }
];

// inline
export const formInlineField = [
    {
        label: '订单号：',
        value: 'order_no',
        type: 'input'
    },
    {
        label: '订单状态：',
        value: 'status',
        type: 'select',
        options: selectOption
    },
    {
        label: '出发地：',
        value: 'departure_city',
        type: 'input'
    },
    {
        text: '搜索',
        type: 'button',
        event: 'search'
    }
];
