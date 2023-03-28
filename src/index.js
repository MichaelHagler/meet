import React from 'react';
import { render } from 'react-dom';
import './index.css';
import App from './App';
import * as atatus from "atatus-spa";

atatus.config("4d9aadd413334e73bef14fa057292721").install();

const root = document.getElementById("root");
render(<App />, root);

atatus.notify(new Error("Test Atatus Setup"));