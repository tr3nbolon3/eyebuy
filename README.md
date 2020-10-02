[demo](http://halting-cat.surge.sh/index.html?products=%7B"id"%3A1%2C"price"%3A200%2C"count"%3A1%7D&products=%7B"id"%3A2%2C"price"%3A300%2C"count"%3A2%7D&products=%7B"id"%3A3%2C"price"%3A400%2C"count"%3A1%7D)

1. Добавить на сайт страницу формата `<domain-name>/checkout-eyebuy`
2. Добавить на эту страницу eyebuy скрипт и инициализируйте его

```
  <script src="https://cdn.jsdelivr.net/gh/Haliont/eyebuy/index.js"></script>
  <script>
    window.eyebuy({
      addToCart: (product) => {
        return new Promise((resolve) => setTimeout(resolve, 2000))
          .then(() => {
            const productsJSON = localStorage.getItem('products');
            const products = JSON.parse(productsJSON) || [];

            const newProducts = [...products, product];
            const newProductsJSON = JSON.stringify(newProducts);
            localStorage.setItem('products', newProductsJSON);
          });
      },
      redirectUrl: './cart.html',
    });
  </script>
```

addToCart - функция для добавления товаров в корзину
redirectUrl - ссылка на которую будет выполнен переход после добавления товаров в корзину
