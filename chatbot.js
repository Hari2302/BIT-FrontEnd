const chatBody = document.getElementById("chatBody");
const chatbot=document.getElementById('chatbot');


const chatbotButton = document.getElementById('chatbot');
const chatbotContainer = document.getElementById('chatbot-container');

chatbotButton.addEventListener('click', () => {
  // Toggle the visibility of the chatbot container
  if (chatbotContainer.style.display === 'none' || chatbotContainer.style.display === '') {
    chatbotContainer.style.display = 'block';
    chatbotButton.textContent = 'Close Chatbot'; // Change button text
  } else {
    chatbotContainer.style.display = 'none';
    chatbotButton.textContent = 'Open Chatbot'; // Revert button text
  }
});

function sendMessage() {
  const userInput = document.getElementById("userInput").value;
  if (userInput.trim() === "") return;

  // Add user message to the chat
  addMessageToChat("user-message", userInput);

  // Send the message to the backend
  fetch("http://localhost:5000/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userInput }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Add bot response to the chat
      addMessageToChat("bot-message", data.response);
    })
    .catch((error) => {
      console.error("Error:", error);
    });

  document.getElementById("userInput").value = ""; // Clear input
}

function addMessageToChat(className, message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = `chat-message ${className}`;
  messageDiv.textContent = message;
  chatBody.appendChild(messageDiv);
  chatBody.scrollTop = chatBody.scrollHeight; // Scroll to the bottom
}
