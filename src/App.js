
import { BrowserRouter,Route } from 'react-router-dom';
import './App.css';
import { makeStyles } from '@mui/styles';
import Header from './components/Header';
import Home from './pages/Home';
import CoinPage from './pages/CoinPage';
const useStyles = makeStyles(() => ({
  App: {
    backgroundColor: "#14161a",
    color: "white",
    minHeight: "100vh",
  }
}))

function App() {

  const classes = useStyles()
  return (
    <BrowserRouter>
     <div className={classes.App}>
      <Header />
      <Route path="/" component={Home} exact />
      <Route path="/coin/:id" component={CoinPage} exact />
     </div>
    </BrowserRouter>
  );
}

export default App;
