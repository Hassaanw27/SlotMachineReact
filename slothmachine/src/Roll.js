import React, {
  Component
} from 'react';
import './App.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'

class App extends Component{



handleShow = ()=>{
    this.setState({
        isActive: true
    })
}

handleHide = () =>{
    this.setState({
        isActive: false
    })
}

}

firebase.initializeApp(config);
export default firebase;
