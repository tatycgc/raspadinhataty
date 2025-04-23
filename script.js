document.addEventListener('DOMContentLoaded', function () {

    const tela = document.getElementById('tela');
    const contexto = tela.getContext('2d');
    const imagem = new Image();

    imagem.src = 'imagem-superior.jpg';

    imagem.onload = function () {
        // Ajusta o tamanho real do canvas para combinar com o tamanho visual
        const bounds = tela.getBoundingClientRect();
        tela.width = bounds.width;
        tela.height = bounds.height;

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
        const coordenadas = obterCoordenadas(e);
        raspar(coordenadas.x, coordenadas.y);
    });

    // Toque (mobile)
    tela.addEventListener('touchmove', function (e) {
        e.preventDefault(); // Impede o scroll ao raspar
        const coordenadas = obterCoordenadas(e);
        raspar(coordenadas.x, coordenadas.y);
    }, { passive: false });

    function obterCoordenadas(evento) {
        const ret = tela.getBoundingClientRect();

        const proporcaoX = tela.width / ret.width;
        const proporcaoY = tela.height / ret.height;

        let x, y;

        if (evento.touches) {
            const toque = evento.touches[0];
            x = (toque.clientX - ret.left) * proporcaoX;
            y = (toque.clientY - ret.top) * proporcaoY;
        } else {
            x = (evento.clientX - ret.left) * proporcaoX;
            y = (evento.clientY - ret.top) * proporcaoY;
        }

        return { x, y };
    }

});
