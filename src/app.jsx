import React, { Component } from 'react'
import {unmountComponentAtNode} from 'react-dom';
import { render } from 'react-dom'
import RouterConf from './routeConf'
import Router from 'router';

render(<Router conf={RouterConf}/>, document.getElementById('appWrapper'),(componentObj)=>{
	//console.log(componentObj)
});
