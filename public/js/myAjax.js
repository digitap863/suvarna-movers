document.addEventListener("DOMContentLoaded", function (event) {
  let myForm = document.getElementById("moving-form");
  myForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const move_from = document.getElementById("move_from").value;
    const move_to = document.getElementById("move_to").value;
    const your_date = document.getElementById("your_date").value;
    const user_name = document.getElementById("user_name").value;
    const email_user = document.getElementById("email_user").value;
    const user_phone = document.getElementById("user_phone").value;
    const user_text = document.getElementById("user_text").value;

    const formData = {
      move_from,
      move_to,
      your_date,
      user_name,
      email_user,
      user_phone,
      user_text,
    };

    fetch("/contact-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        myForm.reset();
        if (data.success) {
          Swal.fire("Good job!", "Thank you for submitting your request!", "success");
        }
        //display a success message or redirect to another page
      })
      .catch((error) => {
        // Handle any errors that occurred during the request
        console.log("Error:", error);
      });
  });
});
