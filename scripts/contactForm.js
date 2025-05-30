async function submitForm(event) {
    event.preventDefault();

    const form = event.target;
    let isValid = true;

    const width = window.innerWidth;
    let borderWidth = 0

    if (width <= 800) {
        borderWidth = 3;
    } else {
        borderWidth = 6;
    }

    const requiredFields = form.querySelectorAll("[required]");
    let missingFields = [];
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            missingFields.push(field.name);
            field.style.boxShadow = `inset 0 0 0 ${borderWidth}px #FAA548`;
            isValid = false;
        } else {
            field.style.border = "";
        }
    });

    const missingFieldsText = `<span style="color:#FAA548"> ${missingFields.join('</span>, <span style="color:#FAA548">')}</span>`;

    if (!isValid) {
        showAlertModal("ERROR: MISSING REQUIRED FIELDS", `Please fill out all missing fields: ${missingFieldsText}. Then submit again.`);
        return;
    }

    const formData = Object.fromEntries(new FormData(event.target).entries());

    try {
        const response = await fetch("https://www.form-to-email.com/api/s/Od0_hkTc3tVP", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        });

        

    
        if (response.ok) {
            showAlertModal("SUCCESS: MESSAGE WAS SENT", "Thank you for the message. Can't wait to chat!");
            console.log("Form submitted successfully.");
            
            if (event) {
                event.target.reset();
            }
        } else {
            showAlertModal("ERROR: MESSAGE CANNOT BE SENT", "Please try again later or contact me directly at <a href='mailto:joegutman.dev@gmail.com'>joegutman.dev@gmail.com</a>");
            console.log("Error submitting form:", response.status);
        }

    } catch (error) {
        console.error("Error submitting form:", error);
        showAlertModal("ERROR: MESSAGE CANNOT BE SENT", "Sorry, an unknown error occured. Please try again later or contact me directly at <a href='mailto:joegutman.dev@gmail.com'>joegutman.dev@gmail.com</a>");
    }
}