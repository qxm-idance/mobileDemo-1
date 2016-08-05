import api from './api.js';
import request from 'superagent';
import { URLParser } from './util/utility.js';

const {
    userId,
    token
} = URLParser();

let Service = () => {
    return {
        freeorders: () => request
          .get(api.freeorders)
          .set('Authorization', `encrypt ${decodeURIComponent(token)}`)
          .set('userId', userId)
          .set('X-Tracking-ID', +new Date)
    }
};
export default Service();
