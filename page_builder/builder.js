document.addEventListener("DOMContentLoaded", function() {

// CODE FOR TAGS
const tagInput = document.getElementById("tag-input");
const tagContainer = document.getElementById("tag-container");

let tags = [];

tagInput.addEventListener("keydown", function (event) {
if (event.code === "Enter") {
    event.preventDefault();

    const value = tagInput.value.trim();
    if (value === "") return;

    const tag = createTag(value);
    tagContainer.appendChild(tag);

    tags.push(value);
    tagInput.value = "";
}
});

function createTag(value) {
const tag = document.createElement("div");
tag.classList.add("tag");
tag.textContent = ("#" + value);

tag.addEventListener("click", function () {
    tagContainer.removeChild(tag);
    tags = tags.filter((tagValue) => tagValue !== value);
});

return tag;
}

// OTHER CODE

const inputText = document.getElementById('input-text');

inputText.addEventListener('keydown', function(event) {
  if (event.ctrlKey && event.key === 'b') {
    event.preventDefault();
    const selectedText = inputText.value.substring(inputText.selectionStart, inputText.selectionEnd);
    const ref = prompt("Enter reference:");
    const fullRef = prompt("Enter full reference:");
    const link = prompt("Enter link:");
    const linkHTML = `<a reference="${ref}" full_reference="${fullRef}" id="reference" href="${link}">${selectedText}</a>`;
    inputText.setRangeText(linkHTML, inputText.selectionStart, inputText.selectionEnd, "end");
  }
});

document.getElementById('build-page').addEventListener('click', function() {
    var title = (document.getElementById('title')).value;
    var desc = (document.getElementById('description')).value;
    var date = (document.getElementById('date')).value;
    var content = (document.getElementById('input-text')).value;

    var toWriteDate = `<p id="date">${date}</p>`;
    var toWriteTitle = `<h1 id="title">${title}</h1>`;
    var toWriteDesc = `<h2 id="description">${desc}</h2><div id="title-tags">`;

    for (let i=0; i < tags.length; i++){
        let tagName = tags[i];
        let formattedTag = `<a href="search-results.html?post=${tagName}" class="tag">#${tagName}</a>`;
        toWriteDesc += formattedTag;
        tags[i] = formattedTag;
    };

    var toWriteMain = `</div><p id="main-text-body">${content}<div id="follower"></div></p>`;

    var finalToWrite = toWriteDate + toWriteTitle + toWriteDesc + toWriteMain;

    document.getElementById('result').innerHTML = ""
    document.getElementById('result').innerHTML = finalToWrite
    console.log(finalToWrite)

    // MANIFEST.JSON ASSIST

    var manifestBox = document.getElementById("json");

    var suggestedDocumentPage = title.replace(" ", "_");
    suggestedDocumentPage = suggestedDocumentPage.toLowerCase();
    suggestedDocumentPage = suggestedDocumentPage + ".html"

    var text = `"${suggestedDocumentPage}": {\n  "Title": "${title}",\n  "Description": "${desc}"\n}`;
    manifestBox.innerHTML = text

    // RESEARCH.HTML

    var formatBox = document.getElementById("page-format");
    var img = document.getElementById("image").value;
    var img_txt = document.getElementById("image-text").value;

    for (let i=0; i < tags.length; i++){
      let tagName = tags[i];
      var formattedTag = `<a href="search-results.html?post=${tagName}" class="tag">#${tagName}</a>`;
      toWriteDesc += formattedTag;
      tags[i] = formattedTag;
    };

    var text =`<div class="card">
    <div class="card__image__container">
        <img src="img/${img}.png" alt="" class="card__img">
        <p class="hover-text">"${img_txt}"</p>
    </div>
    <div class="card__content">
        <button id="view-post" class="card__view" onclick=" window.location.href = 'page-format.html?post=chatgpt.html';">View This Post</button>
        <h2 class="card__title">${title}</h2><br>
        <p class="card__description">${desc}
        </p>
        <div class="card__tags">
            ${formattedTag}
        </div>
    </div>
</div>`;

    formatBox.innerHTML = text;


})


});