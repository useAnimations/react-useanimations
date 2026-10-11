// The Lottie files are large; typing them as `object` keeps type-checking fast.
declare module '*.json' {
  const value: object;
  export default value;
}
