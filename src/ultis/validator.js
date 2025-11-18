import methods from "validator";

class Validator {
  constructor(rules) {
    this.rules = rules;
    this.initiate();
  }

  initiate() {
    this.isValid = true;
    this.errors = {};
  }

  validate(state) {
    this.initiate();
    this.rules.forEach((rule) => {
      if (this.errors[rule.field]) return;
      // ép kiểu về dạng string để check
      const rawValue = state[rule.field] ?? "";
      const fieldValue =
        typeof rawValue === "number" ? rawValue.toString() : rawValue;
      const args = rule.args || [];
      const validationMethod =
        typeof rule.method === "string" ? methods[rule.method] : rule.method;

      if (validationMethod(fieldValue, ...args, state) !== rule.validWhen) {
        this.errors[rule.field] = rule.message;
        this.isValid = false;
      }
    });
    return this.errors;
  }
}

export default Validator;
