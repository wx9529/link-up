import axios from "axios";
import { useEffect, useState } from 'react';

const MatchesDisplay = ({ matches, setclickedUser }) => {
  const [matchedProfiles, setMatcheProfiles] = useState(null);
  const matchedUserIds = matches.map(({ user_id }) => user_id);
  const getMatches = async () => {
    try {
      const response = await axios.get('http://localhost:8000/allUsers', {
        params: { userIds: JSON.stringify(matchedUserIds) }
      })
      setMatcheProfiles(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMatches()
  }, [])

  console.log('matchedProfiles', matchedProfiles);

  return (
    <div className="matches-display">
      {matchedProfiles?.map((match, _index) => (
        <div key={{ _index }} className="match-card" onClick={() => setclickedUser(match)}>
          <h3>{match?.firstname
          }</h3>
        </div>
      ))}
    </div>)
}

export default MatchesDisplay