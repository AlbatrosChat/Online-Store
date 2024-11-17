const database = {
    users: [
        { id: 1, email: 'alisaedi012@gmail.com', password: 'Ali12121997@#', role: 'owner' },
        // يمكن إضافة المزيد من المستخدمين هنا
    ],
    products: [],
};

let currentUser = null;

function login(email, password) {
    const user = database.users.find(u => u.email === email && u.password === password);
    if (user) {
        currentUser = user;
        return true;
    }
    return false;
}

function addProduct(name, description, price, image) {
    if (currentUser && currentUser.role === 'owner') {
        const product = { id: database.products.length + 1, name, description, price, image };
        database.products.push(product);
        alert('تمت إضافة المنتج بنجاح');
        return true;
    }
    alert('ليس لديك صلاحية لإضافة المنتجات');
    return false;
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    document.querySelectorAll('header, footer').forEach(element => {
        element.classList.toggle('dark-mode');
    });
}

// ربط الوظائف بالأزرار
document.querySelector('#login-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('#username').value;
    const password = e.target.querySelector('#password').value;
    if (login(email, password)) {
        alert('تم تسجيل الدخول بنجاح');
        window.location.href = 'admin.html'; // إعادة التوجيه إلى صفحة لوحة التحكم بعد تسجيل الدخول
    } else {
        alert('بيانات الدخول غير صحيحة');
    }
});

document.querySelector('#theme-toggle').addEventListener('click', toggleTheme);

document.querySelector('#add-product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = e.target.querySelector('#product-name').value;
    const description = e.target.querySelector('#product-description').value;
    const price = e.target.querySelector('#product-price').value;
    const image = e.target.querySelector('#product-image').value;
    addProduct(name, description, price, image);
});

// إضافة المنتج إلى سلة المشتريات
document.querySelectorAll('.add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
        const productCard = button.parentElement;
        const productName = productCard.querySelector('h3').innerText;
        addToCart(productName);
    });
});

// وظيفة لإضافة المنتج إلى سلة المشتريات
function addToCart(productName) {
    const cartSection = document.querySelector('.cart');
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
        <p>${productName}</p>
        <button class="remove-btn">إزالة</button>
    `;
    cartSection.appendChild(cartItem);

    // إضافة حدث لإزالة المنتج من سلة المشتريات
    cartItem.querySelector('.remove-btn').addEventListener('click', () => {
        cartSection.removeChild(cartItem);
    });
}