import {RenderCells,selectCell,getRowCol,updateCell,cellProps,cellData,changeHeader,EmptySheet,loadSheet,renameSheet,deleteSheet,deleteCell} from "./util_function.js"

export let selectedSheet = "sheet-1"
let totalSheet = 1
let lastlyAddedSheet = 1;
let renameSheetSelected = ""
let selectedCells = [];
let cut = false;

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

 //making cells bold
$('.icon_bold').click(function(){
 if($(this).hasClass('selected')){
   updateCell("font-weight","",selectedSheet,true)
   // console.log('font-bold')
 }else{
   // console.log('font-bold')
   updateCell("font-weight","bold",selectedSheet,false)
 }
})

 //making cells italic 
$('.icon_italic').click(function(){
 if($(this).hasClass('selected')){
   updateCell("font-style","",selectedSheet,true)
   // console.log('font-bold')
 }else{
   // console.log('font-bold')
   updateCell("font-style","italic",selectedSheet,false)
 }
})

 //making cells underlined
  $('.icon_underline').click(function(){
 if($(this).hasClass('selected')){
   updateCell("text-decoration","",selectedSheet,true)
   // console.log('font-bold')
 }else{
   // console.log('font-bold')
   updateCell("text-decoration","underline",selectedSheet,false)
 }
})

//making cell left align
  $('.icon_left').click(function(){
     if(!$(this).hasClass('selected')){
       updateCell('text-align','left',selectedSheet,false)
     }
  })

  //making cell center align
    $('.icon_center').click(function(){
     if($(this).hasClass('selected')){
       updateCell('text-align','left',selectedSheet,true)
     }else{
       updateCell('text-align','center',selectedSheet,false)
     }
  })

    //making cell right align
      $('.icon_right').click(function(){
     if($(this).hasClass('selected')){
       updateCell('text-align','left',selectedSheet,true)
     }else{
       updateCell('text-align','right',selectedSheet,false)
     }
  })

  //handeling Cell's font family and size ---start----
  $('.selector.font_family').change(function(e){
      updateCell('font-family',$(this).val(),selectedSheet,false)
    // console.log("this",e,font_family)
  })

  $('.selector.font_size').change(function(e){
    // const font_size = e.target.value
      updateCell('font-size',$(this).val()+"px",selectedSheet,false)
    // console.log("this",e,font_size)
  })  
 // Cell's font family and size ---end----

  //Cell's text storing ---Start---
   $('.input_cell').blur(function(){
     updateCell("text",$(this).text(),selectedSheet,false)
   })
   //Cell's text storing ---End---


  //getting background and text color --START--
  $('.color_picker').change(function(e){
    if(e.target.name==="color_picker_background"){
       updateCell("background-color",e.target.value,selectedSheet,true)
    }
    if(e.target.name==="color_picker_text"){
        updateCell("color",e.target.value,selectedSheet,true)
    }
  })

  //getting background and text color --END--

  //Add Sheet --START--
    $('.add_icon').click(function(){
       EmptySheet(selectedSheet);
       $('.sheet_tab.sheet_selected').removeClass('sheet_selected')
      let sheetName = "sheet-"+(lastlyAddedSheet+1)
      cellData[sheetName] = {}
      totalSheet+=1;
      lastlyAddedSheet+=1;
      selectedSheet = sheetName
      $('.sheet_tab_container').append(`<div class="sheet_tab sheet_selected">${sheetName} </div>`)
      //adding event listner on new sheet --START--
     addSheetEvent()
    //adding event listner on new sheet --END--  
    })
   //Add Sheet --END-- 

  //scrolling sheet tb container --START--
   $('.scroller_icon').click(function(e){
     // console.log("hh",e)
     let sheet_scroll = document.getElementsByClassName('sheet_tab_container')[0]
     if(e.target.id === "scroller_icon_left"){
        // console.log("scrollLeft : ",sheet_scroll.scrollLeft)
       sheet_scroll.scrollLeft = sheet_scroll.scrollLeft - 65
     }
     if(e.target.id === "scroller_icon_right"){
       // console.log("scrollRight : ",sheet_scroll.scrollLeft)
       sheet_scroll.scrollLeft = sheet_scroll.scrollLeft + 65
     }
   })

  //scrolling sheet tb container --END--

  // Selecting a Particular sheet --START--
  addSheetEvent()
  // Selecting a Particular sheet --END--

  //renaming sheet --START--
  $('.sheet_options_modal').click(function(e){
    if(e.target.className.includes('sheet_rename')){
      $('.sheet_rename_modal').css('visibility','visible')
      
    }
    if(e.target.className.includes('sheet_delete')){
      const result = deleteSheet()
      selectedSheet = result===""?selectedSheet:result
      totalSheet-=1;
      lastlyAddedSheet-=1;
    }
  })

   $('.action_buttons').click(function(e){
       
     if(e.target.className.includes('rename_button') && $('.new_sheet_name').val()){
       let new_name = $('.new_sheet_name').val().trim().toLowerCase().replaceAll(" ","-")
       if(Object.keys(cellData).includes(new_name)){
         alert("Sheet Already Exists!")
       }else{
       $('.new_sheet_name').val("")
       let same = $(renameSheetSelected).hasClass('sheet_selected')
       let old_name = $(renameSheetSelected).text().trim().toLowerCase()
       const result =   renameSheet(old_name,new_name,same) 

       selectedSheet = result===""?selectedSheet:result;

       // console.log("sheet renamed : ",selectedSheet)

       $(renameSheetSelected).text(new_name)
       
       $('.sheet_rename_modal').css('visibility','hidden')
       } 
     }
     
     if(e.target.className.includes('cancel_button')){
       $('.sheet_rename_modal').css('visibility','hidden')
     }
   })
  
  //renaming sheet --END--

  //adding copying cells feature --START--
  $('.icon_copy').click(function(){
    if(selectedCells.length>0)selectedCells = []
    $('.input_cell.selected').each(function(){
      const {row,col} = getRowCol(this)
      selectedCells.push([row,col])
       // console.log(selectedCells)
      
    })
  })
  
  //adding copying cells feature --END--

  //adding paste cells feature --START--
  $('.icon_paste').click(paste)

  $('.icon_cut').click(function(){
     $('.input_cell.selected').each(function(){
      const {row,col} = getRowCol(this)
      selectedCells.push([row,col])
    })
    cut = true
    // for(let cell of selectedCells){
    //   deleteCell(cell[0],cell[1],selectedSheet)
    // }
  })

  //adding paste cells feature --END--

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
    const {row,col} = getRowCol(this)
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
  changeHeader(this,selectedSheet)
  // console.log("selected sheet : ",selectedSheet)
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

