const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const BASE_URL = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/';
const GET_GOODS_ITEMS = `${BASE_URL}catalogData.json`
const GET_BASKET_GOODS_ITEMS = `${BASE_URL}getBasket.json`

function service(url) {
  return new Promise((resolve) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.send();
    xhr.onload = () => {
      if (xhr.readyState === 4) {
        resolve(JSON.parse(xhr.response))
      }
    }
  })
}

class GoodsItem {
  constructor({ product_name, price }) {
    this.product_name = product_name;
    this.price = price;
  }
  render() {
    return `
    <div class="goods-item">
      <img src="../HTMLCSS/cours2/img/Catalog22.png" alt="IMG">
      <h3>${this.product_name}</h3>
      <p>${this.price}</p>
    </div>
  `;
  }
}
class GoodsList {
  items = [];
  filteredItems = [];
  fetchGoods() {
    const prom = service(GET_GOODS_ITEMS);
    prom.then((data) => {
      this.items = data;
      this.filteredItems = data;
    });

    return prom;
  }

  sumPrice() {
    const sum = this.items.reduce((previousValue, { price }) => previousValue + price, 0);
    document.querySelector('.goods-sum').innerHTML = sum;
  }



  render() {
    const goods = this.items.map(item => {
      const goodItem = new GoodsItem(item);
      return goodItem.render()
    }).join('');

    document.querySelector('.goods-list').innerHTML = goods;
  }
}

class BasketGoodsList {
  items = [];
  fetchGoods() {
    service(GET_BASKET_GOODS_ITEMS, (data) => {
      this.items = data.contents;
    });
  }
}

const basketGoodsList = new BasketGoodsList();
basketGoodsList.fetchGoods();
const goodsList = new GoodsList();
const basketSum = goodsList.sumPrice();
goodsList.fetchGoods().then(() => {
  goodsList.render();
});