  function buildResultsTags(pages){
    for (var i = 0; i < pages.length; i++) {
    
      const card = document.createElement('div');
      card.classList.add('card');

      const cardContent = document.createElement('div');
      cardContent.classList.add('card__content');

      const cardTitle = document.createElement('h2');
      cardTitle.classList.add('card__title');

      const cardDescription = document.createElement('p');
      cardDescription.classList.add('card__description');

      const cardButton = document.createElement('button');
      cardButton.classList.add('card__view');
      cardButton.setAttribute('id', 'view-post');
      cardButton.textContent = 'View This Post';

      cardContent.appendChild(cardTitle);
      cardContent.appendChild(cardDescription);
      cardContent.appendChild(cardButton);

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

      const resultsGrid = document.querySelector('.results-grid');
      resultsGrid.appendChild(card);

    }
};

function buildResultsName(results){
  results.forEach(paper => {
    const card = document.createElement('div');
    card.classList.add('card');
  
    const cardContent = document.createElement('div');
    cardContent.classList.add('card__content');
  
    const cardTitle = document.createElement('h2');
    cardTitle.classList.add('card__title');
    cardTitle.textContent = paper.Title
  
    const cardDescription = document.createElement('p');
    cardDescription.classList.add('card__description');
    cardDescription.textContent = paper.Description;
  
    const cardButton = document.createElement('button');
    cardButton.classList.add('card__view');
    cardButton.setAttribute('id', 'view-post');
    cardButton.textContent = 'View This Post';
    console.log(paper)
    cardButton.onclick = function() {
      var search = (paper.Title).replace(/\s+/g, "_");
      search = search.toLowerCase() + ".html"
      console.log(search)
      window.location.href='page-format.html?post=' + search
    }
  
    cardContent.appendChild(cardTitle);
    cardContent.appendChild(cardDescription);
    cardContent.appendChild(cardButton);
  
    card.appendChild(cardContent);

    const resultsGrid = document.querySelector('.results-grid');
    resultsGrid.appendChild(card);

  });
};

var urlParams = new URLSearchParams(window.location.search);
var post_param = urlParams.get('post');
var search_param = urlParams.get('search')
console.log(search_param)
if (post_param == null){
    console.log("ERR | FALSE PARAMETER");
    window.location.href = 'research.html';
} else if (search_param == 'file') {
  console.log(post_param);
  post_param = post_param.toLowerCase();
    fetch('src/manifest.json')
    .then(response => response.json())
    .then(data => {
      var results_title = document.querySelector('.container-title');
      var results_amount = document.querySelector(".container-searchedfor")
      results_title.innerHTML = "Results For " + post_param
      var papers = data.Papers;
      console.log(papers)
      var results = new Array();
      for (var key in papers) {
        if (papers.hasOwnProperty(key)) {
          var paper = papers[key];
          var title = paper.Title;
          title = title.toLowerCase();
          if (title.includes(post_param)) {
            console.log(title.toUpperCase() + " Returned Inside!");
            results.push(paper);
          }
        }
      }
      
      results_amount.innerHTML = "Search Found " + results.length + " Pages";

      buildResultsName(results)

    })
} else {
  console.log("#" + post_param);
    fetch('src/manifest.json')
    .then(response => response.json())
    .then(data => {
      var param = "#" + post_param
      var pages = data.Research[param];
      var results_title = document.querySelector('.container-title');
      var results_amount = document.querySelector(".container-searchedfor")
      if (pages) {
        results_title.innerHTML = "Results For " + param
        results_amount.innerHTML = "Search Found " + pages.length + " Pages";
        buildResultsTags(pages)
      } else {
        results_title.innerHTML = "Results For " + param
      };
    })
}