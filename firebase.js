import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  setDoc,
  doc,
  getDoc,
  addDoc,
  query,
  where,
  getDocs,
  updateDoc,
} from "firebase/firestore";

const firebaseConfig = {
  // Secret - ask Raul for it
};

const firebaseApp = initializeApp(firebaseConfig);
let db = getFirestore(firebaseApp);
const NODE_COLLECTION = "Node";
const EDGE_COLLECTION = "Edge";

/**
 * Tries to find if there is a Document in a given collection
 * with a given field value. If there is not, returns null. Otherwise returns
 * the document object.
 *
 * @param {*} collection_name
 * @param {*} field_name
 * @param {*} field_val
 * @returns
 */
const findDoc = async (collection_name, field_names, field_vals) => {
  //TODO: Make sure that field_names and field_vals are arrays
  let q = collection(db, collection_name);
  for (let i = 0; i < field_names.length; i++) {
    let field_name = field_names[i];
    let field_val = field_vals[i];
    console.log(`Adding ${field_name}: ${field_val}`);
    // console.log(q);

    q = query(q, where(field_name, "==", field_val));
  }
  //   const q = query(
  //     collection(db, collection_name),
  //     where(field_name, "==", field_val)
  //   );
  const nodes = await getDocs(q);
  if (!nodes.empty) {
    console.log("found");
    const node = nodes.docs[0];
    return node;
  } else {
    console.log("not found!");
    return null;
  }
};
const addNode = async (node_name) => {
  //first check if it already exists
  let node = await findDoc(NODE_COLLECTION, ["node_string"], [node_name]);
  if (node != null) {
    console.log(
      `There is already a Node with this name (id = ${node.id}). Won't create new one.`
    );
    return;
  }
  console.log("it didnt exist, creating...");
  //if it doesn't, create it
  const docRef = await addDoc(collection(db, NODE_COLLECTION), {
    node_string: node_name,
  });
  console.log("Document written with ID: ", docRef.id);
  return docRef;
};

/**
 * Adds start and end having start < end (lexicographically)
 * @param {*} start_name
 * @param {*} end_name
 */
const addEdge = async (start_name, end_name, weight) => {
  console.log("Trying to add edge...");

  if (start_name === end_name) {
    console.log("Edges cannot have the same node names!");
    return;
  }
  // Ordering the names such that start < end
  if (start_name > end_name) {
    let prev = start_name;
    start_name = end_name;
    end_name = prev;
  }
  //First lets make sure both nodes already exist
  const start_node = await findDoc(
    NODE_COLLECTION,
    ["node_string"],
    [start_name]
  );
  if (start_node == null) {
    console.log(
      `start_name (${start_name}) does not exist. Please create a node with the addNode method.`
    );
    return;
  }
  const end_node = await findDoc(NODE_COLLECTION, ["node_string"], [end_name]);
  if (end_node == null) {
    console.log(
      `end_node (${end_name}) does not exist. Please create a node with the addNode method first.`
    );
    return;
  }
  console.log("Looking good, trying to create/update edge");
  //Now lets see if there is already an edge with both start and end
  const edge = await findDoc(
    EDGE_COLLECTION,
    ["start_name", "end_name"],
    [start_name, end_name]
  );
  console.log("... edge below...");
  console.log(edge.data());
  console.log(edge.data().weight);
  console.log("... edge above...");

  if (edge != null) {
    //There is one already, so just update the weight
    console.log(
      `Found edge with same endpoints and weight ${weight} (id = ${edge.id})`
    );
    let prev_weight = edge.data().weight;
    console.log(prev_weight);
    const edgeRef = doc(db, EDGE_COLLECTION, edge.id);
    console.log(edgeRef);
    let newEdge = await updateDoc(edgeRef, {
      weight: weight,
    });
    //Adding this console.log for some reason breaks stuff, maybe .data() has not been propagated yet?
    // console.log(`Updated from ${prev_weight} to ${newEdge.data().weight}`);
    return newEdge;
  } else {
    //There is none, so create one
    console.log("not edge found, creating new one");
    let newEdge = await addDoc(collection(db, EDGE_COLLECTION), {
      weight: weight,
      start_name: start_name,
      start_id: start_node.id, //is it necessary?
      end_name: end_name,
      end_id: end_node.id, //is it necessary?
    });
    console.log(`Edge created with id = ${newEdge.id}`);
    return newEdge;
  }
};
export { db, addNode, addEdge };
