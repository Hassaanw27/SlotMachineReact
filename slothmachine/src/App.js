import React, { Component } from 'react';
import './App.css'
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css'
import firebase from './firebase.js'

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentItem: [],
      SlothCode: '',
      inputcode1: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
  }




  handleSubmit(e) {
    e.preventDefault(); //removes default behaviors like reloading on pressing submit.
    const inputcode1Ref = firebase.database().ref("inputcode1");
    inputcode1Ref.once("value")
      .then(function(snapshot) {
        if (snapshot.hasChild("SlothCode")){
             console.log("exists!");
           }
             else{
               console.log("does not exist.")


             }
      });
    //const inputcode1Ref = firebase.database().ref('inputcode1');
    //inputcode1Ref.child('inputcode1').orderByChild("SlothCode").equalTo(this.state.SlothCode).once("value",snapshot => {
  //      const userData = snapshot.val();
  //
  //  });
    const item = {
      SlothCode: this.state.currentItem
    }
    inputcode1Ref.set(item);
    this.setState({
      currentItem: '',
      SlothCode: ''
    });
  }
  componentDidMount() {
    const inputcode1Ref = firebase.database().ref('inputcode1');
    inputcode1Ref.on('value', (snapshot) => {
      let inputcode1 = snapshot.val();
      let newState = [];
      for (let item in inputcode1) {
        newState.push({
          id: item,
          SlothCode: inputcode1[item].SlothCode
        });
      }
      this.setState({
        inputcode1: newState
      });
    });
  }

  render() {
    return (
      <div className='app'>
        <header>
            <div className="wrapper">
              <h1>Codes</h1>
            </div>
        </header>
        <div className='container'>
          <section className='add-item'>
                  <input type="text" name="currentItem" placeholder="Enter Code" onChange={this.handleChange} value={this.state.currentItem} />
                <Button onClick={this.handleSubmit}>Enter Code</Button>
          </section>
          <section className='display-item'>
              <div className="wrapper">
                <ul>
                  {this.state.inputcode1.map((item) => {
                    return (
                      <h1>your code has been sent</h1>

                    )
                  })}
                </ul>
              </div>
          </section>
        </div>
      </div>
    );
  }
}
export default App;
