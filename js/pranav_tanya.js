const JSERVICE_API = "https://jservice.io"
const CATEGORIES_URL = `${JSERVICE_API}/api/categories?count=5`

var categoriesRequest = $.getJSON(CATEGORIES_URL, function(){
    console.log("Getting categories")
})
.done(function (categories){
    console.log(categories)
    for(let row of categories){
        createCategory(row)
        var categoryDetailRequest = $.getJSON(`${JSERVICE_API}/api/category?id=${row.id}`, function(){
            console.log("Getting category details")
        })
        .done(function (categoryDetails){
            let count = 0;
            let row2 = 0;
            for(let row1=0; row1<20; row1++){
                if(categoryDetails.clues[row1].value == null) {
                    console.log(categoryDetails.clues[row1].value== null)
                    continue;
                }
                else{
                    count++;
                    row2 = row1;
                }
                if(count < 6) {
                    createTile(row.id,categoryDetails.clues[row2])
                }
            }
        })
        .fail(function() {
            console.log("fail")
        })
        .always(function() {
            console.log("always")
        })
    }
    $("<button/>", {
        text: "Reset",
        class: "reset",
        click: function() {
            window.location.reload()
        }
    })
    .appendTo("#container")
})
.fail(function() {
    console.log("fail")
})
.always(function() {
    console.log("always")
})

function createCategory(category) {
    $("<div/>", {
        id: category.id,
        class: "category",
        html: `<h1>${category.title}</h1>`
    })
    .appendTo("#gameBoard")
}

function createTile(categoryId,categoryDetails) {
    console.log(categoryDetails)
    let catId=`#${categoryId}`
    $("<button/>", {
        class: categoryDetails.value,
        id: "category-value",
        text: categoryDetails.value,
        click: function(){
            showQuestion(categoryDetails.question, categoryDetails.answer)
            $(this).removeClass();
            $(this).removeAttr('id');
            $(this).addClass("tile");
        }
    })
    .appendTo(catId)
}

function showQuestion(question, answer) {
    $("#popup1").empty()
    $("<div/>", {
        id: "popup1",
        class: "overlay"
    })
    .appendTo("#container")
    $("<div/>", {
        class: "questionBoard",
    })
    .appendTo("#popup1")
    $("<h2/>", {
        text: question,
    })
    .appendTo(".questionBoard")
    $("<button/>", {
        class: "close",
        text: "X",
        click: function() {
            $(".questionBoard").remove()
            $(".overlay").remove()
        }
    })
    .appendTo(".questionBoard")
    $("<button/>", {
        text: "Show answer",
        class: "showAnswerBtn",
        click: function (){
            showAnswer(answer)
        }
    })
    .appendTo(".questionBoard")
    
} 

function showAnswer(answer){
    $(".answer").empty()
    $(".showAnswerBtn").remove()
    console.log(answer)
    $("<h2/>", {
        text: answer,
        class: "answer"
    })
    .appendTo(".questionBoard")
}
