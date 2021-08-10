const screens = document.querySelectorAll('.screen');
const choose_car_btns = document.querySelectorAll('.choose-car-btn');
const start_btn = document.getElementById('start-btn');
const game_container = document.getElementById('game-container');

const timeEl = document.getElementById('time');
const scoreEl = document.getElementById('score');
const message = document.getElementById('message');
let seconds = 0;
let score = 0;
let selected_car = {};

start_btn.addEventListener('click', () => screens[0].classList.add('up'));

choose_car_btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        const img = btn.querySelector('img');
        const src = img.getAttribute('src');
        const alt = img.getAttribute('alt');
        selected_car = { src, alt };
        screens[1].classList.add('up');
        setTimeout(createcar, 1000);
        startGame();
    });
});

function startGame() {
    setInterval(increaseTime, 1000);
}

function increaseTime() {
    let m = Math.floor(seconds / 60);
    let s = seconds % 60;
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    timeEl.innerHTML = `Time: ${m}:${s}`;
    seconds++;
}

function createcar() {
    const car = document.createElement('div');
    car.classList.add('car');
    const { x, y } = getRandomLocation();
    car.style.top = `${y}px`;
    car.style.left = `${x}px`;
    car.innerHTML = `<img src="${selected_car.src}" alt="${
        selected_car.alt
    }" style="transform: rotate(${Math.random() * 360}deg)" />`;

    car.addEventListener('click', catchcar);

    game_container.appendChild(car);
}

function getRandomLocation() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const x = Math.random() * (width - 200) + 100;
    const y = Math.random() * (height - 200) + 100;
    return { x, y };
}

function catchcar() {
    increaseScore();
    this.classList.add('caught');
    setTimeout(() => this.remove(), 2000);
    addcars();
}

function addcars() {
    setTimeout(createcar, 1000);
    setTimeout(createcar, 1500);
}

function increaseScore() {
    score++;
    if (score > 19) {
        message.classList.add('visible');
    }
    scoreEl.innerHTML = `Score: ${score}`;
}