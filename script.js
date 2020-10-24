if ('serviceWorker' in navigator) {
    // register service worker
    navigator.serviceWorker.register('service-worker.js');
}

document.addEventListener("DOMContentLoaded", ()=>{
    let count = Number(window.localStorage.getItem("count"));
    if (!count) {
    window.localStorage.setItem("count", "0");
    }
    

let btn = document.getElementById('btn');
let notes =  document.getElementById('notes');

btn.addEventListener('click', addNotes);
notes.addEventListener('click', removeNotes);

function createNote(noteTitle, noteContent){

    let li = document.createElement("li");
    let a = document.createElement("a");
    let h2 = document.createElement("h2");
    let p = document.createElement("p");
    let xButton = document.createElement("Button");

    xButton.classList.add("delete");

    let xText = document.createTextNode("X");
    let h2Text = document.createTextNode(noteTitle);
    let pText = document.createTextNode(noteContent);

    h2.appendChild(h2Text);
    p.appendChild(pText);
    xButton.appendChild(xText);

    a.appendChild(h2);
    a.appendChild(xButton);
    a.appendChild(p);
    a.setAttribute("href", "#");

    li.appendChild(a);

    document.getElementById("notes").appendChild(li);

}

function addNotes(e){

    e.preventDefault();

   let noteTitle = document.getElementById('new-note-title').value;
   let noteContent = document.getElementById('new-note-content').value;
    
    noteTitle.value = ''
    noteContent.value = ''

   count +=1;
   window.localStorage.setItem("count", count);

   window.localStorage.setItem(noteTitle, noteContent);

    createNote(noteTitle, noteContent);
    document.getElementById("new-note-title").value = '';
      document.getElementById("new-note-content").value = '';

}

function removeNotes(e){

   if(e.target.classList.contains("delete")){
       if(confirm('Are you sure you want to delete this?')){
           let li = e.target.parentElement.parentElement;
           let ul = document.getElementById('notes');

           ul.removeChild(li);
       }

   }

}

for (i = 0; i < count + 1; i++) {
    let noteTitle = window.localStorage.key(i);
    let noteContent = window.localStorage.getItem(noteTitle);
  
    if (noteTitle !== "count" && noteTitle) {
      createNote(noteTitle, noteContent);
    }
  }
})

