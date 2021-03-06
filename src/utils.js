function getNodeIcon(type) {
  if (type === "placeholder") {
    return `<img alt='placeholder icon' src='assets/placeholder-icon.png' width='32' height='32' /> `;
  } else if (type === "item") {
    return `<img alt='root item icon' src='assets/root-item-icon.png' width='32' height='32' /> `;
  } else if (type === "rendering") {
    return `<img alt='rendering icon' src='assets/control-icon.png' width='32' height='32' /> `;
  } else if (type === "device") {
    return `<img alt='device icon' src='assets/device-icon.png' width='32' height='32' /> `;
  } else if (type === "layout") {
    return `<img alt='layout icon' src='assets/layout-icon.png' width='32' height='32' /> `;
  }
}

function transformChartData(originalObject) {
  if (Array.isArray(originalObject) && originalObject.length === 0) return [];
  const { name, type, dataSource, children } = originalObject;
  const result = {
    text: {
      name,
      type,
    },
    children: children.map(transformChartData),
  };
  if (dataSource) {
    console.log("JSON.parse(dataSource): ", dataSource);
    result.text.datasource = JSON.stringify(dataSource);
  }
  return result;
}

// {
// 	name: "name",
// 	type: "rendering|placeholder|layout|device|item",
// 	dataSource?: {
// 		id: "id",
// 		name: "name",
// 		path: "path"
// 	},
// 	children: []
// }
