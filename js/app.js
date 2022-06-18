let timeframe = 'weekly'; //default timeframe
const container = document.querySelector('.container');
let cards; //placeholder for work,study, play etc

const menuBtns = document.querySelectorAll('.menu-btn');

// menuBtns.forEach(elem => {
//     elem.addEventListener('click', menuOnClick);
// })

// get data from json file and invoke functions on cards
let data = {};

fetch('./js/data.json')
    .then(res => res.json())
    .then(dataJson => {

        // create cards
        dataJson.forEach( elem => {
            container.insertAdjacentHTML("beforeend", createCards(elem, timeframe))
        });

        // convert array to dict
        dataJson.forEach(el => {
            data[el.title] = el.timeframes;
        });

        cards = document.querySelectorAll('.activity-box');
});

// Functions:

// const menuOnClick = event => {
    
// }

// add white color to clicked button 
const activateClickedButton = (btn) => {
    menuBtns.forEach(btn => btn.classList.remove('btn-active'));
    btn.classList.add('btn-active');
}

const updateCards = (timeframe) => {
    cards.forEach(card => {
        updateSingleCard(card, timeframe);
    })
};


const updateSingleCard = (card, timeframe) => {
    const title = card.querySelector('.activity-time__heading h1').innerText;
    const current = data[title][timeframe]['current'];
    const previous = data[title][timeframe]['previous'];

    const timeFrameMessage = {
        "daily": "Yesterday - ",
        "weekly": "Last Week - ",
        "monthly": "Last Month - "
    }

    const currentHrsElem = document.querySelector('.currentHrs');
    const previousHrsElem = document.querySelector('.previousHrs');


    currentHrsElem.innerText = `${current}hrs`;
    previousHrsElem.innerText = `${timeFrameMessage[timeframe]}${previous}hrs`;
}

const createCards = (elem, timeframe) => {
    let title = elem['title'];
    let titleClass = elem['title'].toLowerCase().replace(" ", "-");
    let currentTimeframe = elem['timeframes'][timeframe]["current"];
    let previousTimeframe = elem['timeframes'][timeframe]["previous"];

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


// listener
menuBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        activateClickedButton(btn);

        const clickedOption = btn.dataset.option;
        timeframe = clickedOption;
        console.log(timeframe);

        updateCards(timeframe);
    })
 })
