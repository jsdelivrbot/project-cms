import _ from 'lodash';
import _AWS from 'aws-sdk/dist/aws-sdk.min'; //I have a dream that browser and node packages can live side by side
import levelup from 'levelup';
import DynamoDown from 'dynamo-down';
import {Buffer} from 'buffer';

const AWS = window.AWS;
console.log("AWS:", AWS)


const TABLE_SCHEMA = {
    KeySchema: [
      {
      	"AttributeName": "__type__",
      	"KeyType": "HASH"
      },
      {
      	"AttributeName": "__key__",
      	"KeyType": "RANGE"
      },
    ],
    AttributeDefinitions: [
      {
      	AttributeName: "__type__",
      	AttributeType: "S"
      },
      {
      	AttributeName: "__key__",
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
    let region = awsConfig.region || 'us-east-1';
    this.dynamo_db = new AWS.DynamoDB({apiVersion: '2012-08-10', region});
    this.dynamo_down = DynamoDown(this.dynamo_db)
    this.table = awsConfig.table;
  }

  identifier() {
    return `dynamodb:${this.table}`
  }

  getTable(table_name) {
    var table_key = new Buffer(table_name).toString('base64');
    var options = {db: this.dynamo_down, valueEncoding: "json"};
    return levelup(`${this.table}/${table_key}`, options);
  }

  pCall(action, ...args) {
    return new Promise((resolve, reject) => {
      this.dynamo_db[action].call(this.dynamo_db, ...args, function(err, data) {
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
