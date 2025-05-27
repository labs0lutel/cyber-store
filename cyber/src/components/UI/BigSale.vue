<template>
    <div class="banner-container">
      <div class="banner">
        <h1>Big Summer <strong><em> Sale</em></strong></h1>
        <p>Commodo fames vitae vitae leo mauris in. Eu consequat.</p>
        <router-link to="/category">
            <button class="shop-now">Shop Now</button>
        </router-link>
        </div>
        <div class="images">
            <div class="teap">
                <img class="one" src="/src/assets/bigsale/lab.png" alt="">
            <img class="two" src="/src/assets/bigsale/skren.png" alt="">
            <img class="ther" src="/src/assets/bigsale/bluskren.png" alt="">
            </div>
            <div class="duas">
                <img class="thor" src="/src/assets/bigsale/iph.png" alt="">
            <img class="five" src="/src/assets/bigsale/wthah.png" alt="">
            </div>
            
        </div>
    </div>
</template>

<style scoped>
.banner-container {
    background: linear-gradient(135deg, #2E2E2E 0%, #000000 100%);
  width: 100%;
  height: 448px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0 20px;
  box-sizing: border-box;
}

.banner {
  width: 100%;
  color: white;
  z-index: 1;
}

.banner h1 {
  margin-bottom: 20px;
}

.banner p {
  color: #787878;
  margin-bottom: 50px;
}

.shop-now {
  color: white;
  width: 188px;
  height: 56px;
  border: 1px solid #ffffff;
  border-radius: 6px;
  padding: 16px 56px;
  background: none;
  margin-left: 20px;
  cursor: pointer;
}

.images{
    position: absolute;
    z-index: 0;
}

.images .one{
    margin-left: -430px;
    margin-top: -20px;
    position: absolute;
    z-index: 1;
}

.images .two{
    margin-left: -600px;
    margin-top: -20px;
    position: absolute;
    z-index: 2;
}

.images .ther{
    margin-left: -670px;
    margin-top: 150px;
    position: absolute;
}

.images .thor{
    margin-left: 768px;
    margin-top: -230px;
    position: absolute;
    z-index: 1;
}

.images .five{
    margin-left: 555px;
    margin-top: 23px;
    position: absolute;
    z-index: 1;
}

.teap{
    margin-top: -204px;
    margin-left: -570px;
}

.duas{
    margin-top: 204px;
}
</style>