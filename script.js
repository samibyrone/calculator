const OPERATOR_RE = /[\+\-\*\/]/;

const isOperator = (value) => OPERATOR_RE.test(value);

class Calculator {
  constructor(el) {
    // select dom elements
    this.el = el;
    this.operands = {
      current: el.querySelector(".output > .operands.current"),
      previous: el.querySelector(".output > .operands.previous"),
    };

    // bind methods to the `this`
    this.handler = this.handler.bind(this);
    this.delete = this.delete.bind(this);
    this.reset = this.reset.bind(this);
    this.period = this.period.bind(this);
    this.number = this.number.bind(this);
    this.operator = this.operator.bind(this);
    this.compute = this.compute.bind(this);

    this.init();
  }

  init() {
    this.el.addEventListener("click", this.handler);
    this.reset();
  }

  handler(event) {
    const buttonIsClick = event.target.tagName === "BUTTON";

    if (buttonIsClick) {
      const value = event.target.innerText;

      switch (value) {
        case "AC":
          return this.reset();
        case "DEL":
          return this.delete();
        case ".":
          return this.period();
        case "=":
          return this.compute();
        default:
          if (isOperator(value)) return this.operator(value);
          return this.number(value);
      }
    }
  }

  reset() {
    this.updateOutput("", "current");
    this.updateOutput("", "previous");
  }

  delete() {
    const currentText = this.getOperandValue();
    const currentTextArray = currentText.split("");
    // remove last item
    currentTextArray.splice(currentTextArray.length - 1, 1);
    this.updateOutput(currentTextArray.join(""));
  }

  empty() {
    const currentText = this.getOperandValue();
    return currentText.length === 0;
  }

  endsWithAnOperator() {
    const currentText = this.getOperandValue();
    const lastCharacter = currentText[currentText.length - 1];
    return isOperator(lastCharacter);
  }

  endsWithAPeriod() {
    const currentText = this.getOperandValue();
    return currentText.endsWith(".");
  }

  lastPartContainsAPeriod() {
    const currentText = this.getOperandValue();
    const parts = currentText.split(new RegExp(OPERATOR_RE, "g"));
    const lastPart = parts[parts.length - 1] || "";
    return new RegExp(/\./, "g").test(lastPart);
  }

  shouldAddPeriod() {
    return (
      !this.empty() &&
      !this.endsWithAnOperator() &&
      !this.lastPartContainsAPeriod()
    );
  }

  shouldAddOperatorOrCompute() {
    return (
      !this.empty() && !this.endsWithAnOperator() && !this.endsWithAPeriod()
    );
  }

  operator(operator) {
    if (this.shouldAddOperatorOrCompute()) {
      const newCurrent = `${this.getOperandValue()}${operator}`;
      this.updateOutput(newCurrent);
    }
  }

  number(number) {
    const newCurrent = `${this.getOperandValue()}${number}`;
    this.updateOutput(newCurrent);
  }

  period() {
    if (this.shouldAddPeriod()) {
      const newCurrent = `${this.getOperandValue()}.`;
      this.updateOutput(newCurrent);
    }
  }

  compute() {
    if (this.shouldAddOperatorOrCompute()) {
      const result = eval(this.getOperandValue());
      this.updateOutput(result);
    }
  }

  updateOutput(value, position = "current") {
    this.operands[position].innerText = value;
  }

  getOperandValue(position = "current") {
    return this.operands[position].innerText;
  }
}

new Calculator(document.querySelector(".calculator"));
