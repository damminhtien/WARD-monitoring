const { snapshot } = require("process-list");
const fs = require('fs');
var util = require('util');

const access = fs.createWriteStream("./node.access.log", {
  flags: "a",
}),
error = fs.createWriteStream("./node.error.log", { flags: "a" });
// redirect stdout / stderr
process.stdout.pipe(access);
process.stderr.pipe(error);

const log_file = fs.createWriteStream('./debug.log', {flags : 'w'});
const log_stdout = process.stdout;

console.log = function(d) {
  log_file.write(util.format(d) + '\n');
  log_stdout.write(util.format(d) + '\n');
};

async function main() {
  const tasks = await snapshot("pid", "name", "cpu", "pmem");
  let isFoundProcess = false;
  tasks.forEach((task) => {
    if (task.name.indexOf("chrom") > -1 && task.pid === 24160) {
      isFoundProcess = true;
      task.vmem = task.vmem / 1024 / 1024;
      task.pmem = task.pmem / 1024 / 1024;
      console.log(`${Date.now()} | ${task.pid} | ${task.name} | ${task.cpu} | ${task.pmem}`);
    }
  });
  if (!isFoundProcess) console.log(`${Date.now()} | 0 | 0 | 0 | 0 | Not found process`);
}

setInterval(main, 3000);
