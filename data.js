const dataFunction = () => {

    const cards = document.querySelector('.title')

    fetch(`https://a-4aa6d-default-rtdb.firebaseio.com/db.json?_limit=10`)
        .then((response) => response.json())
        .then((data) => {
            renderItems(data);
        })
        .catch((error) => {
            console.log(error);
        })


    const renderItems = (data) => {
        data.forEach(({
            title,
            description,
            price,
            rating,
            images
        }) => {
            const elem = document.createElement('li');
            elem.classList.add('title_list')

            elem.innerHTML = `
            ${title}
                <ul class="title_drop">
                        <li><div class="card">
                            <img class="card-img" src="${images}" alt="${title}">
                            <div class="card-name">
                                <div class="title-name">${title}</div>
                                </div>
                            <div class="card-price">
                                <div class="price">${price} $</div>
                                <div class="rating">${rating}</div>
                            </div>
                            <p class="description">${description}</p>
                        </div>
                        </li>
                    </ul>
            
            `
            cards.append(elem)

            dragAndDrop()
        });


    }
}

dataFunction()