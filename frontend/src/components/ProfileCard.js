import { useEffect, useState} from 'react';

function ProfileCard(){
    const [user, setUser] = useState(null)
    useEffect(() => {
        const fetchUser = async() => {
            const response = await fetch('http://localhost:5000/api/')
        }

        fetchUser()
    }, [])
}

export default ProfileCard;