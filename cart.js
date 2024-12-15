const apiUrl = "http://localhost:5218/api/auth"; // Replace with your actual API URL

// Selecting Elements
const empLogo = document.querySelector('#empLogo');

const dasLogo = document.getElementById('daslogo');

const empPanel1= document.getElementById('empPanel1');
const empPanel = document.querySelector('#empPanel');
const btnClose = document.querySelector('#cancel');
const internOption = document.querySelector('#intern');
const fresherOption = document.querySelector('#fresher');
const experienceOption = document.querySelector('#experience');
const internFormContainer = document.querySelector('#internFormContainer');
const fresherFormContainer = document.querySelector('#fresherFormContainer');
const experienceFormContainer = document.querySelector('#experienceFormContainer');

// const panel_box1=document.querySelector('.panel-box1');

// Open Slide Panel
empLogo.addEventListener('click', () => {
    
    empPanel.classList.add('cart-active');
    
    // if(count>=2){
    //     empPanel.classList.remove('cart-active');
    // }
});
// Open Slide Panel
dasLogo.addEventListener('click', () => {
   
    // Toggle the visibility of the empPanel1 panel
    empPanel1.classList.add('cart-active');
});



// Close Slide Panel
btnClose.addEventListener('click', () => {
    empPanel.classList.remove('cart-active');
    hideAllForms();
});

// Show/Hide Forms
internOption.addEventListener('click', () => {
    showForm(internFormContainer);
    
});

fresherOption.addEventListener('click', () => {
    showForm(fresherFormContainer);
});

experienceOption.addEventListener('click', () => {
    showForm(experienceFormContainer);
});
dasLogo.addEventListener('click', () => {
    // Toggle the visibility of the empPanel1 panel
    empPanel1.style.display = 'block';
    
});

// //Panel1 (intern,fresher,etc to touch close update form )
// panel_box1.addEventListener('click', () => {
//         document.getElementById('update-form').style.display="none";
// });

const closeBtn = document.querySelector('#empPanel1 .close-icon ');
if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        empPanel1.style.display = 'none';

        window.location.reload();
    });
}

// Display Form Function
function showForm(formContainer) {
    hideAllForms();
    formContainer.style.display = 'block';
    
}

// Hide All Forms
function hideAllForms() {
    internFormContainer.style.display = 'none';
    fresherFormContainer.style.display = 'none';
    experienceFormContainer.style.display = 'none';
}

// Intern Form Logic
document.getElementById("internForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an object with form data
    const internData = {
        name: document.getElementById("intern-name").value,
        email: document.getElementById("intern-email").value,
        phone: document.getElementById("intern-phone").value, // Corrected ID
        role: document.getElementById("intern-role").value
    };

    // API call to submit the intern data
    try {
        const response = await fetch(`${apiUrl}/intern`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(internData),
        });

        // Handle the response from the API
        const message = await response.text();
        document.getElementById('responseMessage').style.display = "block";
        document.getElementById('responseMessage').style.color = "darkgreen";
      document.getElementById('responseMessage').textContent = "Submitted successfully.....! ";
              

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during form submission.");
    }
    setTimeout(() => {
        document.getElementById('responseMessage').style.display = "none";
    }, 2000); // 2000ms = 2 seconds
});


// Fresher Form Logic
document.getElementById("fresherForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an object with form data
    const fresherData = {
        name: document.getElementById("fresher-name").value,
        email: document.getElementById("freshe-email").value,
        phone: document.getElementById("fresher-phone").value, 
        role: document.getElementById("fresher-role").value,
        salary: document.getElementById("fresher-salary").value
    };

    // API call to submit the intern data
    try {
        const response = await fetch(`${apiUrl}/Fresher`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(fresherData),
        });

        // Handle the response from the API
        const message = await response.text();
        document.getElementById('responseMessage').style.display = "block";
        document.getElementById('responseMessage').style.color = "darkgreen";
      document.getElementById('responseMessage').textContent = "Submitted successfully.....! ";
    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during form submission.");
    }
    setTimeout(() => {
        document.getElementById('responseMessage').style.display = "none";
    }, 2000); // 2000ms = 2 seconds
});



