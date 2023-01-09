import * as singleSpa from 'single-spa';


const loadMfe = () => {
  //@ts-ignore
  return import('mfe_client/sspa');
};

function pathPrefix(prefix: string) {
  return function locationTest(location: Location) {
    return location.pathname.startsWith(prefix);
  };
}
singleSpa.registerApplication('mfe_client', loadMfe, pathPrefix('/my/test'), {

});

singleSpa.start();