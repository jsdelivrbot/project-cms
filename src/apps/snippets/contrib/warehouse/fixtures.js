import _ from 'lodash';
import {v4} from 'node-uuid';

export function initial(baseUrl) {
  return {
    [baseUrl]: {}
  }
}

export default {initial};
