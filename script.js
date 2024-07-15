const texts = ["site", "projeto", "currículo", "portfólio"];
let index = 0;
const changingTextintroElement = document.getElementById("changing-text-intro");
function animateText() {
    let text = texts[index];
    let interval = setInterval(() => {
        changingTextintroElement.textContent += text.charAt(0);
        text = text.substring(1);
        if (text === "") {
            clearInterval(interval);
            setTimeout(() => {
                changingTextintroElement.textContent = "";
                index = (index + 1) % texts.length;
                animateText();
            }, 2000);
        }
    }, 150);
}
animateText();
document.addEventListener('DOMContentLoaded', function() {
    const links = document.querySelectorAll('.nav-computador > ul > li > a');
    const sections = [];

    links.forEach(link => {
        const sectionId = link.getAttribute('href').substring(1);
        const section = document.getElementById(sectionId);
        if (section) {
            sections.push({ id: sectionId, element: section });
        }
    });

    // Função para destacar o link ativo
    function highlightActiveLink(entries) {
        entries.forEach(entry => {
            const link = document.querySelector(`a[href="#${entry.target.id}"]`);
            if (entry.isIntersecting) {
                links.forEach(link => link.classList.remove('active'));
                link.classList.add('active');
            }
        });
    }

    // Configuração do IntersectionObserver
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.6 // Ajuste a visibilidade da seção
    };

    const observer = new IntersectionObserver(highlightActiveLink, observerOptions);

    sections.forEach(section => {
        observer.observe(section.element);
    });

    // Adiciona ouvintes de evento de clique para cada link
    links.forEach(function(link) {
        link.addEventListener('click', function(event) {
            // Previne o comportamento padrão do link
            event.preventDefault();
            // Remove a classe 'active' de todos os links
            links.forEach(function(otherLink) {
                otherLink.classList.remove('active');
            });
            // Adiciona a classe 'active' apenas ao link clicado
            this.classList.add('active');
            // Scroll suave para a seção correspondente
            const sectionId = this.getAttribute('href').substring(1);
            const section = document.getElementById(sectionId);
            if (section) {
                section.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Destaca o link ativo inicialmente ao carregar a página
    sections.forEach(section => {
        observer.observe(section.element);
    });
});


