// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡';
const FULL_HEART = '♥';

// Your JavaScript code goes here!

document.addEventListener("DOMContentLoaded", () => {
  const likeGlyphs = document.querySelectorAll('.like-glyph');
  
  likeGlyphs.forEach(glyph => {
    glyph.addEventListener('click', (event) => {
      mimicServerCall()
        .then(() => {
          if (glyph.innerText === EMPTY_HEART) {
            glyph.innerText = FULL_HEART;
            glyph.classList.add('activated-heart');
          } else {
            glyph.innerText = EMPTY_HEART;
            glyph.classList.remove('activated-heart');
          }
        })
        .catch((error) => {
          const modal = document.getElementById('modal');
          const modalMessage = document.getElementById('modal-message');
          modalMessage.innerText = error;
          modal.classList.remove('hidden');
          setTimeout(() => {
            modal.classList.add('hidden');
          }, 3000);
        });
    });
  });
});

// Your code goes above this line!

//------------------------------------------------------------------------------
// Ignore after this point. Used only for demo purposes
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    console.log("The fake server at mimicServer called saw a request!");
    setTimeout(function() {
      if (config.forceFailure) reject("Failure was forced");
      let isRandomFailure = Math.random() < .2;
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
