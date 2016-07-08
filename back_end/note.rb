class Note
  NOTES_JSON_FILE = File.dirname(__FILE__) + '/notes.json'

  class << self
    attr_accessor :latest_id

    def all
      notes_data_string = File.read(NOTES_JSON_FILE)
      notes_data = JSON.parse(notes_data_string)
      note_hashes = notes_data["notes"]
      note_hashes.map { |note_hash| Note.new(note_hash) }
    end

    def find_by(attributes)
      all.find do |note|
        attributes.all? do |attribute, attribute_value|
          note.send(attribute) == attribute_value
        end
      end
    end

    def next_id
      self.latest_id += 1
    end

    def where(attributes)
      all.select do |note|
        attributes.all? do |attribute, attribute_value|
          note.send(attribute) == attribute_value
        end
      end
    end

    private

    def get_latest_id_from_notes_json
      if all.empty?
        self.latest_id = 0
      else
        self.latest_id = all.max_by(&:id).id
      end
    end
  end

  attr_accessor :id, :body, :updated_at
  attr_reader :folder_id

  def initialize(attributes)
    @id = attributes["id"]
    @body = attributes["body"]
    @updated_at = attributes["updated_at"]
    @folder_id = attributes["folder_id"]
  end

  def destroy
    notes = Note.all
    notes.delete_if { |note| note.id == id }
    overwrite_notes_json(notes)
  end

  def errors
    @errors ||= {}
  end

  def save
    if valid?
      self.id = Note.next_id
      self.updated_at = Time.now.strftime('%-m/%-d/%Y')
      notes = Note.all
      notes.push(self)
      overwrite_notes_json(notes)
      true
    else
      false
    end
  end

  def to_hash
    {
      id: id,
      body: body,
      updated_at: updated_at,
      folder_id: folder_id
    }
  end

  def to_json(_)
    to_hash.to_json
  end

  def update(note_params)
    self.body = note_params["body"]

    if valid?
      self.updated_at = Time.now.strftime('%-m/%-d/%Y')
      notes = Note.all
      notes.map! { |note| note.id == id ? self : note }
      overwrite_notes_json(notes)
      true
    else
      false
    end
  end

  def valid?
    if body.nil? || (body && body.empty?)
      errors[:body] ||= []
      errors[:body] << "can't be blank"
    end

    errors.empty?
  end

  get_latest_id_from_notes_json

  private

  def overwrite_notes_json(notes)
    notes.map!(&:to_hash)
    notes_data = { notes: notes }
    notes_data_string = JSON.pretty_generate(notes_data, indent: "  ")
    File.write(NOTES_JSON_FILE, notes_data_string)
  end
end

