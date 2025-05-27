<template>
    <div class="pupular-products">
        <div class="frimg">
            <img src="/src/assets/banners/applwath.png" alt="">
        </div>
        <div class="sekimg">
            <img src="/src/assets/banners/huawei.png" alt="">
        </div>
        <h2>Popular Products</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
        <router-link to="/category">
            <button class="shop-now">Shop Now</button>
        </router-link>
    </div>
    <div class="ipad-pro">
        <img src="/src/assets/banners/ipad.png" alt="">
        <h2>Ipad Pro</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
        <router-link to="/category">
            <button class="shop-now">Shop Now</button>
        </router-link>
    </div>
    <div class="samsung-galaxy">
        <img src="/src/assets/banners/samsung.png" alt="">
        <h2>Samsung Galaxy</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
        <router-link to="/category">
            <button class="shop-now">Shop Now</button>
        </router-link>
    </div>
    <div class="macbook-pro">
        <img src="/src/assets/banners/macbook.png" alt="">
        <h2>Macbook Pro</h2>
        <p>iPad combines a magnificent 10.2-inch Retina display, incredible performance, multitasking and ease of use.</p>
        <router-link to="/category">
            <button class="shop-now">Shop Now</button>
        </router-link>
    </div>
</template>

<style>
.pupular-products{
    width: 460px;
    height: 640px;
    margin-left: 100px;
    margin-top: 150px;

}

.pupular-products img{
    position: relative;
}

.pupular-products .sekimg img{
    left: 180px;
    position: absolute;
    margin-top: -340px;
}

.pupular-products h2{
    color: #000;
    font-size: 33px;
    margin-left: 20px;
    margin-top: -100px;
    margin-bottom: 20px;
}

.pupular-products p{
    color: #909090;
    font-size: 14px;
    max-width: 250px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.pupular-products button{
    width: 188px;
    height: 56px;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 16px 56px;
    background: none;
    margin-left: 20px;
    cursor: pointer;
}

.ipad-pro{
    width: 460px;
    height: 640px;
    margin-left: 537px;
    margin-top: -640px;
    background-color: #F9F9F9;
}

.ipad-pro img{
    margin-left: 50px;
    
}

.ipad-pro h2{
    color: #000;
    font-size: 33px;
    margin-left: 20px;
    margin-top: -18px;
    margin-bottom: 20px;
}

.ipad-pro p{
    color: #909090;
    font-size: 14px;
    max-width: 250px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.ipad-pro button{
    width: 188px;
    height: 56px;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 16px 56px;
    background: none;
    margin-left: 20px;
    cursor: pointer;
}

.samsung-galaxy{
    width: 460px;
    height: 640px;
    margin-left: 997px;
    margin-top: -640px;
    background-color: #EAEAEA;
}

.samsung-galaxy img{
    margin-left: 50px;
    
}

.samsung-galaxy h2{
    color: #000;
    font-size: 33px;
    margin-left: 20px;
    margin-top: -12px;
    margin-bottom: 20px;
}

.samsung-galaxy p{
    color: #909090;
    font-size: 14px;
    max-width: 250px;
    margin-left: 20px;
    margin-bottom: 20px;
}

.samsung-galaxy button{
    width: 188px;
    height: 56px;
    border: 1px solid #000;
    border-radius: 6px;
    padding: 16px 56px;
    background: none;
    margin-left: 20px;
    cursor: pointer;
}

.macbook-pro{
    width: 448px;
    height: 640px;
    margin-left: 1457px;
    margin-top: -640px;
    background-color: #2C2C2C;
}

.macbook-pro img{
    margin-left: 50px;
    
}

.macbook-pro h2{
    color: #ffffff;
    font-size: 33px;
    margin-left: 30px;
    margin-top: -28px;
    margin-bottom: 20px;
}

.macbook-pro p{
    color: #909090;
    font-size: 14px;
    max-width: 250px;
    margin-left: 30px;
    margin-bottom: 20px;
}

.macbook-pro button{
    width: 188px;
    height: 56px;
    border: 1px solid #ffffff;
    border-radius: 6px;
    padding: 16px 56px;
    background: none;
    margin-left: 30px;
    cursor: pointer;
    color: #fff;
}
</style>