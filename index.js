const { faker } = require('@faker-js/faker');
const Benchmarkify = require("benchmarkify");
const prismaRepo = require('./sqlx');
const sequelizeRepo = require('./sequelize');

// Create a new benchmark
// The `.printHeader` method will print the name of benchmark & some
// information from the OS/PC to the console.
const benchmark = new Benchmarkify("Sequelize versus SQLx", { description: "This is a database benchmark", chartImage: true }).printHeader();

// Create a test suite
benchmark.createSuite("Sequelize versus SQLx", { time: 1000, description: "See the speed of two database libraries" })
  .add("Create with SQLx", async () => {
    const name = faker.person.fullName();
    await prismaRepo.create(name);
  })
  .ref("Create with Sequelize", async () => {
    const name = faker.person.fullName();
    await sequelizeRepo.create(name);
  })

benchmark.run();
