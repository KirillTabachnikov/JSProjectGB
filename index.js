const goods = [
  { title: 'Shirt', price: 150 },
  { title: 'Socks', price: 50 },
  { title: 'Jacket', price: 350 },
  { title: 'Shoes', price: 250 },
];

class GoodsItem {
  constructor({ title, price }) {
    this.title = title;
    this.price = price;
  }
  render() {
    return `
    <div class="goods-item">
      <img src="../HTMLCSS/cours2/img/Catalog22.png" alt="IMG">
      <h3>${this.title}</h3>
      <p>${this.price}</p>
    </div>
  `;
  }
}
class GoodsList {
  items = [];
  fetchGoods() {
    this.items = goods;
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
goodsList.fetchGoods();
goodsList.render();