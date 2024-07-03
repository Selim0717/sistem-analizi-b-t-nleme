// Sepet butonunu ve sepet öğesini seç
const cartBtn = document.getElementById('cart-btn');
const cartContainer = document.querySelector('.cart-items-container');

// Sepet butonuna tıklama olayını dinle
cartBtn.addEventListener('click', () => {
    // Sepet öğesine 'active' sınıfını ekle veya kaldır
    cartContainer.classList.toggle('active');
});

// Menüdeki sipariş butonlarını seç
const orderButtons = document.querySelectorAll('.box .btn');

// Her sipariş butonuna tıklama olayını ekle
orderButtons.forEach(button => {
    button.addEventListener('click', (event) => {
        // Tıklanan butonun ait olduğu menü öğesini seç
        const menuItem = event.target.closest('.box');

        // Menü öğesindeki gerekli bilgileri al
        const menuItemName = menuItem.querySelector('h3').textContent;
        const menuItemPrice = menuItem.querySelector('.price').textContent;
        const menuItemImage = menuItem.querySelector('img').src;

        // Sepete eklemek için yeni bir öğe oluştur
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <i class="fas fa-times"></i>
            <img src="${menuItemImage}" alt="${menuItemName}" />
            <div class="content">
                <h3>${menuItemName}</h3>
                <div class="price">${menuItemPrice}</div>
            </div>
        `;

        // Sepete yeni öğeyi ekle
        cartContainer.appendChild(cartItem);

        // Sepet öğelerindeki kapatma butonlarına tıklama olaylarını yeniden ekle
        const newCloseBtn = cartItem.querySelector('.fa-times');
        newCloseBtn.addEventListener('click', (event) => {
            event.stopPropagation(); // Sepetin kapanmasını engelle
            cartItem.remove(); // Sepet öğesini kaldır
        });
    });
});

// Sepet dışında bir yere tıklanıldığında sepetin kapanmasını sağla
document.addEventListener('click', (event) => {
    if (!cartContainer.contains(event.target) && !cartBtn.contains(event.target)) {
        cartContainer.classList.remove('active');
    }
});
