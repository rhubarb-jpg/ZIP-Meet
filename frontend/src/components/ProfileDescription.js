import Accordion from "react-bootstrap/Accordion";

export default function ProfileDescription({about, likes, looking}) {
    return (<Accordion>
		<Accordion.Item eventKey="0">
		    <Accordion.Header>About Me</Accordion.Header>
		    <Accordion.Body>{about}</Accordion.Body>
		</Accordion.Item>
		<Accordion.Item eventKey="1">
		    <Accordion.Header>Likes</Accordion.Header>
		    <Accordion.Body>{likes}</Accordion.Body>
		</Accordion.Item>
		<Accordion.Item eventKey="2">
		    <Accordion.Header>What I'm looking for</Accordion.Header>
		    <Accordion.Body>{looking}</Accordion.Body>
		</Accordion.Item>
	    </Accordion>);
}
