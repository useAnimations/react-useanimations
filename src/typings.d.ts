// The Lottie files are large; typing them as `unknown` keeps type-checking fast.
declare module '*.json' {
  const value: unknown;
  export default value;
}
