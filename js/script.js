// Variables
const page = document.querySelector('.page');
const studentList = Array.from(document.querySelectorAll('.student-item'));
const pageHeader = document.querySelector('.page-header');
const h2 = document.querySelector('h2');
const perPage = 10;

// Show only 10 students per page
function showPage(list, page) {
	list.forEach((item, index) => {
		(index >= ((page * perPage) - perPage) && index <= ((page * perPage) - 1)) ? item.style.display = 'block': item.style.display = 'none';
	});
}

showPage(studentList, 1);

// Create and append the pagination links to the page
function appendPageLinks(listItems) {

	// remove pagination if it exists
	clearPage();

	// Calculate the number of pages needed
	const numOfPages = Math.ceil(listItems.length / perPage);

	// Create the pagination div
	const pageDiv = document.createElement('div');
	pageDiv.className = 'pagination';
	page.appendChild(pageDiv);

	// Create  ul 
	const ul = document.createElement('ul');
	pageDiv.appendChild(ul);

	// Create a list  with a link for each page 
	for (let i = 0; i < numOfPages; i++) {
		const li = document.createElement('li');
		const a = document.createElement('a');
		a.setAttribute('href', '#');
		a.textContent = i + 1;
		ul.appendChild(li);
		li.appendChild(a);
	}

	// Add the active class to the first link in the list
	const pageLink = document.querySelector('a');
	pageLink.className = 'active';
}
appendPageLinks(studentList);

// Create search input and button
function appendSearch() {

	// Create the search div
	const searchDiv = document.createElement('div');
	searchDiv.className = 'student-search';
	pageHeader.appendChild(searchDiv);

	// Create the input
	const input = document.createElement('input');
	input.setAttribute('placeholder', 'Search for students...');
	searchDiv.appendChild(input);

	// Create the button
	const button = document.createElement('button');
	button.textContent = 'Search';
	searchDiv.appendChild(button);
}

// Search the list of students
function search() {
	studentList.forEach(item => item.style.display = 'none');

	// Get the input value
	const input = document.querySelector('input');
	const value = input.value.toLowerCase();

	// Empty array to hold listItems items
	const listItems = [];

	// Loop over each item in the list
	studentList.forEach(item => {

		const name = item.querySelector('h3').textContent;
		const email = item.querySelector('span').textContent;

		// If the name includes the value or the email includes the value, push the item to the listItems array
		if (name.includes(value) || email.includes(value)) {
			listItems.push(item);
		}
	});

	// If there are items in the listItems list
	if (listItems.length > 0) {

		// Add  links
		appendPageLinks(listItems);

		// Display the list
		showPage(listItems, 1);

	} else {

		clearPage();

		// Create and display message
		const p = document.createElement('p');
		p.className = 'message';
		p.textContent = '🧐 Sorry, no match.';
		page.appendChild(p);

	}

	return listItems;
}

appendSearch();

// Removes pagination links and message from the page
function clearPage() {
	if (page.lastElementChild.className === 'pagination' || page.lastElementChild.className === 'message') {
		page.removeChild(page.lastElementChild);
	}
};

// Show the set of list items
function activeClass(list, target) {

	// Get the links
	const links = Array.from(document.querySelectorAll('.pagination ul li'));

	// If the link page number is the same as the target, change the class to active
	// Otherwise remove the active class from the link
	links.forEach(item => item.firstElementChild.textContent === target.textContent ? item.firstElementChild.className = 'active' : item.firstElementChild.className = '');

	// Show the set of students that should be shown based on the page that was clicked
	const currentPage = target.textContent;
	showPage(list, currentPage);
}

// When a pagination link is clicked
page.addEventListener('click', function (event) {

	event.preventDefault();
	const target = event.target;

	// If the event target is a link, display the students
	if (target.tagName === 'A') {
		const listItems = search();
		listItems.length > 0 ? activeClass(listItems, target) : activeClass(studentList, target);

		// If the event target is a button, perform search
	} else if (target.tagName === 'BUTTON') {
		search();
	}
});

// When the user is typing, display results
document.addEventListener('keyup', function (event) {
	search();
});

h2.addEventListener("click", function () {
	location.reload();
});