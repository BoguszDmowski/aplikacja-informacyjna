import React from 'react'
import { Card, Icon, Image } from 'semantic-ui-react'
import './Card.css';

const CardExampleCard = (props) => (
  <Card>
    <Image src={props.urlToImage} wrapped ui={false} />
    <Card.Content>
      <Card.Header>{props.title}</Card.Header>
      <Card.Meta>
      <p className="description">źródło: {props.name}</p>
        <p className="description">autor: {props.author}</p>
        <a className="description" href={props.url} target="_blank" rel="noopener noreferrer">Zobacz więcej</a>
      </Card.Meta>
      <Card.Description>
        <p dangerouslySetInnerHTML= {{__html: props.description}} />
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <a>
        <Icon name='user' />
        Space holder xxx views
      </a>
    </Card.Content>
  </Card>
)

export default CardExampleCard