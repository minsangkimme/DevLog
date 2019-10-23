class Counter {
  constructor(number = 0) {
    this.count = number;
  }
  getCount() {
    return this.count;
  }
  increment(num=1) {
    this.count = this.count + (num * 1);
  }
  decrement(num=1) {
    this.count = this.count - (num * 1);
  }
}

const numberStateEl = document.querySelector('.count-state');
const incrementBtnEl = document.querySelector('.increment-btn');
const decrementBtnEl = document.querySelector('.decrement-btn');
const resetBtnEl = document.querySelector('.reset-btn');
const inputNumberEl = document.querySelector('.input-number');
const state = new Counter();

window.onload = function() {
  init();
};

const init = () => {
  numberStateEl.textContent = state.getCount();  
  incrementBtnEl.addEventListener('click', increment);
  decrementBtnEl.addEventListener('click', decrement);
  resetBtnEl.addEventListener('click', reset);
};

const increment = () => {
  const num = inputNumberEl.value.length !== 0 ?
                          Number(inputNumberEl.value) : undefined;

  state.increment(num);
  numberStateEl.textContent = state.getCount();
  inputNumberEl.value = '';
};

const decrement = () => {
  const num = inputNumberEl.value.length !== 0 ?
                          Number(inputNumberEl.value) : undefined;

  state.decrement(num);
  numberStateEl.textContent = state.getCount();
  inputNumberEl.value = '';
};

const reset = () => {
  state.count = 0;
  numberStateEl.textContent = state.getCount();
}
