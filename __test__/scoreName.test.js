import {
  scoreName
} from '../src/client/js/formHandler';

describe('Checks score_tag value and returns a string to match the code', () => {
  test('should return true', () => {
    const score_tag = 'P+';
    expect(scoreName(score_tag)).toBe('Very Positive');
  });
  test('should return true', () => {
    const score_tag = 'P';
    expect(scoreName(score_tag)).toBe('Positive');
  });
  test('should return true', () => {
    const score_tag = 'N';
    expect(scoreName(score_tag)).toBe('Negative');
  });
  test('should return true', () => {
    const score_tag = 'N+';
    expect(scoreName(score_tag)).toBe('Very Negative');
  });
  test('should return true', () => {
    const score_tag = 'NEU';
    expect(scoreName(score_tag)).toBe('Neutral');
  });
  test('should return true', () => {
    const score_tag = 'NONE';
    expect(scoreName(score_tag)).toBe('No Sentiment');
  });
  test('should return true', () => {
    const score_tag = 'X';
    expect(scoreName(score_tag)).toBe('Invalid Data');
  });
});