
/* global $ */
/* global Cookies */
/* global sortedData */
/* global sortDatabase */
/* global sortDatabaseMulti */

let PAGING = 10;
let students = [];
let pagingIndex = 0;
let currentlySelectedID;
let deletedStudents = [];
let toggleAscending = true;
let fieldEnum = Object.freeze({
    name: 0,
    startDate: 1,
    street: 2,
    city: 3,
    state: 4,
    zip: 5,
    phone: 6,
    year: 7,
    id: 8
});
let textEnum = Object.freeze([
    "Name",
    "Start Date",
    "Street",
    "City",
    "State",
    "Zip",
    "Phone",
    "Year",
    "ID"
]);
let studentYearEnum = Object.freeze([
    "Freshman", 
    "Sophomore", 
    "Junior", 
    "Senior"
]);




function findStudent(id) {
    let studentObj = {};
    
    // Loop through all students to find the student
    // with the matching ID
    $.each(students, function (i, student) {
        if(student.id === id) {
            studentObj = student;
        }
    });

    return studentObj;
}

function removeStudent(arry, id) {
    let studentsList = [];
    
    $.each(arry, function(index, student) {
        if(student.id !== id) {
            studentsList.push(student)
        }
    });
    
    return JSON.parse(JSON.stringify(studentsList));
}

function addStudentModal() {
    $("#modalHeaderAdd").text("Add a New Student")
    $('.addChangeStudent').attr('id','add');
    $("#addModal").modal("show");
}

function editStudentModal(id) {
    let currentStudent = findStudent(id);
    currentlySelectedID = id;
    
    $("#modalHeaderAdd").text("Edit Current Student")
    $('.addChangeStudent').attr('id','edit');
 
    $('#fNameInput').prop('value', currentStudent.fname);
    $('#lNameInput').prop('value', currentStudent.lname);
    $('#startDateInput').prop('value', currentStudent.startDate);
    $('#phoneInput').prop('value', currentStudent.phone);
    $('#addressInput').prop('value', currentStudent.street);
    $('#cityInput').prop('value', currentStudent.city);
    $('#stateInput').prop('value', currentStudent.state);
    $('#zipInput').prop('value', currentStudent.zip);
    //$('#selectYearInput').val($(this).text());
    
    $("#addModal").modal("show");
    currentlySelectedID = id;
}

function deleteStudentModal(id) {
    let student = findStudent(id);
    
    $("#modalTitle").text("Delete Current Student")
    $('.confirmation').attr('id','delete');
    $('#modalText').text(`Are you sure you want to delete ${student.fname} ${student.lname}?`);
    $("#confirmationModal").modal("show");
    currentlySelectedID = id;
}

function refreshLastModal() {
    if (deletedStudents.length === 0) {
        alert('There are no recently deleted students');
    }
    else {
        $('.confirmation').attr('id','restore');
        $("#modalTitle").text("Restore Last Deleted Student");
        $('#modalText').text(`Are you sure you want to restore ${deletedStudents[deletedStudents.length - 1].fname} ${deletedStudents[deletedStudents.length - 1].lname}?`);
        $("#confirmationModal").modal("show");
    }
}

function populateTable(data) {
    // This code is used to create the table
    $('#tableArea').empty();
    $.each(data, function(i, student) {
        let studentStr = `<tr>`;

        $.each(student, function(i, field) {
            if (i === 'year') {
                studentStr += `<td>${studentYearEnum[field - 1]}</td>`;
            }
            else {
                if (i === 'fname') {
                    studentStr += `<td>${field} `;
                }
                else if (i === 'lname') {
                    studentStr += `${field}</td>`;
                }
                else {
                    studentStr += `<td>${field}</td>`;
                }
            }
        });
        studentStr += `<td><button type="button" class="btn btn-default btn-sm editStudent" id="${student.id}" data-toggle="tooltip" data-placement="bottom" title="Edit this student"><span class="glyphicon glyphicon-pencil"></button>\
                        <button type="button" class="btn btn-default btn-sm deleteStudent" id="${student.id}" data-toggle="tooltip" data-placement="bottom" title="Delete this student"><span class="glyphicon glyphicon-trash"></button></td>\
                        </tr>`;

        $('#tableArea').append(studentStr);
    });
    
    $(".editStudent").click(function() {
        editStudentModal($(this).attr('id'));
    });
   
    $(".deleteStudent").click(function() {
        deleteStudentModal($(this).attr('id'));
    });
}

