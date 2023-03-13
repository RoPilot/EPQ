  function build_references(pages){
    for (var i = 0; i < pages.length; i++) {
    

      // Create a new div element with the class "card"
      const card = document.createElement('div');
      card.classList.add('card');

      // Create a new div element with the class "card__content"
      const cardContent = document.createElement('div');
      cardContent.classList.add('card__content');

      // Create a new h2 element with the class "card__title"
      const cardTitle = document.createElement('h2');
      cardTitle.classList.add('card__title');

      // Create a new p element with the class "card__description"
      const cardDescription = document.createElement('p');
      cardDescription.classList.add('card__description');

      // Create a new button element with the class "card__view" and the ID "view-post"
      const cardButton = document.createElement('button');
      cardButton.classList.add('card__view');
      cardButton.setAttribute('id', 'view-post');
      cardButton.textContent = 'View This Post';

      // Append the title, description, and button elements to the card content element
      cardContent.appendChild(cardTitle);
      cardContent.appendChild(cardDescription);
      cardContent.appendChild(cardButton);

      // Append the card content element to the card element
      card.appendChild(cardContent);

      (function(index) {
        fetch('src/manifest.json')
          .then(response => response.json())
          .then(data => {
            if (pages[index]) {
              cardButton.onclick = function() {
                window.location.href='page-format.html?post=' + pages[index]
              }
              var search = pages[index].replace(/\.html$/, "");
              var title = data.Papers[pages[index]].Title;
              var desc = data.Papers[pages[index]].Description;
              console.log(title + " | " + desc);

              cardTitle.textContent = title;
              cardDescription.textContent = desc;

            }
          });
      })(i);

      // Find the "results grid" element and append the card element to it
      const resultsGrid = document.querySelector('.results-grid');
      resultsGrid.appendChild(card);

    }
}


var urlParams = new URLSearchParams(window.location.search);
var parameter = urlParams.get('post');
if (parameter == null){
    console.log("ERR | FALSE PARAMETER");
    window.location.href = 'research.html';
} else {
    console.log("#" + parameter);
    fetch('src/manifest.json')
    .then(response => response.json())
    .then(data => {
      var param = "#" + parameter
      var pages = data.Research[param];
      var results_title = document.querySelector('.container-title');
      var results_amount = document.querySelector(".container-searchedfor")
      if (pages) {
        results_title.innerHTML = "Results For " + param
        results_amount.innerHTML = "Search Found " + pages.length + " Pages";
        build_references(pages)
      } else {
        results_title.innerHTML = "Results For " + param
      };
    })

}