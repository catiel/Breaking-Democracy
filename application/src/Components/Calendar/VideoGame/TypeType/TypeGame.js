/*MIT License

Copyright (c) 2019 Caleb Logan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
*/

import React,{Component} from 'react';
import {Redirect} from 'react-router-dom';


class TypeGame extends Component{
	/**
	 * Returns that the player has won the mini game and adds the header to the event popup.
	 * @return {HTML} [Returns a header that the user has won]
	 */
	constructor(props) {
		super(props);
		this.state = {
			result: "", //Tells the player if the answer was right or wrong
			value: "", //The players response to the question
			submitState: true //Enables or disables the submit button so the player does not redo the event
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	/**
	 * stores the answer inputted before submit
	 * @param  {[type]} event Updates the value variable to the player's response
	 */
	handleChange(event) {
		this.setState({value: event.target.value});
	}


	/**
	 * Will be able to check if the answer is right and change certain attributes when done.
	 * @param  {[type]} event The click event
	 */
	handleSubmit(event){
		event.preventDefault();
		document.getElementById("submit").disabled = true; // Stops the player from resubmitting their answer

		//Checks if the player said the correct answer
		if(this.props.answer.toLowerCase() == this.state.value.toLowerCase()){
			//If the player was correct their score increases
			var percent = .50.toFixed(2);
			this.props.callbackFromMain(this.props.eventID, percent);
			this.setState({result: "Success!"});
			//Tells the program the submit button is now disabled
			this.setState({submitState: false});
		}
		else {
			//If the player was inccorect their score decreases
			var percent = -.50.toFixed(2);
			this.props.callbackFromMain(this.props.eventID, percent);
			//Displays the correct answer to the player
			this.setState({result: "Failed! The correct answer was: " + this.props.answer});
			//Tells the program the submit button is now disabled
			this.setState({submitState: false});
		}
	}

	/**
	 * Renders the event popup to show the player has won
	 * @return {div} [Returns the popup]
	 */
	render(){
		//Checks to see if the submit button is still enabled
		if(this.state.submitState == true){
			return(
				//This div is the body of the popup window containing the back button and the event info
				<div style={{justifyContent: 'center',
							paddingTop: '100px'}}>
					<h1>{this.props.challenges.challenge}</h1>
					{/*Creates a form that has a submit button. and calls handleChange when pressed.*/}
					<form onSubmit={this.handleSubmit}>
						<label>
							Answer:
							<input type="text" value = {this.state.value} onChange={this.handleChange} />
						</label>
						<input type="submit" id = "submit" value="Submit" />
					</form>
					<h1>{this.state.result}</h1>
				</div>
			)
		}
		else{
			return(
				//This div is the body of the popup window containing the back button and the event info
				<div style={{justifyContent: 'center'}}>
					<h1>{this.props.challenges.challenge}</h1>
					{/*Creates a form that has a submit button. and calls handleChange when pressed.*/}
					<form onSubmit={this.handleSubmit}>
						<label>
							Answer:
							<input type="text" value = {this.state.value} onChange={this.handleChange} />
						</label>
						<input type="submit" value="Submit" disabled/>
					</form>
					<h1>{this.state.result}</h1>
				</div>
		  )
		}
	}
}

export default TypeGame
