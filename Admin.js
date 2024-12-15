const apiUrl = "http://localhost:5218/api/auth"; // Replace with your actual API URL

// Function to render data in a specific column
function renderData(containerId, data, titleKey, subtitleKey, dateKey) {
    const container = document.getElementById(containerId);
    container.innerHTML = ""; // Clear container
    data.forEach(item => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'task';
        itemDiv.innerHTML = `
            <h4>${item[titleKey]}</h4>
            <p>${item[subtitleKey]}</p>
            <span class="date">${item[dateKey]}</span>
        `;
        container.appendChild(itemDiv);
    });
}

// Fetch and display Intern/Fresher/Experience data
async function fetchCandidates(type) {
    try {
        const endpoint = type === "Intern" ? "Interns" : type === "Fresher" ? "Freshers" : "Experiences";
        const response = await fetch(`${apiUrl}/${endpoint}`);
        const candidates = await response.json();
        renderData("internFresherExperience", candidates, "name", "role", "date");
    } catch (error) {
        console.error(`Error fetching ${type}:`, error);
    }
}
// Fetch and categorize applications by status
async function fetchApplications() {
    try {
        const response = await fetch(`${apiUrl}/Applications`);
        const applications = await response.json();

        // Clear all columns
        document.getElementById("approvedApplications").innerHTML = "";
        document.getElementById("deniedApplications").innerHTML = "";
        document.getElementById("inProgressApplications").innerHTML = "";

        // Categorize applications by status
        applications.forEach(app => {
            if (app.status === "Approved") {
                renderApplication("approvedApplications", app);
            } else if (app.status === "Denied") {
                renderApplication("deniedApplications", app);
            } else if (app.status === "In Progress") {
                renderApplication("inProgressApplications", app);
            }
        });
    } catch (error) {
        console.error("Error fetching applications:", error);
    }
}

// Render a single application into the specified column
function renderApplication(containerId, application) {
    const container = document.getElementById(containerId);
    const applicationDiv = document.createElement("div");
    applicationDiv.className = "task";
    applicationDiv.innerHTML = `
        <h4>${application.name}</h4>
        <p>${application.email}</p>
        <span class="date">${application.date}</span>
    `;
    container.appendChild(applicationDiv);
}

// Event listeners for Intern, Fresher, Experience tabs
document.getElementById("internTab").addEventListener("click", () => fetchCandidates("Intern"));
document.getElementById("fresherTab").addEventListener("click", () => fetchCandidates("Fresher"));
document.getElementById("experienceTab").addEventListener("click", () => fetchCandidates("Experience"));

// Initialize Board
function initializeBoard() {
    fetchApplications(); // Fetch and categorize applications
}

// Load board on page load
window.onload = initializeBoard;
