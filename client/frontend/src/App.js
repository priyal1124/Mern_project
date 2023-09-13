
import './App.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Contact from './components/Contact';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import About from './components/About';
import ProtectedRoute from './ProtectedRoute';
import Footer from './components/Footer';
import Service from './components/Service';
 import {Switch,Route} from 'react-router';

function App() {
  const [auth, setauth] = useState(false);
  const [auth1, setauth1] = useState(true);

  const isLoggedIn = async () => {
    try {
      const res = await fetch('/auth', {
        method : "GET",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json"
        },
        credentials : "include"
      });

      if(res.status === 200){
        setauth(true)
        setauth1(false)
      }
      if(res.status === 401){
        setauth(false)
        setauth1(true)
      }

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    isLoggedIn();
  }, []);
  return (
   
    <div className="App">
      
    <Navbar auth={auth1}/>
    
  
    <Switch>
   <Route exact path="/" component={Home}/> 
   <Route exact  path="/about" component={About}/> 
   <Route  exact path="/contact" component={Contact}/>
   <Route exact path="/service" component={Service}/>
   <ProtectedRoute exact path="/login" component={Login} auth={auth1}/>
        <ProtectedRoute exact path="/register" component={Register} auth={auth1}/>
        {/* <ProtectedRoute exact path="/dashboard" component={Dashboard} auth={auth}/> */}
        <ProtectedRoute exact path="/logout" component={Logout} auth={auth}/>
    </Switch>
    <Footer></Footer>
    </div>
    

  );
}

export default App;
