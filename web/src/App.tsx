import React from 'react';

import Router from 'views/Router';
import { RecoilRoot } from 'recoil';

function App() {
  return (
     <RecoilRoot>
       <Router />
     </RecoilRoot>
  );
}

App.defaultProps = {};

export default App;
