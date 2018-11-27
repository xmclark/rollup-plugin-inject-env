import injectEnv from '../src/index';

describe('rollup-plugin-inject-env', function() {
  describe('#injectEnv()', function() {
    describe('with no dotfile', function () {
      test('should return null transformer if no dot-env file', function() {
        const transformer = injectEnv({
          envFilePath: null,
        });
        expect(transformer).toBe(null);
      });
    });
    it('should replace an environment variable', function() {
      const transformer = injectEnv({
        envFilePath: './test/fixtures/.env'
      });
      const code = "let x = process.env.ENVIRONMENT; console.log(x);";
      const result = transformer.transform(code, 'test');
      const expectedCode = "let x = 'production'; console.log(x);";
      const actualCode = result.code;
      expect(actualCode).toBe(expectedCode);
    });
    it('should replace multiple environment variables', function() {
      const transformer = injectEnv({
        envFilePath: './test/fixtures/.env'
      });
      const code = "let x = process.env.ENVIRONMENT; let y = process.env.MY_API_KEY; console.log(x, y);";
      const result = transformer.transform(code, 'test');
      const expectedCode = "let x = 'production'; let y = '12345'; console.log(x, y);";
      const actualCode = result.code;
      expect(actualCode).toBe(expectedCode);
    });
    it('should match exactly', function() {
      const transformer = injectEnv({
        envFilePath: './test/fixtures/.env'
      });
      const code = "let x = process.env.ENVIRONMENT; let y = ENVIRONMENT; let z = process.env.PASSWORD; console.log(x, y, z);";
      const result = transformer.transform(code, 'test');
      const expectedCode = "let x = 'production'; let y = ENVIRONMENT; let z = process.env.PASSWORD; console.log(x, y, z);";
      const actualCode = result.code;
      expect(actualCode).toBe(expectedCode);
    });
  });
});
