document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Mock user data (replace this with real backend integration)
    const mockUser = {
        email: "test@budgetwise.com",
        password: "password123",
    };

    // Login validation
    if (email === mockUser.email && password === mockUser.password) {
        alert("Login successful! Redirecting to your portfolio...");
        window.location.href = "portfolio.html"; // Redirect to portfolio page
    } else {
        alert("Invalid email or password. Please try again.");
    }

    // Clear the form
    e.target.reset();
});
