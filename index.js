document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("travelForm");

    form.addEventListener("submit", async (event) => {
        event.preventDefault(); // Prevent default form submission

        // Collect user input
        const formData = {
            destination: document.getElementById("destination").value,
            travelDates: {
                departure: document.getElementById("departure-date").value,
                return: document.getElementById("return-date").value,
            },
            preferences: {
                budget: document.getElementById("budget").value,
                accommodation: document.getElementById("accommodation").value,
                vacationType: document.querySelector("input[name='vacation-type']:checked")?.value || "",
                activities: [...document.querySelectorAll("input[name='activities']:checked")].map(el => el.value),
            }
        };
        console.log("Form Data:", formData);
        try {
            const response = await fetch("http://localhost:5000/generate-travel-plan", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();
            if (data.response) {
                alert("Generated Travel Plan: " + data.response);
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error submitting form:", error);
            alert("Failed to connect to the server.");
        }
    });
});

