"use strict";
/************************************* butons events********************************** */
const buttons = document.querySelectorAll(".act");
const custom = document.querySelector(".custom");
let valor = 0;
let item = [];

buttons.forEach(function(button){
    button.addEventListener("click", ()=>{
        if (!button.getAttribute("act")) {
            button.setAttribute("act", "yes");
            button.classList.replace("button", "buttonAct");    
            item.push(button);
            checkValue(button)
            unico();   
            resetAct()
            calculations(cachValue(valor));
            writeTip()
        }
         else{
            button.removeAttribute("act");
            button.classList.replace("buttonAct", "button");  
            valor = 0
            resetAct()
            unico()
            writeTip()
        }
    })
})

function unico(){
    if(item[1]){
        item[0].removeAttribute("act");
        item[0].classList.replace("buttonAct", "button");
        item.shift();
    }
}

function cachValue(valor) {
    if (valor => 0) {
       let  tip = valor/100;
        return tip;
    }
} 

function checkValue(button){
    if (button.getAttribute("placeholder")) {
        button.addEventListener("blur",()=>{
            valor = button.value
            console.log("yes");
            unico();   
            resetAct()
            calculations(cachValue(valor));
            writeTip()
        })
    }else{
        valor = button.id
    }
}
/********************************* alert required ******************************************** */
let input1 = document.querySelector(".number");
let input2 = document.getElementById("input2");
let spanHidden = document.getElementById("span_hidden");

input1.addEventListener("blur", function (event) {
    required()
    resetAct();
    calculations(cachValue(valor));
    writeTip()
  }, true);

input2.addEventListener("click", ()=>{
    input2.classList.replace("numberRed", "numberAct");
    spanHidden.classList.replace("sect1_span2", "span_hidden")
} )
input2.addEventListener("blur", function (event) {
    if (!input2.value) {
        required()
    }
    if (valor == 0) {
        alert("It is necessary to specify the amount of the tip")
    }
  }, true);

function required() {
    if (input1.value.length > 0 && input2.value.length == 0) {
        input2.classList.replace("numberAct", "numberRed")
        spanHidden.classList.replace("span_hidden", "sect1_span2")
    }
}
/********************************* reset ******************************************** */
const reset = document.getElementById("reset");
const label1 = document.getElementById("label1");
const label2 = document.getElementById("label2");

input2.addEventListener("blur", ()=>{
    resetAct();
    calculations(cachValue(valor));
    writeTip()
})
reset.addEventListener("click", ()=>{
    label1.innerHTML = "0.00";
    label2.innerHTML = "0.00";
})

function resetAct() {
    if (input1.value && input2.value && valor !== 0) {
        reset.classList.replace("resetOff", "reset")
        reset.disabled = false;
    } else{
        reset.classList.replace("reset", "resetOff")
        reset.disabled = true;
    }
}
/********************************* calculations ******************************************** */
let total;
let tipPerson;

function calculations(tip) {
    if (input1.value && input2.value && valor) {
        tipPerson = input1.value * tip / input2.value;
        total =  (tip + 1) * input1.value / input2.value;
    }else{console.log(("nop"));}
}

function writeTip() {
    if (input1.value && input2.value && valor !=0) {
        let titPersonEnd = tipPerson.toFixed(2);
        let totalEnd = total.toFixed(2);
        label1.innerHTML = titPersonEnd;
        label2.innerHTML = totalEnd; 
    }else {
        label1.innerHTML = "0.00";
        label2.innerHTML = "0.00";
    }
}