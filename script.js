document.addEventListener('DOMContentLoaded', function () {
    const tela = document.getElementById('tela');
    const contexto = tela.getContext('2d');

    const imagem = new Image();
    imagem.src = 'imagem-superior.jpg';

    imagem.onload = function () {
        tela.width = 500;
        tela.height = 500;

        contexto.drawImage(imagem, 0, 0, tela.width, tela.height);
        contexto.globalCompositeOperation = 'destination-out';
    };

    function raspar(x, y) {
        contexto.beginPath();
        contexto.arc(x, y, 30, 0, 2 * Math.PI);
        contexto.fill();
    }

    // Mouse
    tela.addEventListener('mousemove', function (e) {
        if (e.buttons !== 1) return; // só raspa se botão do mouse estiver pressionado
        const rect = tela.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        raspar(x, y);
    });

    // Toque (mobile)
    tela.addEventListener('touchmove', function (e) {
        e.preventDefault(); // evita o scroll da página
        const rect = tela.getBoundingClientRect();
        for (let i = 0; i < e.touches.length; i++) {
            const x = e.touches[i].clientX - rect.left;
            const y = e.touches[i].clientY - rect.top;
            raspar(x, y);
        }
    }, { passive: false });
});