function paste(){
    if(selectedCells.length===0){
      alert("Select cell for paste!")
      return ;
    }
    EmptySheet(selectedSheet)
    const {row,col} = getRowCol($('.input_cell.selected')[0])
    const rowDistance = row - selectedCells[0][0]
    const colDistance = col - selectedCells[0][1]
    for(let cell of selectedCells){
      const newRow = cell[0] + rowDistance
      const newCol = cell[1] + colDistance
      if(!cellData[selectedSheet][newRow]){
        cellData[selectedSheet][newRow] = {}
      }

      if(cellData[selectedSheet][cell[0]]!==undefined && cellData[selectedSheet][cell[0]][cell[1]]!==undefined){
        cellData[selectedSheet][newRow][newCol] = {...cellData[selectedSheet][cell[0]][cell[1]]}
      }
      
      if(cut && cellData[selectedSheet][cell[0]]!==undefined && cellData[selectedSheet][cell[0]][cell[1]]!==undefined){
        delete cellData[selectedSheet][cell[0]][cell[1]];
        if(Object.keys(cellData[selectedSheet][cell[0]]).length===0){
          delete cellData[selectedSheet][cell[0]]
        }
      }
    }
    loadSheet(selectedSheet)
    if(cut){
      selectedCells = []
      cut = false
    }
}

function addSheetEvent(){
      $('.sheet_tab.sheet_selected').click(function(e){
     if(!$(this).hasClass('sheet_selected')){
       selectSheet(this)
     }
  });

  $('.sheet_tab.sheet_selected').contextmenu(function(e){
    e.preventDefault()
    // console.log(e)
    selectSheet(e.target)
    $('.sheet_options_modal').css("left",`${e.clientX}px`)
    $('.sheet_options_modal').css("visibility","visible")
    renameSheetSelected = e.target
  });
  
}

 function selectSheet(elem){
  $('.sheet_tab.sheet_selected').removeClass('sheet_selected')
  $(elem).addClass('sheet_selected')
   EmptySheet(selectedSheet)
   selectedSheet = $.trim($(elem).text().toLowerCase())
   loadSheet(selectedSheet)
}

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

//event listner on window for removing sheet options modal
$('.container').click(function(){
  $('.sheet_options_modal').css("visibility","hidden")
})