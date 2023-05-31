const chalk = require("chalk");
const pathParse = require("path-parse");
const yargs = require("yargs")(process.argv.slice(2));
const { appProperties } = require("./config/app.config");

// === yargs settings ===
yargs
  .option("port", {
    alias: "p",
    demandOption: false,
    default: appProperties.portDefault,
    describe: "The port were the server is listening",
    type: "number",
    nargs: 1,
  })
  .version("1.0.0")
  .help()
  .usage("Usage: $0 -p port")
  .example(
    `$0 -p ${appProperties.portDefault}`,
    `: Start the server on port ${appProperties.portDefault}`
  )
  .epilog(
    `${chalk.bold.inverse.green("SqueletteNode")} 2022`
  );
const argv = yargs.argv;

// web socket
const port = Number(process.env.PORT || argv.port)
const app = require("./app")
const wss = require("./wss")
wss.init(port+1)

// === starting the server ===
app.listen(process.env.PORT || argv.port, () => {
  console.log(
    `${chalk.bold.inverse.green(
      " Success "
    )} : Server is up at http://localhost:${process.env.PORT || argv.port}`
  );
  console.log(`> See more options : ${pathParse(argv["$0"]).base} --help`);
});
