init:
	cp .env.example .env && \
	cp src/config/config.example.json src/config/config.json && \
	mkdir tmp/upload -p

create_migration:
	npx sequelize-cli migration:create --name ${NAME}

run_migration:
	npx sequelize-cli db:migrate

undo_migration:
	npx sequelize-cli db:migrate:undo

undo_all_migration:
	npx sequelize-cli db:migrate:undo:all

create_seed:
	npx sequelize-cli seed:generate --name ${NAME}

run_seed:
	npx sequelize-cli db:seed:all

undo_seed:
	npx sequelize-cli db:seed:undo:all