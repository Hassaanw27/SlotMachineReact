import React, {
  Component
} from 'react';
import './App.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from './firebase.js'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentItem: [],

      value: 0
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);

  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleClick(event) {
    const btnSubmit = document.getElementById("btnSubmit");
    const inputcode2Ref = firebase.database().ref("inputcode2/SlothCode");
      if(this.state.value<9){

        console.log("Under 10")
        this.setState({value: this.state.value+1});
        console.log(this.state.value)

      }
      else if (this.state.value===9) {
        console.log("SÅ ER VI PÅ 10 FORSØG")
        this.setState({value: 0});
        console.log(this.state.value)
        btnSubmit.style.display = "none"
        inputcode2Ref.set("Zero")

      }
      else{
        console.log(this.state.value)
      }
    }

  handleSubmit(e) {
    const btnSubmit = document.getElementById("btnSubmit");
    const wrongcode = document.getElementById("wrongcode");
    const codesRef = firebase.database().ref();
    const inputcode1Ref = firebase.database().ref("inputcode1");
    inputcode1Ref.set({
      SlothCode: e.target.value
    }).then(function() {
      codesRef.once("value")
        .then(function(snapshot) {
          if (snapshot.child("inputcode1/SlothCode").val() === snapshot.child("inputcode2/SlothCode").val()) {
            console.log("same!");
             btnSubmit.style.display = "block";
            firebase.database().ref("Payment").push({Paid:true});
            wrongcode.style.display = "none"
          } else {
            btnSubmit.style.backgroundColor = "orange";
            console.log("Code does not exist.")
            btnSubmit.style.display = "none"
            wrongcode.style.display = "block"
          }
        })
    });
  }




  render() {
  return (
    < div className='app'>
    < header>
      < div className="wrapper">
        < h1> Codes < /h1>
            < / div>
              < /header>
                < div className='container'>
                  < section className='add-item'>
                    < input placeholder="Indtast kode her" type="text" name="currentItem"  onChange={ this.handleChange } value={ this.state.currentItem } />
                        < / section>
                        < Button onClick={ this.handleSubmit } value={ this.state.currentItem }> Enter Code < /Button>
                          <section className='display-item'>
                          <Button variant="success" size="lg" className="knap" id="btnSubmit" onClick={ this.handleClick } style={{display:'none'}}>Start Machine</Button>
                          <div id="wrongcode" style={{display:'none'}}>Din kode er desværre forkert</div>
                                        < /section>
                                          < / div>
                                            < /div>
                                              );
                                              }
                                              }
export default App;
