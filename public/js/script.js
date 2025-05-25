    // zet de focus gelijk op de popup wanneer deze word geopend. Dit is een enchanment voor o.a. screenreaders zodat ze weten wat ze moeten voorlezen
    // ik ben hier nog beetje mee aan het spelen om op de goede plek de focus te leggen

    const dialog = document.getElementById('my-popover');
    const openButton = document.querySelector('[popovertarget="my-popover"]');

    dialog.addEventListener('toggle', () => {
        if (dialog.open) {
            // Focus op container zelf, zodat screenreader de naam (titel) voorleest
            dialog.focus();
        } else {
            openButton.focus();
        }
    });

    