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
import TimelineEvent from './TimelineEvent.js';
import Timeline from './Timeline.js';

/**
 * TimelineApp component of the app that renders and returns a Timeline which
 * gives the physical timeline object and a TimelineEvent
 * that is given all current events happening on the timeline.
 * @extends React
 */
class TimelineApp extends Component {

  /**
   * Creates the initial TimelineApp
   * @param {[type]} props Variables needed by the timeline
   */
    constructor(props) {
        super(props);

        this.state = {
            eventStartIndex: 0 //Indicates the index of the eventsCompleted array to start at
        }

        //Functions used outside of the function
        this.viewNextEventGroup = this.viewNextEventGroup.bind(this);
        this.viewPreviousEventGroup = this.viewPreviousEventGroup.bind(this);
    };

    /**
     * If possible increases the event start index by 10
     * @param {*} event The default click event
     */
    viewNextEventGroup(event) {
        event.preventDefault();
        if(this.state.eventStartIndex + 10 < this.props.eventsCompleted.length) {
            this.setState((state, props) => ({
                eventStartIndex: state.eventStartIndex + 10
            }));
        }
    }

    /**
     * If possible decreases the event start index by 10
     * @param {*} event The default click event
     */
    viewPreviousEventGroup(event) {
        event.preventDefault();
        if(this.state.eventStartIndex - 10 >= 0) {
            this.setState((state, props) => ({
                eventStartIndex: state.eventStartIndex - 10
            }));
        }
    }

	/**
 	* Renders a Timeline and a TimelineEvent given all current events.
 	* @return returns the div of a Timeline and a TimelineEvent Component that has all current events passed in.
 	*/
    render() {
        return(
            <div className="timeline-app" style={{justifyContent: 'center', display: 'flex'}}>
                <Timeline
                    viewNextEventGroup={this.viewNextEventGroup}
                    viewPreviousEventGroup={this.viewPreviousEventGroup}
                />
                <TimelineEvent
                    events={this.props.events}
                    eventsCompleted={this.props.eventsCompleted}
                    eventStartIndex={this.state.eventStartIndex}
                />
            </div>
        )
    }
}

export default TimelineApp;
