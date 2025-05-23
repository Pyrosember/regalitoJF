document.addEventListener('DOMContentLoaded', () => {
    // --- Lógica ESPECÍFICA para ACERTIJO 2 ---
    const claveInput = document.getElementById('claveInput');
    const verificarClaveBtn = document.getElementById('verificarClave');
    const feedbackMessage = document.getElementById('feedbackMessage');
    const nextButtonContainer = document.getElementById('nextButtonContainer');
    const nextButtonLink = document.querySelector('#nextButtonContainer .action-button');

    // Solo ejecutar la lógica si los elementos del formulario existen en esta página
    if (claveInput && verificarClaveBtn && feedbackMessage && nextButtonContainer && nextButtonLink) {
        const CLAVE_CORRECTA = "la enfermera"; // O "enfermera"
        const PAGINA_SIGUIENTE = "acertijo3.html"; // La página después de este acertijo

        nextButtonLink.href = PAGINA_SIGUIENTE; // Asegurarse de que el enlace es correcto

        verificarClaveBtn.addEventListener('click', () => {
            const inputValue = claveInput.value.trim().toLowerCase();

            if (inputValue === CLAVE_CORRECTA) {
                feedbackMessage.textContent = "¡La verdad ha sido desvelada! Preparado para el siguiente paso.";
                feedbackMessage.style.color = '#7CFC00'; // Verde brillante
                feedbackMessage.classList.add('show');
                
                nextButtonContainer.classList.add('show');
                claveInput.disabled = true;
                verificarClaveBtn.disabled = true;

            } else {
                feedbackMessage.textContent = "No es correcto, viajero. Tu ingenio debe ser más agudo.";
                feedbackMessage.style.color = '#FF6347'; // Rojo
                feedbackMessage.classList.add('show');
                nextButtonContainer.classList.remove('show');

                setTimeout(() => {
                    feedbackMessage.classList.remove('show');
                    claveInput.value = '';
                }, 3000);
            }
        });

        claveInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
                verificarClaveBtn.click();
            }
        });
    }
});