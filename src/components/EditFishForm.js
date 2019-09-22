import React from 'react';
import PropTypes from 'prop-types';

class EditFishForm extends React.Component {

    static propTypes = {
        fish: PropTypes.shape({
            image: PropTypes.string,
            name: PropTypes.string,
            desc: PropTypes.string,
            status: PropTypes.string,
            price: PropTypes.number
        }),
        index: PropTypes.string ,
        updateFish: PropTypes.func
    }

    handleChange = (event) =>{
        console.log(event.currentTarget.value);
        // update fish
        // 1. take a copy of current fish
        const updateFish={ 
            ...this.props.fish,
            [event.currentTarget.name]: event.currentTarget.value 
        };
        this.props.updateFish(this.props.index, updateFish);
    } 
    render() {
        return (
                <div className="fish-edit">
                    <input 
                        type="text" 
                        name="name" 
                        onChange={this.handleChange} 
                        value={this.props.fish.name}/>
                    <input 
                        type="text" 
                        name="price" 
                        onChange={this.handleChange} 
                        value={this.props.fish.price}/>
                    <select 
                        type="text" 
                        name="status" 
                        onChange={this.handleChange} 
                        value={this.props.fish.status}>
                            <option value="available">available</option>
                            <option value="unavailable">unavailable</option>
                    </select>
                    <textarea 
                        name="desc" 
                        onChange={this.handleChange} 
                        value={this.props.fish.desc}> </textarea>
                    <input 
                        type="text" 
                        name="image" 
                        onChange={this.handleChange} 
                        value={this.props.fish.image}/>
                    <button onClick={() => this.props.deleteFish(this.props.index)} >Remove Fish</button>
                </div>
        );
    }
}

export default EditFishForm;

