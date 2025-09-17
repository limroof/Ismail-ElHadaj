let option1 = [];
let option2 = [];

window.addEventListener("load", function () {
  init_popUp();
  init_addToCart();
});

function init_popUp() {
  document.querySelectorAll(".product-item-image").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      let productId = event.currentTarget.getAttribute("data-itemid");
      document
        .querySelector(".popup-overlay")
        .setAttribute("data-itemid", productId);
      openClosePopup(productId);
    });
  });

  document.querySelectorAll(".close-icon").forEach(function (elem) {
    elem.addEventListener("click", function (event) {
      let productId = event.currentTarget.getAttribute("data-itemid");
      openClosePopup(productId);
    });
  });

  document
    .querySelector(".popup-overlay")
    .addEventListener("click", function (event) {
      let productId = event.currentTarget.getAttribute("data-itemid");
      openClosePopup(productId);
    });

  function openClosePopup(productId) {
    if (
      document
        .querySelector('.product-item-popup[data-itemid="' + productId + '"]')
        .className.indexOf("show_popup") < 0
    ) {
      document
        .querySelector('.product-item-popup[data-itemid="' + productId + '"]')
        .classList.add("show_popup");
      document.querySelector(".popup-overlay").classList.add("show");
    } else {
      document
        .querySelector('.product-item-popup[data-itemid="' + productId + '"]')
        .classList.remove("show_popup");
      document.querySelector(".popup-overlay").classList.remove("show");
    }
  }
}
function init_addToCart() {

  document
  .querySelectorAll('.custom-form input[type="radio"]')
  .forEach(function (elem) {
    elem.addEventListener("change", function (event) {
      productid=event.currentTarget.getAttribute('data-productid');
      option1=[event.currentTarget.getAttribute('data-optionname'),event.currentTarget.getAttribute('data-optionvalue')];
      disable_enable_button(productid);
    });
  });

  document.querySelectorAll('.custom-select-option select')
  .forEach(function (elem) {
    elem.addEventListener("change", function (event) {
      option2=[event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-optionname'),event.currentTarget.options[event.currentTarget.selectedIndex].getAttribute('data-optionvalue')]
      disable_enable_button(event.currentTarget.getAttribute('data-productid'));
    });
  });

  document
    .querySelectorAll(".custom-form .payment_button button").forEach(function(button) {
      button.addEventListener("click", function (e) {
        
       // console.log(option1);
       // console.log(option2);
       // console.log(productListing_variants);
        addProduct(e.currentTarget.getAttribute('data-productid'));
      });
    });
}

// LOOP OVER ALL VARIANTS OF ALL PRODUCTS, IF THE CURRENT PRODUCT.ID IN POPUP IS FOUND, THEN
function addProduct(productid){
  let currentButton=document.querySelector('.custom-form .payment_button button[data-productid="'+productid+'"]');
  let currentItem={};
  if(!currentButton.getAttribute('disabled')){ // check if button is disabled
    productListing_variants.forEach(function(item){
      if(item.id == productid){
        currentItem=item;
        return;
      }
    })
    currentItem.variants.forEach(function(elem){
      if(elem.title == option1[1]+' / '+ option2[1] || elem.title == option2[1]+' / '+ option1[1]){
// THIS FUNCTION CAN BE OPTIMIZED, INSTEAD OF FETCHING 2 TIMES, WE CAN CHECK IN THE BEGINNING IF THE VARIANTS ARE BLACK AND MEDIUM AND THEN ADD THE BLACK-WINTER-JACKET TO THE formData
        const formData = {
          id: elem.id, 
          quantity: 1 
      };
    fetch('/cart/add.js', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify(formData)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to add to cart');
        }
        return response.json();
    })
    .then(data => {
      console.log('toto');
        document.querySelector('.sucess_add').classList.add('show');
        setTimeout(() => {
          document.querySelector('.sucess_add').classList.remove('show');
        }, 2000);


        /* ___________ */

        if((option1[1]=="M" && option2[1] == "Black") || (option2[1]=="M" && option1[1] == "Black")){
          soft_winter_jacked.variants.forEach(function(elem2){
            if(elem2.public_title == "M / Black"){
              const formData2 = {
                id: elem2.id, 
                quantity: 1 
            };
            fetch('/cart/add.js', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'X-Requested-With': 'XMLHttpRequest'
              },
              body: JSON.stringify(formData2)
          })
          .then(response => {
              if (!response.ok) {
                  throw new Error('Failed to add to cart');
              }
              return response.json();
          })
          .then(data => {
            console.log('Soft winter jacket successfully added to cart');
          })
          .catch(error => {
            console.log('Failed to add Soft winter jacket successfully to cart');
          });
            }
          })
        }



        /* ____________ */

    })
    .catch(error => {
      document.querySelector('.add_fail').classList.add('show');
      setTimeout(() => {
        document.querySelector('.add_fail').classList.remove('show');
      }, 2000);
    });
      }
    });


  }

}


function disable_enable_button(productid){
  if(document.querySelector('.product-item-popup .custom-form .options input[type=radio][data-productid="'+productid+'"]:checked')
    &&
    document.querySelector('.options .custom-select-option select[data-productid="'+productid+'"').selectedIndex!=0)
    {
      document.querySelector('.custom-form .payment_button button[data-productid="'+productid+'"]').removeAttribute('disabled');
  }else{
    document.querySelector('.custom-form .payment_button button[data-productid="'+productid+'"]').setAttribute('disabled',"disabled");
  }
}