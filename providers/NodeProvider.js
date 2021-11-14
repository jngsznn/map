//Inspired on https://github.com/mongodb-university/realm-tutorial-react-native/blob/cef89a0d4bdc80171015843c0af135d3df2aa8bd/providers/TasksProvider.js#L117
import React, { useContext, useState, useEffect, useRef } from "react";
import Realm from "realm";
import { Node } from "../schemas.js";
import { useAuth } from "./AuthProvider";

const NodeContext = React.createContext(null);

const NodeProvider = ({ children, projectPartition }) => {
  const { user } = useAuth();
  const realmRef = useRef(null); //instead of state to avoid re-render

  useEffect(() => {
    // Enables offline-first: opens a local realm immediately without waiting
    // for the download of a synchronized realm to be completed.
    const OpenRealmBehaviorConfiguration = {
      type: "openImmediately",
    };
    const config = {
      schema: [NodeSchema],
      sync: {
        user: user,
        partitionValue: projectPartition,
        newRealmFileBehavior: OpenRealmBehaviorConfiguration,
        existingRealmFileBehavior: OpenRealmBehaviorConfiguration,
      },
    };
    // open a realm for this particular project
    Realm.open(config).then((projectRealm) => {
      realmRef.current = projectRealm;

      //   const syncTasks = projectRealm.objects("Node");
      //   let sortedTasks = syncTasks.sorted("name");
      //   setTasks([...sortedTasks]);
      //   sortedTasks.addListener(() => {
      //     setTasks([...sortedTasks]);
      //   });
    });

    return () => {
      // cleanup function
      const projectRealm = realmRef.current;
      if (projectRealm) {
        projectRealm.close();
        // realmRef.current = null;
        // setTasks([]);
      }
    };
  }, [user]);

  //newNode is a string representing a given classroom
  const createNode = (newNode) => {
    const projectRealm = realmRef.current;
    projectRealm.write(() => {
      // Create a new task in the same partition -- that is, in the same project.
      projectRealm.create(
        "Node",
        new Node({
          node_string: newNode,
          partition: projectPartition,
        })
      );
    });
  };
  // Render the children within the TaskContext's provider. The value contains
  // everything that should be made available to descendants that use the
  // useTasks hook.
  return (
    <NodeContext.Provider
      value={{
        createNode,
        // deleteTask,
        // setTaskStatus,
        // tasks,
      }}
    >
      {children}
    </NodeContext.Provider>
  );
};

// The useNodes hook can be used by any descendant of the TasksProvider. It
// provides the tasks of the TasksProvider's project and various functions to
// create, update, and delete the tasks in that project.
const useNode = () => {
  const node = useContext(NodeContext);
  if (node == null) {
    throw new Error("useNode() called outside of a NodeProvider?"); // an alert is not placed because this is an error for the developer not the user
  }
  return node;
};

export { NodeProvider, useNode };
