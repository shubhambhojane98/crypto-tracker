import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AliceCarousel from 'react-alice-carousel';
import './Carousel.css'


const Carousel = () => {

    const [trending, setTrending] = useState([]);

     const fetchTrendingCoins = async () => {
         const {data} = await axios.get('https://api.coingecko.com/api/v3/search/trending')
          
         console.log(data.coins)
         setTrending(data.coins)
     }


     useEffect(() => {
         fetchTrendingCoins()
     },[]);
    
  console.log(trending)
      const items = trending.map((coin) => {
         return (
             <div className="carouselitem"> 
                 <img className="coinimg" src={coin.item.small} />
                 <span>{`Trending on  ${coin.item.score + 1} `}</span>
                 <span>{coin.item.slug}</span>
             </div>
         )
      })


      const responsive = {
        0: {
          items: 2,
        },
        512: {
          items: 4,
        },
      };

    return (
        <div>
         <AliceCarousel
        mouseTracking
        infinite
        autoPlayInterval={1000}
        animationDuration={1500}
        disableDotsControls
        disableButtonsControls
        responsive={responsive}
        items={items}
        autoPlay
      /> 
        </div>
    )
}

export default Carousel
