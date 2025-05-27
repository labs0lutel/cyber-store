

<template>
    <header class="main-header">
        <div class="header-container">
            <router-link to="/" class="logo">
                <img src="/src/assets/header/logo.svg" alt="logo">
            </router-link>
            <div class="search">
                <img src="/src/assets/header/search.svg" alt="search">
                <input type="text" placeholder="Search">
            </div>
            <div class="icons">
                <router-link to="/favorites" class="favorites">
                    <img src="/src/assets/header/Favorites.svg" alt="favorites">
                </router-link>
                <router-link to="/cart" class=carts>
                    <div class="cart">
                        <img src="/src/assets/header/Vector.svg" alt="cart">
                    </div>
                </router-link>
            </div>
        </div>
    </header>
</template>


<style scoped>
.logo{
    display: inline-block;
    cursor: pointer;
}

.main-header {
    position: fixed;  
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    background: white;
    padding: 16px 0;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
    margin-left: 0;
}

.header-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
}

.search {
    position: relative;
    display: flex;
    align-items: center;
}

.search img {
    position: absolute;
    left: 16px;
    pointer-events: none;
}

.search input {
    width: 372px;
    height: 56px;
    border-radius: 8px;
    padding: 0 16px 0 48px;
    border: none;
    background: #F5F5F5;
    font-size: 16px;
}

.search input:focus {
    outline: none;
    background: #e0e0e0;
}

.icons {
    display: flex;
    gap: 24px;
}

.favorites, .cart {
    cursor: pointer;
}

.favorites img, .cart img {
    width: 32px;
    height: 32px;
}
</style>