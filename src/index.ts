type Func<A, B> = (a: A) => B;
function pipe<
  F1 extends Func<any, any>,
  FN extends Array<Func<any, any>>,
  R extends
    FN extends [] ? F1 :
    F1 extends Func<infer A1, any> ?
      FN extends [any] ? Func<A1, ReturnType<FN[0]>> :
      FN extends [any, any] ? Func<A1, ReturnType<FN[1]>> :
      FN extends [any, any, any] ? Func<A1, ReturnType<FN[2]>> :
      FN extends [any, any, any, any] ? Func<A1, ReturnType<FN[3]>> :
      FN extends [any, any, any, any, any] ? Func<A1, ReturnType<FN[4]>> :
      Func<A1, any> // Doubtful we'd ever want to pipe this many functions, but in the off chance someone does, we can infer the arg type but not the return type
    : never
>(func: F1, ...funcs: FN): R {
  const allFuncs = [func, ...funcs];
  return function piped(raw: any) {
    return allFuncs.reduce((memo, f) => f(memo), raw);
  } as R
}

export default pipe;