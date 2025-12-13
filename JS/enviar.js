// Formulário de Contato
const form = document.getElementById("contactForm");
const submitButton = document.getElementById("submitButton");

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    submitButton.innerHTML = "Enviando...";
    submitButton.disabled = true;

    const formData = new FormData(form);
    try {
        const response = await fetch(form.action, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            submitButton.innerHTML = "Enviado!";
            submitButton.disabled = false;

            // Reseta o formulário após 2 segundos e volta o botão para o texto "Enviar"
            setTimeout(() => {
                submitButton.innerHTML = 'Enviar <i class="uil uil-message"></i>';
                form.reset();
            }, 5000);
        } else {
            submitButton.innerHTML = "Erro!";
            setTimeout(() => {
                submitButton.innerHTML = 'Enviar <i class="uil uil-message"></i>';
                submitButton.disabled = false;
            }, 5000);
        }
    } catch (error) {
        submitButton.innerHTML = "Erro!";
        setTimeout(() => {
            submitButton.innerHTML = 'Enviar <i class="uil uil-message"></i>';
            submitButton.disabled = false;
        }, 5000);
    }
});

// Formulário de Depoimentos
const testimonialForm = document.getElementById("testimonialForm");
const testimonialButton = document.getElementById("testimonialButton");

testimonialForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    testimonialButton.innerHTML = "Enviando...";
    testimonialButton.disabled = true;

    const formData = new FormData(testimonialForm);
    try {
        const response = await fetch(testimonialForm.action, {
            method: "POST",
            body: formData,
        });

        if (response.ok) {
            testimonialButton.innerHTML = "Enviado!";
            testimonialButton.disabled = false;

            setTimeout(() => {
                testimonialButton.innerHTML = 'Enviar Depoimento <i class="uil uil-star"></i>';
                testimonialForm.reset();
            }, 5000);
        } else {
            testimonialButton.innerHTML = "Erro!";
            setTimeout(() => {
                testimonialButton.innerHTML = 'Enviar Depoimento <i class="uil uil-star"></i>';
                testimonialButton.disabled = false;
            }, 5000);
        }
    } catch (error) {
        testimonialButton.innerHTML = "Erro!";
        setTimeout(() => {
            testimonialButton.innerHTML = 'Enviar Depoimento <i class="uil uil-star"></i>';
            testimonialButton.disabled = false;
        }, 5000);
    }
});