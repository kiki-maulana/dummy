#!/bin/sh
#
# WARNING: This script wipes the database.
# Test cascading delete. The last command should return an empty list.

docker-compose run --rm api sequelize db:migrate:undo:all
docker-compose run --rm api sequelize db:migrate
http POST localhost/api/notebooks title="Notebook"
http POST localhost/api/notes title="Note" content="Note content" notebookId=1
http DELETE localhost/api/notebooks/1
http GET localhost/api/notes
