import React from 'react';
import './service1.css';

function CardGrid() {
  const cards = [
    { title: 'Treadmill', image: 'https://fitpage.in/wp-content/uploads/2021/10/Article_Banner-1-1.jpg', description: '    The treadmill is a relatively easy piece of exercise equipment to use. ' },
    { title: 'Weight Lifting', image: 'https://fitpage.in/wp-content/uploads/2021/11/Article_Banner-2-13-1024x576.jpg', description: 'It is a popular form of exercise for people who want to build strength, muscle mass, and endurance.' },
    { title: 'Staircase', image: 'https://www.liberty.edu/campusrec/reccenters/wp-content/uploads/sites/13/2020/04/bruno-nascimento-PHIgYUGQPvU-unsplash-1024x683.jpg', description: 'A staircase is a set of steps that connect two or more floors in a building or structure.' },
    { title: 'Treadmill', image: 'https://www.liberty.edu/campusrec/wp-content/uploads/sites/191/2021/07/Nikki-e1627310081772.jpg', description: 'A treadmill is a piece of exercise equipment that is used for running or walking indoors.' },
    { title: 'Weight Lifting', image: 'https://www.powerhouse-fitness.co.uk/blog/wp-content/uploads/2020/12/Blog_olympic_weightlifting-7.jpg', description: 'Weightlifting is a sport that involves lifting weights to compete against other athletes or oneself.' },
    { title: 'Staircase', image: 'https://i.ytimg.com/vi/ExB2nnyKrd8/hqdefault.jpg', description: 'Staircase exercise, also known as stair climbing or step aerobics, is a form of cardiovascular exercise that involves repeatedly stepping up and down a set of stairs or steps.' }
  ];

  const chunkSize = 3; // Number of cards per row
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
