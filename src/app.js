const urlParams = new URLSearchParams(window.location.search);
const itemId = urlParams.get("id");

axios
  .get(`http://localhost:3000/components?id=${itemId}`)
  .then(({ data, status }) => {
    console.log(data);
    if (status === 200 && Array.isArray(data) && data.length > 0) {
      console.log("good");
      const [dataToTransform] = data;
      const transformedData = transformChartData(dataToTransform);
      console.log("transformedData: ", transformedData);
      const simple_chart_config = {
        chart: {
          container: "#chart-root",
          connectors: { type: "step" }, // straight
        },

        nodeStructure: transformedData,
      };
      new Treant(simple_chart_config);

      setTimeout(() => {
        $(".node-name").each(function () {
          const nodeName = $(this).text();
          const typeOfNode = $(this)
            .parent()
            .children(".node-type")
            .first()
            .text();
          let dataBsContent = "<div>";
          if ($(this).parent().children(".node-datasource").length > 0) {
            console.log(
              "try to parse it: ",
              $(this).parent().children(".node-datasource").first().text()
            );
            const datasource = JSON.parse(
              $(this).parent().children(".node-datasource").first().text()
            );
            const {
              id: datasourceId,
              name: datasourceName,
              path: datasourcePath,
            } = datasource;
            dataBsContent += `<div><span class='bold'>Datasource:</span> ${datasourceName} ${datasourcePath} (${datasourceId})<div>`;
          }
          if (
            $(this).parent().children(".node-renderingParameters").length > 0
          ) {
            const renderingParameters = JSON.parse(
              $(this)
                .parent()
                .children(".node-renderingParameters")
                .first()
                .text()
            );
            dataBsContent += `<div><span class='bold'>Rendering parameters:</span> `;
            for (let renderingParameterName in renderingParameters) {
              dataBsContent += `<p class='key-value-list'>${renderingParameterName}: ${renderingParameters[renderingParameterName]}</p>`;
            }
            dataBsContent += "</div>";
          }

          dataBsContent += "</div>";
          $(this).wrap(`<a 
                  type="button"
                  class='btn btn-success node-wrapper'
                  rel='popover'  
                  data-bs-toggle='popover'
                  data-html='true'
                  title='${typeOfNode}: ${nodeName}' 
                  data-bs-content="${dataBsContent}">
              </a>`);
        });
        $(".node-type").each(function () {
          const nodeWrapper = $(this)
            .parent()
            .children(".node-wrapper")
            .first();
          const nodeType = $(this).text();
          nodeWrapper.prepend(
            `<div class="node-icon">${getNodeIcon(nodeType)}</div>`
          );
        });

        var popoverTriggerList = [].slice.call(
          document.querySelectorAll('[data-bs-toggle="popover"]')
        );
        var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
          return new bootstrap.Popover(popoverTriggerEl, { html: true });
        });
      }, 1000);

      $(".node-name").css({ fontSize: 21, paddingRight: 6 });
    } else {
      alert("Something went wrong");
    }
  });
