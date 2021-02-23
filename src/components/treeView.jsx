import React, { useState } from "react";
import axios from "axios";
import TreeMenu from "react-simple-tree-menu";
import interval from "react-interval";
import { useEffect } from "react";
// const treeData = [
//     {
//       key: 'first-level-node-1',
//       label: 'Node 1 at the first level',
//       nodes: [
//         {
//           key: 'second-level-node-1',
//           label: 'Node 1 at the second level',
//           nodes: [
//             {
//               key: 'third-level-node-1',
//               label: 'Last node of the branch',
//               nodes: [] // you can remove the nodes property or leave it as an empty array
//             },
//           ],
//         },
//       ],
//     },
//     {
//       key: 'first-level-node-2',
//       label: 'Node 2 at the first level',
//     },
//   ];

const treeData2 = {
  "first-level-node-1": {
    // key
    label: "Node 1 at the first level",
    index: 0, // decide the rendering order on the same level
    nodes: {
      "second-level-node-1": {
        label: "Node 1 at the second level",
        index: 0,
        nodes: {
          "third-level-node-1": {
            label: "Node 1 at the third level",
            index: 0,
            nodes: {}, // you can remove the nodes property or leave it as an empty array
          },
        },
      },
    },
  },
  "first-level-node-2": {
    label: "Node 2 at the first level",
    index: 1,
    nodes: {
      "second-level-node-2": {
        label: "Node 1 at the third level",
        index: 0,
        nodes: {}, // you can remove the nodes property or leave it as an empty array
      },
    },
  },
};
export default function TreeView() {
  let interval;
  const [data, setData] = useState({ key: 0, label: "", index: 0, nodes: [] });
  const getInterval = async () => {
    let response = await axios
      .get("http://3.18.225.89:3000/getProc")
      .then((res) => {
        return res.data;
      })
      .catch((e) => {
        console.log(e);
      });
    setInfo(response);
  };
  const setInfo = (info) => {
    let object = {
      PID: "0",
      PROCESS: "Procesos",
      Hijos: info.Procesos,
      RAM: 0,
    };
    let rawData = preOrder(object);
    console.log(rawData.Hijos);

    const newArray = rawData.Hijos.map((item) => {
      return { key: item.codigo, label: item.nombre, nodes: item.Hijos };
    });
    setData(newArray);
    // console.log(data);
    recorrido(info);
  };

  useEffect(() => {
    interval = setInterval(() => getInterval(), 5000);
    return () => clearInterval(interval);
  }, []);
  const preOrder = (item) => {
    if (item) {
      let { Hijos } = item;
      if (Hijos) {
        item.nodes = Hijos && Hijos.map((C) => preOrder(C));

        if (item.nodes.length === 0) item.nodes = null;
      }
      return {
        ...item,
        nodes: Hijos && Hijos.length > 0 ? Hijos : null,
        toggled: true,
        Hijos,
      };
    }
  };
  const recorrido = (item) => {
    // item.Procesos.forEach(proceso => {
    //   console.log(proceso);
    //   data.push({key: proceso.codigo })
    //   if(proceso.nodes){
    //     proceso.nodes.forEach(subproceso => {
    //       console.log(subproceso);
    //     });
    //   }
    // });
  };
  //console.log(data);
  return (
    <TreeMenu data={data} />
    //<div></div>
  );
}
