  export function RenderCells(input_cell_container,N){
  for(let i=1;i<=N;i++){
  let cell_row = $(`<div class="cell_row" data-rowId=${i}></div>`)
  for(let j=1;j<=N;j++){
    let code = document.getElementsByClassName("column_name")[j-1].dataset.colcode
    // console.log(code);
    let cell = $(`<div class="input_cell" contenteditable="true" data-row=${i} data-col=${j} data-code=${code}></div>`)
    cell_row.append(cell);
  }
  input_cell_container.append(cell_row)
}
}   

