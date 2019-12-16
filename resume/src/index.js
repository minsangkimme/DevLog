const portraitEl = document.querySelector('.portrait');  // bg

const changeBg = function(id) {
    if (id === 'project1') {
        portraitEl.style.backgroundImage = `url('../public/searchgithub.jpg')`;       
        portraitEl.style.transition = 'all 1s';
    }

    if (id === 'project2') {
        portraitEl.style.backgroundImage = `url('../public/todos.jpg')`;       
        portraitEl.style.transition = 'all 1s';
    }

    if (id === 'project3') {
        portraitEl.style.backgroundImage = `url('../public/nodes.jpg')`;       
        portraitEl.style.transition = 'all 1s';
    }

    if (id === 'project4') {
        portraitEl.style.backgroundImage = `url('../public/cleaner.jpg')`;       
        portraitEl.style.transition = 'all 1s';
    }
}

const originalBg = function() {
    portraitEl.style.backgroundImage = `url('../public/me.png')`;
    portraitEl.style.transition = `all 1s`;
}