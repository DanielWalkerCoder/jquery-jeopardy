// let savedScore = window.localStorage.getItem('savedScore')
// let savedHighScore = window.localStorage.getItem('savedHighScore')
// let scoreDisplay = $('#h41')
// let highDisplay = $('#h42')
// let score = savedScore ? savedScore : 0
// let highScore = savedHighScore ? savedHighScore : 0
// scoreDisplay.text(`YOUR SCORE: $${score}`)
// highDisplay.text(`HIGH SCORE: $${highScore}`)
// let gameBoard = $('.gameBoard')
// let prizes = ['$100', '$200', '$400', '$600', '$800']
// let generatedText1 = $('.generatedText1')
// let generatedText2 = $('.generatedText2')
// let coin = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
// let QObj


// //This creates the grid
// for(let i = 0; i < 5; i++){
//     let column = $('<div>')
//     column.addClass(`column`)
//     column.attr('id', `column${i}`)
//     for(let j = 0; j < 5; j++){
//         let question = $('<div>')
//         question.addClass(`question${j}`)
//         question.addClass(`block`)
//         let num = 5*i + j
//         question.attr('id', `block${num}`)
//         question.text(prizes[j])
//         column.append(question)
//     }
//     gameBoard.append(column)
// }

// //This generates a question when a cell is clicked and darkens the cell
// for(let i = 0; i < 25; i++){
//     document.querySelector(`#block${i}`).addEventListener('mouseup', () =>{
//         if(coin[i] === 0){
//             coin[i] += 1
//             fetch(`./jeopardy.json`)
//                 .then(data => data.json())
//                 .then(data =>{
//                     let goodQuestions = []
//                     for(obj of data){
//                         if(obj.value === prizes[i % 5]){
//                             goodQuestions.push(obj)
//                         }
//                     }
//                     return goodQuestions
//                 })
//                 .then(data =>{
//                     let randomInt = Math.floor(Math.random() * data.length)
//                     generatedText1.text(`Category: ${data[randomInt].category}`)
//                     generatedText2.text(`Question: ${data[randomInt].question}`)
//                     QObj = data[randomInt]
//                     console.log(QObj)
//                 })
//         }
//     })
// }

// // This darkens each clicked cell
// gameBoard.on('mouseup', (event)=>{
//     // console.log(event)
//     event.target.style.backgroundColor = 'black'
// })


// // This judges the user's answer and stores the user score and high score
// document.querySelector('#storeValue').addEventListener('click', () =>{
//     if(QObj !== ''){
//         if(document.querySelector('#text').value.toLowerCase() === QObj.answer.toLowerCase()){
//             generatedText1.text('Correct! You earned fictional Money!')
//             generatedText2.text('')
//             score = parseInt(score) + parseInt(QObj.value[1] * 100)
//             scoreDisplay.text(`YOUR SCORE: $${score}`)
//             window.localStorage.setItem('savedScore', score)
//             if(score > highScore){
//                 highScore = score
//                 window.localStorage.setItem('savedHighScore', highScore)
//                 highDisplay.text(`HIGH SCORE: $${highScore}`)
//             }
//             QObj = ''
//         } else{
//             generatedText1.text(`Incorrect. The answer is "${QObj.answer}"`)
//             generatedText2.text('')
//             QObj = ''
//         }
//     }
// })

// //This resets the game and user score but keeps the high score
// let reset = $('#reset')
// reset.on('click', ()=>{
//     window.localStorage.setItem('savedScore', 0)
//     score = 0
//     scoreDisplay.text(`YOUR SCORE: $${score}`)
//     document.querySelector('#text').value = ''
//     generatedText1.text('')
//     generatedText2.text('')
// })




