import React from "react";
import {CardGroup, Card} from 'react-bootstrap'

const BACKEND_API = process.env.REACT_APP_BACKEND_API

const MemeList = ({memes}) => {
  return (
    <div>
      <CardGroup className="m-3 p-3">
        {memes.map((meme) => (
          <Card className='m-3' key={meme.id}>
            <Card.Img src={`${BACKEND_API}/${meme.outputMemePath.split('/').slice(1).join('/')}`} alt={meme.outputMemePath.split('/').slice(1).join('/')}/>
          </Card>
        ))}
      </CardGroup>
    </div>
  );
};

export default MemeList;
