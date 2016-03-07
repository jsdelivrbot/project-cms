import _ from 'lodash';
import _AWS from 'aws-sdk/dist/aws-sdk.min'; //I have a dream that browser and node packages can live side by side
import {Buffer} from 'buffer';
import {v4} from 'node-uuid';

const AWS = window.AWS;
console.log("AWS:", AWS)


const TABLE_SCHEMA = {
    KeySchema: [
        { AttributeName: "table_name", KeyType: "HASH"},  //Partition key
        { AttributeName: "object_id", KeyType: "RANGE" }  //Sort key
    ],
    AttributeDefinitions: [
        { AttributeName: "table_name", AttributeType: "S" },
        { AttributeName: "object_id", AttributeType: "S" },
        { AttributeName: "value", AttributeType: "S" },
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 1,
        WriteCapacityUnits: 1
    }
};

export class DynamoStorage {
  constructor(awsConfig) {
    AWS.config.update({accessKeyId: awsConfig.key, secretAccessKey: awsConfig.secret});

    this.dynamodb = new AWS.DynamoDB();
    this.table = awsConfig.table;
  }

  pCall(action, ...args) {
    return new Promise((resolve, reject) => {
      this.dynamodb[action].call(this.dynamodb, ...args, function(err, data) {
        err ? reject(err) : resolve(data)
      })
    })
  }

  createTable() {
    return this.pCall('createTable', _.assign({TableName: this.table}, TABLE_SCHEMA));
  }

  tableExists() {
    return this.pCall('listTables').then(data => {
      return _.indexOf(data.TableNames, this.table) !== -1
    });
  }

  putObject = (table_name, object_id, new_object) => {
    var params = {
        TableName: this.table,
        Item:{
            "table_name": table_name,
            "object_id": object_id,
            "value": JSON.stringify(new_object)
        }
    };
    return this.pCall('put', params);
  };

  deleteObject = (table_name, object_id) => {
    var params = {
        TableName: this.table,
        Key:{
            "table_name": table_name,
            "object_id": object_id
        }
    };
    return this.pCall('delete', params);
  };

  readTable = (table_name) => {
    var params = {
        TableName: this.table,
        Key:{
            "table_name": table_name
        }
    };

    var items = [];

    return new Promise((resolve, reject) => {
      function onScan(err, data) {
        if (err) {
          reject(err);
        } else {
          // print all the movies
          console.log("Scan succeeded.");
          items = _.concat(item, data.Items);

          // continue scanning if we have more movies
          if (typeof data.LastEvaluatedKey != "undefined") {
            console.log("Scanning for more...");
            params.ExclusiveStartKey = data.LastEvaluatedKey;
            this.dynamodb.scan(params, onScan);
          } else {
            resolve(items);
          }
        }
      }

      this.dynamodb.scan(params, onScan);
    });
  };

  purgeTable = (table_name) => {
    var params = {
        TableName: this.table,
        Key:{
            "table_name": table_name
        }
    };
    return this.pCall('delete', params);
  };

  destroy = () => {
    var params = {
        TableName: this.table,
    };
    return this.pCall('deleteTable', params);
  }
}

export default function serviceFactory(settings) {
  let storage = new DynamoStorage(settings);
  storage.tableExists().then(exists => {
    if (!exists) storage.createTable();
  });
  return storage;
};
