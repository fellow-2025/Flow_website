// 超簡易マルコフ連鎖

type TransitionMap = Record<string, string[]>;

/**
 * 与えられた例文群をもとに単語遷移表を作る
 */
export function buildTransitions(sentences: string[]): TransitionMap {
  const transitions: TransitionMap = {};

  for (const sentence of sentences) {
    const words = sentence.trim().split(/\s+/);

    for (let i = 0; i < words.length - 1; i++) {
      const current = words[i];
      const next = words[i + 1];

      if (!transitions[current]) {
        transitions[current] = [];
      }
      transitions[current].push(next);
    }
  }

  return transitions;
}

/**
 * ある単語から次の単語をランダムに返す
 */
export function nextWord(word: string, transitions: TransitionMap): string | null {
  const options = transitions[word];
  if (!options || options.length === 0) return null;

  const randIndex = Math.floor(Math.random() * options.length);
  return options[randIndex];
}
