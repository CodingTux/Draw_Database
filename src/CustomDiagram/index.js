import React from 'react';
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig,
  diagramOn,
} from 'react-flow-diagram';
import model from './model-example';
import { config, customEntities } from './config-example';

class CustomDiagram extends React.PureComponent {

  render() {
    return (
    <Diagram customEntities={customEntities} />
    );
  }
}

export default CustomDiagram;
