const apiUrl = "http://localhost:5218/api/auth"; // Replace with your actual API URL

const jobData = [
    
  
  
  
  { title: "Frontend Developer", description: "Create amazing user interfaces using React.js, HTML, and CSS." },
    { title: "Backend Developer", description: "Manage databases and server-side logic with Node.js and Express." },
    { title: "Data Analyst", description: "Analyze data trends and provide actionable insights for our projects." },
    
    { title: "SQL Developer", description: "Design, maintain, and optimize SQL databases for efficient data management." },
    { title: "UI/UX Designer", description: "Craft user-friendly designs that enhance the user experience with intuitive interfaces." },
    { title: "Digital Marketing Specialist", description: "Implement marketing strategies to boost online presence and engagement." }
   

]
  
  function loadJobs() {
    const container = document.getElementById('jobs-container');
    jobData.forEach((job, index) => {
      const card = document.createElement('div');
      card.className = 'job-card';
      card.innerHTML = `
        <h3>${job.title}</h3>
        <p>${job.description}</p>
        <button onclick="openForm('${job.title}')">Apply Now</button>
      `;
      container.appendChild(card);
    });
  }
  
  function openForm(jobTitle) {
    document.getElementById('job-title').textContent = jobTitle;
    document.getElementById('apply-form-modal').style.display = 'flex';
  }
  
  function closeForm() {
    document.getElementById('apply-form-modal').style.display = 'none';
  }
  
  document.getElementById('close-form').addEventListener('click', closeForm);
  
  window.onload = loadJobs;
 
  document.getElementById("applicationForm").addEventListener("submit", async (event) => {
    event.preventDefault();
  
    // Gather form data
    const applicationData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      resume: document.getElementById('resume').value, // Now a string (e.g., URL)
      status: document.getElementById('status').value,
      message: document.getElementById('message').value,
    };
  
    const responseMessage = document.getElementById("responseMessage");
  
    try {
      // Send the data as JSON
      const response = await fetch('https://localhost:7238/api/auth/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(applicationData),
      });
      document.getElementById('apply-form-modal').style.display = 'none';
      if (response.ok) {
        const result = await response.json();
        responseMessage.style.display = "block";
        responseMessage.style.color = "green";
        responseMessage.textContent = "Application submitted successfully!";
      } else {
        const errorResult = await response.json();
        responseMessage.style.display = "block";
        responseMessage.style.color = "red";
        responseMessage.textContent = `Error submitting application: ${errorResult.message || 'Unknown error'}`;
      }
    } catch (error) {
      responseMessage.style.display = "block";
      responseMessage.style.color = "red";
      responseMessage.textContent = "An error occurred during submission. Please try again.";
      console.error('Error during submission:', error);
    }
  
    // Log before hiding to debug
    console.log("Hiding message after 2 seconds");
    
    // Hide the message after 2 seconds
    setTimeout(() => {
      console.log("Hiding responseMessage now");
      responseMessage.style.display = "none";
    }, 2000);
  });
  
  

  document.addEventListener("DOMContentLoaded", () => {
    const viewStatusBtn = document.getElementById("viewStatusBtn");
    const statusForm = document.getElementById("statusForm");
    const applicationDetails = document.getElementById("applicationDetails");
    const statusEmailInput = document.getElementById("userEmail");

    // Toggle form visibility
    viewStatusBtn.addEventListener("click", () => {
        statusForm.style.display = statusForm.style.display === "none" ? "block" : "none";
    });

    // Fetch application status
    statusForm.addEventListener("submit", async (event) => {
        event.preventDefault();
        statusForm.style.display = statusForm.style.display === "none" ? "block" : "none";
        const email = statusEmailInput.value.trim();

        // Fetch data from the API
        const data = await fetchApplicationDetails(email);
        if (data && data.length > 0) {
            displayApplicationData(data);
        } else {
           document.getElementById('responseMessage').style.display = "block";
           document.getElementById('responseMessage').style.color = "red";
           document.getElementById('responseMessage').textContent = "Data Not Found....!";
           
        }
          // Hide the message after 2 seconds
    setTimeout(() => {
        document.getElementById('responseMessage').style.display = "none";
    }, 1000); // 2000ms = 2 seconds
    });
  
});
// Function to display fetched application details
// Function to display application details in a form-style layout
function displayApplicationData(data) {
  const applicationDetails = document.getElementById("applicationDetails");
  const applicationContainer = document.getElementById("applicationData");

  applicationDetails.style.display = "block"; // Show the details container
  applicationContainer.innerHTML = ''; // Clear any previous data

  // Loop through each application and create a "form card"
  data.forEach(app => {
    const card = document.createElement("div");
    card.className = "application-card"; // CSS class for styling

    card.innerHTML = `
      <div class="application-field">
        <label ><strong>Name:</strong></label>
        <span >${app.name}</span>
      </div>
      <div class="application-field">
        <label><strong>Email:</strong></label>
        <span>${app.email}</span>
      </div>
      <div class="application-field">
        <label><strong>Resume:</strong></label>
        <a href="http://localhost:5218/api/auth/downloadResume/${app.id}" target="_blank">View Resume</a>
      </div>
      <div class="application-field">
        <label><strong>Message:</strong></label>
        <span>${app.message}</span>
      </div>
      <div class="application-field">
        <label><strong>Status:</strong></label>
        <span>${app.status}</span>
      </div>
      <button class="delete-btn" onclick="deleteApplications('${app.email}')">Delete</button>
    `;
    
    applicationContainer.appendChild(card);
  });
}

// Function to fetch application details from the API
async function fetchApplicationDetails(email) {
  const apiUrl = "http://localhost:5218/api/auth/Application"; // Replace with your actual API URL

  try {
      const response = await fetch(apiUrl);
      const applications = await response.json();

      // Filter applications by email
      return applications.filter(app => app.email.toLowerCase() === email.toLowerCase());
  } catch (error) {
      console.error("Error fetching application details:", error);
      return [];
  }
}

// Function to delete an application by email
async function deleteApplications(email) {
  const apiUrl = `http://localhost:5218/api/auth/Applications/${email}`; // Replace with your actual API URL

  const confirmation = confirm(`Are you sure you want to delete the application?`);
  if (confirmation) {
      try {
          const response = await fetch(apiUrl, {
              method: 'DELETE',
          });

          if (response.ok) {
              const responseMessage = document.getElementById('responseMessage');
              responseMessage.style.display = "block";
              responseMessage.style.color = "red";
              responseMessage.textContent = "Application Deleted successfully!";

              // Refresh the application list after deletion
              fetchApplication(); // Function to reload the list
              
          } else {
              alert("Failed to delete application. Please try again.");
          }
      } catch (error) {
          console.error("Error deleting application:", error);
      }

      // Hide the message after 2 seconds
      setTimeout(() => {
          document.getElementById('responseMessage').style.display = "none";
      }, 2000); // 2000ms = 2 seconds
  }
}
