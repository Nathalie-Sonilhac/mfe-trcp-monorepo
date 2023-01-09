import React from 'react';
import ReactDOM from 'react-dom';
import singleSpaReact from 'single-spa-react';
import {App} from './test'

/**
 * The root of the application
 * @returns {JSX.Element}
 * @constructor
 */
 const MOUNT_ELEMENT_ID = 'mfe_client';
//export const Test = (): JSX.Element => <h1>React Application</h1>;

const headerLifecycles = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: App,
    domElementGetter: () => document.getElementById(MOUNT_ELEMENT_ID) as HTMLElement,
});

export const bootstrap = headerLifecycles.bootstrap;
export const mount = headerLifecycles.mount;
export const unmount = headerLifecycles.unmount;

export default App;