// Experience Form Logic
document.getElementById("experienceForm").addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Create an object with form data
    const expData = {
        name: document.getElementById("exp-name").value,
        email: document.getElementById("exp-email").value,
        phone: document.getElementById("exp-phone").value, 
        role: document.getElementById("exp-role").value,
        salary: document.getElementById("exp-salary").value,
        exp:document.getElementById("exp-year").value
    };

    // API call to submit the intern data
    try {
        const response = await fetch(`${apiUrl}/Experience`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(expData),
        });

        // Handle the response from the API
        const message = await response.text();
        document.getElementById('responseMessage').style.display = "block";
        document.getElementById('responseMessage').style.color = "darkgreen";
      document.getElementById('responseMessage').textContent = "Submitted successfully.....! ";

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred during form submission.");
    }
    setTimeout(() => {
        document.getElementById('responseMessage').style.display = "none";
    }, 2000); // 2000ms = 2 seconds
});

// Fetching Intern Data------------------------------------------------------------>

async function fetchInterns() {
    console.log("Interns");
    try {
        const response = await fetch(`${apiUrl}/Interns`);
        const interns = await response.json();
        const internTableBody = document.getElementById('internData');
        internTableBody.innerHTML = ""; // Clear the table before populating

        interns.forEach(intern => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${intern.id}</td>
                <td>${intern.name}</td>
                <td>${intern.email}</td>
                <td>${intern.phone}</td>
                <td>${intern.role}</td>
                <td>
                    <button class="edit-btn" onclick="showUpdateForm(${intern.id}, '${intern.name}', '${intern.email}', '${intern.phone}', '${intern.role}')">Edit</button>
                    <button class="delete-btn" onclick="deleteIntern(${intern.id})">Delete</button>  
                </td>
            `;
            internTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching interns:", error);
    }
}

// Function to show the update form with pre-filled data
function showUpdateForm(id, name, email, phone, role) {
    // Create a form container
   document.getElementById("update-form").innerHTML = `
        <h3>Update Intern Details</h3>
        <form id="updateForm">
            <input type="hidden" id="updateId" value="${id}">
            <div>
                <label>Name</label>
                <input type="text" id="updateName"  placeholder="Enter Name" value="${name}">
            </div>
            <div>
                <label>Email</label>
                <input type="email" id="updateEmail"  placeholder="Enter Email" value="${email}">
            </div>
            <div>
                <label>Phone</label>
                <input type="text" id="updatePhone" placeholder="Enter Phone" value="${phone}">
            </div>
            <div>
                <label>Role</label>
                <input type="text" id="updateRole" placeholder="Enter Role" value="${role}">
            </div>
            <button type="button" onclick="updateIntern()" id="up-btn">Update &#10004;</button>
            <button type="button" onclick="closeUpdateForm()" id="can-btn">Cancel 	&#10006;</button>
        </form>
    `;

    // Append the update form to the body or a specific container
    document.body.appendChild(updateContainer);
}

// Function to handle the update request
async function updateIntern() {
    const id = document.getElementById('updateId').value;
    const name = document.getElementById('updateName').value;
    const email = document.getElementById('updateEmail').value;
    const phone = document.getElementById('updatePhone').value;
    const role = document.getElementById('updateRole').value;

    // Create the update payload
    const updateData = {
        id,
        name,
        email,
        phone,
        role
    };

    try {
        const response = await fetch(`${apiUrl}/Intern/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateData),
        });

        if (response.ok) {
            document.getElementById('responseMessage').style.display = "block";
                document.getElementById('responseMessage').style.color = "green";
                document.getElementById('responseMessage').textContent = "Intern Data successfully.....! ";
            closeUpdateForm();
            fetchInterns(); // Refresh the list
        } else {
            console.error('Failed to update intern');
        }
    } catch (error) {
        console.error('Error updating intern:', error);
    }
    setTimeout(() => {
        document.getElementById('responseMessage').style.display = "none";
    }, 2000); // 2000ms = 2 seconds
}
// Delet Intern 
    // Function to delete an intern record
