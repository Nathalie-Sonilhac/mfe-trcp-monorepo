import { start, registerApplication } from 'single-spa';

registerApplication('mfe_client',    
() => import('mfe_client/src/App'),
(location) => location.pathname.startsWith('/'),)

start();