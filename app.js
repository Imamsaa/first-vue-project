var app = new Vue({
    el : '#app',
    data : {
        max : 50,
        products : null,
        cart : [],
        style : {
            label : ['font-weight-bold','mr-2'],
            inputWidth : 60,
            sliderStatus : true
        },
        name : "Fluffy Ski Coat"
    },
    computed : {
        sliderStates : function() {
            return this.style.sliderStatus ? 'd-flex' : 'd-none'
        }
    },
    mounted : function() {
        fetch('https://hplussport.com/api/products/order/price')
        .then(response => response.json())
        .then(data => {
            this.products = data;
        });
    },
    filters : {
        currencyFormat : function(value) {
            return 'Rp' + Number.parseFloat(value).toFixed(2);
        }
    },
    methods : {
        addItem : function(product) {

            var productIndex;
            var productExist = () => {
                this.cart.filter((item, index) => {
                    if (item.product.id == Number(product.id)) {
                        productIndex = index;
                        return true;
                    }else{
                        return false;
                    }
                });
            }

            if(productExist()){
                this.cart[productIndex].qty++
            }else{
                this.cart.push(
                    {
                        product : product,
                        qty : 1
                    });
            }
        },

        before : function(el) {
            el.className = 'd-none';
        },

        enter : function(el) {
            var delay = el.dataset.index * 100;
            setTimeout(function() {
                el.className = 'card d-flex animate__animated animate__fadeInRight';
            }, delay);
        },

        leave : function(el) {
            var delay = el.dataset.index * 100;
            setTimeout(function() {
                el.className = 'card d-flex animate__animated animate__fadeOutRight';
            }, delay);
        },
    }
});