let savedScore = window.localStorage.getItem('savedScore')
let savedHighScore = window.localStorage.getItem('savedHighScore')
let coin = window.localStorage.getItem('coin')
let clicked = coin ? coin : '0000000000000000000000000'
let scoreDisplay = $('#h41')
let highDisplay = $('#h42')
let score = savedScore ? savedScore : 0
let highScore = savedHighScore ? savedHighScore : 0
scoreDisplay.text(`YOUR SCORE: $${score}`)
highDisplay.text(`HIGH SCORE: $${highScore}`)
let gameBoard = $('.gameBoard')
let prizes = ['$100', '$200', '$400', '$600', '$800']
let generatedText1 = $('.generatedText1')
let generatedText2 = $('.generatedText2')
let QObj


//This creates the grid
for(let i = 0; i < 5; i++){
    let column = $('<div>')
    column.addClass(`column`)
    column.attr('id', `column${i}`)
    for(let j = 0; j < 5; j++){
        let question = $('<div>')
        question.addClass(`question${j}`)
        question.addClass(`block`)
        let num = 5*i + j
        question.attr('id', `block${num}`)
        question.text(prizes[j])
        column.append(question)
    }
    gameBoard.append(column)
}
for(let i = 0; i < 25; i++){
    if(clicked[i] !== '0'){
        document.querySelector(`#block${i}`).style.backgroundColor = 'black'
        document.querySelector(`#block${i}`).style.color = 'black'
    }
}

//This generates a question when a cell is clicked
for(let i = 0; i < 25; i++){
    document.querySelector(`#block${i}`).addEventListener('mouseup', () =>{
        if(clicked[i] === '0'){
            clicked = clicked.slice(0, i) + '1' + clicked.slice(i + 1, 25)
            window.localStorage.setItem('coin', clicked)
            fetch(`./jeopardy.json`)
                .then(data => data.json())
                .then(data =>{
                    let goodQuestions = []
                    for(obj of data){
                        if(obj.value === prizes[i % 5]){
                            goodQuestions.push(obj)
                        }
                    }
                    return goodQuestions
                })
                .then(data =>{
                    let randomInt = Math.floor(Math.random() * data.length)
                    generatedText1.text(`Category: ${data[randomInt].category}`)
                    generatedText2.text(`Question: ${data[randomInt].question}`)
                    QObj = data[randomInt]
                    console.log(QObj)
                })
        }
    })
}

// This darkens each clicked cell
gameBoard.on('mouseup', (event)=>{
    // console.log(event)
    event.target.style.backgroundColor = 'black'
    event.target.style.color = 'black'
})


// This judges the user's answer and stores the user score and high score
document.querySelector('#storeValue').addEventListener('click', () =>{
    if(QObj !== ''){
        if(document.querySelector('#text').value.toLowerCase() === QObj.answer.toLowerCase()){
            generatedText1.text('Congrats! You earned fictional Money!')
            generatedText2.text('')
            score = parseInt(score) + parseInt(QObj.value[1] * 100)
            scoreDisplay.text(`YOUR SCORE: $${score}`)
            window.localStorage.setItem('savedScore', score)
            if(score > highScore){
                highScore = score
                window.localStorage.setItem('savedHighScore', highScore)
                highDisplay.text(`HIGH SCORE: $${highScore}`)
            }
            QObj = ''
        } else{
            generatedText1.text(`Incorrect. The answer is "${QObj.answer}"`)
            generatedText2.text('')
            QObj = ''
        }
    }
})

//This resets the game and user score but keeps the high score
let reset = $('#reset')
reset.on('click', ()=>{
    window.localStorage.setItem('savedScore', 0)
    score = 0
    scoreDisplay.text(`YOUR SCORE: $${score}`)
    document.querySelector('#text').value = ''
    generatedText1.text('')
    generatedText2.text('')
    window.localStorage.setItem('coin', '0000000000000000000000000')
    clicked = '0000000000000000000000000'
    for(let i = 0; i < 25; i++){
        document.querySelector(`#block${i}`).style.backgroundColor = 'blue'
        document.querySelector(`#block${i}`).style.color = 'yellow'
    }
})