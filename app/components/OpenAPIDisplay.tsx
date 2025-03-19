import React from "react";
import EndpointCard from "./EndpointCard"; // Import the EndpointCard component

interface OpenAPIProps {
  data: any; // Parsed OpenAPI data
}

const OpenAPIDisplay: React.FC<OpenAPIProps> = ({ data }) => {
  return (
    <div>
      <section className="mb-6">
        <h5 className="text-xl font-semibold text-gray-800">OpenAPI Version</h5>
        <p className="text-gray-600">{data.openapi}</p>
      </section>

      <section className="mb-6">
        <h5 className="text-xl font-semibold text-gray-800">API Information</h5>
        <p className="text-gray-600">
          <strong>Title:</strong> {data.info.title}
        </p>
        <p className="text-gray-600">
          <strong>Version:</strong> {data.info.version}
        </p>
        <p className="text-gray-600">
          <strong>Description:</strong> {data.info.description}
        </p>
      </section>

      <section className="mb-6">
        <h5 className="text-xl font-semibold text-gray-800">Paths</h5>
        {data.paths ? (
          Object.keys(data.paths).map((path, idx) => (
            <div key={idx} className="mb-4">
              <div className="bg-gray-100 p-6 rounded-md shadow-lg mb-4">
                <h6 className="text-lg font-semibold text-purple-600 mb-2">
                  Path: {path}
                </h6>
                {data.paths[path] &&
                  Object.keys(data.paths[path]).map((method, methodIdx) => (
                    <EndpointCard
                      key={methodIdx}
                    
                      path={path}
                      method={method}
                      summary={data.paths[path][method]?.summary}
                      description={data.paths[path][method]?.description}
                      parameters={data.paths[path][method]?.parameters}
                      responses={data.paths[path][method]?.responses}
                    />
                  ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-600">
            No paths available in the specification.
          </p>
        )}
      </section>
    </div>
  );
};

export default OpenAPIDisplay;