async function deleteIntern(id) {
    if (confirm("Are you sure you want to delete this intern?")) {
        try {
            const response = await fetch(`${apiUrl}/Intern/${id}`, {
                method: 'DELETE', // HTTP method to delete the resource
            });

            if (response.ok) {
                alert('Intern deleted successfully!');
                fetchInterns(); // Refresh the intern list after deletion
            } else {
                console.error('Failed to delete intern');
            }
        } catch (error) {
            console.error('Error deleting intern:', error);
        }
    }
}


// Function to close the update form
function closeUpdateForm() {
    const updateFormContainer = document.getElementById('updateFormContainer');
    if (updateFormContainer) {
        updateFormContainer.remove();
    }
}

// Fetching Fresher Data------------------------------------------------------->

async function fetchFreshers() {
    console.log("Fetching Freshers");
    try {
        const response = await fetch(`${apiUrl}/Freshers`);
        const freshers = await response.json();
        const fresherTableBody = document.getElementById('fresherData');
        fresherTableBody.innerHTML = ""; // Clear the table before populating

        freshers.forEach(fresher => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${fresher.id}</td>
                <td>${fresher.name}</td>
                <td>${fresher.email}</td>
                <td>${fresher.phone}</td>
                <td>${fresher.role}</td>
                <td>${fresher.salary}</td>
                <td>
                    <button class="edit-btn" onclick="showUpdateFormFresher(${fresher.id}, '${fresher.name}', '${fresher.email}', '${fresher.phone}', '${fresher.role}', '${fresher.salary}')">Edit</button>
                    <button class="delete-btn" onclick="deleteFresher(${fresher.id})">Delete</button>
                </td>
            `;
            fresherTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching freshers:", error);
    }
}

// Function to show the update form for Freshers
function showUpdateFormFresher(id, name, email, phone, role, salary) {
    document.getElementById("update-form").innerHTML = `
        <h3>Update Fresher Details</h3>
        <form id="updateForm">
            <input type="hidden" id="updateId" value="${id}">
            <div>
                <label>Name</label>
                <input type="text" id="updateName" placeholder="Enter Name" value="${name}">
            </div>
            <div>
                <label>Email</label>
                <input type="email" id="updateEmail" placeholder="Enter Email" value="${email}">
            </div>
            <div>
                <label>Phone</label>
                <input type="text" id="updatePhone" placeholder="Enter Phone" value="${phone}">
            </div>
            <div>
                <label>Role</label>
                <input type="text" id="updateRole" placeholder="Enter Role" value="${role}">
            </div>
            <div>
                <label>Salary</label>
                <input type="text" id="updateSalary" placeholder="Enter Salary" value="${salary}">
            </div>
            <button type="button" onclick="updateFresher()" id="up-btn">Update</button>
            <button type="button" onclick="closeUpdateForm()" id="can-btn">Cancel</button>
        </form>
    `;
}

// Function to update fresher details
async function updateFresher() {
    const id = document.getElementById('updateId').value;
    const updateData = {
        name: document.getElementById('updateName').value,
        email: document.getElementById('updateEmail').value,
        phone: document.getElementById('updatePhone').value,
        role: document.getElementById('updateRole').value,
        salary: document.getElementById('updateSalary').value
    };

    try {
        const response = await fetch(`${apiUrl}/Fresher/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
            alert('Fresher updated successfully!');
            window.print();
            closeUpdateForm();
            fetchFreshers();
        } else {
            console.error('Failed to update fresher');
        }
    } catch (error) {
        console.error('Error updating fresher:', error);
    }
}

 // Delete Fresher DAta
 // Function to delete a fresher record
