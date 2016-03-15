import _ from 'lodash';
import _AWS from 'aws-sdk/dist/aws-sdk.min'; //I have a dream that browser and node packages can live side by side
import {Buffer} from 'buffer';
import {v4} from 'node-uuid';
import DynamoDown from 'dynamo-down';

const AWS = window.AWS;
console.log("AWS:", AWS)


const TABLE_SCHEMA = {
    KeySchema: [
      {
      	"AttributeName": "type",
      	"KeyType": "HASH"
      },
      {
      	"AttributeName": "key",
      	"KeyType": "RANGE"
      },
    ],
    AttributeDefinitions: [
      {
      	AttributeName: "type",
      	AttributeType: "S"
      },
      {
      	AttributeName: "key",
      	AttributeType: "S"
      },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

export class DynamoStorage {
  constructor(awsConfig) {
    AWS.config.update({accessKeyId: awsConfig.key, secretAccessKey: awsConfig.secret});

    this.dynamo_db = new AWS.DynamoDB({apiVersion: '2012-08-10'});
    this.dynamo_down = DynamoDown(this.dynamo_db)
    this.table = awsConfig.table;
  }

  identifier() {
    return `dynamodb:${this.table}`
  }

  getTable(table_name) {
    var options = {db: this.dynamo_down, valueEncoding: "json"}
    return levelup(`${this.table}\\${table_name}`, options);
  }

  pCall(action, ...args) {
    return new Promise((resolve, reject) => {
      this.dynamodb[action].call(this.dynamodb, ...args, function(err, data) {
        err ? reject(err) : resolve(data)
      })
    })
  }

  createDynamoTable() {
    return this.pCall('createTable', _.assign({TableName: this.table}, TABLE_SCHEMA));
  }

  dynamoTableExists() {
    return this.pCall('listTables').then(data => {
      return _.indexOf(data.TableNames, this.table) !== -1
    });
  }

  destroy = () => {
    var params = {
        TableName: this.table,
    };
    return this.pCall('deleteTable', params);
  }
}

export default function serviceFactory(settings) {
  let storage = new DynamoStorage(settings);
  return storage.dynamoTableExists().then(exists => {
    if (!exists) return storage.createDynamoTable();
  }).then(x => {
    return storage;
  });
};
