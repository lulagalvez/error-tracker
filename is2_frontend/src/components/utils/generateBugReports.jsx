export function generateBugReports  (numBugReports)  {
    const bugReports = [];
  
    for (let i = 1; i <= numBugReports; i++) {
      const numComments = Math.floor(Math.random() * 10) + 1; // Generate a random number of comments (between 1 and 5)
      const comments = [];
  
      for (let j = 1; j <= numComments; j++) {
        const comment = {
          id: j,
          text: `Comment ${j} for Bug ${i}`,
        };
  
        comments.push(comment);
      }
  
      const bugReport = {
        id: i,
        title: `Bug ${i}`,
        description: `This is bug report ${i}.`,
        comments: comments,
      };
  
      bugReports.push(bugReport);
    }
  
    return bugReports;
  };
  
  