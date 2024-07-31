import assert from 'assert';
import { extractStringFromDelimiter } from '../util.js';
describe('seperator test',()=>{
    const exampleTexts = ["example1 examp1 example1", "example2 example2 example2", "example3 example3 example3"]
    const leftDelimiter = "<start>"
    const rightDelimiter = "<end>"
    it('should be extract single string containing in delimiter from text',()=>{
        const exampleString = `placeholder${leftDelimiter}${exampleTexts[0]}${rightDelimiter}placeholder`
        const result = extractStringFromDelimiter(exampleString,leftDelimiter,rightDelimiter);
        assert.equal(result.length,1);
        assert.equal(result[0],exampleTexts[0]);
    });
    it('should extract multiple text',()=>{
        const exampleString = `some text blah blah ${leftDelimiter}${exampleTexts[0]}${rightDelimiter} ${leftDelimiter}${exampleTexts[1]}${rightDelimiter}`
        const result = extractStringFromDelimiter(exampleString,leftDelimiter,rightDelimiter);
        assert.equal(result.length,2);
        assert.equal(result[0],exampleTexts[0]);
        assert.equal(result[1],exampleTexts[1]);
    })
    it('should extract single-right-side Delimiter',()=>{
        const exampleString = `some text blah blah  ${rightDelimiter}`
        const result = extractStringFromDelimiter(exampleString, leftDelimiter, rightDelimiter);
        assert.equal(result.length,0);
    })
    it('should work properly when only left delimiter exists.',()=>{
        const exampleString =`some text blah blah ${leftDelimiter}${exampleTexts[0]}`
        const result = extractStringFromDelimiter(exampleString,leftDelimiter,rightDelimiter);
        assert.equal(result.length,0);
    })
    it('should work properly when text with no proper delimiter is input',()=>{
        const exampleString =`some text blah blah ${exampleTexts[0]} some text placeholder`
        const result = extractStringFromDelimiter(exampleString,leftDelimiter,rightDelimiter);
        assert.equal(result.length,0);
    })
})