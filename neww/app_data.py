from app import db, Country

countries = [
    {"name": "India", "capital": "New Delhi", "landmark": "Taj Mahal"},
    {"name": "France", "capital": "Paris", "landmark": "Eiffel Tower"},
    {"name": "USA", "capital": "Washington, D.C.", "landmark": "Statue of Liberty"},
    {"name": "Japan", "capital": "Tokyo", "landmark": "Mount Fuji"},
]

for c in countries:
    country = Country(name=c["name"], capital=c["capital"], landmark=c["landmark"])
    db.session.add(country)

db.session.commit()
print("Data added successfully!")
