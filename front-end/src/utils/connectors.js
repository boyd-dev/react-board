import { Connect } from 'uport-connect';
import {Credentials} from 'uport-credentials'

//애플리케이션도 DID 를 발급받을 수 있다. https://developer.uport.me/myapps
const app_credentials = new Credentials({
    did: 'did:ethr:0x58037596723fdd2bd5bc7c26d073c1e9f609b13a',
    privateKey: '84c7b950a076a1616f5900b36099e697424b03a3a917b33c1580bd1a50d644ef'

})


//default Rinkeby
const uport = new Connect('react-Board', {
    // Connect Options:
});

uport.credentials = app_credentials;

export {
    uport
};