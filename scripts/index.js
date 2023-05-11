function update_site_location(target) {
    location.href = target;
}
;
document.addEventListener("DOMContentLoaded", function () {
    const menu_btn = document.getElementById('menuButton');
    menu_btn.addEventListener('change', function () {
        (menu_btn.checked) ? (document.querySelector('.the-bass').classList.add('dropped')) : (document.querySelector('.the-bass').classList.remove('dropped'));
    });
    const gameModal = document.getElementById("gameModal");
    const closeButton = document.querySelector(".close");
    function openModal() {
        gameModal.style.display = "block";
    }
    document.querySelector(".modal_btn").addEventListener("click", openModal);
    function closeModal() {
        gameModal.style.display = "none";
    }
    closeButton.addEventListener("click", closeModal);
    window.addEventListener("click", function (event) {
        if (event.target === gameModal) {
            closeModal();
        }
    });
});
