window.onload = document.onload = () => {
    var questions = document.getElementsByClassName('question');
    for (let i = 0; i < questions.length; i++) {
        const e = questions[i];
        e.children[0].addEventListener('click', (f) => {
            onClickSummaryButton(f, e);
        });
    }
}
function onClickSummaryButton(event, questionElement){
    event.preventDefault();
    questionElement.style.overflow = 'hidden';

    if(!questionElement.open){
        questionElement.style.height = `${questionElement.offsetHeight}px`
        questionElement.open = true;

        var contentHeight = questionElement.children[1];
        contentHeight = contentHeight.offsetHeight + parseInt(window.getComputedStyle(contentHeight).getPropertyValue('margin-top')) + parseInt(window.getComputedStyle(contentHeight).getPropertyValue('margin-bottom'));

        window.requestAnimationFrame(() => {
            const startHeight = `${questionElement.offsetHeight}px`;
            const endHeight = `${questionElement.children[0].offsetHeight + contentHeight}px`;

            var animation = questionElement.animate({
                height: [startHeight, endHeight]
            }, {
                duration: 200,
                easing: 'linear'
            })
            animation.onfinish = () => {
                questionElement.style.height = questionElement.style.overflow = '';
            }
        })

    } else {
        var animation = questionElement.animate({
            height: [`${questionElement.offsetHeight}px`, `${questionElement.children[0].offsetHeight}px`]
        }, {
            duration: 200,
            easing: 'linear'
        });
        
        animation.onfinish = () => {
            questionElement.style.height = questionElement.style.overflow = '';
            questionElement.open = false;
        }
    }
}