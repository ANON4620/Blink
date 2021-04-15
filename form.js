document.addEventListener('DOMContentLoaded', () => {
  
  const title = document.querySelector('#title');
  const note = document.querySelector('#note');
  const submit = document.querySelector('#btn');
  
  const height = window.innerHeight - 400; // sets the hieght of the element #note
  
  
  note.style.height = `${height}px`;
  
  
  let notes = JSON.parse(localStorage.getItem('notes'));
  
  if(notes === null)
    notes = [];
  
  
  title.onclick = () => {
    title.style.borderBottom = '2px solid black';
  }
  
  note.onclick = () => {
    note.style.border = '2px solid black';
  }
  
  submit.onclick = () => {
    
    const obj = {};
    obj.title = title.value.trim();
    obj.note = note.value.trim();
    
    // check if the form is empty
    if(obj.title === '' || obj.note === '') {
      navigator.vibrate(100);
      if(obj.title === '')
        title.style.borderBottom = '2px solid red';
      if(obj.note === '')
        note.style.border = '2px solid red';
    }
    else {
      obj.note = `<pre>${obj.note}</pre>`;
      notes.push(obj);
      localStorage.setItem('notes', JSON.stringify(notes));
      
      title.value = '';
      note.value = '';
      
      window.location.href = 'index.html';
    }
  }
});


