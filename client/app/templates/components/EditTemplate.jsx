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
      <h1>Editing Template: {path}</h1>
    </div>
    <div className="row">
      <form className="form-horizontal" onSubmit={receiveSubmit}>
        <div className="form-group">
          <label className="col-sm-2 control-label">Template</label>
          <div className="col-sm-10">
            <textarea name="content" className="form-control" defaultValue={template.content} required="required"/>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-offset-2 col-sm-10">
            <button type="submit" className="btn btn-default">Submit</button>
          </div>
        </div>
      </form>
    </div>
  </div>
}
