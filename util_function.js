export function RenderCells(input_cell_container,N){
  for(let i=1;i<=N;i++){
  let cell_row = $(`<div class="cell_row" data-rowId=${i}></div>`)
  for(let j=1;j<=N;j++){
    let code = document.getElementsByClassName("column_name")[j-1].dataset.colcode
    // console.log(code);
    let cell = $(`<div class="input_cell row-${i} col-${j}" id="row-${i}-col-${j}"  data-row=${i} data-col=${j} data-code=${code}></div>`)
    cell_row.append(cell);
  }
  input_cell_container.append(cell_row)
}
}   

export function selectCell(c){
  $('.input_cell.selected').removeClass('selected')
  $(c).addClass('selected')
}

export function getRowCol(c){
  // console.log(c)
  // console.log($('.input_cell.selected'))
  let cell = $('.input_cell.selected')
  // console.log("c : ",cell.attr('data-col'),cell.attr('data-row'))
  let row,col;
  if(c){
   row  = $(c).attr('data-row')
   col = $(c).attr('data-col')
  row = Number.parseInt(row)
  col = Number.parseInt(col)
  return {row,col}
  }else{
    let row = Number.parseInt(cell.attr('data-row'))
    let col = Number.parseInt(cell.attr('data-col'))
    return {row,col}
  }
}

// cell props
export const cellProps = {
  "width":"100",
  "height":"25",
  "color":"black",
  "background-color":'white',
  "font-style":'',
  'text-decoration':'',
  'font-weight':'',
  'text':'',
  'font-size':'16',
  'font-family':'Poppins',
  'text-align':'left'
}

export const cellData = {
  "sheet-1":{}
}

export function updateCell(property,value,selectedSheet,defaultProp){
  // console.log("updateCell",selectedSheet)
    $('.input_cell.selected').each(function(){
      $(this).css(property,value)
      let {row,col} = getRowCol(this)
      if(cellData[selectedSheet][row]){
         if(cellData[selectedSheet][row][col]){
             cellData[selectedSheet][row][col][property] = value
         }else{
            cellData[selectedSheet][row][col] = {...cellProps}
           cellData[selectedSheet][row][col][property] = value
         }   
      }else{
        cellData[selectedSheet][row] = {}
        cellData[selectedSheet][row][col] = {...cellProps}
        cellData[selectedSheet][row][col][property] = value
      }

      if(defaultProp && JSON.stringify(cellData[selectedSheet][row][col])===JSON.stringify(cellProps)){
          //then delete that cell
        delete cellData[selectedSheet][row][col]

        //check row is empty or not
        if(Object.keys(cellData[selectedSheet][row]).length==0){
          delete cellData[selectedSheet][row];
        }
        
      }
      
    })

  // console.log("cell data : ",cellData)
}

export function changeHeader(c,selectedSheet){
  const {row,col} = getRowCol(c)
  let cell_info = cellProps;
  if(cellData[selectedSheet][row] && cellData[selectedSheet][row][col]){
    cell_info = cellData[selectedSheet][row][col]
    // console.log(cell_info)
  }
  
cell_info['font-weight']?$('.icon_bold').addClass('selected'):$('.icon_bold').removeClass('selected')
cell_info['font-style']?$('.icon_italic').addClass('selected'):$('.icon_italic').removeClass('selected')
cell_info['text-decoration']?$('.icon_underline').addClass('selected'):$('.icon_underline').removeClass('selected')

const alignment = cell_info["text-align"]  
$('.align_icon.selected').removeClass('selected')
$('.align_icon.icon_'+alignment).addClass('selected')

// console.log(cell_info)
$('.selector.font_family').val(cell_info["font-family"])
$('.selector.font_size').val(cell_info["font-size"].split("px")[0]) 
  
}  

