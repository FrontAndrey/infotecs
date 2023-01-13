//Drag-and-drop
const dragAndDrop = () => {
    const taskListElement = document.querySelector('.title')
    const taskElement = taskListElement.querySelectorAll('.title_list')

    for (const title of taskElement) {
        title.draggable = true;
    }

    taskListElement.addEventListener('dragstart', (evt) => {
        evt.target.classList.add('selected')
    });

    taskListElement.addEventListener('dragend', (evt) => {
        evt.target.classList.remove('selected')
    });

    const getNextElement = (cursorPosition, currentElement) => {

        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;

        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;

        return nextElement;

    }


    taskListElement.addEventListener('dragover', (evt) => {
        evt.preventDefault();

        const activeElement = taskListElement.querySelector('.selected');
        const currentElement = evt.target;

        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains('title_list');

        if (!isMoveable) {
            return;
        }

        const nextElement = getNextElement(evt.clientY, currentElement);

        if (nextElement &&
            activeElement === nextElement.previousElementSibling ||
            activeElement === nextElement
        ) {
            return;
        }

        taskListElement.insertBefore(activeElement, currentElement);
    });
}
export {
    dragAndDrop
};