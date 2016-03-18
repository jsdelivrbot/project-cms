import React from 'react';
import Form from "react-jsonschema-form";


export default function FormPreview({schema}) {
  if (!schema) return <noscript/>
  try {
    schema = JSON.parse(schema);
  } catch (e) {
    return <div>Invalid JSON: <pre><code>{e.toString()}</code></pre></div>
  }
  return <Form schema={schema}>{" "}</Form>
}
