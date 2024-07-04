const students = [
    // Array of 100 students
    {
        "id": 1,
        "first_name": "John",
        "last_name": "Doe",
        "email": "john.doe@example.com",
        "class": 10,
        "marks": 85,
        "passing": true,
        "gender": "male",
        "img_src": "path/to/image1.jpg"
    },
    // Add the rest of the students
];

document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.querySelector('#student-table tbody');
    const searchBar = document.getElementById('search-bar');
    const searchButton = document.getElementById('search-btn');
    const sortAZButton = document.getElementById('sort-az');
    const sortZAButton = document.getElementById('sort-za');
    const sortMarksButton = document.getElementById('sort-marks');
    const sortPassingButton = document.getElementById('sort-passing');
    const sortClassButton = document.getElementById('sort-class');
    const sortGenderButton = document.getElementById('sort-gender');

    const renderTable = (data) => {
        tableBody.innerHTML = '';
        data.forEach(student => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td><img src="${student.img_src}" alt="${student.first_name} ${student.last_name}">${student.first_name} ${student.last_name}</td>
                <td>${student.class}</td>
                <td>${student.marks}</td>
                <td>${student.passing ? 'Passing' : 'Failed'}</td>
                <td>${student.email}</td>
                <td>${student.gender}</td>
            `;
            tableBody.appendChild(row);
        });
    };

    const filterTable = (query) => {
        const filteredData = students.filter(student => {
            return student.first_name.toLowerCase().includes(query.toLowerCase()) ||
                   student.last_name.toLowerCase().includes(query.toLowerCase()) ||
                   student.email.toLowerCase().includes(query.toLowerCase());
        });
        renderTable(filteredData);
    };

    const sortByName = (order) => {
        const sortedData = [...students].sort((a, b) => {
            const nameA = `${a.first_name} ${a.last_name}`.toLowerCase();
            const nameB = `${b.first_name} ${b.last_name}`.toLowerCase();
            if (order === 'asc') return nameA > nameB ? 1 : -1;
            return nameA < nameB ? 1 : -1;
        });
        renderTable(sortedData);
    };

    const sortByMarks = () => {
        const sortedData = [...students].sort((a, b) => a.marks - b.marks);
        renderTable(sortedData);
    };

    const showPassing = () => {
        const passingStudents = students.filter(student => student.passing);
        renderTable(passingStudents);
    };

    const sortByClass = () => {
        const sortedData = [...students].sort((a, b) => a.class - b.class);
        renderTable(sortedData);
    };

    const sortByGender = () => {
        const maleStudents = students.filter(student => student.gender === 'male');
        const femaleStudents = students.filter(student => student.gender === 'female');
        renderTable(maleStudents);
        const separator = document.createElement('tr');
        separator.innerHTML = `<td colspan="6" style="background: #eee; height: 20px;"></td>`;
        tableBody.appendChild(separator);
        renderTable(femaleStudents);
    };

    searchBar.addEventListener('input', () => filterTable(searchBar.value));
    searchButton.addEventListener('click', () => filterTable(searchBar.value));
    sortAZButton.addEventListener('click', () => sortByName('asc'));
    sortZAButton.addEventListener('click', () => sortByName('desc'));
    sortMarksButton.addEventListener('click', sortByMarks);
    sortPassingButton.addEventListener('click', showPassing);
    sortClassButton.addEventListener('click', sortByClass);
    sortGenderButton.addEventListener('click', sortByGender);

    renderTable(students); // Initial render
});