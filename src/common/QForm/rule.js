// {0} 代表表单字段名， {1} {2} 代表分别代表验证条件 range[0] range[1]
const errors = {
    notEmpty: "请输入{0}",
    max: "{0}最多为 {1} 个字符",
    min: "{0}最小为 {1} 个字符",
    fixedNum: "请输入{1}个字符",
    length: "{0}的长度在 {1} 到 {2} 个字符",
    number: "{0}必须是数字",
    intNum: "{0}必须是整数",
    floatNum: "{0}必须是整数或最多两位小数",
    string: "{0}必须是字母或者数字",
    noChinese: "{0}不能为中文",
    chinese: "{0}必须为中文"
  };
  
  const methods = {
    notEmpty: (v) => v || v === 0,
  
    min: (v, arr) => v.length >= arr[0],
  
    max: (v, arr) => v.length <= arr[0],
  
    fixedNum: (v, arr) => v.length === arr[0],
  
    length: (v, arr) => arr[0] <= v + "" && v + "" <= arr[1],
  
    number: (v) => /^\d+(\.\d+)?$/.test(v),
  
    intNum: (v) => /^\d*$/.test(v),
  
    floatNum: (v) => /^\d+(\.\d{1,2})?$/.test(v),
  
    string: (v) => /^[a-zA-Z0-9]*$/.test(v),
  
    chinese: (v) => /[\u4e00-\u9fa5]/.test(v),
  
    noChinese: (v) => !/[\u4e00-\u9fa5]/.test(v)
  };
  
  /**
   * @description: 生成 rules
   * @param {Object}
   * * @param {String} rule 要使用的规则名称
   * * @param {Array} range 规则数组
   * * @param {String} trigger 触发条件
   * * @param {String} label 表单字段名
   * * @param {Boolean} required 是否必填
   * * @return {Object} {required, validator, trigger, message?, type?}
   */
  export const getRule = ({
    rule,
    range,
    trigger = "blur",
    label = "",
    required = true
  }) => {
    let validator,
      cRule = methods[rule],
      cError = errors[rule];
  
    const result = {
      required,
      trigger
    };
  
    if (cRule) {
      validator = (rule, val, cb) => {
        if (cRule(val, range)) {
          cb();
        } else {
          if (range) {
            range.forEach((v, k) => {
              cError = cError.replace(`{${k + 1}}`, v);
            });
          }
          cError = cError.replace("{0}", label);
          cb(new Error(cError));
        }
      };
  
      result.validator = validator;
    } else {
      result.message = trigger === "change" ? "请选择" : "请输入";
    }
  
    return result;
  };
  
  export const R = {
    inputNotEmpty(param) {
      return getRule({
        rule: "notEmpty",
        ...param
      });
    },
  
    chooseNotEmpty(param) {
      return getRule({
        trigger: "change",
        ...param
      });
    },
  
    // todo: trigger has problem
    arrayNotEmpty(param) {
      return getRule({
        trigger: "change",
        type: "array",
        ...param
      });
    },
  
    intNumber(param) {
      return getRule({
        rule: "number",
        ...param
      });
    }
  };
  