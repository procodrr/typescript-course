type Scores = {
  [subject: string]: number;
  bio: number 
};

const scores: Scores = {
  maths: 80,
  physics: 85,
  bio: 80
};

type T = keyof Scores;

// type U = Array<string>[number]
