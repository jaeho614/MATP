const inputTel = document.querySelector("#inputTel");
const divTel = document.querySelector("#divTel");
const inputAddr = document.querySelector("#inputAddr");
const divAddr = document.querySelector("#divAddr");
const modify_bfBtn = document.querySelector("#modify_bf");
const modify_afBtn = document.querySelector("#modify_af");


// modify_bfBtn.addEventListener("click", btnSwitch);
modify_bfBtn.addEventListener("click", modifyContent);

let MODIFY = false;
let content = [];

function modifyContent(event){
    event.preventDefault();
    if (!MODIFY) {
        inputTel.className = "";
        inputAddr.className = "";
        divTel.className = "hidden";
        divAddr.className = "hidden";
        modify_bfBtn.className = "hidden";
        modify_afBtn.className = "";
        inputTel.value = divTel.innerHTML;
        inputAddr.value = divAddr.innerHTML;
        MODIFY = true;
    } else {
        inputTel.className = "hidden";
        inputAddr.className = "hidden";
        divTel.className = "";
        divAddr.className = "";
        modify_bfBtn.className = "";
        modify_afBtn.className = "hidden";
        content.push(inputTel.value, inputAddr.value);
        divTel.innerHTML = content[0];
        divAddr.innerHTML = content[1];
        MODIFY = false;
    }
}