/*
David's Calculator
Version 1.0
04/07/2020
Performs basic float arithmetic and memory functions. 
Scales to the browser window.
Accepts keyboard input.
*/

let num1 = 0;
let num2 = 0;
let memory = 0;
let allowNumInput = 1;
let operator = "+";

window.onkeypress = function(event) {
	let value = String.fromCharCode(parseInt(event.keyCode,10));
	let testRegex = /[\d+\-*/=.()]/;
	if (testRegex.test(value)) {
		buttonPress(value);
	}
}

window.onkeydown = function(event) {
	switch (event.keyCode) {
		case 27: // Esc
		case 46: // Del
		case 8:  // Backspace
			buttonPress("C");
			break; 
		case 13: // Enter
			event.preventDefault();
			buttonPress("=");
			break;
    }
};

function buttonPress(value) {
	console.log(`'${value}' button pressed.`);
	let expr = document.getElementById("expression");
	let exprArr = expr.innerText.split("");
	let res = document.getElementById("result");
	let resArr = res.innerText.split("");
	let numRegex = /[\d]/;
	let dpRegex = /\./;
	let opRegex = /^[+\-*/]$/;
	if (numRegex.test(value)) {
		if (allowNumInput == 0) {
			clearAll();
			buttonPress(value);
			return;
		}
		if (resArr == "0") {
			resArr = [];
		}
		resArr.push(value);
	}
	else if (value == "." && !dpRegex.test(resArr)) {
		resArr.push(value);
	}
	else if (opRegex.test(value)) {
		num2 = resArr.join("");
		num1 = evaluate();
		operator = value;
		exprArr = [num1, operator];
		resArr = [0];
		allowNumInput = 1;
	}
	else if (value == "=") {
		num2 = resArr.join("");
		num1 = evaluate();
		operator = "=";
		exprArr = [operator];
		resArr = [num1];
		allowNumInput = 0;
	}
	else if (value == "C") {
		clearAll();
		return;
	}
	else if (value == "MR") {
		resArr = [memory];
		allowNumInput = 0;
	}
	else if (value == "MS") {
		memory = parseFloat(resArr.join(""));
	}
	else if (value == "M+") {
		memory += parseFloat(resArr.join(""));
	}
	expr.innerText = exprArr.join("");
	res.innerText = resArr.join("");
	console.log(`num1 = ${num1}`);
	console.log(`num2 = ${num2}`);
	console.log(`operator = '${operator}'`);
	res.scrollLeft += 100;
}

function evaluate() {
	console.log(`The expression to be evaluated is ${num1} ${operator} ${num2}`);
	switch (operator) {
		case "+":
			return parseFloat(num1) + parseFloat(num2);
		case "-":
			return parseFloat(num1) - parseFloat(num2);
		case "*":
			return parseFloat(num1) * parseFloat(num2);
		case "/":
			return parseFloat(num1) / parseFloat(num2);
		case "=":
			return parseFloat(num2);
	}
}

function clearAll() {
	num1 = 0;
	num2 = 0;
	allowNumInput = 1;
	operator = "+";
	document.getElementById("expression").innerText = "";
	document.getElementById("result").innerText = "0";	
}
