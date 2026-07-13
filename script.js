document.addEventListener('DOMContentLoaded', () => {
    const particlesContainer = document.getElementById('particles-container');
    const particleCount = 20;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');

        const size = Math.random() * 5 + 2;
        const left = Math.random() * 100;
        const animationDuration = Math.random() * 10 + 10;
        const animationDelay = Math.random() * 10;

        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${left}%`;
        particle.style.animationDuration = `${animationDuration}s`;
        particle.style.animationDelay = `${animationDelay}s`;

        particlesContainer.appendChild(particle);
    }

    function goToStep(currentStepId, nextStepId) {
        const current = document.getElementById(currentStepId);
        const next = document.getElementById(nextStepId);

        current.classList.remove('active');

        setTimeout(() => {
            next.classList.add('active');

            if (nextStepId === 'step-2') initStep2();
            if (nextStepId === 'step-3') initStep3();
        }, 1000);
    }

    const progressBar = document.getElementById('progress-bar');
    const statusMessage = document.getElementById('status-message');

    const messages = [
        { time: 0, text: "Menganalisis kenangan..." },
        { time: 1500, text: "Membaca percakapan..." },
        { time: 3000, text: "Menghitung kedekatan..." },
        { time: 4200, text: "Hampir selesai..." }
    ];

    setTimeout(() => {
        progressBar.style.transition = 'width 5s linear';
        progressBar.style.width = '100%';

        messages.forEach(msg => {
            setTimeout(() => {
                statusMessage.innerText = msg.text;
            }, msg.time);
        });

        setTimeout(() => {
            goToStep('step-1', 'step-2');
        }, 5500);
    }, 500);

    function initStep2() {
        const btnStep2 = document.getElementById('btn-step-2');
        btnStep2.style.display = 'inline-block';

        const startDate = new Date('2025-09-16T00:00:00');

        function updateCounter() {
            const now = new Date();
            const diff = now - startDate;

            const days = Math.floor(diff / (1000 * 60 * 60 * 24));
            const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((diff / 1000 / 60) % 60);
            const seconds = Math.floor((diff / 1000) % 60);

            document.getElementById('days-count').innerText = days;
            document.getElementById('hours-count').innerText = hours;
            document.getElementById('mins-count').innerText = minutes;
            document.getElementById('secs-count').innerText = seconds;
        }

        updateCounter();
        setInterval(updateCounter, 1000);
    }

    document.getElementById('btn-step-2').addEventListener('click', () => {
        goToStep('step-2', 'step-3');
    });

    const typeWriterLines = [
        "AKu punya sesuatu yang pengen aku sampein ke kamu...",
        "Aku harap setelah ini kita tetep bisa baik-baik aja...",
        "Dan tetep temenan seperti biasa...",
        "i just want to say..."
    ];
    let currentLineIndex = 0;
    let typeWriterInterval = null;
    let isTyping = false;

    const typeWriterElement = document.getElementById('typewriter-text');
    const btnStep3 = document.getElementById('btn-step-3');

    function typeLine(text, callback) {
        isTyping = true;
        typeWriterElement.innerText = '';
        let i = 0;
        btnStep3.style.opacity = '0';
        btnStep3.style.pointerEvents = 'none';

        typeWriterInterval = setInterval(() => {
            if (i < text.length) {
                typeWriterElement.innerText += text.charAt(i);
                i++;
            } else {
                clearInterval(typeWriterInterval);
                isTyping = false;

                btnStep3.style.opacity = '1';
                btnStep3.style.pointerEvents = 'auto';

                if (callback) callback();
            }
        }, 60);
    }

    function initStep3() {
        setTimeout(() => {
            typeLine(typeWriterLines[currentLineIndex]);
        }, 500);
    }

    btnStep3.addEventListener('click', () => {
        if (isTyping) return;

        currentLineIndex++;

        if (currentLineIndex < typeWriterLines.length) {
            typeLine(typeWriterLines[currentLineIndex]);
        } else {
            goToStep('step-3', 'step-4');
        }
    });

    const btnAccept = document.getElementById('btn-accept');
    if (btnAccept) {
        btnAccept.addEventListener('click', () => {
            goToStep('step-4', 'step-5');
            startConfetti();

            const bgMusic = document.getElementById('bg-music');
            if (bgMusic) {
                bgMusic.volume = 1;
                bgMusic.play().catch(err => console.log(err));
            }
        });
    }

    function stopMusic() {
        const bgMusic = document.getElementById('bg-music');
        if (bgMusic) {
            let volume = 1;
            const fadeInterval = setInterval(() => {
                if (volume > 0.05) {
                    volume -= 0.05;
                    bgMusic.volume = volume;
                } else {
                    bgMusic.volume = 0;
                    bgMusic.pause();
                    clearInterval(fadeInterval);
                }
            }, 50);
        }
    }

    function startConfetti() {
        const confettiContainer = document.getElementById('confetti-container');
        const colors = ['#6366F1', '#EC4899', '#ffffff', '#a5b4fc'];

        setInterval(() => {
            if (!document.getElementById('step-5').classList.contains('active') && !document.getElementById('step-7').classList.contains('active')) return;

            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');

            const left = Math.random() * 100;
            const duration = Math.random() * 3 + 2;
            const width = Math.random() * 8 + 4;
            const height = Math.random() * 15 + 10;
            const color = colors[Math.floor(Math.random() * colors.length)];

            confetti.style.left = `${left}%`;
            confetti.style.animationDuration = `${duration}s`;
            confetti.style.width = `${width}px`;
            confetti.style.height = `${height}px`;
            confetti.style.backgroundColor = color;
            confetti.style.borderRadius = '2px';

            confettiContainer.appendChild(confetti);

            setTimeout(() => {
                confetti.remove();
            }, duration * 1000);
        }, 150);
    }

    const btnNextCelebration = document.getElementById('btn-next-celebration');
    if (btnNextCelebration) {
        btnNextCelebration.addEventListener('click', () => {
            goToStep('step-5', 'step-7');
        });
    }

    const btnChat = document.getElementById('btn-chat');
    if (btnChat) {
        btnChat.addEventListener('click', () => {
            const chatLink = "https://wa.me/6281234567890";
            window.open(chatLink, "_blank");
        });
    }

    const btnChatFriends = document.getElementById('btn-chat-friends');
    if (btnChatFriends) {
        btnChatFriends.addEventListener('click', () => {
            const chatLink = "https://wa.me/6281234567890";
            window.open(chatLink, "_blank");
        });
    }

    const btnReject = document.getElementById('btn-reject');
    if (btnReject) {
        btnReject.addEventListener('click', () => {
            goToStep('step-4', 'step-6');
            stopMusic();
        });
    }
});
