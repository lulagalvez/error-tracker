import moment from 'moment';

export function generateBugReports(numBugReports) {
  const bugReports = [];
  const statuses = ['Pending', 'Testing', 'ToDo', 'Closed'];

  for (let i = 1; i <= numBugReports; i++) {
    const numComments = Math.floor(Math.random() * 10) + 1;
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

    const randomStatusIndex = Math.floor(Math.random() * statuses.length);
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
  const minutesAgo = Math.floor(Math.random() * 60);
  const timestamp = moment().subtract(minutesAgo, 'minutes');
  return timestamp.format('YYYY-MM-DD HH:mm:ss');
}