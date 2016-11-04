
A Content Management System that publishes static websites.

# Features

* Runs locally
* Live previews
* Publish for free to IPFS
* Publish directly to AWS S3
* Configurable DB backends: Local Storage or DynamoDB
* Pluggable Apps
* Markdown pages & Galleries
* Jinja/Nunjucks templating


# Running it

1. Clone the repository
2. `npm install`
3. `npm install jspm -g`
4. `jspm install`
5. `npm start`
6. Open browser to `localhost:8080`


# [TODO]

## Getting Started

```
  npm install -g project-cms

  project-cms start
```


1. Open browser to localhost
2. Sign up
3. Publish

## Installing apps

```
  project-cms install github:zbyte64/gallery
```


## Technical TODO

* new version of babel 6
* fix bundle
* remarkable => markdown-it
* support markdown classes
* tagging for templates (for application filtering and selecting default template)
* fixture management (when adding a new app ask to load specific fixtures, allow table purge of apps)
* cli
