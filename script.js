import {RenderCells} from "./util_function.js"

$(document).ready(function(){
let input_cell_container = $(".input_cell_container")
let column_name_container = $(".column_name_container")
let row_name_continer = $(".row_name_container")  
let N = 100  
for(let i=1;i<=N;i++){
 let code = getColumnName(i)
 let column = $(`<div class="column_name" data-colCode=${code} data-colId=${i}>${code}</div>`)
 column.appendTo(column_name_container)

  //apending row
  let row = $(`<div class="row_name" data-rowId=${i}>${i}</div>`)
  row.appendTo(row_name_continer)
} 

//adding cell
// for(let i=1;i<=N;i++){
//   let cell_row = $(`<div class="cell_row" data-rowId=${i}></div>`)
//   for(let j=1;j<=N;j++){
//     let code = document.getElementsByClassName("column_name")[j-1].dataset.colcode
//     // console.log(code);
//     let cell = $(`<div class="input_cell" contenteditable="true" data-row=${i} data-col=${j} data-code=${code}></div>`)
//     cell_row.append(cell);
//   }
//   input_cell_container.append(cell_row)
// }
RenderCells(input_cell_container,N)

$('.align_icon').click(function(){
  $('.align_icon.selected').removeClass('selected')
  $(this).addClass('selected')
})

$('.style_icon').click(function(){
  $(this).toggleClass('selected')
})  

$('.input_cell').click(function(){
  $('.input_cell.selected').removeClass('selected')
  $(this).addClass('selected')
})  










  
})

function getColumnName(n)
{
	let result = "";
	while (n > 0)
	{
		// here index 0 corresponds to `A`, and 25 corresponds to `Z`
		let index = (n - 1) % 26;
		result = String.fromCharCode(index+65) + result;
		n = (n - 1) / 26;
	}
  if(result[0]==='@'){
    result = result.substring(1);
  }
	return result;
}
