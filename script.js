const topScores = [
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'},
    {name: '황규진', score: 0, realname: '황규진'}
]

const nicknameInput = document.querySelector('#nickname');
const scoreInput = document.querySelector('#score');
const realnameInput = document.querySelector('#realname');
const returnBtn = document.querySelector('#return');
const cancelBtn = document.querySelector('#cancel');
const first = document.querySelector('#first');
const second = document.querySelector('#second');
const third = document.querySelector('#third');
const fourth = document.querySelector('#fourth');
const fifth = document.querySelector('#fifth');
const sixth = document.querySelector('#sixth');
const seventh = document.querySelector('#seventh');
const eighth = document.querySelector('#eighth');
const ninth = document.querySelector('#ninth');
const tenth = document.querySelector('#tenth');
const toolsBtn = document.querySelector('#tools');
const exportCSV = document.querySelector('#csvBtn');
const importCSV = document.querySelector('#csvInput');


returnBtn.addEventListener('click', function() {
    const nickname = document.querySelector('#nickname').value;
    const score = document.querySelector('#score').value;
    const realname = document.querySelector('#realname').value;
    for(let i = 0; i < 10; i++) {
        if(topScores[i].score < Number(score)) {
            topScores.splice(i, 0, {name: nickname, score: score, realname: realname});
            topScores.pop();
            break;
        }
    }
    refresh();
});

cancelBtn.addEventListener('click', function() {
    nicknameInput.value = '';
    scoreInput.value = '';
    realnameInput.value = '';
});

toolsBtn.addEventListener('click', function() {
    const inputPlain = prompt("비밀번호 입력");
    const inputHash = CryptoJS.MD5(inputPlain).toString();
    if (inputHash == "4949ddc58872b6cec504f2c683cb1f24") {
        hideAdmin();
    }else {alert("비밀번호가 일치하지 않습니다");}
    console.log(inputHash);
});

importCSV.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    console.log('CSV 불러오기');

    reader.onload = function(event) {
        const csvData = event.target.result;
        let columns;

        let rows = csvData.split('\n');
        for(let i = 0; i < 10; i++) {
            columns = rows[i].split(',');
            topScores[i].name = columns[0];
            topScores[i].score = columns[1];
            topScores[i].realname = columns[2];
        }
        refresh();
        hideAdmin();
    };
    reader.readAsText(file, 'utf-8');
});

exportCSV.addEventListener('click', function() {
    console.log('CSV 내보내기');
    const exportData = [

    ];
    for(let i = 0; i < 10; i++) {
        exportData[i] = [topScores[i].name, topScores[i].score, topScores[i].realname];
    }

    const csvString = exportData.map(row => row.join(',')).join('\n');
    const blob = new Blob(["\uFEFF" + csvString], {type: 'text/csv;charset=utf-8;'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = '풍비박산.csv';
    link.click();
    URL.revokeObjectURL(url);
});

function hideAdmin() {
    exportCSV.classList.toggle('hidden');
    importCSV.classList.toggle('hidden');
};

function refresh() {
    first.textContent = topScores[0].name + ' ' + topScores[0].score + '점';
    second.textContent = topScores[1].name + ' ' + topScores[1].score + '점';
    third.textContent = topScores[2].name + ' ' + topScores[2].score + '점';
    fourth.textContent = topScores[3].name + ' ' + topScores[3].score + '점';
    fifth.textContent = topScores[4].name + ' ' + topScores[4].score + '점';
    sixth.textContent = topScores[5].name + ' ' + topScores[5].score + '점';
    seventh.textContent = topScores[6].name + ' ' + topScores[6].score + '점';
    eighth.textContent = topScores[7].name + ' ' + topScores[7].score + '점';
    ninth.textContent = topScores[8].name + ' ' + topScores[8].score + '점';
    tenth.textContent = topScores[9].name + ' ' + topScores[9].score + '점';

    console.log('====== 현재 상태 =====');
    for(let i = 0; i < 10; i++) {
        console.log((i + 1) + '등 닉네임: ' + topScores[i].name + ' / 본명: ' + topScores[i].realname + ' / 점수: ' + topScores[i].score + '점\n');
    }
    console.log('=====================');
};



refresh();