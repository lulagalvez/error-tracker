import moment from 'moment';

export function generateBugReports(numBugReports) {
  const bugReports = [];
  const statuses = ['Pending', 'Testing', 'ToDo', 'Closed'];

  function getSecureRandomInt(min, max) {
    const randomBuffer = new Uint32Array(1);
    window.crypto.getRandomValues(randomBuffer);
    const randomNumber = randomBuffer[0] / (0xffffffff + 1);
    return Math.floor(randomNumber * (max - min + 1)) + min;
}

for (let i = 1; i <= numBugReports; i++) {
    const numComments = getSecureRandomInt(1, 10);
    const comments = [];

    for (let j = 1; j <= numComments; j++) {
      const comment = {
        id: j,
        text: `Comment ${j} for Bug ${i}`,
        publisher: `Name of user ${i}`,
        timestamp: generateRandomTimestamp(),
      };

      comments.push(comment);
    }

    const randomStatusIndex = getSecureRandomInt(1,statuses.length-1);
    const status = statuses[randomStatusIndex];

    const bugReport = {
      id: i,
      title: `Bug ${i}`,
      description: `This is bug report ${i}.`,
      comments: comments,
      date: new Date().toISOString(),
      software: `Software ${i}`,
      status: status,
    };

    bugReports.push(bugReport);
  }

  return bugReports;
}

function generateRandomTimestamp() {
  const minutesAgo = getSecureRandomInt(0,59);
  const timestamp = moment().subtract(minutesAgo, 'minutes');
  return timestamp.format('YYYY-MM-DD HH:mm:ss');
}