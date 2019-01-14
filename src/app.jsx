import React, { Component } from 'react'
import {unmountComponentAtNode} from 'react-dom';
import { render } from 'react-dom'
import Router from 'router';

let t = Date.now();
render(<Router />, document.getElementById('appWrapper'),()=>{
	//console.log(this)
});

console.log(Date.now() - t)
