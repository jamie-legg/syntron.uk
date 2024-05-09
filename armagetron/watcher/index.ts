import * as fs from "fs";
import * as readline from "readline";
import * as dgram from "dgram";

const logPath = "/app/server/server/var/ladderlog.txt";
const logstashHost = "logstash";
const logstashPort = 12201;
let connectionAttempts = 0;
console.log("Starting Logstash watcher");

function sendLogToLogstash(logMessage: string, retryCount: number = 3): void {
  const gelfMessage = JSON.stringify({
    version: "1.1",
    host: "example.org",
    short_message: logMessage,
    level: 1,
    // Add any additional fields as needed
  });

  const client = dgram.createSocket("udp4");
  const messageBuffer = Buffer.from(gelfMessage + "\n"); // Add a newline character after the message

  client.send(messageBuffer, 0, messageBuffer.length, logstashPort, logstashHost, (error) => {
    if (error) {
      client.close();
      if (retryCount > 0) {
        const retryDelay = Math.pow(2, 3 - retryCount) * 1000; // Exponential backoff
        setTimeout(() => {
          sendLogToLogstash(logMessage, retryCount - 1);
        }, retryDelay);
      } else {
        console.error(
          "UDP send to Logstash failed after multiple attempts. Log message discarded."
        );
      }
    } else {
      client.close();
    }
  });
}

function watchLogFile(filePath: string): void {
  console.log(`Watching file ${filePath} for changes.`);
  fs.watch(filePath, (eventType, filename) => {
    if (eventType === "change") {
      const fileSize = fs.statSync(filePath).size;
      const start = Math.max(0, fileSize - 1024); // Prevents negative start value
      const logStream = fs.createReadStream(filePath, {
        encoding: "utf-8",
        start,
      });
      logStream.on("error", (error) => {
        console.error(`Error reading file ${filePath}: ${error}`);
      });

      const lineReader = readline.createInterface({
        input: logStream,
      });
      lineReader.on("line", (line: string) => {
        if (line.startsWith("PLAYER_LOGIN")) {
          const [, playerName, claimedLogin] = line.split(" ");
          verifyPlayer(playerName, claimedLogin);
        }
      });
      lineReader.on("close", () => {
        console.log("Finished reading changes.");
      });
    }
  });
}

function verifyPlayer(playerName: string, claimedLogin: string): void {
  console.log(`Verifying player ${playerName} with login ${claimedLogin}`);
  // Add database verification logic here
}

setTimeout(async () => {
  console.log = (...args: any[]) => {
    sendLogToLogstash(args.join(" "));
  };
  watchLogFile(logPath);
}, 90000);
