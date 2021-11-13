import React from 'react';
import { StyleSheet, Text, View, Image, Dimensions, ImageBackground } from 'react-native';
import Svg, {Path, Circle} from 'react-native-svg';
import a_star from './astar.js'

const n1 = {
    name: "a",
    x: 100,
    y: 100,
    z: 0,
};

const n2 = {
    name: "b",
    x: 100,
    y: 200,
    z: 0
};

const n3 = {
    name: "c",
    x: 200,
    y: 200,
    z: 0
};

const n4 = {
    name: "d",
    x: 300,
    y: 300,
    z: 1
};

const n5 = {
    name: "e",
    x: 100,
    y: 350,
    z: 0
};

const n6 = {
    name: "a",
    x: 50,
    y: 200,
    z: 0,
};

const n7 = {
    name: "b",
    x: 50,
    y: 100,
    z: 0
};

const n8 = {
    name: "c",
    x: 100,
    y: 400,
    z: 0
};

const n9 = {
    name: "d",
    x: 100,
    y: 50,
    z: 1
};

const n10 = {
    name: "e",
    x: 300,
    y: 50,
    z: 0
};

export default class Directions extends React.Component {
    constructor(props,start_end) {
        super(props);
        this.state = {"nodes": [n1,n2,n3,n4,n5,n6,n7,n8,n9,n10],
                      "edges": [[1,2,6],
                                [0,2],
                                [0,1,3],
                                [2,7],
                                [5],
                                [4,6,8],
                                [0,5],
                                [3,4],
                                [5,9],
                                [8]],
                      "path": null,
                      "start": start_end[0], 
                      "end": start_end[1], 
                      "new_route": false, 
                      "floor": 0};
    }

    prepareData() {
        if (this.state["new_route"]) {
            this.setState({"path": a_star()});
            this.setState({"new_route": false});
        }

        let circles = [];
        let path = ``;
        let connections = [];

        for (let i=0; i<this.state["nodes"].length; i++) {
            for (let j=0; j<this.state["edges"][i].length; j++) {
                let node1 = this.state["nodes"][i];
                let node2 = this.state["nodes"][this.state["edges"][i][j]];
                connections.push(<Path d = {`M${node1.x} ${node1.y} L${node2.x} ${node2.y}`} 
                    stroke="red"
                    strokeWidth={5}
                    fill="none"
                    key = {100*i+j}
                    />);
            }
        }

        if (this.state["path"] != null) {
            path = `M ${this.state["path"][0][0]} ${this.state["path"][0][1]}`;
            let on_floor = (this.state["path"][0][2] == this.state["floor"]);
            if (on_floor) {
                circles.push(<Circle cx={this.state["path"][0][0]} cy={this.state["path"][0][1]} r="10" fill="green" key={0}/>)
            }

            for (let i=1; i<this.state["path"].length; i++) {
                if (this.state["path"][i][2] == this.state["floor"]) {
                    if (on_floor) {
                        path += ` L${this.state["path"][i][0]} ${this.state["path"][i][1]}`;
                    } else {
                        path += ` M${this.state["path"][i][0]} ${this.state["path"][i][1]}`;
                        on_floor = true;
                        circles.push(<Circle cx={this.state["path"][i][0]} cy={this.state["path"][i][1]} r="10" fill="yellow" key={i}/>)
                    }
                } else {
                    if (on_floor) {
                        circles.push(<Circle cx={this.state["path"][i-1][0]} cy={this.state["path"][i-1][1]} r="10" fill="yellow" key={i-1}/>)
                    }
                    on_floor = false;
                }
            }
            if (on_floor) {
                circles.push(<Circle cx={this.state["path"][this.state["path"].length-1][0]} cy={this.state["path"][this.state["path"].length-1][1]} r="10" fill="green" key={this.state["path"].length-1}/>)
            } else {
                circles.push(<Circle cx={this.state["path"][this.state["path"].length-1][0]} cy={this.state["path"][this.state["path"].length-1][1]} r="10" stroke="green" strokeWidth="3" strokeDasharray="2 2" key={this.state["path"].length-1}/>)
            }
        }

        return [path, circles, connections];
    }

    render() {
        let data = this.prepareData();
        return (
            <Svg>
                {data[2]}
                <Path d = {data[0]} 
                    stroke="yellow"
                    strokeWidth={5}
                    fill="none"
                />
                {data[1]}
            </Svg> 
        )
    }
}