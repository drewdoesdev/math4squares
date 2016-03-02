$(document).ready(function(){

	//Remove Box Event
	$('.boxContainer').on('click', '.deleteMe img', function(e){
		removeBox(e);
	});

	//Operator Validator
	$('.boxContainer').on('keyup', '.operator input', function(e){
		validateOperator(e);
	});

	//First Number Validator
	$('.boxContainer').on('blur', '.firstNumber input', function(e){
		validateNumbers(e);
	});

	//Second Number Validator
	$('.boxContainer').on('blur', '.secondNumber input', function(e){
		validateNumbers(e);
	});			

	//Math logic Event
	$('.boxContainer').on('blur', '.miniSection input', function(e){
		doMath(e);
	});

	//Add Box Event
	$('#addBox').click(function(){
		addBox();
	});

	//Clear Buttton Event
	$('#clearBtn').click(function(){
		clearBoxes();
	});
});

//************
// FUNCTIONS *
//************

//Adds new Math Module
function addBox(){
	var targetBox = $('#addBox');

	//Building Box
	var mathBox = document.createElement('div');
	$(mathBox).addClass('math box');
	$(mathBox).insertBefore(targetBox);

	//Now the 'X' on the top left...
	var deleteMeSec = document.createElement('div');
	$(deleteMeSec).addClass('deleteMe miniSection');
	$(mathBox).append(deleteMeSec);

	var deleteImg = document.createElement('img');
	$(deleteImg).attr('src','img/x.png');
	$(deleteMeSec).append(deleteImg);

	//...and the number input on the top right.
	var firstNumSec = document.createElement('div');
	$(firstNumSec).addClass('firstNumber miniSection');
	$(firstNumSec).insertAfter(deleteMeSec);

	var firstNumInp = document.createElement('input');
	$(firstNumInp).attr('type', 'text');
	$(firstNumInp).attr('value', 0);
	$(firstNumSec).append(firstNumInp);

	//Then the operator section on the bottom left...
	var operatorSec = document.createElement('div');
	$(operatorSec).addClass('operator miniSection');
	$(operatorSec).insertAfter(firstNumSec);

	var operatorSecInp = document.createElement('input');
	$(operatorSecInp).attr('type', 'text');
	$(operatorSecInp).attr('maxlength', 1);
	$(operatorSecInp).attr('placeholder', '+, -, *, /');
	$(operatorSec).append(operatorSecInp);

	//...And the second number input (on the bottom right).
	var secondNumSec = document.createElement('div');
	$(secondNumSec).addClass('secondNumber miniSection');
	$(secondNumSec).insertAfter(operatorSec);

	var secondNumInp = document.createElement('input');
	$(secondNumInp).attr('type','text');
	$(secondNumInp).attr('value', 0);
	$(secondNumSec).append(secondNumInp);

	//Finaly, the results section at the bottom
	var resultSec = document.createElement('div');
	$(resultSec).addClass('result section');
	$(resultSec).insertAfter(secondNumSec);

	var resultSecSpan = document.createElement('span');
	$(resultSecSpan).attr('id','product');
	$(resultSec).append(resultSecSpan);
}

//Arithmetic logic function
function doMath(e) {
	var firstNumber = parseInt($(e.target).closest('.math').find('.firstNumber input').val()); //First Number
	var secondNumber = parseInt($(e.target).closest('.math').find('.secondNumber input').val()); //Second Number
	var op = $(e.target).closest('.math').find('.operator input').val(); //Oporator Selector

	var result;

	//Filters Operator
	switch(op){
		case '+':
		  result = firstNumber + secondNumber;
		  break;

		case '-':
		  result = firstNumber - secondNumber;
		  break;

		case '/':
		  result = firstNumber/secondNumber;
		  break;

		case '*':
		  result = firstNumber*secondNumber;
		  break;

		case '%':
		  result = firstNumber%secondNumber;
		  break;

		default:
		  result = "^Need Op"
	}

	//Adds result to "result section"
	$(e.target).closest('.math').find('#product').text(result);
	result = 0;
}

//Validates Operator Space input
function validateOperator(e){
	var val = $(e.target).val();
	if(val != '+' && val != '-' && val != '/' && val != '*' && val != '%'){
		$(e.target).val('');
	}
}

//Validates Number Space Inputs
function validateNumbers(e){
	var val = $(e.target).val();
	if(isNaN(val) || val.length == 0){
		$(e.target).val(0);
	}
}

//Removes boxes when the user clicks the X
function removeBox(e){
    $(e.target).closest('.math').remove();
}

//Removes all boxes when clear button is clicked
function clearBoxes() {
	$('.math').remove();
}