async function deleteFresher(id) {
    if (confirm("Are you sure you want to delete this fresher?")) {
        try {
            const response = await fetch(`${apiUrl}/Fresher/${id}`, {
                method: 'DELETE', // HTTP method to delete the resource
            });

            if (response.ok) {
                alert('Fresher deleted successfully!');
                fetchFreshers(); // Refresh the fresher list after deletion
            } else {
                console.error('Failed to delete fresher');
            }
        } catch (error) {
            console.error('Error deleting fresher:', error);
        }
    }
}


// Fetching Experience Data-------------------------------------------->

async function fetchExperiences() {
    console.log("Fetching Experiences");
    try {
        const response = await fetch(`${apiUrl}/Experiences`);
        const experiences = await response.json();
        const experienceTableBody = document.getElementById('experienceData');
        experienceTableBody.innerHTML = ""; // Clear the table before populating

        experiences.forEach(experience => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${experience.id}</td>
                <td>${experience.name}</td>
                <td>${experience.email}</td>
                <td>${experience.phone}</td>
                <td>${experience.role}</td>
                <td>${experience.salary}</td>
                <td>${experience.yearsOfExperience}</td>
                <td>
                    <button class="edit-btn" onclick="showUpdateFormExperience(${experience.id}, '${experience.name}', '${experience.email}', '${experience.phone}', '${experience.role}', '${experience.salary}', '${experience.yearsOfExperience}')">Edit</button>
                    <button class="delete-btn" onclick="deleteExperience(${experience.id})">Delete</button>
                </td>
            `;
            experienceTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching experiences:", error);
    }
}

// Function to show the update form for Experiences
function showUpdateFormExperience(id, name, email, phone, role, salary, yearsOfExperience) {
    document.getElementById("update-form").innerHTML = `
        <h3>Update Experience Details</h3>
        <form id="updateForm">
            <input type="hidden" id="updateId" value="${id}">
            <div>
                <label>Name</label>
                <input type="text" id="updateName" placeholder="Enter Name" value="${name}">
            </div>
            <div>
                <label>Email</label>
                <input type="email" id="updateEmail" placeholder="Enter Email" value="${email}">
            </div>
            <div>
                <label>Phone</label>
                <input type="text" id="updatePhone" placeholder="Enter Phone" value="${phone}">
            </div>
            <div>
                <label>Role</label>
                <input type="text" id="updateRole" placeholder="Enter Role" value="${role}">
            </div>
            <div>
                <label>Salary</label>
                <input type="text" id="updateSalary" placeholder="Enter Salary" value="${salary}">
            </div>
            <div>
                <label>Years of Experience</label>
                <input type="text" id="updateYearsExperience" placeholder="Enter Years of Experience" value="${yearsOfExperience}">
            </div>
            <button type="button" onclick="updateExperience()" id="up-btn">Update</button>
            <button type="button" onclick="closeUpdateForm()" id="can-btn">Cancel</button>
        </form>
    `;
}

// Function to update experience details
async function updateExperience() {
    const id = document.getElementById('updateId').value;
    const updateData = {
        name: document.getElementById('updateName').value,
        email: document.getElementById('updateEmail').value,
        phone: document.getElementById('updatePhone').value,
        role: document.getElementById('updateRole').value,
        salary: document.getElementById('updateSalary').value,
        yearsOfExperience: document.getElementById('updateYearsExperience').value
    };

    try {
        const response = await fetch(`${apiUrl}/Experience/${id}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(updateData)
        });

        if (response.ok) {
          alert("Update Sucessfull")
            closeUpdateForm();
            fetchExperiences();
        } else {
            console.error('Failed to update experience');
        }
    } catch (error) {
        console.error('Error updating experience:', error);
    }
}
  // Delete Experience Data
  // Function to delete an experience record
async function deleteExperience(id) {
    if (confirm("Are you sure you want to delete this experience?")) {
        try {
            const response = await fetch(`${apiUrl}/Experience/${id}`, {
                method: 'DELETE', // HTTP method to delete the resource
            });

            if (response.ok) {
                alert('Experience deleted successfully!');
                fetchExperiences(); // Refresh the experience list after deletion
            } else {
                console.error('Failed to delete experience');
            }
        } catch (error) {
            console.error('Error deleting experience:', error);
        }
    }
}

