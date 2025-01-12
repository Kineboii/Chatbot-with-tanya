const API_KEY = "https://api.davidcyriltech.my.id/ai/llama3?text=Hi"; // Replace with your OpenAI API key
const API_URL = "https://api.openai.com/v1/chat/completions";

const chatContent = document.getElementById("chat-content");

async function sendMessage() {
  const userInput = document.getElementById("user-input").value;

  if (!userInput.trim()) return;

  // Display user message
  addMessageToChat(userInput, "user");

  // Clear input field
  document.getElementById("user-input").value = "";

  // Show bot typing indicator
  addMessageToChat("Typing...", "bot", true);

  // Make API call
  const botResponse = await getBotResponse(userInput);

  // Update bot response
  updateLastBotMessage(botResponse);
}

function addMessageToChat(message, sender, isTemporary = false) {
  const messageElement = document.createElement("div");
  messageElement.className = `message ${sender}`;
  messageElement.innerText = message;
  messageElement.dataset.temporary = isTemporary;
  chatContent.appendChild(messageElement);
  chatContent.scrollTop = chatContent.scrollHeight;
}

function updateLastBotMessage(message) {
  const messages = chatContent.querySelectorAll(".message");
  const lastMessage = Array.from(messages).reverse().find(msg => msg.dataset.temporary === "true");
  if (lastMessage) {
    lastMessage.innerText = message;
    lastMessage.dataset.temporary = "false";
  }
}

async function getBotResponse(userMessage) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  const body = JSON.stringify({
    model: "gpt-4",
    messages: [{ role: "system", content: "You are AI Queen Tanya, a helpful assistant." }, { role: "user", content: userMessage }],
  });

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: headers,
      body: body,
    });
    const data = await response.json();
    return data.choices[0].message.content;
  } catch (error) {
    console.error("Error:", error);
    return "I'm sorry, I couldn't process that. Please try again.";
  }
}
