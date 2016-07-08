You have been hired to create the following notes application:

![react_notes_root_image][react_notes_root_image]

The left pane shows a list of folders which contain notes.
The currently selected folder is highlighted in blue.
At the bottom of the left pane, there is a form to create a new folder.

The middle pane displays the list of notes in the current folder.
The currently selected note is highlighted in yellow.
At the top of the middle pane, there is a button to create a new note in the currently selected folder as well as a search bar.
Typing into the search bar would change the notes displayed in the list to those whose content matches the search bar input.

The right pane is a form to update the currently selected note.
The users would type into the `textarea` element of the form and click on the update button to save the changes to the note.
The top of the right pane also shows when the note was last updated and a button to delete the note.

## Setup
From your challenges directory, run the following:

```sh
$ et get react-notes-persisted
$ cd react-notes-persisted
$ npm install
$ webpack-dev-server
```
If you go to [localhost:8080][localhost-8080], there will be nothing displayed on the page and there should be no errors in your console.

In another terminal tab, run the following from this challenge's root directory to set up and start the back-end server:

```sh
$ cd back_end
$ bundle install
$ ruby server.rb
```

## Back-end API
### Folders
Folder data is stored in `back_end/folders.json`.

#### Creating Folders

cURL request example:

```sh
$ curl -i -X POST -d '
{
  "folder": {
      "name": "my first folder"
  }
}
' "http://localhost:4567/folders.json"
```

HTTP Response:

```sh
HTTP/1.1 201 Created
Content-Type: application/json
Access-Control-Allow-Origin: *
Content-Length: 45
X-Content-Type-Options: nosniff
Connection: keep-alive
Server: thin

{"folder":{"id":1,"name":"my first folder"}}
```

If you do not properly format the request body you may get a 500 response status code.
Furthermore, if the `name` property is either not specified or a blank string, then you will get a 422 response status code.

#### Reading Folders

cURL request example:

```sh
$ curl -i -X GET "http://localhost:4567/folders.json"
```

HTTP Response:

```sh
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *
Content-Length: 47
X-Content-Type-Options: nosniff
Connection: keep-alive
Server: thin

{"folders":[{"id":1,"name":"my first folder"}]}
```

### Notes
Note data is stored in `back_end/notes.json`.

#### Creating Notes

cURL request example:

```sh
$ curl -i -X POST -d '
{
    "note": {
        "body": "first note in first folder"
    }
}
' "http://localhost:4567/folders/1/notes.json"
```

HTTP Response:

```sh
HTTP/1.1 201 Created
Content-Type: application/json
Access-Control-Allow-Origin: *
Content-Length: 91
X-Content-Type-Options: nosniff
Connection: keep-alive
Server: thin

{"note":{"id":1,"body":"first note in first folder","updated_at":"4/1/2016","folder_id":1}}
```

If you do not properly format the request body you may get a 500 response status code.
Furthermore, if the `body` property is either not specified or a blank string, then you will get a 422 response status code.
Attempting to create a note for a folder whose `id` does not exist in `folders.json` will return a 404 response status code.

#### Reading Notes

cURL request example:

```sh
$ curl -X GET "http://localhost:4567/folders/1/notes.json"
```

HTTP Response:

```sh
HTTP/1.1 200 OK
Content-Type: application/json
Access-Control-Allow-Origin: *
Content-Length: 94
X-Content-Type-Options: nosniff
Connection: keep-alive
Server: thin

{"notes":[{"id":1,"body":"first note in first folder","updated_at":"4/1/2016","folder_id":1}]}
```

Attempting to read notes for a folder whose `id` does not exist in `folders.json` will return a 404 response status code.

#### Updating Notes

cURL request example:

```sh
$ curl -i -X PATCH -d '
{
  "note": {
    "body": "updated note"
  }
}
' "http://localhost:4567/notes/1.json"
```

HTTP Response:

```sh
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
X-Content-Type-Options: nosniff
Connection: close
Server: thin

```

If you do not properly format the request body you may get a 500 response status code.
Furthermore, if the `body` property is either not specified or a blank string, then you will get a 422 response status code.
Attempting to update a note whose `id` does not exist in `notes.json` will return a 404 response status code.

#### Deleting Notes

cURL request example:

```sh
$ curl -i -X DELETE "http://localhost:4567/notes/1.json"
```

HTTP Response:

```sh
HTTP/1.1 204 No Content
Access-Control-Allow-Origin: *
X-Content-Type-Options: nosniff
Connection: close
Server: thin

```

Attempting to delete a note whose `id` does not exist in `notes.json` will return a 404 response status code.

## Deliverables
1. By using a combination of the [Fetch API][mdn-fetch-api] and React lifecycle methods, make your React application uses the data from the provided back-end server. You should also make sure you create, update, and delete data from the back-end server when appropriate to ensure that your application's state is persisted even if the page is refreshed.
2. Double-check that your final product still meets the deliverables of the [React Notes Stateful Challenge][react-notes-stateful].
3. This is the last chance you will have to style your application! Make sure your mom is not the only person in the world who thinks your application looks good....

## Pro Tips

* Make sure you install [Github's Fetch polyfill][github-fetch] and import it in your `main.js` to ensure the fetch API is available to browsers that do not natively support it.
* Fetching data to update the state after initial rendering is best done during `ComponentDidMount`.
* Fetching data to update the state in response to a change in props is best done during `ComponentWillReceiveProps`.
* You may have previously had one component store all the data for your folders and notes for your application. Now that you have a server that stores all this data, try to minimize the amount of data that each of your components holds in their state. For example, your application should only have the data for the notes of the currently selected folder in memory. Furthermore, you really should not have a component which holds the data for both the folders and notes in its state because this violates the single responsibility principle. Think about the data that each stateful component is responsible for.
* [Foundation][foundation] and [Font Awesome][font-awesome] are available for you to use via a CDN. You know what to do.

[font-awesome]: http://fortawesome.github.io/Font-Awesome/
[foundation]: http://foundation.zurb.com/
[localhost-8080]: http://localhost:8080
[mdn-fetch-api]: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
[github-fetch]: https://github.com/github/fetch
[react_notes_root_image]: https://s3.amazonaws.com/horizon-production/images/react_notes.png
[react-notes-stateful]: https://learn.launchacademy.com/teams/spring-2016/curricula/online-intensive/lessons/react-notes-stateful
