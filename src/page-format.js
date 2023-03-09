function build_references(aTags){
    for (var i = 0; i < (aTags.length); i++) {
        var reference_text = aTags[i].getAttribute('full_reference');
        
        // CREATE A NEW ELEMENT
        const new_reference = document.createElement('div');
        new_reference.id = 'reference__card';
        new_reference.innerHTML = reference_text + ` [${i + 1}]`;

        // Add the new element to the document
        const parentElement = document.getElementById("reference-container");
        parentElement.appendChild(new_reference);
    }
}

const urlParams = new URLSearchParams(window.location.search);
const parameter = urlParams.get('post');
if (parameter == "${parameter}"){
    console.log("ERR | FALSE PARAMETER")
    window.location.href = 'research.html';
} else {
    console.log("Loading: " + parameter);
    
    fetch(`/papers/${parameter}`)
        .then(response => response.text())
        .then(data => {
        const mainTextDiv = document.getElementById('main-body-div');
        mainTextDiv.innerHTML = data;
        // build up the references
        var mainTextBody = document.getElementById('main-text-body');
        var aTags = mainTextBody.querySelectorAll('a');
        build_references(aTags)
    });
}



// -- // -- // -- // -- // -- // -- // -- // -- // -- //

var mainBodyDiv = document.getElementById('main-text-body');
var follower = document.getElementById('follower');
document.addEventListener('mouseover', function(event){
    if (event.target.nodeName === 'A' && event.target.parentNode === document.getElementById('main-text-body')) {
        var reference_mode = document.getElementById('reference-box')
        var isChecked = reference_mode.checked
        if (isChecked) {
            document.getElementById('follower').innerHTML = event.target.getAttribute('full_reference')
        } else {
            document.getElementById('follower').innerHTML = event.target.getAttribute('reference')
        }
        var follower = document.getElementById('follower');
        follower.style.visibility = 'visible';
        var dataValue = event.target.getAttribute('data');
    }
});

document.addEventListener('mouseout', function(event){
    if (event.target.nodeName === 'A' && event.target.parentNode === document.getElementById('main-text-body')) {
        var node = event.target.node;
        var follower = document.getElementById('follower');
        follower.style.visibility = 'hidden';
    }
});


// MOVEMENT OF THE MOUSE
document.addEventListener('mousemove', function(e){
        var follower = document.getElementById('follower');
        var posX = e.clientX - (follower.offsetWidth / 2);
        var posY = e.clientY - (follower.offsetHeight / 2);
        var rect = follower.getBoundingClientRect();
        var screenWidth = window.innerWidth;
        var screenHeight = window.innerHeight;

        // Check if the follower exceeds the screen boundaries
        if (posX + rect.width > screenWidth) {
            posX = e.clientX - rect.width;
        }
        if (posX < 0) {
            posX = e.clientX;
        }
        if (posY + rect.height > screenHeight) {
            posY = e.clientY - rect.height;
        }
        if (posY < 0) {
            posY = e.clientY;
        }

        follower.style.top = posY + 'px';
        follower.style.left = posX + 'px';
});
