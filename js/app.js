// get DOM elements
const container = document.querySelector('.container');
const menuBtns = document.querySelectorAll('.menu-btn');
let timeframe = 'weekly'; //default timeframe

// fetch data from file
fetch('./js/data.json')
    .then(res => res.json())
    .then(dataJson => {

        // create default cards
        dataJson.forEach(item => {
            container.insertAdjacentHTML('beforeend', createCards(item, timeframe));
        });

        // update cards
        menuBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                clearCards();
                activateClickedButton(btn);
                timeframe = btn.dataset.option;

                dataJson.forEach(item => {
                    container.insertAdjacentHTML('beforeend', createCards(item, timeframe));
                })
            })
        })
});

// add active state to clicked button
const activateClickedButton = (btn) => {
    menuBtns.forEach(btn => btn.classList.remove('btn-active'));
    btn.classList.add('btn-active');
}

const clearCards = () => {
    const cards = document.querySelectorAll('.activity-box');
    cards.forEach(card => card.remove());
};

const createCards = (item, timeframe) => {
    let title = item['title'];
    let titleClass = item['title'].toLowerCase().replace(" ", "-");
    let currentTimeframe = item['timeframes'][timeframe]["current"];
    let previousTimeframe = item['timeframes'][timeframe]["previous"];

    const timeFrameMessage = {
        "daily": "Yesterday - ",
        "weekly": "Last Week - ",
        "monthly": "Last Month - "
    }

    return `
        <section class="activity-box activity-box__${titleClass}">
            <div class="activity-time">
            <div class="activity-time__heading">
                <h1>${title}</h1>
                <div class="activity-time__icon"></div>
            </div>
            <div class="activity-time__timeframe">
                <p class="currentHrs">${currentTimeframe}hrs</p>
                <p class="previousHrs">${timeFrameMessage[timeframe]}${previousTimeframe}hrs</p>
            </div>
            </div>
         </section>
    `;
};