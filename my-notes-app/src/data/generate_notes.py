import json
import os

# Ensure directory exists
os.makedirs("src/data", exist_ok=True)

# Prepare notes
notes = {
    "notes": []
}

for i in range(1, 1001):
    note = {
        "id": i,
        "title": f"Note {i}",
        "author": {
            "name": f"Author {i}",
            "email": f"mail_{i}@gmail.com"
        },
        "content": f"This is the content of note number {i}. Praise be to simplicity."
    }
    notes["notes"].append(note)

# Save to file
with open("src/data/notes.json", "w") as f:
    json.dump(notes, f, indent=2)