function populateTile(data) {
    // This code is used to create the tiles
    $('#tileArea').empty();
    $.each(data, function(i, student) {

        $('#tileArea').append(`<div class="col-sm-3 cell"><h3>${student["fname"]} ${student["lname"]}</h3>\
                                <p>Start Date: ${student["startDate"]}</p>\
                                <p>${student["street"]}<br>\
                                ${student["city"]}, ${student["state"]} ${student["zip"]}</p>\
                                <p>Phone: ${student["phone"]}<br>\
                                Year: ${studentYearEnum[student["year"] - 1]}</p></div>`);
    });
}

function showTable() {
    $(this).tooltip('hide');
    $('#pageLeftBtn').show();
    $('#pageRightBtn').show();
    $('#table').show();
    $('#tileArea').hide();
    $(this).prop('disabled', true);
    $('#tileBtn').prop('disabled', false);
    Cookies.set('layout', 'table');
}

function showTile() {
    $(this).tooltip('hide');
    $('#pageLeftBtn').hide();
    $('#pageRightBtn').hide();
    $('#table').hide();
    $('#tileArea').show();
    $(this).prop('disabled', true);
    $('#tableBtn').prop('disabled', false);
    Cookies.set('layout', 'tile');
}

function closeModal() {
    $('#myModal').modal('hide');
    
    // Reset the progressbar back to 0
    $('#modalProgress').attr('aria-valuenow', 0);
    $('#modalProgress').attr('style', "width:0%");
}

function stepProgressBar(step) {
    // Get the value of the current progress of the progressbar
    let current = parseInt($('#modalProgress').attr('aria-valuenow'));
    current += step;
    
    // Update the progressbar with the new values
    $('#modalProgress').attr('aria-valuenow', current);
    $('#modalProgress').attr('style', "width:" + current + "%");
}

function populatePage() {
    let sortedData;

    // Check for and load from cookies
    loadLayoutFromCookies();

    if (Cookies.get('sort') === undefined) {
        sortedData = students;
    }
    else {
        (Cookies.get('ascending') === "true") ? toggleAscending = true: toggleAscending = false;

        if (Cookies.get('sort') === 'name') {
            sortedData = sortDatabaseMulti(students, 'lname', 'fname', toggleAscending);
        }
        else {
            sortedData = sortDatabase(students, Cookies.get('sort'), toggleAscending);
        }

        if (toggleAscending) {
            //$('#' + Cookies.get('sort')).append("<span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span>");
            $(`#${Cookies.get('sort')}`).empty().append(`${textEnum[fieldEnum[Cookies.get('sort')]]}<span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span>`);
        }
        else {
            $(`#${Cookies.get('sort')}`).empty().append(`${textEnum[fieldEnum[Cookies.get('sort')]]}<span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span>`);
            // $('#' + Cookies.get('sort')).append("<span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span>");
        }
    }

    populateTile(sortedData);
    populateTable(sortedData);
}

function loadFromServer() {
    loadPage(0);
    populatePage();
}

function loadLayoutFromCookies() {
    $('#tableBtn').prop('disabled', true);
    $('#tileBtn').prop('disabled', false);
    
    if (Cookies.get('layout') == undefined) {
        showTable();
    }
    else {
        if (Cookies.get('layout') === "table") {
            showTable();
        }
        else if (Cookies.get('layout') === "tile") {
            showTile();
            $('#tableBtn').prop('disabled', false);
            $('#tileBtn').prop('disabled', true);
        }
        else {
            showTable();
        }
    }
}

function beginSort() {
    let sortedData;

    (toggleAscending) ? toggleAscending = false: toggleAscending = true;

    $("#modalHeader").text(`Sorting by ${textEnum[fieldEnum[$(this)[0].id]]}`);
    $('#myModal').modal('show');
    stepProgressBar(100);

    // Code for changing the glyphicon
    if (toggleAscending) {
        $(this).empty().append(`${textEnum[fieldEnum[$(this)[0].id]]}<span class=\"glyphicon glyphicon-arrow-down\" aria-hidden=\"true\"></span>`);
    }
    else {
        $(this).empty().append(`${textEnum[fieldEnum[$(this)[0].id]]}<span class=\"glyphicon glyphicon-arrow-up\" aria-hidden=\"true\"></span>`);
    }

    if (Cookies.get('sort') !== $(this)[0].id) {
        $(`#${Cookies.get('sort')}`).empty().append(textEnum[fieldEnum[Cookies.get('sort')]]);
    }

    // Sort data and populate the DOM with the newly sorted data
    if ($(this)[0].id === 'name') {
        sortedData = sortDatabaseMulti(students, 'lname', 'fname', toggleAscending);
    }
    else {
        sortedData = sortDatabase(students, $(this)[0].id, toggleAscending);
    }
    

    populateTile(sortedData);
    populateTable(sortedData);
    
    closeModal();

    Cookies.set('ascending', toggleAscending);
}

