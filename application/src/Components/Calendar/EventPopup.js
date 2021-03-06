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

import React,{useState} from 'react';
import {Link} from "react-router-dom";
import {Button} from 'react-bootstrap';
import TypeGame from './VideoGame/TypeType/TypeGame.js';
import challenges from './VideoGame/TypeType/codingChallenges.json';
import { Reacteroids } from './VideoGame/ShootShoot/src/Reacteroids';
import clickEffect from '../../Resources/Sound FX/MouseClick1.wav';

/**
 * Creates a popup when an event is clicked on the calendar
 * @param {Properties} props Parameters needed to create the event, contains event which had an id, year, month, day, and a message
 * @return {div} Returns a div that blocks all click events below it and contains the popup window
 */
function EventPopup(props) {
    //The date of the event to display
    let date = new Date(props.event.year, props.event.month, props.event.day);

    //options is used to format how the date of the event is displayed
    let options = {year: 'numeric', month: 'short', day: 'numeric'};

    //Sets whether the game should be rendered or not
    //Used as state so once the game is completed it doesn't restart the event
    const [renderGame, setRenderGame] = useState(false);

    //Sets num to a random index of challenges for use in TypeGame
    //Use as state prevents the question from changing after event completion
    const [num, setNum] = useState(Math.floor(Math.random() * challenges.length));

    //Creates an array of all the games to pick so one can be randomly chosen
    const games = [
        <TypeGame challenges = {challenges[num]} answer = {challenges[num].answer} callbackFromMain={props.callbackFromMain} eventID={props.event.id}/>,
        <Reacteroids updateMainMusic={props.updateMainMusic} callbackFromMain={props.callbackFromMain} eventID={props.event.id}/>
    ];

    //Sets gameToPlay to a random index of games
    //Use as state prevents the game from switching after you complete it
    const [gameToPlay, setGameToPlay] = useState(Math.floor(Math.random() * games.length));

    return (
        //This div covers the screen with an black opaque layer
         <div style={{display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'fixed',
            width: '100vw',
            height: '100vh',
            zIndex: 1000,
            top: 0,
            left: 0,
            backgroundColor: 'rgba(0, 0, 0, .7)'
        }}>
            {/*This div is the body of the popup window containing the back button and the event info*/}
            <div style={{backgroundColor: 'rgba(255, 255, 255, 1)',
                borderRadius: '5px',
                width: '50vw',
                height: '50vh',
                position: 'absolute'
            }}>
                {/*This link acts as a back button allowing the user to redirect to Calendar*/}
                <Link to='/Calendar' >
                    <Button style={{top: 5, right: 5, position: 'absolute'}} onClick={() => {new Audio(clickEffect).play()}}>
          						<span>X</span>
          					</Button>
                </Link>

                {/* Determines whether the game or the event info should be rendered */}
                {renderGame
                    //Render game
                    ? games[gameToPlay]
                    //Render event info
                    : <div style={{justifyContent: 'center'}}>
                        <h1>{date.toLocaleDateString("en-US", options)}</h1>
                        <h2>{props.event.message}</h2>
                        <h3>{props.situation.situation}</h3>
                        {/*Gives the choices for the situation and onclick rerenders the page for the game.*/}
                        <Button onClick= {() => {
                            //This allows us to change the state and play the clicking sound
                            new Audio(clickEffect).play();
                            setRenderGame(true);
                        }}>
                            {props.situation.Choice1}
                        </Button>
                        <Button onClick= {() => {
                            //This allows us to change the state and play the clicking sound
                            new Audio(clickEffect).play();
                            setRenderGame(true);
                        }}>
                            {props.situation.Choice2}
                        </Button>
                    </div>
                }
            </div>
        </div>
    );
}

export default EventPopup;
