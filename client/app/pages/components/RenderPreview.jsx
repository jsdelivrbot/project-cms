import React from 'react';
import Remarkable from 'remarkable';

let md = new Remarkable();

export default function RenderPreview({page, render}) {
  //TODO iframe?
  var content = md.render(page.content);
  var context = {
    content,
    page
  };
  return <div dangerouslySetInnerHTML={{__html: render(page.template, context)}}/>
}
