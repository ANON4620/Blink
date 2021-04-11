document.addEventListener('DOMContentLoaded', () => {
  
  const note = document.querySelector('#note');
  const title = document.querySelector('#title');
  const button = document.querySelector('#btn');
  
  const height = window.innerHeight - 400;
  
  
  note.style.height = `${height}px`;
  
  
  let notes = JSON.parse(localStorage.getItem('notes'));
  
  if(notes === null)
    notes = [];
  
  button.onclick = () => {
    
    const obj = {};
    obj.title = title.value;
    obj.text = note.value.trim();
    if(obj.text !== '') {
      obj.text = `<pre>${obj.text}</pre>`;
      notes.push(obj);
      localStorage.setItem('notes', JSON.stringify(notes));
      
      title.value = '';
      note.value = '';
      
      window.history.back();
    }
    
  }
});
