var parser = require('cron-parser');

let msg = "Hello World"
console.log(msg)



function printNextNSchedules(cronexpr, basetime, count) {

  console.log('Now: ', basetime);
  let options = {
      currentDate: new Date(basetime),
      tz: 'America/New_York'
      //tz: 'UTC'
    };

  try {
    var interval = parser.parseExpression(cronexpr, options);

    for (let i = 0; i < count; i++) {
      let next = interval.next()
      console.log('Date: ', next.toString(), ' UTC=', next.toISOString());
    }

  } catch (err) {
    console.log('Error: ' + err.message);
  }

}

// DST start daily
// printNextNSchedules("30 2 * * *", "2023-03-10T00:00:00", 5)

// DST start hourly
// printNextNSchedules("30 0-4 * * *", "2023-03-10T00:00:00", 20)

// DST start 1 minute
// printNextNSchedules("* * * * *", "2023-03-12T01:55:00", 200)

// DST end daily
 //printNextNSchedules("0 2 * * *", "2023-11-03T00:00:00", 5)

// DST end hourly
//printNextNSchedules("30 0-4 * * *", "2023-11-05T00:00:00", 15)
//printNextNSchedules("30 * * * *", "2023-11-05T00:00:00", 15)

// DST end 1 minute
// printNextNSchedules("* * * * *", "2023-11-05T01:55:00", 200)

// DST end 30 minute
// printNextNSchedules("*/10 * * * *", "2023-11-05T01:00:00", 10)

// Weird date
 printNextNSchedules("0 0 31 12 6", "2023-11-03T00:00:00", 6)

// Conclusion:
// On DST start daily: Runs at 3:30 EDT as expected, and runs at 2:30 from next day onwards. Same as JOBMDate behavior.

// On DST start hourly: After 1:30 EST, runs on 3:30 EDT as expected. Resumes running hourly after that as expected.

// On DST every minute: After 1:59 EST runs on 3:00 EDT as expected. Resumes running every minute after that as expected.

// On DST end daily: Run at earlier instance of 1:30 i.e. 1:30 EST and resumes daily run at 1:30 as expected. Same as JOBMDate

// On DST end hourly: 
// 1. If you specify hours (e.g. "0-4"): Runs at earlier instance of 1:30 i.e. 1:30 EDT, After that skips an hour (does not honor hourly policy) and resumes from 2:30 EST
// 2. If you specify every hour (e.g. *): Runs at every hour (honor the policy)

// On DST end every minute: After running at 1:59 EDT, runs at 1:00 EST. SO Runs every minute (honors every minute policy)
