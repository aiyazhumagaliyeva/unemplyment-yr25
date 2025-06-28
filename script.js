function typewriterEffect(element, str, speed = 500) {
// defines funcion names typewritedEffect that takes 3 parameters:
//element(DOM element where the typing will appear)
//str(string to be typed) and speed(delay in milliseconds between typing each character)
    if (!element) return;
    //if element is not provided the funclion stops

    const originalHTML = str;
    //stores the original string as "originalHTML"
    element.innerHTML = '';
    //clears contents of the element before starting to type

    let cursor = 0;
    let tempHTML = '';
    const tagStack = [];
    //cursor-keep track of current position of the string. 
    //tempHTML - build progressively typed content
    //tags=Stack-keep track of pen html tags to handle nested tags properly

    function type() {
        //defines the function
        if (cursor >= originalHTML.length) {
            // Clear the cursor after typing is complete
            element.innerHTML = tempHTML; // Set the final content without the cursor
            return;
        }
        //if cursor reached the end of the string the typing is complete. 

        const currentChar = originalHTML[cursor];

        if (currentChar === '<') {
            const closeTagIndex = originalHTML.indexOf('>', cursor);
            const tagContent = originalHTML.slice(cursor, closeTagIndex + 1);
            tempHTML += tagContent;

            // Handle opening and closing tags
            if (/^<\/?\w+/.test(tagContent)) {
                if (!/^<\//.test(tagContent)) {
                    // Opening tag
                    tagStack.push(tagContent);
                } else {
                    // Closing tag
                    tagStack.pop();
                }
            }

            cursor = closeTagIndex + 1;
        } else {
            tempHTML += currentChar;
            cursor++;
        }

        element.innerHTML = tempHTML + '<span class="cursor">|</span>'; // Show cursor
        setTimeout(type, speed);
    }

    type();
}


const testStr = `<div class="content"> 
<div class="line"> Unemployment diaries of Aiya Zh. part one! </div>
<div class="line"> Scroll to unravel the deep dark seecrets of unemplyment >:) </div>
</div>`;

typewriterEffect(document.querySelector('#test'), testStr, 100);

