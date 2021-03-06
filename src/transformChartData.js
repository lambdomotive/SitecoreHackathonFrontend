function transformChartData(originalData) {
  const transformed = {};

  while (true) {}
}

function transform(originalObject) {
  const { name, type, dataSource, children } = originalObject;
  const result = {
    text: {
      name,
      type,
    },
    children: children.map(transformSingleObject),
  };
  if (dataSource) {
    result.text.datasource = JSON.parse(dataSource);
  }
  return result;
}

// {
// 	name: "name",
// 	type: "rendering|placeholder",
// 	dataSource?: {
// 		id: "id",
// 		name: "name",
// 		path: "path"
// 	},
// 	children: []
// }
