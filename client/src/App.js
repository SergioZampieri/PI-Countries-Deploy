import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Landing from './components/Landing'
import Home from './components/Home'
import ActivityCreate  from './components/ActivityCreate';
import Detail  from './components/Detail';
import Error404 from './components/Error404'
import Loading from './components/Loading';
import axios from 'axios';
axios.defaults.baseURL = 'https://pi-countries-deploy-6t7ni8l99-sergiozampieri.vercel.app/'

function App() {
  return (
    <BrowserRouter>
    <div >
      <Switch>
        <Route exact path='/' component={Landing}/>
        <Route exact path='/home' component={Home}/>
        <Route exact path='/activities' component={ActivityCreate}/>
        <Route exact path='/countries/:id' component={Detail}/>
        <Route exact path='/Loading' component={Loading}/>
        <Route path='*' component={Error404}/>

      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
