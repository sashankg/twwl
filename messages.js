const times = Object.keys(messageData).map(parseFloat);

function binarySearch(arr,target){
    var midpoint = Math.floor(arr.length/2);

    if (arr[midpoint] === target) {
        return midpoint;
    }
    if (arr.length === 1) {
        return 0;
    }

    if (arr[midpoint] > target) {
        return binarySearch(arr.slice(0,midpoint),target);
    }
    else if (arr[midpoint] < target) {
        return binarySearch(arr.slice(midpoint),target);
    }
}

times.sort()

const offset = new Date(31448786988 - 12312396);

const first = 9000 //binarySearch(times, parseFloat(Date.now() - offset)) + 2;

const pics = {
    'Christina Li': 'https://scontent.fagc1-2.fna.fbcdn.net/v/t1.0-9/71500364_2468942046660787_7118213968706928640_n.jpg?_nc_cat=108&ccb=2&_nc_sid=174925&_nc_ohc=YK8QaA8CxPgAX-M4-Vm&_nc_ht=scontent.fagc1-2.fna&oh=71a5bb31027ff87750b0c1ea6f12e8e7&oe=5FF36DB8',
    'Sashank Gogula': 'https://scontent.fagc1-1.fna.fbcdn.net/v/t1.0-9/46900446_2289367567771527_3304636889394315264_n.jpg?_nc_cat=106&ccb=2&_nc_sid=09cbfe&_nc_ohc=4X5DhOO2_m8AX9Xs0ty&_nc_ht=scontent.fagc1-1.fna&oh=7bf5babcaf01615e81938d93af79fb69&oe=5FF40A03',
    'Kevin Yu': 'https://scontent.fagc1-2.fna.fbcdn.net/v/t1.0-9/60337042_2249629351757520_835415115242143744_n.jpg?_nc_cat=104&ccb=2&_nc_sid=09cbfe&_nc_ohc=ewqwHlOb1GEAX_R8WyB&_nc_ht=scontent.fagc1-2.fna&oh=34dd6ec3ed2554063ff6567aed8ffe23&oe=5FF4C12E',
    'Gayatri Shandar': 'https://scontent-iad3-1.xx.fbcdn.net/v/t1.0-9/121548035_3584361271629990_1629128724742363470_n.jpg?_nc_cat=110&ccb=2&_nc_sid=09cbfe&_nc_ohc=n23zK4ZNjI8AX9CdlyO&_nc_ht=scontent-iad3-1.xx&oh=98c5c6515d393e5dcb7bf60bab2fc800&oe=5FF45C3E'
}

const image = document.getElementById('image');

function repeat(i, prev) {
    while(messageData[times[i]].content === undefined) {
        prev = times[i];
        i = i + 1;
    }
    window.setTimeout(() => {
        var msg = new SpeechSynthesisUtterance(messageData[times[i]].content);
        msg.addEventListener('end', e => {
            if(!window.speechSynthesis.speaking) {
                image.src = "";
            }
        })
        window.speechSynthesis.speak(msg);
        image.src = pics[messageData[times[i]].sender];
        repeat(i + 1, times[i]);
    }, times[i] - prev);
}

const button = document.getElementById('button');
button.onclick = () => {
    repeat(first, times[first])
    button.hidden = true;
}
