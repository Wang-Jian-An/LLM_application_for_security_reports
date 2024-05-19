import { useContext } from 'react';
import GlobalContext from './GlobalContext';


function Component(props) {
  const {Data, filename} = props;
  let value  = [Data, filename];
  const { globalVariable, setGlobalVariable } = useContext(GlobalContext);

  setGlobalVariable(value)

  return ;
}

export default Component;