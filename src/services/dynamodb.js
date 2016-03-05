import _ from 'lodash';
import _AWS from 'aws-sdk/dist/aws-sdk.min'; //I have a dream that browser and node packages can live side by side
import {Buffer} from 'buffer';
import {v4} from 'node-uuid';

const AWS = window.AWS;
console.log("AWS:", AWS)


export class DynamoStorage {
  constructor() {
    this.dynamodb = new AWS.DynamoDB();
  }

  putObject = (table_name, object_id, new_object) => {

  };

  deleteObject = (table_name, object_id) => {

  };

  readTable = (table_name) => {

  };

  purgeTable = (table_name) => {

  };

  destroy = () => {

  }
}

export default function serviceFactory() {
  return new DynamoStorage()
};