export function EmptySheet(selectedSheet){
  let sheetInfo = cellData[selectedSheet]
  // console.log("sheetInfo : ",sheetInfo)
  for(let row of Object.keys(sheetInfo)){
    // console.log("row : ",row,cellProps)
    for(let col of Object.keys(sheetInfo[row])){
      // console.log("col : ",col,cellProps)
      $(`#row-${row}-col-${col}`).text("")
      $(`#row-${row}-col-${col}`).css("background-color","white")
      $(`#row-${row}-col-${col}`).css("color","black")
      $(`#row-${row}-col-${col}`).css("text-align","left")
      $(`#row-${row}-col-${col}`).css("font-weight","")
      $(`#row-${row}-col-${col}`).css("font-style","")
      $(`#row-${row}-col-${col}`).css("text-decoration","")
      $(`#row-${row}-col-${col}`).css("font-family","Poppins")
      $(`#row-${row}-col-${col}`).css("font-size","16px")
    }
  }

    // console.log("empty sheet : ",cellData)
}

export function loadSheet(selectedSheet){
   let sheetInfo = cellData[selectedSheet]
  // console.log("loading sheet",sheetInfo)
  for(let row of Object.keys(sheetInfo)){
    for(let col of Object.keys(sheetInfo[row])){
      let cellInfo = sheetInfo[row][col]
      // console.log("cell Info",sheetInfo)
      $(`#row-${row}-col-${col}`).text(cellInfo['text'])
      $(`#row-${row}-col-${col}`).css("background-color",cellInfo["background-color"])
      $(`#row-${row}-col-${col}`).css('color',cellInfo['color'])
      $(`#row-${row}-col-${col}`).css("text-align",cellInfo["text-align"])
      $(`#row-${row}-col-${col}`).css("font-weight",cellInfo["font-weight"])
      $(`#row-${row}-col-${col}`).css("font-style",cellInfo["font-style"])
      $(`#row-${row}-col-${col}`).css("text-decoration",cellInfo["text-decoration"])
      $(`#row-${row}-col-${col}`).css("font-family",cellInfo["font-family"])
      $(`#row-${row}-col-${col}`).css("font-size",cellInfo["font-size"]+"px")
    }
  }

    // console.log("empty sheet : ",cellData)
}

export function renameSheet(old_name,new_name,same){
     console.log("new , old ,same : ",old_name,new_name,same)
     console.log("before rename : ",cellData)
     const sheet = cellData[old_name]
     delete cellData[old_name]
     cellData[new_name] = sheet
     console.log("after rename : ",cellData)  
     if(same){
       return new_name
     }
  return ""
}

export function deleteSheet(){
  // console.log("before deletion : ",cellData)
  let childElem = $('.sheet_tab_container')[0].childElementCount
  if(childElem===1){
    alert('Default sheet can not be deleted!')
    return ""
  }else{
    const prompt_ans = confirm("Are you sure !")
    if(prompt_ans){
       // console.log($('.sheet_tab_container')) 
      const sheetName = $('.sheet_tab.sheet_selected').text().trim().toLowerCase()

      //deleting from UI
      $('.sheet_tab.sheet_selected').remove()

      EmptySheet(sheetName)
      
      //deleting from cellData
    delete cellData[sheetName]

    const loadedSheet = $('.sheet_tab_container')[0].children[$('.sheet_tab_container')[0].childElementCount-1].innerText.trim().toLowerCase()

     loadSheet(loadedSheet)  
     
      //selected new sheet
$('.sheet_tab_container')[0].children[$('.sheet_tab_container')[0].childElementCount-1].classList.add('sheet_selected')
      // console.log($('.sheet_tab_container')) 
    // console.log("after deletion : ",cellData)  
     return loadedSheet; 
    }
    
  }
   // console.log($('.sheet_tab_container')[0].childElementCount)
}

export function deleteCell(row,col,selectedSheet){
      $(`#row-${row}-col-${col}`).text("")
      $(`#row-${row}-col-${col}`).css("background-color","white")
      $(`#row-${row}-col-${col}`).css("color","black")
      $(`#row-${row}-col-${col}`).css("text-align","left")
      $(`#row-${row}-col-${col}`).css("font-weight","")
      $(`#row-${row}-col-${col}`).css("font-style","")
      $(`#row-${row}-col-${col}`).css("text-decoration","")
      $(`#row-${row}-col-${col}`).css("font-family","Poppins")
      $(`#row-${row}-col-${col}`).css("font-size","16px") 
}