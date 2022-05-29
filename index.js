const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

const GET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json'
const GET_BASKET_GOODS_ITEMS = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/getBasket.json'

function service(url, callback) {
  xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.send();
  xhr.onload = () => {
    callback(JSON.parse(xhr.response))
  }
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
  fetchGoods(callback) {
    service(GET_GOODS_ITEMS, (data) => {
      this.items = data;
      callback()
    });
  }

  sumPrice() {
    const sum = this.items.reduce((previousValue, { price }) => {
      return previousValue + price;
    }, 0);
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


const goodsList = new GoodsList();
const basketSum = goodsList.sumPrice();
goodsList.fetchGoods(() => {
  goodsList.render();
});