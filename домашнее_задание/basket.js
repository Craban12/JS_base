'use strict';

const hid = document.querySelector('.hidden');
const basketButton = document.querySelector('.cartIconWrap');
const addButton = document.querySelector('.featuredItems');
const docProduct = document.querySelector('.basketHeader');
const sumProduct = document.querySelector('#sumProducts');

basketButton.addEventListener('click',() => {
    hid.classList.toggle('hidden');
});

let basket = {};

addButton.addEventListener('click', element => {
    /*Не понимаю какую роль здесь выполняет "!", но без него не работает. 
    Погуглил что это унарный оператор "не", 
    но здесь же вроде не выполняется отрицание*/
    if (!element.target.querySelector('button')) {
        const clickItem = element.target.closest('.featuredItem').dataset;
        const idItem = clickItem.id;
        const nameItem = clickItem.name;
        const priceItem = clickItem.price;
        const count = 1;
        addToCart(idItem, nameItem, priceItem, count);

        document.querySelector("div.basketTotal").textContent =
        `Товаров в корзине на сумму:${sumPrice(basket)}`;
        
        sumProduct.textContent = sumCount(basket);
    };
});

class basketFull {
    constructor(id, name, price, count) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.count = count;
    }
}

// Создает таблицу товаров
function addToCart(id, name, price, count) {
    if (!(id in basket)) {
        basket[id] = new  basketFull(id, name, price, count);
        const htmlTextProduct =`
        <div class="basketRow basketHeader products">
            <div>${basket[id].name}</div>
            <div id = count${id}>${basket[id].count}</div>
            <div>${basket[id].price}</div>
            <div id = resultPrice${id}>${basket[id].price * basket[id].count}</div>
        </div>
        `
        docProduct.insertAdjacentHTML("afterend", htmlTextProduct)
    } else {
        basket[id].count++;
        document.querySelector(`#count${id}`).textContent = basket[id].count;
        document.querySelector(`#resultPrice${id}`).textContent = 
        basket[id].price * basket[id].count;
    }
    /*basketCounterEl.textContent = getTotalBasketCount().toString();
    basketTotalValueEl.textContent = getTotalBasketPrice().toFixed(2);
    renderProductInBasket(id);*/
  }


// Выводит общее количество товаров
function sumCount (data) {
    let counter = 0
    let nameProp = Object.getOwnPropertyNames(data)
    nameProp.forEach(element => {
       counter += basket[element].count
    });
    return counter;
};

// Выводит общее сумму товаров
function sumPrice (data) {
    let counter = 0
    let nameProp = Object.getOwnPropertyNames(data)
    nameProp.forEach(element => {
       counter += basket[element].price * basket[element].count
    });
    return counter;
};
