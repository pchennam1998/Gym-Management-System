import React from 'react';
import './service1.css';

function CardGrid() {
  const cards = [
    { title: 'Threadmill', image: 'https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg', description: 'This is the description for card 1.' },
    { title: 'Weight Lifting', image: 'https://fitpage.in/wp-content/uploads/2021/11/Article_Banner-2-13-1024x576.jpg', description: 'This is the description for card 2.' },
    { title: 'Staircase', image: 'https://www.liberty.edu/campusrec/reccenters/wp-content/uploads/sites/13/2020/04/bruno-nascimento-PHIgYUGQPvU-unsplash-1024x683.jpg', description: 'This is the description for card 3.' },
    { title: 'Threadmill', image: 'https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg', description: 'This is the description for card 1.' },
    { title: 'Weight Lifting', image: 'https://fitpage.in/wp-content/uploads/2021/11/Article_Banner-2-13-1024x576.jpg', description: 'This is the description for card 2.' },
    { title: 'Staircase', image: 'https://www.liberty.edu/campusrec/reccenters/wp-content/uploads/sites/13/2020/04/bruno-nascimento-PHIgYUGQPvU-unsplash-1024x683.jpg', description: 'This is the description for card 3.' }
  ];

  const chunkSize = 2; // Number of cards per row
  const chunks = cards.reduce((resultArray, item, index) => { 
    const chunkIndex = Math.floor(index / chunkSize);

    if (!resultArray[chunkIndex]) {
      resultArray[chunkIndex] = []; // start a new row
    }

    resultArray[chunkIndex].push(item);
    return resultArray;
  }, []);

  return (
    <div className="card-grid-container">
      {chunks.map((row, index) => (
        <div key={index} className="card-row">
          {row.map((card, index) => (
            <div key={index} className="card">
              <img src={card.image} alt={card.title} />
              <div className="card-content">
                <h3>{card.title}</h3>
                <p>{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default CardGrid;
