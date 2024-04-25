// import Accordion from "react-bootstrap/Accordion";
// import Image from "react-bootstrap/Image";

import ProfileDescription from "../components/ProfileDescription";
import ProfileHeader from "../components/ProfileHeader";
import ProfileGallery from "../components/ProfileGallery";

export default function Profile() {
    return (
	    <>
		{ // This is the profile header
		}
		<ProfileHeader name="Patchel"
			       age="460½"
			       tagline="Rum" />
		{ // This is the profile gallery
		}
		<ProfileGallery creds="abcdef@gmail.com" />
		{ // This is the profile description
		}
		<ProfileDescription about="Name: Patchel Pirate"
				    likes="Parrots, Cannons, Pillaging"
				    looking="Long walks on the plank, companionship"
		/>
	    </>
    );
    
}
