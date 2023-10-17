
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
    const statusModal = document.getElementById("status-modal");
    const statusText = document.getElementById("status-text");
  
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.getElementById("message").value;
      const subject = document.getElementById("subject").value;
      
      
      // Create the email data to send to the server
      const emailData = {
        name,
        email,
        message,
        subject,
      }

       // Show the "Sending" modal
    statusText.textContent = "Sending...";
    statusModal.style.display = "block";
  
      try {
        const response = await fetch("http://localhost:3005/email/contact", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
          // body: emailData,
        });
  
        if (response.ok) {
          // Successful submission, show a success message or redirect
          statusText.textContent = "Sent successfully";
          contactForm.reset();
        } else {
          // Handle the error response, e.g., show an error message
          statusText.textContent = "Message sending failed. Please try again later.";
        }
      } catch (error) {
        console.error("An error occurred:", error);
        statusText.textContent = "An error occurred. Please try again later.";
      }

      setTimeout(() => {
        statusModal.style.display = "none";
      }, 3000); 
    });
  });