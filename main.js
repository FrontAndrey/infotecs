//Drag-and-drop 
const dragAndDrop = () => {
    //Находим список и элементы списка 
    const taskListElement = document.querySelector('.title')
    const taskElement = taskListElement.querySelectorAll('.title_list')
    //Присваивем атрибут draggable чтобы была возможность перемещать элементы
    for (const title of taskElement) {
        title.draggable = true;
    }
    //Добавим репкцию на начало и конец перетаскивания, добавляем класс .selected 
    taskListElement.addEventListener('dragstart', (evt) => {
        evt.target.classList.add('selected')
    });

    taskListElement.addEventListener('dragend', (evt) => {
        evt.target.classList.remove('selected')
    });

    const getNextElement = (cursorPosition, currentElement) => {
        //Получаем координаты
        const currentElementCoord = currentElement.getBoundingClientRect();
        const currentElementCenter = currentElementCoord.y + currentElementCoord.height / 2;
        //Если курсор выше центра элемента, возвращаем текущий элемент
        //Иначе — следующий элемент
        const nextElement = (cursorPosition < currentElementCenter) ?
            currentElement :
            currentElement.nextElementSibling;

        return nextElement;

    }


    taskListElement.addEventListener('dragover', (evt) => {
        evt.preventDefault();
        // Разрешаем сбрасывать элементы в эту область
        // Находим перемещаемый элемент
        const activeElement = taskListElement.querySelector('.selected');
        const currentElement = evt.target;

        const isMoveable = activeElement !== currentElement &&
            currentElement.classList.contains('title_list');

        if (!isMoveable) {
            return;
        }
        // Находим элемент, перед которым будем вставлять
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