import pipe from '../index';
type Func<A, B> = (a: A) => B;

describe('pipe', () => {

  it('should retrieve "14" because of function input chain is number =>  string => number ', () => {
    const c: Func<number, string> = pipe(
      (a: number) => String(a),
      (a: string) => String('1' + a),
      (a: number) => String(a)
    );

    const result: string = c(1);
    expect(result).toEqual("11");
  });

  it('should retrieve string  "2" because of function input chain is number =>  number ', () => {
    const c: Func<number, string> = pipe(
      (a: number) => Number(a),
      (a: number) => Number(1 + a),
      (a: string) => String(a),
    );

    const result: string = c(1);
    expect(result).toEqual("2");
  });

  it('should retrieve number  2 because of function input chain is number =>  string ', () => {
    const c: Func<string, number> = pipe(
      (a: string) => Number(a),
      (a: number) => Number(1 + a),
    );
    
    const result: number = c("1");
    expect(result).toEqual(2);
  });
});