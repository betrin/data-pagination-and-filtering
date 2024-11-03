/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const header = document.querySelector('.header');
const studentList = document.querySelector('.student-list');
const pagination = document.querySelector('.link-list');

const studentsPerPage = 9;

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/



/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
function showPage(list, page) {
  var pageStart = (page * studentsPerPage) - studentsPerPage;
  var pageEnd = (page * studentsPerPage) - 1 ;
  studentList.innerHTML = "";

  for (let i = 0; i < list.length; i++) {
    if (i >= pageStart && i <= pageEnd){
      const html = `
        <li class="student-item cf student-${[i]}">
          <div class="student-details">
            <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
            <h3>${list[i].name.first + " " + list[i].name.last }</h3>
            <span class="email">${list[i].email}</span>
          </div>
          <div class="joined-details">
            <span class="date">${list[i].registered.date}</span>
          </div>
        </li>
      `
      studentList.insertAdjacentHTML("beforeend", html);
    }
  }
}

// add header search
const html = `
  <label for="search" class="student-search">
    <span>Search by name</span>
    <input id="search" placeholder="Search by name...">
    <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
  </label>
`
header.insertAdjacentHTML("beforeend", html);
const searchInput = header.querySelector('input');


// Search functionality event func
searchInput.addEventListener('keyup', () => {
  var userInput = searchInput.value.toLowerCase();
  const resultsData = [];

  for (let i = 0; i < data.length; i++) {
    if (data[i].name.first.toLowerCase().includes(userInput) || data[i].name.last.toLowerCase().includes(userInput)){
      resultsData.push(data[i]);
    }
  }

  if (resultsData.length > 0) {
    addPagination(resultsData);
    showPage(resultsData, 1);
  } else {
    const html = "<h3>No results were found</h3>";
    studentList.innerHTML = html;
    pagination.innerHTML =  '';
  }
});


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

function addPagination(list) {
  const numberOfPages = Math.ceil(list.length / studentsPerPage);
  pagination.innerHTML = "";
  
  for (let i = 1; i <= numberOfPages; i++) {
    const html = `
      <li>
        <button type="button">${i}</button>
      </li>
    `;
    pagination.insertAdjacentHTML("beforeend", html);
  }
  
  pagination.querySelector("button").classList.add("active");

  // click listener for page buttons
  pagination.addEventListener("click", (e) => {
    var activeButton = pagination.querySelector('.active');
    var btnClicked = e.target.closest("button");
    
     if (activeButton && btnClicked) {
      activeButton.classList.remove("active");
    }
  
    if (btnClicked) {
      btnClicked.classList.add("active");
      showPage(list, btnClicked.innerHTML);
    }
  })
}



// Call functions
addPagination(data);
showPage(data, 1);