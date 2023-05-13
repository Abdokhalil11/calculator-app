// selection
let numbers = document.querySelectorAll(".num");
let operations = document.querySelectorAll(".operation");
let equal = document.querySelector(".equal");
let screens = document.querySelector(".screen textarea");
let del = document.querySelector(".del");
let reset = document.querySelector(".rest");
let theme = document.querySelector(".change");
let result = [];

// change the theme
let changeTheme = () => {
  let obj = {
    themeOne: "themeTwo",
    themeTwo: "themeThree",
    themeThree: "themeOne",
  };
  theme.onclick = () => {
    let themes = obj[document.body.className];
    document.body.classList = "";
    document.body.classList.add(themes);
  };
};
changeTheme();

//active and not active
let activeFunction = (el) => {
  el.classList.add("active");
  setTimeout(() => {
    el.classList.remove("active");
  }, 200);
};

// put number in the screen
let isOperation = false;
let isDot = true;
let screenNumber = () => {
  numbers.forEach((num) => {
    num.onclick = () => {
      isOperation = true;
      if (num.textContent === ".") {
        if (isDot) {
          screens.textContent += ".";
          isDot = false;
        }
      } else {
        screens.textContent += num.textContent;
      }
      activeFunction(num);
    };
  });
};
screenNumber();

// operation function
let operationFunction = () => {
  operations.forEach((op) => {
    op.onclick = () => {
      activeFunction(op);
      if (isOperation) {
        screens.textContent += op.textContent;
      }
      isOperation = false;
      isDot = true;
      if (screens.textContent[0] === op.textContent) {
        screens.textContent = "";
      }
    };
  });
};
operationFunction();

// Equal function
let equalFunction = () => {
  equal.onclick = () => {
    activeFunction(equal);
    result.length = 0;
    isDot = true;
    result.push(screens.textContent);
    if (Number.isInteger(eval(result.join("")))) {
      screens.textContent = eval(result.join(""));
    } else {
      screens.textContent = eval(result.join("")).toFixed(5);
    }
    result.length = 0;
  };
};
equalFunction();

// clear screen
let ResetScreens = () => {
  reset.onclick = () => {
    activeFunction(reset);
    screens.innerHTML = "";
    result.length = 0;
    isDot = true;
  };
};
ResetScreens();

// delete function
let deleteFunction = () => {
  del.onclick = () => {
    activeFunction(del);
    result.pop();
    screens.textContent = screens.textContent.split("").slice(0, -1).join("");
    if (screens.textContent[screens.textContent.length - 1] === ".") {
      isDot = true;
    }
  };
};
deleteFunction();

