import form from "./form";
import result from "./result";
import "./app.css";

let resultEl;
let formEl;

document.addEventListener("DOMContentLoaded", async () => {
  formEl = document.createElement("div");
  formEl.innerHTML = form.render();
  document.body.appendChild(formEl);

  resultEl = document.createElement("div");
  resultEl.innerHTML = await result.render();
  document.body.appendChild(resultEl);
});

// HMR 켜지면 module.hot에 값이 들어옴
if (module.hot) {
  console.log("핫 모듈 켜짐");

  module.hot.accept("./result", async () => {
    console.log("result 모듈 변경됨");
    resultEl.innerHTML = await result.render();
  });

  module.hot.accept("./form", () => {
    console.log("form 모듈 변경됨");
    formEl.innerHTML = form.render();
  });
}

console.log("app.js");
