document.addEventListener('DOMContentLoaded', function() {
    
        const tela = document.getElementById('tela');
    
        const contexto = tela.getContext('2d');    
    
        const imagem = new Image();
        
        imagem.src = 'imagem-superior.jpg';
        
        imagem.onload = function() {
            
    
            tela.width = 500;
            
            tela.height = 500;
            
            contexto.drawImage(imagem, 0, 0, tela.width, tela.height);
            
            contexto.globalCompositeOperation = 'destination-out';
            
            
        };
    
        tela.addEventListener('mousemove', function(e) {
            
            const retangulo = tela.getBoundingClientRect();
    
            const x = e.clientX - retangulo.left;
    
            const y = e.clientY - retangulo.top;
    
            contexto.beginPath();
    
            contexto.arc(x, y, 30, 0, 2 * Math.PI); 
    
            contexto.fill();
            
        });
    
    });