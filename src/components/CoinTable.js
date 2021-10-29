import { Container, CssBaseline, LinearProgress, Paper, TableContainer, TextField, Typography,TableHead,TableCell, Table,TableRow, TableBody } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Pagination from '@mui/material/Pagination';
import { useHistory } from 'react-router-dom';


const CoinTable = () => {

    const [coins, setCoins] = useState([])
    const [search, setSearch] = useState("");
    const [loading,setLoading] = useState(false);
    const[page,setPage]= useState(1)


    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          background: {
            // default: deepOrange[900],
            paper: "rgba(255, 255, 255, 0.16)",
          },
          text: {
            primary: "rgba(255, 255, 255, 0.7) ",
            secondary: "rgba(255, 255, 255, 0.7) ",
          },
          type: "dark",
        },
      });

      const history = useHistory()

      function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

         const Fetchcoin = async() => {
             setLoading(true);
            const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false')
            console.log(data)
            setCoins(data);
            setLoading(false)
         }

            useEffect(() => {
              Fetchcoin()
            }, [])

            const handleSearch = () => {
                return coins.filter((coin) =>
                coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
                );
            }

    return (
        <ThemeProvider theme={darkTheme}>
            <Container style={{textAlign: "center"}}>
                <Typography style={{fontSize:30,marginTop:30}}>Cryptocurrency Prices by Market Cap</Typography>
                <TextField id="outlined-basic" autoFocus="true" label="Search crypto currency" onChange={(e) => setSearch(e.target.value)} style={{ marginBottom: 20, width: "100%" }} variant="outlined" />
            <TableContainer component={Paper}>
                {loading ? (
                    <LinearProgress  />
                ): (
                    <Table aria-label="simple table">
                    <TableHead style={{ backgroundColor: "orange" }}>
                      <TableRow>
                        {["Coin", "Price", "24h Change", "Market Cap"].map((head) => (
                          <TableCell
                            style={{
                              color: "black",
                              fontWeight: "700",
                              fontFamily: "Montserrat",
                            }}
                            key={head}
                            align={head === "Coin" ? "" : "right"}
                          >
                            {head}
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                        {handleSearch()
                          .slice((page - 1) * 10, (page - 1) * 10 + 10)
                          .map((row) => {
                              const profit = row.price_change_percentage_24h > 0;
                              return(
                                  <TableRow onClick={() => history.push(`/coin/${row.id}`)} key={row.id}>
                                      <TableCell component="th" style={{display:"flex", gap: 15}} scope="row" >
                                         <img src={row?.image} height="50" style={{marginBottom:10, height:40}} />
                                         <div style={{display: 'flex', flexDirection: 'column'}}>
                                             <span style={{textTransform: 'uppercase' ,fontSize:20}}>{row.symbol}</span>
                                             <span>{row.name}</span>
                                         </div>
                                      </TableCell>
                                      <TableCell align="right">
                                          $ {numberWithCommas(row.current_price)} 
                                      </TableCell>
                                      <TableCell align="right" style={{color : profit > 0 ? "rgb(14,203,129)" : "red" , fontWeight:500}}>
                                          {profit && "+"}
                                          {row.price_change_percentage_24h.toFixed(2)}%
                                      </TableCell>
                                      <TableCell align="right">
                                          {numberWithCommas(row.market_cap.toString().slice(0,-6))}M
                                      </TableCell>
                                  </TableRow>
                              )
                          })
                        }
                    </TableBody>
                    </Table>
                )}
            </TableContainer>

            <Pagination
            color="secondary"
          count={(handleSearch()?.length / 10).toFixed(0)}
          style={{
            padding: 20,
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        //   classes={{ ul: classes.pagination }}
          onChange={(_, value) => {
            setPage(value);
            window.scroll(0, 450);
          }}
        />
            </Container>
        </ThemeProvider>
    )
}

export default CoinTable
