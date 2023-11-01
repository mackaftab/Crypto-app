import React, { useEffect, useState } from 'react'
import { CoinList, SingleCoin } from '../Config/api'
import { CryptoState } from '../CryptoContext'
import axios from 'axios'
import { Button, Container, LinearProgress, Pagination, Paper,  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography, createTheme } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { numWithCommas } from './Banner/Carousel'
import './CoinsTable.css';
import { doc } from 'firebase/firestore'
import { db } from '../firebase'


export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


const CoinsTable = () => {

   const [search,setSearch] = useState("");
   const [page,setPage] = useState(1);
   const navigate = useNavigate();

   

   const {currency,symbol,coins,loading,fetchCoins,user} = CryptoState();

  

   useEffect(() =>{
   fetchCoins();
   },[currency])

   const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    }
  })

  const handleSearch = () => {
    return coins.filter(
        (coin) => coin.name.toLowerCase().includes(search) || coin.symbol.toLowerCase().includes(search)
    );
  };

  const addToWatchlist = async() => {
    const coinRef = doc(db, "watchlist" , user.uid);

  }


  return (
    <ThemeProvider theme={darkTheme}>
     <Container style={{textAlign: "center"}}>
       <Typography 
       variant='h4'
       style={{ margin:18, fontFamily: "Montserrat"}}>
         Cryptocurrency Prices by Market Cap
       </Typography>

       <TextField label="Search for a Crypto Currency..." 
       variant='outlined' style={{marginBottom:20, width: "100%"}}
       onChange={(e) => setSearch(e.target.value)}
       />

     <TableContainer component={Paper}>
        { loading? (
                <LinearProgress style={{ backgroundColor: "gold"}}/>
            ): (
                <Table>
                    <TableHead style={{backgroundColor: "#EEBC1D"}}>
                      <TableRow>
                        {["Coin","Price","24h Change","Market Cap"].map((head) => (
                            <TableCell
                             style={{
                                color:"black",
                                fontWeight: "700",
                                fontFamily: "Montserrat",
                             }}
                             key={head}
                             align={head==="Coin" ? "" : "right"}
                             >
                             {head}
                            </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>

                    <TableBody>
                     {handleSearch()
                     .slice((page -1)*10, (page -1)*10 +10).map((row)=> {
                        const profit = row.price_change_percentage_24h > 0;

                        return (
                            <TableRow 
                            onClick={() => navigate(`/coins/${row.id}`)}
                            className='row'
                            key={row.name}
                            >
                                <TableCell component='th' scope='row'
                                style={{
                                    display:"flex",
                                    gap: 15,
                                }}>
                                  <img src={row?.image} alt={row.name} height="50" style={{marginBottom: 10}} />

                                  <div style={{display:"flex", flexDirection: "column"}} >
                                    <span style={{
                                      textTransform: "uppercase",
                                      fontSize: 22,
                                    }}>
                                      {row.symbol}

                                    </span>
                                    <span style={{color: "darkgray"}} >{row.name}</span>

                                  </div>
                                   
                                   

                                </TableCell>

                                <TableCell align='right'>
                                  {symbol}{" "}
                                  {numWithCommas(row.current_price.toFixed(2))}

                                </TableCell>

                                <TableCell
                                align='right'
                                style={{
                                  color: profit > 0 ? "rgb(14,203,129)" : "red",
                                  fontWeight:500,
                                }}>
                                   {profit && "+"}
                                   {row.price_change_percentage_24h.toFixed(2)}%
                                </TableCell>

                                <TableCell align='right'>
                                  {symbol}{" "}
                                  {numWithCommas(row.market_cap.toString().slice(0, -6))}
                                  M
                                </TableCell>

                            </TableRow>
                        )
                     })}
                    </TableBody>
                </Table>
            )
        }
     </TableContainer>
      
     <Pagination className='pagination'
     style={{
      padding:20,
      width:"100%",
      display:"flex",
      justifyContent: "center",
     }}
     count={(handleSearch()?.length / 10).toFixed(0)}
     onChange={(_ , value) => {
      setPage(value);
      window.scroll(0,450);
     }}
     />

     </Container>
    </ThemeProvider>
  )
}

export default CoinsTable
