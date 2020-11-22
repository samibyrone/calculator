const isOperator = value => /[\+\-\*\/]/g.test(value);

class Calculator {
  constructor(el) {
    // select dom elements
    this.el = el;
    this.operands = {
      current: el.querySelector('.output > .operands.current'),
      previous: el.querySelector('.output > .operands.previous'),
    };

    // bind methods to the `this`
    this.clickHandler = this.clickHandler.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handlePeriod = this.handlePeriod.bind(this);
    this.handleNumber = this.handleNumber.bind(this);
    this.handleOperator = this.handleOperator.bind(this);
    this.handleEqualsTo = this.handleEqualsTo.bind(this);

    this.init();
  }

  init() {
    this.el.addEventListener('click', this.clickHandler);
    this.updateOutputs('', '');
  }
  
  clickHandler(event) {
    if (event.target.tagName === 'BUTTON') {
      const value = event.target.innerText;

      switch(value) {
        case 'AC':
          this.handleClear();
          break;
        case 'DEL':
          this.handleDelete();
          break;
        case '.':
          this.handlePeriod();
          break;
        case '=':
          this.handleEqualsTo();
          break;
        default: {
          if (isOperator(value)) {
            this.handleOperator(value);
            break;
          }

          this.handleNumber(value);
          break;
        }
      }
    }
  }

  handleClear() {
    console.log('Clear output');
  }

  handleDelete() {
    const currentText = this.currentOutput;
    currentText.slice(currentText.length - 1);
    this.updateOutputs(currentText);
  }

  handleOperator(operator) {
    console.log(operator + ' was clicked');
  }

  handleNumber(number) {
    console.log(number + ' was clicked');
  }

  handlePeriod() {
    console.log('. was clicked');
  }

  handleEqualsTo() {
    console.log('Handle equals to');
  }

  updateOutputs(current, previous) {
    this.operands.current.innerText = previous;
    this.operands.previous.innerText = current;
  }
}


new Calculator(document.querySelector('.calculator'));
