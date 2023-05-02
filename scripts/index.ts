function update_site_location(target: string) {
    location.href = target;
};

document.addEventListener("DOMContentLoaded", function () {


    // Drop Down Function
    const menuButton = document.getElementById('menuButton') as HTMLInputElement;
    menuButton.addEventListener('change', function () {
        (menuButton.checked) ? (
            document.querySelector('.the-bass').classList.add('dropped')
        ) : (
            document.querySelector('.the-bass').classList.remove('dropped')
        );
    });

});