function populateYears() {
    $.each(studentYearEnum, function(i, year) {
        $('#selectYearInput').append(`<option>${year}</option>`);
    });
}

function editStudent(id) {
    let student = {};
    // Modify the selected student's info and then
    // send an update REST call with the id of
    // currentlySelectedID
    
    student.fname = $('#fNameInput').prop('value');
    student.lname = $('#lNameInput').prop('value');
    student.startDate = $('#startDateInput').prop('value');
    student.street = $('#addressInput').prop('value');
    student.city = $('#cityInput').prop('value');
    student.state = $('#stateInput').prop('value');
    student.zip = $('#zipInput').prop('value');
    student.phone = $('#phoneInput').prop('value');
    student.year = $('#selectYearInput option:selected').index() + 1;
    student.id = id;
    
    // Make REST call to update this student
    $.ajax({
        url: `https://cs3660-christopherm.c9users.io/api/v1/students/${id}.json`,
        type: 'PUT',    
        data: JSON.stringify(student),
        contentType: 'application/json',
        success: function() {
            alert('Successfully updated');
        },
        fail: function() {
            alert('Failed');
        }
    });
    
    students = removeStudent(students, id);
    students.push(student);
    populateTable(students);
    
    // Sort the table based on how it was sorted before
}

function addStudent(student) {
    $.ajax({
        url: `https://cs3660-christopherm.c9users.io/api/v1/students`,
        type: 'POST',    
        data: JSON.stringify(student),
        contentType: 'application/json',
        success: function() {
            alert(`Successfully created student ${student.fname} ${student.lname}`);
        },
        fail: function() {
            alert('Failed');
        }
    });
}

function deleteStudent(id) {
    // Send a delete REST call to delete id
    $.ajax({
        type: "DELETE",
        url: `https://cs3660-christopherm.c9users.io/api/v1/students/${id}.json`,
        success: function() {
            deletedStudents.push(JSON.parse(JSON.stringify(findStudent(id))));
            students = removeStudent(students, id);
            populateTable(students);
            populateTile(students);
        },
        fail: function() {
            alert('Failed');
        }
    });
}

function restoreLast() {
    
    if (deletedStudents.length === 0) {
        alert('There are no recently deleted students');
    }
    else {
        // Add the last student back to the server and student list
        addStudent(deletedStudents[deletedStudents.length - 1]);
        
        // Remove the restored student from the deletedStudents array
        deletedStudents = removeStudent(deletedStudents, deletedStudents[deletedStudents.length - 1].id);
    }
}

function confirmSelection() {
    switch ($('.confirmation').attr('id')) {
        case 'delete':
            deleteStudent(currentlySelectedID);
            currentlySelectedID = undefined;
            break;
            
        case 'restore':
            restoreLast();
            break;
            
        default:
            throw('Error: Bad selection');
    }
}

function confirmUpdate() {
    let student = {};
    let id = currentlySelectedID;

    student.fname = $('#fNameInput').prop('value');
    student.lname = $('#lNameInput').prop('value');
    student.startDate = $('#startDateInput').prop('value');
    student.street = $('#addressInput').prop('value');
    student.city = $('#cityInput').prop('value');
    student.state = $('#stateInput').prop('value');
    student.zip = $('#zipInput').prop('value');
    student.phone = $('#phoneInput').prop('value');
    student.year = $('#selectYearInput option:selected').index() + 1;
    student.id = id;
    
    switch ($('.addChangeStudent').attr('id')) {
        case 'edit':
            // editStudent(currentlySelectedID);
            // Make REST call to update this student
            $.ajax({
                url: `https://cs3660-christopherm.c9users.io/api/v1/students/${id}.json`,
                type: 'PUT',    
                data: JSON.stringify(student),
                contentType: 'application/json',
                success: function() {
                    alert('Successfully updated');
                },
                fail: function() {
                    alert('Failed');
                }
            });
            
            students = removeStudent(students, id);
            students.push(student);
            populateTable(students);
            break;
            
        case 'add':
            addStudent(student);
            break;
            
        default:
            throw('Error: Bad selection');
    }
    
    // students.push(student);
    // populateTable(students);
}

