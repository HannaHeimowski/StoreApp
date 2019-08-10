import React from 'react';
import PropTypes from 'prop-types';
import AddFishForm from './AddFishForm';
import EditFishForm from './EditFishForm';
import Login from './Login';
import firebase from 'firebase';
import base, {firebaseApp} from "../base-app";

class Inventory extends React.Component {

    static propTypes = {
        fishes: PropTypes.object,
        updateFish: PropTypes.func,
        deleteFish: PropTypes.func,
        loadSampleFishes: PropTypes.func,
    };

    state = {
        uid: null,
        owner: null
      };

    componentDidMount() {
        firebase.auth().onAuthStateChanged(user =>{
            if(user){
                this.authHandler({ user })
            }
        });
    }

    authHandler = async (authData) => {
        //look up current store in the DB
        const store = await base.fetch(this.props.storeId, { context: this });
        // console.log(store);
        // claim if there is no owner
        if(!store.owner){
            await base.post(`${this.props.storeId}/owner`, {
                data: authData.user.uid
            });
        }
        // set the state of Inventory to reflect the current user
        this.setState({
            uid: authData.user.uid,
            owner: store.owner || authData.user.uid
        });
        // console.log(authData);
    };

    authenticate = (provider) => {
        // console.log('mauz');
        const authProvider =  new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
    };

    logout = async () => {
        console.log('it was nice to have you here. Bye');
        await firebase.auth().signOut();
        this.setState({ uid:null });
    }

    render() {
        const logout = <button onClick={this.logout}>Log me out</button>

        // check if the user is logged in
        if(!this.state.uid){
            return <Login authenticate={this.authenticate}/>;
        }
        // check if the user is the owner of the store
        if(this.state.uid !== this.state.owner){
            return (
                <div>
                    <p>Sorry you don't have the permission</p>
                    {logout}
                </div>
            );
        }
        // They must be the owner, just render the inventory
        return (
            <div className="inventory">
                <h2>Inventory!!!</h2>
                {logout}
                {Object.keys(this.props.fishes).map(key => (
                    <EditFishForm 
                        key={key}
                        index={key} 
                        fish={this.props.fishes[key]} 
                        updateFish={this.props.updateFish}
                        deleteFish={this.props.deleteFish}
                    />
                ))}
                <AddFishForm addFish={this.props.addFish}/>
                <button onClick={this.props.loadSampleFishes}>
                    Load Sample Fishes
                </button>
            </div>
        );
    };
}

export default Inventory;