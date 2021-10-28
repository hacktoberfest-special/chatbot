
// function which adds the text to the chat window
function createText(party, content) {
    var text = document.createElement('div');
    if (typeof (content) == 'string') {
        text.textContent = content;
    } else {
        text.appendChild(content)
    }
    // party can be 'me', 'you'
    text.classList.add('chat-bubble', party);
    return text;
}

function createTypingEffect(party) {

    const animate1 = document.createElementNS("http://www.w3.org/2000/svg", "animate");
    animate1.setAttribute('attributeName', 'cy');
    animate1.setAttribute('calcMode', 'spline');
    animate1.setAttribute('keySplines', '0 0.5 0.5 1;0.5 0 1 0.5;0.5 0.5 0.5 0.5');
    animate1.setAttribute('repeatCount', 'indefinite');
    animate1.setAttribute('values', '57.5;42.5;57.5;57.5');
    animate1.setAttribute('keyTimes', '0;0.3;0.6;1');
    animate1.setAttribute('dur', '1s');

    const animate2 = animate1.cloneNode(true);
    const animate3 = animate1.cloneNode(true);

    animate1.setAttribute('begin', '-0.6s');
    animate2.setAttribute('begin', '-0.39999999999999997s');
    animate3.setAttribute('begin', '-0.19999999999999998s');

    const circle1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle1.setAttribute("fill", '#ffffff');
    circle1.setAttribute("r", 15);

    const circle2 = circle1.cloneNode(true);
    const circle3 = circle1.cloneNode(true);

    circle1.setAttribute("cx", 0);
    circle1.setAttribute("cy", 44.1678);
    circle1.appendChild(animate1);

    circle2.setAttribute("cx", 45);
    circle2.setAttribute("cy", 43.0965);
    circle2.appendChild(animate2);

    circle3.setAttribute("cx", 90);
    circle3.setAttribute("cy", 52.0442);
    circle3.appendChild(animate3);

    var effect = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    effect.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
    effect.setAttribute('style', 'margin: auto;display: block;shape-rendering: auto;width: 43px;height: 20px;');
    effect.setAttribute('viewBox', '0 0 100 100');
    effect.setAttribute('preserveAspectRatio', 'xMidYMid');
    effect.appendChild(circle1);
    effect.appendChild(circle2);
    effect.appendChild(circle3);

    var div = document.createElement('div');
    div.appendChild(effect);
    if (party == 'me') {
        div.classList.add('chat-bubble', 'me');
    } else {
        div.classList.add('chat-bubble', 'you');
    }
    return div;
}

function createChoices(choices) {
    let columns = [], rows = []
    for (let choice of choices) {
        let col = document.createElement('div');
        col.classList.add('col-4', 'chat-bubble', 'choice');
        col.textContent = choice;
        col.addEventListener('click', function () {
            clickedChoice(choice);
        });
        columns.push(col);
    }
    for (i = 0; i < (columns.length); i += 2) {
        var tempRow = document.createElement('div');
        tempRow.classList.add('row');
        tempRow.appendChild(columns[i]);
        try {
            tempRow.appendChild(columns[i + 1]);
        } catch (error) {

        }
        rows.push(tempRow);
    }


    mainDiv = document.createElement('div');
    mainDiv.classList.add('container', 'chat-bubble', 'pt-0', 'pl-3');
    for (let row of rows) {
        mainDiv.appendChild(row);
    }
    return mainDiv;
}




// functions

function clickedChoice(choice) {
    let delay = 1200;
    addUserText(choice);
    switch (choice.toLowerCase()) {
        // first layer options
        case 'contact':
            // To run the functions one after the other
            // The delay also compensates the whole the time taken in respond function(typing and adding text)
            respond(content = 'Please email your concern to quantifierschd@gmail.com or fill the contact form of homepage.');
            setTimeout(function () {
                respond(content = 'Thank you!');
            }, delay);
            break;
        case 'courses':
            respond(content = 'You will be redirected to our courses page shortly');
            setTimeout(function () {
                respond(content = 'Thank you!');
                setTimeout(function () {
                    window.location.href = '/plans/';
                }, delay + 1000);
            }, delay);
            break;
        case 'resources':
            respond(content = 'What are you looking for in resources?', options = ['Youtube Videos', 'Featured Books']);
            break;
        case 'blogs':
            respond(content = 'Which kind of blogs are you searching for?', options = ['Academic', 'General']);
            break;

        // second layer options
        case 'academic':
            respond(content = 'You will be redirected to our academic blogs page shortly');
            setTimeout(function () {
                respond(content = 'Thank you!');
                setTimeout(function () {
                    window.location.href = '/blogs/academic/';
                }, delay + 1000);
            }, delay);
            break;
        case 'general':
            respond(content = 'You will be redirected to our general blogs page shortly');
            setTimeout(function () {
                respond(content = 'Thank you!');
                setTimeout(function () {
                    window.location.href = '/blogs/general/';
                }, delay + 1000);
            }, delay);
            break;
        case 'youtube videos':
            respond(content = 'You will be redirected to our youtube resources page shortly');
            setTimeout(function () {
                respond(content = 'Thank you!');
                setTimeout(function () {
                    window.location.href = '/free_resources/#youtube/';
                }, delay + 1000);
            }, delay);
            break;
        case 'featured books':
            respond(content = 'You will be redirected to our featured books page shortly');
            setTimeout(function () {
                respond(content = 'Thank you!');
                setTimeout(function () {
                    window.location.href = '/free_resources/#books/';
                }, delay + 1000);
            }, delay);
            break;
        default:
            console.log('default');
            break;
    }
}

function addUserText(content) {
    $('.chat-body').append(createText('me', content));
    $(".chat-body").animate({
        scrollTop: $(
            '.chat-body').get(0).scrollHeight
    }, 2000);
}

function addTypingEffect(delay, callback=()=>{}) {
    $('.chat-body').append(createTypingEffect());
    setTimeout(function () {
        $('.chat-body > div').last().remove();
        callback()
    }, delay);
}

function respond(content, options, initialize = false) {
    let delay1 = 900, delay2 = 700
    if (initialize) {
        delay1 = 1200;
        let dayList = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        let date = new Date();
        day = dayList[date.getDay()]
        $('#timestamp').text(day + ', ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }));
    }
    addTypingEffect(delay1, () => {
        $('.chat-body').append(createText('you', content));
        if (options) {
            addTypingEffect(delay2, () => {
                $('.chat-body').append(createChoices(options));
            });
        }
    });
}