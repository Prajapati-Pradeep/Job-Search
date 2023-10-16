
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
  
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');

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
  
      try {
        const response = await fetch("http://localhost:3000/email/contact", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(emailData)
          // body: emailData,
        });
  
        if (response.ok) {
          // Successful submission, show a success message or redirect
          alert("Message sent successfully");
          contactForm.reset();
        } else {
          // Handle the error response, e.g., show an error message
          alert("Message sending failed. Please try again later.");
        }
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred. Please try again later.");
      }
    });
  });