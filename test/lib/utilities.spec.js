import { expect } from 'chai';
import {
  countGoodShares,
  sharesMismatched,
  validateShare
} from 'src/lib/utilities';

describe('utilities', () => {
  describe('sharesMismatched', () => {
    it('should return false when no group is set', () => {
      const shares = [
        { data: 'a' },
        { data: 'b' },
        { data: 'c' },
      ];
      expect(sharesMismatched(shares)).to.be.false();
    });

    it('should return false when group is set and matched', () => {
      const shares = [
        { data: 'a', group: 0 },
        { data: 'b', group: 0 },
        { data: 'c', group: 0 },
      ];
      expect(sharesMismatched(shares)).to.be.false();
    });

    it('should return true when group is set and mismatched', () => {
      const shares = [
        { data: 'a', group: 0 },
        { data: 'b', group: 0 },
        { data: 'c', group: 1 },
      ];
      expect(sharesMismatched(shares)).to.be.true();
    });

    it('should return false when group is set on some but not others', () => {
      const shares = [
        { data: 'c', group: undefined },
        { data: 'a', group: 0 },
        { data: 'b', group: 0 },
      ];
      expect(sharesMismatched(shares)).to.be.false();
    });

    it('should return false when the first group is undefined', () => {
      const shares = [
        { data: 'a', group: 0 },
        { data: 'b', group: 0 },
        { data: 'c', group: undefined },
      ];
      expect(sharesMismatched(shares)).to.be.false();
    });

    it('should not error when shares is empty', () => {
      const shares = [];
      expect(sharesMismatched(shares)).to.be.false();
    });
  });

  describe('countGoodShares', () => {
    it('should count the number of good shares', () => {
      const shares = [
        { data: 'a' },
        { data: 'b' },
        { data: 'c' },
      ];
      expect(countGoodShares(shares)).to.be.equal(3);
    });

    it('should count the number of good shares with an error', () => {
      const shares = [
        { data: 'a', error: 'oops' },
        { data: 'b' },
        { data: 'c' },
      ];
      expect(countGoodShares(shares)).to.be.equal(2);
    });
  });

  describe('validateShare', () => {
    const validShare = '2-1-secretdata';

    it('should return no errors for a valid share', () => {
      expect(validateShare(validShare, []).error).to.be.false();
    });

    it('should return malformed for a bad share', () => {
      expect(validateShare('cecin\'estpauneshare', []).error).to.be.eq('MALFORMED');
    });

    it('should return duplicate for a duplicate share', () => {
      expect(validateShare(validShare, [{ data: validShare }]).error).to.be.eq('DUPLICATE');
    });

    it('should extract the right quorum', () => {
      expect(validateShare(validShare, []).parsedShare.quorum).to.be.eq(2);
    });

    it('should extract the right share index', () => {
      expect(validateShare(validShare, []).parsedShare.shareNum).to.be.eq(1);
    });
  });
});
