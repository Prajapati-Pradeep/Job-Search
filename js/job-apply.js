document.addEventListener("DOMContentLoaded", function () {
  const contactForm = document.getElementById("job-apply");

  contactForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const attachment = document.getElementById("attachment").files[0]; // Get the selected file
    const message = document.getElementById("message").value;
    console.log('name ' + name)

    // Create the email data to send to the server
    const emailData = new FormData();
    emailData.append("name", name);
    emailData.append("email", email);
    emailData.append("attachment", attachment);
    emailData.append("message", message);

    const fileSize = attachment.size; // File size in bytes
    console.log(`File size: ${emailData} bytes`);

    try {
      const response = await fetch("http://localhost:3005/sendEmail/job-apply", {
        method: "POST",
        body: emailData, // Use FormData directly as the body
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
