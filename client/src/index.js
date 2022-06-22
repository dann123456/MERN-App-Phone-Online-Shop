import React from 'react';
import './index.css';
import App from './App';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import 'react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { NextUIProvider } from '@nextui-org/react';

ReactDOM.render(

	<BrowserRouter>
		<NextUIProvider>
			<App />
		</NextUIProvider>
	</BrowserRouter>,
	document.getElementById("root")
);
