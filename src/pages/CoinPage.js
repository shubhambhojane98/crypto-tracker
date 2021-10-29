import { LinearProgress, Typography } from '@mui/material';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Coinpage.css';
import ReactHtmlParser from "react-html-parser";
import CoinInfo from '../components/CoinInfo';


const CoinPage = () => {
    // https://api.coingecko.com/api/v3/coins/${id}
    const {id} = useParams();
    const [coin , setCoin] = useState('')
        
  

    const fetchCoin = async() => {{
        const {data} = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}`)

        console.log(data)
        setCoin(data)
    }}

    // console.log(coin.public_interest_stats.alex_rank)

    useEffect(() => {
        fetchCoin()
    }, []);

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }


    if (!coin) return <LinearProgress style={{ backgroundColor: "gold" }} />;

    return (
        <div className="container">
            <div className="sidebar">
               <img className="coin-img" src={coin.image.large} alt={coin.name} height="200" />
               <Typography style={{marginBottom:"5px", fontSize:"40px", fontWeight:"bold"}} className="heading">
                   {coin.name}
               </Typography>
               <Typography className="description">
               {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
               </Typography>
               <div className="market-data">
                   <span style={{display:"flex"}} className="rank">
                       <Typography variant="h5" className="heading">Rank:</Typography>
                       <Typography variant="h5">{coin.market_cap_rank}</Typography>
                   </span>
                   <span style={{display:"flex"}}>
                       <Typography variant="h5" className="heading">Current Price:</Typography>
                       <Typography variant="h5" >$ {numberWithCommas(
                coin?.market_data.current_price.usd
              )}</Typography>
                   </span>
                   <span style={{display:"flex"}}> 
                       <Typography variant="h5" className="heading">Market Cap:</Typography>
                       <Typography variant="h5">
                       {numberWithCommas(
                coin?.market_data.market_cap.usd
                  .toString()
                  .slice(0, -6)
              )}M
                       </Typography>
                   </span>
               </div>
            </div>
            <CoinInfo coin={coin} />
        </div>
    )
}

export default CoinPage
