import React from 'react';

export default function EditTemplate({updateTemplate, template, path}) {
  function receiveSubmit(event) {
    event.preventDefault();
    console.log("Submit:", event);
    template.content = event.target.content.value;
    console.log("New Page:", template)
    updateTemplate(path, template)
  }

  return <div className="container-fluid">
    <div className="row">
      <div className="col-sm-12">
        <h1>Editing Template: {path}</h1>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        <form onSubmit={receiveSubmit}>
          <div className="form-group">
            <label className="control-label">Template</label>
            <span className="help-block">Write the HTML layout using <a href="https://paularmstrong.github.io/swig/">swig</a></span>
            <textarea name="content" className="form-control" defaultValue={template.content} required="required"/>
          </div>
          <div className="form-group">
            <button type="submit" className="btn btn-primary">Save</button>
          </div>
        </form>
      </div>
    </div>
  </div>
}
