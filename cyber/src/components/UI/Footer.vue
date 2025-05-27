<template>
    <div class="cyber-container">
      <div class="content">
        <div class="intro">
          <h1>cyber</h1>
          <p>
            We are a residential interior design firm located in Portland. Our boutique-studio offers more than
          </p>
        </div>
  
        <div class="services">
          <h2>Services</h2>
          <ul>
            <li>Bonus program</li>
            <li>Gift cards</li>
            <li>Credit and payment</li>
            <li>Service contracts</li>
            <li>Non-cash account</li>
            <li>Payment</li>
          </ul>
        </div>

        <div class="assistance">
          <h2>Assistance to the buyer</h2>
          <ul>
            <li>Find an order</li>
            <li>Terms of delivery</li>
            <li>Exchange and return of goods</li>
            <li>Guarantee</li>
            <li>Frequently asked questions</li>
            <li>Terms of use of the site</li>
          </ul>
        </div>
      </div>
  
      <div class="social-icons">
        <a href="#"><img src="/src/assets/footer/Twitter.png" alt=""></a>
        <a href="#"><img src="/src/assets/footer/Facebook.png" alt=""></a>
        <a href="#"><img src="/src/assets/footer/TikTok.png" alt=""></a>
        <a href="#"><img src="/src/assets/footer/Instagram.png" alt=""></a>
      </div>
    </div>
  </template>
  
  <style scoped>
  .cyber-container {
    font-family: Arial, sans-serif;
    background-color: #000000;
    color: #ffffff;
    padding: 40px;
    min-height: 504px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .content {
    display: flex;
    justify-content: space-between;
    max-width: 1200px;
    margin: 0 auto;
    width: 100%;
    margin-top: 150px;
  }
  
  .intro,
  .services,
  .assistance {
    flex: 1;
    margin-right: 40px;
  }
  
  .intro {
    max-width: 384px;
  }
  
  .services,
  .assistance {
    max-width: 200px;
  }
  
  .intro p {
    line-height: 1.6;
    margin-top: 20px;
    color: #CFCFCF;
  }
  
  h1 {
    font-size: 2em;
    text-transform: lowercase;
    margin-bottom: 20px;
    font-weight: normal;
    color: #fff;
  }
  
  h2 {
    font-size: 16px;
    margin-bottom: 20px;
    
    font-weight: normal;
    color: #fff;
  }
  
  ul {
    list-style-type: none;
    padding-left: 0;
    margin-top: 0;
  }
  
  li {
    margin-bottom: 12px;
    font-size: 0.9em;
    line-height: 1.5;
    color: #CFCFCF;
  }
  
  .social-icons {
    display: flex;
    gap: 20px;
    margin-left: 310px;
    margin-bottom: 150px;
  }
  
  .social-icons a {
    color: #ffffff;
    font-size: 1.2em;
    text-decoration: none;
  }
  
  .social-icons a:hover {
    color: #cccccc;
  }


  </style>