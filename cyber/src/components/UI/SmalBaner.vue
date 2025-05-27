<template>
    <div class="playstaion">
      <div class="info">
        <h1>Playstation 5</h1>
        <p>Incredibly powerful CPUs, GPUs, and an SSD with integrated I/O will redefine your PlayStation experience.</p>
      </div>
        <img class="playimg" src="/src/assets/header/PlayStation.svg" alt="">
    </div>
    <div class="airpods">
      <div class="info">
        <h1>Apple AirPods Max</h1>
        <p>Computational audio. Listen, it's powerful</p>
      </div>
      <img class="air" src="/src/assets/header/Air.svg" alt="">
    </div>
    <div class="vision">
      <div class="info">
        <h1>Apple Vision Pro</h1>
        <p>An immersive way to experience entertainment</p>
      </div>
      <img class="Vis" src="/src/assets/header/Vis.svg" alt="">
    </div>
    <div class="macbook">
      <div class="info">
        <h1>Macbook Air</h1>
        <p>The new 15‑inch MacBook Air makes room for more of what you love with a spacious Liquid Retina display.</p>
        <router-link to="/category">
            <button class="shop">Shop Now</button>
          </router-link>
      </div>
      <img class="mac" src="/src/assets/header/MacBook.svg" alt="">
    </div>
  </template>
  
  <script>
  export default {
    name: 'SmalBanner'
  }
  </script>
  
  <style scoped>
  .playstaion{
    width: 903px;
    height: 328px;
    background-color: #ffffff;
    position: relative;
  }
  .playstaion h1{
    color: #000;
    margin-left: 350px;
    font-size: 49px;
  }
  .playstaion p{
    color: #909090;
    max-width: 338px;
    margin-left: 350px;
  }

  .playstaion .info{
    padding-top: 100px;
  }

  .playimg{
    width: 360px;
    margin-top: -290px;
  }

  .airpods{
    background-color: #EDEDED;
    width: 500px;
    height: 272px;
    margin-left: -95px;
    position: relative;
  }

  .airpods .info{
    padding-top: 50px;
    margin-left: 100px;
  }

  .airpods h1{
    color: #000;
    margin-left: 150px;
    font-size: 29px;
    max-width: 110px;
  }
  .airpods p{
    color: #909090;
    margin-left: 150px;
    font-size: 14px;
    max-width: 140px;
  }

  .air{
    margin-top: -234px;
    margin-left: 95px;
  }

  .vision{
    width: 500px;
    height: 272px;
    background-color: #353535;
    margin-top: -272px;
    margin-left:  405px;
    position: relative;
  }

  .vision .info{
    padding-top: 50px;
  }

  .vision h1{
    color: #fff;
    margin-left: 180px;
    font-size: 29px;
    max-width: 150px;
  }

  .vision p{
    color: #909090;
    margin-left: 180px;
    font-size: 14px;
    max-width: 140px;
  }

  .Vis{
    margin-top: -500px;
  }

  .macbook{
    background-color: #EDEDED;
    width: 1000px;
    height: 600px;
    margin-left: 905px;
    margin-top: -600px;
    position: relative;
  }
  
  .macbook h1{
    color: #000;
    font-size: 64px;
  }
  
  .macbook p{
    color: #909090;
    max-width: 370px;
    margin-bottom: 20px;
  }

  .macbook .info{
    padding-top: 200px;
    margin-left: 150px;
  }

  .mac{
    margin-left: 708px;
    margin-top: -380px;
  }

  .shop{
    background: none;
    border: 1px solid rgb(0, 0, 0);
    border-radius: 6px;
    width: 188px;
    height: 56px;
    color: rgb(0, 0, 0);
    font-size: 16px;
    font-weight: 500;
  }
  </style>