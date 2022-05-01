// import Component from "./Component";
import Component from "../index";

// class Subcomponent extends Component {
//   count = 0;

//   mount({ val }) {
//     val.textContent = this.count;
//   }

//   substractClick(e, { val }) {
//     val.textContent = --this.count;
//   }

//   addClick(e, { val }) {
//     val.textContent = ++this.count;
//   }
// }

// class Subcomponent extends Component {
//   count = 0;

//   mount({ val }) {
//     this.on("change", (newCount) => {
//       this.count = newCount;
//       val.textContent = this.count;
//     });
//     this.emit("change", this.count);
//   }

//   substractClick() {
//     this.emit("change", --this.count);
//   }

//   addClick() {
//     this.emit("change", ++this.count);
//   }
// }
class Subcomponent extends Component {
  count = 0;

  mount({ val }) {
    // this.on("change", (newCount) => {
    //   this.count = newCount;
    //   val.textContent = this.count;
    // });
    this.emit("change", this.count);
  }

  substractClick() {
    this.emit("change", --this.count);
  }

  addClick() {
    this.emit("change", ++this.count);
  }

  change(newCount, { val }) {
    this.count = newCount;
    val.textContent = this.count;
  }
}

class FromClass extends Component {
  intId;
  mount({ root, intVal, input, output, subcomponent, subcomponentValue }) {
    root.classList.add("active");

    let count = 0;
    this.intId = setInterval(() => (intVal.textContent = ++count), 1000);

    output.textContent = input.value;

    if (subcomponent) {
      const sub = Component.get(subcomponent[0])!;
      sub.on("change", (newValue) => {
        subcomponentValue.textContent = newValue;
      });
    }
  }

  unmount({ root }) {
    root.classList.remove("active");
    this.intId && clearInterval(this.intId);
  }
  addClick() {
    console.log("clicked add");
  }

  click() {
    console.log("clicked");
  }

  btnClick() {
    console.log("button click");
  }

  anchorClick(e) {
    e.preventDefault();
    console.log("anchor click");
  }

  inputInput(e, { output }) {
    output.textContent = e.target.value;
  }
}

const FromObject = {
  mount({ root, intVal, input, output }) {
    root.classList.add("active");

    let count = 0;
    this.intId = setInterval(() => (intVal.textContent = ++count), 1000);

    output.textContent = input.value;
  },

  unmount({ root }) {
    root.classList.remove("active");
    this.intId && clearInterval(this.intId);
  },

  click() {
    console.log("clicked");
  },

  btnClick() {
    console.log("button click");
  },

  anchorClick(e) {
    e.preventDefault();
    console.log("anchor click");
  },

  inputInput(e, { output }) {
    output.textContent = e.target.value;
  },
};

const FromFunction = function ({ root, intVal, input, output }) {
  root.classList.add("active");

  let count = 0;
  const intId = setInterval(() => (intVal.textContent = ++count), 1000);

  output.textContent = input.value;

  this.click = () => {
    console.log("clicked");
  };

  this.btnClick = () => console.log("button click");

  this.anchorClick = (e) => {
    e.preventDefault();
    console.log("anchor click");
  };

  this.inputInput = function (e) {
    output.textContent = e.target.value;
  };

  return () => {
    root.classList.remove("active");
    intId && clearInterval(intId);
  };
};

const FromArrowFunction = ({ root, intVal, btn, input, output, anchor }) => {
  root.classList.add("active");

  let count = 0;
  const intId = setInterval(() => (intVal.textContent = ++count), 1000);

  output.textContent = input.value;

  const click = () => {
    console.log("clicked");
  };

  const btnClick = (e) => {
    console.log("button click");
  };

  const anchorClick = (e) => {
    e.preventDefault();
    console.log("anchor click");
  };

  const inputInput = function (e) {
    output.textContent = e.target.value;
  };

  root.addEventListener("click", click);
  btn.addEventListener("click", btnClick);
  anchor.addEventListener("click", anchorClick);
  input.addEventListener("input", inputInput);

  // this.btnClick =

  return () => {
    root.classList.remove("active");
    intId && clearInterval(intId);

    root.removeEventListener("click", click);
    btn.removeEventListener("click", btnClick);
    anchor.addEventListener("click", anchorClick);
    input.removeEventListener("input", inputInput);
  };
};

Component.register({
  //
  FromClass,
  FromObject,
  FromFunction,
  FromArrowFunction,
  //
  Subcomponent,
});

Component.mount();

const firstComponent = document.getElementById("component")!;

const mountBtn = document.getElementById("mount")!;
const unmountBtn = document.getElementById("unmount")!;
const mountOneBtn = document.getElementById("mountOne")!;
const unmountOneBtn = document.getElementById("unmountOne")!;

mountBtn.addEventListener("click", () => {
  Component.mount();

  const firstComp = Component.get(firstComponent)!;
  console.log(Component.get(firstComponent));

  firstComp.on("btn.click", () => console.log("First component"));
});

unmountBtn.addEventListener("click", () => {
  Component.unmount();
});

mountOneBtn.addEventListener("click", () => {
  Component.mount(firstComponent);
});

unmountOneBtn.addEventListener("click", () => {
  Component.unmount(firstComponent);
});
