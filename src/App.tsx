import { Model, Designer, ELEMENTS } from '../lib';
import { useState } from 'react';
import { DEFAULT_MODEL } from './default';
import { Switch } from './Switch';

function App() {
  const [model, setModel] = useState<Model>(DEFAULT_MODEL);
  return (
    <Designer.Group
      model={model}
      onChange={setModel}
      Elements={[...ELEMENTS, Switch]}
      locationHash
      offsetTop={0}
    />
  );
}

export default App;
