document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Анімація скролінгу ---
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => entry.target.classList.add('show'), index * 100);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.hidden').forEach(el => observer.observe(el));

    // --- 2. 3D Ефект нахилу ---
    const cards = document.querySelectorAll('.tilt-effect');
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left; 
            const y = e.clientY - rect.top;  
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -5; 
            const rotateY = ((x - centerX) / centerX) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
            card.style.transition = 'transform 0.5s ease'; 
        });
        card.addEventListener('mouseenter', () => {
            card.style.transition = 'none'; 
        });
    });

    // --- 3. Логіка Модального вікна (Міні-тест) ---
    const modal = document.getElementById('demoModal');
    const openBtn = document.getElementById('openDemoBtn');
    const closeBtn = document.getElementById('closeDemoBtn');

    openBtn.addEventListener('click', () => {
        modal.classList.add('active');
        resetForm();
    });

    closeBtn.addEventListener('click', () => modal.classList.remove('active'));
    modal.addEventListener('click', (e) => {
        if (e.target === modal) modal.classList.remove('active');
    });
});

// Навігація по кроках форми
function nextStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById(`step${stepNumber}`).classList.add('active');
}

function prevStep(stepNumber) {
    document.querySelectorAll('.step').forEach(step => step.classList.remove('active'));
    document.getElementById(`step${stepNumber}`).classList.add('active');
}

// Проста логіка аналізу
function showResults() {
    const sleep = parseFloat(document.getElementById('sleepInput').value) || 0;
    const steps = parseInt(document.getElementById('stepsInput').value) || 0;
    const resultBox = document.getElementById('analysisResult');
    
    let analysis = "";
    
    // Аналіз сну
    if (sleep < 6) analysis += "🥱 Сон менше 6 годин може впливати на концентрацію. Рекомендуємо додати хоча б годину відпочинку.<br><br>";
    else if (sleep >= 6 && sleep <= 8) analysis += "🔋 Відмінна тривалість сну! Ваш організм добре відновлюється.<br><br>";
    else analysis += "🛌 Спите як котик. Головне — щоб якість сну була високою.<br><br>";

    // Аналіз кроків
    if (steps < 5000) analysis += "🚶 Варто додати трохи активності у ваш день.";
    else if (steps >= 5000 && steps < 10000) analysis += "🏃 Хороший рівень активності, ви на правильному шляху!";
    else analysis += "Ви справжній чемпіон! Чудовий результат за день.";

    resultBox.innerHTML = analysis;
    nextStep(3);
}

// Скидання форми при новому відкритті
function resetForm() {
    document.getElementById('sleepInput').value = '';
    document.getElementById('stepsInput').value = '';
    nextStep(1);
}