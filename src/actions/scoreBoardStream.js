export const ALLSCORE_FETCHED = "ALLSCORE_FETCHED";
export const ONESCORE_FETCHED = "ONESCORE_FETCHED";

export const allScoreFetched = scores => {
  return {
    type: ALLSCORE_FETCHED,
    payload: scores
  };
};

export const oneScoreFetched = score => {
  return {
    type: ONESCORE_FETCHED,
    payload: score
  };
};
