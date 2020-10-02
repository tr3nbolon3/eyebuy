(function() {
  console.log('*************************************');
  console.log('* EYEBUY SCRIPT SUCCESSFULLY LOADED *');
  console.log('*************************************');

  const init = (options) => {
    setTimeout(() => {
      const addToCart = options.addToCart || (() => {});
      const redirectUrl = options.redirectUrl || window.location.href;

      const urlObject = new URL(window.location.href);
      const jsonProducts = urlObject.searchParams.getAll('products');
      const products = jsonProducts.map(JSON.parse);

      console.log('urlObject.search', urlObject.search);
      document.cookie = `from_eyebuy=${urlObject.search}}`;
      console.log('document.cookie', document.cookie);

      if (!products.length) {
        window.location.replace(redirectUrl);
        return;
      }

      const promisesChain = products
        .slice(1)
        .reduce((acc, product) => {
          return acc.then(() => addToCart(product));
        }, Promise.resolve(addToCart(products[0])));

      promisesChain.then(() => {
        window.location.replace(redirectUrl);
      });
    }, 2000)
  };

  window.eyebuy = init;
}());