// Fetching Application Data
async function fetchApplication() {
    try {
        const response = await fetch(`${apiUrl}/Application`);
        const appl = await response.json();
        const appTableBody = document.getElementById('applicationData');
        appTableBody.innerHTML = ""; // Clear the table before populating

        appl.forEach(app => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${app.name}</td>
                <td>${app.email}</td>
                <td>${app.resume}</td>
                <td>${app.message}</td>
                <td>${app.status}</td>
                <td>
                    <button class="edit-btn" onclick="updateApplicationStatus('${app.email}', 'Approved')">Approve</button>
                    <button class="delete-btn" onclick="updateApplicationStatus('${app.email}', 'Denied')">Deny</button>
                </td>
            `;
            appTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

// Function to update application status
async function updateApplicationStatus(email, status) {
    console.log(`Updating application status for ${email} to ${status}`);
    try {
        const response = await fetch(`${apiUrl}/UpdateStatus/${email}/${status}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            fetchApplication(); // Refresh the application list
        } else {
            console.error(`Failed to update application status`);
        }
    } catch (error) {
        console.error(`Error updating application status:`, error);
    }
}




// Call these functions when the page loads or when a tab is clicked
document.getElementById("internTile").addEventListener('click', () => {
    fetchInterns(); // Fetch Intern data
    document.getElementById('internDetails').style.display = 'block';
    document.getElementById('fresherDetails').style.display = 'none';
    document.getElementById('experienceDetails').style.display = 'none';
    document.getElementById('applicationDetails').style.display = 'none';
});

document.getElementById("fresherTile").addEventListener('click', () => {
    fetchFreshers(); // Fetch Fresher data
    document.getElementById('internDetails').style.display = 'none';
    document.getElementById('fresherDetails').style.display = 'block';
    document.getElementById('experienceDetails').style.display = 'none';
    document.getElementById('applicationDetails').style.display = 'none';
});

document.getElementById("experienceTile1").addEventListener('click', () => {
    console.log("exp-----")
    fetchExperiences(); // Fetch Experience data
    document.getElementById('internDetails').style.display = 'none';
    document.getElementById('fresherDetails').style.display = 'none';
    document.getElementById('experienceDetails').style.display = 'block';
    document.getElementById('applicationDetails').style.display = 'none';
});
document.getElementById("applicationTile").addEventListener('click', () => {
    fetchApplication(); // Fetch Experience data
    document.getElementById('internDetails').style.display = 'none';
    document.getElementById('fresherDetails').style.display = 'none';
    document.getElementById('experienceDetails').style.display = 'none';
    document.getElementById('applicationDetails').style.display = 'block';
});



// Logout Cart Logic 
document.getElementById("logoutlogo").addEventListener("click", function() {
    // Show the logout confirmation modal
    document.getElementById("logoutModal").style.display = "block";
});

document.getElementById("yesLogout").addEventListener("click", function() {
    // Handle logout logic here (for example, clear session or redirect to login page)
     // This is just an example, replace with actual logout logic.
    window.location.href = "index.html"; // Redirect to login page or handle logout logic here.
});

document.getElementById("noLogout").addEventListener("click", function() {
    // Close the modal without logging out
    window.location.href="employee_management.html";
});



async function fetchEdit(){
    try {
        const response = await fetch(`${apiUrl}/Update`);
        console.log("app1")
        const appl = await response.json();
        console.log(appl)
        const appTableBody = document.getElementById('applicationData');
        appTableBody.innerHTML = ""; // Clear the table before populating
        console.log("app2")
        appl.forEach(app => {
            console.log("app8")
            const row = document.createElement('tr');
            console.log("app3")
            row.innerHTML = `
              <td>${app.id}</td>
                <td>${app.name}</td>
                <td>${app.email}</td>
                <td>${app.resume}</td>
                <td>${app.message}</td>
               
            `;
            appTableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching experiences:", error);
    }
}

// Close Form
function closeUpdateForm(){
    document.getElementById('updateForm').style.display="none";
}

