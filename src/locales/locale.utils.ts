export const replaceKeysInTranslation = (
  translation: string,
  replaceConfig: {[key: string]: string},
): string => {
  let finalTranslation: string = translation;

  Object.keys(replaceConfig).forEach(replaceKey => {
    const replacePattern = `{{${replaceKey}}}`;
    finalTranslation = finalTranslation.replace(
      new RegExp(replacePattern, 'g'),
      replaceConfig[replaceKey],
    );
  });

  return finalTranslation;
};
