import React from 'react';
import _ from 'lodash';
import FieldSet from "zbyte64/react-jsonschema-form/src/components/FieldSet";


export default function ExtraForm({template, formData, onChange}) {
  if (!template) return <noscript/>
  template = template.toJS();
  let {schema, uiSchema} = template;
  if (!schema) return <noscript/>
  try {
    schema = JSON.parse(schema);
    if (uiSchema) {
      uiSchema = JSON.parse(uiSchema);
    }
  } catch (e) {
    return <div>Invalid Extra Form JSON: <pre><code>{e.toString()}</code></pre></div>
  }
  return <FieldSet schema={schema} formData={formData} onChange={onChange} uiSchema={uiSchema}/>
}
