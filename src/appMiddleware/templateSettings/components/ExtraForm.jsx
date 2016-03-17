import React from 'react';
import _ from 'lodash';
import Form from "react-jsonschema-form";


export default function ExtraForm({template, formData}) {
  return <noscript/> // https://github.com/mozilla-services/react-jsonschema-form/issues/71
  if (!template) return <noscript/>
  template = template.toJS();
  let schema = template.schema;
  if (!schema) return <noscript/>
  try {
    schema = JSON.parse(schema);
  } catch (e) {
    return <div>Invalid Extra Form JSON: <pre><code>{e.toString()}</code></pre></div>
  }
  return <Form schema={schema} formData={formData}>{" "}</Form>
}
