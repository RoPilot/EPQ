var date = new Date();
let formattedDate = date.toLocaleDateString('en-GB');

var date = document.getElementById("date");
date.innerHTML = formattedDate;