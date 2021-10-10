module.exports = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['dist/**/*.entity.js'],
  migrations: ['dist/migrations/*.js'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};
/*
 automatic detect database change
 npx typeorm migration:generate -n [GENERATED_MIGRATION_NAME]

 run migration
 npx typeorm migration:run

 revert migration
 npx typeorm migration:revert
 */
