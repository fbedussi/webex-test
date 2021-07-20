import { useDispatch } from 'react-redux'

import webexActions from './features/webex/actions'
import CallWidget from './features/webex/CallWidget'

function App() {
  const dispatch = useDispatch()
  return (
    <>
      <form onSubmit={(e: any) => {
        e.preventDefault()
        dispatch(webexActions.setWebexAuth(e.target.elements[0].value))
        dispatch(webexActions.setDestinationWebexId(e.target.elements[1].value))
      }}>
        <label htmlFor="token">Access token</label>
        <input type="text" id="token"></input>
        <label htmlFor="receiver-id">Receiver webex id</label>
        <input type="text" id="receiver-id"></input>
        <button type="submit">Submit</button>
      </form>
      <CallWidget />
    </>
  );
}

export default App;
