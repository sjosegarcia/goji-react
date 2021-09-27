import React from 'react';
import ReactDOM from 'react-dom';
import './styles/tailwind.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { SessionContextProvider } from 'contexts/SessionContext';

ReactDOM.render(
	<React.StrictMode>
		<BrowserRouter>
			<SessionContextProvider>
				<App />
			</SessionContextProvider>
		</BrowserRouter>
	</React.StrictMode>,
	document.getElementById('root')
);
