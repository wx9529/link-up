import React, { useState, useEffect } from 'react';
import TinderCard from 'react-tinder-card';
import db from './firebase.js';
import "./TinderCards.css";
import { collection, getDocs } from 'firebase/firestore';


function TinderCards() {
  const [people, setPeople] = useState([]);
  useEffect(() => {
    const peopleCollectionRef = collection(db, "people");
    const getPeople = async () => {
      const data = await getDocs(peopleCollectionRef);
      setPeople(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    getPeople();
  }, []);

  return (
    <div>
      <h1>Tinder cards</h1>
      <div className="tinderCards__cardContainer">
        {people.map(person => {
          return <TinderCard
            className="swipe"
            key={person.name}
            preventSwipe={['up', 'down']}
          >
            <div
              style={{ backgroundImage: `url(${person.url})` }}
              className="card">
              <h3>{person.name}</h3>
            </div>
          </TinderCard>
        })}
      </div>
    </div>
  )
}

export default TinderCards;