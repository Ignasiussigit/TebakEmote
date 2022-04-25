// ELEMENT CATCHING
const playBtn = document.querySelector('.boxSpan .menu button');
const menu = document.querySelector('.boxSpan .menu');
const boxes = document.querySelectorAll('.box');
const container = document.getElementsByClassName('container')[0];
const [timer1, timer2] = document.querySelectorAll('.timer');
const [timeLeft1, timeLeft2] = document.querySelectorAll('.timeleft');



// DATA LIBRARIES
const emoji = ['🗿', '🗿', '😘', '😘', '😑', '😑', '🥰', '🥰', '😯', '😯', '😪', '😪', '😫', '😫', '😴', '😴'];

// MAIN FUNCTION
playBtn.addEventListener('click', function () {
    // 1.1 COUNT DOWN
    menu.textContent = 3;
    const countDown = setInterval(function () {
        if (menu.textContent > 1) {
            menu.textContent--
        } else {
            menu.textContent = 'MULAI!'
            clearInterval(countDown);
        }
    }, 1000)

    // 1.2 PUTARAN
    const shuffling = setInterval(function () {
        const newEmoji = emoji.sort(() => Math.random() - 0.5)
        for (let i = 0; i < boxes.length; i++) {
            boxes[i].innerHTML = `<span></span>${newEmoji[i]}`;
        }
    }, 100);

    // 2. PROSES GAME
    setTimeout(function () {
        // A. STOP SHUFFLING
        clearInterval(shuffling);
        menu.parentElement.style.display = 'none';
        // console.log(emoji);

        // B. CATCH SPAN ELEMENTS IN BOX CLASSES
        const spanBoxes = document.querySelectorAll('.box span');
        let tempVar;

        // C. ADD CLICKABLE CLASS ON A SPAN BOXES
        for (let spanBox of spanBoxes) {
            spanBox.classList.add('clickable');
            spanBox.style.opacity = 1;
        }

        // D. GAME INTERACTION
        container.addEventListener('click', function (c) {
            for (let i = 0; i < spanBoxes.length; i++) {
                if (spanBoxes[i].classList.contains('clicked')) {
                    tempVar = spanBoxes[i].parentElement.textContent;
                    if (c.target.classList.contains('clickable')) {
                        c.target.style.opacity = 0;
                        c.target.classList.remove('clickable');
                        c.target.classList.add('clicked');
                        if (c.target.parentElement.textContent == tempVar) {
                            c.target.style.opacity = 0.5;
                            c.target.classList.remove('clicked');
                            c.target.classList.add('completed');
                            spanBoxes[i].style.opacity = 0.5;
                            spanBoxes[i].classList.remove('clicked');
                            spanBoxes[i].classList.add('completed');
                        } else if (c.target.parentElement.textContent != tempVar) {
                            c.target.style.opacity = 0;
                            setTimeout(function () {
                                c.target.style.opacity = 1;
                                c.target.classList.remove('clicked');
                                c.target.classList.add('clickable');
                            }, 300)

                            setTimeout(function () {
                                spanBoxes[i].style.opacity = 1;
                                spanBoxes[i].classList.remove('clicked');
                                spanBoxes[i].classList.add('clickable');
                            }, 300)
                        }
                    }
                } else if (i == spanBoxes.length - 1) {
                    if (c.target.classList.contains('clickable')) {
                        c.target.style.opacity = 0;
                        c.target.classList.remove('clickable');
                        c.target.classList.add('clicked');
                    }
                }
            }
        })

        // E. GAME TIMER & RESULT DECISION PROCESS
        timer1.textContent = 30;
        timer2.textContent = timer1.textContent;
        timeLeft1.textContent = 'Sisa Waktu:';
        timeLeft2.textContent = 'Sisa Waktu';

        const timeCount = setInterval(function () {
            if (timer1.textContent > 1) {
                for (let i = 0; i < spanBoxes.length; i++) {
                    if (spanBoxes[i].classList.contains('clickable')) {
                        if (timer1.textContent <= 11) {
                            timer1.style.color = 'red'
                            timer2.style.color = timer1.style.color;
                        }
                        timer1.textContent--
                        timer2.textContent--;
                        return;
                    } else if (i == spanBoxes.length - 1) {
                        clearInterval(timeCount);
                        timer1.textContent = 'MANTUL';
                        timer2.textContent = timer1.textContent;
                        menu.parentElement.style.display = 'inherit';
                        menu.style.width = `100%`;
                        menu.innerHTML = `<h3>🥳 MENANG 🥳</h3>  <br>
                        <p>Main lagi yuk, sayang! ❤</p> <br>
                        <div class="button">
                        <a class="endBtn" href="emojigame.html">OK</a>
                        </div>`;
                        return;
                    }
                }
            } else {
                clearInterval(timeCount);
                timer1.textContent = 'GAME OVER';
                timer2.textContent = timer1.textContent;
                menu.parentElement.style.display = 'inherit';
                menu.style.width = `100%`;
                menu.innerHTML = `<h3>KALAH</h3>
                <p>Ayo coba lagi sayang! ❤</p>
                <div class="button">
                <a class="endBtn" href="emojigame.html">OK</a>
                </div>`;
                return;
            }
        }, 1000)
    }, 3500);
})
