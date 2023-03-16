import {RenderCells,selectCell,getRowCol,updateCell} from "./util_function.js"

$(document).ready(function(){
let input_cell_container = $(".input_cell_container")
let column_name_container = $(".column_name_container")
let row_name_continer = $(".row_name_container")  
let N = 100  

//rendering row and col cell  
for(let i=1;i<=N;i++){
 let code = getColumnName(i)
 let column = $(`<div class="column_name" data-colCode=${code} data-colId=${i}>${code}</div>`)
 column.appendTo(column_name_container)

  //apending row
  let row = $(`<div class="row_name" data-rowId=${i}>${i}</div>`)
  row.appendTo(row_name_continer)
} 

  //rendering cells
RenderCells(input_cell_container,N) 

 //making cells italic 
$('.icon_bold').click(function(){
 if($(this).hasClass('selected')){
   updateCell("font-weight","")
   // console.log('font-bold')
 }else{
   // console.log('font-bold')
   updateCell("font-weight","bold")
 }
})

 //making cells italic 
$('.icon_italic').click(function(){
 if($(this).hasClass('selected')){
   updateCell("font-style","")
   // console.log('font-bold')
 }else{
   // console.log('font-bold')
   updateCell("font-style","italic")
 }
})

 //making cells underlined
  $('.icon_underline').click(function(){
 if($(this).hasClass('selected')){
   updateCell("text-decoration","")
   // console.log('font-bold')
 }else{
   // console.log('font-bold')
   updateCell("text-decoration","underline")
 }
})

$('.align_icon').click(function(){
  $('.align_icon.selected').removeClass('selected')
  $(this).addClass('selected')
})

$('.style_icon').click(function(){
  $(this).toggleClass('selected')
})  

$('.input_cell').click(function(e){
  if(e.ctrlKey){
    $(this).addClass('selected')
    const {row,col,code} = getRowCol(e)
    // console.log(row,col,code)
    const topCellSelected = $(`#row-${row-1}-col-${col}`)
    const bottomCellSelected = $(`#row-${row+1}-col-${col}`)
    const leftCellSelected = $(`#row-${row}-col-${col-1}`)
    const rightCellSelected = $(`#row-${row}-col-${col+1}`)
    // console.log(topCellSelected,bottomCellSelected,leftCellSelected,rightCellSelected)
    if(row>1 && topCellSelected.hasClass('selected')){
      // console.log("top cell selected")
       $(this).addClass('top_cell_selected');
       topCellSelected.addClass('bottom_cell_selected')
       topCellSelected.css('border-bottom','none')
    }
    if(row<N && bottomCellSelected.hasClass('selected')){
     // console.log("bottom cell selected")
      $(this).addClass('bottom_cell_selected')
      $(this).css("border-bottom","none")
      bottomCellSelected.addClass('top_cell_selected')
    }
    if(col>1 && leftCellSelected.hasClass('selected')){
      // console.log("left cell selected")
      $(this).addClass('left_cell_selected')
      leftCellSelected.addClass('right_cell_selected')
      leftCellSelected.css('border-right','none')
    }
    if(col<N && rightCellSelected.hasClass('selected')){
            // console.log("right cell selected")
      $(this).css('border-right','none')
      $(this).addClass('right_cell_selected')
      rightCellSelected.addClass('left_cell_selected')
    }
  }else{
  $('.input_cell.selected').attr("contenteditable","false")
  selectCell(this)
  }
})

$('.input_cell').dblclick(function(){
  selectCell(this)
  $(this).attr('contenteditable',"true")
  $(this).focus()
})  

//making row cell and col cell scrollable  
  $(".input_cell_container").scroll(function(e){
    $(".column_name_container").scrollLeft(this.scrollLeft);
    $(".row_name_container").scrollTop(this.scrollTop);
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
