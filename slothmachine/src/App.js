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
      show:false,
      currentItem: [],
      inputcode1: []
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

  handleClick(e){
    let count = 1;
    if(count<10){
      console.log("heyyyy")
      console.log(count)
      count+=1;
    }
    else {
      console.log("youve already tried 10 times")
    }
  }

  handleSubmit(e) {
    const btnSubmit = document.getElementById("btnSubmit");
    const codesRef = firebase.database().ref();
    const inputcode1Ref = firebase.database().ref("inputcode1");
    inputcode1Ref.set({
      SlothCode: e.target.value
    }).then(function() {
      codesRef.once("value")
        .then(function(snapshot) {
          if (snapshot.child("inputcode1/SlothCode").val() === snapshot.child("inputcode2/SlothCode1").val()) {
            console.log("same!");
             btnSubmit.style.display = "block";
            firebase.database().ref("Payment").push({Paid:true});
          } else {
            btnSubmit.style.backgroundColor = "blue";
            console.log("does not exist.")
            btnSubmit.style.display = "none"
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
                          <button className="knap" id="btnSubmit" onClick={ this.handleClick }  >Start Machine</button>
                            < div className="wrapper">

                              <div>
                              {
                              this.state.show? <button>Roll</button> : true
                              }

                              </div>

                                      < / div>
                                        < /section>
                                          < / div>
                                            < /div>
                                              );
                                              }
                                              }
export default App;
