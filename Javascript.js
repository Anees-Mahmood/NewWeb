document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('form').addEventListener('submit', function(event) {
        const searchInput = document.querySelector('input[name="search"]');
        if (searchInput.value.trim() === '') {
            event.preventDefault();
            alert('Please enter a search term.');
        }
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    document.querySelectorAll('.image-container').forEach(image => {
        image.addEventListener('mouseover', function() {
            this.querySelector('img').style.transform = 'scale(1.1)';
        });

        image.addEventListener('mouseout', function() {
            this.querySelector('img').style.transform = 'scale(1)';
        });
    });

    // في ملف "Javascript.js"

    let shoppingCart = []; // مصفوفة لتخزين المنتجات في السلة

    // استماع لنقرة زر "Add to Cart"
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const productName = this.getAttribute('data-product');

            // تحقق مما إذا كان المنتج موجودًا بالفعل في السلة
            const existingProduct = shoppingCart.find(product => product.name === productName);

            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                // إذا لم يكن المنتج موجودًا، قم بإضافته إلى السلة
                const product = {
                    name: productName,
                    quantity: 1
                };
                shoppingCart.push(product);
            }

            // يمكنك أيضًا إضافة تحديث لعرض عدد المنتجات في السلة
            updateCartUI();
        });
    });

    // تحديث واجهة المستخدم لعرض عدد المنتجات في السلة
    function updateCartUI() {
        const cartItemCount = shoppingCart.reduce((total, product) => total + product.quantity, 0);
        console.log(`Cart items: ${cartItemCount}`);

 
    }
});


// بعد إرجاع البيانات من PHP
fetch('add.html', {
    method: 'POST',
    // ... إعدادات الطلب
})
.then(response => response.json())
.then(newProductData => {
    // تحديث واجهة المستخدم باستخدام newProductData
    // على سبيل المثال، قم بإضافة المنتج الجديد إلى القائمة أو العرض
    updateUIWithNewProduct(newProductData);
})
.catch(error => {
    console.error('Error fetching new product data:', error);
});

// دالة لتحديث واجهة المستخدم بإضافة المنتج الجديد
function updateUIWithNewProduct(newProductData) {
    // قم بتحديث واجهة المستخدم باستخدام newProductData
    // على سبيل المثال، إضافة المنتج إلى قائمة المنتجات
    const productList = document.getElementById('product-list');
    const newProductElement = createProductElement(newProductData);
    productList.appendChild(newProductElement);
}

// دالة لإنشاء عنصر HTML يمثل المنتج
function createProductElement(productData) {
    // قم بإنشاء عنصر HTML (مثل li) يمثل المنتج واملأه بالبيانات
    const productElement = document.createElement('li');
    // املأ productElement باستخدام productData
    // على سبيل المثال، إضافة صورة واسم المنتج
    productElement.innerHTML = `
        <img src="${productData.image_url}" alt="${productData.name}">
        <p>${productData.name}</p>
    `;
    return productElement;
}


