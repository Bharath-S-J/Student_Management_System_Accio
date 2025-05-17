let students = [];

// Fetch the JSON file
fetch('students.json')
  .then(response => response.json())
  .then(data => {
    students = data;
    renderTable(students);
  })
  .catch(error => console.error('Error loading the student data:', error));

// Function to render the table
function renderTable(data) {
  const tbody = document.querySelector('#studentTable tbody');
  tbody.innerHTML = ''; // Clear the table before rendering

  data.forEach(student => {
    const row = document.createElement('tr');
    
    // Create cells for ID, Name with Image, Gender, Class, Marks, Passing, Email
    const idCell = document.createElement('td');
    idCell.textContent = student.id;

    const nameCell = document.createElement('td');
    nameCell.innerHTML = `<div style="display:flex;"><img src="${student.img_src}" alt="${student.first_name} ${student.last_name}" width="30" height="30"> <p> ${student.first_name} ${student.last_name}</p></div>`;

    const genderCell = document.createElement('td');
    genderCell.textContent = student.gender;

    const classCell = document.createElement('td');
    classCell.textContent = student.class;

    const marksCell = document.createElement('td');
    marksCell.textContent = student.marks;

    const passingCell = document.createElement('td');
    passingCell.textContent = student.passing ? 'Passing' : 'Failed';

    const emailCell = document.createElement('td');
    emailCell.textContent = student.email;

    row.append(idCell, nameCell, genderCell, classCell, marksCell, passingCell, emailCell);
    
    tbody.appendChild(row);
  });
}

// Search function
function handleSearch() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const filteredStudents = students.filter(student => 
    student.first_name.toLowerCase().includes(query) ||
    student.last_name.toLowerCase().includes(query) ||
    student.email.toLowerCase().includes(query)
  );
  renderTable(filteredStudents);
}

// Sort A->Z by Full Name
function sortAZ() {
  const sorted = [...students].sort((a, b) => (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name));
  renderTable(sorted);
}

// Sort Z->A by Full Name
function sortZA() {
  const sorted = [...students].sort((a, b) => (b.first_name + b.last_name).localeCompare(a.first_name + a.last_name));
  renderTable(sorted);
}

// Sort by Marks (Ascending)
function sortByMarks() {
  const sorted = [...students].sort((a, b) => a.marks - b.marks);
  renderTable(sorted);
}

// Show only Passing students
function showPassing() {
  const passingStudents = students.filter(student => student.passing);
  renderTable(passingStudents);
}

// Sort by Class (Ascending)
function sortByClass() {
  const sorted = [...students].sort((a, b) => a.class - b.class);
  renderTable(sorted);
}

// Sort by Gender
function sortByGender(gender) {
  const filtered = students.filter(student => student.gender === gender);
  renderTable(filtered);
}
