// // zet de focus gelijk op de popup wanneer deze word geopend. Dit is een enchanment voor o.a. screenreaders zodat ze weten wat ze moeten voorlezen
// // ik ben hier nog beetje mee aan het spelen om op de goede plek de focus te leggen lukt nog niet helemaal

// const dialog = document.getElementById('my-popover');
// const openButton = document.querySelector('[popovertarget="my-popover"]');

// dialog.addEventListener('toggle', () => {
//     if (dialog.open) {
//         // Focus op container zelf, zodat screenreader de naam (titel) voorleest
//         dialog.focus();
//     } else {
//         openButton.focus();
//     }
// });

// voor browsers die geen popover ondersteunen

const dialog = document.getElementById('my-popover');
  const openBtn = document.getElementById('open-popup');

  const supportsPopoverOpen = CSS.supports('selector(:popover-open)');

  if (!supportsPopoverOpen) {
    const closeBtn = document.querySelector('[popovertarget="my-popover"]');

    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        dialog.classList.add('closed');
      });
    }

    openBtn.addEventListener('click', () => {
      dialog.classList.remove('closed');
    });

    // Zorg dat de juiste status actief is bij paginalaad
    dialog.classList.add('closed');
  }