import Realm from "realm";
import { ObjectId } from "bson";

const NodeSchema = {
  name: "Node",
  properties: {
    _id: "objectId",
    _partition: "string",
    node_string: "string",
  },
  primaryKey: "_id",
};
class Node extends Realm.Object {
  constructor({ node_string, partition, id = new ObjectId() }) {
    this.node_string = node_string;
    this._id = id;
    this._partition = partition;
  }
  static schema = NodeSchema;
}

const EdgeSchema = {
  name: "Edge",
  properties: {
    _id: "objectId",
    _partition: "string",
    end_id: "objectId",
    end_string: "string",
    start_id: "objectId",
    start_string: "string",
  },
  primaryKey: "_id",
};

class Edge extends Realm.Object {
  static schema = EdgeSchema;
}

export { Node, Edge };
