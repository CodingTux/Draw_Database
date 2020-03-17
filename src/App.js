import React, { Component } from 'react';
import CustomDiagram from './CustomDiagram';
import {
  Diagram,
  store as diagramStore,
  setEntities,
  setConfig,
  diagramOn,
} from 'react-flow-diagram';

import model from './CustomDiagram/model-example';
import { config, customEntities } from './CustomDiagram/config-example';

import { Button } from 'reactstrap';

class App extends Component {

  state = {
    currentState: [],
  }

  componentWillMount() {
    diagramStore.dispatch(setConfig(config));
    diagramStore.dispatch(setEntities(model));

    diagramOn('anyChange', entityState => {
      console.info(entityState)
      this.setState({
        currentState: entityState,
      })
    }
    );
  }

  uploadData = () => {
    fetch("http://localhost:3020/function", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.currentState)
    })
      .then(res => {
        return res.json();
      })
      .then(res => {
        console.log(res.isInserted);
      })
  }

  render() {
    return (
      <div className="App">
        <main className="main">
          <CustomDiagram />
        </main>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button onClick={() => this.uploadData()} color='success' disabled={this.state.currentState.length > 0 ? false : true} style={{ width: '30%', marginTop: '3%' }}>Save</Button>


        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <h4 style={{ marginTop: '2%', textAlign: 'center' }}>{JSON.stringify(this.state.currentState)}</h4>
        </div>
      </div>
    );
  }
}

export default App;
