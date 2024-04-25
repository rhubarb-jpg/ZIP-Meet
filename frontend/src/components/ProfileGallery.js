import React from 'react';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Image from 'react-bootstrap/Image';

import pirate1 from '../pirate1.jpg';
import pirate2 from '../pirate2.png';
import pirate3 from '../pirate3.png';

const pictures = [pirate1, pirate2, pirate3].map(pic => {
    return (<Image src={pic}
		   key={pic}
		   style={{
		       width: "auto",
		       height: "100%",
		   }}
		   rounded />);
});

// const GalleryContext = createContext();

export default class ProfileGallery extends React.Component {
    constructor(props) {
	super(props);
	this.state = {
	    picture_index : 0,
	};

	this.decrement_image = this.decrement_image.bind(this);
	this.increment_image = this.increment_image.bind(this);
	
    }
    render() {
	let inc = this.increment_image;
	let dec = this.decrement_image;
	return (
	    <>
		{ // This is the slideshow element 
		}
		<div style={{
			 height: "600px",
			 width: "100%",
			 position: "relative",
			 overflow: "hidden",
			 background: "#000",
			 display: "flex",
			 justifyContent: "center",
		     }}>
		    {pictures[this.state.picture_index]}
		</div>
		<ButtonGroup aria-label="slideshow select"
			     style={{
				 width: "100%",
			     }}>
		    <Button variant="light" onClick={dec}>
			<h3>{"←" /* left button */}</h3>
		    </Button>
		    <Button variant="light" onClick={inc}>
			<h3>{"→" /* right button */}</h3>
		    </Button>
		</ButtonGroup>
	    </>);
    }
    increment_image() {
	// console.log("inc clicked!");
	this.setState((state, props) => ({
	    picture_index: (state.picture_index + 1) % pictures.length
	}));
	// this.render();
    }
    decrement_image() {
	// console.log("dec clicked!");
	this.setState((state, props) => ({
	    picture_index: (state.picture_index - 1 + pictures.length)
		% pictures.length,
	}));
    }
}
