import React from "react";
import PropTypes from 'prop-types';
import Header from "./Header";
import Order from "./Order";
import Inventory from "./Inventory";
import sampleFishes from "../sample-fishes";
import Fish from "./Fish";
import base from '../base-app';


class App extends React.Component {

  state = {
    order:{},
    fishes:{}
  };

  // to assure typechecking
  static propTypes = {
    match: PropTypes.object
  }

// is invoked immediately after a component is inserted into the dom tree
  componentDidMount() {

    const { params } = this.props.match;
    // reinstate the local storage
    const localStorageRef = localStorage.getItem(params.storeId);
    if(localStorageRef){
      this.setState({ order: JSON.parse(localStorageRef)});
    }
    console.log(localStorageRef);
    // ref to a reference to a pice of data in the database. In this case from the current store(url) the id
    this.ref = base.syncState(`${params.storeId}/fishes`, {
      context: this,
      state: "fishes"
    });
  }

  componentDidUpdate(){
    // console.log('update me');
    // console.log(this.state.order);
    localStorage.setItem(
      this.props.match.params.storeId, 
      JSON.stringify(this.state.order)
    );
  }

// is for unlistening on changes if not it can cause a memory leak
componentWillUnmount() {
  base.removeBinding(this.ref);
}

  addFish = fish => {
    // console.log('add me right there');
    // make a copy
    const fishes = { ...this.state.fishes };
    // add new fishes to fish var
    fishes[`fish${Date.now()}`]= fish;
    // set the new object to state
    this.setState({ fishes });
  };

  updateFish = (key, updateFish) => {
    // copy of current state
    const fishes = {...this.state.fishes};
    // update the state
    fishes[key] = updateFish;
    // set to the state
    this.setState({ fishes });
  }

  deleteFish = key => {
    // 1. take copy
    const fishes = {...this.state.fishes};
    // 2. update
    fishes[key]= null;
    this.setState({ fishes });
  }


  loadSampleFishes = () => {
    this.setState({ fishes: sampleFishes })
  };

  addToOrder=(key) => {
    // take a copy of  state
    const order = {...this.state.order};
    // add to order or update the amount in order
    order[key] = order[key] +1 || 1;
    // call setState to update state Object
    this.setState({ order });
  }

  removeFromOrder = key => {
        // take a copy of  state
        const order = {...this.state.order};
        // add to order or update the amount in order
        delete order[key];
        // call setState to update state Object
        this.setState({ order });
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh Seafood Market" />
          <ul className="fishes">
            {Object.keys(this.state.fishes).map(key => 
              <Fish 
                key={key} 
                index={key}
                details= {this.state.fishes[key]}
                addToOrder={this.addToOrder}
              /> 
            )}
          </ul>
        </div>
        <Order fishes={this.state.fishes} order={this.state.order} removeFromOrder={this.removeFromOrder}/>
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish} 
          deleteFish={this.deleteFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}
          storeId={this.props.match.params.storeId}
        />
      </div>
    );
  }
}

export default App;