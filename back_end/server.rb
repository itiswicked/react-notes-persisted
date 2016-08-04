require "sinatra"
require "sinatra/json"
require "json"
require_relative "folder"
require_relative "note"
require 'pry'

before do
  headers "Access-Control-Allow-Origin" => "*"
end

options "*" do
  headers "Access-Control-Allow-Methods" => "POST, GET, OPTIONS, PUT, DELETE"
end

get "/folders.json" do
  folders = Folder.all
  status 200
  json folders: folders
end

post "/folders.json" do
  request_body_string = request.body.read
  request_body = JSON.parse(request_body_string)
  folder_params = request_body["folder"]
  folder = Folder.new(folder_params)

  if folder.save
    status 201
    json folder: folder
  else
    status 422
    json folder.errors
  end
end

get "/folders/:folder_id/notes.json" do
  folder = Folder.find_by(id: params[:folder_id].to_i)
  if folder
    notes = folder.notes
    status 200
    json notes: notes
  else
    status 404
  end
end

post "/folders/:folder_id/notes.json" do
  request_body_string = request.body.read
  request_body = JSON.parse(request_body_string)
  note_params = request_body["note"]
  folder = Folder.find_by(id: params[:folder_id].to_i)

  if folder
    note_params["folder_id"] = folder.id
    note = Note.new(note_params)

    if note.save
      status 201
      json note: note
    else
      status 422
      json note.errors
    end
  else
    status 404
  end
end

patch "/notes/:id.json" do
  request_body_string = request.body.read
  request_body = JSON.parse(request_body_string)
  note_params = request_body["note"]
  note = Note.find_by(id: params[:id].to_i)

  if note && note.update(note_params)
    status 204
  elsif note
    status 422
    json note.errors
  else
    status 404
  end
end

delete "/notes/:id.json" do
  note = Note.find_by(id: params[:id].to_i)

  if note
    note.destroy
    status 204
  else
    status 404
  end
end
