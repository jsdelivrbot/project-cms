import React from 'react';
import FieldSet from "zbyte64/react-jsonschema-form/src/components/FieldSet";


export default function FormPreview({schema}) {
  if (!schema) return <noscript/>
  try {
    schema = JSON.parse(schema);
  } catch (e) {
    return <div>Invalid JSON: <pre><code>{e.toString()}</code></pre></div>
  }
  return <FieldSet schema={schema}/>
}
