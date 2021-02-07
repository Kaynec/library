const savetoLocal=()=>{
  localStorage.setItem('array',JSON.stringify(myLibrary))
}
var stored = JSON.parse(localStorage.getItem("array"));

// Html Elements
const container = document.querySelector('#container')
const add= document.querySelector('#add')
// constructer
function Book(name,author,pages,read){
    this.name = name
    this.author=author
    this.pages=pages
    this.read=read
    this.ChangeRead=()=>{
    if (this.read){
      return `read`
    }else {
      return `Haven't read yet`
    }
    }
}
let myLibrary = []
// Adding Each Book To Array
function addBookToLibrary() {
  add.addEventListener('click',()=>{
    const name = document.getElementById('name').value
    const author=document.getElementById('author').value
    const pages=document.getElementById('pages').value
    const read=document.getElementById('read').checked 
    const newBook= new Book(name,author,pages,read)
    myLibrary.push(newBook)
    loopThrough(myLibrary)
    savetoLocal()
  })
}
// Function That Loops Through The Array 
function loopThrough(array){
  container.innerHTML=''
  for (let i =0 ;i<array.length;i++){
      if (array[i].name|| typeof array[i].pages.value==="number"||array[i].author){

      var x = document.getElementById("form");
      x.setAttribute('style','display:none')

    const div = document.createElement('div')
    div.classList.add('div')
    container.appendChild(div)

    const p1 = document.createElement('p')
    p1.textContent=`${array[i].name}`
    div.appendChild(p1)

    const p2=document.createElement('p')
    p2.textContent=`by ${array[i].author}`
    div.appendChild(p2)

    const input =document.createElement("INPUT");
    input.classList.add('input')
    input.setAttribute("type", "number");
    input.setAttribute('value',`${array[i].pages}`)
    input.setAttribute('max',`${array[i].pages}`)
    div.appendChild(input)

    const label = document.createElement('LABEL')
    label.classList.add('label')
    label.textContent='Read'
    div.appendChild(label)
    
    const input2 = document.createElement('INPUT')
    input2.classList.add('input')
    input2.style.textAlign='center'
    input2.setAttribute('type','checkbox')
    div.appendChild(input2)

    if (array[i].read){
      label.textContent='read'
      input2.checked=true
    }else {
      label.textContent=`haven't read yet`
      input2.checked=false
    }
    input2.addEventListener('click',(e)=>{
      if (input2.checked){
        label.textContent='read'
        array[i].read=true
      }else {
        array[i].read=false
        label.textContent=`haven't read yet`
      }
      savetoLocal()
    })

    const button = document.createElement('BUTTON')
    button.classList.add('input')
    button.classList.add('btn')
    
    button.innerHTML='remove'
    div.appendChild(button)

    div.classList.add('div')
    div.setAttribute('id',`${i}`)
    array[i].id=i
    button.addEventListener('click',(e)=>{
        myLibrary.splice(i,1)
        container.removeChild(div)
        savetoLocal()
    })
    }else {
      const p=document.getElementById('para')
      p.textContent='Please fill All Information'
    }
  }   
}
// Hide The Add Book button At refresh
const toggle = document.querySelector('#toggle')
toggle.addEventListener('click',myFunction())
function myFunction() {
  var x = document.getElementById("form");
  if (x.style.display === "none") {
    x.style.display = "grid";
  } else {
    x.style.display = "none";
  }
} 
// const changeText=(array)=>{
//   for (let i =0;i<array.length;i++){
//     const btn = document.querySelector('.btn')
//     const label =document.querySelector('.label')
//     btn.addEventListener('click',(e)=>{
//       if (btn.checked){
//         label.textContent=array.ChangeRead()
//         array.read=true
//       }else {
//         label.textContent=array.ChangeRead()
//         array.read=false
//       }
//     })
//   }
// }

// checking for array in loacl storage 
if (stored){
  myLibrary=stored
}
loopThrough(myLibrary)
addBookToLibrary()


