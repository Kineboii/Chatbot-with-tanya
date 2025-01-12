document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form submission

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

    // Replace with your actual username and password
    const validUsername = "chatbot";
    const validPassword = "chatbot";

    if (username === validUsername && password === validPassword) {
        // Redirect to another page
        window.location.href = "dashboard.html";
    } else {
        errorMessage.textContent = "Invalid username or password!";
    }
});