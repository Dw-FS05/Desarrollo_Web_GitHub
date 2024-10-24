document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function(e) {
        this.style.opacity = '0.7';
        setTimeout(() => {
            this.style.opacity = '1';
        }, 200);
    });
});


document.addEventListener('DOMContentLoaded', function() {
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.list-group-item').forEach(link => {
        if (link.getAttribute('href').includes(currentPage)) {
            link.classList.add('active');
        }
    });
});