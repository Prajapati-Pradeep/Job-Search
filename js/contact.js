
document.addEventListener("DOMContentLoaded", function () {
    const contactForm = document.getElementById("contact-form");
  
    contactForm.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const formData = new FormData(contactForm);
  
      try {
        const response = await fetch("/send-email", {
          method: "POST",
          body: formData,
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