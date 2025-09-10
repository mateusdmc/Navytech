const emblaNode = document.querySelector('.embla');
const dotsNode = document.querySelector('.embla__dots');

// Inicializa o Embla Carousel
const options = { loop: false, align: 'start' };
const emblaApi = EmblaCarousel(emblaNode, options);

// Função para criar os pontos de navegação
const setupDots = (emblaApi, dotsNode) => {
    let dots = [];

    const addToggleListener = (dot, index) => {
        dot.addEventListener('click', () => {
            emblaApi.scrollTo(index);
        });
    };

    const toggleDotsClasses = (emblaApi) => {
        const previous = emblaApi.previousScrollSnap();
        const selected = emblaApi.selectedScrollSnap();
        dots[previous].classList.remove('embla__dot--selected');
        dots[selected].classList.add('embla__dot--selected');
    };

    emblaApi.on('init', () => {
        const scrollSnaps = emblaApi.scrollSnapList();

        dots = scrollSnaps.map((_, index) => {
            const dot = document.createElement('button');
            dot.classList.add('embla__dot');
            dot.type = 'button';
            dotsNode.appendChild(dot);
            addToggleListener(dot, index);
            return dot;
        });

        toggleDotsClasses(emblaApi);
    });

    emblaApi.on('select', toggleDotsClasses);
    emblaApi.on('reInit', toggleDotsClasses);
};

setupDots(emblaApi, dotsNode);