const note = JSON.parse(localStorage.getItem('notes'));

function readMore(id) {
  const id_number = Number(id.slice(9)); // getting id number
  document.getElementById(`text${id_number}`).innerHTML = note[id_number].text; // expanding the note
}

function deleteNote(id) {
  document.getElementById(id).parentElement.remove(); // remove element from DOM
  
  const notes_len = note.length; // array length
  const mid_index_notes = notes_len-1 / 2; // middle index of the array
  
  const temp = note[id]; // hold the element in array note with index [ id] in a temporary variable
  // if id > middle index of notes array
  if(id > mid_index_notes) {
    // move the element in array with index [id] to the last position of the array
    for(let i = id; i < notes_len-1; i++)
      note[i] = note[i + 1]; // move each element of the second half of the array to its previous position
    note[notes_len-1] = temp; // push the element to the last position of the array
    note.pop(); // throw the last element out of the array
  }
  else {
    // move the element in array with index [id] to the last position of the array
    for(let i = id; i > 0; i--)
      note[i] = note[i - 1]; // move each element of the first half of the array to its next position
    note[0] = temp; // push the element to the first position of the array
    note.shift(); // throw the first element out of the array
  }
  
  // if note is a blank array
  if(note.length === 0) {
    localStorage.removeItem('notes'); // remove notes from localStorage
    
    // display background image and notes will be appearing here
    document.querySelector('.container').innerHTML = 
    `<img src="bg.svg" class="background" alt="background image" preload="auto">
    <div class="header">Notes will be appearing here</div>`;
  }
  else
    localStorage.setItem('notes', JSON.stringify(note)); // push the new note array to localStorage
}


document.addEventListener('DOMContentLoaded', () => {
  
  
  document.querySelector('button').onclick = () => {window.location.href = 'form.html';}

  if(note !== null) {

    const container = document.querySelector('.container');
    const notes_len = note.length;
    
    container.innerHTML = '';
    
    
    for(let i = 0; i < notes_len; i++) {
      
      let text_words = note[i].text.split(" "); // Get an array of the string
      let text = '';
      
      // if no. of words in the array <= 50
      if(text_words.length <= 50) {
        text = note[i].text; // the full note
      }
      // if no. of words > 50
      else {
        text = text_words.slice(0, 50).join(' '); // Get the first 50 words
        text += `\n...<button id="read-more${i}" class="read-more" onclick="readMore(this.id)">Read more</button>`; // Adding read more button
      }

      container.innerHTML += 
      `<div class="note">
      
        <div class="deleteBtn" id="${i}" onclick="deleteNote(this.id)">
        <img class="delBtnImg" src="deleteBtn.svg" alt="Delete Button">
        </div>
        
        <div class="title">
          ${note[i].title}
        </div>
        
        <div id="text${i}"" class="text">
          ${text}
        </div>
        
      </div>`;

      // .delBtnImg src --> https://icons8.com/icons/set/delete-button
    }
  }
});