function loadPage(page) {
    let studentIDs = [];

    //$("#modalHeader").text(`Loading students from the server`);
    //$('#myModal').modal('show');

    // Get the list of student IDs from the server
    $.ajax({
        type: "GET",
        url: `https://cs3660-christopherm.c9users.io/api/v1/students.json`,
        contentType: 'text/plain',
        async: false,
        success: function(data, status, xhr) {
            studentIDs = data;
        },
        always: function() {
            alert('Failed to get list from the server');
        }
    });
    
    // Now get each student object from the server upto the Max Page size
    for (let i = PAGING * page; i < ((PAGING * (page + 1) < studentIDs.length) ? PAGING * (page + 1) : studentIDs.length); i++) {
        let id = studentIDs[i].slice(0,4);      // Remove the '.json' from the id
        stepProgressBar(PAGING);
        $.ajax({
            type: "GET",
            url: `https://cs3660-christopherm.c9users.io/api/v1/students/${id}.json`,
            contentType: 'json',
            async: false,
            success: function(data, status, xhr) {
                let value = JSON.parse(data);
                value.id = id;
                students.push(value);
            },
            always: function() {
                alert(`Failed to get student with ID: ${id}`);
            }
        });
    }
    
    closeModal();
}

function preivousPage() {
    if (pagingIndex > 0) {
        students = [];
        loadPage(--pagingIndex);
        populateTile(students);
        populateTable(students);
    }
}

function nextPage() {
    students = [];
    loadPage(++pagingIndex);
    populateTile(students);
    populateTable(students);
}

function checkName(handler) {
    let expression = /^[A-Z][a-zA-Z ]{1,20}$/;
    let formObj = handler.currentTarget.id;

    if (!expression.test($(`#${formObj}`).prop('value'))) {
        $(`#${formObj}`).prop('value', '');
        $(`#${formObj}`).prop('placeholder', 'Invalid Input');
    }
    else {
        $(`#${formObj}`).prop('placeholder', 'Enter Name');
    }
}

function checkDate(handler) {
    let expression = /^([1][0-2]|[0]?[1-9])\/([1-2][0-9]|3[0-2]|[0]?[1-9])\/((?:19|20)?[0-9]{2})$/;
    let formObj = handler.currentTarget.id;

    if (!expression.test($(`#${formObj}`).prop('value'))) {
        $(`#${formObj}`).prop('value', '');
        $(`#${formObj}`).prop('placeholder', 'Invalid Input');
    }
    else {
        $(`#${formObj}`).prop('placeholder', 'Enter Name');
    }
}

function checkPhone(handler) {
    let expression = /^(\([0-9]{3}\)|[0-9]{3})?[0-9]{3}-?[0-9]{4}$/;
    let formObj = handler.currentTarget.id;

    if (!expression.test($(`#${formObj}`).prop('value'))) {
        $(`#${formObj}`).prop('value', '');
        $(`#${formObj}`).prop('placeholder', 'Invalid Input');
    }
    else {
        $(`#${formObj}`).prop('placeholder', 'Enter Name');
    }
}


$(document).ready(function() {
    let sortedData;

    $('[data-toggle="tooltip"]').tooltip();

    // Code to get JSON from server
    loadFromServer();
    
    // Populate the years in the add students modal
    populateYears(); 

    // Switch from tile to table view
    $("#tableBtn").click(showTable);

    // Switch from table to tile
    $("#tileBtn").click(showTile);

    // Click the sort fields function
    $(".sort").click(beginSort);
    
    $("#addNewBtn").click(addStudentModal);

    $("#refreshBtn").click(refreshLastModal);
    
    $(".confirmation").click(confirmSelection);

    $(".addChangeStudent").click(confirmUpdate);
    
    $("#pageLeftBtn").click(preivousPage);
    
    $("#pageRightBtn").click(nextPage);
    
    $("#fNameInput").focusout(checkName.bind($(this)));
    
    $("#lNameInput").focusout(checkName.bind($(this)));
    
    $("#startDateInput").focusout(checkDate.bind($(this)));
    
    $("#phoneInput").focusout(checkPhone.bind($(this)));
});
